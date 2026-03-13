const fs = require("fs");
const paths = ["assets/index-Cc6wxg0n.js", "dist/assets/index-Cc6wxg0n.js"];
const old = ',NT={accept:"application/json",Ambiente:"custodia",Token:"DHQzckJ0TGWHiFxaVuUlmrBLWXwuejrtSAT0Mf47gvclZ5GKY543iYKNeLfqlzngXH0YcKGLe4qyv0avru3xeVGBp9yUQKKKlSyJ"},OT=new Map;';
const replacement = ',NT={accept:"application/json",Ambiente:"custodia",Token:"DHQzckJ0TGWHiFxaVuUlmrBLWXwuejrtSAT0Mf47gvclZ5GKY543iYKNeLfqlzngXH0YcKGLe4qyv0avru3xeVGBp9yUQKKKlSyJ"},opTimers=new Map;';
for (const p of paths) {
  let text = fs.readFileSync(p, 'utf8');
  let newText = text.replace(old, replacement);
  newText = newText
    .replace(/OT\.has\(/g, 'opTimers.has(')
    .replace(/OT\.set\(/g, 'opTimers.set(')
    .replace(/OT\.get\(/g, 'opTimers.get(')
    .replace(/OT\.forEach\(/g, 'opTimers.forEach(')
    .replace(/OT\.delete\(/g, 'opTimers.delete(');
  if (newText !== text) {
    fs.writeFileSync(p, newText, 'utf8');
    console.log('Updated', p);
  } else {
    console.log('No changes made to', p);
  }
}
