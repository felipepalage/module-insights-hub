from pathlib import Path
paths = [Path('assets/index-Cc6wxg0n.js'), Path('dist/assets/index-Cc6wxg0n.js')]
old_module = 'j.jsx( div,{className:animate-vertical-ticker,children:[...e,...e].map((d,p)=>j.jsx(TP,{module:d},d.apiId||p))})'
new_module = 'j.jsx(div,{className:animate-vertical-ticker,children:[e.map((d,p)=>j.jsx(TP,{module:d},d.apiId?pendencias-:pendencias-)),e.map((d,p)=>j.jsx(TP,{module:d},(d.apiId?pendencias-:pendencias-)+-clone))]})'
old_const = 'function TP({module:e}){const t=e.pendencias||0,r=e.processados||0,n=t+r,i=n>0?r/n*100:0,s=(e.recentEvents||[]).map(d=>d.idPortalModulo||d.idportalmodulo).filter(Boolean),u=Array.from(new Set(s));'
new_const = 'function TP({module:e}){const t=e.pendencias||0,r=e.processados||0,n=t+r,i=n>0?r/n*100:0,s=(e.recentEvents||[]).map(d=>d.idPortalModulo||d.idportalmodulo).filter(Boolean),u=Array.from(new Set(s)),v=u.slice(0,6),w=Math.max(0,u.length-v.length);'
old_ids = 'u.length?j.jsxs(div,{className:text-xs text-muted-foreground,children:[IDs: ,u.slice(0,3).join( ),u.length>3? +:]}):j.jsx( div,{className:text-xs text-muted-foreground,children:IDs não disponíveis})'
new_ids = 'u.length?j.jsxs(div,{className:flex flex-col gap-1 text-xs text-muted-foreground,children:[j.jsx(span,{className:font-black text-[9px] uppercase tracking-[.35em] text-foreground/50,children:IDs}),j.jsx(div,{className:flex flex-wrap gap-1,children:[...v.map((d,p)=>j.jsx(span,{className:font-mono text-[10px] text-foreground/80,children:d},id--)),w?j.jsx(span,{className:font-mono text-[10px] text-amber-500,children:+ mais}):null]})]}):j.jsx(div,{className:text-xs text-muted-foreground,children:IDs não disponíveis})'
for path in paths:
 text = path.read_text(encoding='utf-8')
 if old_module not in text:
 raise SystemExit(f'old_module segment not found in {path}')
 text = text.replace(old_module, new_module, 1)
 if old_const not in text:
 raise SystemExit(f'old_const segment not found in {path}')
 text = text.replace(old_const, new_const, 1)
 if old_ids not in text:
 raise SystemExit(f'old_ids segment not found in {path}')
 text = text.replace(old_ids, new_ids, 1)
 path.write_text(text, encoding='utf-8')
