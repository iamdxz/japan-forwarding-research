'use strict';
const $=id=>document.getElementById(id);
const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const sourceMap=new Map(RESEARCH.sources.map(s=>[s.id,s]));
const statusNames={verified:'已核验',conflict:'有差异',partial:'部分 / 待核验'};
let currentParams=null;

function ceilUnits(value,step){return Math.ceil((value-1e-9)/step);}
function estimateRates(weight,length,width,height){
  const values=[weight,length,width,height];
  if(values.some(v=>!Number.isFinite(v)||v<=0))return {error:'请输入有效重量和尺寸。'};
  if(weight>100||[length,width,height].some(v=>v>300))return {error:'超出试算范围。'};
  const volume=length*width*height/6000,volumeTriggered=volume>weight*1.3+1e-9;
  const surcharge=volumeTriggered?ceilUnits(volume-weight,1)*300:0;
  const haoku=weight<=20?900+Math.max(0,ceilUnits(weight-.5,.1))*180+surcharge:null;
  const qWeight=volumeTriggered?volume:weight;
  const qihang=weight<=20&&qWeight<=20?ceilUnits(qWeight,1)*2000:null;
  const exactBoundary=weight>=.5&&Math.abs(weight*10-Math.round(weight*10))<1e-7;
  return {volume,volumeTriggered,surcharge,haoku,qWeight,qihang,exactBoundary};
}
function tableValue(table,weight,key='value'){
  const band=table.find(r=>weight<=r.maxKg+1e-9);return band?band[key]:null;
}
function arrayRate(routes,mode,weight){
  const route=routes.find(r=>r.id===mode);if(!route)return null;
  const i=route.upperBoundKg.findIndex(limit=>weight<=limit+1e-9);return i<0?null:route.baseJPY[i];
}
function unavailable(message,line='',status='unknown',refs=[]){return {status,message,line,refs,sortEligible:false,notes:[],items:[]};}
function estimate(line,base,items,refs,notes=[],options={}){
  const fee=items.reduce((sum,item)=>sum+item.amount,0);
  return {status:'estimate',currency:'JPY',line,min:base+fee,max:base+fee,items:[{label:'运费 / 官方表显示费用',amount:base},...items],refs,notes,sortEligible:true,...options};
}
function getQuote(id,mode,p){
  const w=p.weight,n=p.packages;
  if(id==='sf518')return unavailable('资格不符','海外客户自购代收','ineligible',['s-elig','s-price']);
  if(id==='haoku'){
    if(mode==='sea')return unavailable('海运价待询','未核验适用海运价目','unknown',['h-rate']);
    if(w>14.5)return unavailable('超过合箱重量上限','超过14.5kg，请分箱询价','unknown',['h-limit']);
    if(n>15)return unavailable('超过合箱上限','云归雁CC最多15个来源包裹','unknown',['h-combine']);
    const r=estimateRates(w,p.length||1,p.width||1,p.height||1);
    if(r.haoku===null)return unavailable('需单独询价','超出本工具20kg试算范围','unknown',['h-rate']);
    const q=estimate('云归雁CC',r.haoku-r.surcharge,[{label:'体积差额附加',amount:r.surcharge}],['h-rate','h-rule','h-combine'],['普通会员首0.5kg 900円，续0.1kg 180円；其他未核实操作费未计。','体积重超过实重1.3倍时，差额整kg×300円。'],{caption:r.exactBoundary?'整档进位有歧义':'普通会员基础运费'});
    if(r.exactBoundary){q.max+=180;q.notes.push('官方整档示例有歧义，显示两种解释的模型值，相差180円；不是实际账单上下限。');q.sortEligible=false;}
    return q;
  }
  if(id==='qihang'){
    if(mode==='sea')return unavailable('海运价待询','需另问适用海运线路','unknown',['q-line','q-pay']);
    const r=estimateRates(w,p.length||1,p.width||1,p.height||1);
    if(r.qihang===null)return unavailable('超常规20kg','实重或计价基准超过20kg','unknown',['q-line']);
    return estimate('文具类航空',r.qihang,[],['q-line','q-pay'],[`计算基准${r.qWeight.toFixed(2)}kg，向上取${ceilUnits(r.qWeight,1)}kg×2000円。`,'常规实重/计费重≤20kg；亚克力、特典等具体商品及包装附加费需确认。'],{caption:r.volumeTriggered?'已按体积重计价':'按实重整公斤档'});
  }
  if(id==='cosmos'){
    const base=arrayRate(RESEARCH.report.cosmos,mode,w);if(base===null)return unavailable('超价表范围');
    return estimate(mode==='air'?'国际航空便':'国际海运',base,[{label:'转运操作费',amount:500},{label:`超过5包的合箱费（${Math.max(0,n-5)}包×150円）`,amount:Math.max(0,n-5)*150}],['c-price','c-service'],['一个出库箱、一次转运试算；实际多箱收费口径需确认。','新箱200–600円、加固、税费等未计。'],{caption:'含操作费及超包合箱费'});
  }
  if(id==='transportjp'){
    if(w<1)return unavailable('最低计费待确认','表格与不满1kg计法需核对','unknown',['r-fee','r-route']);
    if(n>15)return unavailable('合箱规则待确认','15/20包两版规则冲突','unknown',['r-fee','r-route']);
    const old=tableValue(mode==='air'?RESEARCH.report.rzOldAir:RESEARCH.report.rzOldSea,w);
    const current=arrayRate(RESEARCH.report.cosmos,mode,w);
    if(old===null||current===null)return unavailable('超价表范围');
    return {status:'conflict',currency:'JPY',line:mode==='air'?'邮政航空':'邮政海运',min:Math.min(old,current),max:Math.max(old,current),items:[{label:'费用说明页表列值',amount:old},{label:'线路介绍页表列值',amount:current}],refs:['r-fee','r-route'],notes:['两个官网页面的表列值，不是实际报价区间；适用版本需要客服确认。','当前包裹数在两版免费合箱范围内；箱材、精准分箱、加固、税费等未计。'],caption:'两版价表冲突',sortEligible:false};
  }
  if(id==='transbang'){
    const base=arrayRate(RESEARCH.report.transbang,mode,w);if(base===null)return unavailable('超价表范围');
    const service=w*(w<=10?50:w<=20?100:150);
    return estimate(mode==='air'?'邮政一般空运':'邮政一般海运',base,[{label:`转送服务费（${w}kg×${w<=10?50:w<=20?100:150}円）`,amount:service}],['t-calc','t-fee','t-flow'],['已核对日本仓至中国上海公开试算；偏远目的地及实际包装另确认。','超过20件商品的人工费100円/件未计，不能用入库包裹数代算商品件数。',n>1?'两单以上合箱须使用收费纸箱（150–1000円），此处未计。':'纸箱、加固、保险、税费等未计。'],{caption:n>1?'含服务费；收费纸箱未计':'含转送服务费'});
  }
  if(id==='jgs'){
    const raw=tableValue(RESEARCH.report.jgs,w,mode);if(raw===null)return unavailable('超价表范围');
    const discounted=mode==='air'&&n<=2,base=discounted?raw*.95:raw;
    return estimate(mode==='air'?'普通邮政航空':'普通邮政海运',base,[{label:`优惠入库费（${n}包×20円）`,amount:n*20},{label:`超过10包合箱费（${Math.max(0,n-10)}包×100円）`,amount:Math.max(0,n-10)*100}],['j-postal','j-service'],[discounted?'2包以内满足普通用户航空95折条件，折扣日元进位以账单为准。':'多包裹不套用2包以内航空95折。','按当前20円/包入库优惠试算；箱材、加固、分箱及税费未计。'],{caption:discounted?'2包内航空95折；含入库费':'含入库及超包合箱费'});
  }
  if(id==='jpgoodbuy'){
    const base=tableValue(RESEARCH.report.jpg,w,mode);if(base===null)return unavailable('超价表范围');
    return estimate(mode==='air'?'普通邮政航空':'普通邮政海运',base,[{label:`基础会员超过5包合箱费（${Math.max(0,n-5)}包×100円）`,amount:Math.max(0,n-5)*100}],['g-postal','g-service'],['直接采用官网“总费用”列，未另加未确认手续费。','按基础5包免费合箱口径，会员及提交路径可能改变免费数量。','箱材、加固、保险及税费等未计；默认不套用飞鸟优惠。'],{caption:'官方表费用＋超包合箱费'});
  }
  return unavailable('需询价');
}
const inquiry=(name,p)=>`你好，我想咨询${name||'日本仓'}自购代收转运。我居住中国大陆，自己在日本官网下单；预计打包${p.weight}kg、${p.packages}个来源包裹，主要是徽章、亚克力、色纸、小卡和特典。

请书面确认：
1. 是否接受我的自购代收资格？
2. 分箱后少量尾货能否留到下一批一起发？如何重新入库、算仓储及收费？
3. 打包前能否按商品清单沟通防护和分组，让适合空运、海运的商品分别走对应线路？
4. 打包后还能否调整箱内商品、换线路或重新合箱？是否先给方案和费用、等我确认后出库？
5. 请分别列明空运/海运的运费、入库、合箱/分箱、箱材、加固、派送与税费，并提供当前规则、适用日期。

谢谢！`;

function readParams(){
  const weight=Number($('weight').value),packages=Number($('packages').value),fx=Number($('fx').value);
  if(!Number.isFinite(weight)||weight<.1||weight>30)return {error:'重量请输入0.1–30kg。'};
  if(!Number.isInteger(packages)||packages<1||packages>20)return {error:'入库包裹数请输入1–20的整数。'};
  if(!Number.isFinite(fx)||fx<.01||fx>30)return {error:'请填写有效试算汇率。'};
  const raw=['length','width','height'].map(id=>$(id).value.trim());
  let dimensions=[];
  if(raw.some(Boolean)){
    dimensions=raw.map(Number);if(raw.some(v=>!v)||dimensions.some(v=>!Number.isFinite(v)||v<=0||v>300))return {error:'尺寸请三项都填写有效数值，或全部留空。'};
  }
  return {weight,packages,fx,length:dimensions[0]||null,width:dimensions[1]||null,height:dimensions[2]||null};
}
function money(value){return value.toLocaleString('zh-CN',{maximumFractionDigits:2,minimumFractionDigits:0});}
function nativeMoney(value,currency='JPY'){return money(value)+(currency==='JPY'?'円':'元');}
function cny(value,currency,p){return currency==='CNY'?value:value*p.fx/100;}
function status(state,label){return `<span class="status-badge ${esc(state)}">${esc(label)}</span>`;}
function priceCell(id,mode,p){
  const q=getQuote(id,mode,p);
  if(q.min===undefined)return `<div class="price-empty">${esc(q.message)}</div><div class="line-name">${esc(q.line)}</div>`;
  const min=cny(q.min,q.currency,p),max=cny(q.max,q.currency,p);
  const text=Math.abs(max-min)>.001?`${money(min)}–${money(max)}`:money(min);
  const name=RESEARCH.vendors.find(v=>v.id===id).name;
  const note=q.status==='conflict'?status('unknown','价表冲突'):q.caption?.includes('歧义')||q.caption?.includes('体积重')?esc(q.caption):'';
  return `<button class="price-detail-btn" data-vendor="${id}" data-mode="${mode}" aria-label="${esc(name)}${mode==='air'?'空运':'海运'}估算${text}元，查看明细"><span class="${q.status==='conflict'?'price-range':'price-value'}">¥${text}</span></button><div class="line-name">${esc(q.line)}</div>${note?`<div class="price-caption">${note}</div>`:''}`;
}
function renderReport(){
  const p=readParams();$('formError').textContent=p.error||'';
  if(p.error){currentParams=null;$('comparisonBody').innerHTML='<tr><td colspan="6" class="empty">填写有效参数后显示对比。</td></tr>';return;}
  currentParams=p;
  let rows=RESEARCH.report.rows.slice();const mode=$('sort').value;
  if(mode!=='default')rows.sort((a,b)=>{const aq=getQuote(a.id,mode,p),bq=getQuote(b.id,mode,p);const av=aq.sortEligible&&aq.max!==undefined?cny(aq.max,aq.currency,p):Infinity,bv=bq.sortEligible&&bq.max!==undefined?cny(bq.max,bq.currency,p):Infinity;return av-bv;});
  $('comparisonBody').innerHTML=rows.map(row=>{const vendor=RESEARCH.vendors.find(v=>v.id===row.id);return `<tr data-vendor-row="${row.id}"><td class="vendor-cell" data-label="仓库"><div class="vendor-name">${esc(vendor.name)}</div><button class="evidence-button" data-vendor="${row.id}">查看依据 ↗</button></td><td class="proscons-cell" data-label="优点 / 不足"><div class="pros"><span>优</span><p>${esc(row.pros)}</p></div><div class="cons"><span>缺</span><p>${esc(row.cons)}</p></div></td><td class="tail-cell" data-label="尾货留到下批">${status(row.tailState,row.tailLabel)}<p class="cell-note">${esc(row.tailNote)}</p></td><td class="packing-cell" data-label="打包沟通 / 空海调配"><b>${esc(row.packing)}</b><p class="cell-note">${esc(row.packingNote)}</p></td><td class="quote-cell" data-label="空运估算（元）">${priceCell(row.id,'air',p)}</td><td class="quote-cell" data-label="海运估算（元）">${priceCell(row.id,'sea',p)}</td></tr>`;}).join('');
}
function sourceDetails(source){return `<details><summary>${esc(source.code)} · ${esc(source.title)} <span class="detail-label">${statusNames[source.status]}</span></summary><p>${esc(source.evidence)}</p><p class="method-note">${esc(source.boundary)}</p><a href="${esc(source.url)}" target="_blank" rel="noopener noreferrer">官方原文 ↗</a>${source.extraLinks?source.extraLinks.map(link=>` · <a href="${esc(link.url)}" target="_blank" rel="noopener noreferrer">${esc(link.title)} ↗</a>`).join(''):''}${source.publishedAt?`<p class="method-note">页面日期：${esc(source.publishedAt)}</p>`:''}</details>`;}
function quoteBreakdown(id,mode,p){
  const q=getQuote(id,mode,p),label=mode==='air'?'空运':'海运';
  if(q.min===undefined)return `<section class="detail-block" id="quote-${mode}"><h3>${label}</h3><p>${esc(q.message)} · ${esc(q.line)}</p></section>`;
  const value=Math.abs(q.max-q.min)>.001?`${nativeMoney(q.min)} / ${nativeMoney(q.max)}`:nativeMoney(q.min);
  return `<section class="detail-block" id="quote-${mode}"><h3>${label} · ${esc(q.line)}</h3>${q.items.map(item=>`<div class="breakdown-row"><span>${esc(item.label)}</span><b>${nativeMoney(item.amount)}</b></div>`).join('')}<div class="breakdown-row"><span>${q.status==='conflict'?'两版表列值':'已知费用小计'}</span><b>${value}</b></div><p class="formula-box">人民币试算：${value} × ${p.fx}/100</p>${q.notes.map(note=>`<p class="method-note">${esc(note)}</p>`).join('')}</section>`;
}
function showVendor(id,mode){
  if(!currentParams)return;
  const p=currentParams,row=RESEARCH.report.rows.find(r=>r.id===id),v=RESEARCH.vendors.find(v=>v.id===id);
  $('vendorDialogTitle').textContent=`${v.name} · ${p.weight}kg / ${p.packages}包`;
  $('vendorDialogBody').innerHTML=`<div class="detail-grid"><section class="detail-block"><h3>尾货留到下批</h3>${status(row.tailState,row.tailLabel)}<p>${esc(row.tailNote)}</p></section><section class="detail-block"><h3>打包沟通与调配</h3><b>${esc(row.packing)}</b><p>${esc(row.packingNote)}</p><p class="method-note">按商品分别走空、海运，以及打包后能否重组，需针对本单书面确认。</p></section></div><div class="detail-grid">${quoteBreakdown(id,'air',p)}${quoteBreakdown(id,'sea',p)}</div>${id==='jpgoodbuy'?'<section class="detail-block"><h3>另有飞鸟航空</h3><p>基础价3kg 171元、5kg 271元；不支持分箱。转运9折需活动条件，不默认采用；箱材与税费另计。此处普通邮政报价未使用飞鸟价。</p></section>':''}${id==='jgs'?'<section class="detail-block"><h3>另有中包线路</h3><p>最低按5kg：航空14100円、海运12600円；商品与尺寸限制不同，不混入普通邮政比价。</p></section>':''}<details class="sources"><summary>规则与官方出处（${row.refs.length}）</summary><p class="method-note">核验日期 ${RESEARCH.checkedAt}；公开资料不代表具体订单承诺。</p>${row.refs.map(ref=>sourceDetails(sourceMap.get(ref))).join('')}</details><div class="dialog-actions"><button class="evidence-button" data-copy="${id}">复制本仓询价</button><span id="dialogCopyStatus" class="copy-status" role="status"></span></div>`;
  $('vendorDialog').showModal();
  if(mode)document.getElementById('quote-'+mode)?.scrollIntoView({block:'nearest'});
}
function allSources(){
  $('sourceDialogBody').innerHTML=`<p class="method-note">核验日期 ${RESEARCH.checkedAt}。官方页面可能使用缓存；规则冲突并列，未证实权限保留待确认。</p><div class="sources">${RESEARCH.sources.map(sourceDetails).join('')}</div><details class="legal-note"><summary>个人寄递申报说明</summary><p>自2024-12-01起，个人寄自境外物品每次限值2000元，仍须合理自用，不用于出售或出租；2000元不是免税额。应如实申报，不得拆箱规避监管，具体数量、归类和税额由海关认定。</p><a href="${esc(sourceMap.get('law-limit').url)}" target="_blank" rel="noopener noreferrer">海关公告 ↗</a> · <a href="${esc(sourceMap.get('law-use').url)}" target="_blank" rel="noopener noreferrer">征税办法 ↗</a></details>`;
  $('sourceDialog').showModal();
}
async function copyInquiry(id){
  const p=currentParams;if(!p)return;
  const v=RESEARCH.vendors.find(v=>v.id===id),text=inquiry(v?.name||'',p);
  const target=id&&$('vendorDialog').open?(document.getElementById('dialogCopyStatus')||$('copyStatus')):$('copyStatus');
  try{await navigator.clipboard.writeText(text);target.textContent='已复制询价。';}
  catch{target.textContent='当前浏览器无法自动复制。';}
}
['weight','packages','fx','length','width','height'].forEach(id=>$(id).addEventListener('input',renderReport));
$('sort').addEventListener('change',renderReport);
$('allSources').addEventListener('click',allSources);
$('generalInquiry').addEventListener('click',()=>copyInquiry());
$('printButton').addEventListener('click',()=>window.print());
document.addEventListener('click',event=>{
  const close=event.target.closest('[data-close]');if(close){document.getElementById(close.dataset.close).close();return;}
  const copy=event.target.closest('[data-copy]');if(copy){copyInquiry(copy.dataset.copy);return;}
  const vendor=event.target.closest('[data-vendor]');if(vendor)showVendor(vendor.dataset.vendor,vendor.dataset.mode);
});
['vendorDialog','sourceDialog'].forEach(id=>$(id).addEventListener('click',event=>{if(event.target===$(id)){const r=event.target.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)$(id).close();}}));
renderReport();
