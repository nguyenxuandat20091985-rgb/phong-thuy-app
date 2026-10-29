# Nhật ký công việc AI — Phong Thủy Việt

> Đây là sổ bàn giao chung của repository. Mỗi phần việc mới phải được thêm thành mục mới ở đầu hoặc cuối file; không xóa lịch sử cũ. Đọc `AI_RULES.md` trước khi thực hiện thay đổi.

## Trạng thái hiện tại cần biết

- Ngày lập sổ: 2026-10-29.
- Quy tắc vận hành mới: mọi AI phải ghi lại phần việc đã làm, file thay đổi, test và việc còn lại ngay trong repository.
- PR theo dõi công việc phong thủy nhà nâng cao: [PR #14](https://github.com/nguyenxuandat20091985-rgb/phong-thuy-app/pull/14).
- Theo ghi chép bàn giao trước ngày lập sổ, PR #14 còn mở và chưa được xác nhận merge vào `main`. AI tiếp theo phải kiểm tra trạng thái PR, branch head và GitHub Actions trực tiếp trước khi kết luận; không dựa vào ghi chép cũ thay cho trạng thái hiện tại.
- Các phần đã được báo cáo trước đây trên nhánh tính năng: trang phong thủy nhà nâng cao; các module Bát Trạch/ngày xây dựng/Huyền Không; module hóa giải sát khí và test; cập nhật backup/restore cho hồ sơ nhà nâng cao; test backup và kiểm tra bảo mật/SEO; metadata SEO và cập nhật cache PWA.
- Các commit được ghi nhận trong bàn giao cũ: `aee92d842b17ee33b9bede8238037b537f4fdc73` (module hóa giải sát khí) và `fec307b530d32ac74c256329548a772d1daa6a80` (backup/SEO/security theo báo cáo trước). Cần xác minh chúng vẫn nằm trong lịch sử branch/PR hiện tại trước khi dùng làm bằng chứng.
- CI từng được báo cáo thành công ở các run `40828455844` và `40828854891`; AI tiếp theo cần mở các run này và xác nhận trạng thái thực tế. Không suy diễn từ báo cáo cũ.
- Chưa có xác nhận trong sổ này về việc PR #14 đã merge, production đã triển khai, hoặc ứng dụng đã được kiểm thử trực tiếp trên điện thoại.

---

## 2026-10-29 — Thiết lập quy tắc ghi chép và bàn giao cho AI

- Trạng thái: Đã tạo tài liệu trên branch riêng; chưa merge vào `main`.
- Mục tiêu: giúp AI tiếp theo biết chính xác phải đọc gì, ghi lại gì và không làm hỏng các phần việc trước.
- File tạo: `AI_RULES.md`.
- Nội dung: bắt buộc đọc nhật ký trước khi sửa; branch/PR riêng; thay đổi hẹp; không xóa lịch sử; ghi file, mục tiêu, commit, test, rủi ro và bước tiếp theo; phân biệt đã sửa/đã test/đã merge/đã triển khai/đã xác minh thiết bị.
- File tạo: `WORK_LOG.md` (file hiện tại).
- Nội dung: lưu trạng thái bàn giao đã biết của dự án, các PR/commit/test cần xác minh lại và nhật ký của quy tắc mới.
- Kiểm thử: chưa chạy test ứng dụng vì thay đổi hiện tại chỉ thêm tài liệu; chưa xác minh GitHub Actions cho branch tài liệu.
- Branch: `docs/ai-work-log-rules`.
- Commit tạo `AI_RULES.md`: `f07e628aea657caa5c24233b2d418fa26bfbc514`.
- PR: cần tạo PR cho branch này và kiểm tra diff trước khi merge.
- Việc còn lại: tạo `WORK_LOG.md` commit; mở PR; kiểm tra CI; chỉ merge sau khi người có quyền duyệt.
- Bước tiếp theo cho AI sau: kiểm tra PR này và PR #14; xác minh các run CI/commit hiện có; tiếp tục ghi nhật ký sau mỗi phần việc.

## Mẫu cho các mục tiếp theo

Mỗi khi hoàn thành một phần mới, hãy thêm một mục với định dạng sau:

### YYYY-MM-DD — [Tên phần việc]
- Trạng thái: Đã sửa / Đã kiểm thử / Đã merge / Đã triển khai / Đã xác minh thiết bị
- Mục tiêu:
- File thay đổi:
- Chi tiết:
- Kiểm thử và kết quả:
- Chưa kiểm thử:
- Branch / commit / PR:
- Lỗi, rủi ro, việc còn lại:
- Bước tiếp theo cho AI sau:
