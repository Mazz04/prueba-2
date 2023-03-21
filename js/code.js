const valuesInput = document.getElementById('values');
const calculateButton = document.getElementById('calculate');
const resetButton = document.getElementById('reset');
const meanOutput = document.getElementById('mean');
const medianOutput = document.getElementById('median');
const modeOutput = document.getElementById('mode');
const stddevOutput = document.getElementById('stddev');
const varTypeOutput = document.getElementById('varType');
const { getEmoji, getAllEmoji, getThemes } = require('random-text-meme');
const meme = document.getElementById('meme');

let values = [];

function calculateMean(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += parseFloat(arr[i]);
  }
  return sum / arr.length;
}


function calculateMedian(arr) {
  const sorted = arr.sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  } else {
    return sorted[middle];
  }
}


function calculateMode(arr) {
    const counts = {};
    const wordCounts = {};
  
    for (let i = 0; i < arr.length; i++) {
      if (typeof arr[i] === 'string') {
        if (wordCounts[arr[i]]) {
          wordCounts[arr[i]]++;
        } else {
          wordCounts[arr[i]] = 1;
        }
      } else {
        if (counts[arr[i]]) {
          counts[arr[i]]++;
        } else {
          counts[arr[i]] = 1;
        }
      }
    }
  
    let maxCount = 0;
    let modes = [];
  
    if (Object.keys(counts).length !== 0) {
      for (let num in counts) {
        if (counts[num] > maxCount) {
          modes = [num];
          maxCount = counts[num];
        } else if (counts[num] === maxCount) {
          modes.push(num);
        }
      }
    }
  
    if (Object.keys(wordCounts).length !== 0) {
      for (let word in wordCounts) {
        if (wordCounts[word] > maxCount) {
          modes = [word];
          maxCount = wordCounts[word];
        } else if (wordCounts[word] === maxCount) {
          modes.push(word);
          console.log(word);
        }
      }
    }
  
    if (modes.length === Object.getOwnPropertyNames(counts).length + Object.getOwnPropertyNames(wordCounts).length) {
      modes = [];
    }
  
    return modes;
  }


function calculateStddev(arr) {
const mean = calculateMean(arr);
const differences = arr.map(num => num - mean);
const squaredDifferences = differences.map(diff => diff ** 2);
const sum = squaredDifferences.reduce((acc, val) => acc + val);
const variance = sum / arr.length;
return Math.sqrt(variance);
}


function determineVarType(arr) {
const hasNonNumeric = arr.some(val => isNaN(val));
if (hasNonNumeric) {
return 'Qualitative';
} else {
return 'Quantitative';
}
}


calculateButton.addEventListener('click', () => {

meanOutput.textContent = '';
medianOutput.textContent = '';
modeOutput.textContent = '';
stddevOutput.textContent = '';
varTypeOutput.textContent = '';
const emoji = getEmoji();
meme.textContent = emoji;



values = valuesInput.value.split(',').map(val => val);

const varType = determineVarType(values);
varTypeOutput.textContent = varType;

const mean = calculateMean(values);
meanOutput.textContent = mean;


const median = calculateMedian(values);
medianOutput.textContent = median;


const mode = calculateMode(values);
modeOutput.textContent = mode.join(', ');


const stddev = calculateStddev(values);
stddevOutput.textContent = stddev.toFixed(2);
});


resetButton.addEventListener('click', () => {

valuesInput.value = '';
meanOutput.textContent = '';
medianOutput.textContent = '';
modeOutput.textContent = '';
stddevOutput.textContent = '';
varTypeOutput.textContent= '';
});

