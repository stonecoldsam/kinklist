const fs = require('fs');

// Load the kinklist
const content = fs.readFileSync('kinklist.txt', 'utf8');
const lines = content.split('\n');

// Parse to count fields per kink
let totalFields = 0;
let currentCategory = null;
let currentFields = [];

for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (line.startsWith('#')) {
        currentCategory = line.substring(1).trim();
        continue;
    }
    
    if (line.startsWith('(')) {
        const fieldsMatch = line.match(/\((.*?)\)/);
        if (fieldsMatch) {
            currentFields = fieldsMatch[1].split(',').map(s => s.trim());
        }
        continue;
    }
    
    if (line.startsWith('*')) {
        // This is a kink entry
        totalFields += currentFields.length;
    }
}

console.log('Total fields:', totalFields);

// Generate random values (0-5)
const randomValues = [];
for (let i = 0; i < totalFields; i++) {
    const rand = Math.random();
    if (rand < 0.25) randomValues.push(0);      // 25% not entered
    else if (rand < 0.40) randomValues.push(1); // 15% favorite
    else if (rand < 0.60) randomValues.push(2); // 20% like
    else if (rand < 0.75) randomValues.push(3); // 15% indifferent
    else if (rand < 0.90) randomValues.push(4); // 15% maybe
    else randomValues.push(5);                   // 10% limit
}

// Encode using the same algorithm as the app
const hashChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_.=+*^!@";
const base = 6; // 6 color options

function maxPow(base, maxVal) {
    let maxPow = 1;
    for (let pow = 1; Math.pow(base, pow) <= maxVal; pow++) {
        maxPow = pow;
    }
    return maxPow;
}

function prefix(input, length, char) {
    while (input.length < length) {
        input = char + input;
    }
    return input;
}

function encode(base, input) {
    const hashBase = hashChars.length;
    const outputPow = maxPow(hashBase, Number.MAX_SAFE_INTEGER);
    const inputPow = maxPow(base, Math.pow(hashBase, outputPow));
    
    let output = "";
    const numChunks = Math.ceil(input.length / inputPow);
    let inputIndex = 0;
    
    for (let chunkId = 0; chunkId < numChunks; chunkId++) {
        let inputIntValue = 0;
        for (let pow = 0; pow < inputPow; pow++) {
            const inputVal = input[inputIndex++];
            if (typeof inputVal === "undefined") break;
            const val = inputVal * Math.pow(base, pow);
            inputIntValue += val;
        }
        
        let outputCharValue = "";
        while (inputIntValue > 0) {
            const maxP = Math.floor(Math.log(inputIntValue) / Math.log(hashBase));
            const powVal = Math.pow(hashBase, maxP);
            const charInt = Math.floor(inputIntValue / powVal);
            const subtract = charInt * powVal;
            const char = hashChars[charInt];
            outputCharValue += char;
            inputIntValue -= subtract;
        }
        const chunk = prefix(outputCharValue, outputPow, hashChars[0]);
        output += chunk;
    }
    
    return output;
}

const hash = encode(6, randomValues);
console.log('\nGenerated test hash:');
console.log(hash);
console.log('\nTest URL:');
console.log('https://saustinlabs.github.io/kinklist/#' + hash);
console.log('\nHash length:', hash.length);
console.log('Values encoded:', randomValues.length);
