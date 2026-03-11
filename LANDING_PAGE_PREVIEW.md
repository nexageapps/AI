# 🎨 Landing Page Preview

## Design Overview

The new landing page features:

### 🎓 University of Auckland Branding
- **Color Scheme**: UoA blue (#00467F, #003366, #001F3F)
- **University Badge**: Custom SVG icon at the top
- **Professional Typography**: Clean, modern font stack
- **Course Labels**: Prominent COMPSCI course identifiers

### 🎮 Game Cards

Each game is displayed in a card with:

1. **Icon**: Large emoji representing the game (🏰 for Wumpus, ⛰️ for Gradient Descent)
2. **Title**: Game name with "LIVE" status badge
3. **Course Label**: 
   - 🎓 COMPSCI 713 • AI FUNDAMENTALS
   - 🎓 COMPSCI 714 • NEURAL NETWORKS
4. **Description**: Clear explanation of what students will learn
5. **Concept Tags**: Key AI/ML concepts covered
6. **Launch Button**: Prominent call-to-action

### 📱 Responsive Design
- Desktop: 2-column grid
- Mobile: Single column, optimized for touch
- Smooth hover animations
- Accessible and keyboard-navigable

### 🔗 Footer
- Link to full GitHub repository
- Credits and project information
- Course statistics (60+ lessons, etc.)

## Visual Hierarchy

```
┌─────────────────────────────────────────┐
│         🏛️ UoA Badge (SVG)              │
│                                         │
│   🎮 Interactive AI Demonstrations      │
│      Hands-on Learning Experiences      │
│   University of Auckland • COMPSCI      │
└─────────────────────────────────────────┘

┌──────────────────┐  ┌──────────────────┐
│   🏰 Wumpus      │  │  ⛰️ Mountain     │
│   World [LIVE]   │  │  Explorer [LIVE] │
│                  │  │                  │
│ 🎓 COMPSCI 713   │  │ 🎓 COMPSCI 714   │
│ AI Fundamentals  │  │ Neural Networks  │
│                  │  │                  │
│ Description...   │  │ Description...   │
│                  │  │                  │
│ [Tags]           │  │ [Tags]           │
│                  │  │                  │
│ [Launch Game →]  │  │ [Launch Game →]  │
└──────────────────┘  └──────────────────┘

┌─────────────────────────────────────────┐
│  📚 View Full AI & ML Roadmap on GitHub │
│                                         │
│  Part of the open-source AI & ML        │
│  learning roadmap                       │
│  Created by a Master of AI student      │
│  60+ lessons • Basic to Expert          │
└─────────────────────────────────────────┘
```

## Color Palette

- **Primary**: #00467F (UoA Blue)
- **Secondary**: #0066CC (Lighter Blue)
- **Background**: Gradient from #00467F → #003366 → #001F3F
- **Cards**: White (#FFFFFF)
- **Text**: Dark Gray (#333333)
- **Accents**: Green for "LIVE" badges (#4CAF50)

## Interactive Elements

1. **Hover Effects**:
   - Cards lift up with shadow
   - Buttons slide right with arrow
   - Links brighten

2. **Status Badges**:
   - Green "LIVE" indicators
   - Shows games are active and playable

3. **Smooth Transitions**:
   - All animations use 0.3s ease timing
   - Professional, not distracting

## Accessibility

- ✅ Semantic HTML5
- ✅ ARIA labels where needed
- ✅ Keyboard navigation
- ✅ High contrast ratios
- ✅ Responsive text sizing
- ✅ Touch-friendly targets (44px minimum)

## URLs

After deployment:
- **Landing Page**: https://nexageapps.github.io/AI/
- **Wumpus World**: https://nexageapps.github.io/AI/wumpus/
- **Mountain Explorer**: https://nexageapps.github.io/AI/gradient-descent/

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- **No external dependencies**: Pure HTML/CSS
- **Inline styles**: Single file, fast load
- **Optimized SVG**: Lightweight university badge
- **No JavaScript**: Instant page load

---

**Ready to deploy!** Run `./deploy-landing-page.sh` to see it live.
