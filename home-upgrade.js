/* Nâng cấp Nhà ở + La Kinh hero (xoay mặt, kim cố định) 2026-10-29 */
(function(){
'use strict';
const $ = (id) => document.getElementById(id);
const ROOM_DETAILS = {
  bedroom:{title:'Phòng ngủ',lead:'Ưu tiên ngủ ngon và thoát hiểm trước; hướng giường theo Bát Trạch chỉ là tham khảo.',should:['Giường vững, không chắn cửa hoặc cửa sổ cần mở khẩn cấp.','Lối ra giường → cửa thông thoáng, không để đồ dễ vấp.','Ánh sáng dịu, giảm tiếng ồn và ánh sáng xanh trước khi ngủ.','Thông gió nhẹ, tránh gió lùa mạnh thẳng vào đầu giường.'],avoid:['Đặt tủ nặng thiếu neo phía trên hoặc sát giường dễ đổ.','Chặn cửa bằng đồ đạc hoặc khóa trái khó mở từ trong.','Hy sinh công năng chỉ để khớp một hướng “đẹp” trên giấy.']},
  desk:{title:'Bàn làm việc / học tập',lead:'Công thái học và ánh sáng quyết định hiệu quả hơn việc xoay bàn theo hướng.',should:['Màn hình ngang tầm mắt, ghế chắc, chân đặt phẳng.','Đủ sáng tự nhiên hoặc đèn bàn; hạn chế chói phản chiếu.','Nếu thuận, ngồi nhìn được lối vào mà không quay lưng sát cửa.','Giữ khoảng trống thao tác, dây điện gọn.'],avoid:['Ngồi lâu với tư thế xấu chỉ vì “hợp hướng”.','Đặt bàn giữa lối đi hoặc chắn cửa.','Màn hình đối diện cửa sổ gây chói cả ngày.']},
  kitchen:{title:'Nhà bếp',lead:'An toàn cháy và vệ sinh lên trước các quy tắc “tọa hướng”.',should:['Tách vùng bếp nóng khỏi vật dễ cháy; thông gió/hút mùi tốt.','Lối đi khô, sáng; thiết bị gas/điện được kiểm tra định kỳ.','Bồn rửa và bếp có khoảng cách hợp lý để thao tác.'],avoid:['Chất đống đồ dễ cháy sát bếp.','Chặn lối thoát bằng tủ lạnh / thùng carton.','Sửa ống gas/điện không đúng kỹ thuật.']},
  entrance:{title:'Cửa chính / lối vào',lead:'Lối vào là điểm an toàn và đón khách; đo hướng đúng vị trí rồi mới bàn phong thủy.',should:['Lối vào sáng, khô, không bị chắn; cửa mở không va người.','Thảm chống trượt; không để đồ che tủ điện hay lối thoát.','Đo hướng ở vị trí phù hợp, ghi rõ đang đo gì.','Khóa cửa hoạt động tốt, dễ mở từ trong khi khẩn cấp.'],avoid:['Chất đồ ngay cửa làm hẹp lối đi.','Nhầm hướng cửa với hướng giường/bàn.','Khóa trái phức tạp khiến thoát hiểm chậm.']},
  living:{title:'Phòng khách',lead:'Không gian giao tiếp: ổn định chỗ ngồi, lối đi và ánh sáng trước.',should:['Chỗ ngồi vững, có điểm tựa; lối đi từ cửa vào các phòng rõ.','Ánh sáng và thông gió đủ; cố định TV/tủ cao nếu có trẻ nhỏ.','Sắp xếp thuận giao tiếp, không bắt mọi ghế “đúng hướng” cứng nhắc.'],avoid:['Dây điện / đồ dễ đổ giữa lối đi.','Tủ kính hoặc đồ nặng thiếu neo.','Chặn lối sang bếp hoặc phòng ngủ.']},
  bathroom:{title:'Nhà vệ sinh / phòng tắm',lead:'Chống ẩm, chống trượt và thông gió là ưu tiên số một.',should:['Sàn chống trượt; thoát nước tốt; hút ẩm / mở cửa sổ khi được.','Sửa rò rỉ; thiết bị điện phù hợp vùng ẩm.','Cửa và lối tiếp cận dễ, vẫn đảm bảo riêng tư.'],avoid:['Điện nước lộ thiên, ổ cắm ướt.','Để đồ trơn dưới chân.','Đập phá di chuyển phòng chỉ vì quan niệm phong thủy.']}
};
function openRoomDetail(roomKey){
  const data = ROOM_DETAILS[roomKey]; if(!data) return;
  const modal = $('roomDetailModal'); const body = $('roomModalBody');
  if(!modal||!body) return;
  body.innerHTML = '<h3 id="roomModalTitle">'+data.title+'</h3><p class="room-modal-lead">'+data.lead+'</p><div class="room-check-grid"><div class="room-check-block"><h4>✓ Nên làm</h4><ul>'+data.should.map(x=>'<li>'+x+'</li>').join('')+'</ul></div><div class="room-check-block avoid"><h4>✕ Nên tránh</h4><ul>'+data.avoid.map(x=>'<li>'+x+'</li>').join('')+'</ul></div></div><p class="room-modal-note">Gợi ý mang tính tham khảo. Ưu tiên an toàn và công năng hơn việc sắp xếp chỉ để khớp bảng tra.</p>';
  modal.hidden = false; document.body.style.overflow = 'hidden';
}
function closeRoomDetail(){ const modal=$('roomDetailModal'); if(modal) modal.hidden=true; document.body.style.overflow=''; }
const PROTECT_STORE='pt_protect_checklist_v1';
function safeGet(k,f){try{const r=localStorage.getItem(k);return r===null?f:JSON.parse(r);}catch{return f;}}
function safeSet(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch{}}
function renderProtectProgress(){
  const box=$('protectChecklist'); const out=$('protectProgress');
  if(!box||!out) return;
  const inputs=box.querySelectorAll('input[data-protect]');
  const done=Array.from(inputs).filter(i=>i.checked).length;
  out.textContent='Đã hoàn thành '+done+'/'+inputs.length+' mục';
  out.style.background = done===inputs.length ? '#c8e6c9' : '#e8f5e9';
}
function initProtectChecklist(){
  const box=$('protectChecklist'); if(!box) return;
  const saved=safeGet(PROTECT_STORE,{});
  box.querySelectorAll('input[data-protect]').forEach(input=>{
    input.checked=!!saved[input.dataset.protect];
    input.addEventListener('change',()=>{ const s=safeGet(PROTECT_STORE,{}); s[input.dataset.protect]=input.checked; safeSet(PROTECT_STORE,s); renderProtectProgress(); });
  });
  renderProtectProgress();
}
function initLayoutDetails(){
  document.querySelectorAll('.home-diagram.interactive[data-room]').forEach(btn=>btn.addEventListener('click',()=>openRoomDetail(btn.dataset.room)));
  document.querySelectorAll('[data-close-modal]').forEach(el=>el.addEventListener('click',closeRoomDetail));
  document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeRoomDetail(); });
}

const HERO_DIRS=['Bắc','Đông Bắc','Đông','Đông Nam','Nam','Tây Nam','Tây','Tây Bắc'];
function heroDirName(deg){return HERO_DIRS[Math.round((((deg%360)+360)%360)/45)%8];}
function normalizeDeg(v){return ((v%360)+360)%360;}
let heroListening=false,heroHandler=null,heroRaf=0,heroPending=null,heroLast=-999;

function renderHero(raw){
  heroPending=raw;
  if(heroRaf) return;
  heroRaf=requestAnimationFrame(function(){
    heroRaf=0;
    if(heroPending===null) return;
    const h=normalizeDeg(heroPending); heroPending=null;
    const d=$('heroCompassDeg'),dir=$('heroCompassDir'),st=$('heroCompassStatus'),dial=$('heroCompassDial');
    if(d) d.textContent=Math.round(h)+'°';
    if(dir) dir.textContent=heroDirName(h);
    if(st) st.textContent='Hướng từ tính · tham khảo';
    if(dial) dial.style.transform='rotate('+(-h)+'deg)';
    heroLast=h;
  });
}
function stopHeroCompass(){
  if(heroHandler){
    window.removeEventListener('deviceorientationabsolute', heroHandler, true);
    window.removeEventListener('deviceorientation', heroHandler, true);
    heroHandler=null;
  }
  heroListening=false;
  const btn=$('heroCompassStart');
  if(btn){ btn.textContent='Bật la bàn'; btn.classList.remove('running'); }
  const st=$('heroCompassStatus');
  if(st) st.textContent='Đã tắt · chạm Bật để đo lại';
}
function startHeroCompass(){
  const btn=$('heroCompassStart');
  const st=$('heroCompassStatus');
  if(!window.DeviceOrientationEvent){
    if(st) st.textContent='Trình duyệt không hỗ trợ cảm biến hướng';
    return;
  }
  const onOrient=function(e){
    let heading=null;
    if(typeof e.webkitCompassHeading==='number' && !isNaN(e.webkitCompassHeading)){
      heading=e.webkitCompassHeading;
    }else if(typeof e.alpha==='number' && e.alpha!==null){
      heading=normalizeDeg(360-e.alpha);
    }
    if(heading!==null) renderHero(heading);
  };
  const bind=function(){
    heroHandler=onOrient;
    window.addEventListener('deviceorientationabsolute', onOrient, true);
    window.addEventListener('deviceorientation', onOrient, true);
    heroListening=true;
    if(btn){ btn.textContent='Tắt la bàn'; btn.classList.add('running'); }
    if(st) st.textContent='Đang đo · giữ máy nằm ngang';
  };
  if(typeof DeviceOrientationEvent.requestPermission==='function'){
    DeviceOrientationEvent.requestPermission().then(function(state){
      if(state==='granted') bind();
      else if(st) st.textContent='Cần cấp quyền cảm biến hướng';
    }).catch(function(){ if(st) st.textContent='Không xin được quyền cảm biến'; });
  }else{
    bind();
  }
}
function initHeroCompass(){
  const btn=$('heroCompassStart');
  if(!btn) return;
  btn.addEventListener('click',function(){
    if(heroListening) stopHeroCompass(); else startHeroCompass();
  });
}

function boot(){ initLayoutDetails(); initProtectChecklist(); initHeroCompass(); }
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
})();
