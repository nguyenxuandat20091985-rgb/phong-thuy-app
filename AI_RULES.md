# QUY TẮC BẮT BUỘC CHO MỌI AI LÀM VIỆC TRÊN PHONG THỦY VIỆT

## Nguyên tắc cốt lõi
**AI làm phần nào phải ghi lại phần đó ngay trong repository.** Không để kiến thức chỉ nằm trong cuộc trò chuyện. AI tiếp theo phải đọc tài liệu này và `WORK_LOG.md` trước khi sửa, để tiếp tục đúng chỗ, không phải tìm lại từ đầu.

## Trước khi sửa
1. Đọc `AI_RULES.md`, `WORK_LOG.md`, `README.md` và tài liệu liên quan trực tiếp.
2. Kiểm tra branch hiện tại, trạng thái Git, PR/commit gần nhất và các kiểm thử liên quan.
3. Xác định chính xác phạm vi được phép sửa. Không tự tiện mở rộng sang chức năng/file không liên quan.
4. Nếu phát hiện thay đổi chưa commit hoặc trạng thái không rõ, không ghi đè; kiểm tra và báo rõ trước khi tiếp tục.

## Trong khi sửa
1. Mỗi nhiệm vụ dùng branch riêng; không làm trực tiếp trên `main`.
2. Thay đổi nhỏ, có phạm vi; không viết lại toàn bộ file nếu chỉ cần sửa một phần.
3. Không xóa, đổi tên hoặc thay đổi API/dữ liệu hiện có nếu chưa kiểm tra phụ thuộc và tương thích.
4. Không tắt, bỏ qua hoặc làm yếu kiểm thử để khiến CI xanh.
5. Không đưa khóa bí mật, token, mật khẩu hoặc dữ liệu riêng tư vào mã nguồn phía trình duyệt.
6. Với thay đổi có ảnh hưởng tới dữ liệu, backup/restore, PWA cache, bảo mật hoặc SEO, phải kiểm tra tác động liên quan.

## Sau MỖI phần việc
Cập nhật `WORK_LOG.md` ngay trong cùng nhánh/PR, ghi:
- Ngày thực hiện.
- Mục tiêu và phạm vi.
- File đã thêm/sửa/xóa, cùng chức năng thay đổi.
- Lý do và cách triển khai ở mức đủ để AI sau tiếp tục.
- Kiểm thử đã chạy và kết quả thực tế; ghi rõ kiểm thử nào chưa chạy.
- Commit SHA và PR/branch liên quan khi có.
- Lỗi còn tồn tại, rủi ro, phần chưa hoàn thành và bước tiếp theo.
- Trạng thái riêng biệt: **đã sửa**, **đã kiểm thử**, **đã merge**, **đã triển khai**, **đã xác minh trên thiết bị**. Không được đánh đồng các trạng thái này.

Không sửa lại hoặc xóa các mục nhật ký cũ để che lịch sử. Nếu cần sửa thông tin sai, thêm mục đính chính có ngày và dẫn lại mục cũ.

## Kiểm thử và bàn giao
1. Chạy các kiểm thử phù hợp với phần đã thay đổi; kiểm tra diff để chắc không sửa ngoài phạm vi.
2. Mở PR, mô tả rõ thay đổi, file bị ảnh hưởng, kiểm thử và rủi ro.
3. Không tự merge hoặc triển khai nếu chưa được cho phép.
4. Không nói “hoàn thành” chỉ vì build thành công. Chỉ xác nhận những gì có bằng chứng. Nếu chưa kiểm tra trên điện thoại/trình duyệt thật, phải nói rõ.
5. Khi kết thúc, cập nhật nhật ký rồi bàn giao ngắn gọn: đã làm gì, commit/PR nào, test nào pass/fail/chưa chạy, còn gì cần làm.

## Bảo vệ phạm vi file
- `index.html`, `app.js`, `style.css`: file lõi; chỉ sửa khi nhiệm vụ yêu cầu và phải kiểm tra hồi quy.
- Các module phong thủy và file test tương ứng: ưu tiên sửa module liên quan và bổ sung test cho quy tắc mới.
- `backup.js`: giữ tương thích dữ liệu cũ; kiểm tra cả export/import và dữ liệu không hợp lệ.
- `sw.js`, `manifest.json`: kiểm tra cache/version và hành vi PWA khi sửa.
- `.github/workflows/`: không được bỏ hoặc vô hiệu hóa bước kiểm thử để làm CI xanh.
- Tên file ở danh sách trên chỉ là hướng dẫn thận trọng, không thay thế việc đọc mã nguồn và kiểm tra phụ thuộc.

## Mẫu ghi nhật ký cho mỗi phần việc
```md
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
```

**Quy tắc cuối:** Không có ghi chép thì chưa bàn giao xong. Mọi AI phải tiếp nối nhật ký này, không bắt người dùng nhắc lại những gì repository có thể lưu được.
