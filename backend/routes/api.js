const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later'
});

router.use(limiter);

// API endpoints for learning resources

// Get bug bounty methodology
router.get('/methodology', (req, res) => {
  res.json({
    phases: [
      {
        phase: 'Reconnaissance',
        steps: [
          'Subdomain enumeration',
          'Port scanning',
          'Technology fingerprinting',
          'Content discovery'
        ]
      },
      {
        phase: 'Vulnerability Analysis',
        steps: [
          'Manual testing',
          'Automated scanning',
          'Code review',
          'Configuration analysis'
        ]
      },
      {
        phase: 'Exploitation',
        steps: [
          'Proof of concept development',
          'Impact assessment',
          'Documentation',
          'Responsible disclosure'
        ]
      }
    ]
  });
});

// Get vulnerability checklist
router.get('/checklist', (req, res) => {
  res.json({
    checklist: {
      'Authentication': [
        'Weak password policy',
        'Missing MFA',
        'Session fixation',
        'Insecure password reset'
      ],
      'Authorization': [
        'IDOR (Insecure Direct Object Reference)',
        'Missing function level access control',
        'Privilege escalation',
        'Path traversal'
      ],
      'Input Validation': [
        'SQL Injection',
        'XSS (Stored, Reflected, DOM)',
        'Command Injection',
        'XXE (XML External Entity)'
      ],
      'Business Logic': [
        'Race conditions',
        'Price manipulation',
        'Workflow bypass',
        'Mass assignment'
      ],
      'API Security': [
        'Missing rate limiting',
        'Excessive data exposure',
        'Mass assignment',
        'CORS misconfiguration'
      ]
    }
  });
});

// Get tools list
router.get('/tools', (req, res) => {
  res.json({
    tools: {
      'Reconnaissance': [
        { name: 'Subfinder', purpose: 'Subdomain enumeration' },
        { name: 'Amass', purpose: 'Attack surface mapping' },
        { name: 'Nmap', purpose: 'Port scanning' },
        { name: 'Wappalyzer', purpose: 'Technology detection' }
      ],
      'Vulnerability Scanning': [
        { name: 'Burp Suite', purpose: 'Web application testing' },
        { name: 'OWASP ZAP', purpose: 'Security scanning' },
        { name: 'Nuclei', purpose: 'Automated vulnerability detection' },
        { name: 'SQLMap', purpose: 'SQL injection testing' }
      ],
      'Exploitation': [
        { name: 'Metasploit', purpose: 'Penetration testing framework' },
        { name: 'XSStrike', purpose: 'XSS detection' },
        { name: 'Commix', purpose: 'Command injection testing' }
      ]
    }
  });
});

// Get learning resources
router.get('/resources', (req, res) => {
  res.json({
    resources: {
      'Platforms': [
        { name: 'HackerOne', url: 'https://hackerone.com' },
        { name: 'Bugcrowd', url: 'https://bugcrowd.com' },
        { name: 'Intigriti', url: 'https://intigriti.com' },
        { name: 'YesWeHack', url: 'https://yeswehack.com' }
      ],
      'Learning': [
        { name: 'PortSwigger Academy', url: 'https://portswigger.net/web-security' },
        { name: 'OWASP', url: 'https://owasp.org' },
        { name: 'PentesterLab', url: 'https://pentesterlab.com' },
        { name: 'HackTheBox', url: 'https://hackthebox.com' }
      ],
      'Documentation': [
        { name: 'OWASP Top 10', url: 'https://owasp.org/www-project-top-ten/' },
        { name: 'OWASP Testing Guide', url: 'https://owasp.org/www-project-web-security-testing-guide/' },
        { name: 'Bug Bounty Playbook', url: 'https://payhip.com/b/wAoh' }
      ]
    }
  });
});

// Practice challenges
router.get('/challenges', (req, res) => {
  res.json({
    challenges: [
      {
        id: 1,
        title: 'Broken Access Control Challenge',
        difficulty: 'Easy',
        description: 'Find and exploit IDOR vulnerability',
        endpoint: '/api/owasp/broken-access/vulnerable/:userId',
        hint: 'Try accessing other user IDs'
      },
      {
        id: 2,
        title: 'SQL Injection Challenge',
        difficulty: 'Medium',
        description: 'Bypass authentication using SQL injection',
        endpoint: '/api/owasp/sql-injection/vulnerable',
        hint: "Try: admin' OR '1'='1"
      },
      {
        id: 3,
        title: 'XSS Challenge',
        difficulty: 'Medium',
        description: 'Execute JavaScript in comment field',
        endpoint: '/api/owasp/xss/vulnerable',
        hint: 'Try: <script>alert("XSS")</script>'
      },
      {
        id: 4,
        title: 'SSRF Challenge',
        difficulty: 'Hard',
        description: 'Access internal resources',
        endpoint: '/api/owasp/ssrf/vulnerable',
        hint: 'Try accessing localhost or metadata endpoints'
      }
    ]
  });
});

module.exports = router;
