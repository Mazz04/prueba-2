alert ("aaaaaaa");

const valuesInput = document.getElementById('values');
const calculateButton = document.getElementById('calculate');
const resetButton = document.getElementById('reset');
const meanOutput = document.getElementById('mean');
const medianOutput = document.getElementById('median');
const modeOutput = document.getElementById('mode');
const stddevOutput = document.getElementById('stddev');
const varTypeOutput = document.getElementById('varType');

let values = [];

// Function to calculate mean
function calculateMean(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum / arr.length;
}

// Function to calculate median
function calculateMedian(arr) {
  const sorted = arr.sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  } else {
    return sorted[middle];
  }
}

// Function to calculate mode
function calculateMode(arr) {
  const counts = {};
  for (let i = 0; i < arr.length; i++) {
    if (counts[arr[i]]) {
      counts[arr[i]]++;
    } else {
      counts[arr[i]] = 1;
    }
  }
  let maxCount = 0;
  let modes = [];
  for (let num in counts) {
    if (counts[num] > maxCount) {
      modes = [num];
      maxCount = counts[num];
    } else if (counts[num] === maxCount) {
      modes.push(num);
    }
  }
  if (modes.length === Object.getOwnPropertyNames(counts).length) {
modes = [];
}
return modes;
}

// Function to calculate standard deviation
function calculateStddev(arr) {
const mean = calculateMean(arr);
const differences = arr.map(num => num - mean);
const squaredDifferences = differences.map(diff => diff ** 2);
const sum = squaredDifferences.reduce((acc, val) => acc + val);
const variance = sum / arr.length;
return Math.sqrt(variance);
}

// Function to determine variable type
function determineVarType(arr) {
const hasNonNumeric = arr.some(val => isNaN(val));
if (hasNonNumeric) {
return 'Qualitative';
} else {
return 'Quantitative';
}
}

// Event listener for calculate button
calculateButton.addEventListener('click', () => {
// Reset outputs
meanOutput.textContent = '';
medianOutput.textContent = '';
modeOutput.textContent = '';
stddevOutput.textContent = '';
varTypeOutput.textContent = '';

// Get input values and convert to array
values = valuesInput.value.split(',').map(val => parseFloat(val));

// Determine variable type
const varType = determineVarType(values);
varTypeOutput.textContent = varType;

// Calculate and display mean
const mean = calculateMean(values);
meanOutput.textContent = mean;

// Calculate and display median
const median = calculateMedian(values);
medianOutput.textContent = median;

// Calculate and display mode
const mode = calculateMode(values);
modeOutput.textContent = mode.join(', ');

// Calculate and display standard deviation
const stddev = calculateStddev(values);
stddevOutput.textContent = stddev.toFixed(2);
});

// Event listener for reset button
resetButton.addEventListener('click', () => {
// Reset inputs and outputs
valuesInput.value = '';
meanOutput.textContent = '';
medianOutput.textContent = '';
modeOutput.textContent = '';
stddevOutput.textContent = '';
varTypeOutput.textContent = '';
});

