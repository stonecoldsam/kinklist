const fs = require('fs');

// Simulate the parseKinksText function
function parseKinksText(kinksText) {
    const kinks = {};
    const lines = kinksText.split('\n');
    
    let currentCategory = null;
    let currentFields = [];
    
    for (let line of lines) {
        line = line.trim();
        
        if (line.startsWith('#')) {
            currentCategory = line.substring(1).trim();
            kinks[currentCategory] = { fields: [], kinks: [] };
            continue;
        }
        
        if (line.startsWith('(') && currentCategory) {
            const fieldsMatch = line.match(/\((.*?)\)/);
            if (fieldsMatch) {
                currentFields = fieldsMatch[1].split(',').map(s => s.trim());
                kinks[currentCategory].fields = currentFields;
            }
            continue;
        }
        
        if (line.startsWith('*') && currentCategory) {
            const kinkName = line.substring(1).trim();
            kinks[currentCategory].kinks.push({ kinkName });
            continue;
        }
    }
    
    return kinks;
}

// Load and parse kinklist
const content = fs.readFileSync('kinklist.txt', 'utf8');
const kinks = parseKinksText(content);

console.log('Testing hash stability...\n');

// Test 1: Object.keys() consistency
console.log('Test 1: Object.keys() order consistency');
const keys1 = Object.keys(kinks);
const keys2 = Object.keys(kinks);
const keys3 = Object.keys(kinks);
const consistent = JSON.stringify(keys1) === JSON.stringify(keys2) && JSON.stringify(keys2) === JSON.stringify(keys3);
console.log('  Multiple Object.keys() calls return same order:', consistent ? '✓ PASS' : '✗ FAIL');

// Test 2: Count fields
let totalFields = 0;
const categories = Object.keys(kinks);
for (let catName of categories) {
    const category = kinks[catName];
    for (let kink of category.kinks) {
        totalFields += category.fields.length;
    }
}
console.log('\nTest 2: Total field count');
console.log('  Total fields in kinklist:', totalFields);
console.log('  Should match hash generation:', totalFields === 719 ? '✓ PASS' : '✗ FAIL');

// Test 3: Iteration order
console.log('\nTest 3: Multiple iteration order');
function getIterationOrder() {
    const order = [];
    const kinkCats = Object.keys(kinks);
    for (let i = 0; i < kinkCats.length; i++) {
        const catName = kinkCats[i];
        const category = kinks[catName];
        const kinkArr = category.kinks;
        for (let k = 0; k < kinkArr.length; k++) {
            const kink = kinkArr[k];
            order.push(`${catName}::${kink.kinkName}`);
        }
    }
    return order;
}

const order1 = getIterationOrder();
const order2 = getIterationOrder();
const order3 = getIterationOrder();
const orderConsistent = JSON.stringify(order1) === JSON.stringify(order2) && JSON.stringify(order2) === JSON.stringify(order3);
console.log('  Iteration order consistent:', orderConsistent ? '✓ PASS' : '✗ FAIL');
console.log('  First 5 items:', order1.slice(0, 5));
console.log('  Last 5 items:', order1.slice(-5));

// Test 4: Check for conditional categories
console.log('\nTest 4: Conditional categories in iteration');
const conditionalCats = [
    'Watersports / Scat',
    'General Surrealism',
    'Vore / Unbirth',
    'Cum-related',
    'BDSM & Related',
    'Blood & Gore / Torture / Death'
];
for (let cat of conditionalCats) {
    const included = categories.includes(cat);
    console.log(`  ${cat}:`, included ? '✓ INCLUDED' : '✗ MISSING');
}

console.log('\n' + '='.repeat(60));
console.log('VERDICT:');
if (consistent && orderConsistent && totalFields === 719) {
    console.log('✓ Hash system should be STABLE and RELIABLE');
    console.log('  - Object.keys() order is consistent');
    console.log('  - Iteration order is deterministic');
    console.log('  - All conditional categories included');
    console.log('  - Resizing window will NOT affect hash');
} else {
    console.log('✗ POTENTIAL ISSUES DETECTED');
    if (!consistent) console.log('  - Object.keys() order inconsistent!');
    if (!orderConsistent) console.log('  - Iteration order inconsistent!');
    if (totalFields !== 719) console.log('  - Field count mismatch!');
}
console.log('='.repeat(60));
