(function () {
  'use strict';
  const keys = ['pt_profile_v2', 'pt_house_notes_v2', 'pt_events_v2', 'pt_theme_v2'];
  const byId = (id) => document.getElementById(id);
  function setStatus(message) { const el = byId('backupStatus'); if (el) el.textContent = message; }
  function exportBackup() {
    const data = {};
    for (const key of keys) { const value = localStorage.getItem(key); if (value !== null) data[key] = JSON.parse(value); }
    const payload = { format: 'phong-thuy-viet-backup', version: 1, exportedAt: new Date().toISOString(), data };
    const url = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url; link.download = 'phong-thuy-viet-sao-luu-' + new Date().toISOString().slice(0, 10) + '.json';
    document.body.appendChild(link); link.click(); link.remove(); URL.revokeObjectURL(url);
    setStatus('Đã tạo tệp sao lưu. Hãy giữ tệp ở nơi an toàn.');
  }
  function valid(payload) {
    if (!payload || payload.format !== 'phong-thuy-viet-backup' || payload.version !== 1 || !payload.data || typeof payload.data !== 'object' || Array.isArray(payload.data)) return false;
    if (Object.keys(payload.data).some((key) => !keys.includes(key))) return false;
    const d = payload.data, p = d.pt_profile_v2;
    if (p !== undefined && (!p || !Number.isInteger(p.year) || p.year < 1900 || p.year > 2099 || !['nam', 'nu'].includes(p.gender))) return false;
    if (d.pt_house_notes_v2 !== undefined && typeof d.pt_house_notes_v2 !== 'string') return false;
    if (d.pt_theme_v2 !== undefined && !['light', 'dark'].includes(d.pt_theme_v2)) return false;
    const events = d.pt_events_v2;
    if (events !== undefined && (!Array.isArray(events) || events.length > 10000 || events.some((e) => !e || typeof e.title !== 'string' || e.title.length > 80 || typeof e.date !== 'string' || !/^\\d{4}-\\d{2}-\\d{2}$/.test(e.date) || typeof (e.note || '') !== 'string' || (e.note || '').length > 300))) return false;
    return true;
  }
  async function importBackup(file) {
    if (!file) return;
    try {
      if (file.size > 2 * 1024 * 1024) throw new Error('Tệp quá lớn (giới hạn 2 MB).');
      const payload = JSON.parse(await file.text());
      if (!valid(payload)) throw new Error('Tệp không đúng định dạng hoặc dữ liệu không hợp lệ.');
      if (!confirm('Khôi phục sẽ ghi đè các mục dữ liệu tương ứng trên thiết bị này. Anh đã sao lưu dữ liệu hiện tại nếu cần chưa?')) return;
      for (const key of keys) if (Object.prototype.hasOwnProperty.call(payload.data, key)) localStorage.setItem(key, JSON.stringify(payload.data[key]));
      setStatus('Khôi phục thành công. Tải lại trang để hiển thị toàn bộ dữ liệu vừa nhập.');
    } catch (error) { setStatus('Không thể khôi phục: ' + error.message); }
    finally { byId('importBackupFile').value = ''; }
  }
  document.addEventListener('DOMContentLoaded', function () {
    byId('exportBackup')?.addEventListener('click', exportBackup);
    byId('importBackupButton')?.addEventListener('click', () => byId('importBackupFile')?.click());
    byId('importBackupFile')?.addEventListener('change', (event) => importBackup(event.target.files[0]));
  });
})();