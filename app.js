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
/* Vietnamese lunar calendar conversion using new moons and solar longitude, UTC+7. */
function jdFromDate(dd,mm,yy){
 const a=Math.floor((14-mm)/12),y=yy+4800-a,m=mm+12*a-3;
 let jd=dd+Math.floor((153*m+2)/5)+365*y+Math.floor(y/4)-Math.floor(y/100)+Math.floor(y/400)-32045;
 if(jd<2299161) jd=dd+Math.floor((153*m+2)/5)+365*y+Math.floor(y/4)-32083;
 return jd;
}
function newMoon(k){
 const T=k/1236.85,T2=T*T,T3=T2*T,dr=Math.PI/180;
 let jd=2415020.75933+29.53058868*k+0.0001178*T2-0.000000155*T3;
 jd+=0.00033*Math.sin((166.56+132.87*T-0.009173*T2)*dr);
 const M=359.2242+29.10535608*k-0.0000333*T2-0.00000347*T3;
 const Mp=306.0253+385.81691806*k+0.0107306*T2+0.00001236*T3;
 const F=21.2964+390.67050646*k-0.0016528*T2-0.00000239*T3;
 let C=(0.1734-0.000393*T)*Math.sin(M*dr)+0.0021*Math.sin(2*M*dr);
 C-=0.4068*Math.sin(Mp*dr)+0.0161*Math.sin(2*Mp*dr)+0.0004*Math.sin(3*Mp*dr);
 C+=0.0104*Math.sin(2*F*dr)-0.0051*Math.sin((M+Mp)*dr)-0.0074*Math.sin((M-Mp)*dr);
 C+=0.0004*Math.sin((2*F+M)*dr)-0.0004*Math.sin((2*F-M)*dr)-0.0006*Math.sin((2*F+Mp)*dr)+0.0010*Math.sin((2*F-Mp)*dr)+0.0005*Math.sin((2*Mp+M)*dr);
 const deltaT=T < -11 ? 0.001+0.000839*T+0.0002261*T2-0.00000845*T3-0.000000081*T*T3 : -0.000278+0.000265*T+0.000262*T2;
 return jd+C-deltaT;
}
function getNewMoonDay(k,tz){return Math.floor(newMoon(k)+0.5+tz/24);}
function sunLongitude(jdn){
 const T=(jdn-2451545.0)/36525,T2=T*T,dr=Math.PI/180;
 const M=357.52910+35999.05030*T-0.0001559*T2-0.00000048*T*T2;
 const L0=280.46645+36000.76983*T+0.0003032*T2;
 let DL=(1.914600-0.004817*T-0.000014*T2)*Math.sin(dr*M);
 DL+=(0.019993-0.000101*T)*Math.sin(2*dr*M)+0.000290*Math.sin(3*dr*M);
 let L=(L0+DL)*dr;L-=Math.PI*2*Math.floor(L/(Math.PI*2));
 return Math.floor(L/Math.PI*6);
}
function getSunLongitude(dayNumber,tz){return sunLongitude(dayNumber-0.5-tz/24);}
function getLunarMonth11(yy,tz){
 const off=jdFromDate(31,12,yy)-2415021,k=Math.floor(off/29.530588853);
 let nm=getNewMoonDay(k,tz);if(getSunLongitude(nm,tz)>=9)nm=getNewMoonDay(k-1,tz);return nm;
}
function getLeapMonthOffset(a11,tz){
 const k=Math.floor(0.5+(a11-2415021.076998695)/29.530588853);
 let last=0,i=1,arc=getSunLongitude(getNewMoonDay(k+i,tz),tz);
 do{last=arc;i++;arc=getSunLongitude(getNewMoonDay(k+i,tz),tz);}while(arc!==last&&i<14);
 return i-1;
}
function convertSolarToLunar(dd,mm,yy,tz=7){
 if(!Number.isInteger(dd)||!Number.isInteger(mm)||!Number.isInteger(yy)||yy<1900||yy>2099||mm<1||mm>12||dd<1||dd>31)return null;
 const dayNumber=jdFromDate(dd,mm,yy),k=Math.floor((dayNumber-2415021.076998695)/29.530588853);
 let monthStart=getNewMoonDay(k+1,tz);if(monthStart>dayNumber)monthStart=getNewMoonDay(k,tz);
 let a11=getLunarMonth11(yy,tz),b11=a11,lunarYear;
 if(a11>=monthStart){lunarYear=yy;a11=getLunarMonth11(yy-1,tz);}else{lunarYear=yy+1;b11=getLunarMonth11(yy+1,tz);}
 const lunarDay=dayNumber-monthStart+1,diff=Math.floor((monthStart-a11)/29);
 let lunarLeap=0,lunarMonth=diff+11;
 if(b11-a11>365){const leapDiff=getLeapMonthOffset(a11,tz);if(diff>=leapDiff){lunarMonth=diff+10;if(diff===leapDiff)lunarLeap=1;}}
 if(lunarMonth>12)lunarMonth-=12;
 if(lunarMonth>=11&&diff<4)lunarYear--;
 return {day:lunarDay,month:lunarMonth,year:lunarYear,leap:lunarLeap};
}
function renderLunarDate(){
 const value=$('lunarDateInput').value;if(!value){$('lunarDateResult').textContent='Hãy chọn ngày dương lịch';return;}
 const [y,m,d]=value.split('-').map(Number),r=convertSolarToLunar(d,m,y,7);
 if(!r){$('lunarDateResult').textContent='Chỉ hỗ trợ ngày hợp lệ trong giai đoạn 1900–2099';return;}
 $('lunarDateResult').innerHTML='<strong>'+r.day+'/'+r.month+'/'+r.year+(r.leap?' (tháng nhuận)':'')+'</strong><small>Âm lịch Việt Nam · UTC+7</small>';
}

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

const HOME_AUDIT = {
 exit:{title:'Thông thoáng lối đi và lối thoát hiểm',detail:'Dọn vật cản ở cửa, hành lang và lối ra trước tiên; không khóa hoặc che lối thoát.'},
 fire:{title:'Giảm nguy cơ cháy và điện',detail:'Tách vật dễ cháy khỏi bếp, kiểm tra dây/ổ điện hỏng và giữ thiết bị nấu trong tầm quan sát.'},
 slip:{title:'Xử lý nguy cơ trượt, vấp',detail:'Lau khô sàn, cố định thảm/dây điện và bổ sung chống trượt tại khu vực ẩm.'},
 air:{title:'Cải thiện thông gió',detail:'Mở cửa khi điều kiện bên ngoài phù hợp, dùng quạt hút ở bếp/phòng tắm và xử lý nguồn ẩm/mùi.'},
 light:{title:'Bổ sung ánh sáng',detail:'Ưu tiên ánh sáng ban ngày; bổ sung đèn đủ sáng ở cầu thang, lối đi và khu làm việc.'},
 sleep:{title:'Giảm tiếng ồn và ánh sáng khu ngủ',detail:'Dùng rèm phù hợp, đặt nguồn ồn xa giường và tạo lịch nghỉ ổn định.'},
 clutter:{title:'Giảm đồ đạc gây cản trở',detail:'Chia đồ theo nhóm, giữ mặt bàn/lối đi thông thoáng và cất đồ vệ sinh dễ tiếp cận.'},
 privacy:{title:'Tăng sự riêng tư',detail:'Cân nhắc rèm/vách nhẹ hoặc đổi góc nhìn; không làm hẹp lối đi hay cản cửa thoát hiểm.'}
};
function runHomeAudit(){
 const selected=Array.from(document.querySelectorAll('#homeAuditOptions input:checked')).map(el=>el.value);
 const out=$('homeAuditResult');
 if(!selected.length){out.innerHTML='<p>Chưa chọn vấn đề nào. Đánh dấu những điểm anh muốn cải thiện rồi phân tích lại.</p>';return;}
 const priority=['exit','fire','slip','air','light','sleep','clutter','privacy'];
 const list=selected.sort((a,b)=>priority.indexOf(a)-priority.indexOf(b)).map((key,i)=>'<li><strong>'+(i+1)+'. '+HOME_AUDIT[key].title+'</strong><p>'+HOME_AUDIT[key].detail+'</p></li>').join('');
 out.innerHTML='<p><strong>Đã ghi nhận '+selected.length+' nhóm vấn đề.</strong> Nên xử lý theo thứ tự ưu tiên dưới đây:</p><ol>'+list+'</ol><p class="field-hint">Đây là gợi ý thực hành dựa trên các lựa chọn của anh, không phải đánh giá kết cấu hay kết luận phong thủy tuyệt đối.</p>';
}
\nfunction renderRoom(){const data=ROOM[$('roomType').value];$('roomGuidance').innerHTML='<ul class="checklist">'+data[1].map(x=>'<li><span>✓</span>'+x+'</li>').join('')+'</ul>';}
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
 $('roomType').addEventListener('change',renderRoom);renderRoom();$('runHomeAudit').addEventListener('click',runHomeAudit);
 $('convertLunarDate').addEventListener('click',renderLunarDate);$('lunarDateInput').addEventListener('change',renderLunarDate);renderLunarDate();
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
