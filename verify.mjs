import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import vm from 'node:vm';
const read=name=>readFileSync(new URL(name,import.meta.url),'utf8');
const context=vm.createContext({});
vm.runInContext(read('data.js')+';globalThis.data=RESEARCH',context);
const data=context.data,ids=new Set(data.sources.map(s=>s.id));
assert.equal(ids.size,data.sources.length,'Source IDs must be unique');
assert.equal(data.vendors.length,8);
for(const s of data.sources){assert.equal(new URL(s.url).protocol,'https:');assert.ok(['verified','conflict','partial'].includes(s.status));assert.ok(s.evidence&&s.boundary);}
for(const v of data.vendors){
  assert.equal(v.cells.length,3);
  for(const f of [...v.cells.flat(),...v.extra]){assert.ok(f.refs.length);for(const id of f.refs)assert.ok(ids.has(id),`${v.name}: unknown source ${id}`);}
}
const app=read('app.js');
vm.runInContext(app.slice(app.indexOf('function ceilUnits('),app.indexOf('const inquiry=')),context);
const calc=(...args)=>context.estimateRates(...args);
assert.equal(calc(.2,10,10,5).haoku,900,'Minimum first weight');
assert.equal(calc(.5,10,10,5).haoku,900);
assert.equal(calc(.5,10,10,5).exactBoundary,true,'0.50kg ambiguity is disclosed');
assert.equal(calc(.6,10,10,5).haoku,1080);
assert.equal(calc(4.2,40,30,20).haoku,7560);
assert.equal(calc(4.2,40,30,20).qihang,10000);
assert.equal(calc(4.21,40,30,20).haoku,7740);
assert.equal(calc(4,60,26,20).volumeTriggered,false,'Exactly 1.3x does not trigger');
assert.equal(calc(4,60,26.1,20).volumeTriggered,true);
assert.equal(calc(3,60,30,20).surcharge,900,'Volumetric difference rounded up');
assert.equal(calc(3,60,30,20).haoku,6300);
assert.equal(calc(3,60,30,20).qihang,12000);
assert.equal(calc(20,10,10,10).qihang,40000);
assert.equal(calc(20.01,10,10,10).qihang,null,'Stop over regular weight');
assert.equal(calc(1,100,100,100).qihang,null,'Stop over volumetric weight');
assert.equal(calc(20.01,10,10,10).haoku,null,'Stop over tool model range');
for(const w of [0,-1,NaN,Infinity])assert.ok(calc(w,10,10,10).error);
assert.ok(calc(101,10,10,10).error);
assert.ok(calc(1,301,10,10).error);
const html=read('index.html');
const htmlIds=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
assert.equal(htmlIds.length,new Set(htmlIds).size,'Unique HTML IDs');
for(const match of app.matchAll(/\$\('([^']+)'\)/g))assert.ok(htmlIds.includes(match[1]),`DOM target missing: ${match[1]}`);
for(const match of html.matchAll(/(?:src|href)="((?:styles\.css|app\.js|data\.js))"/g))assert.ok(existsSync(new URL(match[1],import.meta.url)));
assert.ok(!html.includes('800<span>円'),'Old tail-box price removed');
console.log(`PASS: 8 vendors, ${data.sources.length} sources; source integrity, price boundaries, volumetric threshold, invalid inputs, HTML targets.`);
