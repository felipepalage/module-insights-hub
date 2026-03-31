const fs=require('fs');
const text=fs.readFileSync('assets/index-Cc6wxg0n.js','utf8');
const idx=text.indexOf('animate-vertical-ticker');
console.log(idx);
console.log(text.slice(idx-120, idx+150));
