# ⚡ Quick Deploy Commands

## 🚀 Deploy All Games (Automated)

Push to main branch or manually trigger workflow:
```bash
git add .
git commit -m "Update games"
git push origin main
```

Or trigger manually in GitHub Actions: **Actions** → **Deploy Applications** → **Run workflow**

---

## 🎮 Deploy Individual Games

### Wumpus World
```bash
cd application/compsci713/week2/wumpus
npm install
npm run build
npx gh-pages -d build -e wumpus
```

### Gradient Descent Game
```bash
cd application/compsci714/week2/gradient-descent-game
npm install
npm run build
npx gh-pages -d docs -e gradient-descent
```

### Landing Page
```bash
# From repository root
npx gh-pages -d . -e . --src index.html
```

---

## 🔗 Live URLs

- **All Games**: https://nexageapps.github.io/AI/
- **Wumpus**: https://nexageapps.github.io/AI/wumpus/
- **Gradient Descent**: https://nexageapps.github.io/AI/gradient-descent/

---

## 🧪 Test Locally Before Deploy

### Wumpus World
```bash
cd application/compsci713/week2/wumpus
npm start
# Opens at http://localhost:3000
```

### Gradient Descent Game
```bash
cd application/compsci714/week2/gradient-descent-game
npm run dev
# Opens at http://localhost:5173
```

---

## 🔧 Build Only (No Deploy)

### Wumpus World
```bash
cd application/compsci713/week2/wumpus
npm run build
# Output: build/
```

### Gradient Descent Game
```bash
cd application/compsci714/week2/gradient-descent-game
npm run build
# Output: docs/
```

---

## 📋 Checklist Before Deploy

- [ ] Test locally with `npm start` or `npm run dev`
- [ ] Build succeeds without errors
- [ ] Check paths in package.json match deployment paths
- [ ] Commit all changes to git
- [ ] Push to main branch or trigger workflow

---

**Need help?** See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions.
