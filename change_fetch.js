const fs = require('fs');
const path = 'assets/index-Cc6wxg0n.utf8.js';
let text = fs.readFileSync(path, 'utf8');
const target = '?mes=&ano=,{headers:NT});';
if (!text.includes(target)) throw new Error('target not found');
const replacement = '?mes="+mes+"&ano="+ano,{headers:NT});';
text = text.replace(target, replacement);
fs.writeFileSync(path, text, 'utf8');


