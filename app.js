/* Phong Thủy Việt — P0–P5 upgrade. No external dependencies. */
'use strict';
const $ = (id) => document.getElementById(id);
const STORE = { profile:'pt_profile_v2', house:'pt_house_notes_v2', events:'pt_events_v2', theme:'pt_theme_v2' };
const CUNG = {
  1:{name:'Khảm',hanh:'Thủy',group:'Đông Tứ Trạch'},
  2:{name:'Khôn',hanh:'Thổ',group:'Tây Tứ Trạch'},
  3:{name:'Chấn',hanh:'Mộc',group:'Đông Tứ Trạch'},
  4:{name:'Tốn',hanh:'Mộc',group:'Đông Tứ Trạch'},
  6:{name:'Càn',hanh:'Kim',group:'Tây Tứ Trạch'},
  7:{name:'Đoài',hanh:'Kim',group:'Tây Tứ Trạch'},
  8:{name:'Cấn',hanh:'Thổ',group:'Tây Tứ Trạch'},
  9:{name:'Ly',hanh:'Hỏa',group:'Đông Tứ Trạch'}
};
const DIRECTIONS = {
 Khảm:{good:[['Sinh Khí','Đông Nam'],['Thiên Y','Đông'],['Diên Niên','Nam'],['Phục Vị','Bắc']],bad:[['Tuyệt Mệnh','Tây Nam'],['Ngũ Quỷ','Đông Bắc'],['Lục Sát','Tây'],['Họa Hại','Tây Bắc']]},
 Chấn:{good:[['Sinh Khí','Nam'],['Thiên Y','Bắc'],['Diên Niên','Đông Nam'],['Phục Vị','Đông']],bad:[['Tuyệt Mệnh','Tây'],['Ngũ Quỷ','Tây Bắc'],['Lục Sát','Tây Nam'],['Họa Hại','Đông Bắc']]},
 Tốn:{good:[['Sinh Khí','Bắc'],['Thiên Y','Nam'],['Diên Niên','Đông'],['Phục Vị','Đông Nam']],bad:[['Tuyệt Mệnh','Đông Bắc'],['Ngũ Quỷ','Tây'],['Lục Sát','Tây Bắc'],['Họa Hại','Tây Nam']]},
 Ly:{good:[['Sinh Khí','Đông'],['Thiên Y','Đông Nam'],['Diên Niên','Bắc'],['Phục Vị','Nam']],bad:[['Tuyệt Mệnh','Tây Bắc'],['Ngũ Quỷ','Tây Nam'],['Lục Sát','Đông Bắc'],['Họa Hại','Tây']]},
 Càn:{good:[['Sinh Khí','Tây'],['Thiên Y','Đông Bắc'],['Diên Niên','Tây Nam'],['Phục Vị','Tây Bắc']],bad:[['Tuyệt Mệnh','Nam'],['Ngũ Quỷ','Đông'],['Lục Sát','Bắc'],['Họa Hại','Đông Nam']]},
 Khôn:{good:[['Sinh Khí','Đông Bắc'],['Thiên Y','Tây'],['Diên Niên','Tây Bắc'],['Phục Vị','Tây Nam']],bad:[['Tuyệt Mệnh','Đông'],['Ngũ Quỷ','Nam'],['Lục Sát','Đông Nam'],['Họa Hại','Bắc']]},
 Cấn:{good:[['Sinh Khí','Tây Nam'],['Thiên Y','Tây Bắc'],['Diên Niên','Tây'],['Phục Vị','Đông Bắc']],bad:[['Tuyệt Mệnh','Đông Nam'],['Ngũ Quỷ','Bắc'],['Lục Sát','Đông'],['Họa Hại','Nam']]},
 Đoài:{good:[['Sinh Khí','Tây Bắc'],['Thiên Y','Tây Nam'],['Diên Niên','Đông Bắc'],['Phục Vị','Tây']],bad:[['Tuyệt Mệnh','Bắc'],['Ngũ Quỷ','Đông Nam'],['Lục Sát','Nam'],['Họa Hại','Đông']]}
};
function safeGet(key,fallback){try{const raw=localStorage.getItem(key);return raw===null?fallback:JSON.parse(raw);}catch{return fallback;}}
function safeSet(key,value){try{localStorage.setItem(key,JSON.stringify(value));return true;}catch{alert('Không lưu được dữ liệu. Hãy kiểm tra dung lượng lưu trữ của trình duyệt.');return false;}}
function digitSum(n){return String(n).split('').reduce((s,d)=>s+Number(d),0);}
function calcCung(year,gender){
  // Common Bát Trạch year-digit method; 2000–2099 has a different offset.
  const lastTwo=year%100;
  const sum=digitSum(lastTwo);
  let number;
  if(year>=2000){number=gender==='nam'?9-sum:6+sum;}
  else {number=gender==='nam'?10-sum:5+sum;}
  while(number>9) number=digitSum(number);
  while(number<1) number+=9;
  if(number===5) number=gender==='nam'?2:8;
  return CUNG[number]||null;
}
function renderPairs(items,kind){return items.map(([name,dir])=>'<div class="direction-item '+kind+'"><span>'+name+'</span><strong>'+dir+'</strong></div>').join('');}
function showProfile(year,gender){
 const c=calcCung(year,gender);if(!c)return;
 const d=DIRECTIONS[c.name];
 $('personalResult').innerHTML='<div class="profile-summary card"><div class="profile-orb">'+c.name+'</div><div><span class="eyebrow">KẾT QUẢ BÁT TRẠCH</span><h3>Cung '+c.name+'</h3><p>'+c.group+' · Hành cung: '+c.hanh+'</p><small>Năm sinh: '+year+' · '+(gender==='nam'?'Nam':'Nữ')+'</small></div></div><div class="card"><div class="list-heading"><h3>Hướng tốt theo bảng tra</h3><span class="pill positive">4 hướng</span></div><div class="direction-grid">'+renderPairs(d.good,'good')+'</div></div><div class="card"><div class="list-heading"><h3>Hướng cần cân nhắc</h3><span class="pill caution">4 hướng</span></div><div class="direction-grid">'+renderPairs(d.bad,'bad')+'</div></div><div class="notice subtle"><span>ⓘ</span><p>Kết quả sử dụng cách tính cung phi Bát Trạch phổ biến theo năm dương lịch và giới tính đã chọn. Nếu sinh gần Tết âm lịch, cần xác minh năm quy đổi theo trường phái bạn theo. “Hành cung” không phải nạp âm năm sinh.</p></div><button class="secondary-button" id="shareResult" type="button">Chia sẻ kết quả</button>';
 $('shareResult').addEventListener('click',()=>shareText('Kết quả Bát Trạch: năm '+year+', cung '+c.name+', '+c.group+'. Hướng tốt: '+d.good.map(x=>x[0]+' '+x[1]).join(', ')+'. Tham khảo tại '+location.href));
}
const ROOM={
 bedroom:['Phòng ngủ',['Ưu tiên lối đi thông thoáng và lối thoát dễ tiếp cận.','Đặt giường vững chắc, tránh chắn cửa hoặc cửa sổ cần mở.','Giảm ánh sáng xanh và tiếng ồn khi ngủ; ưu tiên thông gió.','Hướng giường theo Bát Trạch chỉ là một tiêu chí tham khảo.']],
 desk:['Bàn làm việc',['Đặt ghế chắc chắn, có ánh sáng đủ và hạn chế phản chiếu màn hình.','Nếu thuận tiện, chọn vị trí nhìn được lối vào mà không cản lối đi.','Đặt màn hình ngang tầm mắt, giữ khoảng trống thao tác.','Không hy sinh công thái học chỉ để khớp một hướng phong thủy.']],
 kitchen:['Nhà bếp',['Bảo đảm thông gió và khoảng cách an toàn quanh bếp nóng.','Không đặt vật dễ cháy sát nguồn nhiệt; kiểm tra thiết bị gas/điện.','Giữ lối đi khô, sáng và không bị cản trở.','Các quy tắc “tọa/hướng” khác nhau theo trường phái; kiểm tra hiện trạng trước.']],
 entrance:['Cửa chính / lối vào',['Giữ lối vào sáng, khô, dễ đi lại và không bị chắn.','Dùng thảm chống trượt và bảo đảm cửa mở không va vào người.','Không để đồ che lối thoát hiểm hoặc tủ điện.','Hướng cửa cần đo đúng và phân biệt với hướng mặt nhà.']],
 altar:['Bàn thờ',['Chọn vị trí ổn định, trang nghiêm và ít bị va chạm.','Bảo đảm thông gió, phòng cháy; tránh gần vật liệu dễ cháy.','Bố trí an toàn cho trẻ nhỏ và người cao tuổi.','Tập tục khác nhau theo gia đình, vùng miền và tín ngưỡng.']]
};
function renderRoom(){const data=ROOM[$('roomType').value];$('roomGuidance').innerHTML='<ul class="checklist">'+data[1].map(x=>'<li><span>✓</span>'+x+'</li>').join('')+'</ul>';}
function bearingName(deg){return ['Bắc','Đông Bắc','Đông','Đông Nam','Nam','Tây Nam','Tây','Tây Bắc'][Math.round(deg/45)%8];}
function fmtDate(value){if(!value)return '';const [y,m,d]=value.split('-');return d+'/'+m+'/'+y;}
function renderEvents(){const events=safeGet(STORE.events,[]).sort((a,b)=>a.date.localeCompare(b.date));$('eventList').innerHTML=events.length?events.map((e,i)=>'<article class="event-item"><div class="event-date"><strong>'+e.date.slice(8,10)+'</strong><span>'+e.date.slice(5,7)+'/'+e.date.slice(0,4)+'</span></div><div class="event-content"><strong>'+escapeHtml(e.title)+'</strong>'+(e.note?'<p>'+escapeHtml(e.note)+'</p>':'')+'</div><button class="delete-event" data-index="'+i+'" aria-label="Xóa '+escapeHtml(e.title)+'">×</button></article>').join(''):'<div class="empty-state small"><span>◷</span><p>Chưa có sự kiện. Thêm ngày quan trọng để bắt đầu.</p></div>';}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
async function shareText(text){if(navigator.share){try{await navigator.share({title:'Phong Thủy Việt',text});return;}catch(e){if(e.name==='AbortError')return;}}try{await navigator.clipboard.writeText(text);alert('Đã sao chép nội dung để chia sẻ.');}catch{prompt('Sao chép nội dung này:',text);}}
function goTab(tab){document.querySelectorAll('.tab').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab));document.querySelectorAll('.panel').forEach(p=>p.classList.toggle('active',p.id==='panel-'+tab));window.scrollTo({top:0,behavior:'smooth'});}
document.addEventListener('DOMContentLoaded',()=>{
 document.querySelectorAll('.tab').forEach(b=>b.addEventListener('click',()=>goTab(b.dataset.tab)));
 document.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>goTab(b.dataset.go)));
 $('profileForm').addEventListener('submit',e=>{e.preventDefault();const year=Number($('birthYear').value);if(!Number.isInteger(year)||year<1900||year>2099){alert('Vui lòng nhập năm từ 1900 đến 2099.');return;}showProfile(year,$('gender').value);});
 $('saveProfile').addEventListener('click',()=>{const year=Number($('birthYear').value);if(!Number.isInteger(year)||year<1900||year>2099){alert('Nhập năm sinh hợp lệ trước khi lưu.');return;}if(safeSet(STORE.profile,{year,gender:$('gender').value}))alert('Đã lưu hồ sơ trên thiết bị này.');});
 const profile=safeGet(STORE.profile,null);if(profile){$('birthYear').value=profile.year;$('gender').value=profile.gender;showProfile(profile.year,profile.gender);}
 $('roomType').addEventListener('change',renderRoom);renderRoom();
 const notes=safeGet(STORE.house,'');$('houseNotes').value=notes;
 $('saveHouseNotes').addEventListener('click',()=>{if(safeSet(STORE.house,$('houseNotes').value))$('houseSaved').textContent='Đã lưu trên thiết bị này.';});
 $('convertBearing').addEventListener('click',()=>{const n=Number($('bearing').value);if($('bearing').value.trim()===''||!Number.isFinite(n)||n<0||n>359){$('bearingResult').textContent='Nhập góc từ 0 đến 359°';return;}$('bearingResult').innerHTML='<strong>'+bearingName(n)+' <span>· '+n+'°</span></strong><small>Quy đổi 8 phương, độ chính xác phụ thuộc thiết bị.</small>';});
 $('eventForm').addEventListener('submit',e=>{e.preventDefault();const events=safeGet(STORE.events,[]);events.push({title:$('eventTitle').value.trim(),date:$('eventDate').value,note:$('eventNote').value.trim(),id:Date.now()});if(safeSet(STORE.events,events)){e.target.reset();renderEvents();}});
 $('eventList').addEventListener('click',e=>{const b=e.target.closest('[data-index]');if(!b)return;const events=safeGet(STORE.events,[]).sort((a,b)=>a.date.localeCompare(b.date));events.splice(Number(b.dataset.index),1);safeSet(STORE.events,events);renderEvents();});
 $('clearEvents').addEventListener('click',()=>{if(confirm('Xóa toàn bộ sự kiện đã lưu trên thiết bị này?')){safeSet(STORE.events,[]);renderEvents();}});renderEvents();
 $('themeToggle').addEventListener('click',()=>{const dark=document.documentElement.dataset.theme!=='dark';document.documentElement.dataset.theme=dark?'dark':'light';safeSet(STORE.theme,dark?'dark':'light');});
 const theme=safeGet(STORE.theme,'light');document.documentElement.dataset.theme=theme;
 $('shareApp').addEventListener('click',async()=>{await shareText(location.href);$('shareStatus').textContent='Nếu hộp chia sẻ không mở, liên kết đã được sao chép hoặc hiển thị để sao chép.';});
});
