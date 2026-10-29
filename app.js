'use strict';
const $ = (id) => document.getElementById(id);

// ==================== DỮ LIỆU PHONG THỦY ====================
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

// ==================== LOW-PASS FILTER (CHỐNG RUNG) ====================
let smoothedHeading = null;
function smoothHeading(newHeading, alpha = 0.85) {
  if (smoothedHeading === null) { smoothedHeading = newHeading; return newHeading; }
  let diff = newHeading - smoothedHeading;
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;
  smoothedHeading = (smoothedHeading + alpha * diff + 360) % 360;
  return smoothedHeading;
}

// ==================== LOGIC LA BÀN ====================
let currentHeading = 0, lockedHeading = null, hasSensor = false, compassListening = false;

function normalizeDegrees(value) { return ((value % 360) + 360) % 360; }

function updateCompassDisplay(heading) {
  const normalized = normalizeDegrees(heading);
  $('fengCompass').style.transform = `rotate(${-normalized}deg)`;
  $('deg-text').textContent = normalized.toFixed(1) + '°';
  
  const son = HAI_MUOI_BON_SON.find(s => {
    if (s.start < s.end) return normalized >= s.start && normalized < s.end;
    return normalized >= s.start || normalized < s.end;
  }) || HAI_MUOI_BON_SON[0];

  let quaFound = HAU_THIEN_QUA.find(q => {
    let diff = Math.abs(q.angle - normalized);
    if (diff > 180) diff = 360 - diff;
    return diff <= 22.5;
  }) || HAU_THIEN_QUA[0];

  $('dir-text').textContent = quaFound.dir.toUpperCase();
  $('cur-son').textContent = son.name;
  $('cur-qua').textContent = `${quaFound.symbol} ${quaFound.name}`;
  $('cur-nguhanh').textContent = son.nguhanh;
  
  const catSon = ['Tý','Bính','Ngọ','Đinh','Mão','Dậu','Tốn','Càn','Cấn','Khôn'];
  const isCat = catSon.includes(son.name);
  $('cur-cat').textContent = isCat ? '✓ Vượng Khí' : '⚠ Bình Thường';
  $('cur-cat').className = isCat ? 'good' : 'bad';
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
  const final = smoothHeading(raw); // Áp dụng bộ lọc mượt
  currentHeading = final;
  if (lockedHeading === null) updateCompassDisplay(currentHeading);
}

async function startCompass() {
  if (!window.isSecureContext) { $('compass-status').textContent = 'Cần HTTPS để dùng cảm biến.'; return; }
  try {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      const perm = await DeviceOrientationEvent.requestPermission();
      if (perm !== 'granted') { $('compass-status').textContent = 'Vui lòng cấp quyền cảm biến.'; return; }
    }
    window.addEventListener('deviceorientation', handleOrientation, true);
    window.addEventListener('deviceorientationabsolute', handleOrientation, true);
    compassListening = true;
    $('btn-calibrate').textContent = '🟢 Đang đo...';
    $('compass-status').textContent = 'Đặt điện thoại nằm ngang, tránh xa kim loại.';
  } catch (err) {
    $('compass-status').textContent = 'Lỗi cảm biến: ' + err.message;
  }
}

$('btn-calibrate').addEventListener('click', () => {
  if (!compassListening) startCompass();
});

$('btn-lock').addEventListener('click', function() {
  if (lockedHeading === null) {
    lockedHeading = currentHeading;
    this.textContent = '🔓 Mở Khoá';
    this.style.background = 'var(--bad)';
    this.style.color = 'white';
    $('compass-status').textContent = `Đã khoá hướng: ${lockedHeading.toFixed(1)}°`;
  } else {
    lockedHeading = null;
    this.textContent = '🔒 Khoá Hướng';
    this.style.background = '';
    this.style.color = '';
    updateCompassDisplay(currentHeading);
    $('compass-status').textContent = 'Đã mở khoá, la bàn quay theo cảm biến.';
  }
});

// Xoay thủ công bằng chuột/cảm ứng
let isDragging = false, lastAngle = 0;
$('fengCompass').addEventListener('pointerdown', e => {
  isDragging = true;
  const rect = $('fengCompass').getBoundingClientRect();
  lastAngle = Math.atan2(e.clientY - (rect.top + rect.height/2), e.clientX - (rect.left + rect.width/2)) * 180 / Math.PI;
  $('fengCompass').setPointerCapture(e.pointerId);
});
$('fengCompass').addEventListener('pointermove', e => {
  if (!isDragging) return;
  const rect = $('fengCompass').getBoundingClientRect();
  const newAngle = Math.atan2(e.clientY - (rect.top + rect.height/2), e.clientX - (rect.left + rect.width/2)) * 180 / Math.PI;
  const delta = newAngle - lastAngle;
  lastAngle = newAngle;
  currentHeading = normalizeDegrees(currentHeading - delta);
  lockedHeading = null; // Mở khoá khi xoay thủ công
  $('btn-lock').textContent = '🔒 Khoá Hướng';
  $('btn-lock').style.background = '';
  updateCompassDisplay(currentHeading);
});
$('fengCompass').addEventListener('pointerup', () => isDragging = false);

// ==================== TÍNH NĂNG LƯU HƯỚNG ====================
function saveDirection() {
  if (currentHeading === 0 && !compassListening) { alert('Vui lòng đo hướng trước khi lưu!'); return; }
  const note = prompt('Nhập ghi chú (VD: Cửa chính, Ban thờ...):', 'Hướng đo');
  if (!note) return;
  
  const saved = JSON.parse(localStorage.getItem('pt_saved_dirs') || '[]');
  saved.push({ id: Date.now(), heading: currentHeading.toFixed(1), note, date: new Date().toLocaleString('vi-VN') });
  localStorage.setItem('pt_saved_dirs', JSON.stringify(saved));
  renderSavedDirections();
  alert('✅ Đã lưu hướng thành công!');
}

function renderSavedDirections() {
  const saved = JSON.parse(localStorage.getItem('pt_saved_dirs') || '[]');
  const container = $('saved-directions-list');
  if (saved.length === 0) { container.innerHTML = '<p class="empty-state" style="text-align:center;color:var(--text-secondary);padding:20px;">Chưa có hướng nào được lưu.</p>'; return; }
  
  container.innerHTML = saved.map(item => `
    <div class="saved-item">
      <div class="dir-info">
        <strong>${item.heading}°</strong>
        <small>📝 ${item.note} | 🕐 ${item.date}</small>
      </div>
      <button class="btn-delete" onclick="deleteDir(${item.id})">🗑️</button>
    </div>
  `).join('');
}

window.deleteDir = (id) => {
  if (!confirm('Xóa hướng này?')) return;
  const saved = JSON.parse(localStorage.getItem('pt_saved_dirs') || '[]').filter(i => i.id !== id);
  localStorage.setItem('pt_saved_dirs', JSON.stringify(saved));
  renderSavedDirections();
};

$('btn-save-dir').addEventListener('click', saveDirection);

// ==================== BÁT TRẠCH ====================
function calcCung(year, gender) {
  const lastTwo = year % 100;
  const sum = String(lastTwo).split('').reduce((s, d) => s + Number(d), 0);
  let number = (year >= 2000) ? (gender === 'nam' ? 9 - sum : 6 + sum) : (gender === 'nam' ? 10 - sum : 5 + sum);
  while (number > 9) number = String(number).split('').reduce((s, d) => s + Number(d), 0);
  while (number < 1) number += 9;
  if (number === 5) number = gender === 'nam' ? 2 : 8;
  return CUNG[number];
}

$('btn-calc-bat-trach').addEventListener('click', () => {
  const year = parseInt($('birth-year').value);
  const gender = $('gender').value;
  if (year < 1900 || year > 2099) { alert('Năm sinh không hợp lệ!'); return; }
  
  const cung = calcCung(year, gender);
  const dirs = DIRECTIONS[cung.name];
  
  $('cung-menh-orb').textContent = cung.name;
  $('cung-menh-text').textContent = `Cung ${cung.name}`;
  $('cung-menh-detail').textContent = `${cung.group} Tứ Trạch · Hành ${cung.hanh}`;
  
  $('good-dirs').innerHTML = dirs.good.map(d => `<div class="dir-item good"><strong>${d[1]}</strong>${d[0]}</div>`).join('');
  $('bad-dirs').innerHTML = dirs.bad.map(d => `<div class="dir-item bad"><strong>${d[1]}</strong>${d[0]}</div>`).join('');
  
  $('bat-trach-result').style.display = 'block';
});

// ==================== VẼ SVG LA BÀN ====================
function drawCompass() {
  const svg = $('compass-svg');
  svg.innerHTML = '';
  const NS = 'http://www.w3.org/2000/svg';
  const el = (tag, attrs) => { const e = document.createElementNS(NS, tag); for (let k in attrs) e.setAttribute(k, attrs[k]); return e; };
  const polar = (r, angle) => { const rad = (angle - 90) * Math.PI / 180; return [r * Math.cos(rad), r * Math.sin(rad)]; };
  
  // Nền
  svg.appendChild(el('circle', {cx:0, cy:0, r:295, fill:'#1a0f08', stroke:'#d4af37', 'stroke-width':3}));
  
  // Vòng 360 độ
  for (let i = 0; i < 360; i++) {
    const r2 = (i % 15 === 0) ? 275 : (i % 5 === 0) ? 282 : 286;
    const [x1, y1] = polar(290, i), [x2, y2] = polar(r2, i);
    svg.appendChild(el('line', {x1, y1, x2, y2, stroke: (i%15===0)?'#f4d03f':'#9c7a1a', 'stroke-width': (i%15===0)?1.5:0.5}));
    if (i % 30 === 0) {
      const [tx, ty] = polar(265, i);
      const t = el('text', {x:tx, y:ty, fill:'#f4d03f', 'font-size':10, 'text-anchor':'middle', 'dominant-baseline':'middle', transform:`rotate(${i}, ${tx}, ${ty})`});
      t.textContent = i + '°'; svg.appendChild(t);
    }
  }
  
  // Vòng 24 Sơn
  HAI_MUOI_BON_SON.forEach((son, i) => {
    const angle = i * 15;
    const [x1, y1] = polar(230, angle), [x2, y2] = polar(260, angle);
    svg.appendChild(el('line', {x1, y1, x2, y2, stroke:'#9c7a1a', 'stroke-width':0.5}));
    const [tx, ty] = polar(245, angle + 7.5);
    const color = son.nguhanh === 'Kim' ? '#f4d03f' : son.nguhanh === 'Mộc' ? '#27ae60' : son.nguhanh === 'Thủy' ? '#3498db' : son.nguhanh === 'Hỏa' ? '#e74c3c' : '#d4af37';
    const t = el('text', {x:tx, y:ty, fill:color, 'font-size':14, 'font-weight':'bold', 'text-anchor':'middle', 'dominant-baseline':'middle', transform:`rotate(${angle+7.5}, ${tx}, ${ty})`});
    t.textContent = son.name; svg.appendChild(t);
  });

  // Vòng Bát Quái
  HAU_THIEN_QUA.forEach(q => {
    const [tx, ty] = polar(160, q.angle);
    const t1 = el('text', {x:tx, y:ty-10, fill:'#f4d03f', 'font-size':24, 'text-anchor':'middle', 'dominant-baseline':'middle'});
    t1.textContent = q.symbol; svg.appendChild(t1);
    const t2 = el('text', {x:tx, y:ty+15, fill:'#f5f0e1', 'font-size':12, 'text-anchor':'middle', 'dominant-baseline':'middle'});
    t2.textContent = q.name; svg.appendChild(t2);
  });

  // Âm Dương
  svg.innerHTML += `<circle cx="0" cy="0" r="70" fill="#f5f0e1"/>
    <path d="M 0 -70 A 70 70 0 0 1 0 70 A 35 35 0 0 0 0 0 A 35 35 0 0 1 0 -70 Z" fill="#0a0505"/>
    <circle cx="0" cy="-35" r="10" fill="#f5f0e1"/><circle cx="0" cy="35" r="10" fill="#0a0505"/>`;
    
  // Kim la bàn
  svg.innerHTML += `<polygon points="0,-130 -8,0 8,0" fill="#c0392b"/><polygon points="0,130 -8,0 8,0" fill="#ecf0f1"/>
    <circle cx="0" cy="0" r="12" fill="#d4af37" stroke="#7b1e13" stroke-width="2"/>`;
}

// ==================== KHỞI ĐỘNG ====================
drawCompass();
updateCompassDisplay(0);
renderSavedDirections();

// Cập nhật ngày giờ
function updateDateTime() {
  const now = new Date();
  $('duong-lich').textContent = now.toLocaleDateString('vi-VN', {weekday:'long', day:'numeric', month:'numeric', year:'numeric'});
  // Âm lịch xấp xỉ (giữ nguyên logic đơn giản để nhẹ)
  $('am-lich').textContent = `Năm ${now.getFullYear()}`; 
}
updateDateTime();
setInterval(updateDateTime, 60000);
