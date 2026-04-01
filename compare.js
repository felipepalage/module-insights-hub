const fs = require('fs');
const search = 'const e=await fetch( https://custodiabackend-staging.idsf.com.br/api/ZiSign/eventos-unicos,{headers:NT});';
const text = fs.readFileSync('assets/index-Cc6wxg0n.js','utf16le');
const idx = text.indexOf('const e=await fetch(');
const snippet = text.slice(idx, idx + search.length);
console.log('snippet length', snippet.length, 'search length', search.length);
for(let i=0;i<Math.min(snippet.length, search.length);i++){
  if(snippet[i]!==search[i]){
    console.log('diff at',i,snippet[i],search[i],snippet.charCodeAt(i),search.charCodeAt(i));
    break;
  }
}
console.log('snip', JSON.stringify(snippet));
console.log('search', JSON.stringify(search));
