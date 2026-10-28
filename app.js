// ===== Dữ liệu Phong Thủy =====
const CUNG = {
  1: { name: 'Khảm', hanh: 'Thủy', trach: 'Đông Tứ Trạch' },
  2: { name: 'Khôn', hanh: 'Thổ', trach: 'Tây Tứ Trạch' },
  3: { name: 'Chấn', hanh: 'Mộc', trach: 'Đông Tứ Trạch' },
  4: { name: 'Tốn', hanh: 'Mộc', trach: 'Đông Tứ Trạch' },
  6: { name: 'Càn', hanh: 'Kim', trach: 'Tây Tứ Trạch' },
  7: { name: 'Đoài', hanh: 'Kim', trach: 'Tây Tứ Trạch' },
  8: { name: 'Cấn', hanh: 'Thổ', trach: 'Tây Tứ Trạch' },
  9: { name: 'Ly', hanh: 'Hỏa', trach: 'Đông Tứ Trạch' }
};

// Hướng tốt / xấu theo cung
const HUONG = {
  // Đông Tứ Trạch
  'Khảm': {
    tot: {
      'Sinh Khí': 'Đông Nam',
      'Thiên Y': 'Đông',
      'Diên Niên': 'Nam',
      'Phục Vị': 'Bắc'
    },
    xau: {
      'Tuyệt Mệnh': 'Tây Nam',
      'Ngũ Quỷ': 'Đông Bắc',
      'Lục Sát': 'Tây',
      'Họa Hại': 'Tây Bắc'
    }
  },
  'Chấn': {
    tot: {
      'Sinh Khí': 'Nam',
      'Thiên Y': 'Bắc',
      'Diên Niên': 'Đông Nam',
      'Phục Vị': 'Đông'
    },
    xau: {
      'Tuyệt Mệnh': 'Tây',
      'Ngũ Quỷ': 'Tây Bắc',
      'Lục Sát': 'Tây Nam',
      'Họa Hại': 'Đông Bắc'
    }
  },
  'Tốn': {
    tot: {
      'Sinh Khí': 'Bắc',
      'Thiên Y': 'Nam',
      'Diên Niên': 'Đông',
      'Phục Vị': 'Đông Nam'
    },
    xau: {
      'Tuyệt Mệnh': 'Đông Bắc',
      'Ngũ Quỷ': 'Tây',
      'Lục Sát': 'Tây Bắc',
      'Họa Hại': 'Tây Nam'
    }
  },
  'Ly': {
    tot: {
      'Sinh Khí': 'Đông',
      'Thiên Y': 'Đông Nam',
      'Diên Niên': 'Bắc',
      'Phục Vị': 'Nam'
    },
    xau: {
      'Tuyệt Mệnh': 'Tây Bắc',
      'Ngũ Quỷ': 'Tây Nam',
      'Lục Sát': 'Đông Bắc',
      'Họa Hại': 'Tây'
    }
  },
  // Tây Tứ Trạch
  'Càn': {
    tot: {
      'Sinh Khí': 'Tây',
      'Thiên Y': 'Đông Bắc',
      'Diên Niên': 'Tây Nam',
      'Phục Vị': 'Tây Bắc'
    },
    xau: {
      'Tuyệt Mệnh': 'Nam',
      'Ngũ Quỷ': 'Đông',
      'Lục Sát': 'Bắc',
      'Họa Hại': 'Đông Nam'
    }
  },
  'Khôn': {
    tot: {
      'Sinh Khí': 'Đông Bắc',
      'Thiên Y': 'Tây',
      'Diên Niên': 'Tây Bắc',
      'Phục Vị': 'Tây Nam'
    },
    xau: {
      'Tuyệt Mệnh': 'Đông',
      'Ngũ Quỷ': 'Nam',
      'Lục Sát': 'Đông Nam',
      'Họa Hại': 'Bắc'
    }
  },
  'Cấn': {
    tot: {
      'Sinh Khí': 'Tây Nam',
      'Thiên Y': 'Tây Bắc',
      'Diên Niên': 'Tây',
      'Phục Vị': 'Đông Bắc'
    },
    xau: {
      'Tuyệt Mệnh': 'Đông Nam',
      'Ngũ Quỷ': 'Bắc',
      'Lục Sát': 'Đông',
      'Họa Hại': 'Nam'
    }
  },
  'Đoài': {
    tot: {
      'Sinh Khí': 'Tây Bắc',
      'Thiên Y': 'Tây Nam',
      'Diên Niên': 'Đông Bắc',
      'Phục Vị': 'Tây'
    },
    xau: {
      'Tuyệt Mệnh': 'Bắc',
      'Ngũ Quỷ': 'Đông Nam',
      'Lục Sát': 'Nam',
      'Họa Hại': 'Đông'
    }
  }
};

// ===== Hàm tính toán =====
function tinhCungMenh(namSinh, gioiTinh) {
  // Công thức phổ biến: lấy 2 số cuối năm sinh, cộng lại đến khi còn 1 chữ số, rồi dùng bảng
  let so = namSinh % 100;
  so = Math.floor(so / 10) + (so % 10);
  if (so > 9) so = Math.floor(so / 10) + (so % 10);

  let cungSo;
  if (gioiTinh === 'nam') {
    cungSo = 11 - so;
    if (cungSo === 5) cungSo = 2; // Nam cung 5 → Khôn
    if (cungSo > 9) cungSo -= 9;
  } else {
    cungSo = so + 4;
    if (cungSo > 9) cungSo -= 9;
    if (cungSo === 5) cungSo = 8; // Nữ cung 5 → Cấn
  }

  // Xử lý trường hợp đặc biệt năm 2000 trở đi đôi khi có biến thể, nhưng công thức trên vẫn dùng phổ biến
  return CUNG[cungSo] || CUNG[1];
}

function hienThiKetQua() {
  const year = parseInt(document.getElementById('birthYear').value);
  const gender = document.getElementById('gender').value;

  if (!year || year < 1920 || year > 2030) {
    alert('Vui lòng nhập năm sinh hợp lệ (1920 - 2030)');
    return;
  }

  const cung = tinhCungMenh(year, gender);
  const huong = HUONG[cung.name];

  // Hiển thị
  document.getElementById('cungMenh').textContent = cung.name;
  document.getElementById('nguHanh').textContent = cung.hanh;
  document.getElementById('trach').textContent = cung.trach;

  // Hướng tốt
  const totDiv = document.getElementById('huongTot');
  totDiv.innerHTML = '';
  for (const [ten, huongTen] of Object.entries(huong.tot)) {
    const span = document.createElement('span');
    span.textContent = `${ten}: ${huongTen}`;
    totDiv.appendChild(span);
  }

  // Hướng xấu
  const xauDiv = document.getElementById('huongXau');
  xauDiv.innerHTML = '';
  for (const [ten, huongTen] of Object.entries(huong.xau)) {
    const span = document.createElement('span');
    span.textContent = `${ten}: ${huongTen}`;
    xauDiv.appendChild(span);
  }

  // Gợi ý
  const tips = [
    `Hướng nhà / cửa chính tốt nhất: <strong>${huong.tot['Sinh Khí']}</strong> (Sinh Khí)`,
    `Hướng giường ngủ tốt: ưu tiên ${huong.tot['Thiên Y']} hoặc ${huong.tot['Diên Niên']}`,
    `Bàn làm việc nên ngồi hướng ${huong.tot['Sinh Khí']} hoặc ${huong.tot['Thiên Y']}`,
    `Tránh hướng ${huong.xau['Tuyệt Mệnh']} (Tuyệt Mệnh) cho cửa chính và giường ngủ`,
    `Ngũ hành bản mệnh của bạn là <strong>${cung.hanh}</strong> → nên dùng màu sắc, vật liệu tương sinh`
  ];

  const tipsList = document.getElementById('tipsList');
  tipsList.innerHTML = tips.map(t => `<li>${t}</li>`).join('');

  document.getElementById('result').style.display = 'block';
  document.getElementById('result').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Event
document.getElementById('calcBtn').addEventListener('click', hienThiKetQua);
document.getElementById('birthYear').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') hienThiKetQua();
});