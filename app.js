'use strict';
const $ = id => document.getElementById(id);
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const sourceMap = new Map(RESEARCH.sources.map(s => [s.id,s]));
function refs(ids = []) { return ids.map(id => {const s=sourceMap.get(id); if(!s) throw new Error(`Missing source: ${id}`);return `<button class="ref" data-source="${esc(id)}" aria-label="查看来源 ${esc(s.code)}：${esc(s.title)}">${esc(s.code)}</button>`;}).join(''); }
function fact(f) {return `${esc(f.text)} ${refs(f.refs)}`;}
function badge(tone,text) {return `<span class="badge ${tone}">${esc(text)}</span>`;}
const statusLabel = {verified:'已核验原文', conflict:'已核验 · 有差异', partial:'部分 / 待核验'};
const statusTone = {verified:'green',conflict:'amber',partial:'neutral'};
function renderVendors() {
  $('matrixBody').innerHTML = RESEARCH.matrix.map(row => {
    const v=RESEARCH.vendors.find(v=>v.id===row.id);
    const searchText=[v.name,v.sub,v.pending,v.level,...v.cells.flat().map(f=>f.text),...v.extra.map(f=>f.text)].join(' ');
    return `<tr data-vendor="${v.id}" data-tags="${v.tags.join(' ')}" data-search="${esc(searchText)}"><td data-label="仓库"><b><a href="#vendor-${v.id}" class="open-vendor" data-vendor="${v.id}">${esc(v.name)} ↗</a></b><small>${esc(v.sub)}</small></td>${[['分箱 / 尾箱',row.split],['仓储',row.storage],['费用',row.fees],['待确认 / 限制',row.conclusion]].map(([label,f],i)=>`<td data-label="${label}">${i===3?esc(f.text):fact(f)}</td>`).join('')}</tr>`;
  }).join('');
  $('vendorDetails').innerHTML = RESEARCH.vendors.map((v,i)=>`<details class="vendor" id="vendor-${v.id}"><summary><span class="vendor-no">0${i+1}</span><h3>${esc(v.name)}</h3><span class="summary-text">${esc(v.pitch)}</span><span aria-hidden="true">＋</span></summary><div class="vendor-body"><div><h4>完整规则</h4><ul>${v.cells.flat().concat(v.extra).map(f=>`<li>${fact(f)}</li>`).join('')}</ul></div><div class="unresolved"><h4>待确认</h4><p>${esc(v.pending)}</p></div></div></details>`).join('');
}
function filterRows() {
  const q=$('search').value.trim().toLocaleLowerCase(), f=$('filter').value;
  let count=0;
  document.querySelectorAll('#matrixBody tr').forEach(row=>{const ok=(!q||(row.dataset.search+' '+row.textContent).toLocaleLowerCase().includes(q))&&(f==='all'||row.dataset.tags.split(' ').includes(f));row.hidden=!ok;if(ok)count++;});
  $('resultCount').textContent = `${count} / ${RESEARCH.vendors.length} 家`;
  $('emptyResults').classList.toggle('hidden',count>0);
}
function sourceCard(s) {
  return `<article class="source-item" id="source-${s.id}"><div class="source-top"><span class="source-code">${s.code}</span>${badge(statusTone[s.status],statusLabel[s.status])}</div><h3>${esc(s.title)}</h3><div class="source-bottom"><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">官网 ↗</a><button data-source="${s.id}">依据与限制</button><span>${RESEARCH.checkedAt}</span></div></article>`;
}
function filterSources() {
  const q=$('sourceSearch').value.trim().toLocaleLowerCase(),f=$('sourceFilter').value;
  const list=RESEARCH.sources.filter(s=>(!q||[s.code,s.title,s.evidence,s.boundary,s.url].join(' ').toLocaleLowerCase().includes(q))&&(f==='all'||(f==='verified'?s.status!=='partial':s.status===f)));
  $('sourceList').innerHTML=list.map(sourceCard).join('');
  $('sourceCount').textContent=`${list.length} / ${RESEARCH.sources.length} 条`;
  $('emptySources').classList.toggle('hidden',list.length>0);
}
function showSource(id) {
  const s=sourceMap.get(id); if(!s)return;
  $('dialogContent').innerHTML=`${badge(statusTone[s.status],statusLabel[s.status])}<h2 id="dialogTitle">${esc(s.code)} · ${esc(s.title)}</h2><div class="dialog-evidence">${esc(s.evidence)}</div><p><b>限制：</b>${esc(s.boundary)}</p>${s.publishedAt?`<p class="fine">发布日期：${esc(s.publishedAt)}</p>`:''}<p class="fine">核验：${RESEARCH.checkedAt}，可能使用缓存；不代表具体订单承诺。</p><p><a class="dialog-url" href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">打开官方原文 ↗</a></p>${s.extraLinks?`<p>${s.extraLinks.map(l=>`<a href="${esc(l.url)}" target="_blank" rel="noopener noreferrer">${esc(l.title)} ↗</a>`).join(' · ')}</p>`:''}<button class="quiet-button" data-archive="${s.id}">定位来源 ↓</button>`;
  $('sourceDialog').showModal();
}
function renderPricing() {
  const rows=[
    ['15号库 · 云归雁CC','普通会员首0.5kg 900円；续0.1kg 180円；一般进位模型3kg为5400円、5kg为9000円。','整档边界两种解读可能相差180円，非确定报价；超体积重另加；原稿1600円/kg已修正。',['h-rate','h-rule']],
    ['起航 · 文具航空','2000円/kg；整公斤档。3kg 6000円 / 5kg 10000円。','超过1.3倍用体积重；常规≤20kg；商品、尺寸及附加费需确认。',['q-line']],
    ['日转网 · 邮政航空','3/5kg：费用页3385/4645円；线路页3450/4850円。','官方页面冲突，不选低价作为当前报价。',['r-fee','r-route']],
    ['日转网 · 邮政海运','3/5kg：费用页2090/2660円；线路页2600/3400円。','同样存在价目差异，需客服给适用线路与日期。',['r-fee','r-route']],
    ['COSMOS-LINE','手续费500円/次，超5包合箱150円/包；国际邮费需询价。','未核验到可读国际价目，不制造3kg/5kg数字。',['c-service','c-price']],
    ['TRANSBANG · 服务费','≤10kg为50円/kg；3/5kg对应150/250円服务费。','这是服务费，国际运费另计；纸箱及人工操作另有条件。',['t-fee']],
    ['518 / 吉速 / JPGOODBUY','518本次价目页未列价；吉速14100円未核实已移除；JPGOODBUY须按线路询价。','先核资格、商品与线路，不能用不完整或旧表数字作报价。',['s-price','j-route','g-route']]
  ];
  $('pricingBody').innerHTML=rows.map(r=>`<tr><td><b>${esc(r[0])}</b></td><td>${esc(r[1])} ${refs(r[3])}</td><td>${esc(r[2])}</td></tr>`).join('');
  $('calcAssumptions').innerHTML=`15号库采用一般0.1kg向上进位模型；官方“0.10kg→0.2kg”示例有歧义，整档可能多一档，须复核。体积重超1.3倍：15号库差额整kg×300円；起航改按体积重整kg。${refs(['h-rate','h-rule','q-line'])}`;
  $('customsNote').innerHTML=`<h3>个人寄递申报</h3><p>境外寄入物品每次限值2000元（2024-12-01起），仍须合理自用，不得出售或出租；2000元不是免税额。应如实申报，不得拆箱规避监管，数量、归类和税额由海关认定。${refs(['law-limit','law-use'])}</p>`;
}
// 整数精度运算避免4.2等十进制边界产生浮点多计费。
function ceilUnits(value,step) {return Math.ceil((value-1e-9)/step);}
function estimateRates(weight,length,width,height) {
  const inputs=[weight,length,width,height];
  if(inputs.some(v=>!Number.isFinite(v)||v<=0))return {error:'请输入大于0的有效重量与尺寸。'};
  if(weight>100||[length,width,height].some(v=>v>300))return {error:'输入超出估算范围（实重≤100kg，单边≤300cm），请询价。'};
  const volume=length*width*height/6000;
  const volumeTriggered=volume>weight*1.3+1e-9;
  const surcharge=volumeTriggered?ceilUnits(volume-weight,1)*300:0;
  // 20kg为本工具保守试算范围，不声明15号库的官方重量上限。
  const haoku=weight<=20?900+Math.max(0,ceilUnits(weight-.5,.1))*180+surcharge:null;
  const qWeight=volumeTriggered?volume:weight;
  const qihang=weight<=20&&qWeight<=20?ceilUnits(qWeight,1)*2000:null;
  const exactBoundary=weight>=.5&&Math.abs(weight*10-Math.round(weight*10))<1e-7;
  return {volume,volumeTriggered,surcharge,haoku,qWeight,qihang,exactBoundary};
}
function calculate(event) {
  if(event)event.preventDefault();
  const values=['weight','length','width','height'].map(id=>Number($(id).value));
  const r=estimateRates(...values);
  $('calcError').textContent=r.error||'';
  if(r.error){$('vol').textContent='—';$('calcResult').innerHTML='';return;}
  $('vol').textContent=`${r.volume.toFixed(2)} kg`;
  const yen=n=>n.toLocaleString('zh-CN')+' 円';
  const hValue=r.haoku===null?'<b class="unpriced">超出工具试算范围<br>请向仓库询价</b>':r.exactBoundary?`<b class="model-range">${r.haoku.toLocaleString('zh-CN')}–${yen(r.haoku+180)}</b>`:`<b>${yen(r.haoku)}</b>`;
  $('calcResult').innerHTML=`<div class="calc-row"><div>15号库 · 云归雁CC<small>普通会员 · ${r.exactBoundary?'两种进位解释的模型值':'一般进位模型'}</small></div>${hValue}</div>${r.haoku!==null?`<p class="calc-row-note">${r.volumeTriggered?`一般模型基础 ${yen(r.haoku-r.surcharge)} + 体积差额附加 ${yen(r.surcharge)}`:'未触发体积差额附加'}${r.exactBoundary?'；整档边界官方示例有歧义，上列为两种解读的试算区间，非实际账单上下限。须向客服确认。':''}</p>`:''}<div class="calc-row"><div>起航 · 文具航空<small>${r.volumeTriggered?'体积重':'实重'}基准 ${r.qWeight.toFixed(2)} kg${r.qihang!==null?` → ${ceilUnits(r.qWeight,1)}kg档`:''}</small></div>${r.qihang===null?'<b class="unpriced">超过常规20kg<br>请先向仓库确认</b>':`<b>${yen(r.qihang)}</b>`}</div><p class="calc-row-note">仅为基础运费试算，不包含其他服务费；不据此判断线路可用性。15号库工具限实重20kg，官方尺寸 / 重量限制请另核实。</p>`;
}
const inquiry=`你好，我住中国大陆，自己在日本官网下单，需要日本仓代收、合箱转运。每批约3–5kg、5–10包，主要是徽章、亚克力、色纸、小卡、特典。

请按适用线路书面确认：
1. 必须分箱时，是否先给每箱清单、尺寸、实重、计费重和费用，等我确认？
2. 0.2kg尾箱能否留库等下一批？如何重新入库、起算仓储、收费？
3. 是否自动扣款或出库？能否由我逐箱确认？手动付款前能否换线或重组？
4. 各阶段撤销、重包、重新合箱的条件和费用是什么？已付费用哪些可退？
5. 按5kg、10个来源包裹，逐项报价运费、入库、合箱/分箱、箱材、加固、派送及税费，注明首重、进位、体积重和有效期。
6. 能否保留特典、赠品和原包装？仓储期限、弃货节点，以及丢失/破损/内件缺失如何理赔？

请先核对我的代收资格、商品和真实申报方式，并提供当前价目、规则链接与生效日期。谢谢！`;
async function copyInquiry() {
  const text=$('inquiryText').value;
  try {
    if(!navigator.clipboard?.writeText)throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(text);
    $('copyStatus').textContent='已复制当前编辑内容，可粘贴给客服。';
  }catch {
    $('inquiryText').focus();$('inquiryText').select();
    let copied=false;try{copied=document.execCommand('copy');}catch{}
    $('copyStatus').textContent=copied?'已复制当前编辑内容，可粘贴给客服。':'已选中话术。请按 Ctrl+C / Command+C，或长按文本复制。';
  }
}
renderVendors();renderPricing();filterRows();filterSources();calculate();$('inquiryText').value=inquiry;
$('search').addEventListener('input',filterRows);$('filter').addEventListener('change',filterRows);
$('resetFilter').addEventListener('click',()=>{$('search').value='';$('filter').value='all';filterRows();});
$('sourceSearch').addEventListener('input',filterSources);$('sourceFilter').addEventListener('change',filterSources);
$('calcForm').addEventListener('submit',calculate);
['weight','length','width','height'].forEach(id=>$(id).addEventListener('input',calculate));
$('copyInquiry').addEventListener('click',copyInquiry);
$('printButton').addEventListener('click',()=>window.print());
$('closeDialog').addEventListener('click',()=>$('sourceDialog').close());
$('sourceDialog').addEventListener('click',event=>{if(event.target===$('sourceDialog')){const r=event.target.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)event.target.close();}});
document.addEventListener('click',event=>{
  const source=event.target.closest('[data-source]');if(source){showSource(source.dataset.source);return;}
  const link=event.target.closest('.open-vendor');if(link){const panel=$(`vendor-${link.dataset.vendor}`);if(panel)panel.open=true;}
  const anchor=event.target.closest('a[href^="#"]');if(anchor){const target=document.getElementById(anchor.hash.slice(1));if(target?.tagName==='DETAILS')target.open=true;}
  const archive=event.target.closest('[data-archive]');if(archive){$('sourceDialog').close();$('sourceSearch').value='';$('sourceFilter').value='all';filterSources();const item=$(`source-${archive.dataset.archive}`);item.scrollIntoView({block:'center'});item.classList.add('flash');setTimeout(()=>item.classList.remove('flash'),2000);}
});
if('IntersectionObserver' in window){const nav=document.querySelectorAll('.sidebar nav a');const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){nav.forEach(a=>a.classList.toggle('active',a.hash==='#'+e.target.id));}});},{rootMargin:'-5% 0px -65% 0px',threshold:0});document.querySelectorAll('main>section[id],main>details[id]').forEach(s=>observer.observe(s));}
// 打印时展开证据，再恢复用户原来的展开状态。
let previouslyOpen=[];
window.addEventListener('beforeprint',()=>{previouslyOpen=[...document.querySelectorAll('details[open]')];document.querySelectorAll('details').forEach(d=>d.open=true);});
window.addEventListener('afterprint',()=>document.querySelectorAll('details').forEach(d=>d.open=previouslyOpen.includes(d)));
