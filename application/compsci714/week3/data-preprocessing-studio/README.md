# UoA - COMPSCI 714, 761, 762 - Data Preprocessing Studio

**Week 3: Data Preprocessing and Feature Engineering**

An interactive web application to learn and apply data preprocessing and feature engineering techniques - concepts from **Basic Lesson B06**.

## Learning Objectives

This application helps you understand:
- **Missing Value Handling**: Different imputation strategies (mean, median, mode)
- **Feature Scaling**: Standardization (Z-score) and Normalization (Min-Max)
- **Categorical Encoding**: Label encoding and One-Hot encoding
- **Feature Engineering**: Creating new features from existing ones

## Features

### 1. Missing Values Tab
- Visualize missing data in your dataset
- Apply different imputation strategies:
  - Mean imputation (for normally distributed data)
  - Median imputation (robust to outliers)
  - Mode imputation (for categorical data)
  - Zero fill
- See real-time statistics on missing data percentage

### 2. Feature Scaling Tab
- Apply standardization (Z-score normalization)
  - Formula: `z = (x - μ) / σ`
  - Results in mean = 0, std = 1
- Apply min-max normalization
  - Formula: `x' = (x - min) / (max - min)`
  - Results in range [0, 1]
- Select multiple columns to scale simultaneously
- Compare original vs scaled data

### 3. Encoding Tab
- **Label Encoding**: Convert categories to integers
  - Best for ordinal data (small, medium, large)
- **One-Hot Encoding**: Create binary columns for each category
  - Best for nominal data (colors, countries)
- See the encoding results in real-time

### 4. Feature Engineering Tab
- Create new features by combining existing ones
- Operations supported:
  - Addition (e.g., total_rooms = bedrooms + bathrooms)
  - Subtraction (e.g., age = current_year - birth_year)
  - Multiplication (e.g., total_value = area × price)
  - Division/Ratio (e.g., price_per_sqft = price / area)
- Name your custom features

## Installation

```bash
# Navigate to the project directory
cd application/compsci714/week3/data-preprocessing-studio

# Install dependencies
npm install

# Start the development server
npm start
```

The app will open at `http://localhost:3000`

## How to Use

1. **Upload Data**: 
   - Click "Choose CSV File" to upload your own dataset
   - Or click "Use Sample Data" to load a pre-configured example

2. **Explore Tabs**:
   - Navigate through different preprocessing techniques
   - Apply transformations and see results immediately
   - Reset to original data anytime

3. **Learn by Doing**:
   - Each tab includes educational information boxes
   - Formulas and best practices are displayed
   - Experiment with different strategies

## Sample Dataset

The built-in sample dataset includes:
- **age**: Employee age (with some missing values)
- **salary**: Annual salary (with some missing values)
- **experience**: Years of experience (with some missing values)
- **department**: Department name (IT, HR, Finance)
- **performance**: Performance score (0-100)

## Educational Value

This tool demonstrates concepts from **B06 - Data Preprocessing and Feature Engineering**:

1. **Why Preprocessing Matters**: "80% of data science is data preparation"
2. **Real-world Data Issues**: Missing values, different scales, categorical data
3. **Impact on Models**: Good preprocessing improves model performance more than fancy algorithms
4. **Best Practices**: Fit on training data, document steps, validate improvements

## Technical Stack

- **React 18**: Modern UI framework
- **PapaParse**: CSV parsing library
- **Recharts**: Data visualization
- **CSS3**: Custom styling with gradients and animations

## Related Concepts

### From B06 Notebook:
- **Missing Data Types**: MCAR, MAR, MNAR
- **Scaling Methods**: When to use standardization vs normalization
- **Encoding Strategies**: Label vs One-Hot encoding trade-offs
- **Feature Selection**: Correlation analysis, variance threshold
- **Domain Knowledge**: Creating meaningful features

## Deployment

This app is configured for GitHub Pages deployment:

```bash
# Build for production
npm run build

# Deploy to GitHub Pages (automated via GitHub Actions)
git push origin main
```

## Live Demo

Visit the live application: [Data Preprocessing Studio](https://nexageapps.github.io/AI/compsci714/week3/data-preprocessing-studio)

## Learning Path

1. Start with the **Upload** tab - load sample data
2. Explore **Missing Values** - understand different imputation strategies
3. Try **Feature Scaling** - see how standardization affects data
4. Experiment with **Encoding** - convert categorical to numerical
5. Create features in **Feature Engineering** - combine columns meaningfully

## Key Takeaways

- **Missing values** must be handled before training
- **Feature scaling** improves convergence and performance
- **Categorical encoding** is essential for ML models
- **Feature engineering** requires domain knowledge
- **Always validate** that preprocessing improves model performance

## Contributing

This is an educational project. Feel free to:
- Add new preprocessing techniques
- Improve visualizations
- Add more sample datasets
- Enhance the UI/UX

## License

MIT License - feel free to use for educational purposes

## References

- [Scikit-learn Preprocessing](https://scikit-learn.org/stable/modules/preprocessing.html)
- [Feature Engineering Book](https://www.oreilly.com/library/view/feature-engineering-for/9781491953235/)
- [Pandas Documentation](https://pandas.pydata.org/docs/)

---

**Part of the AI Learning Repository** - UoA COMPSCI 714 Week 3
