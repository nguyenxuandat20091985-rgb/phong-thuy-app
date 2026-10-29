(function () {
  'use strict';
  const ADVANCED_PROFILE_KEY = 'pt_advanced_house_profile_v1';
  const ADVANCED_EVENT_KEY = 'pt_advanced_house_profile_v1_event';
  const keys = ['pt_profile_v2', 'pt_house_notes_v2', 'pt_events_v2', 'pt_theme_v2', ADVANCED_PROFILE_KEY, ADVANCED_EVENT_KEY];
  const advancedProfileFields = ['birth', 'gender', 'built', 'facing', 'bearing', 'year', 'yearToCheck', 'housePeriod', 'facingMountain', 'eventType', 'eventDate', 'eventNote'];
  const allowedFacings = new Set(['', 'Bắc', 'Đông Bắc', 'Đông', 'Đông Nam', 'Nam', 'Tây Nam', 'Tây', 'Tây Bắc']);
  const allowedMountains = new Set(['', 'N1','N2','N3','NE1','NE2','NE3','E1','E2','E3','SE1','SE2','SE3','S1','S2','S3','SW1','SW2','SW3','W1','W2','W3','NW1','NW2','NW3']);
  const byId = (id) => document.getElementById(id);
  function setStatus(message) {
    const el = byId('backupStatus');
    if (el) el.textContent = message;
  }
  function exportBackup() {
    try {
      const data = {};
      for (const key of keys) {
        const value = localStorage.getItem(key);
        if (value !== null) data[key] = JSON.parse(value);
      }
      const payload = {
        format: 'phong-thuy-viet-backup',
        version: 1,
        exportedAt: new Date().toISOString(),
        data
      };
      const blobUrl = URL.createObjectURL(new Blob(
        [JSON.stringify(payload, null, 2)],
        { type: 'application/json;charset=utf-8' }
      ));
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'phong-thuy-viet-sao-luu-' + new Date().toISOString().slice(0, 10) + '.json';
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(blobUrl);
      setStatus('Đã tạo tệp sao lưu. Hãy giữ tệp ở nơi an toàn.');
    } catch (error) {
      setStatus('Không thể tạo bản sao lưu: ' + (error && error.message ? error.message : 'lỗi lưu trữ không xác định.'));
    }
  }
  function validDate(value) {
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const [year, month, day] = value.split('-').map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));
    return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
  }
  function valid(payload) {
    if (!payload || payload.format !== 'phong-thuy-viet-backup' || payload.version !== 1 ||
        !payload.data || typeof payload.data !== 'object' || Array.isArray(payload.data)) return false;
    if (Object.keys(payload.data).some((key) => !keys.includes(key))) return false;
    const d = payload.data, p = d.pt_profile_v2;
    if (p !== undefined && (!p || !Number.isInteger(p.year) || p.year < 1900 || p.year > 2099 ||
        !['nam', 'nu'].includes(p.gender))) return false;
    if (d.pt_house_notes_v2 !== undefined && typeof d.pt_house_notes_v2 !== 'string') return false;
    if (d.pt_theme_v2 !== undefined && !['light', 'dark'].includes(d.pt_theme_v2)) return false;
    const events = d.pt_events_v2;
    if (events !== undefined && (!Array.isArray(events) || events.length > 10000 ||
        events.some((e) => !e || typeof e.title !== 'string' || !e.title.trim() || e.title.length > 80 ||
          !validDate(e.date) || typeof (e.note || '') !== 'string' || (e.note || '').length > 300 ||
          (e.id !== undefined && !Number.isFinite(e.id))))) return false;

    // Validate the advanced-house profile and saved event before restoring any values.
    const advancedProfile = d[ADVANCED_PROFILE_KEY];
    if (advancedProfile !== undefined) {
      if (!advancedProfile || typeof advancedProfile !== 'object' || Array.isArray(advancedProfile) ||
          Object.keys(advancedProfile).some((key) => !advancedProfileFields.includes(key))) return false;
      for (const key of advancedProfileFields) {
        if (advancedProfile[key] !== undefined &&
            (typeof advancedProfile[key] !== 'string' || advancedProfile[key].length > (key === 'eventNote' ? 2000 : 100))) return false;
      }
      const p = advancedProfile;
      if (p.gender !== undefined && !['nam', 'nu'].includes(p.gender)) return false;
      if (p.birth !== undefined && !/^[0-9/]{0,10}$/.test(p.birth)) return false;
      if (p.built && (!/^\d{4}$/.test(p.built) || Number(p.built) < 1800 || Number(p.built) > 2099)) return false;
      for (const key of ['year', 'yearToCheck']) {
        if (p[key] && (!/^\d{4}$/.test(p[key]) || Number(p[key]) < 1900 || Number(p[key]) > 2099)) return false;
      }
      if (p.bearing && (!Number.isFinite(Number(p.bearing)) || Number(p.bearing) < 0 || Number(p.bearing) >= 360)) return false;
      if (p.housePeriod && !/^[1-9]$/.test(p.housePeriod)) return false;
      if (p.facing !== undefined && !allowedFacings.has(p.facing)) return false;
      if (p.facingMountain !== undefined && !allowedMountains.has(p.facingMountain)) return false;
      if (p.eventDate && !validDate(p.eventDate)) return false;
    }
    const advancedEvent = d[ADVANCED_EVENT_KEY];
    if (advancedEvent !== undefined && (!advancedEvent || typeof advancedEvent !== 'object' || Array.isArray(advancedEvent) ||
        Object.keys(advancedEvent).some((key) => !['type', 'date', 'note'].includes(key)) ||
        typeof advancedEvent.type !== 'string' || !advancedEvent.type.trim() || advancedEvent.type.length > 80 ||
        !validDate(advancedEvent.date) || typeof (advancedEvent.note || '') !== 'string' || (advancedEvent.note || '').length > 2000)) return false;
    return true;
  }
  async function importBackup(file) {
    if (!file) return;
    try {
      if (file.size > 2 * 1024 * 1024) throw new Error('Tệp quá lớn (giới hạn 2 MB).');
      const payload = JSON.parse(await file.text());
      if (!valid(payload)) throw new Error('Tệp không đúng định dạng hoặc dữ liệu không hợp lệ.');
      if (!confirm('Khôi phục sẽ ghi đè các mục dữ liệu tương ứng trên thiết bị này. Anh đã sao lưu dữ liệu hiện tại nếu cần chưa?')) return;

      // Keep the previous values so a quota/storage failure cannot leave a partial restore.
      const previous = new Map();
      for (const key of keys) previous.set(key, localStorage.getItem(key));
      try {
        for (const key of keys) {
          if (Object.prototype.hasOwnProperty.call(payload.data, key)) {
            localStorage.setItem(key, JSON.stringify(payload.data[key]));
          }
        }
      } catch (writeError) {
        for (const [key, value] of previous) {
          try {
            if (value === null) localStorage.removeItem(key);
            else localStorage.setItem(key, value);
          } catch (_) { /* Best-effort rollback if storage is unavailable. */ }
        }
        throw writeError;
      }
      setStatus('Khôi phục thành công. Tải lại trang để hiển thị toàn bộ dữ liệu vừa nhập.');
    } catch (error) {
      setStatus('Không thể khôi phục: ' + (error && error.message ? error.message : 'lỗi dữ liệu không xác định.'));
    } finally {
      const input = byId('importBackupFile');
      if (input) input.value = '';
    }
  }
  document.addEventListener('DOMContentLoaded', function () {
    byId('exportBackup')?.addEventListener('click', exportBackup);
    byId('importBackupButton')?.addEventListener('click', () => byId('importBackupFile')?.click());
    byId('importBackupFile')?.addEventListener('change', (event) => importBackup(event.target.files[0]));
  });
})();