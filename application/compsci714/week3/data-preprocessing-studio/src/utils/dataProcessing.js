// Enhanced data processing utilities for production-ready preprocessing

/**
 * Calculate comprehensive statistics for a numerical column
 */
export const calculateColumnStats = (data, column) => {
  const values = data
    .map(row => row[column])
    .filter(val => val !== null && val !== undefined && val !== '' && !isNaN(val));
  
  if (values.length === 0) return null;
  
  const sorted = [...values].sort((a, b) => a - b);
  const sum = values.reduce((a, b) => a + b, 0);
  const mean = sum / values.length;
  const variance = values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length;
  const std = Math.sqrt(variance);
  
  return {
    count: values.length,
    missing: data.length - values.length,
    missingPercent: ((data.length - values.length) / data.length * 100).toFixed(2),
    mean: mean.toFixed(2),
    median: sorted[Math.floor(sorted.length / 2)].toFixed(2),
    std: std.toFixed(2),
    min: Math.min(...values).toFixed(2),
    max: Math.max(...values).toFixed(2),
    q1: sorted[Math.floor(sorted.length * 0.25)].toFixed(2),
    q3: sorted[Math.floor(sorted.length * 0.75)].toFixed(2)
  };
};

/**
 * Detect outliers using IQR method
 */
export const detectOutliers = (data, column) => {
  const values = data
    .map(row => row[column])
    .filter(val => val !== null && val !== undefined && !isNaN(val));
  
  if (values.length === 0) return [];
  
  const sorted = [...values].sort((a, b) => a - b);
  const q1 = sorted[Math.floor(sorted.length * 0.25)];
  const q3 = sorted[Math.floor(sorted.length * 0.75)];
  const iqr = q3 - q1;
  const lowerBound = q1 - 1.5 * iqr;
  const upperBound = q3 + 1.5 * iqr;
  
  return data
    .map((row, idx) => ({ value: row[column], index: idx }))
    .filter(item => item.value < lowerBound || item.value > upperBound);
};

/**
 * Advanced imputation strategies
 */
export const imputeMissingValues = (data, column, strategy, options = {}) => {
  const newData = JSON.parse(JSON.stringify(data));
  const values = newData
    .map(row => row[column])
    .filter(val => val !== null && val !== undefined && val !== '');
  
  if (values.length === 0) return newData;
  
  let fillValue;
  
  switch(strategy) {
    case 'mean':
      fillValue = values.reduce((a, b) => a + b, 0) / values.length;
      break;
    case 'median':
      const sorted = [...values].sort((a, b) => a - b);
      fillValue = sorted[Math.floor(sorted.length / 2)];
      break;
    case 'mode':
      const frequency = {};
      values.forEach(val => frequency[val] = (frequency[val] || 0) + 1);
      fillValue = Object.keys(frequency).reduce((a, b) => 
        frequency[a] > frequency[b] ? a : b
      );
      break;
    case 'forward':
      // Forward fill - use previous non-null value
      let lastValid = null;
      newData.forEach(row => {
        if (row[column] !== null && row[column] !== undefined && row[column] !== '') {
          lastValid = row[column];
        } else if (lastValid !== null) {
          row[column] = lastValid;
        }
      });
      return newData;
    case 'backward':
      // Backward fill - use next non-null value
      let nextValid = null;
      for (let i = newData.length - 1; i >= 0; i--) {
        if (newData[i][column] !== null && newData[i][column] !== undefined && newData[i][column] !== '') {
          nextValid = newData[i][column];
        } else if (nextValid !== null) {
          newData[i][column] = nextValid;
        }
      }
      return newData;
    case 'zero':
      fillValue = 0;
      break;
    case 'custom':
      fillValue = options.customValue || 0;
      break;
    default:
      return newData;
  }
  
  newData.forEach(row => {
    if (row[column] === null || row[column] === undefined || row[column] === '') {
      row[column] = fillValue;
    }
  });
  
  return newData;
};

/**
 * Export data to CSV
 */
export const exportToCSV = (data, filename = 'processed_data.csv') => {
  if (!data || data.length === 0) return;
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Handle values with commas or quotes
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
};

/**
 * Validate data quality
 */
export const validateDataQuality = (data) => {
  if (!data || data.length === 0) {
    return { valid: false, errors: ['No data provided'] };
  }
  
  const errors = [];
  const warnings = [];
  
  // Check for empty dataset
  if (data.length < 2) {
    errors.push('Dataset too small (minimum 2 rows required)');
  }
  
  // Check for columns
  const columns = Object.keys(data[0] || {});
  if (columns.length === 0) {
    errors.push('No columns found in dataset');
  }
  
  // Check for high missing value percentage
  columns.forEach(col => {
    const missing = data.filter(row => 
      row[col] === null || row[col] === undefined || row[col] === ''
    ).length;
    const missingPercent = (missing / data.length) * 100;
    
    if (missingPercent > 50) {
      warnings.push(`Column "${col}" has ${missingPercent.toFixed(1)}% missing values`);
    }
  });
  
  return {
    valid: errors.length === 0,
    errors,
    warnings,
    rowCount: data.length,
    columnCount: columns.length
  };
};
