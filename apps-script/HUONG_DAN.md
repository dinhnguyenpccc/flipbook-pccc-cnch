# Kết nối GitHub Pages → Apps Script → Google Sheets

## Bảng kết quả đã tạo

Mở bảng **Kết quả trắc nghiệm PCCC và CNCH – Học sinh THPT** trong thư mục **ChatGPT** trên Google Drive, hoặc dùng liên kết riêng được gửi trong cuộc trò chuyện. ID bảng không được đưa lên kho GitHub công khai.

Tab `Ket_qua` có 20 cột, một hàng cho mỗi bài nộp. Bảng giữ riêng tư; không chọn chia sẻ công khai. Học viên chỉ truy cập website, không cần quyền mở bảng tính.

## Ba bước kích hoạt

1. **Mở bảng kết quả → Tiện ích mở rộng (Extensions) → Apps Script.** Đặt tên dự án là `Nhan ket qua PCCC THPT`. Mở [Code.gs](./Code.gs), bấm **Raw** để lấy toàn bộ mã, thay nội dung mặc định trong tệp `Code.gs` của Google bằng mã này rồi lưu. Mã đã có tên tab, mã buổi và đáp án của 20 câu. Không tạo dự án rời từ trang chủ Apps Script ở bước này.
2. **Chọn hàm `setup` → Chạy (Run)** và cấp quyền cho chính dự án do bạn vừa tạo. Hàm này lấy ID bảng đang mở và lưu trong **Script Properties** riêng của dự án; không ghi ID đó vào mã nguồn công khai. Sau đó chọn **Triển khai (Deploy) → Bản triển khai mới (New deployment) → Ứng dụng web (Web app)**. Chọn **Thực thi với tư cách: Tôi (Execute as: Me)** và **Ai có quyền truy cập: Bất kỳ ai (Anyone)**. Bấm triển khai. Không cần chia sẻ bảng tính cho học viên. Nếu tài khoản tổ chức không cho phép truy cập ẩn danh, quản trị viên phải cho phép hoặc cần đổi cách xác thực; không dùng tùy chọn yêu cầu đăng nhập rồi coi là đã mở cho mọi học viên.
3. **Sao chép URL ứng dụng web kết thúc bằng `/exec` và gửi lại trong cuộc trò chuyện.** Tôi sẽ đặt URL đó vào `trac-nghiem/config.js`, kiểm tra kết nối và cập nhật GitHub Pages. Không dùng URL `/dev` hoặc URL trang chỉnh sửa script.

Hiện `endpoint` trong `config.js` để trống. Hai chế độ luyện tập vẫn dùng được; chế độ **Nộp kết quả** chưa mở để tránh thu thông tin trước khi có nơi nhận.

## Cách vận hành sau khi kích hoạt

- Học viên chọn **Nộp kết quả**, nhập họ tên, trường và lớp, rồi làm bài trên điện thoại.
- Khi nộp, website gửi mã câu và đáp án theo thứ tự gốc, kể cả khi lựa chọn đã đảo trên màn hình.
- Apps Script kiểm tra thông tin, phiên bản đề, mã buổi, bộ câu, số lượng câu, mã câu không trùng và các lựa chọn hợp lệ. Điểm do máy chủ tự tính, không lấy điểm trình duyệt gửi lên.
- Một lần ghi lưu đồng thời thông tin, tổng kết và toàn bộ câu trả lời JSON vào cùng một hàng.
- Máy chủ dùng khóa để tránh ghi đè khi nhiều học viên nộp cùng lúc; mã bài, băm nội dung và mã xác nhận giúp lần nộp lại không thêm hàng trùng.
- Website gửi POST `text/plain` không yêu cầu đọc phản hồi chéo nguồn. Sau đó kiểm tra xác nhận bằng JSONP chỉ đọc, có mã riêng ngẫu nhiên 256 bit cho mỗi bài. Không coi phản hồi `opaque` của `fetch(no-cors)` là đã lưu.
- API xác nhận không trả họ tên, trường, lớp hoặc câu trả lời; chỉ trả mã bài, điểm tổng kết, thời điểm nhận và trạng thái cho người có mã xác nhận của bài đó.
- Nếu mất mạng hoặc chưa được xác nhận, học viên giữ trang mở và bấm **Thử nộp lại**. Chưa có xác nhận thì website không hiển thị đã lưu. Không tải lại trang khi bài đang chờ xác nhận.

## Ý nghĩa các cột

| Cột | Nội dung |
|---|---|
| A–F | Mã bài, thời gian nhận của máy chủ, họ tên, trường, lớp, mã buổi |
| G–M | Chế độ, bộ câu, phiên bản đề, tổng câu, số đúng, điểm /10, tỷ lệ đúng |
| N–P | Bắt đầu, gửi bài và thời lượng do thiết bị khai báo |
| Q | Mã câu theo đúng thứ tự học viên đã làm |
| R | Đáp án gốc, thứ tự lựa chọn đã đảo, chữ cái đã chọn trên màn hình và đúng/sai |
| S–T | Giá trị băm phục vụ chống trùng, xác nhận; không tự sửa |

Thời gian nhận của máy chủ là mốc nộp chính thức. Đồng hồ và thời lượng do thiết bị khai báo không chứng minh thời lượng thi. `picked` trong JSON là chỉ số lựa chọn gốc từ **0 đến 3**; `shownLetter` là A/B/C/D học viên nhìn thấy sau khi đảo.

## Quản lý buổi học và cập nhật

- `EVENT_CODE` trong Apps Script và `eventCode` trong `config.js` phải giống nhau; hiện là `PCCC-THPT-2026`.
- Đóng nhận bài: đổi `ACCEPT_SUBMISSIONS` thành `false`, lưu và cập nhật bản triển khai web app sang phiên bản mới.
- Khi sửa ngân hàng câu hỏi hoặc đáp án: thay phiên bản ở cả hai phía; chạy `node qa/generate-backend.cjs` để sinh lại `Code.gs`, dán mã mới vào Apps Script và cập nhật bản triển khai. Giữ nguyên ID bảng và cấu trúc cột.
- Sau mỗi lần sửa Apps Script, vào **Deploy → Manage deployments → Edit → New version → Deploy**. Chỉ lưu mã mà không cập nhật deployment thì `/exec` vẫn dùng phiên bản cũ.
- Không đưa họ tên, danh sách học sinh hoặc kết quả thực tế vào GitHub. Kho GitHub chỉ chứa mã nguồn và đáp án phục vụ tuyên truyền.

## Phạm vi xác thực

Hệ thống xác thực **cấu trúc và tính hợp lệ của dữ liệu**, không chứng minh danh tính thật. Họ tên, trường, lớp do học viên tự khai. Mã buổi là thông tin tổ chức, không phải mật khẩu. Đáp án đang công khai trong trang luyện tập. Nếu tổ chức kỳ thi chính thức, cần thêm đăng nhập, quản lý lượt thi và ngân hàng đề riêng.

Apps Script có hạn mức và giới hạn số lượt thực thi đồng thời; kiểm tra thử với một nhóm nhỏ trước buổi đông học viên. Bảng kết quả chỉ dành cho người phụ trách, xử lý yêu cầu sửa/xóa dữ liệu theo quy trình của đơn vị.

## Kiểm tra sau triển khai

1. Mở URL `/exec?action=health`: phải thấy `ok: true`, `ready: true`, đúng phiên bản và mã buổi.
2. Mở website trên điện thoại, chọn **Nộp kết quả** và dùng thông tin thử nghiệm rõ ràng, ví dụ `KIEM TRA HE THONG`.
3. Nộp bài, chờ hiện mã xác nhận; đối chiếu đúng một hàng trong `Ket_qua`, đúng mã bài và điểm.
4. Kiểm tra lần nộp lại cùng mã không thêm hàng mới. Xóa hàng thử do người phụ trách thực hiện sau khi kiểm tra.

## Tài liệu kỹ thuật chính thức

- [Google Apps Script Web Apps](https://developers.google.com/apps-script/guides/web)
- [Content Service, JSONP và chuyển hướng](https://developers.google.com/apps-script/guides/content)
- [LockService để quản lý ghi đồng thời](https://developers.google.com/apps-script/reference/lock/lock-service)

Kiểm thử trong môi trường phát triển bao gồm giả lập SpreadsheetApp và luồng nộp/xác nhận. Chưa có triển khai Apps Script thật thì chưa thể xác minh ghi dữ liệu thực tế qua `/exec`.
