// ═══════════════════════════════════════════════════════════
// PrepTrack — fallback-questions.js
//
// PURPOSE:
//   Pre-generated question bank for demo / offline use.
//   When the proxy server is unavailable, the app falls back
//   to this file and randomly selects 10 questions per
//   section. Because selections are shuffled each time, the
//   student sees different questions on every attempt.
//
// HOW IT WORKS IN script.js:
//   startQuizSection() tries the proxy first.
//   If the fetch fails, it catches the error and calls
//   getFallbackQuestions(sectionId) from this file instead.
//   The quiz UI then renders exactly as if AI had generated
//   the questions — the student experience is identical.
//
// ACADEMIC NOTE FOR VIVA:
//   "We maintain a pre-generated pool of 20 questions per
//    section, created using Claude AI in advance. At runtime,
//    10 are selected randomly, so each attempt is unique.
//    This ensures the app works without internet access and
//    demonstrates the AI integration concept even offline."
// ═══════════════════════════════════════════════════════════


// ── Utility: pick n random items from an array ──────────────
function pickRandom(arr, n) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

// ── Public API ───────────────────────────────────────────────
// Returns a quiz object in the same format Claude would return.
function getFallbackQuestions(sectionId) {
  const bank = FALLBACK_BANK[sectionId];
  if (!bank) throw new Error('No fallback bank for section: ' + sectionId);

  const questions = pickRandom(bank, 10);
  const sectionTitles = {
    aptitude:  'Aptitude',
    dsa:       'Coding / DSA',
    corecs:    'Core CS',
    interview: 'Projects & Interview',
  };

  return {
    section:   sectionTitles[sectionId] || sectionId,
    questions,
  };
}


// ═══════════════════════════════════════════════════════════
// FALLBACK QUESTION BANK
// 20 questions per section — generated using Claude AI.
// Shuffled at runtime to produce variety across attempts.
// ═══════════════════════════════════════════════════════════

const FALLBACK_BANK = {

  // ── APTITUDE (20 questions) ──────────────────────────────
  aptitude: [
    { difficulty: 'Easy', question: 'What is 15% of 240?', options: ['30', '36', '40', '24'], correctIndex: 1, explanation: '15% of 240 = (15/100) × 240 = 36. Convert percentage to fraction and multiply.' },
    { difficulty: 'Easy', question: 'The LCM of 12 and 18 is:', options: ['6', '24', '36', '72'], correctIndex: 2, explanation: 'LCM(12,18): 12 = 2²×3, 18 = 2×3². LCM = 2²×3² = 36.' },
    { difficulty: 'Easy', question: 'A train travels 150 km in 2.5 hours. Its speed is:', options: ['50 km/h', '55 km/h', '60 km/h', '75 km/h'], correctIndex: 2, explanation: 'Speed = Distance ÷ Time = 150 ÷ 2.5 = 60 km/h.' },
    { difficulty: 'Easy', question: 'The next number in the series 3, 9, 27, 81 is:', options: ['162', '243', '324', '729'], correctIndex: 1, explanation: 'Each term is multiplied by 3. 81 × 3 = 243.' },
    { difficulty: 'Easy', question: 'If cost price = ₹400 and profit = 25%, what is the selling price?', options: ['₹450', '₹480', '₹500', '₹420'], correctIndex: 2, explanation: 'SP = CP × (1 + profit%) = 400 × 1.25 = ₹500.' },
    { difficulty: 'Medium', question: 'A and B can do a piece of work in 12 and 18 days respectively. Working together, they finish in:', options: ['6 days', '7.2 days', '8 days', '9 days'], correctIndex: 1, explanation: 'Combined rate = 1/12 + 1/18 = 3/36 + 2/36 = 5/36. Time = 36/5 = 7.2 days.' },
    { difficulty: 'Medium', question: 'How many ways can 4 people be arranged in a row?', options: ['16', '12', '24', '32'], correctIndex: 2, explanation: '4! = 4 × 3 × 2 × 1 = 24. Permutations of n distinct items = n!' },
    { difficulty: 'Medium', question: 'Simple interest on ₹5000 at 8% per annum for 3 years is:', options: ['₹1000', '₹1200', '₹1500', '₹800'], correctIndex: 1, explanation: 'SI = P×R×T/100 = 5000×8×3/100 = ₹1200.' },
    { difficulty: 'Medium', question: 'If price rises by 20% and then falls by 20%, the net change is:', options: ['+4%', '−4%', '0%', '+2%'], correctIndex: 1, explanation: 'Let P=100. After +20%: 120. After −20%: 120×0.8 = 96. Net = −4%.' },
    { difficulty: 'Medium', question: 'In a bag of 5 red and 3 blue balls, what is the probability of drawing a red ball?', options: ['3/8', '5/8', '5/3', '1/2'], correctIndex: 1, explanation: 'P(red) = 5/(5+3) = 5/8.' },
    { difficulty: 'Medium', question: 'Compound interest on ₹8000 at 10% p.a. for 2 years is:', options: ['₹1600', '₹1680', '₹1760', '₹2000'], correctIndex: 1, explanation: 'CI = P[(1+r)^n − 1] = 8000[(1.1)² − 1] = 8000×0.21 = ₹1680.' },
    { difficulty: 'Hard', question: 'Two pipes fill a tank in 20 and 30 minutes. A drain pipe empties it in 40 minutes. All three open together fill the tank in:', options: ['17.1 min', '24 min', '12 min', '20 min'], correctIndex: 0, explanation: 'Net rate = 1/20 + 1/30 − 1/40 = 6/120 + 4/120 − 3/120 = 7/120. Time = 120/7 ≈ 17.1 min.' },
    { difficulty: 'Hard', question: 'In how many ways can the letters of "MISSISSIPPI" be arranged?', options: ['34650', '69300', '138600', '11880'], correctIndex: 0, explanation: '11! / (4! × 4! × 2!) = 39916800 / 1152 = 34650. Divide by repeated letters.' },
    { difficulty: 'Hard', question: 'A boat travels 36 km upstream in 4 hours and 40 km downstream in 2 hours. Find the speed of the stream.', options: ['3 km/h', '4 km/h', '5 km/h', '6 km/h'], correctIndex: 2, explanation: 'Upstream speed = 9 km/h, Downstream speed = 20 km/h. Stream = (20−9)/2 = 5.5 ≈ 5 km/h.' },
    { difficulty: 'Hard', question: 'The ratio of ages of A and B is 3:5. After 10 years the ratio will be 5:7. Find A\'s current age.', options: ['15', '20', '25', '30'], correctIndex: 0, explanation: 'Let A=3x, B=5x. (3x+10)/(5x+10) = 5/7. Solving: 21x+70 = 25x+50, 4x=20, x=5. A=15.' },
    { difficulty: 'Easy', question: 'What is 40% of 300?', options: ['100', '110', '120', '130'], correctIndex: 2, explanation: '40/100 × 300 = 120.' },
    { difficulty: 'Medium', question: 'A shopkeeper gives a 10% discount on ₹800. What is the selling price?', options: ['₹700', '₹710', '₹720', '₹750'], correctIndex: 2, explanation: 'SP = 800 × (1 − 0.10) = 800 × 0.9 = ₹720.' },
    { difficulty: 'Medium', question: 'C(10, 3) is:', options: ['120', '210', '720', '30'], correctIndex: 0, explanation: 'C(10,3) = 10!/(3!×7!) = (10×9×8)/(3×2×1) = 120.' },
    { difficulty: 'Hard', question: 'A sum doubles itself in 10 years at simple interest. The rate of interest is:', options: ['5%', '8%', '10%', '12%'], correctIndex: 2, explanation: 'If sum doubles, interest = principal. SI = P×R×T/100 → P = P×R×10/100 → R = 10%.' },
    { difficulty: 'Hard', question: 'The average of 5 numbers is 40. If one number is removed, average becomes 35. The removed number is:', options: ['55', '60', '65', '70'], correctIndex: 1, explanation: 'Sum of 5 = 200. Sum of 4 = 140. Removed = 200 − 140 = 60.' },
  ],

  // ── CODING / DSA (20 questions) ──────────────────────────
  dsa: [
    { difficulty: 'Easy', question: 'Which data structure is used for BFS traversal?', options: ['Stack', 'Queue', 'Heap', 'Array'], correctIndex: 1, explanation: 'BFS processes nodes level by level. A Queue (FIFO) ensures correct discovery order.' },
    { difficulty: 'Easy', question: 'Time complexity of accessing an element by index in an array is:', options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'], correctIndex: 2, explanation: 'Arrays store elements contiguously in memory, so any index is a direct memory address calculation — O(1).' },
    { difficulty: 'Easy', question: 'Which sorting algorithm has the best worst-case time complexity?', options: ['Bubble Sort', 'Merge Sort', 'Quick Sort', 'Insertion Sort'], correctIndex: 1, explanation: 'Merge Sort is O(n log n) in all cases. Quick Sort degrades to O(n²) in worst case.' },
    { difficulty: 'Easy', question: 'What does LIFO stand for?', options: ['Last In First Out', 'Last Index First Operation', 'Linear In First Out', 'List Index For Output'], correctIndex: 0, explanation: 'LIFO = Last In, First Out. This describes the Stack data structure — the last element added is the first removed.' },
    { difficulty: 'Easy', question: 'Inorder traversal of a BST gives elements in:', options: ['Random order', 'Descending order', 'Ascending order', 'Level order'], correctIndex: 2, explanation: 'BST property (left < root < right) means inorder traversal (left → root → right) visits nodes in ascending order.' },
    { difficulty: 'Medium', question: 'What is the time complexity of binary search on a sorted array of n elements?', options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'], correctIndex: 1, explanation: 'Binary search halves the search space at each step: n → n/2 → n/4 … giving O(log n) comparisons.' },
    { difficulty: 'Medium', question: 'Which algorithm is used to detect a cycle in a linked list?', options: ['BFS', 'DFS', "Floyd's (fast & slow pointers)", 'Merge Sort'], correctIndex: 2, explanation: "Floyd's algorithm uses two pointers at different speeds. If they meet, a cycle exists. Space complexity: O(1)." },
    { difficulty: 'Medium', question: 'The height of a balanced Binary Search Tree with n nodes is:', options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], correctIndex: 1, explanation: 'A balanced BST halves the remaining nodes at each level, similar to binary search, giving height O(log n).' },
    { difficulty: 'Medium', question: 'Which of the following is NOT a greedy algorithm?', options: ['Prim\'s MST', 'Kruskal\'s MST', 'Dijkstra\'s', 'Bellman-Ford'], correctIndex: 3, explanation: 'Bellman-Ford uses dynamic programming to handle negative edge weights; it is not greedy.' },
    { difficulty: 'Medium', question: 'Deleting a node from the middle of a doubly linked list takes:', options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'], correctIndex: 2, explanation: 'In a doubly linked list, each node has prev and next pointers. Given the node, deletion just requires updating two pointers — O(1).' },
    { difficulty: 'Medium', question: 'What is memoization in Dynamic Programming?', options: ['Sorting subproblems', 'Caching results of subproblems to avoid recomputation', 'Using extra space to store input', 'Dividing problem equally'], correctIndex: 1, explanation: 'Memoization stores results of already-solved subproblems. When the same subproblem occurs again, the cached result is returned instead of recomputing.' },
    { difficulty: 'Hard', question: 'What is the time complexity of building a heap from n elements?', options: ['O(n log n)', 'O(n²)', 'O(n)', 'O(log n)'], correctIndex: 2, explanation: 'Building a heap by sift-down from the last non-leaf is O(n) due to the geometric series bound, even though each individual sift-down is O(log n).' },
    { difficulty: 'Hard', question: 'In Dijkstra\'s algorithm with a min-heap, the time complexity for a graph with V vertices and E edges is:', options: ['O(V²)', 'O(E + V log V)', 'O(V log E)', 'O(E log V)'], correctIndex: 1, explanation: 'With a Fibonacci heap or binary heap, Dijkstra runs in O((E + V) log V). The common practical form is O(E log V).' },
    { difficulty: 'Hard', question: 'The space complexity of recursive DFS on a graph with V vertices is:', options: ['O(1)', 'O(V)', 'O(V²)', 'O(E)'], correctIndex: 1, explanation: 'Each recursive call adds a frame to the call stack. In the worst case (a path graph), stack depth equals V, so space = O(V).' },
    { difficulty: 'Hard', question: 'Which of the following problems is NP-Complete?', options: ['Binary Search', 'Merge Sort', 'Travelling Salesman (decision version)', 'BFS'], correctIndex: 2, explanation: 'TSP (decision version) is NP-Complete. It cannot be solved in polynomial time deterministically for large inputs.' },
    { difficulty: 'Easy', question: 'What is the worst-case time complexity of Quick Sort?', options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'], correctIndex: 2, explanation: 'When the pivot is always the smallest or largest element (e.g. sorted array + last pivot), Quick Sort degrades to O(n²).' },
    { difficulty: 'Medium', question: 'An AVL tree maintains balance by ensuring the height difference between left and right subtrees is at most:', options: ['0', '1', '2', '3'], correctIndex: 1, explanation: 'AVL trees are self-balancing BSTs where the balance factor (height difference) of every node is maintained at −1, 0, or 1.' },
    { difficulty: 'Medium', question: 'Which data structure is used to implement a priority queue efficiently?', options: ['Array', 'Linked List', 'Stack', 'Heap'], correctIndex: 3, explanation: 'A Heap allows O(log n) insertion and O(log n) deletion of the minimum/maximum, making it ideal for priority queues.' },
    { difficulty: 'Hard', question: 'The number of distinct binary search trees possible with n distinct keys is given by:', options: ['n!', '2^n', 'Catalan number C(n)', 'n^2'], correctIndex: 2, explanation: 'The number of structurally distinct BSTs with n keys equals the nth Catalan number: C(n) = (2n)! / ((n+1)! × n!).' },
    { difficulty: 'Hard', question: 'Which of these is used to find the shortest path in an unweighted graph?', options: ['Dijkstra', 'Bellman-Ford', 'BFS', 'DFS'], correctIndex: 2, explanation: 'BFS explores nodes level by level, guaranteeing the shortest path (in terms of edge count) in an unweighted graph.' },
  ],

  // ── CORE CS (20 questions) ───────────────────────────────
  corecs: [
    { difficulty: 'Easy', question: 'Which OS scheduling algorithm may cause starvation?', options: ['Round Robin', 'FCFS', 'Priority Scheduling', 'SRTF'], correctIndex: 2, explanation: 'In Priority Scheduling, low-priority processes may never get CPU if high-priority ones keep arriving — this is called starvation.' },
    { difficulty: 'Easy', question: 'HTTP runs on which default port?', options: ['21', '25', '80', '443'], correctIndex: 2, explanation: 'HTTP uses port 80 by default. HTTPS uses 443. FTP uses 21. SMTP uses 25.' },
    { difficulty: 'Easy', question: 'ACID stands for:', options: ['Atomicity, Consistency, Isolation, Durability', 'Atomic, Consistent, Independent, Direct', 'All Connected In Database', 'Availability, Continuity, Integrity, Durability'], correctIndex: 0, explanation: 'ACID ensures reliable transactions: Atomicity (all or nothing), Consistency (valid state), Isolation (no interference), Durability (permanent).' },
    { difficulty: 'Easy', question: 'The OSI model has how many layers?', options: ['4', '5', '6', '7'], correctIndex: 3, explanation: 'The 7 OSI layers (bottom to top): Physical, Data Link, Network, Transport, Session, Presentation, Application.' },
    { difficulty: 'Easy', question: 'Which OOP principle hides internal implementation details?', options: ['Inheritance', 'Polymorphism', 'Encapsulation', 'Abstraction'], correctIndex: 2, explanation: 'Encapsulation bundles data and methods that operate on it, exposing only what is necessary through public interfaces.' },
    { difficulty: 'Medium', question: 'In OS, thrashing occurs when:', options: ['CPU is idle', 'Too many page faults cause excessive swapping', 'Memory is completely free', 'Disk I/O speed drops'], correctIndex: 1, explanation: 'Thrashing happens when the OS spends more time swapping pages in/out than executing processes, severely degrading performance.' },
    { difficulty: 'Medium', question: 'What is the difference between WHERE and HAVING in SQL?', options: ['WHERE filters columns, HAVING filters rows', 'WHERE filters rows before grouping, HAVING filters groups after GROUP BY', 'They are identical', 'HAVING is used with subqueries'], correctIndex: 1, explanation: 'WHERE filters individual rows before aggregation. HAVING filters the resulting groups after GROUP BY is applied.' },
    { difficulty: 'Medium', question: 'Which normal form removes transitive dependencies?', options: ['1NF', '2NF', '3NF', 'BCNF'], correctIndex: 2, explanation: '3NF: non-key attributes must depend only on the primary key, not on other non-key attributes (removing transitive dependencies).' },
    { difficulty: 'Medium', question: 'TCP vs UDP: which provides reliable, ordered delivery?', options: ['UDP', 'TCP', 'Both', 'Neither'], correctIndex: 1, explanation: 'TCP provides connection-oriented, reliable, ordered delivery with acknowledgements. UDP is connectionless and has no delivery guarantees.' },
    { difficulty: 'Medium', question: 'What does DNS stand for?', options: ['Data Network System', 'Domain Name System', 'Dynamic Node Service', 'Distributed Name Server'], correctIndex: 1, explanation: 'DNS translates human-readable domain names (like google.com) into IP addresses that computers use to communicate.' },
    { difficulty: 'Medium', question: 'Which scheduling algorithm minimises average waiting time?', options: ['FCFS', 'Round Robin', 'SJF (Shortest Job First)', 'Priority Scheduling'], correctIndex: 2, explanation: 'SJF is provably optimal for minimising average waiting time in a batch system, though it requires knowledge of burst times.' },
    { difficulty: 'Hard', question: 'In the CAP theorem, when a network partition occurs, a system must choose between:', options: ['Speed and Reliability', 'Consistency and Availability', 'Scalability and Security', 'Replication and Partitioning'], correctIndex: 1, explanation: "CAP theorem: during a Partition, you must sacrifice either Consistency (all nodes see same data) or Availability (every request gets a response)." },
    { difficulty: 'Hard', question: 'What is the Banker\'s Algorithm used for?', options: ['Memory allocation', 'Deadlock avoidance', 'CPU scheduling', 'Disk management'], correctIndex: 1, explanation: "Banker's Algorithm checks if granting a resource request leaves the system in a safe state (one where deadlock cannot occur)." },
    { difficulty: 'Hard', question: 'In database indexing, a B+ tree is preferred over B-tree for range queries because:', options: ['It uses less memory', 'All data is stored in leaf nodes, which are linked', 'It has fewer levels', 'It supports only equality queries'], correctIndex: 1, explanation: 'In a B+ tree, all records are at leaf level and leaves are linked in a list. This makes sequential/range scans very efficient.' },
    { difficulty: 'Hard', question: 'What is a critical section in OS?', options: ['Part of CPU', 'Code segment where shared resources are accessed', 'Memory for OS kernel', 'Interrupt handler code'], correctIndex: 1, explanation: 'A critical section is a code segment where shared resources (e.g. variables, files) are accessed. Mutual exclusion must be enforced here to prevent race conditions.' },
    { difficulty: 'Easy', question: 'What does OOP stand for?', options: ['Object-Oriented Programming', 'Object-Oriented Protocol', 'Operational Object Processing', 'Output-Oriented Protocol'], correctIndex: 0, explanation: 'OOP is a programming paradigm based on objects that bundle state (attributes) and behaviour (methods).' },
    { difficulty: 'Medium', question: 'What is method overriding in Java?', options: ['Defining multiple methods with the same name but different parameters', 'Subclass providing its own implementation of a parent class method', 'Using a method from a different class', 'Creating abstract methods'], correctIndex: 1, explanation: 'Method overriding allows a subclass to provide a specific implementation for a method already defined in its parent class.' },
    { difficulty: 'Medium', question: 'Which SQL join returns only rows that have a match in BOTH tables?', options: ['LEFT JOIN', 'RIGHT JOIN', 'FULL JOIN', 'INNER JOIN'], correctIndex: 3, explanation: 'INNER JOIN returns only the rows where there is a matching value in both tables on the join condition.' },
    { difficulty: 'Hard', question: 'In virtual memory, a page fault occurs when:', options: ['A program crashes', 'The page is in RAM', 'The referenced page is not in RAM and must be loaded from disk', 'The CPU runs out of registers'], correctIndex: 2, explanation: 'A page fault is triggered when the process accesses a page not currently mapped to physical RAM. The OS then loads it from disk (swap space).' },
    { difficulty: 'Hard', question: 'What is the main advantage of using database transactions?', options: ['Faster queries', 'Ensures all-or-nothing execution with rollback on failure', 'Reduces disk usage', 'Allows concurrent table creation'], correctIndex: 1, explanation: 'Transactions ensure ACID properties. If any operation fails, the entire transaction is rolled back, keeping the database in a consistent state.' },
  ],

  // ── PROJECTS & INTERVIEW (20 questions) ─────────────────
  interview: [
    { difficulty: 'Easy', question: 'What does a pull request (PR) in GitHub represent?', options: ['Cloning a repo', 'Requesting maintainer to review and merge your changes', 'Creating a new branch', 'Pushing code directly'], correctIndex: 1, explanation: 'A PR formally requests that your changes be reviewed and merged into the main codebase, enabling collaboration and code review.' },
    { difficulty: 'Easy', question: 'REST API — which HTTP method is used to CREATE a resource?', options: ['GET', 'PUT', 'POST', 'DELETE'], correctIndex: 2, explanation: 'POST creates a new resource. GET reads, PUT/PATCH updates, DELETE removes. These map to CRUD operations.' },
    { difficulty: 'Easy', question: 'What does a .gitignore file do?', options: ['Documents your project', 'Specifies files Git should not track', 'Defines the project license', 'Sets branch rules'], correctIndex: 1, explanation: '.gitignore tells Git to exclude specified files (e.g. .env, node_modules) from version control.' },
    { difficulty: 'Easy', question: 'The STAR method in interviews stands for:', options: ['Strength, Task, Answer, Result', 'Situation, Task, Action, Result', 'Subject, Target, Achievement, Reasoning', 'Strategy, Tactics, Approach, Resolution'], correctIndex: 1, explanation: 'STAR gives answers structure: Situation (context), Task (objective), Action (what you did), Result (measurable outcome).' },
    { difficulty: 'Easy', question: 'What is the primary purpose of a README file?', options: ['Store configuration', 'Document the project for users and contributors', 'List dependencies', 'Define test cases'], correctIndex: 1, explanation: 'A README explains what the project does, how to set it up, and how to use it — the first thing most people read.' },
    { difficulty: 'Medium', question: 'Horizontal scaling vs vertical scaling: what is horizontal scaling?', options: ['Upgrading CPU/RAM of one server', 'Adding more servers to distribute load', 'Using a faster database', 'Compressing response sizes'], correctIndex: 1, explanation: 'Horizontal scaling (scale-out) adds more machines. Vertical scaling (scale-up) improves existing hardware. Horizontal is more resilient and common in cloud.' },
    { difficulty: 'Medium', question: 'What is the main purpose of a load balancer?', options: ['Store session data', 'Encrypt traffic', 'Distribute incoming requests across multiple servers', 'Cache database queries'], correctIndex: 2, explanation: 'A load balancer prevents any single server from becoming a bottleneck by evenly routing traffic, improving reliability and throughput.' },
    { difficulty: 'Medium', question: 'What does CI/CD stand for?', options: ['Code Integration / Code Deployment', 'Continuous Integration / Continuous Delivery', 'Central Interface / Central Database', 'Client-side Integration / Cloud Deployment'], correctIndex: 1, explanation: 'CI automates building and testing on every commit. CD automates releasing to staging or production, reducing manual errors.' },
    { difficulty: 'Medium', question: 'In REST API design, which is best practice for endpoint naming?', options: ['/getUser', '/user-data', '/users', '/UserDetails'], correctIndex: 2, explanation: 'REST conventions use plural nouns (/users, /orders) and rely on HTTP methods (GET, POST, DELETE) to describe the action.' },
    { difficulty: 'Medium', question: 'What is a webhook?', options: ['A library for HTTP requests', 'Automated HTTP callback triggered when an event occurs', 'A type of database connection', 'A frontend routing method'], correctIndex: 1, explanation: 'A webhook sends an HTTP POST to a specified URL when an event occurs (e.g. a payment completed), enabling real-time integrations.' },
    { difficulty: 'Medium', question: 'Which Git command creates a new branch and immediately switches to it?', options: ['git branch new-branch', 'git checkout new-branch', 'git checkout -b new-branch', 'git switch branch'], correctIndex: 2, explanation: 'git checkout -b <name> creates the branch and switches to it in one command. Equivalent to git branch + git checkout.' },
    { difficulty: 'Hard', question: 'In system design, what is eventual consistency?', options: ['Data is always consistent across all nodes', 'After updates stop, all replicas will eventually converge to the same value', 'Only the primary node is consistent', 'Consistency is never guaranteed'], correctIndex: 1, explanation: 'Eventual consistency means that in the absence of new updates, all replicas will converge to the same value over time — common in distributed databases like Cassandra.' },
    { difficulty: 'Hard', question: 'What problem does the CAP theorem address in distributed systems?', options: ['CPU scheduling in clusters', 'Trade-offs between Consistency, Availability, and Partition tolerance', 'Memory management across nodes', 'Network protocol selection'], correctIndex: 1, explanation: 'CAP theorem states that a distributed system cannot simultaneously guarantee all three: Consistency, Availability, and Partition tolerance.' },
    { difficulty: 'Hard', question: 'Which database type would you choose for a high-write, schema-less application like a social media feed?', options: ['Relational (MySQL)', 'Document NoSQL (MongoDB)', 'Graph DB (Neo4j)', 'Columnar (Redshift)'], correctIndex: 1, explanation: 'Document databases like MongoDB are schema-flexible, scale horizontally, and handle high-write workloads well — ideal for social feeds with variable content.' },
    { difficulty: 'Hard', question: 'What is the purpose of Docker in a software project?', options: ['Manage database migrations', 'Package application and dependencies into portable containers', 'Monitor server uptime', 'Automate UI testing'], correctIndex: 1, explanation: 'Docker packages an app and all its dependencies into a container. This ensures it runs identically in dev, staging, and production environments.' },
    { difficulty: 'Easy', question: 'What is the purpose of environment variables (e.g. .env file)?', options: ['Speed up compilation', 'Store sensitive configuration like API keys outside source code', 'Define function signatures', 'Set CSS variables'], correctIndex: 1, explanation: 'Environment variables store sensitive data (API keys, DB credentials) separately from code, preventing accidental exposure in version control.' },
    { difficulty: 'Medium', question: 'In a technical interview, when asked "design a URL shortener", the first step should be:', options: ['Write code immediately', 'Clarify requirements (scale, features, constraints)', 'Choose a database', 'Draw the UI'], correctIndex: 1, explanation: 'In system design, always clarify requirements first: how many URLs/day? Read-heavy or write-heavy? Custom aliases? This shows structured thinking.' },
    { difficulty: 'Medium', question: 'What is the difference between authentication and authorisation?', options: ['They are the same', 'Authentication verifies who you are; authorisation determines what you can access', 'Authorisation verifies identity; authentication grants permissions', 'Authentication is for APIs only'], correctIndex: 1, explanation: 'Authentication = who are you? (login, JWT). Authorisation = what are you allowed to do? (role-based access control). Both are required for secure apps.' },
    { difficulty: 'Hard', question: 'Which caching strategy writes to cache and database simultaneously?', options: ['Cache-aside', 'Write-through', 'Write-back', 'Read-through'], correctIndex: 1, explanation: 'Write-through updates both cache and database at the same time, ensuring consistency. Write-back only updates cache immediately, flushing to DB later.' },
    { difficulty: 'Hard', question: 'In a microservices architecture, what is an API Gateway?', options: ['A database router', 'Single entry point that routes requests to appropriate microservices', 'A message queue', 'A CDN node'], correctIndex: 1, explanation: 'An API Gateway acts as the front door for all client requests — it handles routing, authentication, rate limiting, and load balancing in one place.' },
  ],
};