# COMPSCI 714 - Week 3: Data Preprocessing & Feature Engineering

## 📚 Overview

This week focuses on **data preprocessing and feature engineering** - the foundation of successful machine learning projects. As the saying goes: *"80% of data science is data preparation, 20% is complaining about data preparation."*

## 🎯 Learning Objectives

By the end of this week, you will:
- ✅ Handle missing values effectively using various imputation strategies
- ✅ Master feature scaling techniques (standardization and normalization)
- ✅ Encode categorical variables for machine learning models
- ✅ Perform feature selection to reduce dimensionality
- ✅ Create new features through feature engineering
- ✅ Build complete preprocessing pipelines

## 📖 Related Notebook

**Basic/B06 - Data Preprocessing and Feature Engineering.ipynb**

This notebook covers:
1. Handling Missing Values (MCAR, MAR, MNAR)
2. Feature Scaling (Standardization, Normalization)
3. Encoding Categorical Variables (Label, One-Hot)
4. Feature Selection (Correlation, Variance)
5. Feature Engineering (Polynomial, Binning, Domain-specific)
6. Complete Preprocessing Pipelines

## 🔬 Interactive Application

### Data Preprocessing Studio

A hands-on web application to practice and visualize preprocessing techniques.

**Location**: `data-preprocessing-studio/`

**Live Demo**: https://nexageapps.github.io/AI/compsci714/week3/data-preprocessing-studio

### Features

#### 1. Missing Values Tab 🔍
- Visualize missing data statistics
- Apply imputation strategies:
  - **Mean**: Best for normally distributed data
  - **Median**: Robust to outliers
  - **Mode**: For categorical data
  - **Zero Fill**: When zero is meaningful
- See real-time impact on dataset

#### 2. Feature Scaling Tab 📊
- **Standardization (Z-score)**:
  - Formula: `z = (x - μ) / σ`
  - Result: mean = 0, std = 1
  - Use: Neural networks, normally distributed data
  
- **Normalization (Min-Max)**:
  - Formula: `x' = (x - min) / (max - min)`
  - Result: range [0, 1]
  - Use: Bounded features, distance-based algorithms

#### 3. Categorical Encoding Tab 🏷️
- **Label Encoding**:
  - Converts categories to integers (0, 1, 2...)
  - Use for: Ordinal data (small, medium, large)
  - Warning: Implies ordering
  
- **One-Hot Encoding**:
  - Creates binary columns for each category
  - Use for: Nominal data (colors, countries)
  - Warning: Increases dimensionality

#### 4. Feature Engineering Tab ⚙️
- Create new features by combining existing ones
- Operations: Add, Subtract, Multiply, Divide, Ratio
- Examples:
  - `salary_per_year = salary / experience`
  - `total_rooms = bedrooms + bathrooms`
  - `price_per_sqft = price / area`

## 🚀 Getting Started

### Quick Start (3 Steps)

```bash
# 1. Navigate to the application
cd data-preprocessing-studio

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
```

Visit `http://localhost:3000` 🎉

### Using the Application

1. **Load Data**: Click "Use Sample Data" or upload your CSV
2. **Explore Tabs**: Navigate through different preprocessing techniques
3. **Apply Transformations**: Select options and click apply
4. **Observe Results**: See changes in real-time
5. **Reset Anytime**: Experiment freely with reset button

## 📊 Sample Dataset

The built-in dataset simulates employee data:

| Column | Type | Description | Missing Values |
|--------|------|-------------|----------------|
| age | Numerical | Employee age (25-45) | Yes (~20%) |
| salary | Numerical | Annual salary ($50k-$75k) | Yes (~10%) |
| experience | Numerical | Years of experience (2-12) | Yes (~10%) |
| department | Categorical | IT, HR, Finance | Yes (~10%) |
| performance | Numerical | Performance score (85-95) | No |

## 🎓 Key Concepts

### Why Preprocessing Matters

Real-world data is messy:
- ❌ Missing values
- ❌ Different scales (age: 0-100, salary: 0-1,000,000)
- ❌ Categorical data (colors, countries)
- ❌ Outliers and noise

Good preprocessing can improve model performance more than fancy algorithms!

### Best Practices

1. **Always fit on training data only**, then transform test data
2. **Document all preprocessing steps** for reproducibility
3. **Visualize data** before and after preprocessing
4. **Validate** that preprocessing improves model performance
5. **Iterate** - preprocessing is an iterative process

### Common Mistakes to Avoid

- ❌ Normalizing test data with test statistics (use training stats!)
- ❌ Applying data augmentation to test set
- ❌ Not handling missing data before training
- ❌ Using label encoding for nominal data
- ❌ Forgetting to scale features for neural networks

## 📚 Educational Resources

### Documentation
- [Scikit-learn Preprocessing](https://scikit-learn.org/stable/modules/preprocessing.html)
- [Pandas Documentation](https://pandas.pydata.org/docs/)
- [Feature Engineering Book](https://www.oreilly.com/library/view/feature-engineering-for/9781491953235/)

### Related UoA Courses
- **COMPSCI 761**: Machine Learning
- **COMPSCI 762**: Deep Learning

### Files in This Directory
- `data-preprocessing-studio/` - React application
- `QUICK_START.md` - Quick reference guide
- `DEPLOYMENT_GUIDE.md` - Detailed deployment instructions
- `README.md` - This file

## 🎯 Learning Path

### Beginner
1. Load sample data
2. Explore missing values tab
3. Try different imputation strategies
4. Observe the impact on data

### Intermediate
1. Upload your own dataset
2. Apply feature scaling
3. Compare standardization vs normalization
4. Encode categorical variables

### Advanced
1. Create meaningful engineered features
2. Build a complete preprocessing pipeline
3. Document your decisions
4. Validate improvements on a model

## 🔧 Technical Details

### Tech Stack
- **React 18**: Modern UI framework
- **PapaParse**: CSV parsing library
- **Recharts**: Data visualization
- **CSS3**: Custom styling

### Browser Support
- Chrome (recommended)
- Firefox
- Safari
- Edge

### Performance
- Bundle size: ~500KB (optimized)
- Load time: <2s on average connection
- All processing is client-side (no server needed)

## 🚀 Deployment

### GitHub Pages (Automatic)

The application is configured for automatic deployment:

1. Push to main branch
2. GitHub Actions builds and deploys
3. Access at: https://nexageapps.github.io/AI/compsci714/week3/data-preprocessing-studio

See `DEPLOYMENT_GUIDE.md` for details.

## 🎨 Customization

### Add Your Own Dataset
Modify `loadSampleData()` in `src/App.js`:

```javascript
const loadSampleData = () => {
  const sampleData = [
    { feature1: value1, feature2: value2, ... },
    // Your data here
  ];
  setData(sampleData);
};
```

### Change Styling
Edit `src/App.css` to customize colors, layout, and components.

### Add New Features
The modular structure makes it easy to add new preprocessing techniques.

## 📈 Assessment Ideas

### For Students
1. **Lab Exercise**: Preprocess a given dataset and document decisions
2. **Comparison Study**: Compare different imputation strategies
3. **Feature Engineering**: Create 5 meaningful features for a domain
4. **Pipeline Building**: Build and validate a complete pipeline

### For Instructors
1. Demonstrate preprocessing impact on model performance
2. Show real-world messy data examples
3. Discuss trade-offs between different techniques
4. Assign preprocessing challenges

## 🎯 Learning Outcomes

After completing this week, students can:
- ✅ Identify and handle missing data appropriately
- ✅ Choose correct scaling method for different scenarios
- ✅ Encode categorical variables correctly
- ✅ Create meaningful engineered features
- ✅ Build reproducible preprocessing pipelines
- ✅ Explain preprocessing decisions and trade-offs

## 🔗 Related Topics

### Previous Weeks
- Week 1: Introduction to ML
- Week 2: Neural Network Fundamentals

### Next Weeks
- Week 4: Model Evaluation and Metrics
- Week 5: Regularization and Overfitting

### Related Lessons
- **B07**: Model Evaluation and Performance Metrics
- **B08**: Regularization and Overfitting
- **I02**: Advanced Regularization Techniques

## 🤝 Contributing

Improvements welcome:
- Add new preprocessing techniques
- Enhance visualizations
- Improve documentation
- Add more sample datasets

## 📝 License

MIT License - Free for educational use

## 🎉 Have Fun Learning!

Remember: Good preprocessing is the foundation of successful ML projects. Master these techniques and you'll be ahead of 80% of the work! 🚀

---

**COMPSCI 714 - Week 3**  
**Topic**: Data Preprocessing and Feature Engineering  
**Related Notebook**: Basic/B06  
**Application**: Data Preprocessing Studio
