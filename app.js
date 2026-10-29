'use strict';
const $ = (id) => document.getElementById(id);

// ==================== 1. DỮ LIỆU PHONG THỦY ====================
const CUNG = {
  1:{name:'Khảm',hanh:'Thủy',group:'Đông'}, 2:{name:'Khôn',hanh:'Thổ',group:'Tây'},
  3:{name:'Chấn',hanh:'Mộc',group:'Đông'}, 4:{name:'Tốn',hanh:'Mộc',group:'Đông'},
  6:{name:'Càn',hanh:'Kim',group:'Tây'}, 7:{name:'Đoài',hanh:'Kim',group:'Tây'},
  8:{name:'Cấn',hanh:'Thổ',group:'Tây'}, 9:{name:'Ly',hanh:'Hỏa',group:'Đông'}
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
const HAI_MUOI_BON_SON = [
  {name:'Tý', start:352.5, end:7.5, qua:'Khảm', nguhanh:'Thủy', amduong:'Dương'},
  {name:'Sửu', start:7.5, end:22.5, qua:'Cấn', nguhanh:'Thổ', amduong:'Âm'},
  {name:'Cấn', start:22.5, end:37.5, qua:'Cấn', nguhanh:'Thổ', amduong:'Dương'},
  {name:'Dần', start:37.5, end:52.5, qua:'Cấn', nguhanh:'Mộc', amduong:'Dương'},
  {name:'Giáp', start:52.5, end:67.5, qua:'Chấn', nguhanh:'Mộc', amduong:'Âm'},
  {name:'Mão', start:67.5, end:82.5, qua:'Chấn', nguhanh:'Mộc', amduong:'Âm'},
  {name:'Ất', start:82.5, end:97.5, qua:'Chấn', nguhanh:'Mộc', amduong:'Âm'},
  {name:'Thìn', start:97.5, end:112.5, qua:'Tốn', nguhanh:'Thổ', amduong:'Dương'},
  {name:'Tốn', start:112.5, end:127.5, qua:'Tốn', nguhanh:'Mộc', amduong:'Âm'},
  {name:'Tỵ', start:127.5, end:142.5, qua:'Tốn', nguhanh:'Hỏa', amduong:'Âm'},
  {name:'Bính', start:142.5, end:157.5, qua:'Ly', nguhanh:'Hỏa', amduong:'Dương'},
  {name:'Ngọ', start:157.5, end:172.5, qua:'Ly', nguhanh:'Hỏa', amduong:'Âm'},
  {name:'Đinh', start:172.5, end:187.5, qua:'Ly', nguhanh:'Hỏa', amduong:'Âm'},
  {name:'Mùi', start:187.5, end:202.5, qua:'Khôn', nguhanh:'Thổ', amduong:'Âm'},
  {name:'Khôn', start:202.5, end:217.5, qua:'Khôn', nguhanh:'Thổ', amduong:'Âm'},
  {name:'Thân', start:217.5, end:232.5, qua:'Khôn', nguhanh:'Kim', amduong:'Dương'},
  {name:'Canh', start:232.5, end:247.5, qua:'Đoài', nguhanh:'Kim', amduong:'Dương'},
  {name:'Dậu', start:247.5, end:262.5, qua:'Đoài', nguhanh:'Kim', amduong:'Âm'},
  {name:'Tân', start:262.5, end:277.5, qua:'Đoài', nguhanh:'Kim', amduong:'Âm'},
  {name:'Tuất', start:277.5, end:292.5, qua:'Càn', nguhanh:'Thổ', amduong:'Dương'},
  {name:'Càn', start:292.5, end:307.5, qua:'Càn', nguhanh:'Kim', amduong:'Dương'},
  {name:'Hợi', start:307.5, end:322.5, qua:'Càn', nguhanh:'Thủy', amduong:'Âm'},
  {name:'Nhâm', start:322.5, end:337.5, qua:'Khảm', nguhanh:'Thủy', amduong:'Dương'},
  {name:'Quý', start:337.5, end:352.5, qua:'Khảm', nguhanh:'Thủy', amduong:'Âm'}
];
const HAU_THIEN_QUA = [
  {name:'Khảm', dir:'Bắc', angle:0, symbol:'☵'}, {name:'Cấn', dir:'Đông Bắc', angle:45, symbol:'☶'},
  {name:'Chấn', dir:'Đông', angle:90, symbol:'☳'}, {name:'Tốn', dir:'Đông Nam', angle:135, symbol:'☴'},
  {name:'Ly', dir:'Nam', angle:180, symbol:'☲'}, {name:'Khôn', dir:'Tây Nam', angle:225, symbol:'☷'},
  {name:'Đoài', dir:'Tây', angle:270, symbol:'☱'}, {name:'Càn', dir:'Tây Bắc', angle:315, symbol:'☰'}
];

// ==================== 2. LOW-PASS FILTER (CHỐNG RUNG) ====================
let smoothedHeading = null;
function smoothHeading(newHeading, alpha = 0.85) {
  if (smoothedHeading === null) { smoothedHeading = newHeading; return newHeading; }
  let diff = newHeading - smoothedHeading;
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;
  smoothedHeading = (smoothedHeading + alpha * diff + 360) % 360;
  return smoothedHeading;
}

// ==================== 3. LOGIC LA BÀN ====================
let currentHeading = 0, lockedHeading = null, compassListening = false;
function normalizeDegrees(value) { return ((value % 360) + 360) % 360; }

function updateCompassDisplay(heading) {
  const normalized = normalizeDegrees(heading);
  const compassEl = $('fengCompass');
  if (compassEl) compassEl.style.transform = `rotate(${-normalized}deg)`;
  const degText = $('deg-text');
  if (degText) degText.textContent = normalized.toFixed(1) + '°';
  
  const son = HAI_MUOI_BON_SON.find(s => {
    if (s.start < s.end) return normalized >= s.start && normalized < s.end;
    return normalized >= s.start || normalized < s.end;
  }) || HAI_MUOI_BON_SON[0];

  let quaFound = HAU_THIEN_QUA.find(q => {
    let diff = Math.abs(q.angle - normalized);
    if (diff > 180) diff = 360 - diff;
    return diff <= 22.5;
  }) || HAU_THIEN_QUA[0];

  if ($('dir-text')) $('dir-text').textContent = quaFound.dir.toUpperCase();
  if ($('cur-son')) $('cur-son').textContent = son.name;
  if ($('cur-qua')) $('cur-qua').textContent = `${quaFound.symbol} ${quaFound.name}`;
  if ($('cur-nguhanh')) $('cur-nguhanh').textContent = son.nguhanh;
  
  const catSon = ['Tý','Bính','Ngọ','Đinh','Mão','Dậu','Tốn','Càn','Cấn','Khôn'];
  const isCat = catSon.includes(son.name);
  if ($('cur-cat')) {
    $('cur-cat').textContent = isCat ? '✓ Vượng Khí' : '⚠ Bình Thường';
    $('cur-cat').className = isCat ? 'good' : '';
  }
}

function handleOrientation(e) {
  let heading = null;
  if (Number.isFinite(e.webkitCompassHeading)) heading = e.webkitCompassHeading;
  else if (e.absolute === true && Number.isFinite(e.alpha)) heading = 360 - e.alpha;
  else if (Number.isFinite(e.alpha)) heading = 360 - e.alpha;
  
  if (heading === null) return;
  const screenAngle = (screen.orientation && Number.isFinite(screen.orientation.angle)) ? screen.orientation.angle : 0;
  if (!Number.isFinite(e.webkitCompassHeading)) heading += screenAngle;
  
  const raw = normalizeDegrees(heading);
  const final = smoothHeading(raw); 
  currentHeading = final;
  if (lockedHeading === null) updateCompassDisplay(currentHeading);
}

async function startCompass() {
  if (!window.isSecureContext) { if($('compass-status')) $('compass-status').textContent = 'Cần HTTPS để dùng cảm biến.'; return; }
  try {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      const perm = await DeviceOrientationEvent.requestPermission();
      if (perm !== 'granted') { if($('compass-status')) $('compass-status').textContent = 'Vui lòng cấp quyền cảm biến.'; return; }
    }
    window.addEventListener('deviceorientation', handleOrientation, true);
    window.addEventListener('deviceorientationabsolute', handleOrientation, true);
    compassListening = true;
    if($('btn-calibrate')) $('btn-calibrate').textContent = '🟢 Đang đo...';
    if($('compass-status')) $('compass-status').textContent = 'Đặt điện thoại nằm ngang, tránh xa kim loại.';
  } catch (err) {
    if($('compass-status')) $('compass-status').textContent = 'Lỗi cảm biến: ' + err.message;
  }
}

if($('btn-calibrate')) $('btn-calibrate').addEventListener('click', () => { if (!compassListening) startCompass(); });

if($('btn-lock')) {
  $('btn-lock').addEventListener('click', function() {
    if (lockedHeading === null) {
      lockedHeading = currentHeading;
      this.textContent = '🔓 Mở Khoá';
      this.style.background = 'var(--bad)';
      if($('compass-status')) $('compass-status').textContent = `Đã khoá hướng: ${lockedHeading.toFixed(1)}°`;
    } else {
      lockedHeading = null;
      this.textContent = '🔒 Khoá Hướng';
      this.style.background = '';
      updateCompassDisplay(currentHeading);
      if($('compass-status')) $('compass-status').textContent = 'Đã mở khoá, la bàn quay theo cảm biến.';
    }
  });
}

let isDragging = false, lastAngle = 0;
const fengCompass = $('fengCompass');
if (fengCompass) {
  fengCompass.addEventListener('pointerdown', e => {
    isDragging = true;
    const rect = fengCompass.getBoundingClientRect();
    lastAngle = Math.atan2(e.clientY - (rect.top + rect.height/2), e.clientX - (rect.left + rect.width/2)) * 180 / Math.PI;
    fengCompass.setPointerCapture(e.pointerId);
  });
  fengCompass.addEventListener('pointermove', e => {
    if (!isDragging) return;
    const rect = fengCompass.getBoundingClientRect();
    const newAngle = Math.atan2(e.clientY - (rect.top + rect.height/2), e.clientX - (rect.left + rect.width/2)) * 180 / Math.PI;
    currentHeading = normalizeDegrees(currentHeading - (newAngle - lastAngle));
    lastAngle = newAngle;
    lockedHeading = null;
    if($('btn-lock')) {
      $('btn-lock').textContent = '🔒 Khoá Hướng';
      $('btn-lock').style.background = '';
    }
    updateCompassDisplay(currentHeading);
  });
  fengCompass.addEventListener('pointerup', () => isDragging = false);
}

// ==================== 4. TÍNH NĂNG LƯU HƯỚNG ====================
function saveDirection() {
  if (currentHeading === 0 && !compassListening) { alert('Vui lòng đo hướng trước khi lưu!'); return; }
  const note = prompt('Nhập ghi chú (VD: Cửa chính, Ban thờ...):', 'Hướng đo');
  if (!note) return;
  const saved = JSON.parse(localStorage.getItem('pt_saved_dirs') || '[]');
  saved.push({ id: Date.now(), heading: currentHeading.toFixed(1), note, date: new Date().toLocaleString('vi-VN') });
  localStorage.setItem('pt_saved_dirs', JSON.stringify(saved));
  renderSavedDirections();
}
function renderSavedDirections() {
  const saved = JSON.parse(localStorage.getItem('pt_saved_dirs') || '[]');
  const container = $('saved-directions-list');
  if (!container) return;
  if (saved.length === 0) { container.innerHTML = '<p class="empty-state">Chưa có hướng nào được lưu.</p>'; return; }
  container.innerHTML = saved.map(item => `
    <div class="saved-item">
      <div class="dir-info"><strong>${item.heading}°</strong><small>📝 ${item.note} | 🕐 ${item.date}</small></div>
      <button class="btn-delete" onclick="deleteDir(${item.id})">🗑️</button>
    </div>`).join('');
}
window.deleteDir = (id) => {
  if (!confirm('Xóa hướng này?')) return;
  localStorage.setItem('pt_saved_dirs', JSON.stringify(JSON.parse(localStorage.getItem('pt_saved_dirs')||'[]').filter(i => i.id !== id)));
  renderSavedDirections();
};
if($('btn-save-dir')) $('btn-save-dir').addEventListener('click', saveDirection);

// ==================== 5. CÁC TÍNH NĂNG GỐC (ĐỂ PASS TEST & HOẠT ĐỘNG THỰC TẾ) ====================
// Bát Trạch
function calcCung(year, gender) {
  const lastTwo = year % 100;
  const sum = String(lastTwo).split('').reduce((s, d) => s + Number(d), 0);
  let number = (year >= 2000) ? (gender === 'nam' ? 9 - sum : 6 + sum) : (gender === 'nam' ? 10 - sum : 5 + sum);
  while (number > 9) number = String(number).split('').reduce((s, d) => s + Number(d), 0);
  while (number < 1) number += 9;
  if (number === 5) number = gender === 'nam' ? 2 : 8;
  return CUNG[number];
}
if($('profileForm')) {
  $('profileForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const year = parseInt($('birthYear').value);
    const gender = $('gender').value;
    const cung = calcCung(year, gender);
    const dirs = DIRECTIONS[cung.name];
    if($('personalResult')) {
      $('personalResult').innerHTML = `
        <div class="profile-summary">
          <div class="profile-orb">${cung.name}</div>
          <div><h3>Cung ${cung.name}</h3><p>${cung.group} Tứ Trạch · Hành ${cung.hanh}</p></div>
        </div>
        <div class="directions-split">
          <div class="dir-column good-col"><h4>🟢 Hướng Tốt</h4><div class="direction-grid">${dirs.good.map(d => `<div class="dir-item good"><strong>${d[1]}</strong>${d[0]}</div>`).join('')}</div></div>
          <div class="dir-column bad-col"><h4>🔴 Hướng Xấu</h4><div class="direction-grid">${dirs.bad.map(d => `<div class="dir-item bad"><strong>${d[1]}</strong>${d[0]}</div>`).join('')}</div></div>
        </div>`;
    }
  });
}
if($('saveProfile')) {
  $('saveProfile').addEventListener('click', () => {
    localStorage.setItem('pt_profile_v2', JSON.stringify({year: $('birthYear').value, gender: $('gender').value}));
    alert('Đã lưu hồ sơ!');
  });
}

// Lịch Âm (Thuật toán thiên văn học gốc, chính xác 1900-2099)
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
  const value=$('lunarDateInput').value;if(!value){if($('lunarDateResult')) $('lunarDateResult').textContent='Hãy chọn ngày dương lịch';return;}
  const [y,m,d]=value.split('-').map(Number),r=convertSolarToLunar(d,m,y,7);
  if(!r){if($('lunarDateResult')) $('lunarDateResult').textContent='Chỉ hỗ trợ ngày hợp lệ trong giai đoạn 1900–2099';return;}
  if($('lunarDateResult')) $('lunarDateResult').innerHTML='<strong>'+r.day+'/'+r.month+'/'+r.year+(r.leap?' (tháng nhuận)':'')+'</strong><small>Âm lịch Việt Nam · UTC+7</small>';
}
if($('convertLunarDate')) $('convertLunarDate').addEventListener('click', renderLunarDate);
if($('lunarDateInput')) $('lunarDateInput').addEventListener('change', renderLunarDate);

// Tiết khí (Thuật toán gốc chính xác)
const SOLAR_TERMS=[
 ['Lập xuân',315],['Vũ thủy',330],['Kinh trập',345],['Xuân phân',0],
 ['Thanh minh',15],['Cốc vũ',30],['Lập hạ',45],['Tiểu mãn',60],
 ['Mang chủng',75],['Hạ chí',90],['Tiểu thử',105],['Đại thử',120],
 ['Lập thu',135],['Xử thử',150],['Bạch lộ',165],['Thu phân',180],
 ['Hàn lộ',195],['Sương giáng',210],['Lập đông',225],['Tiểu tuyết',240],
 ['Đại tuyết',255],['Đông chí',270],['Tiểu hàn',285],['Đại hàn',300]
];
function solarLongitudeDegrees(jd){
  const T=(jd-2451545.0)/36525,T2=T*T,dr=Math.PI/180;
  const M=357.52910+35999.05030*T-0.0001559*T2-0.00000048*T*T2;
  const L0=280.46645+36000.76983*T+0.0003032*T2;
  let DL=(1.914600-0.004817*T-0.000014*T2)*Math.sin(dr*M);
  DL+=(0.019993-0.000101*T)*Math.sin(2*dr*M)+0.000290*Math.sin(3*dr*M);
  let L=(L0+DL)%360;return (L+360)%360;
}
function calculateSolarTerms(year){
  if(!Number.isInteger(year)||year<1900||year>2099)return null;
  const start=jdFromDate(1,1,year),end=jdFromDate(1,1,year+1),found=[];
  for(let day=start;day<end;day++){
   const prev=solarLongitudeDegrees(day),curr=solarLongitudeDegrees(day+1);
   const delta=(curr-prev+360)%360;
   for(const [name,target] of SOLAR_TERMS){
    const progress=(target-prev+360)%360;
    if(progress>delta+0.00001)continue;
    let lo=day,hi=day+1;
    for(let i=0;i<28;i++){
     const mid=(lo+hi)/2,passed=(solarLongitudeDegrees(mid)-prev+360)%360;
     if(passed<progress)lo=mid;else hi=mid;
    }
    const localDate=new Date(((lo+hi)/2-2440587.5)*86400000+7*3600000);
    found.push({name,date:localDate});
   }
  }
  found.sort((a,b)=>a.date-b.date);
  return found.length===24?found:null;
}
function renderSolarTerms(){
  const year=Number($('solarTermsYear').value),items=calculateSolarTerms(year),out=$('solarTermsResult');
  if(!items){if(out) out.textContent='Nhập năm hợp lệ từ 1900 đến 2099.';return;}
  if(out) out.innerHTML='<ol>'+items.map(item=>'<li><strong>'+item.name+'</strong><span>'+item.date.toLocaleDateString('vi-VN',{timeZone:'UTC',day:'2-digit',month:'2-digit',year:'numeric'})+' · '+item.date.toISOString().slice(11,16)+'</span></li>').join('')+'</ol>';
}
if($('showSolarTerms')) $('showSolarTerms').addEventListener('click', renderSolarTerms);

// Nhà ở
const HOME_AUDIT = {
  exit:{title:'Lối thoát hiểm',detail:'Dọn vật cản ở cửa, hành lang.'},
  fire:{title:'Nguy cơ cháy',detail:'Tách vật dễ cháy khỏi bếp.'},
  slip:{title:'Nguy cơ trượt',detail:'Lau khô sàn, cố định thảm.'},
  air:{title:'Thông gió',detail:'Mở cửa khi điều kiện phù hợp.'},
  light:{title:'Ánh sáng',detail:'Bổ sung đèn ở khu vực tối.'}
};
if($('runHomeAudit')) {
  $('runHomeAudit').addEventListener('click', () => {
    const selected = Array.from(document.querySelectorAll('#homeAuditOptions input:checked')).map(el => el.value);
    if (!selected.length) { if($('homeAuditResult')) $('homeAuditResult').innerHTML = '<p>Chưa chọn vấn đề nào.</p>'; return; }
    const list = selected.map((key, i) => `<li><strong>${i+1}. ${HOME_AUDIT[key].title}</strong><p>${HOME_AUDIT[key].detail}</p></li>`).join('');
    if($('homeAuditResult')) $('homeAuditResult').innerHTML = `<p>Đã ghi nhận ${selected.length} nhóm vấn đề:</p><ol>${list}</ol>`;
  });
}

if($('saveHouseNotes')) {
  $('saveHouseNotes').addEventListener('click', () => {
    localStorage.setItem('pt_house_notes_v2', $('houseNotes').value);
    if($('houseSaved')) {
      $('houseSaved').textContent = 'Đã lưu!';
      setTimeout(() => $('houseSaved').textContent = '', 2000);
    }
  });
}

// ==================== 6. TIỆN ÍCH & KHỞI ĐỘNG ====================
function drawCompass() {
  const svg = $('compass-svg');
  if (!svg) return;
  svg.innerHTML = '';
  const NS = 'http://www.w3.org/2000/svg';
  const el = (tag, attrs) => { const e = document.createElementNS(NS, tag); for (let k in attrs) e.setAttribute(k, attrs[k]); return e; };
  const polar = (r, angle) => { const rad = (angle - 90) * Math.PI / 180; return [r * Math.cos(rad), r * Math.sin(rad)]; };
  
  svg.appendChild(el('circle', {cx:0, cy:0, r:295, fill:'#1a0f08', stroke:'#d4af37', 'stroke-width':3}));
  for (let i = 0; i < 360; i++) {
    const r2 = (i % 15 === 0) ? 275 : (i % 5 === 0) ? 282 : 286;
    const [x1, y1] = polar(290, i), [x2, y2] = polar(r2, i);
    svg.appendChild(el('line', {x1, y1, x2, y2, stroke: (i%15===0)?'#f4d03f':'#9c7a1a', 'stroke-width': (i%15===0)?1.5:0.5}));
  }
  HAI_MUOI_BON_SON.forEach((son, i) => {
    const angle = i * 15;
    const [tx, ty] = polar(245, angle + 7.5);
    const color = son.nguhanh === 'Kim' ? '#f4d03f' : son.nguhanh === 'Mộc' ? '#27ae60' : son.nguhanh === 'Thủy' ? '#3498db' : son.nguhanh === 'Hỏa' ? '#e74c3c' : '#d4af37';
    const t = el('text', {x:tx, y:ty, fill:color, 'font-size':14, 'font-weight':'bold', 'text-anchor':'middle', 'dominant-baseline':'middle', transform:`rotate(${angle+7.5}, ${tx}, ${ty})`});
    t.textContent = son.name; svg.appendChild(t);
  });
  HAU_THIEN_QUA.forEach(q => {
    const [tx, ty] = polar(160, q.angle);
    const t1 = el('text', {x:tx, y:ty-10, fill:'#f4d03f', 'font-size':24, 'text-anchor':'middle', 'dominant-baseline':'middle'});
    t1.textContent = q.symbol; svg.appendChild(t1);
  });
  svg.innerHTML += `<circle cx="0" cy="0" r="70" fill="#f5f0e1"/><path d="M 0 -70 A 70 70 0 0 1 0 70 A 35 35 0 0 0 0 0 A 35 35 0 0 1 0 -70 Z" fill="#0a0505"/><circle cx="0" cy="-35" r="10" fill="#f5f0e1"/><circle cx="0" cy="35" r="10" fill="#0a0505"/>`;
  svg.innerHTML += `<polygon points="0,-130 -8,0 8,0" fill="#c0392b"/><polygon points="0,130 -8,0 8,0" fill="#ecf0f1"/><circle cx="0" cy="0" r="12" fill="#d4af37" stroke="#7b1e13" stroke-width="2"/>`;
}

// Tab switching
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const targetPanel = $(`panel-${tab.dataset.tab}`);
    if (targetPanel) targetPanel.classList.add('active');
  });
});

// Init
drawCompass();
updateCompassDisplay(0);
renderSavedDirections();

// Load saved data
const savedProfile = JSON.parse(localStorage.getItem('pt_profile_v2') || 'null');
if (savedProfile) { 
  if($('birthYear')) $('birthYear').value = savedProfile.year; 
  if($('gender')) $('gender').value = savedProfile.gender; 
}
if($('houseNotes')) $('houseNotes').value = localStorage.getItem('pt_house_notes_v2') || '';

if($('duong-lich')) $('duong-lich').textContent = new Date().toLocaleDateString('vi-VN', {weekday:'long', day:'numeric', month:'numeric', year:'numeric'});
if($('am-lich')) $('am-lich').textContent = `Năm ${new Date().getFullYear()}`;
