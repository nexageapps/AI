# Application Cleanup Required

**Status:** COMPSCI and University references found in built JavaScript files  
**Action Required:** Rebuild apps from source with updated branding

---

## Issue

COMPSCI course codes and University of Auckland references are embedded in:
- Minified JavaScript files (`build/static/js/main.*.js`)
- HTML title tags and meta descriptions
- Application headers and UI text

## Affected Applications

### Need Rebuild

1. **CNN Explorer** (`neural-networks/week3/cnn-explorer/`)
   - Contains: "COMPSCI 714 · Week 3"
   - Location: `build/static/js/main.9c944fb3.js`

2. **Knowledge Graph Playground** (`ai-fundamentals/week3/kg-playground/`)
   - Contains: "UoA COMPSCI 713"
   - Location: `build/static/js/main.5dcb976b.js`, `build/index.html`

3. **Symbolic Logic Explorer** (`ai-fundamentals/week1/symbolic-logic/`)
   - Contains: "COMPSCI 713"
   - Location: `build/static/js/main.4e3f72a2.js`, `build/index.html`

4. **Neural Network Explorer** (`ai-fundamentals/week2/neural-network/`)
   - Contains: "COMPSCI 714 · Week 2"
   - Location: `build/static/js/main.191a296b.js`, `build/index.html`

5. **RNN Explorer** (`ai-fundamentals/week4/rnn-explorer/`)
   - Contains: "COMPSCI 713"
   - Location: `build/static/js/main.c8b49284.js`, `build/index.html`

6. **Data Preprocessing Studio** (`neural-networks/week3/data-preprocessing-studio/`)
   - Contains: "UoA COMPSCI 714"
   - Location: `build/static/js/main.3af85f0f.js`

7. **Transformer Explorer** (`neural-networks/week4/transformer-explorer/`)
   - Contains: "COMPSCI 714 · Week 4"
   - Location: `build/static/js/main.374b9b4e.js`

8. **BPE Explorer** (`neural-networks/week4/bpe-explorer/`)
   - Contains: "COMPSCI 714 · Week 4"
   - Location: `build/static/js/main.9588b475.js`

### Also Check Archive

- `ai-fundamentals/week2/archive/` - Old deployment docs mention compsci713

---

## Solution

### Option 1: Rebuild from Source (Recommended)

For each application:

```bash
cd application/<app-path>

# Install dependencies
npm install

# Update source code to remove COMPSCI references
# Edit src/App.js, src/index.html, package.json, etc.

# Rebuild
npm run build

# Test locally
npm start

# Deploy
npm run deploy  # or manual gh-pages deployment
```

### Option 2: Quick Fix (Temporary)

Update only the visible text in source files, then rebuild:

**Files to update in each app:**

1. `public/index.html`
   ```html
   <!-- Change this -->
   <title>App Name — COMPSCI 713 | UoA</title>
   
   <!-- To this -->
   <title>App Name | AI Engineering</title>
   ```

2. `src/App.js` or `src/components/Header.js`
   ```javascript
   // Change this
   <h1>UoA COMPSCI 713 — App Name</h1>
   <span className="badge">COMPSCI 713</span>
   
   // To this
   <h1>AI Engineering — App Name</h1>
   <span className="badge">Interactive Demo</span>
   ```

3. `package.json`
   ```json
   {
     "name": "app-name",
     "description": "Interactive AI Demo",
     "homepage": "https://nexageapps.github.io/AI/app-name"
   }
   ```

---

## Suggested New Branding

### Header Format

**Old:**
```
UoA COMPSCI 713 — Knowledge Graph Playground
Week 3: RDF Triples & Semantic Search
```

**New:**
```
AI Engineering — Knowledge Graph Playground
Interactive Demo: RDF Triples & Semantic Search
```

### Badge/Label Format

**Old:**
- "COMPSCI 713"
- "COMPSCI 714"
- "UoA Master of AI"

**New:**
- "Interactive Demo"
- "AI Engineering"
- "Hands-On Learning"

### Title Format

**Old:**
```html
<title>App Name — COMPSCI 713 | UoA</title>
```

**New:**
```html
<title>App Name | AI Engineering Demos</title>
```

---

## Rebuild Priority

### High Priority (Most Visible)
1. Knowledge Graph Playground
2. CNN Explorer
3. Transformer Explorer
4. RNN Explorer

### Medium Priority
5. Data Preprocessing Studio
6. Neural Network Explorer
7. BPE Explorer

### Low Priority
8. Symbolic Logic Explorer (older)
9. Archive files (can delete or leave as-is)

---

## Rebuild Commands

### Batch Rebuild Script

```bash
#!/bin/bash

APPS=(
  "neural-networks/week3/cnn-explorer"
  "ai-fundamentals/week3/kg-playground"
  "ai-fundamentals/week1/symbolic-logic"
  "ai-fundamentals/week2/neural-network"
  "ai-fundamentals/week4/rnn-explorer"
  "neural-networks/week3/data-preprocessing-studio"
  "neural-networks/week4/transformer-explorer"
  "neural-networks/week4/bpe-explorer"
)

for APP in "${APPS[@]}"; do
  echo "Rebuilding $APP..."
  cd "application/$APP"
  
  if [ -f "package.json" ]; then
    npm install
    npm run build
    echo "✓ $APP rebuilt"
  else
    echo "✗ No package.json found in $APP"
  fi
  
  cd -
done

echo "All apps rebuilt!"
```

---

## Testing After Rebuild

For each app:

1. **Local Test**
   ```bash
   cd application/<app-path>
   npm start
   ```
   - Open http://localhost:3000
   - Check for COMPSCI references in:
     - Page title
     - Header text
     - Badges/labels
     - Footer
     - About sections

2. **Build Test**
   ```bash
   npm run build
   grep -r "COMPSCI" build/
   grep -r "UoA" build/
   ```
   - Should return no matches

3. **Deploy Test**
   - Deploy to gh-pages
   - Check live site
   - Verify all references removed

---

## Source Files to Check

In each React app, check these common locations:

```
<app-directory>/
├── public/
│   ├── index.html          ← Title, meta tags
│   └── manifest.json       ← App name
│
├── src/
│   ├── App.js              ← Main component, headers
│   ├── components/
│   │   ├── Header.js       ← Header badges
│   │   └── Footer.js       ← Footer text
│   ├── index.js            ← Root component
│   └── index.css           ← CSS custom properties
│
└── package.json            ← Name, description, homepage
```

---

## Archive Old Files

Move deployment docs with COMPSCI references:

```bash
# Already in archive
mv application/ai-fundamentals/week2/archive/DEPLOY_INSTRUCTIONS.md \
   archive/old-deployment/

mv application/ai-fundamentals/week2/archive/QUICK_DEPLOY.md \
   archive/old-deployment/
```

---

## Checklist

### Before Rebuild
- [ ] Identify all apps with COMPSCI references
- [ ] Backup current builds
- [ ] Plan new branding text

### During Rebuild
- [ ] Update public/index.html
- [ ] Update src/App.js
- [ ] Update package.json
- [ ] Update README.md in app folder
- [ ] Run npm install
- [ ] Run npm run build
- [ ] Test locally

### After Rebuild
- [ ] Check no COMPSCI in build/
- [ ] Deploy to gh-pages
- [ ] Test live site
- [ ] Update main README.md
- [ ] Document changes

---

## Timeline Estimate

- Per app: 15-30 minutes
- Total (8 apps): 2-4 hours
- Testing: 1 hour
- Deployment: 30 minutes

**Total:** 3.5-5.5 hours

---

## Notes

- **Don't edit** `build/` files directly (they're generated)
- **Always rebuild** from source after changes
- **Test locally** before deploying
- **Keep consistent** branding across all apps
- **Document** any custom changes

---

## Status After Cleanup

Once complete:
- ✓ No COMPSCI references anywhere
- ✓ No University of Auckland branding
- ✓ Consistent "AI Engineering" branding
- ✓ Generic, worldwide-friendly naming
- ✓ Professional, institution-independent

---

**Next Steps:** Run rebuild script and test each application.
