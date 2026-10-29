# Ghi chú dự án Phong Thủy App

## Cập nhật 2026-10-29 — La bàn ngoài hero + Nhà ở interactive (Grok)

### Đã làm

1. **La bàn ở ngoài (hero)**
   - Thêm **la bàn mini sống** ngay trên hero (không chỉ trong tab Cá nhân).
   - Nút **Bật la bàn** → xin quyền cảm biến → hiện độ + tên hướng (Bắc/Đông Bắc…), kim xoay.
   - iOS: `webkitCompassHeading` + `requestPermission`; Android: `deviceorientation` / absolute.
   - IDs: `#heroCompass`, `#heroCompassDeg`, `#heroCompassDir`, `#heroCompassNeedle`, `#heroCompassStart`.
   - Logic trong `home-upgrade.js` (`initHeroCompass`).

2. **La bàn cao cấp** vẫn trong tab **Cá nhân** (iframe `la-ban-cao-cap.html`) — Bát Trạch, Phi Tinh, hiệu chuẩn.

3. **Sơ đồ bố trí / Trấn trạch / Theo tuổi** — như trước (modal, checklist `pt_protect_checklist_v1`).

4. **Offline** — `sw.js` → `phong-thuy-v44-hero-compass`.

### File liên quan
- `index.html` — hero live compass + full 4 tabs
- `home-upgrade.css` — style hero compass + modal/checklist
- `home-upgrade.js` — ROOM_DETAILS, protect checklist, hero compass
- `la-ban-cao-cap.html` — la bàn đầy đủ trong Cá nhân
- `sw.js` — cache v44

### Việc ChatGPT / dev sau cần biết
- Hero compass **không** thay thế iframe cao cấp; hai lớp: mini ngoài + full trong Cá nhân.
- Không xóa `ROOM_DETAILS` / `pt_protect_checklist_v1`.
- Bump `CACHE_NAME` khi đổi asset offline.

### Repo & app
- https://github.com/nguyenxuandat20091985-rgb/phong-thuy-app
- https://nguyenxuandat20091985-rgb.github.io/phong-thuy-app/
- Mật khẩu (nếu còn gate): `phongthuy2026`
