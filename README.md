# Sổ tay an toàn PCCC & CNCH

Flipbook 29 trang về phòng cháy, chữa cháy, thoát nạn, cứu nạn và sơ cấp cứu.

## Đưa lên GitHub Pages

1. Trên GitHub, tạo repository **Public**, ví dụ `flipbook-pccc-cnch`.
2. Giải nén gói này. Trong repository, chọn **Add file → Upload files** và tải các file nằm bên trong gói lên thư mục gốc; không tải nguyên file ZIP. `index.html` phải nằm ngay ở thư mục gốc.
3. Commit các file lên nhánh `main`.
4. Mở **Settings → Pages → Build and deployment**. Chọn **Deploy from a branch**, nhánh **main**, thư mục **/(root)** rồi **Save**.
5. Chờ GitHub hiển thị địa chỉ website và mở bằng **Visit site**.

Với tài khoản `dinhnguyenpccc` và repository `flipbook-pccc-cnch`, địa chỉ dự kiến là `https://dinhnguyenpccc.github.io/flipbook-pccc-cnch/`. Địa chỉ chỉ hoạt động sau khi xuất bản thành công.

## Các file

- `index.html`: trình đọc và nội dung flipbook; hình ảnh đã được nhúng sẵn.
- `So_tay_PCCC_CNCH.pdf`: bản tải xuống qua nút PDF; giữ nguyên tên và đặt cùng thư mục với `index.html`.
- `.nojekyll`: phục vụ trực tiếp các file web tĩnh.

Không cần cài Node.js, Python, cơ sở dữ liệu hoặc máy chủ riêng để chạy website. Các liên kết nguồn Google Drive vẫn tuân theo quyền truy cập của tài liệu gốc.

Tài liệu chính thức về cấu hình: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
