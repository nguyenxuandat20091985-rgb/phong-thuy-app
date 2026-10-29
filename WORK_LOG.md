# Nhật ký công việc AI — Phong Thủy Việt

> Quy tắc: AI làm phần nào phải ghi phần đó ngay trong repository. Đọc `AI_RULES.md` (nếu đã được merge hoặc có trên nhánh làm việc) và nhật ký này trước khi sửa. Không xóa lịch sử; thêm mục mới cho mỗi phần việc.

## 2026-10-29 — Thêm tab “Chi tiết chức năng · Sao chép” trong mục Nhà ở

- Trạng thái: Đã sửa mã nguồn trên nhánh tính năng; chưa xác nhận CI, chưa merge và chưa xác minh trực tiếp trên điện thoại.
- Mục tiêu: giúp người dùng xem đầy đủ chức năng đang có trong mục Nhà ở và sao chép danh sách gửi cho AI khác để tiếp tục công việc mà không phải tìm lại.
- File thay đổi:
  - `index.html`: thêm tab con “Chi tiết chức năng · Sao chép” vào khu vực hướng dẫn Nhà ở; thêm ô văn bản có thể chỉnh sửa, nút sao chép và nút khôi phục nội dung gốc.
  - `app.js`: nạp danh mục chi tiết mặc định; thêm thao tác sao chép bằng Clipboard API, fallback chọn văn bản, thông báo trạng thái và khôi phục nội dung gốc.
- Nội dung danh mục: các khu vực phòng; hướng dẫn trực quan; tính hướng theo ngày sinh DD/MM/YYYY; la bàn/cài đặt hiệu chỉnh; hồ sơ mặt bằng; kiểm tra nhanh 8 nhóm vấn đề; ghi chú nhà; bộ công cụ nâng cao gồm Bát Trạch, Huyền Không Phi Tinh, Cửu Cung, Loan Đầu, tra cứu sát khí, nội thất/ngũ hành, Kim Lâu–Hoang Ốc–Tam Tai; giới hạn và checklist kiểm thử.
- Branch: `feat/advanced-house-feng-shui` (nhánh PR #14).
- Commit cập nhật `index.html`: `4e9d2e84a1e6f0588c249c8040b5a9019d305fc6`.
- Commit cập nhật `app.js`: `9e2373592deba9ea59e3ee9a83feea5b26dc86e1`.
- Kiểm thử: chưa chạy CI/test suite sau thay đổi; chưa chạy trên thiết bị di động. Cần kiểm tra tab con, nút sao chép, nút khôi phục, lỗi console và khả năng hoạt động trên trình duyệt không cấp Clipboard API.
- Rủi ro/việc còn lại: nội dung là danh mục dựa trên các trường/tiêu đề có trong mã nguồn; các tính năng nâng cao vẫn cần xác minh từng luồng thực tế. Không được tuyên bố đã triển khai hoặc hoạt động tốt trên điện thoại khi chưa kiểm tra.
- Bước tiếp theo: xem diff PR #14; chạy CI; kiểm thử tab và sao chép trên điện thoại; cập nhật nhật ký bằng kết quả thực tế.

## Trạng thái bàn giao trước đó cần xác minh lại

- PR #14: https://github.com/nguyenxuandat20091985-rgb/phong-thuy-app/pull/14 — cần kiểm tra trạng thái, head SHA và CI hiện tại.
- PR #15: https://github.com/nguyenxuandat20091985-rgb/phong-thuy-app/pull/15 — đề xuất thêm quy tắc AI và nhật ký; cần kiểm tra trạng thái, CI và việc merge.
- Trước khi báo hoàn thành, xác minh commit/CI trực tiếp; phân biệt đã sửa, đã kiểm thử, đã merge, đã triển khai và đã xác minh thiết bị.


## 2026-10-29 — Bước 1/5: bộ lọc ngày làm nhà (PR #14)

- Trạng thái: mã nguồn trên nhánh tính năng; chờ GitHub Actions xác nhận test sau commit. Chưa merge, chưa kiểm tra trực tiếp trên điện thoại/Preview.
- File thay đổi: `phong-thuy-nha-nang-cao.html` (giao diện mobile-first: năm sinh âm lịch, việc, 30/60/90 ngày, kết quả và danh sách bị loại); `ngay-lam-nha.js` (tính âm lịch Việt Nam UTC+7 qua `bat-trach.js`, can chi, ngày xung tuổi, Tam Nương, Nguyệt Kỵ, Sát Chủ/Thọ Tử theo bảng dân gian, lưu cấu hình); `sw.js` (cache-bust/precache offline); `backup.js` (sao lưu/khôi phục cấu hình, validate); `.github/workflows/validate-app.yml` và `tests/ngay-lam-nha.test.js`.
- Trường phái: lịch âm Việt Nam UTC+7; Tam Nương ngày âm 3,7,13,18,22,27; Nguyệt Kỵ 5,14,23; Sát Chủ/Thọ Tử theo bảng dân gian phổ biến; ngày xung theo địa chi năm sinh âm lịch.
- Đối chiếu 5 ngày với lịch vạn niên: 02/11/2026 = 24/9 âm, Canh Thìn; 03/11 = 25/9, Tân Tỵ; 07/11 = 29/9, Ất Dậu; 09/11 = 1/10, Đinh Hợi; 11/11 = 3/10, Kỷ Sửu. Nguồn: https://lichngaytot.com/lich-thang/11-2026.html và https://amlich.vn/lich-am.
- Giới hạn: Sát Chủ/Thọ Tử có dị bản giữa lịch vạn niên. Đây là bộ lọc ngày kiêng, chưa tính giờ hoàng đạo/cát tinh hoặc quy tắc chọn ngày chuyên biệt theo từng nghi lễ; ngày qua bộ lọc không được quảng bá là đại cát.
- Kết quả test: chờ Actions sau commit. Cần kiểm tra thêm trên Vercel Preview và đối chiếu với lịch vạn niên gia đình sử dụng.
- Không merge vào `main`; chỉ sang Bước 2 sau khi báo cáo kết quả Bước 1.
