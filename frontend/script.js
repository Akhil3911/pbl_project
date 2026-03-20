// ═══════════════════════════════════════════════════════════
// PREPTRACK — script.js
// ─────────────────────────────────────────────────────────
// Sections:
//   1  DEFAULT_PROGRESS  — task tracking data
//   2  ROADMAP_DATA      — 5-step roadmap content
//   3  RESOURCES_DATA    — study resource links
//   4  MOCK_TESTS_DATA   — practice platform cards
//   5  QUIZ_SECTIONS     — section config for AI quiz
//   6  APP STATE         — runtime variables
//   7  LOCALSTORAGE HELPERS
//   8  AUTH              — login / register / logout
//   9  NAVIGATION
//  10  MOBILE SIDEBAR
//  11  RENDER ALL
//  12  DASHBOARD          — charts, progress bars, NBA card
//  13  NEXT BEST ACTION
//  14  TRACK PAGE
//  15  ADAPTIVE ROADMAP
//  16  RESOURCES PAGE
//  17  MOCK TESTS
//  18  ── AI QUIZ MODULE ──────────────────────────────────
//      18a  buildPrompt()         — reusable prompt template
//      18b  callClaudeAPI()       — fetch wrapper (proxy)
//      18c  renderQuizSelector()  — 4-card section picker
//      18d  startQuizSection()    — fetch AI questions
//      18e  renderQuizActive()    — render MCQ cards
//      18f  updateAnswerCount()   — live answered counter
//      18g  submitQuiz()          — grade + show results
//      18h  renderQuizResults()   — score + explanation reveal
//      18i  quiz localStorage helpers
//  19  INIT
// ═══════════════════════════════════════════════════════════


// ═══════════════════════════════════════════════════════════
// 1 — DEFAULT PROGRESS DATA
// ═══════════════════════════════════════════════════════════

const DEFAULT_PROGRESS = [
  {
    name: 'Aptitude', color: '#4F46E5',
    topics: [
      { name: 'Number System',               status: 'not_started' },
      { name: 'Percentages & Profit/Loss',   status: 'not_started' },
      { name: 'Time, Speed & Distance',      status: 'not_started' },
      { name: 'Permutations & Combinations', status: 'not_started' },
      { name: 'Logical Reasoning',           status: 'not_started' },
      { name: 'Data Interpretation',         status: 'not_started' },
    ]
  },
  {
    name: 'Coding / DSA', color: '#7C3AED',
    topics: [
      { name: 'Arrays & Strings',          status: 'not_started' },
      { name: 'Linked Lists',              status: 'not_started' },
      { name: 'Stacks & Queues',           status: 'not_started' },
      { name: 'Trees & Graphs',            status: 'not_started' },
      { name: 'Dynamic Programming',       status: 'not_started' },
      { name: 'Sorting & Searching',       status: 'not_started' },
      { name: 'Recursion & Backtracking',  status: 'not_started' },
    ]
  },
  {
    name: 'Core CS Subjects', color: '#D97706',
    topics: [
      { name: 'Operating Systems',    status: 'not_started' },
      { name: 'DBMS & SQL',           status: 'not_started' },
      { name: 'Computer Networks',    status: 'not_started' },
      { name: 'OOP Concepts',         status: 'not_started' },
      { name: 'System Design Basics', status: 'not_started' },
    ]
  },
  {
    name: 'Projects', color: '#059669',
    topics: [
      { name: 'Personal Project 1',        status: 'not_started' },
      { name: 'Personal Project 2',        status: 'not_started' },
      { name: 'Open Source Contribution',  status: 'not_started' },
      { name: 'GitHub Profile Cleanup',    status: 'not_started' },
    ]
  },
];


// ═══════════════════════════════════════════════════════════
// 2 — ROADMAP DATA
// ═══════════════════════════════════════════════════════════

const ROADMAP_DATA = [
  {
    title: 'Aptitude & Reasoning', icon: '🧮', color: '#4F46E5',
    duration: '3–4 weeks', progressKey: 0,
    summary: 'Build the quantitative foundation for written tests.',
    what: "Master the core topics tested in every company's written screening round: Number Systems, Percentages, Profit & Loss, Time-Speed-Distance, Permutations & Combinations, Logical Reasoning, and Data Interpretation.",
    why:  'Over 90% of Indian companies filter candidates through an aptitude test before any technical round. Failing here means never reaching the interview.',
    how: [
      'Spend the first week purely on Number Systems and Percentages — they appear in nearly every test.',
      'Solve a minimum of 20 timed problems daily to build speed and accuracy together.',
      'Use IndiaBix and PrepInsta for topic-wise practice and company-specific patterns.',
      'Attempt at least 3 full mock tests in the final week under exam conditions.',
      'Review mistakes immediately and write down the formula or concept you missed.',
    ],
    outcome: 'You should consistently score 80%+ on aptitude mocks and clear the written round of at least 5 major companies.',
  },
  {
    title: 'Coding & Data Structures', icon: '💻', color: '#7C3AED',
    duration: '2–3 months', progressKey: 1,
    summary: 'Master DSA patterns to crack technical coding interviews.',
    what: "Study Arrays, Strings, Linked Lists, Stacks, Queues, Trees, Graphs, Recursion, Dynamic Programming, Sorting, and Searching. Learn to recognise problem patterns, not just memorise solutions.",
    why:  "DSA is the single most important factor in technical interviews at product-based companies. Even service companies are increasingly adding coding rounds.",
    how: [
      "Follow Striver's A2Z DSA Sheet — it covers 450+ problems in a structured order.",
      'Complete Easy problems first (weeks 1–2), Medium (weeks 3–6), Hard (weeks 7+).',
      'Solve each problem yourself for 20–30 minutes before checking the solution.',
      'Always analyse time and space complexity — interviewers always ask.',
      'Do at least 2 LeetCode contests per week to simulate interview pressure.',
    ],
    outcome: 'You can solve Easy problems in under 10 minutes, Medium in 20–30 minutes, and explain your approach clearly in a live interview.',
  },
  {
    title: 'Core CS Subjects', icon: '🏫', color: '#D97706',
    duration: '3–4 weeks', progressKey: 2,
    summary: 'Build conceptual depth in OS, DBMS, Networks, and OOP.',
    what: 'Study Operating Systems (scheduling, memory management, deadlocks), Database Management (ACID, SQL, normalisation), Computer Networks (OSI model, HTTP, DNS, TCP vs UDP), and OOP (the four pillars with real examples).',
    why:  'Core CS questions appear in virtually every technical interview. These subjects test how systems actually work.',
    how: [
      'Use Gate Smashers on YouTube for OS, DBMS, and CN — the explanations are exceptionally clear.',
      "Prepare short notes: key terms, algorithms (like Banker's Algorithm), and diagrams.",
      'Practice 20+ SQL queries hands-on — write them in MySQL or PostgreSQL, not on paper.',
      'For OOP, implement real examples in your preferred language.',
      'Read the top 50 interview questions for each subject on GeeksforGeeks.',
    ],
    outcome: 'You can confidently explain any core CS concept in 2–3 minutes with a clear example.',
  },
  {
    title: 'Projects', icon: '🛠️', color: '#059669',
    duration: 'Ongoing — start early', progressKey: 3,
    summary: 'Build 2 strong projects you can defend in any interview.',
    what: 'Build at least two projects: one full-stack web application and one domain-specific project (AI/ML, mobile, or open source). Both must be deployed online with a clean GitHub repository.',
    why:  'Projects are your proof of work. Interviewers use them to assess whether you can actually build things and how well you communicate your work.',
    how: [
      'Choose a project that solves a real problem — even a small one. Avoid pure tutorial clones.',
      'For your full-stack project: use a modern stack (e.g., React + Node.js + MongoDB).',
      'Write a detailed README: problem statement, tech stack, setup instructions, and screenshots.',
      'Host the backend on Render or Railway, host the frontend on Vercel or Netlify — both are free.',
      'Be ready to walk through every line of code — never use code you cannot explain.',
    ],
    outcome: 'Two live, deployed projects with clean GitHub repos. You can explain every design decision.',
  },
  {
    title: 'Interview Preparation', icon: '🎤', color: '#DC2626',
    duration: '1–2 weeks before interviews', progressKey: null,
    summary: 'Polish communication, HR answers, and mock interview practice.',
    what: 'Prepare your personal introduction, STAR-format behavioral answers, company-specific research, mock coding interviews, and HR/managerial round responses.',
    why:  'Technical skill alone is not enough — communication, confidence, and fit matter enormously.',
    how: [
      'Record yourself answering "Tell me about yourself" — refine until it is under 90 seconds.',
      'Prepare STAR answers for: teamwork, conflict resolution, a time you failed, and leadership.',
      "Research the company's products, recent news, tech stack, and culture before every interview.",
      'Do 3–5 mock interviews on Pramp or with a peer — simulate real conditions.',
      'Prepare 3 thoughtful questions to ask the interviewer — this shows genuine interest.',
    ],
    outcome: 'You walk into every interview confident, prepared, and able to articulate your skills clearly.',
  },
];


// ═══════════════════════════════════════════════════════════
// 3 — RESOURCES DATA
// ═══════════════════════════════════════════════════════════

const RESOURCES_DATA = [
  { cat: 'Coding & DSA', color: '#7C3AED', links: [
    { name: 'LeetCode — Problem solving platform',  url: 'https://leetcode.com' },
    { name: "Striver's A2Z DSA Sheet",              url: 'https://takeuforward.org/strivers-a2z-dsa-course' },
    { name: 'GeeksforGeeks DSA',                    url: 'https://www.geeksforgeeks.org/data-structures/' },
    { name: 'NeetCode Roadmap & Solutions',         url: 'https://neetcode.io/roadmap' },
    { name: 'Codeforces — Competitive Programming', url: 'https://codeforces.com' },
  ]},
  { cat: 'Aptitude & Reasoning', color: '#4F46E5', links: [
    { name: 'Indiabix — Aptitude Questions',   url: 'https://www.indiabix.com' },
    { name: 'PrepInsta — Company-wise papers', url: 'https://prepinsta.com' },
    { name: 'TalentBattle Aptitude',           url: 'https://talentbattle.in' },
    { name: 'Testbook — Aptitude Practice',    url: 'https://testbook.com' },
  ]},
  { cat: 'Core CS Subjects', color: '#D97706', links: [
    { name: 'Gate Smashers — OS, DBMS, CN (YouTube)', url: 'https://www.youtube.com/@GateSmashers' },
    { name: 'InterviewBit — Core CS Questions',       url: 'https://www.interviewbit.com/courses/databases/' },
    { name: 'GFG — OS Interview Questions',           url: 'https://www.geeksforgeeks.org/operating-systems-interview-questions/' },
    { name: 'Khan Academy — SQL Basics',              url: 'https://www.khanacademy.org/computing/computer-programming/sql' },
  ]},
  { cat: 'Interview Prep', color: '#DC2626', links: [
    { name: 'Pramp — Free mock interviews',      url: 'https://www.pramp.com' },
    { name: 'Interviewing.io — Anonymous mocks', url: 'https://interviewing.io' },
    { name: 'Glassdoor — Interview experiences', url: 'https://www.glassdoor.co.in' },
    { name: 'System Design Primer (GitHub)',      url: 'https://github.com/donnemartin/system-design-primer' },
    { name: 'AmbitionBox — Company reviews',     url: 'https://www.ambitionbox.com' },
  ]},
];


// ═══════════════════════════════════════════════════════════
// 4 — MOCK TESTS DATA
// ═══════════════════════════════════════════════════════════

const MOCK_TESTS_DATA = [
  { name: 'IndiaBix',       icon: '🧮', tag: 'Aptitude',     color: '#4F46E5', desc: 'Largest aptitude practice site with topic-wise questions and detailed explanations.',            url: 'https://www.indiabix.com' },
  { name: 'PrepInsta',      icon: '🏢', tag: 'Company-wise', color: '#7C3AED', desc: 'Company-specific mock tests for TCS, Infosys, Wipro, Accenture and more.',                      url: 'https://prepinsta.com' },
  { name: 'Testbook',       icon: '📋', tag: 'Aptitude',     color: '#D97706', desc: 'Full-length aptitude and reasoning mock tests with detailed score analytics.',                    url: 'https://testbook.com' },
  { name: 'HackerRank',     icon: '💻', tag: 'Coding',       color: '#059669', desc: 'Industry-standard coding assessments used by 2,000+ companies for hiring.',                      url: 'https://www.hackerrank.com/dashboard' },
  { name: 'CodeSignal',     icon: '⚡', tag: 'Coding',       color: '#0D9488', desc: 'Certified coding assessments accepted by top tech companies worldwide.',                          url: 'https://codesignal.com' },
  { name: 'LeetCode',       icon: '🏆', tag: 'Coding',       color: '#DC2626', desc: 'Weekly and biweekly contests that simulate real interview-level time pressure.',                  url: 'https://leetcode.com/contest' },
  { name: 'AMCAT',          icon: '📊', tag: 'Company-wise', color: '#4F46E5', desc: 'Standardised employability test accepted by 500+ companies across India.',                        url: 'https://www.myamcat.com' },
  { name: 'iMocha',         icon: '🎯', tag: 'Skills',       color: '#7C3AED', desc: 'Skill-based assessments covering coding, aptitude, and domain knowledge.',                       url: 'https://app.imocha.io' },
  { name: 'Cocubes',        icon: '🔬', tag: 'Company-wise', color: '#D97706', desc: 'Pre-employment assessment platform used by many Indian MNCs for campus hiring.',                  url: 'https://www.cocubes.com' },
];

const TAG_STYLES = {
  'Aptitude':     { bg: '#EEF2FF', text: '#4F46E5', border: '#C7D2FE' },
  'Company-wise': { bg: '#F5F3FF', text: '#7C3AED', border: '#DDD6FE' },
  'Coding':       { bg: '#ECFDF5', text: '#059669', border: '#A7F3D0' },
  'Skills':       { bg: '#F0FDF9', text: '#0D9488', border: '#99F6E4' },
};


// ═══════════════════════════════════════════════════════════
// 5 — QUIZ SECTION CONFIG
// Each entry defines the section shown on the selector card.
// progressKey links to DEFAULT_PROGRESS for context (not score).
// ═══════════════════════════════════════════════════════════

const QUIZ_SECTIONS = [
  {
    id:          'aptitude',
    title:       'Aptitude',
    icon:        '🧮',
    color:       '#4F46E5',
    description: 'Number systems, percentages, time-speed-distance, permutations, logical reasoning.',
    difficulty:  '3 Easy · 4 Medium · 3 Hard',
    count:       10,
  },
  {
    id:          'dsa',
    title:       'Coding / DSA',
    icon:        '💻',
    color:       '#7C3AED',
    description: 'Arrays, linked lists, trees, graphs, dynamic programming, complexity analysis.',
    difficulty:  '3 Easy · 4 Medium · 3 Hard',
    count:       10,
  },
  {
    id:          'corecs',
    title:       'Core CS',
    icon:        '🏫',
    color:       '#D97706',
    description: 'Operating systems, DBMS, computer networks, OOP concepts, system design basics.',
    difficulty:  '3 Easy · 4 Medium · 3 Hard',
    count:       10,
  },
  {
    id:          'interview',
    title:       'Projects & Interview',
    icon:        '🎤',
    color:       '#DC2626',
    description: 'REST APIs, system design, Git, HR behavioural questions, project decisions.',
    difficulty:  '3 Easy · 4 Medium · 3 Hard',
    count:       10,
  },
];


// ═══════════════════════════════════════════════════════════
// 6 — APP STATE
// ═══════════════════════════════════════════════════════════

let currentUser    = null;
let barChartInst   = null;
let radarChartInst = null;

// Active quiz state — cleared on each new quiz attempt
let quizState = {
  section:   null,   // QUIZ_SECTIONS entry
  questions: [],     // AI-generated array
  answers:   {},     // { questionIndex: selectedOptionIndex }
  submitted: false,
};


// ═══════════════════════════════════════════════════════════
// 7 — LOCALSTORAGE HELPERS
// ═══════════════════════════════════════════════════════════

function getUsers() {
  return JSON.parse(localStorage.getItem('pt_users') || '{}');
}
function saveUsers(u) {
  localStorage.setItem('pt_users', JSON.stringify(u));
}
function getProgress(email) {
  const u = getUsers();
  return u[email]?.progress || JSON.parse(JSON.stringify(DEFAULT_PROGRESS));
}
function saveProgress(email, progress) {
  const u = getUsers();
  if (!u[email]) u[email] = {};
  u[email].progress = progress;
  saveUsers(u);
}

// ── Quiz score helpers ──
// Scores stored as: pt_users[email].quizScores[sectionId] = { score, total, date }
// This is COMPLETELY INDEPENDENT of task progress.
function getQuizScores(email) {
  const u = getUsers();
  return u[email]?.quizScores || {};
}
function saveQuizScore(email, sectionId, score, total) {
  const u = getUsers();
  if (!u[email]) u[email] = {};
  if (!u[email].quizScores) u[email].quizScores = {};
  u[email].quizScores[sectionId] = {
    score,
    total,
    date: new Date().toLocaleDateString('en-IN'),
  };
  saveUsers(u);
}


// ═══════════════════════════════════════════════════════════
// 8 — AUTH
// ═══════════════════════════════════════════════════════════

function showScreen(name) {
  document.querySelectorAll('.auth-screen').forEach(s => s.classList.remove('active'));
  document.getElementById('app').classList.remove('active');
  if (name === 'app') {
    document.getElementById('app').classList.add('active');
  } else {
    document.getElementById(name + 'Screen').classList.add('active');
  }
}
function showError(id, msg) {
  const el = document.getElementById(id);
  el.textContent   = msg;
  el.style.display = 'block';
}
function handleRegister() {
  const name  = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim().toLowerCase();
  const pass  = document.getElementById('regPass').value;
  document.getElementById('registerError').style.display = 'none';
  if (!name || !email || !pass) return showError('registerError', 'All fields are required.');
  if (pass.length < 6)          return showError('registerError', 'Password must be at least 6 characters.');
  const users = getUsers();
  if (users[email]) return showError('registerError', 'Email already registered.');
  users[email] = { name, email, password: pass, progress: JSON.parse(JSON.stringify(DEFAULT_PROGRESS)) };
  saveUsers(users);
  loginUser({ name, email });
}
function handleLogin() {
  const email = document.getElementById('loginEmail').value.trim().toLowerCase();
  const pass  = document.getElementById('loginPass').value;
  document.getElementById('loginError').style.display = 'none';
  if (!email || !pass) return showError('loginError', 'Email and password required.');
  if (pass.length < 6) return showError('loginError', 'Password must be at least 6 characters.');
  const users = getUsers();
  if (!users[email]) {
    const autoName = email.split('@')[0].replace(/[^a-zA-Z]/g,' ').replace(/\b\w/g, c => c.toUpperCase());
    users[email] = { name: autoName, email, password: pass, progress: JSON.parse(JSON.stringify(DEFAULT_PROGRESS)) };
    saveUsers(users);
  }
  if (users[email].password !== pass) return showError('loginError', 'Incorrect password.');
  loginUser(users[email]);
}
function loginUser(user) {
  currentUser = user;
  localStorage.setItem('pt_session', JSON.stringify(user));
  document.getElementById('userAvatar').textContent = user.name.charAt(0).toUpperCase();
  document.getElementById('userName').textContent   = user.name;
  document.getElementById('userEmail').textContent  = user.email;
  document.getElementById('dashGreet').textContent  = `Good day, ${user.name.split(' ')[0]} 👋`;
  showScreen('app');
  renderAll();
  showPage('dashboard');
}
function handleLogout() {
  currentUser = null;
  localStorage.removeItem('pt_session');
  if (barChartInst)   { barChartInst.destroy();   barChartInst   = null; }
  if (radarChartInst) { radarChartInst.destroy();  radarChartInst = null; }
  showScreen('login');
}


// ═══════════════════════════════════════════════════════════
// 9 — NAVIGATION
// ═══════════════════════════════════════════════════════════

document.querySelectorAll('.nav-item').forEach(btn => {
  btn.addEventListener('click', () => {
    showPage(btn.dataset.page);
    closeSidebar();
  });
});

function showPage(name) {
  document.querySelectorAll('.nav-item').forEach(b =>
    b.classList.toggle('active', b.dataset.page === name)
  );
  document.querySelectorAll('.page').forEach(p =>
    p.classList.toggle('active', p.id === 'page-' + name)
  );
  if (name === 'dashboard') updateDashboard();
  if (name === 'roadmap')   renderRoadmap();
  if (name === 'quiz')      renderQuizSelector();
}


// ═══════════════════════════════════════════════════════════
// 10 — MOBILE SIDEBAR
// ═══════════════════════════════════════════════════════════

function toggleSidebar() {
  const sidebar  = document.getElementById('sidebar');
  const overlay  = document.getElementById('sidebarOverlay');
  if (sidebar.classList.contains('open')) {
    closeSidebar();
  } else {
    sidebar.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('active');
  document.body.style.overflow = '';
}


// ═══════════════════════════════════════════════════════════
// 11 — RENDER ALL
// ═══════════════════════════════════════════════════════════

function renderAll() {
  renderTrack();
  renderRoadmap();
  renderResources();
  renderMockTests();
  updateDashboard();
}


// ═══════════════════════════════════════════════════════════
// 12 — DASHBOARD
// ═══════════════════════════════════════════════════════════

function catPct(cat) {
  const done = cat.topics.filter(t => t.status === 'completed').length;
  return Math.round((done / cat.topics.length) * 100);
}

function updateDashboard() {
  if (!currentUser) return;
  const progress = getProgress(currentUser.email);
  const data = progress.map(c => ({ name: c.name.replace(' / ','/'), pct: catPct(c), color: c.color }));
  const avg  = Math.round(data.reduce((s, d) => s + d.pct, 0) / data.length);

  document.getElementById('overallPct').textContent = avg + '%';

  let statusLabel, statusColor;
  if      (avg === 0)  { statusLabel = 'Not Started';       statusColor = '#94A3B8'; }
  else if (avg < 30)   { statusLabel = 'Just Beginning';    statusColor = '#DC2626'; }
  else if (avg < 60)   { statusLabel = 'In Progress';       statusColor = '#D97706'; }
  else if (avg < 90)   { statusLabel = 'Almost There!';     statusColor = '#4F46E5'; }
  else                 { statusLabel = 'Ready to Rock! 🚀'; statusColor = '#059669'; }

  const sl = document.getElementById('statusLabel');
  sl.textContent  = statusLabel;
  sl.style.color  = statusColor;

  const sorted = [...data].sort((a, b) => a.pct - b.pct);
  document.getElementById('focusNext').textContent = sorted[0].name;
  document.getElementById('focusSub').textContent  = sorted[0].pct + '% done — needs attention';

  document.getElementById('progressBars').innerHTML = `
    <div class="chart-title" style="margin-bottom:16px;">Category Breakdown</div>
    ${data.map(d => `
      <div class="bar-row">
        <div class="bar-meta">
          <span class="bar-name">${d.name}</span>
          <span class="bar-pct">${d.pct}%</span>
        </div>
        <div class="bar-track">
          <div class="bar-fill" style="width:${d.pct}%;background:${d.color}"></div>
        </div>
      </div>`).join('')}`;

  if (barChartInst) barChartInst.destroy();
  barChartInst = new Chart(document.getElementById('barChart'), {
    type: 'bar',
    data: { labels: data.map(d => d.name), datasets: [{ data: data.map(d => d.pct), backgroundColor: data.map(d => d.color + 'cc'), borderRadius: 6, borderSkipped: false }] },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => ctx.raw + '%' } } }, scales: { x: { grid: { color: '#E2E5F0' }, ticks: { color: '#64748B', font: { size: 11, family: "'Plus Jakarta Sans', sans-serif" } } }, y: { max: 100, grid: { color: '#E2E5F0' }, ticks: { color: '#64748B', font: { size: 11, family: "'Plus Jakarta Sans', sans-serif" }, callback: v => v + '%' } } } },
  });

  if (radarChartInst) radarChartInst.destroy();
  radarChartInst = new Chart(document.getElementById('radarChart'), {
    type: 'radar',
    data: { labels: data.map(d => d.name), datasets: [{ label: 'Progress', data: data.map(d => d.pct), backgroundColor: 'rgba(79,70,229,0.08)', borderColor: '#4F46E5', borderWidth: 2, pointBackgroundColor: '#4F46E5', pointBorderColor: '#FFFFFF', pointBorderWidth: 2, pointRadius: 4 }] },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { r: { min: 0, max: 100, grid: { color: '#E2E5F0' }, angleLines: { color: '#E2E5F0' }, ticks: { display: false }, pointLabels: { color: '#64748B', font: { size: 11, family: "'Plus Jakarta Sans', sans-serif" } } } } },
  });

  renderNextBestAction(progress);
}


// ═══════════════════════════════════════════════════════════
// 13 — NEXT BEST ACTION
// ═══════════════════════════════════════════════════════════

function renderNextBestAction(progress) {
  const topicEl = document.getElementById('nbaTopic');
  const metaEl  = document.getElementById('nbaMeta');
  const iconEl  = document.querySelector('#nbaCard .nba-icon');
  if (!topicEl || !metaEl) return;

  const sorted = [...progress].sort((a, b) => catPct(a) - catPct(b));
  let foundCat = null, foundTopic = null;

  for (const cat of sorted) {
    const topic = cat.topics.find(t => t.status === 'not_started' || t.status === 'in_progress');
    if (topic) { foundCat = cat; foundTopic = topic; break; }
  }

  if (!foundCat || !foundTopic) {
    topicEl.textContent = 'All topics completed!';
    metaEl.textContent  = 'You are fully prepared. Focus on mock interviews now.';
    if (iconEl) iconEl.textContent = '🏆';
    return;
  }

  const action = foundTopic.status === 'in_progress' ? 'Continue revision' : 'Start studying';
  topicEl.textContent = foundTopic.name;
  metaEl.textContent  = `${action} · ${foundCat.name} · ${catPct(foundCat)}% complete`;
}


// ═══════════════════════════════════════════════════════════
// 14 — TRACK PAGE
// ═══════════════════════════════════════════════════════════

function renderTrack() {
  if (!currentUser) return;
  const progress = getProgress(currentUser.email);
  document.getElementById('trackContent').innerHTML = progress.map(cat => `
    <div class="category-block">
      <div class="cat-header">
        <div class="cat-title" style="border-left:3px solid ${cat.color};padding-left:10px;">${cat.name}</div>
        <div class="cat-count">${cat.topics.filter(t => t.status === 'completed').length}/${cat.topics.length} completed</div>
      </div>
      ${cat.topics.map(topic => `
        <div class="topic-row">
          <div class="topic-left">
            <div class="topic-dot ${topic.status === 'completed' ? 'dot-done' : topic.status === 'in_progress' ? 'dot-ip' : 'dot-ns'}"></div>
            <div class="topic-name">${topic.name}</div>
          </div>
          <div class="status-btns">
            <button class="status-btn ${topic.status === 'not_started'  ? 'active-ns'   : ''}" onclick="setStatus('${cat.name}','${topic.name}','not_started')">Not Started</button>
            <button class="status-btn ${topic.status === 'in_progress'  ? 'active-ip'   : ''}" onclick="setStatus('${cat.name}','${topic.name}','in_progress')">In Progress</button>
            <button class="status-btn ${topic.status === 'completed'    ? 'active-done' : ''}" onclick="setStatus('${cat.name}','${topic.name}','completed')">Completed</button>
          </div>
        </div>`).join('')}
    </div>`).join('');
}

function setStatus(catName, topicName, status) {
  const progress = getProgress(currentUser.email);
  const cat      = progress.find(c => c.name === catName);
  const topic    = cat?.topics.find(t => t.name === topicName);
  if (topic) { topic.status = status; saveProgress(currentUser.email, progress); }
  renderTrack();
  updateDashboard();
  renderRoadmap();
}


// ═══════════════════════════════════════════════════════════
// 15 — ADAPTIVE ROADMAP
// ═══════════════════════════════════════════════════════════

function getRoadmapPct(item, progress) {
  if (item.progressKey !== null && item.progressKey !== undefined) {
    return catPct(progress[item.progressKey]);
  }
  return catPct(progress[3]); // Interview uses Projects as proxy
}
function getRoadmapState(item, progress) {
  const pct = getRoadmapPct(item, progress);
  if (pct >= 80) return 'rm-completed';
  if (pct > 0)   return 'rm-current';
  return 'rm-upcoming';
}

function renderRoadmap() {
  if (!currentUser) return;
  const progress = getProgress(currentUser.email);
  const states   = ROADMAP_DATA.map(item => getRoadmapState(item, progress));
  const firstExpandableIdx = states.findIndex(s => s !== 'rm-upcoming');

  document.getElementById('roadmapContent').innerHTML = ROADMAP_DATA.map((item, i) => {
    const state       = states[i];
    const pct         = getRoadmapPct(item, progress);
    const isCompleted = state === 'rm-completed';
    const isCurrent   = state === 'rm-current';
    const isUpcoming  = state === 'rm-upcoming';
    const canExpand   = !isUpcoming;
    const autoExpand  = i === firstExpandableIdx;

    const circleInner = isCompleted
      ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`
      : i + 1;

    const progressRow = !isUpcoming ? `
      <div class="roadmap-progress-row">
        <div class="roadmap-progress-track">
          <div class="roadmap-progress-fill" style="width:${pct}%;background:${item.color}"></div>
        </div>
        <span class="roadmap-progress-pct">${pct}%</span>
      </div>` : '';

    const clickHandler = canExpand ? `onclick="toggleRoadmapItem(${i})"` : '';

    return `
      <div class="roadmap-item ${state} ${autoExpand ? 'expanded' : ''}" id="rmitem-${i}">
        <div class="roadmap-circle" style="background:${item.color}" ${clickHandler}>${circleInner}</div>
        <div class="roadmap-card">
          <div class="roadmap-head" ${clickHandler}>
            <div class="roadmap-head-left">
              <span style="font-size:20px;line-height:1;">${item.icon}</span>
              <div>
                <div class="roadmap-title">${item.title}${isCurrent ? '<span class="roadmap-current-pill">Current</span>' : ''}</div>
                <div class="roadmap-summary">${item.summary}</div>
                ${progressRow}
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:10px;flex-shrink:0;">
              <div class="roadmap-badge">${item.duration}</div>
              ${canExpand ? `<svg class="roadmap-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>` : ''}
            </div>
          </div>
          <div class="roadmap-body">
            <div class="roadmap-detail-section"><div class="roadmap-detail-label"><span class="roadmap-detail-label-icon">📘</span> What to Study</div><p class="roadmap-detail-text">${item.what}</p></div>
            <div class="roadmap-detail-section"><div class="roadmap-detail-label"><span class="roadmap-detail-label-icon">💡</span> Why It Matters</div><p class="roadmap-detail-text">${item.why}</p></div>
            <div class="roadmap-detail-section"><div class="roadmap-detail-label"><span class="roadmap-detail-label-icon">🗂️</span> How to Prepare</div><ul class="roadmap-detail-list">${item.how.map(tip => `<li>${tip}</li>`).join('')}</ul></div>
            <div class="roadmap-outcome"><span class="roadmap-outcome-icon">🎯</span><span>${item.outcome}</span></div>
          </div>
        </div>
      </div>`;
  }).join('');
}

function toggleRoadmapItem(index) {
  const el = document.getElementById(`rmitem-${index}`);
  if (!el || el.classList.contains('rm-upcoming')) return;
  const wasOpen = el.classList.contains('expanded');
  ROADMAP_DATA.forEach((_, i) => document.getElementById(`rmitem-${i}`)?.classList.remove('expanded'));
  if (!wasOpen) el.classList.add('expanded');
}


// ═══════════════════════════════════════════════════════════
// 16 — RESOURCES PAGE
// ═══════════════════════════════════════════════════════════

function renderResources() {
  document.getElementById('resourcesGrid').innerHTML = RESOURCES_DATA.map(sec => `
    <div class="resource-card" style="border-top-color:${sec.color}">
      <div class="resource-cat" style="color:${sec.color}">${sec.cat}</div>
      ${sec.links.map(l => `
        <a class="resource-link" href="${l.url}" target="_blank" rel="noopener">
          <span class="arrow">↗</span>${l.name}
        </a>`).join('')}
    </div>`).join('');
}


// ═══════════════════════════════════════════════════════════
// 17 — MOCK TESTS
// ═══════════════════════════════════════════════════════════

function renderMockTests() {
  document.getElementById('mockTestsGrid').innerHTML = MOCK_TESTS_DATA.map((m, i) => {
    const tc = TAG_STYLES[m.tag] || TAG_STYLES['Skills'];
    return `
      <div class="mock-card" style="border-top-color:${m.color};animation-delay:${i * 0.05}s;">
        <div class="mock-card-top">
          <span class="mock-card-icon">${m.icon}</span>
          <div>
            <div class="mock-card-name">${m.name}</div>
            <span class="mock-card-tag" style="background:${tc.bg};color:${tc.text};border:1px solid ${tc.border};">${m.tag}</span>
          </div>
        </div>
        <div class="mock-card-desc">${m.desc}</div>
        <a class="mock-card-link" href="${m.url}" target="_blank" rel="noopener">
          Open Platform
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        </a>
      </div>`;
  }).join('');
}


// ═══════════════════════════════════════════════════════════
// 18 — AI QUIZ MODULE
// ─────────────────────────────────────────────────────────
// Architecture:
//
//  [User clicks section card]
//       │
//       ▼
//  startQuizSection(sectionId)
//       │  shows loading spinner
//       ▼
//  callClaudeAPI(prompt)         ← HTTP POST to proxy.js
//       │  proxy adds API key & forwards to Claude
//       ▼
//  Claude AI returns JSON
//       │
//       ▼
//  renderQuizActive(questions)   ← JS renders MCQ cards
//       │
//       ▼
//  User selects answers
//       │
//       ▼
//  submitQuiz()                  ← JS grades entirely in-browser
//       │  score saved to localStorage (NEVER affects progress)
//       ▼
//  renderQuizResults()           ← show score + explanations
//
// ═══════════════════════════════════════════════════════════

// ── Backend URL ──────────────────────────────────────────────
// Local dev  : http://localhost:3001/api/quiz
// Production : https://your-deployed-backend.onrender.com/api/quiz
// API key lives in backend/.env — NEVER in this file.
const BACKEND_URL = 'http://localhost:3001/api/quiz';

// ── Demo / offline mode ──────────────────────────────────────
// Set DEMO_MODE = true to use fallback-questions.js (no backend).
// Set to false to use live Gemini AI via backend.
const DEMO_MODE = false;


// ─────────────────────────────────────────────────────────
// 18a — buildPrompt(section)
//
// REUSABLE PROMPT TEMPLATE
// This is the core AI integration point.
// The prompt is crafted so Claude returns ONLY valid JSON.
// Every run asks for "new unique questions" so repetition
// is avoided across attempts.
// ─────────────────────────────────────────────────────────
function buildPrompt(section) {
  // FIX: Shorter prompt = fewer input tokens = more output tokens available.
  // Gemini 2.5 was truncating JSON when the prompt was too long.
  return `Generate a placement quiz JSON for "${section.title}" for final-year engineering students in India.

Topics: ${getSectionTopics(section.id)}

Return ONLY this JSON (no markdown, no extra text):
{"section":"${section.title}","questions":[{"difficulty":"Easy","question":"...","options":["A","B","C","D"],"correctIndex":0,"explanation":"..."}]}

Rules:
- Exactly 10 questions: 3 Easy, 4 Medium, 3 Hard
- 4 options each, one correct, correctIndex is 0-based
- Short explanation (1 line) per question
- Placement-oriented, unique questions each time`;
}

// Topic hints per section — injected into the prompt
function getSectionTopics(id) {
  const topics = {
    aptitude:  'Number systems, HCF/LCM, percentages, profit & loss, time-speed-distance, time & work, simple/compound interest, permutations & combinations, probability, data interpretation, logical reasoning, series completion.',
    dsa:       'Array manipulation, string algorithms, linked list operations, stack/queue problems, binary trees, BST, graph traversal (BFS/DFS), dynamic programming (knapsack, LCS, coin change), sorting algorithms, binary search, recursion, time & space complexity analysis.',
    corecs:    'OS scheduling algorithms, deadlock conditions, memory management, paging/segmentation, ACID properties, SQL joins & subqueries, database normalisation (1NF–3NF), OSI model layers, TCP vs UDP, HTTP/HTTPS, DNS, OOP pillars (abstraction, encapsulation, inheritance, polymorphism), system design basics.',
    interview: 'RESTful API design, HTTP methods, Git commands & workflows, project architecture decisions, STAR method for HR answers, "Tell me about yourself", handling failure scenarios, team conflict resolution, system design trade-offs, deployment & hosting concepts.',
  };
  return topics[id] || 'General placement preparation topics.';
}


// ─────────────────────────────────────────────────────────
// 18b — callClaudeAPI(prompt)
//
// Sends prompt to our secure Node.js backend (server.js).
// The backend holds the Gemini API key — never the browser.
// Backend calls Gemini and returns the raw response JSON.
//
// Returns: parsed quiz JSON object
// Throws:  Error with user-readable message on failure
// ─────────────────────────────────────────────────────────
async function callClaudeAPI(prompt) {
  // POST to our secure backend — API key is never in this file
  const response = await fetch(BACKEND_URL, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ prompt }),
  });

  // FIX: Backend now always returns { section, questions } or { error }.
  // All Gemini parsing, sanitization, and retry happens in server.js.
  // This function no longer needs to parse Gemini's raw format.
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(`Backend error ${response.status}: ${data.error || 'Unknown error'}`);
  }

  // Validate the normalized structure returned by the backend
  if (!data.questions || !Array.isArray(data.questions) || data.questions.length === 0) {
    console.error('[quiz] Unexpected backend response:', JSON.stringify(data).slice(0, 200));
    throw new Error('No questions returned. Please try again.');
  }

  return data;
}


// ─────────────────────────────────────────────────────────
// 18c — renderQuizSelector()
//
// Shows the 4 section cards when the Quiz page is opened.
// Also displays the user's last score for each section
// (loaded from localStorage — purely informational).
// ─────────────────────────────────────────────────────────
function renderQuizSelector() {
  const scores = currentUser ? getQuizScores(currentUser.email) : {};
  const container = document.getElementById('quizContent');
  if (!container) return;

  container.innerHTML = `
    <div class="quiz-selector-grid">
      ${QUIZ_SECTIONS.map(sec => {
        const last  = scores[sec.id];
        const badge = last
          ? `<span class="quiz-sel-score">Last: ${last.score}/${last.total} · ${last.date}</span>`
          : '';
        return `
          <div class="quiz-selector-card" style="border-top-color:${sec.color};"
               onclick="startQuizSection('${sec.id}')">
            <div class="quiz-sel-icon">${sec.icon}</div>
            <div class="quiz-sel-title">${sec.title}</div>
            <div class="quiz-sel-desc">${sec.description}</div>
            <div class="quiz-sel-footer">
              <div class="quiz-sel-meta">
                <span>${sec.count} Qs</span>
                <span>Mixed</span>
              </div>
              <button class="quiz-sel-start"
                      onclick="event.stopPropagation();startQuizSection('${sec.id}')">
                Generate Quiz →
              </button>
            </div>
            ${badge}
          </div>`;
      }).join('')}
    </div>
    <div class="tip-box">
      🤖 <strong>AI-powered:</strong> Claude AI generates fresh questions on every attempt — you will never see the same set twice. Scores are saved for your reference only and do <strong>not</strong> affect task progress.
    </div>`;
}


// ─────────────────────────────────────────────────────────
// 18d — startQuizSection(sectionId)
//
// Called when user clicks a section card.
// 1. Shows the loading spinner
// 2. Builds the prompt and calls Claude via proxy
// 3. On success: calls renderQuizActive()
// 4. On failure: shows the error box with retry button
// ─────────────────────────────────────────────────────────
async function startQuizSection(sectionId) {
  const section   = QUIZ_SECTIONS.find(s => s.id === sectionId);
  const container = document.getElementById('quizContent');
  if (!section || !container) return;

  // Reset quiz state for this fresh attempt
  quizState = { section, questions: [], answers: {}, submitted: false };

  // Show loading UI
  container.innerHTML = `
    <div class="quiz-loading">
      <div class="quiz-spinner"></div>
      <div class="quiz-loading-title">Generating your quiz…</div>
      <div class="quiz-loading-sub">
        Claude AI is crafting 10 unique placement questions for
        <strong>${section.title}</strong>. This takes about 5–10 seconds.
      </div>
      <div class="quiz-loading-ai-tag">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
        Powered by Claude AI (claude-sonnet-4-20250514)
      </div>
    </div>`;

  try {
    // ── Live mode: call Gemini AI directly ────────────────
    const prompt   = buildPrompt(section);
    const quizData = await callClaudeAPI(prompt);

    // Validate each question has required fields
    const questions = quizData.questions.filter(q =>
      q.question && Array.isArray(q.options) && q.options.length === 4 &&
      typeof q.correctIndex === 'number' && q.explanation
    );

    if (questions.length === 0) throw new Error('No valid questions returned. Please try again.');

    quizState.questions = questions;
    renderQuizActive();

  } catch (err) {
    container.innerHTML = `
      <div class="quiz-error-box">
        <div class="quiz-error-title">⚠️ Could not generate quiz</div>
        <div class="quiz-error-msg">${err.message}</div>
        <div class="quiz-error-note">
          Make sure the backend is running (node server.js) and GEMINI_API_KEY is set in your .env file.
          Get a free key at: aistudio.google.com
        </div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;">
          <button class="quiz-error-btn" onclick="startQuizSection('${sectionId}')">🔄 Try Again</button>
          <button class="quiz-error-btn" style="background:#64748B;" onclick="renderQuizSelector()">← Back to Sections</button>
        </div>
      </div>`;
  }
}


// ─────────────────────────────────────────────────────────
// 18e — renderQuizActive()
//
// Renders the MCQ question cards after questions arrive.
// Each card has:
//   - Question number + difficulty badge
//   - Question text
//   - 4 radio-button options
//   - Hidden explanation div (shown after submit)
// ─────────────────────────────────────────────────────────
function renderQuizActive() {
  const { section, questions } = quizState;
  const container = document.getElementById('quizContent');
  if (!container) return;

  const diffLabel = { Easy: 'easy', Medium: 'medium', Hard: 'hard' };

  container.innerHTML = `
    <div class="quiz-active-header">
      <div class="quiz-active-title">${section.icon} ${section.title}</div>
      <div class="quiz-active-meta">
        <span class="quiz-q-counter" id="answeredCount">0 / ${questions.length} answered</span>
        <button class="quiz-back-btn" onclick="renderQuizSelector()">← Sections</button>
      </div>
    </div>

    ${questions.map((q, qi) => `
      <div class="quiz-question-card" id="qcard-${qi}">
        <div class="quiz-q-top">
          <span class="quiz-q-num">Q${qi + 1}</span>
          <span class="quiz-q-text">${escHtml(q.question)}</span>
          <span class="diff-badge diff-${diffLabel[q.difficulty] || 'medium'}">${q.difficulty || 'Medium'}</span>
        </div>
        ${q.options.map((opt, oi) => `
          <label class="quiz-option" id="opt-${qi}-${oi}"
                 onclick="selectOption(${qi},${oi})">
            <input type="radio" name="q${qi}" value="${oi}"
                   onchange="selectOption(${qi},${oi})">
            ${escHtml(opt)}
          </label>`).join('')}
        <div class="quiz-explanation" id="explain-${qi}">
          <strong>Explanation:</strong> ${escHtml(q.explanation)}
        </div>
      </div>`).join('')}

    <div class="quiz-submit-bar">
      <span class="quiz-answered-count">
        Answered: <strong id="answeredNum">0</strong> of ${questions.length}
      </span>
      <button class="quiz-submit-btn" id="quizSubmitBtn"
              onclick="submitQuiz()">
        Submit Quiz
      </button>
    </div>`;
}

// Escape HTML to prevent XSS from AI-generated content
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}


// ─────────────────────────────────────────────────────────
// 18f — selectOption(qi, oi) + updateAnswerCount()
//
// Called when user clicks an answer option.
// Updates quizState.answers and refreshes the counter.
// ─────────────────────────────────────────────────────────
function selectOption(qi, oi) {
  if (quizState.submitted) return;   // ignore clicks after submit

  // Remove .selected from all options for this question
  quizState.questions[qi].options.forEach((_, i) => {
    document.getElementById(`opt-${qi}-${i}`)?.classList.remove('selected');
  });

  // Mark the chosen option
  document.getElementById(`opt-${qi}-${oi}`)?.classList.add('selected');
  quizState.answers[qi] = oi;

  updateAnswerCount();
}

function updateAnswerCount() {
  const count  = Object.keys(quizState.answers).length;
  const total  = quizState.questions.length;
  const el1 = document.getElementById('answeredCount');
  const el2 = document.getElementById('answeredNum');
  if (el1) el1.textContent = `${count} / ${total} answered`;
  if (el2) el2.textContent = count;
}


// ─────────────────────────────────────────────────────────
// 18g — submitQuiz()
//
// PURE JAVASCRIPT GRADING — Claude AI is NOT involved here.
// Steps:
//   1. Check all questions are answered
//   2. Compare quizState.answers[qi] vs question.correctIndex
//   3. Count correct answers
//   4. Save score to localStorage (independent of progress)
//   5. Call renderQuizResults()
// ─────────────────────────────────────────────────────────
function submitQuiz() {
  const { section, questions, answers } = quizState;
  const total    = questions.length;
  const answered = Object.keys(answers).length;

  if (answered < total) {
    alert(`Please answer all ${total} questions before submitting.\n(${total - answered} remaining)`);
    return;
  }

  quizState.submitted = true;

  // Grade — JS only, no AI involved
  let correct = 0;
  const results = questions.map((q, qi) => {
    const chosen  = answers[qi];
    const isRight = chosen === q.correctIndex;
    if (isRight) correct++;
    return { ...q, chosen, isRight };
  });

  // Persist score — purely informational, zero effect on progress
  if (currentUser) {
    saveQuizScore(currentUser.email, section.id, correct, total);
  }

  // Disable submit button
  const btn = document.getElementById('quizSubmitBtn');
  if (btn) { btn.disabled = true; btn.textContent = 'Submitted ✓'; }

  renderQuizResults(results, correct, total, section);
}


// ─────────────────────────────────────────────────────────
// 18h — renderQuizResults(results, correct, total, section)
//
// After grading:
//   1. Colour options green (correct) / red (wrong)
//   2. Reveal explanation boxes under each question
//   3. Insert the results panel above the questions
// ─────────────────────────────────────────────────────────
function renderQuizResults(results, correct, total, section) {
  const pct = Math.round((correct / total) * 100);

  // Count by difficulty
  const diff = { Easy: {c:0,t:0}, Medium: {c:0,t:0}, Hard: {c:0,t:0} };
  results.forEach(r => {
    const d = r.difficulty || 'Medium';
    if (diff[d]) { diff[d].t++; if (r.isRight) diff[d].c++; }
  });

  let headline, subtext;
  if      (pct === 100) { headline = '🏆 Perfect Score!';      subtext = 'Flawless — every question correct.'; }
  else if (pct >= 80)   { headline = '🎉 Excellent!';           subtext = 'Outstanding performance. Review the few mistakes carefully.'; }
  else if (pct >= 60)   { headline = '👍 Good Effort!';         subtext = 'Solid base. Study the explanations for the ones you missed.'; }
  else if (pct >= 40)   { headline = '📖 Keep Practising';      subtext = 'Read each explanation and retake the quiz to improve.'; }
  else                  { headline = '💪 Room to Grow';          subtext = 'Don\'t worry — review the explanations and try again.'; }

  // Insert results panel before the first question card
  const firstCard = document.getElementById('qcard-0');
  if (firstCard) {
    const panel = document.createElement('div');
    panel.className = 'quiz-results-panel';
    panel.innerHTML = `
      <div class="quiz-results-header">
        <div class="quiz-score-circle">
          <div class="quiz-score-num">${correct}</div>
          <div class="quiz-score-denom">/ ${total}</div>
        </div>
        <div class="quiz-results-summary">
          <h4>${headline}</h4>
          <p>${subtext}</p>
          <div class="quiz-diff-row">
            <span class="quiz-diff-chip diff-easy">Easy ${diff.Easy.c}/${diff.Easy.t}</span>
            <span class="quiz-diff-chip diff-medium">Medium ${diff.Medium.c}/${diff.Medium.t}</span>
            <span class="quiz-diff-chip diff-hard">Hard ${diff.Hard.c}/${diff.Hard.t}</span>
          </div>
        </div>
      </div>
      <div class="quiz-results-actions">
        <button class="quiz-retake-btn" onclick="startQuizSection('${section.id}')">
          🔄 New Quiz (Fresh AI Questions)
        </button>
        <button class="quiz-back-to-sel" onclick="renderQuizSelector()">
          ← All Sections
        </button>
      </div>`;
    firstCard.parentNode.insertBefore(panel, firstCard);
  }

  // Colour options and reveal explanations for every question
  results.forEach((r, qi) => {
    r.options.forEach((_, oi) => {
      const el = document.getElementById(`opt-${qi}-${oi}`);
      if (!el) return;
      el.classList.remove('selected');
      if      (oi === r.correctIndex) el.classList.add('correct');
      else if (oi === r.chosen)       el.classList.add('wrong');
      // Disable radio inside
      const radio = el.querySelector('input');
      if (radio) radio.disabled = true;
    });

    // Show explanation
    const explEl = document.getElementById(`explain-${qi}`);
    if (explEl) explEl.style.display = 'block';
  });

  // Scroll to results panel smoothly
  document.querySelector('.quiz-results-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}


// ═══════════════════════════════════════════════════════════
// 19 — INIT — restore session on page load
// ═══════════════════════════════════════════════════════════

(function init() {
  const session = localStorage.getItem('pt_session');
  if (session) {
    try { loginUser(JSON.parse(session)); }
    catch (e) { localStorage.removeItem('pt_session'); }
  }
})();