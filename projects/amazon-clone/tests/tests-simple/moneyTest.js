import {formatCurrency} from '../../scripts/utils/money.js';

console.log('Test suite: formatCurrency');
console.log('Converts cents into dollars');

// First automated test for the format currency function
// Basic test:
if (formatCurrency(2095) === '20.95') {
    console.log('passed');
} else {
    console.log('failed');
}

console.log('Works with zero');

// We can do different tests for different situations
if (formatCurrency(0) === '0.00') {
    console.log('passed')
} else {
    console.log('failed')
}

console.log('Rounds up to the nearest cent');

// Edge test:
if (formatCurrency(2000.5) === '20.01') {
    console.log('passed');
} else {
    console.log('failed');
}

// Basic test cases: tests if code is working
// Edge cases: tests with tricky values
// Group of related test is called a test suite