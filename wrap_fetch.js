const fs = require('fs');
const path = 'assets/index-Cc6wxg0n.utf8.js';
let text = fs.readFileSync(path, 'utf8');
const start = text.indexOf('e=await fetch(');
if (start === -1) throw new Error('fetch start not found');
const end = text.indexOf(',{headers:NT});', start);
if (end === -1) throw new Error('fetch end not found');
const oldCall = text.slice(start, end);
const newCall = 'e=await fetch("https://custodiabackend-staging.idsf.com.br/api/ZiSign/eventos-unicos?mes="+mes+"&ano="+ano';
text = text.slice(0, start) + newCall + text.slice(end);
fs.writeFileSync(path, text, 'utf8');

