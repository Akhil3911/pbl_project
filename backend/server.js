// ═══════════════════════════════════════════════════════════
// PrepTrack — server.js  (hardened for Gemini 2.5)
// API key lives here only — never in the browser.
// ═══════════════════════════════════════════════════════════

'use strict';

require('dotenv').config();

const express = require('express');
const cors    = require('cors');

const app  = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: "https://pbl-project-29wp.vercel.app",
  methods: ['POST'],
  credentials: true,
}));
app.use(express.json());

// ── Health check ──────────────────────────────────────────────
app.get('/', (_req, res) => {
  res.json({ status: 'PrepTrack backend running', time: new Date().toISOString() });
});

// ═══════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════
  
// FIX A: Extract raw text from any Gemini response shape.
// Gemini 2.5 adds extra nesting and sometimes uses
// finishReason:"OTHER" with a populated candidate — handle all.
function extractGeminiText(data) {
  // Standard path
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (typeof text === 'string' && text.trim()) return text.trim();

  // Fallback: iterate all parts in case parts[0] is empty
  const parts = data?.candidates?.[0]?.content?.parts;
  if (Array.isArray(parts)) {
    for (const part of parts) {
      if (typeof part?.text === 'string' && part.text.trim()) return part.text.trim();
    }
  }

  return null;
}

// FIX B: Strip markdown fences and extract the first complete JSON object.
// Gemini 2.5 frequently wraps JSON in ```json ... ``` blocks.
// Uses brace-counting to find the MATCHING closing brace — not lastIndexOf
// which fails when the JSON is truncated or has trailing content.
function extractJSON(raw) {
  // Remove markdown code fences (all variations)
  let cleaned = raw
    .replace(/```json\s*/gi, '')
    .replace(/```\s*/gi, '')
    .trim();

  // Find the first opening brace
  const start = cleaned.indexOf('{');
  if (start === -1) return null;

  // Walk forward counting braces to find the matching closing brace
  let depth = 0;
  let inString = false;
  let escape = false;

  for (let i = start; i < cleaned.length; i++) {
    const ch = cleaned[i];

    if (escape) { escape = false; continue; }
    if (ch === '\\' && inString) { escape = true; continue; }
    if (ch === '"') { inString = !inString; continue; }
    if (inString) continue;

    if (ch === '{') depth++;
    if (ch === '}') {
      depth--;
      if (depth === 0) return cleaned.slice(start, i + 1);
    }
  }

  // Depth never reached 0 — JSON is truncated; return what we have
  // and let JSON.parse fail gracefully in the caller
  return cleaned.slice(start);
}

// FIX C: Validate that the parsed quiz object has the required shape.
function validateQuiz(parsed) {
  if (!parsed || typeof parsed !== 'object')         return false;
  if (!Array.isArray(parsed.questions))              return false;
  if (parsed.questions.length === 0)                 return false;
  // At least half the questions must be structurally valid
  const valid = parsed.questions.filter(q =>
    typeof q.question === 'string' && q.question.trim() &&
    Array.isArray(q.options)       && q.options.length === 4 &&
    typeof q.correctIndex === 'number'
  );
  return valid.length >= Math.ceil(parsed.questions.length / 2);
}

// FIX D: Call Gemini with a timeout and return the parsed response.
// Does NOT throw on Gemini-level errors — returns null instead
// so the caller can retry.
async function callGemini(prompt, apiKey, timeoutMs = 30000) {
  const GEMINI_URL =
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const geminiRes = await fetch(GEMINI_URL, {
      method:  'POST',
      signal:  controller.signal,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature:     0.9,
          // FIX: Gemini 2.5 uses ~4x more tokens than 1.5 for same output.
          // 4096 was cutting responses mid-string. 8192 gives safe headroom.
          maxOutputTokens: 8192,
          responseMimeType: 'application/json',
        },
      }),
    });

    const data = await geminiRes.json();

    if (!geminiRes.ok) {
      const msg = data?.error?.message || `HTTP ${geminiRes.status}`;
      console.error(`[server] Gemini API error: ${msg}`);
      return { error: msg };
    }

    return { data };

  } catch (err) {
    if (err.name === 'AbortError') {
      console.error('[server] Gemini request timed out');
      return { error: 'Request timed out. Please try again.' };
    }
    console.error('[server] Fetch error:', err.message);
    return { error: err.message };
  } finally {
    clearTimeout(timer);
  }
}

// ═══════════════════════════════════════════════════════════
// POST /api/quiz
// Receives : { prompt: string }
// Returns  : { section: string, questions: [...] }   ← always normalized
// ═══════════════════════════════════════════════════════════
app.post('/api/quiz', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
    return res.status(400).json({ error: 'Request body must include a non-empty "prompt" string.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY is not configured on the server.' });
  }

  // FIX F: Retry loop — max 2 attempts before giving up.
  const MAX_ATTEMPTS = 2;
  let lastError = 'Quiz generation failed. Please try again.';

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    console.log(`[server] Gemini attempt ${attempt}/${MAX_ATTEMPTS}`);

    const { data, error } = await callGemini(prompt, apiKey);

    if (error) {
      lastError = error;
      continue; // retry
    }

    // Extract raw text from Gemini response
    const rawText = extractGeminiText(data);
    if (!rawText) {
      console.error('[server] No text in Gemini response:', JSON.stringify(data).slice(0, 300));
      lastError = 'Gemini returned an empty response. Please try again.';
      continue; // retry
    }

    // Extract and parse JSON
    console.log('[server] Raw text preview:', rawText.slice(0, 120).replace(/\n/g, ' '));
    const jsonString = extractJSON(rawText);
    if (!jsonString) {
      console.error('[server] Could not extract JSON. Full raw length:', rawText.length);
      lastError = 'Gemini response did not contain valid JSON. Please try again.';
      continue; // retry
    }
    console.log('[server] Extracted JSON length:', jsonString.length);

    let parsed;
    try {
      parsed = JSON.parse(jsonString);
    } catch (parseErr) {
      console.error('[server] JSON.parse failed:', parseErr.message, '| Input:', jsonString.slice(0, 200));
      lastError = 'Gemini returned malformed JSON. Please try again.';
      continue; // retry
    }

    // Validate structure
    if (!validateQuiz(parsed)) {
      console.error('[server] Quiz validation failed. Parsed:', JSON.stringify(parsed).slice(0, 300));
      lastError = 'Gemini returned an unexpected quiz structure. Please try again.';
      continue; // retry
    }

    // FIX G: Return only the normalized structure — never raw Gemini JSON.
    // Frontend expects { section, questions } — nothing else.
    const normalized = {
      section:   parsed.section   || 'Quiz',
      questions: parsed.questions.filter(q =>
        typeof q.question === 'string' && q.question.trim() &&
        Array.isArray(q.options)       && q.options.length === 4 &&
        typeof q.correctIndex === 'number' &&
        typeof q.explanation === 'string'
      ),
    };

    if (normalized.questions.length === 0) {
      lastError = 'All questions were filtered out during validation. Please try again.';
      continue; // retry
    }

    console.log(`[server] ✅ Quiz ready — ${normalized.questions.length} questions (attempt ${attempt})`);
    return res.json(normalized);
  }

  // All attempts exhausted
  console.error(`[server] All ${MAX_ATTEMPTS} attempts failed. Last error: ${lastError}`);
  return res.status(502).json({ error: lastError });
});

// ── Start ─────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n✅  PrepTrack backend running → http://localhost:${PORT}`);
  console.log(`    POST http://localhost:${PORT}/api/quiz\n`);
});