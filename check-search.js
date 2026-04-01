const fs = require('fs');
const text = fs.readFileSync('assets/index-Cc6wxg0n.js','utf16le');
const idx = text.indexOf('const e=await fetch(');
console.log('idx', idx);
const snippet = text.slice(idx, idx + 120);
console.log('snippet', snippet);
const search = 'const e=await fetch( https://custodiabackend-staging.idsf.com.br/api/ZiSign/eventos-unicos,{headers:NT});';
console.log('startsWith', snippet.startsWith(search));
console.log('indexOf search', text.indexOf(search));
