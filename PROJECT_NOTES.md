# Ghi chú dự án Phong Thủy App

## Cập nhật 2026-10-29 — Nâng cấp mục Nhà ở (Grok)

### Đã làm

1. **Sơ đồ bố trí**
   - Đổi thẻ tĩnh thành nút bấm tương tác (6 khu vực: Phòng ngủ, Bàn làm việc, Nhà bếp, Cửa chính, Phòng khách, Nhà vệ sinh).
   - Chạm vào từng khu vực → mở modal chi tiết: mô tả, checklist **Nên làm** / **Nên tránh**.
   - SVG màu sinh động hơn, có CTA “Xem chi tiết →”.
   - Đóng modal bằng nút ×, chạm nền hoặc phím Escape.

2. **Theo tuổi & hướng**
   - Giữ form ngày sinh + giới tính + hướng cửa.
   - Logic tính Bát Trạch / can chi / gợi ý bố trí vốn đã có trong `app.js` (không phá).
   - Vẫn khuyến nghị đo hướng thực tế và không phá kết cấu chỉ vì bảng tra.

3. **Trấn trạch an toàn**
   - Đổi danh sách tĩnh thành **checklist 8 mục** có tick.
   - Lưu tiến độ bằng `localStorage` key `pt_protect_checklist_v1`.
   - Thanh tiến độ “Đã hoàn thành x/8 mục”.
   - Giữ tinh thần: an toàn kỹ thuật trước, không khuyến khích vật phẩm đắt / cách nguy hiểm.

### File đã sửa
- `index.html` — panel layout + protect + modal
- `style.css` — style modal, thẻ interactive, checklist
- `app.js` — `ROOM_DETAILS`, `openRoomDetail`, `initLayoutDetails`, `initProtectChecklist`

### Việc ChatGPT / dev sau cần biết
- Không xóa `ROOM_DETAILS` / `PROTECT_STORE` khi refactor.
- Modal id: `roomDetailModal`, `roomModalBody`.
- Checklist protect: `#protectChecklist input[data-protect]`.
- Tab nhà ở vẫn dùng `.home-guide-tab` + `[data-guide-panel]`.

### Repo
https://github.com/nguyenxuandat20091985-rgb/phong-thuy-app  
App: https://nguyenxuandat20091985-rgb.github.io/phong-thuy-app/
