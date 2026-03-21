// Statistical utility functions for data preprocessing

export const calculateMean = (values) => {
  const validValues = values.filter(v => v !== null && v !== undefined && !isNaN(v));
  if (validValues.length === 0) return 0;
  return validValues.reduce((sum, val) => sum + val, 0) / validValues.length;
};

export const calculateMedian = (values) => {
  const validValues = values.filter(v => v !== null && v !== undefined && !isNaN(v)).sort((a, b) => a - b);
  if (validValues.length === 0) return 0;
  const mid = Math.floor(validValues.length / 2);
  return validValues.length % 2 === 0
    ? (validValues[mid - 1] + validValues[mid]) / 2
    : validValues[mid];
};

export const calculateMode = (values) => {
  const validValues = values.filter(v => v !== null && v !== undefined && v !== '');
  if (validValues.length === 0) return null;
  
  const frequency = {};
  validValues.forEach(val => {
    frequency[val] = (frequency[val] || 0) + 1;
  });
  
  let maxFreq = 0;
  let mode = null;
  Object.entries(frequency).forEach(([val, freq]) => {
    if (freq > maxFreq) {
      maxFreq = freq;
      mode = val;
    }
  });
  
  return mode;
};

export const calculateStd = (values) => {
  const validValues = values.filter(v => v !== null && v !== undefined && !isNaN(v));
  if (validValues.length === 0) return 0;
  
  const mean = calculateMean(validValues);
  const squaredDiffs = validValues.map(val => Math.pow(val - mean, 2));
  const variance = squaredDiffs.reduce((sum, val) => sum + val, 0) / validValues.length;
  return Math.sqrt(variance);
};

export const calculateCorrelation = (values1, values2) => {
  const validPairs = values1.map((v1, i) => [v1, values2[i]])
    .filter(([v1, v2]) => v1 !== null && v1 !== undefined && !isNaN(v1) && 
                          v2 !== null && v2 !== undefined && !isNaN(v2));
  
  if (validPairs.length === 0) return 0;
  
  const x = validPairs.map(p => p[0]);
  const y = validPairs.map(p => p[1]);
  
  const meanX = calculateMean(x);
  const meanY = calculateMean(y);
  const stdX = calculateStd(x);
  const stdY = calculateStd(y);
  
  if (stdX === 0 || stdY === 0) return 0;
  
  const covariance = x.reduce((sum, xi, i) => 
    sum + (xi - meanX) * (y[i] - meanY), 0) / x.length;
  
  return covariance / (stdX * stdY);
};

export const getDataStatistics = (data, column) => {
  const values = data.map(row => row[column]);
  const validValues = values.filter(v => v !== null && v !== undefined && v !== '');
  const missingCount = values.length - validValues.length;
  
  const isNumeric = validValues.every(v => !isNaN(v));
  
  if (isNumeric) {
    const numericValues = validValues.map(v => Number(v));
    return {
      type: 'numerical',
      count: values.length,
      missing: missingCount,
      missingPercent: ((missingCount / values.length) * 100).toFixed(2),
      mean: calculateMean(numericValues).toFixed(2),
      median: calculateMedian(numericValues).toFixed(2),
      std: calculateStd(numericValues).toFixed(2),
      min: Math.min(...numericValues).toFixed(2),
      max: Math.max(...numericValues).toFixed(2)
    };
  } else {
    const uniqueValues = [...new Set(validValues)];
    return {
      type: 'categorical',
      count: values.length,
      missing: missingCount,
      missingPercent: ((missingCount / values.length) * 100).toFixed(2),
      unique: uniqueValues.length,
      mode: calculateMode(validValues),
      values: uniqueValues.slice(0, 10)
    };
  }
};
