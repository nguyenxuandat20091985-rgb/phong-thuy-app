/* Nâng cấp Nhà ở + La Kinh hero 2026-10-30 */
(function(){
'use strict';
const $ = (id) => document.getElementById(id);
const ROOM_DETAILS = {
  bedroom:{title:'Phòng ngủ',lead:'Ưu tiên ngủ ngon và thoát hiểm trước.',should:['Giường vững, không chắn cửa.','Lối ra giường thông thoáng.','Ánh sáng dịu.'],avoid:['Tủ nặng thiếu neo.','Chặn cửa bằng đồ đạc.']},
  desk:{title:'Bàn làm việc',lead:'Công thái học và ánh sáng.',should:['Màn hình ngang tầm mắt.','Đủ sáng.'],avoid:['Ngồi lâu với tư thế xấu.']},
  kitchen:{title:'Nhà bếp',lead:'An toàn cháy.',should:['Tách vùng bếp nóng.','Lối đi khô.'],avoid:['Chất đồ dễ cháy sát bếp.']},
  entrance:{title:'Cửa chính',lead:'Lối vào an toàn.',should:['Lối vào sáng, khô.','Thảm chống trượt.'],avoid:['Chất đồ ngay cửa.']},
  living:{title:'Phòng khách',lead:'Giao tiếp ổn định.',should:['Chỗ ngồi vững.','Ánh sáng đủ.'],avoid:['Dây điện giữa lối đi.']},
  bath:{title:'Nhà vệ sinh',lead:'Chống trượt, thông gió.',should:['Sàn chống trượt.'],avoid:['Đồ dễ đổ gần bồn.']}
};
function openRoomDetail(key){
  const data=ROOM_DETAILS[key]; if(!data) return;
  const body=$('roomModalBody'); if(!body) return;
  body.innerHTML='<h3>'+data.title+'</h3><p class="room-modal-lead">'+data.lead+'</p><div class="room-check-grid"><div class="room-check-block"><h4>Nên</h4><ul>'+data.should.map(t=>'<li>'+t+'</li>').join('')+'</ul></div><div class="room-check-block avoid"><h4>Tránh</h4><ul>'+data.avoid.map(t=>'<li>'+t+'</li>').join('')+'</ul></div></div>';
  const modal=$('roomDetailModal'); if(modal) modal.hidden=false;
}
function closeRoomDetail(){ const modal=$('roomDetailModal'); if(modal) modal.hidden=true; }
const PROTECT_KEY='pt_protect_checklist_v1';
const PROTECT_ITEMS=[
  {id:'p1',title:'1. Khảo sát hiện trạng',desc:'Ghi hướng cửa, vị trí phòng, điểm ẩm/nứt, tiếng ồn, ánh sáng và lối thoát.'},
  {id:'p2',title:'2. Sửa kết cấu & an toàn',desc:'Xử lý rò điện/gas, nứt, mốc, cửa khó đóng; gọi thợ nếu cần.'},
  {id:'p3',title:'3. Lối thoát & lối vào',desc:'Dọn thông thoáng cửa chính, hành lang; không chắn lối thoát hiểm.'},
  {id:'p4',title:'4. Phòng cháy',desc:'Tách vật dễ cháy khỏi bếp; kiểm tra dây/ổ điện; thiết bị gas an toàn.'},
  {id:'p5',title:'5. Chống trượt / vấp',desc:'Lau khô sàn ẩm, cố định thảm, chống trượt nhà tắm và cầu thang.'},
  {id:'p6',title:'6. Thông gió & ánh sáng',desc:'Mở cửa hợp lý, hút mùi bếp/WC, bổ sung đèn lối đi và khu làm việc.'},
  {id:'p7',title:'7. Đồ nặng cố định',desc:'Neo tủ/kệ vào tường; bàn thờ/bếp ổn định, xa vật dễ cháy.'},
  {id:'p8',title:'8. Không dùng cách nguy hiểm',desc:'Không đốt lửa/nhang thiếu giám sát, không khoan phá kết cấu hay đặt vật nặng nơi dễ rơi để “hóa giải”.'}
];
function loadProtect(){ try{ return JSON.parse(localStorage.getItem(PROTECT_KEY)||'{}'); }catch(e){ return {}; } }
function saveProtect(s){ try{ localStorage.setItem(PROTECT_KEY, JSON.stringify(s)); }catch(e){} }
function renderProtect(){
  const box=$('protectChecklist'); if(!box) return;
  const st=loadProtect(); let done=0;
  box.innerHTML=PROTECT_ITEMS.map(it=>{ const on=!!st[it.id]; if(on) done++; return '<label class="protect-item"><input type="checkbox" data-pid="'+it.id+'" '+(on?'checked':'')+'/><span><strong>'+it.title+'</strong><small>'+it.desc+'</small></span></label>'; }).join('');
  const prog=$('protectProgress'); if(prog) prog.textContent='Đã hoàn thành '+done+'/'+PROTECT_ITEMS.length+' mục';
  box.querySelectorAll('input[data-pid]').forEach(inp=>{ inp.addEventListener('change',()=>{ const s=loadProtect(); s[inp.dataset.pid]=inp.checked; saveProtect(s); renderProtect(); }); });
}
function initProtectChecklist(){ renderProtect(); }
function initLayoutDetails(){
  document.querySelectorAll('.home-diagram.interactive[data-room]').forEach(btn=>btn.addEventListener('click',()=>openRoomDetail(btn.dataset.room)));
  document.querySelectorAll('[data-close-modal]').forEach(el=>el.addEventListener('click',closeRoomDetail));
  document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeRoomDetail(); });
}
function initHomeGuideTabs(){
  document.querySelectorAll('.home-guide-tab').forEach(function(button){
    button.addEventListener('click', function(){
      var name = button.dataset.guide;
      document.querySelectorAll('.home-guide-tab').forEach(function(b){ b.classList.toggle('active', b === button); });
      document.querySelectorAll('[data-guide-panel]').forEach(function(panel){
        var active = panel.dataset.guidePanel === name;
        panel.hidden = !active;
        panel.classList.toggle('active', active);
      });
    });
  });
}
function buildLakinhSVG(){
  const NS='http://www.w3.org/2000/svg';
  const svg=document.createElementNS(NS,'svg');
  svg.setAttribute('viewBox','0 0 1000 1000');
  svg.setAttribute('width','100%'); svg.setAttribute('height','100%');
  svg.setAttribute('class','hero-lakinh-img');
  const CX=500, CY=500;
  function el(tag, attrs){ const e=document.createElementNS(NS, tag); for(const k in attrs) e.setAttribute(k, attrs[k]); return e; }
  svg.appendChild(el('circle',{cx:CX,cy:CY,r:480,fill:'#f7f4ea',stroke:'#333','stroke-width':2}));
  svg.appendChild(el('circle',{cx:CX,cy:CY,r:470,fill:'#faf8f2'}));
  const tickG=el('g',{});
  for(let i=0;i<360;i++){
    const a=i*Math.PI/180; let r1=460; if(i%10===0) r1=450; else if(i%5===0) r1=455; const r2=470;
    const x1=CX+r1*Math.sin(a), y1=CY-r1*Math.cos(a), x2=CX+r2*Math.sin(a), y2=CY-r2*Math.cos(a);
    const isRed=(i>=337.5||i<22.5)||(i>=67.5&&i<112.5)||(i>=157.5&&i<202.5)||(i>=247.5&&i<292.5);
    tickG.appendChild(el('line',{x1:x1,y1:y1,x2:x2,y2:y2,stroke:isRed?'#d90000':'#333','stroke-width':i%10===0?2:1.5}));
    if(i%10===0){
      const tr=430, tx=CX+tr*Math.sin(a), ty=CY-tr*Math.cos(a);
      const t=el('text',{x:tx,y:ty,'text-anchor':'middle','dominant-baseline':'central',transform:'rotate('+i+','+tx+','+ty+')',fill:'#333','font-size':'14','font-weight':'700','font-family':'Arial,sans-serif'});
      t.textContent=String(i); tickG.appendChild(t);
    }
  }
  svg.appendChild(tickG);
  const dirs=[{name:'BẮC',angle:0,isRed:true},{name:'ĐÔNG BẮC',angle:45,isRed:false},{name:'ĐÔNG',angle:90,isRed:true},{name:'ĐÔNG NAM',angle:135,isRed:false},{name:'NAM',angle:180,isRed:true},{name:'TÂY NAM',angle:225,isRed:false},{name:'TÂY',angle:270,isRed:true},{name:'TÂY BẮC',angle:315,isRed:false}];
  const rIn=260, rOut=400;
  dirs.forEach(function(dir){
    const a1=(dir.angle-22.5)*Math.PI/180, a2=(dir.angle+22.5)*Math.PI/180;
    const x1i=CX+rIn*Math.sin(a1), y1i=CY-rIn*Math.cos(a1), x1o=CX+rOut*Math.sin(a1), y1o=CY-rOut*Math.cos(a1);
    const x2o=CX+rOut*Math.sin(a2), y2o=CY-rOut*Math.cos(a2), x2i=CX+rIn*Math.sin(a2), y2i=CY-rIn*Math.cos(a2);
    const d='M '+x1i+' '+y1i+' L '+x1o+' '+y1o+' A '+rOut+' '+rOut+' 0 0 1 '+x2o+' '+y2o+' L '+x2i+' '+y2i+' A '+rIn+' '+rIn+' 0 0 0 '+x1i+' '+y1i+' Z';
    svg.appendChild(el('path',{d:d,fill:dir.isRed?'#d90000':'#ffffff',stroke:'#333','stroke-width':1.5}));
    const tr=330, tx=CX+tr*Math.sin(dir.angle*Math.PI/180), ty=CY-tr*Math.cos(dir.angle*Math.PI/180);
    const t=el('text',{x:tx,y:ty,'text-anchor':'middle','dominant-baseline':'central',transform:'rotate('+dir.angle+','+tx+','+ty+')','font-family':'Arial,sans-serif','font-size':'36','font-weight':'700',fill:dir.isRed?'#fff':'#000'});
    t.textContent=dir.name; svg.appendChild(t);
  });
  const bagua=[{name:'KHẢM',angle:0},{name:'CẤN',angle:45},{name:'CHẤN',angle:90},{name:'TỐN',angle:135},{name:'LY',angle:180},{name:'KHÔN',angle:225},{name:'ĐOÀI',angle:270},{name:'CÀN',angle:315}];
  bagua.forEach(function(b){
    const tr=215, tx=CX+tr*Math.sin(b.angle*Math.PI/180), ty=CY-tr*Math.cos(b.angle*Math.PI/180);
    const t=el('text',{x:tx,y:ty,'text-anchor':'middle','dominant-baseline':'central',transform:'rotate('+b.angle+','+tx+','+ty+')','font-family':'Arial,sans-serif','font-size':'32','font-weight':'700',fill:'#0033cc'});
    t.textContent=b.name; svg.appendChild(t);
  });
  function arcPath(r,aStart,aEnd){ const a1=aStart*Math.PI/180,a2=aEnd*Math.PI/180; const x1=CX+r*Math.sin(a1),y1=CY-r*Math.cos(a1),x2=CX+r*Math.sin(a2),y2=CY-r*Math.cos(a2); return 'M '+x1+' '+y1+' A '+r+' '+r+' 0 0 1 '+x2+' '+y2; }
  const trigData=[{angle:0,lines:[0,1,0]},{angle:45,lines:[1,1,0]},{angle:90,lines:[0,0,1]},{angle:135,lines:[1,0,0]},{angle:180,lines:[1,0,1]},{angle:225,lines:[0,0,0]},{angle:270,lines:[0,1,1]},{angle:315,lines:[1,1,1]}];
  const rStart=110,rStep=20,arcSpan=28,gap=6;
  const baguaLines=el('g',{fill:'none',stroke:'#a0a0a0','stroke-width':8,'stroke-linecap':'square'});
  trigData.forEach(function(tr){ tr.lines.forEach(function(solid,idx){ const r=rStart+idx*rStep; if(solid===1){ baguaLines.appendChild(el('path',{d:arcPath(r,tr.angle-arcSpan/2,tr.angle+arcSpan/2)})); } else { baguaLines.appendChild(el('path',{d:arcPath(r,tr.angle-arcSpan/2,tr.angle-gap/2)})); baguaLines.appendChild(el('path',{d:arcPath(r,tr.angle+gap/2,tr.angle+arcSpan/2)})); } }); });
  svg.appendChild(baguaLines);
  const yy=el('g',{transform:'rotate(-45,500,500)'}); const rYY=70;
  yy.appendChild(el('path',{d:'M 500 '+(500-rYY)+' A '+rYY+' '+rYY+' 0 0 0 500 '+(500+rYY)+' A '+(rYY/2)+' '+(rYY/2)+' 0 0 1 500 500 A '+(rYY/2)+' '+(rYY/2)+' 0 0 0 500 '+(500-rYY)+' Z',fill:'#126026',stroke:'#000','stroke-width':1.5}));
  yy.appendChild(el('path',{d:'M 500 '+(500-rYY)+' A '+rYY+' '+rYY+' 0 0 1 500 '+(500+rYY)+' A '+(rYY/2)+' '+(rYY/2)+' 0 0 0 500 500 A '+(rYY/2)+' '+(rYY/2)+' 0 0 1 500 '+(500-rYY)+' Z',fill:'#e8f2c4',stroke:'#000','stroke-width':1.5}));
  yy.appendChild(el('circle',{cx:500,cy:500+rYY/2,r:rYY/6,fill:'#126026',stroke:'#000','stroke-width':1.5}));
  yy.appendChild(el('circle',{cx:500,cy:500-rYY/2,r:rYY/6,fill:'#e8f2c4',stroke:'#000','stroke-width':1.5}));
  yy.appendChild(el('circle',{cx:500,cy:500,r:rYY,fill:'none',stroke:'#000','stroke-width':1.5}));
  svg.appendChild(yy);
  return svg;
}
function normalizeDeg(d){ d=Number(d)||0; d=d%360; if(d<0)d+=360; return d; }
function heroDirName(deg){ const names=['Bắc','Đông Bắc','Đông','Đông Nam','Nam','Tây Nam','Tây','Tây Bắc']; return names[Math.round(normalizeDeg(deg)/45)%8]; }
let heroListening=false,heroHandler=null,heroRaf=0,heroPending=null;
function renderHero(raw){
  heroPending=raw; if(heroRaf) return;
  heroRaf=requestAnimationFrame(function(){
    heroRaf=0; if(heroPending===null) return;
    const h=normalizeDeg(heroPending); heroPending=null;
    const d=$('heroCompassDeg'),dir=$('heroCompassDir'),st=$('heroCompassStatus'),dial=$('heroCompassDial');
    if(d) d.textContent=Math.round(h)+'\u00b0';
    if(dir) dir.textContent=heroDirName(h);
    if(st) st.textContent='Hướng từ tính · tham khảo';
    if(dial){ dial.style.transformOrigin='50% 50%'; dial.style.transform='rotate('+(-h)+'deg)'; }
  });
}
function stopHeroCompass(){
  if(heroHandler){ window.removeEventListener('deviceorientationabsolute', heroHandler, true); window.removeEventListener('deviceorientation', heroHandler, true); heroHandler=null; }
  heroListening=false;
  const btn=$('heroCompassStart'); if(btn){ btn.textContent='Bật la bàn'; btn.classList.remove('running'); }
  const st=$('heroCompassStatus'); if(st) st.textContent='Đã tắt · chạm Bật để đo lại';
}
function startHeroCompass(){
  const btn=$('heroCompassStart'), st=$('heroCompassStatus');
  if(!window.DeviceOrientationEvent){ if(st) st.textContent='Trình duyệt không hỗ trợ cảm biến hướng'; return; }
  const onOrient=function(e){ let heading=null; if(typeof e.webkitCompassHeading==='number' && !isNaN(e.webkitCompassHeading)) heading=e.webkitCompassHeading; else if(typeof e.alpha==='number' && e.alpha!==null) heading=normalizeDeg(360-e.alpha); if(heading!==null) renderHero(heading); };
  const bind=function(){ heroHandler=onOrient; window.addEventListener('deviceorientationabsolute', onOrient, true); window.addEventListener('deviceorientation', onOrient, true); heroListening=true; if(btn){ btn.textContent='Tắt la bàn'; btn.classList.add('running'); } if(st) st.textContent='Đang đo · giữ máy nằm ngang'; };
  if(typeof DeviceOrientationEvent.requestPermission==='function'){ DeviceOrientationEvent.requestPermission().then(function(state){ if(state==='granted') bind(); else if(st) st.textContent='Cần cấp quyền cảm biến hướng'; }).catch(function(){ if(st) st.textContent='Không xin được quyền cảm biến'; }); } else { bind(); }
}
function initHeroCompass(){
  const dial=$('heroCompassDial');
  if(dial){ dial.innerHTML=''; dial.appendChild(buildLakinhSVG()); dial.style.transformOrigin='50% 50%'; dial.style.transform='rotate(0deg)'; }
  const btn=$('heroCompassStart'); if(!btn) return;
  btn.addEventListener('click',function(){ if(heroListening) stopHeroCompass(); else startHeroCompass(); });
}
function boot(){ initLayoutDetails(); initProtectChecklist(); initHomeGuideTabs(); initHeroCompass(); }
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
})();
