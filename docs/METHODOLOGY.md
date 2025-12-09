# Bug Bounty Methodology

## Complete Bug Bounty Hunting Guide

### Phase 1: Reconnaissance

#### 1.1 Passive Reconnaissance
- **Subdomain Enumeration**
  - Tools: Subfinder, Amass, Assetfinder
  - Certificate transparency logs
  - DNS records analysis
  
- **Technology Stack Identification**
  - Wappalyzer, BuiltWith
  - HTTP headers analysis
  - JavaScript file analysis

- **Information Gathering**
  - Google dorking
  - GitHub reconnaissance
  - Wayback Machine
  - Social media OSINT

#### 1.2 Active Reconnaissance
- **Port Scanning**
  - Nmap, Masscan
  - Service version detection
  - Banner grabbing

- **Content Discovery**
  - Directory brute-forcing (ffuf, dirsearch)
  - Parameter discovery
  - API endpoint enumeration

### Phase 2: Vulnerability Analysis

#### 2.1 Authentication Testing
- [ ] Weak password policy
- [ ] Username enumeration
- [ ] Brute force protection
- [ ] Session management
- [ ] Password reset flaws
- [ ] Multi-factor authentication bypass
- [ ] OAuth/SSO vulnerabilities

#### 2.2 Authorization Testing
- [ ] IDOR (Insecure Direct Object References)
- [ ] Privilege escalation (horizontal/vertical)
- [ ] Missing function-level access control
- [ ] Path traversal
- [ ] Forced browsing

#### 2.3 Input Validation
- [ ] SQL Injection (Error-based, Blind, Time-based)
- [ ] XSS (Reflected, Stored, DOM-based)
- [ ] Command Injection
- [ ] XXE (XML External Entity)
- [ ] LDAP Injection
- [ ] Template Injection (SSTI)
- [ ] File Upload vulnerabilities

#### 2.4 Business Logic Flaws
- [ ] Race conditions
- [ ] Price manipulation
- [ ] Workflow bypass
- [ ] Mass assignment
- [ ] Insufficient process validation

#### 2.5 API Security
- [ ] Broken object level authorization
- [ ] Broken authentication
- [ ] Excessive data exposure
- [ ] Lack of rate limiting
- [ ] Mass assignment
- [ ] Security misconfiguration
- [ ] Injection flaws
- [ ] Improper assets management

### Phase 3: Exploitation

#### 3.1 Proof of Concept Development
- Create minimal, reproducible PoC
- Document step-by-step reproduction
- Include screenshots/videos
- Demonstrate impact clearly

#### 3.2 Impact Assessment
- **Critical**: Remote code execution, authentication bypass
- **High**: SQL injection, privilege escalation, sensitive data exposure
- **Medium**: XSS, CSRF, information disclosure
- **Low**: Minor information leaks, non-exploitable issues

### Phase 4: Reporting

#### 4.1 Report Structure
```
Title: Clear, concise vulnerability description

Summary:
- Brief overview of the vulnerability
- Affected component/endpoint

Vulnerability Details:
- Type of vulnerability
- Root cause analysis
- Technical details

Steps to Reproduce:
1. Step-by-step instructions
2. Include all necessary data
3. Screenshots/videos

Impact:
- What can an attacker do?
- Business impact
- User impact

Remediation:
- Specific fix recommendations
- Code examples if applicable
- Best practices

References:
- OWASP links
- CVE references
- Similar vulnerabilities
```

### Tools Checklist

#### Reconnaissance
- [ ] Subfinder
- [ ] Amass
- [ ] Assetfinder
- [ ] Nmap
- [ ] Masscan

#### Vulnerability Scanning
- [ ] Burp Suite Professional
- [ ] OWASP ZAP
- [ ] Nuclei
- [ ] SQLMap
- [ ] XSStrike

#### Exploitation
- [ ] Metasploit
- [ ] Commix
- [ ] NoSQLMap

#### Utilities
- [ ] ffuf
- [ ] dirsearch
- [ ] Arjun (parameter discovery)
- [ ] JWT_Tool
- [ ] CrackMapExec

### Best Practices

1. **Always Get Permission**
   - Only test on authorized targets
   - Read program scope carefully
   - Respect out-of-scope items

2. **Be Ethical**
   - Don't access user data unnecessarily
   - Don't perform DoS attacks
   - Report responsibly

3. **Document Everything**
   - Keep detailed notes
   - Save all requests/responses
   - Screenshot important findings

4. **Stay Updated**
   - Follow security researchers
   - Read disclosed reports
   - Learn new techniques

5. **Continuous Learning**
   - Practice on legal platforms
   - Read writeups
   - Participate in CTFs

### Resources

- **Platforms**: HackerOne, Bugcrowd, Intigriti, YesWeHack
- **Learning**: PortSwigger Academy, PentesterLab, HackTheBox
- **Communities**: Reddit r/bugbounty, Twitter #bugbounty
- **Books**: Web Application Hacker's Handbook, Bug Bounty Playbook

---

**Remember**: Ethical hacking requires authorization. Always hack legally!
