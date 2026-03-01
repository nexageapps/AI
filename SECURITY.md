# Security Policy

## Supported Versions

This repository does not follow a versioned release model. Security fixes are
applied to the latest revision of the default branch only.

| Version        | Supported          |
| -------------- | ------------------ |
| Latest (main)  | :white_check_mark: |
| Older commits  | :x:                |

## Reporting a Vulnerability

If you believe you have found a security vulnerability in this project, please
contact our security team at **security@nexageapps.com**.

When reporting, please include:
- A description of the vulnerability and its potential impact
- Steps to reproduce (proof-of-concept, logs, or screenshots if available)
- The affected version(s) and any relevant configuration details

We ask that you **do not** open a public issue for security reports.

**Response expectations**
- We aim to acknowledge your report within **2 business days**.
- We will provide you with an initial assessment or status update within
  **7 business days** of acknowledgement.
- We will keep you informed of the fix progress and expected release timeline.

<<<<<<< Updated upstream
If we confirm the vulnerability, we will work to address it as quickly as
possible before publicly disclosing details. After a fix is released, we may
credit you as the reporter, if you wish, and summarize the issue in the
changelog or a security advisory.
=======
---

## Reporting a Security Vulnerability

If you discover a security vulnerability in this repository, please help us by reporting it responsibly.

### How to Report

**DO NOT** create a public GitHub issue for security vulnerabilities.

Instead, please report security issues through one of these channels:

#### Option 1: GitHub Security Advisories (Preferred)
1. Go to the [Security tab](https://github.com/nexageapps/AI/security)
2. Click "Report a vulnerability"
3. Fill out the form with details

#### Option 2: Direct Contact
- **Email:** Create an issue with title "SECURITY: [Brief Description]" and we'll provide a secure contact method
- **LinkedIn:** [Karthik Arjun](https://www.linkedin.com/in/karthik-arjun-a5b4a258/)

### What to Include in Your Report

Please provide as much information as possible:

1. **Type of vulnerability** (e.g., code injection, XSS, dependency issue)
2. **Location** (file path, line number, or URL)
3. **Step-by-step reproduction** instructions
4. **Potential impact** of the vulnerability
5. **Suggested fix** (if you have one)
6. **Your contact information** for follow-up questions

### Report Format Template

Please structure your security report as follows:

**Vulnerability Type:**  
Specify the type of vulnerability (e.g., Dependency vulnerability, Code injection, XSS, Authentication bypass)

**Location:**  
Provide the exact location (e.g., requirements.txt line 15, Basic/B01-Arithmetic.ipynb cell 5)

**Description:**  
Provide a detailed description of the security issue and why it's a concern

**Steps to Reproduce:**  
1. First step to reproduce the issue
2. Second step to reproduce the issue
3. Third step to reproduce the issue
4. Continue as needed

**Impact:**  
Explain what an attacker could do if they exploit this vulnerability

**Suggested Fix:**  
(Optional) Provide your recommendation for fixing the issue

**Additional Context:**  
(Optional) Any other relevant information, screenshots, or logs

---

## Response Timeline

We are committed to addressing security issues promptly:

| Timeline | Action |
| -------- | ------ |
| **24 hours** | Initial acknowledgment of your report |
| **72 hours** | Preliminary assessment and severity classification |
| **7 days** | Detailed investigation and fix development |
| **14 days** | Patch release and public disclosure (if applicable) |

**Note:** Complex issues may require more time. We'll keep you updated throughout the process.

---

## Severity Classification

We classify vulnerabilities using the following criteria:

### 🔴 Critical
- Remote code execution
- Unauthorized access to systems
- Data breach potential
- **Response:** Immediate action within 24 hours

### 🟠 High
- Privilege escalation
- Authentication bypass
- Sensitive data exposure
- **Response:** Fix within 7 days

### 🟡 Medium
- Cross-site scripting (XSS)
- Denial of service (DoS)
- Information disclosure
- **Response:** Fix within 14 days

### 🟢 Low
- Minor information leaks
- Non-exploitable bugs
- Best practice violations
- **Response:** Fix in next regular update

---

## What Happens After You Report

1. **Acknowledgment:** We'll confirm receipt of your report within 24 hours
2. **Investigation:** Our team will investigate and validate the issue
3. **Communication:** We'll keep you updated on progress
4. **Fix Development:** We'll develop and test a fix
5. **Disclosure:** We'll coordinate public disclosure with you
6. **Credit:** We'll acknowledge your contribution (if you wish)

---

## Security Best Practices for Users

### When Using This Repository

✅ **DO:**
- Keep your local environment updated
- Use virtual environments for Python dependencies
- Review code before running notebooks
- Report suspicious content or behavior
- Use official installation methods only

❌ **DON'T:**
- Run notebooks from untrusted sources
- Share API keys or credentials in notebooks
- Commit sensitive data to your forks
- Disable security warnings without understanding them
- Use outdated dependencies

### For Contributors

If you're contributing to this repository:

1. **Never commit:**
   - API keys, tokens, or passwords
   - Personal data or PII
   - Proprietary or confidential information

2. **Always:**
   - Review your changes before committing
   - Use `.gitignore` for sensitive files
   - Follow secure coding practices
   - Test your code thoroughly

3. **Dependencies:**
   - Only add necessary dependencies
   - Use specific version numbers
   - Check for known vulnerabilities
   - Keep dependencies updated

---

## Dependency Security

### Automated Scanning
- **Dependabot:** Automatically checks for vulnerable dependencies
- **GitHub Security Advisories:** Monitors for security issues
- **Regular Updates:** Dependencies reviewed monthly

### Manual Review
We manually review all dependency updates for:
- Breaking changes
- Security implications
- Compatibility issues
- License compliance

---

## Disclosure Policy

### Coordinated Disclosure

We follow responsible disclosure practices:

1. **Private Disclosure:** Security issues are fixed privately first
2. **Patch Release:** Fix is released without detailed vulnerability info
3. **Public Disclosure:** After 90 days or when fix is widely deployed
4. **Credit:** Reporter is acknowledged (with permission)

### Public Disclosure Timeline

- **Day 0:** Vulnerability reported
- **Day 1-7:** Investigation and fix development
- **Day 7-14:** Testing and patch release
- **Day 14-90:** Users encouraged to update
- **Day 90+:** Full public disclosure with details

---

## Security Updates and Notifications

### How to Stay Informed

1. **Watch this repository** for security advisories
2. **Enable Dependabot alerts** on your fork
3. **Follow releases** for security patches
4. **Check the changelog** for security-related updates

### Notification Channels

- **GitHub Security Advisories:** Primary channel for critical issues
- **Release Notes:** All security fixes documented
- **README Updates:** Major security changes announced

---

## Contact Information

### Security Team

**Primary Contact:** Karthik Arjun
- **Role:** Repository Owner & Maintainer
- **LinkedIn:** [karthik-arjun-a5b4a258](https://www.linkedin.com/in/karthik-arjun-a5b4a258/)
- **GitHub:** [@nexageapps](https://github.com/nexageapps)
- **Hugging Face:** [nexageapps](https://huggingface.co/spaces/nexageapps)

### Response Team
- Security issues are handled by the repository owner
- Critical issues may involve external security experts
- All reports are treated confidentially

---

## Acknowledgments

We appreciate the security research community and thank all researchers who responsibly disclose vulnerabilities to us.

### Hall of Fame

Contributors who have helped improve our security:

| Date | Reporter | Issue Type | Severity |
| ---- | -------- | ---------- | -------- |
| TBD | - | - | - |

*Your name could be here! Report security issues responsibly.*

---

## Legal

### Safe Harbor

We support security research conducted in good faith. We will not pursue legal action against researchers who:

- Make a good faith effort to avoid privacy violations and data destruction
- Report vulnerabilities promptly and privately
- Give us reasonable time to fix issues before public disclosure
- Do not exploit vulnerabilities beyond what's necessary to demonstrate the issue

### Scope

This security policy applies to:
- ✅ This repository and its contents
- ✅ Official releases and distributions
- ✅ Dependencies we directly maintain

This policy does NOT apply to:
- ❌ Third-party services or websites
- ❌ User-created forks or modifications
- ❌ External dependencies (report to their maintainers)

---

## Questions?

If you have questions about this security policy or need clarification:

1. Open a general (non-security) issue on GitHub
2. Contact us via LinkedIn
3. Check our [Contributing Guidelines](CONTRIBUTING.md) for more information

---

**Last Updated:** March 1, 2026  
**Version:** 2.0  
**Next Review:** June 1, 2026

---

*This security policy is subject to change. Please check back regularly for updates.*
>>>>>>> Stashed changes
