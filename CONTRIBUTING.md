# Contributing to AI & Machine Learning Roadmap

Thank you for your interest in contributing! 

**About This Project:** This is a **personal learning repository** created by a student in the Master of Artificial Intelligence program at the University of Auckland. It's **not official university material** - just one student's study notes and implementations shared publicly to help fellow learners.

This repository is built by students, for students, and we welcome contributions from the community.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Getting Started](#getting-started)
- [Contribution Guidelines](#contribution-guidelines)
- [Style Guide](#style-guide)
- [Academic Integrity](#academic-integrity)
- [Pull Request Process](#pull-request-process)

---

## Code of Conduct

This project is committed to providing a welcoming and inclusive environment for all contributors. By participating, you agree to:

- Be respectful and considerate in all interactions
- Welcome newcomers and help them learn
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other community members

---

## How Can I Contribute?

### 1. Report Bugs or Issues

Found a bug in the code or an error in the content?

- Check if the issue already exists in [Issues](../../issues)
- If not, create a new issue with:
  - Clear, descriptive title
  - Steps to reproduce (for bugs)
  - Expected vs actual behavior
  - Screenshots if applicable
  - Your environment (Python version, OS, etc.)

### 2. Suggest Enhancements

Have ideas for new lessons, improvements, or features?

- Open an issue with the `enhancement` label
- Describe your suggestion clearly
- Explain why it would be valuable
- Provide examples if possible

### 3. Improve Documentation

- Fix typos or grammatical errors
- Clarify confusing explanations
- Add more examples or visualizations
- Improve code comments
- Translate content to other languages

### 4. Add New Content

- Create new lessons or tutorials
- Add practice exercises
- Contribute project ideas
- Share real-world applications

### 5. Fix Bugs

- Browse open issues labeled `bug`
- Comment on the issue you'd like to work on
- Submit a pull request with your fix

---

## Getting Started

### Prerequisites

- Python 3.8+
- Jupyter Notebook or JupyterLab
- Git and GitHub account
- Basic understanding of AI/ML concepts

### Setup Development Environment

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR-USERNAME/AI.git
   cd AI
   ```

3. **Create a virtual environment**
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

4. **Install dependencies**
   ```bash
   pip install tensorflow torch numpy matplotlib jupyter
   ```

5. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

---

## Contribution Guidelines

### Content Contributions

**For New Lessons:**

1. Follow the existing lesson structure:
   - Clear learning objectives
   - Step-by-step explanations
   - Code with detailed comments
   - Visualizations where appropriate
   - Practice exercises
   - References and further reading

2. Use Jupyter Notebooks (.ipynb format)

3. Include metadata:
   - Author information
   - Creation date
   - Last updated date
   - Prerequisites
   - Estimated completion time

4. Test all code thoroughly:
   - Ensure all cells run without errors
   - Verify outputs are correct
   - Test on fresh environment

5. Add your lesson to the appropriate level:
   - `Basic/` - Foundational concepts
   - `Intermediate/` - Advanced techniques
   - `Advanced/` - Production systems
   - `Expert/` - Research topics

**For Code Improvements:**

1. Maintain code quality:
   - Follow PEP 8 style guide for Python
   - Add meaningful comments
   - Use descriptive variable names
   - Keep functions focused and modular

2. Ensure backward compatibility:
   - Don't break existing functionality
   - Update documentation if APIs change

3. Add tests where appropriate

**For Documentation:**

1. Use clear, concise language
2. Provide examples
3. Update table of contents if needed
4. Check spelling and grammar
5. Ensure links work correctly

---

## Style Guide

### Code Style

**Python:**
- Follow PEP 8
- Use 4 spaces for indentation
- Maximum line length: 88 characters (Black formatter standard)
- Use type hints where appropriate

```python
# Good
def calculate_loss(predictions: np.ndarray, targets: np.ndarray) -> float:
    """Calculate mean squared error loss.
    
    Args:
        predictions: Model predictions
        targets: Ground truth values
        
    Returns:
        Mean squared error
    """
    return np.mean((predictions - targets) ** 2)

# Avoid
def calc(p,t):
    return np.mean((p-t)**2)
```

### Markdown Style

- Use ATX-style headers (`#` not underlines)
- Add blank lines around headers
- Use fenced code blocks with language specification
- Use relative links for internal references
- Keep lines under 100 characters when possible

### Notebook Style

1. **First Cell**: Title and metadata
   ```markdown
   # Lesson Title
   
   **Author:** Your Name  
   **LinkedIn:** [Your Profile](link)  
   **Created:** YYYY-MM-DD  
   **Updated:** YYYY-MM-DD
   
   ## Learning Objectives
   - Objective 1
   - Objective 2
   ```

2. **Structure:**
   - Introduction
   - Prerequisites
   - Theory/Concepts
   - Implementation
   - Examples
   - Exercises
   - Summary
   - References

3. **Code Cells:**
   - One concept per cell
   - Add comments explaining the code
   - Print intermediate results
   - Include assertions for validation

4. **Markdown Cells:**
   - Explain what the next code will do
   - Provide context and intuition
   - Use LaTeX for mathematical notation
   - Add visualizations

---

## Academic Integrity

**IMPORTANT:** This repository is a **personal learning resource** created by a student, not official university material. It's not a solution manual.

### For Contributors:

**Remember: This is one student's personal study notes, not official course material from any institution.**

- **Original Work**: Only contribute your own original work or properly attributed content
- **Proper Attribution**: Always cite sources, papers, and inspirations
- **No Assignment Solutions**: Do not submit solutions to specific university assignments from any institution
- **Educational Focus**: Contributions should teach concepts, not provide copy-paste answers for coursework
- **General Examples Only**: Keep implementations general and educational, not tied to specific assignments

### For Users:

- **Learn, Don't Copy**: Use this repository to understand concepts, not to copy code for assignments
- **Academic Honesty**: Follow your institution's academic integrity policies - you are responsible
- **Cite Appropriately**: If you use ideas from this repository, cite it properly in your work
- **Understand First**: Make sure you understand the code before using it in your work
- **Not Official Material**: Remember this is a fellow student's notes, not authoritative course content

### What We Accept:

✅ General tutorials and explanations  
✅ Example implementations of algorithms and concepts  
✅ Practice exercises with solutions  
✅ Project templates and starter code  
✅ Conceptual explanations and visualizations  
✅ Personal learning notes and study materials

### What We Don't Accept:

❌ Solutions to specific university assignments from any institution  
❌ Exam questions or answers  
❌ Plagiarized content  
❌ Code designed to bypass academic integrity checks  
❌ Content that violates copyright  
❌ Material that could be directly submitted as coursework

---

## Pull Request Process

### Before Submitting

1. **Test your changes**
   - Run all affected notebooks
   - Verify outputs are correct
   - Check for errors or warnings

2. **Update documentation**
   - Update README.md if needed
   - Add your lesson to the table of contents
   - Update the MAI_STUDENT_GUIDE.md if relevant

3. **Clean up**
   - Remove unnecessary files
   - Clear notebook outputs if they're large
   - Check for sensitive information

4. **Commit with clear messages**
   ```bash
   git add .
   git commit -m "Add lesson on Transformer architecture"
   ```

### Submitting Pull Request

1. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Fill out the PR template

3. **PR Description Should Include:**
   - What changes you made
   - Why you made them
   - Any issues this addresses
   - Screenshots (if applicable)
   - Testing performed

4. **Example PR Title:**
   - ✅ "Add lesson on Attention Mechanisms (B11)"
   - ✅ "Fix bug in gradient calculation in B02"
   - ✅ "Improve documentation for CNN lesson"
   - ❌ "Update"
   - ❌ "Fix stuff"

### Review Process

1. **Automated Checks**
   - Code will be checked for basic issues
   - Notebooks will be validated

2. **Maintainer Review**
   - A maintainer will review your PR
   - They may request changes
   - Be responsive to feedback

3. **Approval and Merge**
   - Once approved, your PR will be merged
   - Your contribution will be credited
   - Thank you for contributing!

### After Your PR is Merged

- Delete your feature branch
- Pull the latest changes from main
- Celebrate! 🎉

---

## Recognition

All contributors will be:
- Listed in the repository contributors
- Credited in relevant documentation
- Acknowledged in release notes

Significant contributors may be:
- Added to the README acknowledgments
- Invited to become maintainers
- Featured in community highlights

---

## Questions?

- **General Questions**: Open a [Discussion](../../discussions)
- **Bug Reports**: Open an [Issue](../../issues)
- **Security Issues**: Email the maintainer directly (see SECURITY.md)
- **Other**: Reach out via LinkedIn (see README.md)

---

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

## Thank You!

Your contributions help make quality AI education accessible to everyone. Whether you're fixing a typo or adding a complete lesson, every contribution matters.

Happy contributing! 🚀
