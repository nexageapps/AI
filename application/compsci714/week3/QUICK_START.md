# Quick Start Guide - Data Preprocessing Studio

## What is This?

An interactive web app that teaches **data preprocessing and feature engineering** concepts from Basic Lesson B06. Upload data, apply transformations, and see results instantly!

## Run Locally (3 Steps)

```bash
# 1. Navigate to the app
cd application/compsci714/week3/data-preprocessing-studio

# 2. Install dependencies (first time only)
npm install

# 3. Start the app
npm start
```

Opens at: `http://localhost:3000`

## View Online

**Live Demo**: https://nexageapps.github.io/AI/compsci714/week3/data-preprocessing-studio

## How to Use

### Step 1: Load Data
- Click **"Use Sample Data"** for a quick start
- Or upload your own CSV file

### Step 2: Explore Tabs

#### Missing Values
- See which columns have missing data
- Choose imputation strategy (mean, median, mode, zero)
- Apply and see results

#### Feature Scaling
- Select numerical columns
- Choose standardization or normalization
- Compare before/after values

#### Encoding
- Select categorical columns
- Apply label or one-hot encoding
- See new encoded columns

#### Feature Engineering
- Pick two columns
- Choose operation (+, -, ×, ÷)
- Create new feature with custom name

## Example Workflow

```
1. Load sample data (employee dataset)
2. Go to Missing Values → Impute 'age' with median
3. Go to Scaling → Standardize 'salary' and 'experience'
4. Go to Encoding → One-hot encode 'department'
5. Go to Engineering → Create 'salary_per_year' = salary ÷ experience
```

## Learning Concepts

| Tab | Concept | Formula | Use Case |
|-----|---------|---------|----------|
| Missing Values | Imputation | mean, median, mode | Handle incomplete data |
| Scaling | Standardization | (x - μ) / σ | Neural networks |
| Scaling | Normalization | (x - min) / (max - min) | Bounded features |
| Encoding | Label | Categories → 0,1,2... | Ordinal data |
| Encoding | One-Hot | Categories → Binary columns | Nominal data |
| Engineering | Operations | Combine features | Domain knowledge |

## Sample Dataset

Built-in dataset includes:
- **age**: 25-45 years (some missing)
- **salary**: $50k-$75k (some missing)
- **experience**: 2-12 years (some missing)
- **department**: IT, HR, Finance (some missing)
- **performance**: 85-95 scores

## Key Features

- **No coding required** - Visual interface  
- **Real-time results** - See changes instantly  
- **Educational** - Learn by doing  
- **Safe** - All processing in browser  
- **Reset anytime** - Experiment freely  

## Troubleshooting

### App won't start?
```bash
# Check Node version (need 16+)
node --version

# Reinstall dependencies
rm -rf node_modules
npm install
```

### CSV upload not working?
- Ensure first row has column headers
- Check file is valid CSV format
- Try the sample data first

## Related Lesson

This app demonstrates concepts from:
**Basic/B06 - Data Preprocessing and Feature Engineering.ipynb**

Topics covered:
1. Handling missing values (Section 1)
2. Feature scaling (Section 2)
3. Encoding categorical variables (Section 3)
4. Feature selection (Section 4)
5. Feature engineering (Section 5)

## Deploy Your Own

```bash
# Build for production
npm run build

# Deploy to GitHub Pages
# (Automatic via GitHub Actions on push to main)
git add .
git commit -m "Deploy preprocessing studio"
git push origin main
```

## Tech Stack

- **React 18** - UI framework
- **PapaParse** - CSV parsing
- **Recharts** - Visualizations
- **CSS3** - Styling

## Perfect For

- **Students** learning data preprocessing
- **Teachers** demonstrating concepts
- **Researchers** exploring data quickly
- **Professionals** prototyping pipelines

## Tips

1. **Start with sample data** to understand features
2. **Reset often** to try different strategies
3. **Compare results** before and after transformations
4. **Read info boxes** for best practices
5. **Experiment freely** - it's all client-side!

## Need Help?

- Check the full README.md for detailed docs
- Review DEPLOYMENT_GUIDE.md for setup issues
- Refer to B06 notebook for theory

## Have Fun Learning!

Data preprocessing is 80% of data science - master it here!

---

**COMPSCI 714 - Week 3** | Data Preprocessing & Feature Engineering | University of Auckland
