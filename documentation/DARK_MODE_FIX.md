# Dark Mode Mermaid Diagram Fix

**Date:** October 21, 2026  
**Issue:** Mermaid diagrams had poor contrast in GitHub dark mode  
**Status:** Fixed - All diagrams now work in both light and dark modes

---

## Problem

Mermaid diagrams used light pastel colors that:
- Had poor contrast in dark mode
- Made text hard to read
- Created visibility issues with borders

**Example of old colors:**
```
fill:#e3f2fd  (Very light blue - invisible in dark mode)
fill:#fff3e0  (Very light orange - invisible in dark mode)
```

---

## Solution

### 1. Use GitHub's Standard Color Palette

Applied GitHub's native colors that work in both modes:

```
Primary Blue:   #0366d6  (GitHub blue)
Purple:         #6f42c1  (Links/secondary)
Red:            #d73a49  (Danger/important)
Green:          #28a745  (Success)
Orange:         #f66a0a  (Warning)
Gray:           #6a737d  (Neutral)
```

### 2. Force White Text on All Colored Boxes

```mermaid
style NodeName fill:#0366d6,stroke:#044289,color:#fff
```

The `color:#fff` ensures white text on all colored backgrounds.

### 3. Add Theme Variables to Mermaid Init

```javascript
%%{init: {
  'theme':'base',
  'themeVariables': {
    'primaryColor':'#0366d6',
    'primaryTextColor':'#fff',
    'primaryBorderColor':'#0366d6',
    'lineColor':'#6a737d',
    'secondaryColor':'#6f42c1',
    'tertiaryColor':'#28a745'
  }
}}%%
```

---

## Changes Made

### All Diagrams Updated

1. **Learning Journey** - Main flow diagram
2. **Learning Paths** - 4 path flowchart  
3. **Tech Stack** - Technology graph
4. **Module Dependencies** - Dependency graph
5. **AI Agent Architecture** - System diagram
6. **RAG System** - Sequence diagram
7. **Lesson Flow** - State diagram
8. **Deployment Pipeline** - DevOps flow
9. **Demo Categories** - Mindmap
10. **Quality Standards** - Flowchart
11. **License Options** - Decision tree
12. **Contributing Workflow** - Git graph
13. **Module Progress** - Pie chart
14. **Support Options** - Mindmap
15. **Target Audience** - Mindmap
16. **Final CTA** - Simple flow

---

## Color Scheme

### Primary Colors (High Contrast)

| Color | Hex | Usage | Works In |
|-------|-----|-------|----------|
| Blue | `#0366d6` | Primary, foundations | Light + Dark |
| Purple | `#6f42c1` | Secondary, advanced | Light + Dark |
| Red | `#d73a49` | Important, alerts | Light + Dark |
| Green | `#28a745` | Success, completion | Light + Dark |
| Orange | `#f66a0a` | Warnings, applied | Light + Dark |
| Gray | `#6a737d` | Neutral, lines | Light + Dark |

### Text Colors

| Element | Light Mode | Dark Mode |
|---------|-----------|-----------|
| Node text | `#fff` (white) | `#fff` (white) |
| Labels | Auto (GitHub) | Auto (GitHub) |
| Notes | `#24292e` | Auto (inverts) |

---

## Testing

### Verified In

- ✓ GitHub Light Mode
- ✓ GitHub Dark Mode  
- ✓ GitHub Dark Dimmed
- ✓ GitHub Dark High Contrast

### Browser Tested

- ✓ Chrome
- ✓ Firefox
- ✓ Safari
- ✓ Edge

---

## Before & After Examples

### Before (Light Pastel Colors)

```mermaid
graph TD
    A[Node] --> B[Node]
    style A fill:#e3f2fd  ❌ Invisible in dark mode
    style B fill:#fff3e0  ❌ Invisible in dark mode
```

### After (High Contrast Colors)

```mermaid
graph TD
    A[Node] --> B[Node]
    style A fill:#0366d6,stroke:#044289,color:#fff  ✓ Works everywhere
    style B fill:#6f42c1,stroke:#5a32a3,color:#fff  ✓ Works everywhere
```

---

## Mermaid Theme Configuration Reference

### Full Theme Template

```javascript
%%{init: {
  'theme':'base',
  'themeVariables': {
    // Node colors
    'primaryColor':'#0366d6',
    'primaryTextColor':'#fff',
    'primaryBorderColor':'#0366d6',
    
    // Secondary elements
    'secondaryColor':'#6f42c1',
    'secondaryTextColor':'#fff',
    'secondaryBorderColor':'#5a32a3',
    
    // Tertiary elements  
    'tertiaryColor':'#28a745',
    'tertiaryTextColor':'#fff',
    'tertiaryBorderColor':'#22863a',
    
    // Lines and connections
    'lineColor':'#6a737d',
    
    // Notes
    'noteBkgColor':'#f1f8ff',
    'noteBorderColor':'#0366d6',
    'noteTextColor':'#24292e',
    
    // Sequence diagrams
    'actorBkg':'#0366d6',
    'actorTextColor':'#fff',
    'actorLineColor':'#044289',
    'signalColor':'#24292e',
    'signalTextColor':'#24292e',
    
    // Labels
    'labelBoxBkgColor':'#fafbfc',
    'labelBoxBorderColor':'#d1d5da',
    'labelTextColor':'#24292e',
    
    // Other
    'fontSize':'16px'
  }
}}%%
```

---

## Best Practices

### 1. Always Use Theme Init

Every Mermaid diagram should start with:

```
%%{init: {'theme':'base', 'themeVariables': {...}}}%%
```

### 2. Explicit Text Colors

Always specify `color:#fff` in styles:

```
style Node fill:#0366d6,stroke:#044289,color:#fff
```

### 3. Use GitHub Colors

Stick to GitHub's standard palette for consistency.

### 4. Test Both Modes

Check every diagram in both light and dark modes.

### 5. Maintain Contrast

Ensure at least 4.5:1 contrast ratio (WCAG AA standard).

---

## Common Issues & Fixes

### Issue: Text Not Visible

**Cause:** No text color specified  
**Fix:** Add `color:#fff` to style

### Issue: Borders Too Light

**Cause:** Border color same as background  
**Fix:** Use darker shade for stroke

### Issue: Notes Hard to Read

**Cause:** Default note colors don't work in dark  
**Fix:** Override in themeVariables

### Issue: Subgraph Labels Invisible

**Cause:** Subgraph uses different color system  
**Fix:** Use style override:

```
style SubgraphName fill:#0366d6,stroke:#044289,color:#fff
```

---

## Alternative: Use Picture Mode

If colors still don't work, export as images:

```bash
# Install mermaid-cli
npm install -g @mermaid-js/mermaid-cli

# Generate PNG
mmdc -i diagram.mmd -o diagram.png -t dark

# Generate SVG
mmdc -i diagram.mmd -o diagram.svg -t dark
```

Then use in markdown:

```markdown
![Diagram](./documentation/diagrams/exports/diagram.png)
```

---

## Resources

- [Mermaid Docs](https://mermaid.js.org/)
- [Mermaid Live Editor](https://mermaid.live/)
- [GitHub Primer Colors](https://primer.style/primitives/colors)
- [WCAG Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)

---

## Summary

✓ **All 16 Mermaid diagrams** updated with high-contrast colors  
✓ **White text** on all colored nodes  
✓ **GitHub standard palette** used throughout  
✓ **Theme variables** configured for consistency  
✓ **Tested** in all GitHub themes  

**Result:** Perfect visibility in both light and dark modes!
