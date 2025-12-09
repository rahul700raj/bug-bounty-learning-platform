const express = require('express');
const router = express.Router();

// OWASP Top 10 Demonstrations

// 1. Broken Access Control - VULNERABLE
router.get('/broken-access/vulnerable/:userId', (req, res) => {
  // VULNERABILITY: No authorization check
  const userId = req.params.userId;
  const userData = {
    id: userId,
    username: `user${userId}`,
    email: `user${userId}@example.com`,
    ssn: '123-45-6789',
    creditCard: '4532-1234-5678-9010'
  };
  res.json({ message: 'VULNERABLE: Anyone can access any user data', data: userData });
});

// 1. Broken Access Control - SECURE
router.get('/broken-access/secure/:userId', (req, res) => {
  // SECURE: Proper authorization check
  const requestedUserId = req.params.userId;
  const authenticatedUserId = req.headers['user-id']; // In real app, from JWT
  
  if (requestedUserId !== authenticatedUserId) {
    return res.status(403).json({ error: 'Access denied: You can only access your own data' });
  }
  
  const userData = {
    id: requestedUserId,
    username: `user${requestedUserId}`,
    email: `user${requestedUserId}@example.com`
  };
  res.json({ message: 'SECURE: Authorization enforced', data: userData });
});

// 2. SQL Injection - VULNERABLE
router.post('/sql-injection/vulnerable', (req, res) => {
  const { username } = req.body;
  // VULNERABILITY: Direct string concatenation
  const query = `SELECT * FROM users WHERE username = '${username}'`;
  res.json({ 
    message: 'VULNERABLE: SQL Injection possible',
    query: query,
    exploit: "Try: admin' OR '1'='1",
    result: 'Query would execute and bypass authentication'
  });
});

// 2. SQL Injection - SECURE
router.post('/sql-injection/secure', (req, res) => {
  const { username } = req.body;
  // SECURE: Parameterized query (示例)
  res.json({ 
    message: 'SECURE: Using parameterized queries',
    method: 'Prepared statements prevent SQL injection',
    example: 'db.query("SELECT * FROM users WHERE username = ?", [username])'
  });
});

// 3. XSS (Cross-Site Scripting) - VULNERABLE
router.post('/xss/vulnerable', (req, res) => {
  const { comment } = req.body;
  // VULNERABILITY: No sanitization
  const html = `<div class="comment">${comment}</div>`;
  res.json({ 
    message: 'VULNERABLE: XSS possible',
    rendered: html,
    exploit: 'Try: <script>alert("XSS")</script>'
  });
});

// 3. XSS - SECURE
router.post('/xss/secure', (req, res) => {
  const { comment } = req.body;
  // SECURE: HTML encoding
  const sanitized = comment
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
  
  res.json({ 
    message: 'SECURE: Input sanitized',
    original: comment,
    sanitized: sanitized
  });
});

// 4. Insecure Deserialization - VULNERABLE
router.post('/deserialization/vulnerable', (req, res) => {
  const { data } = req.body;
  try {
    // VULNERABILITY: Deserializing untrusted data
    const obj = JSON.parse(data);
    res.json({ 
      message: 'VULNERABLE: Unsafe deserialization',
      parsed: obj,
      warning: 'Could execute malicious code in some languages'
    });
  } catch (e) {
    res.status(400).json({ error: 'Invalid JSON' });
  }
});

// 5. Security Misconfiguration - Example
router.get('/misconfiguration/debug', (req, res) => {
  // VULNERABILITY: Debug info exposed
  res.json({
    message: 'VULNERABLE: Debug information exposed',
    environment: process.env,
    stack: new Error().stack,
    warning: 'Never expose debug info in production'
  });
});

// 6. Authentication Failure - VULNERABLE
router.post('/auth/vulnerable', (req, res) => {
  const { username, password } = req.body;
  // VULNERABILITY: Weak password policy, no rate limiting
  if (username === 'admin' && password === 'admin') {
    res.json({ 
      message: 'VULNERABLE: Weak authentication',
      token: 'fake-jwt-token',
      issues: ['Weak password', 'No rate limiting', 'No MFA']
    });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// 7. SSRF (Server-Side Request Forgery) - VULNERABLE
router.post('/ssrf/vulnerable', (req, res) => {
  const { url } = req.body;
  // VULNERABILITY: No URL validation
  res.json({
    message: 'VULNERABLE: SSRF possible',
    requestedUrl: url,
    exploit: 'Try: http://localhost:3000/admin or http://169.254.169.254/latest/meta-data/',
    warning: 'Could access internal resources'
  });
});

// 8. Command Injection - VULNERABLE
router.post('/command-injection/vulnerable', (req, res) => {
  const { filename } = req.body;
  // VULNERABILITY: Unsanitized input in command
  const command = `cat ${filename}`;
  res.json({
    message: 'VULNERABLE: Command injection possible',
    command: command,
    exploit: 'Try: file.txt; ls -la',
    warning: 'Could execute arbitrary commands'
  });
});

// Get all OWASP Top 10 categories
router.get('/categories', (req, res) => {
  res.json({
    categories: [
      { id: 1, name: 'Broken Access Control', severity: 'Critical' },
      { id: 2, name: 'Cryptographic Failures', severity: 'High' },
      { id: 3, name: 'Injection', severity: 'Critical' },
      { id: 4, name: 'Insecure Design', severity: 'High' },
      { id: 5, name: 'Security Misconfiguration', severity: 'High' },
      { id: 6, name: 'Vulnerable Components', severity: 'High' },
      { id: 7, name: 'Authentication Failures', severity: 'Critical' },
      { id: 8, name: 'Data Integrity Failures', severity: 'High' },
      { id: 9, name: 'Security Logging Failures', severity: 'Medium' },
      { id: 10, name: 'SSRF', severity: 'High' }
    ]
  });
});

module.exports = router;
