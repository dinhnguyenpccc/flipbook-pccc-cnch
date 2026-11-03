# Phản xạ an toàn · Trắc nghiệm PCCC & CNCH

Trang tĩnh cho học sinh THPT, dùng trên GitHub Pages. Mở `index.html` hoặc truy cập `/trac-nghiem/` trên website.

- 20 câu chia 2 bộ; làm ngẫu nhiên 10 câu hoặc toàn bộ 20 câu.
- Luyện tập: kiểm tra và xem giải thích sau mỗi câu.
- Thử thách: chỉ hiện đáp án khi kết thúc; cho phép quay lại thay lựa chọn.
- Đảo cả câu hỏi và lựa chọn, chấm theo đáp án gắn với từng lựa chọn.
- Gợi ý, tiến độ, tổng kết điểm và xem lại câu sai.
- Với Luyện tập và Thử thách, điểm tốt nhất lưu trong localStorage, không thu tên hoặc gửi kết quả.

## Chế độ nộp kết quả tập trung

Trang đã có thêm **Nộp kết quả**: nhập họ tên, trường, lớp; gửi đáp án đến Google Apps Script; máy chủ chấm lại và lưu Google Sheets. Chế độ này chỉ mở sau khi điền URL triển khai thật trong `config.js`. Luyện tập và Thử thách vẫn hoạt động tại thiết bị.

Mã máy chủ và hướng dẫn ba bước ở [apps-script/HUONG_DAN.md](../apps-script/HUONG_DAN.md). ID bảng được lưu riêng trong thuộc tính Apps Script khi chạy `setup`, không nằm trong GitHub. Không báo lưu thành công từ một POST không đọc được phản hồi: website phải nhận được xác nhận theo mã bài riêng. Khi thử lại dùng nguyên mã bài và nội dung để chống ghi trùng.

## Chỉnh sửa nội dung

Mở `questions.js`. Mỗi câu có `id` riêng, `deck` (1 hoặc 2), `topic`, `title`, `prompt`, `hint`, `sources`, 4 `options` và `correct`.

`correct` là chỉ số từ 0 đến 3 của đáp án trước khi đảo thứ tự. Mỗi lựa chọn có `text` và `feedback`. Nguồn tham khảo nằm ở `QUIZ_SOURCES`; câu hỏi dùng khóa `id` nguồn. Khi đổi đáp án, kiểm tra lại cả giải thích.

## Xuất bản

Giữ toàn bộ thư mục `trac-nghiem` ở thư mục gốc của repository đã bật GitHub Pages. Website này dùng đường dẫn tương đối, không cần cài thư viện hay build. Liên kết `../` mở flipbook tại trang gốc.

Đây là trang tuyên truyền và tự luyện, đáp án tồn tại trong mã trang công khai. Thông tin học viên tự khai, chưa có xác thực danh tính hoặc cơ chế bảo mật đề cho kỳ thi chính thức. Chế độ nộp kết quả chỉ thu thông tin khi học viên chủ động chọn và nộp bài.
