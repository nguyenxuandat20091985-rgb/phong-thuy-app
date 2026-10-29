# Ghi chú dự án Phong Thủy App

## Cập nhật 2026-10-29 — Nâng cấp mục Nhà ở + khôi phục panel (Grok)

### Đã làm

1. **Sơ đồ bố trí**
   - Thẻ tĩnh → nút bấm tương tác (6 khu vực: Phòng ngủ, Bàn làm việc, Nhà bếp, Cửa chính, Phòng khách, Nhà vệ sinh).
   - Chạm → modal chi tiết: mô tả, checklist **Nên làm** / **Nên tránh**.
   - SVG màu sinh động, CTA “Xem chi tiết →”.
   - Đóng modal: nút ×, chạm nền, phím Escape.

2. **Theo tuổi & hướng**
   - Form ngày sinh (DD/MM/YYYY) + giới tính + hướng cửa đã đo.
   - Logic Bát Trạch / can chi / gợi ý bố trí trong `app.js` (không phá).
   - Khuyến nghị đo hướng thực tế; không phá kết cấu chỉ vì bảng tra.

3. **Trấn trạch an toàn**
   - Checklist 8 mục có tick.
   - Lưu tiến độ `localStorage` key `pt_protect_checklist_v1`.
   - Thanh tiến độ “Đã hoàn thành x/8 mục”.
   - Tinh thần: an toàn kỹ thuật trước, không khuyến khích vật phẩm đắt / cách nguy hiểm.

4. **Khôi phục panel bị thiếu**
   - `index.html` trước đó thiếu panel **Ngày tháng** (`panel-calendar`) và **Kiến thức** (`panel-library`).
   - Đã gộp lại đầy đủ 4 tab: Cá nhân / Nhà ở / Ngày tháng / Kiến thức.
   - Gắn `home-upgrade.css` + `home-upgrade.js` trong `index.html`.

5. **Offline / PWA**
   - `sw.js` cache name → `phong-thuy-v43-home-interactive`.
   - ASSETS thêm `./home-upgrade.css`, `./home-upgrade.js`.

### File liên quan
- `index.html` — full panels + modal + layout/protect interactive
- `style.css` — base styles
- `home-upgrade.css` — modal, interactive cards, checklist, progress
- `home-upgrade.js` — `ROOM_DETAILS`, `openRoomDetail`, `initLayoutDetails`, `initProtectChecklist`
- `app.js` — Bát Trạch, lịch âm, house age form, room guidance, tabs
- `sw.js` — offline cache v43
- `manifest.json` — icon-192 / icon-512

### Việc ChatGPT / dev sau cần biết
- **Không xóa** `ROOM_DETAILS` / `PROTECT_STORE` (`pt_protect_checklist_v1`) khi refactor.
- Modal: `#roomDetailModal`, `#roomModalBody`, `[data-close-modal]`.
- Checklist protect: `#protectChecklist input[data-protect]`.
- Tab nhà ở: `.home-guide-tab` + `[data-guide-panel]` (layout | age | protect).
- Script order: `app.js` rồi `home-upgrade.js`.
- Khi đổi offline assets: bump `CACHE_NAME` trong `sw.js`.

### Repo & app
- https://github.com/nguyenxuandat20091985-rgb/phong-thuy-app
- https://nguyenxuandat20091985-rgb.github.io/phong-thuy-app/
- Mật khẩu private (nếu còn dùng gate): `phongthuy2026`
