# Phản xạ an toàn · Trắc nghiệm PCCC & CNCH

Trang tĩnh cho học sinh THPT, dùng trên GitHub Pages. Mở `index.html` hoặc truy cập `/trac-nghiem/` trên website.

- 20 câu chia 2 bộ; làm ngẫu nhiên 10 câu hoặc toàn bộ 20 câu.
- Luyện tập: kiểm tra và xem giải thích sau mỗi câu.
- Thử thách: chỉ hiện đáp án khi kết thúc; cho phép quay lại thay lựa chọn.
- Đảo cả câu hỏi và lựa chọn, chấm theo đáp án gắn với từng lựa chọn.
- Gợi ý, tiến độ, tổng kết điểm và xem lại câu sai.
- Điểm tốt nhất lưu trong localStorage trên thiết bị, không thu tên hoặc gửi kết quả.

## Chỉnh sửa nội dung

Mở `questions.js`. Mỗi câu có `id` riêng, `deck` (1 hoặc 2), `topic`, `title`, `prompt`, `hint`, `sources`, 4 `options` và `correct`.

`correct` là chỉ số từ 0 đến 3 của đáp án trước khi đảo thứ tự. Mỗi lựa chọn có `text` và `feedback`. Nguồn tham khảo nằm ở `QUIZ_SOURCES`; câu hỏi dùng khóa `id` nguồn. Khi đổi đáp án, kiểm tra lại cả giải thích.

## Xuất bản

Giữ toàn bộ thư mục `trac-nghiem` ở thư mục gốc của repository đã bật GitHub Pages. Website này dùng đường dẫn tương đối, không cần cài thư viện hay build. Liên kết `../` mở flipbook tại trang gốc.

Đây là trang tuyên truyền và tự luyện, đáp án tồn tại trong mã trang công khai. Không sử dụng để tổ chức kỳ thi cần bảo mật đáp án, xác thực người thi hoặc thu kết quả tập trung.
