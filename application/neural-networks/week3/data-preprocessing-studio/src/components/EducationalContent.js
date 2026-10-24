import React from 'react';

export const MissingValuesEducation = () => (
  <div className="education-section">
    <div className="info-box">
      <h4>Understanding Missing Values</h4>
      
      <div className="concept-block">
        <h5>What are Missing Values?</h5>
        <p>Missing values are data points that are absent from your dataset. They appear as NULL, NaN, empty cells, or undefined values.</p>
      </div>

      <div className="concept-block">
        <h5>Why Do They Occur?</h5>
        <ul>
          <li><strong>Data Collection Errors:</strong> System failures, sensor malfunctions</li>
          <li><strong>Human Error:</strong> Survey respondents skipping questions</li>
          <li><strong>Data Integration:</strong> Merging datasets from different sources</li>
          <li><strong>Privacy:</strong> Intentionally withheld sensitive information</li>
        </ul>
      </div>

      <div className="concept-block">
        <h5>Types of Missing Data</h5>
        <div className="method-card">
          <strong>MCAR (Missing Completely At Random)</strong>
          <p>No pattern - missing values are random</p>
          <p className="example">Example: Random sensor failures</p>
        </div>
        <div className="method-card">
          <strong>MAR (Missing At Random)</strong>
          <p>Pattern related to other variables</p>
          <p className="example">Example: Older people less likely to report income</p>
        </div>
        <div className="method-card">
          <strong>MNAR (Missing Not At Random)</strong>
          <p>Pattern related to the missing value itself</p>
          <p className="example">Example: High earners don't report salary</p>
        </div>
      </div>

      <div className="concept-block">
        <h5>Imputation Strategies</h5>
        
        <div className="strategy-card">
          <div className="strategy-header">
            <strong>Mean Imputation</strong>
            <span className="badge">Numerical</span>
          </div>
          <p>Replace missing values with the average</p>
          <div className="formula-box">
            <code>mean = Σx / n</code>
          </div>
          <p className="use-case"><strong>Best for:</strong> Normally distributed data without outliers</p>
          <p className="example"><strong>Example:</strong> Ages [25, 30, NULL, 40] → Replace with (25+30+40)/3 = 31.67</p>
          <p className="warning">⚠️ Can distort distribution if many values are missing</p>
        </div>

        <div className="strategy-card">
          <div className="strategy-header">
            <strong>Median Imputation</strong>
            <span className="badge">Numerical</span>
          </div>
          <p>Replace with the middle value when sorted</p>
          <p className="use-case"><strong>Best for:</strong> Data with outliers or skewed distributions</p>
          <p className="example"><strong>Example:</strong> Salaries [50k, 60k, NULL, 200k] → Use median (60k) not mean (103k)</p>
          <p className="benefit">✓ Robust to outliers</p>
        </div>

        <div className="strategy-card">
          <div className="strategy-header">
            <strong>Mode Imputation</strong>
            <span className="badge">Categorical</span>
          </div>
          <p>Replace with the most frequent value</p>
          <p className="use-case"><strong>Best for:</strong> Categorical data (colors, categories, labels)</p>
          <p className="example"><strong>Example:</strong> Departments [IT, HR, NULL, IT, IT] → Replace with IT</p>
          <p className="benefit">✓ Preserves distribution of categories</p>
        </div>

        <div className="strategy-card">
          <div className="strategy-header">
            <strong>Zero Fill</strong>
            <span className="badge">Contextual</span>
          </div>
          <p>Replace with zero</p>
          <p className="use-case"><strong>Best for:</strong> When zero is meaningful (purchases, clicks, counts)</p>
          <p className="warning">⚠️ Can distort statistics if zero isn't natural</p>
        </div>
      </div>

      <div className="key-takeaway">
        <strong>Key Takeaway:</strong> Always analyze WHY data is missing before choosing a strategy. The best method depends on your specific dataset and problem domain.
      </div>
    </div>
  </div>
);

export const FeatureScalingEducation = () => (
  <div className="education-section">
    <div className="info-box">
      <h4>Understanding Feature Scaling</h4>
      
      <div className="concept-block">
        <h5>What is Feature Scaling?</h5>
        <p>Feature scaling transforms numerical features to a similar scale. It's like converting different units (meters, feet, miles) to a common measurement system.</p>
      </div>

      <div className="problem-example">
        <h5>The Problem Without Scaling</h5>
        <div className="example-box">
          <p><strong>Scenario:</strong> Predicting house prices</p>
          <ul>
            <li>Area: 1000-3000 sq ft (range: 2000)</li>
            <li>Bedrooms: 1-5 (range: 4)</li>
            <li>Year: 1950-2020 (range: 70)</li>
          </ul>
          <p className="problem"><strong>Problem:</strong> Area's range is 500× larger than bedrooms! The model will mostly ignore bedrooms.</p>
        </div>
      </div>

      <div className="concept-block">
        <h5>Why Scale Features?</h5>
        <div className="benefits-grid">
          <div className="benefit-card">
            <strong>⚖️ Equal Importance</strong>
            <p>All features contribute equally to learning</p>
          </div>
          <div className="benefit-card">
            <strong>⚡ Faster Training</strong>
            <p>Gradient descent converges much faster</p>
          </div>
          <div className="benefit-card">
            <strong>📈 Better Performance</strong>
            <p>Models learn patterns more effectively</p>
          </div>
          <div className="benefit-card">
            <strong>🔢 Numerical Stability</strong>
            <p>Prevents overflow/underflow errors</p>
          </div>
        </div>
      </div>

      <div className="method-comparison">
        <div className="method-card">
          <h5>Standardization (Z-score)</h5>
          <div className="formula-box">
            <code>z = (x - μ) / σ</code>
            <p>μ = mean, σ = standard deviation</p>
          </div>
          <p><strong>Result:</strong> Mean = 0, Std = 1</p>
          
          <div className="example-calculation">
            <p><strong>Example:</strong></p>
            <p>Ages: [25, 30, 35, 40, 45]</p>
            <p>Mean (μ) = 35, Std (σ) = 7.07</p>
            <ul>
              <li>Age 25 → z = (25-35)/7.07 = -1.41 (below average)</li>
              <li>Age 35 → z = (35-35)/7.07 = 0 (average)</li>
              <li>Age 45 → z = (45-35)/7.07 = +1.41 (above average)</li>
            </ul>
          </div>

          <div className="use-cases">
            <p><strong>Use when:</strong></p>
            <ul>
              <li>Data is normally distributed</li>
              <li>You have outliers</li>
              <li>Using Neural Networks, SVM, Logistic Regression</li>
            </ul>
          </div>
        </div>

        <div className="method-card">
          <h5>Normalization (Min-Max)</h5>
          <div className="formula-box">
            <code>x' = (x - min) / (max - min)</code>
          </div>
          <p><strong>Result:</strong> Range [0, 1]</p>
          
          <div className="example-calculation">
            <p><strong>Example:</strong></p>
            <p>Salaries: [50k, 60k, 70k, 80k]</p>
            <p>Min = 50k, Max = 80k</p>
            <ul>
              <li>$50k → (50-50)/(80-50) = 0.0 (minimum)</li>
              <li>$65k → (65-50)/(80-50) = 0.5 (halfway)</li>
              <li>$80k → (80-50)/(80-50) = 1.0 (maximum)</li>
            </ul>
          </div>

          <div className="use-cases">
            <p><strong>Use when:</strong></p>
            <ul>
              <li>Need specific range [0,1]</li>
              <li>Using KNN, Neural Networks with sigmoid</li>
              <li>Features have different units</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="key-takeaway">
        <strong>Pro Tip:</strong> Always fit the scaler on training data only, then transform both training and test data. This prevents data leakage!
      </div>
    </div>
  </div>
);

export const EncodingEducation = () => (
  <div className="education-section">
    <div className="info-box">
      <h4>Understanding Categorical Encoding</h4>
      
      <div className="concept-block">
        <h5>Why Encode Categories?</h5>
        <p>Machine learning models only understand numbers, not text. We must convert categorical data (like "IT", "HR", "Finance") into numerical format.</p>
      </div>

      <div className="method-comparison">
        <div className="method-card">
          <h5>Label Encoding</h5>
          <p>Converts categories to integers (0, 1, 2...)</p>
          
          <div className="example-box">
            <p><strong>Example:</strong></p>
            <ul>
              <li>"IT" → 0</li>
              <li>"HR" → 1</li>
              <li>"Finance" → 2</li>
            </ul>
          </div>

          <div className="warning-box">
            <p><strong>⚠️ Warning:</strong> Implies ordering (IT &lt; HR &lt; Finance)</p>
            <p>Model might think Finance is "greater" than IT!</p>
          </div>

          <div className="use-cases">
            <p><strong>Use for:</strong></p>
            <ul>
              <li>Ordinal data: "Small" &lt; "Medium" &lt; "Large"</li>
              <li>Tree-based models (Random Forest, XGBoost)</li>
              <li>When categories have natural ordering</li>
            </ul>
          </div>
        </div>

        <div className="method-card">
          <h5>One-Hot Encoding</h5>
          <p>Creates binary columns for each category</p>
          
          <div className="example-box">
            <p><strong>Example:</strong></p>
            <table className="encoding-table">
              <thead>
                <tr>
                  <th>Original</th>
                  <th>dept_IT</th>
                  <th>dept_HR</th>
                  <th>dept_Finance</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>IT</td>
                  <td>1</td>
                  <td>0</td>
                  <td>0</td>
                </tr>
                <tr>
                  <td>HR</td>
                  <td>0</td>
                  <td>1</td>
                  <td>0</td>
                </tr>
                <tr>
                  <td>Finance</td>
                  <td>0</td>
                  <td>0</td>
                  <td>1</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="benefit-box">
            <p><strong>✓ Benefit:</strong> No ordering implied</p>
            <p>Each category is independent</p>
          </div>

          <div className="use-cases">
            <p><strong>Use for:</strong></p>
            <ul>
              <li>Nominal data: colors, countries, departments</li>
              <li>Neural Networks, Linear Regression</li>
              <li>When categories have no natural order</li>
            </ul>
          </div>

          <div className="warning-box">
            <p><strong>⚠️ Caution:</strong> Increases dimensionality</p>
            <p>10 categories → 10 new columns</p>
          </div>
        </div>
      </div>

      <div className="key-takeaway">
        <strong>Decision Rule:</strong> Use Label Encoding for ordinal data (ordered categories). Use One-Hot Encoding for nominal data (unordered categories).
      </div>
    </div>
  </div>
);

export const FeatureEngineeringEducation = () => (
  <div className="education-section">
    <div className="info-box">
      <h4>Understanding Feature Engineering</h4>
      
      <div className="concept-block">
        <h5>What is Feature Engineering?</h5>
        <p>Creating new features from existing ones to help the model learn better patterns. Good features can improve model performance more than complex algorithms!</p>
      </div>

      <div className="concept-block">
        <h5>Why Create New Features?</h5>
        <ul>
          <li><strong>Reveal Hidden Relationships:</strong> salary ÷ experience shows earning efficiency</li>
          <li><strong>Combine Related Information:</strong> bedrooms + bathrooms = total rooms</li>
          <li><strong>Make Patterns Obvious:</strong> Help model see what matters</li>
          <li><strong>Reduce Complexity:</strong> Summarize multiple features into one</li>
        </ul>
      </div>

      <div className="operations-grid">
        <div className="operation-card">
          <h5>Ratios</h5>
          <div className="formula-box">
            <code>salary ÷ experience = salary_per_year</code>
          </div>
          <p><strong>Why:</strong> Shows earning efficiency, normalizes salary by experience</p>
          <p className="example">Useful for comparing employees with different experience levels</p>
        </div>

        <div className="operation-card">
          <h5>Combinations</h5>
          <div className="formula-box">
            <code>bedrooms + bathrooms = total_rooms</code>
          </div>
          <p><strong>Why:</strong> Summarizes house size in one feature</p>
          <p className="example">Simpler than using separate bedroom/bathroom counts</p>
        </div>

        <div className="operation-card">
          <h5>Interactions</h5>
          <div className="formula-box">
            <code>area × price = total_value</code>
          </div>
          <p><strong>Why:</strong> Captures relationship between two features</p>
          <p className="example">Reveals how features work together</p>
        </div>

        <div className="operation-card">
          <h5>Polynomial</h5>
          <div className="formula-box">
            <code>age² or age³</code>
          </div>
          <p><strong>Why:</strong> Captures non-linear relationships</p>
          <p className="example">Some patterns aren't linear (e.g., age vs health)</p>
        </div>
      </div>

      <div className="real-world-example">
        <h5>Real-World Example: E-commerce</h5>
        <div className="example-box">
          <p><strong>Original Features:</strong></p>
          <ul>
            <li>total_purchases: 50</li>
            <li>total_spent: $5000</li>
            <li>days_since_signup: 365</li>
          </ul>
          
          <p><strong>Engineered Features:</strong></p>
          <ul>
            <li>avg_purchase_value = $5000 / 50 = $100</li>
            <li>purchases_per_month = 50 / 12 = 4.17</li>
            <li>spending_per_day = $5000 / 365 = $13.70</li>
          </ul>
          
          <p className="benefit">These new features are more meaningful for predicting customer lifetime value!</p>
        </div>
      </div>

      <div className="key-takeaway">
        <strong>Key Principle:</strong> Use domain knowledge! The best features come from understanding what matters in your problem domain. Think like an expert in the field.
      </div>
    </div>
  </div>
);
