# 📱 Quick Reference Guide

## Responsive Breakpoints

```
┌─────────────────────────────────────────────────────────────┐
│ Desktop Large (> 1440px)                                    │
│ • Max width: 1400px                                         │
│ • Two columns                                               │
│ • Full features                                             │
└─────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│ Desktop (1200px - 1440px)                              │
│ • Max width: 95%                                       │
│ • Two columns                                          │
│ • Slightly reduced spacing                             │
└────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│ Tablet Landscape (1024px - 1200px)               │
│ • Max width: 98%                                 │
│ • Two columns                                    │
│ • Compact design                                 │
└──────────────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ Tablet Portrait (768px - 1024px)       │
│ • Single column                        │
│ • Horizontal scroll tabs               │
│ • Touch-friendly                       │
└────────────────────────────────────────┘

┌──────────────────────────────┐
│ Mobile (480px - 768px)       │
│ • Vertical layout            │
│ • Large touch targets        │
│ • Simplified UI              │
└──────────────────────────────┘

┌────────────────────┐
│ Small (< 480px)    │
│ • Ultra compact    │
│ • Essential only   │
│ • Minimal padding  │
└────────────────────┘
```

## Icon Reference

| Icon | Component | Usage |
|------|-----------|-------|
| 🔬 MdOutlineScience | Header | Main title |
| 📤 FiUpload | Upload Tab | File upload |
| 🔍 FiSearch | Missing Tab | Data exploration |
| 📊 FiBarChart2 | Scaling Tab | Feature scaling |
| 💻 FiCode | Encoding Tab | Categorical encoding |
| ⚙️ FiSettings | Engineering Tab | Feature creation |
| 📈 FiPieChart | Analysis Tab | Data analysis |
| ✅ FiCheckCircle | Success | Positive feedback |
| ⚠️ FiAlertTriangle | Warning | Alerts |
| 💾 FiDownload | Export | Download data |

## Component Sizes

### Desktop
- Container: 1400px max
- Panel padding: 25px
- Font size: 0.9rem - 2.5rem
- Touch target: 36px min

### Tablet
- Container: 98% width
- Panel padding: 20px
- Font size: 0.85rem - 1.8rem
- Touch target: 40px min

### Mobile
- Container: 100% width
- Panel padding: 15px
- Font size: 0.75rem - 1.5rem
- Touch target: 44px min

## Color Palette

```
Primary:    #00467F  ████  UoA Blue
Secondary:  #003366  ████  Dark Blue
Success:    #4caf50  ████  Green
Warning:    #ff9800  ████  Orange
Error:      #f44336  ████  Red
Background: #f8f9fa  ████  Light Gray
Text:       #333333  ████  Dark Gray
```

## File Structure

```
src/
├── components/
│   ├── EnhancedMissingValuesTab.js  (Advanced imputation)
│   └── DataVisualization.js         (Charts)
├── utils/
│   ├── dataProcessing.js            (Core functions)
│   └── statistics.js                (Stats)
├── App.js                           (Main app)
├── App.css                          (Styles)
└── index.js                         (Entry)
```

## Key Features

✅ 7 Imputation Strategies
✅ 3 Visualization Types
✅ CSV Export
✅ Data Quality Monitoring
✅ Responsive Design
✅ Professional Icons
✅ Error Handling
✅ Loading States

## Quick Commands

```bash
npm install          # Install dependencies
npm start            # Development server
npm run build        # Production build
npm test             # Run tests
```

## Browser Support

✅ Chrome (latest)
✅ Firefox (latest)
✅ Safari (latest)
✅ Edge (latest)
✅ Mobile Safari (iOS 12+)
✅ Chrome Mobile (Android 8+)

## Performance Targets

- Load: < 2s (desktop), < 3s (mobile)
- FPS: 60fps animations
- Touch: < 100ms response
- Scroll: Smooth 60fps

## Accessibility

✅ WCAG 2.1 AA
✅ Keyboard navigation
✅ Focus indicators
✅ Screen reader support
✅ High contrast
✅ Large touch targets

---

**Quick Start**: `npm install && npm start`
**Documentation**: See README.md, ENHANCEMENTS.md
**Status**: ✅ Production Ready
