/* Dán URL triển khai Web app kết thúc bằng /exec, không dùng URL /dev.
 * Để trống khi chưa triển khai: trang vẫn cho luyện tập, chưa thu thông tin.
 * Mã buổi không phải mật khẩu và không xác thực danh tính học viên.
 */
window.QUIZ_CONFIG = Object.freeze({
  endpoint: '',
  bankVersion: '2026-11-03.1',
  eventCode: 'PCCC-THPT-2026',
  siteUrl: 'https://dinhnguyenpccc.github.io/flipbook-pccc-cnch/trac-nghiem/'
});
