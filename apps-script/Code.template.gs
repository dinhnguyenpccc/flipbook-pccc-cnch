/* PHẢN XẠ AN TOÀN · Apps Script V8
 * File triển khai được sinh thành Code.gs bằng qa/generate-backend.cjs.
 * Chấm lại ở máy chủ; không nhận điểm do trình duyệt tự gửi.
 */
const CONFIG = Object.freeze({
  SHEET_NAME: 'Ket_qua',
  EVENT_CODE: 'PCCC-THPT-2026',
  BANK_VERSION: '2026-11-03.1',
  SITE_URL: 'https://dinhnguyenpccc.github.io/flipbook-pccc-cnch/trac-nghiem/',
  ACCEPT_SUBMISSIONS: true
});
const RESULT_HEADERS = /*HEADERS*/;
const QUESTION_BANK = /*BANK*/;

function setup() {
  const properties=PropertiesService.getScriptProperties();
  const active=SpreadsheetApp.getActiveSpreadsheet();
  const id=active?active.getId():properties.getProperty('RESULTS_SHEET_ID');
  if(!id) fail_('SETUP','Mở Apps Script từ bảng kết quả qua Tiện ích mở rộng, rồi chạy setup.');
  properties.setProperty('RESULTS_SHEET_ID',id);
  const book = SpreadsheetApp.openById(id);
  let sheet = book.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) sheet = book.insertSheet(CONFIG.SHEET_NAME);
  if (sheet.getLastRow() === 0) sheet.getRange(1, 1, 1, RESULT_HEADERS.length).setValues([RESULT_HEADERS]);
  checkHeaders_(sheet);
  sheet.setFrozenRows(1);
  book.setSpreadsheetTimeZone('Asia/Ho_Chi_Minh');
  console.log('Sẵn sàng nhận bài. Bảng kết quả: ' + book.getUrl());
}

function doPost(e) {
  let raw = null;
  try {
    const text = e && e.postData && e.postData.contents;
    if (typeof text !== 'string' || text.length > 24000 || (e.contentLength || 0) > 24000) fail_('INVALID', 'Dữ liệu bài nộp không hợp lệ.');
    try { raw = JSON.parse(text); } catch (_) { fail_('INVALID','Dữ liệu bài nộp không phải JSON hợp lệ.'); }
    const data = validateSubmission_(raw);
    const receipt = saveSubmission_(data);
    return json_({ok:true, receipt:receipt});
  } catch (error) {
    const result = {ok:false, state:'rejected', code:error.publicCode || 'SERVER', message:error.publicMessage || 'Hệ thống chưa xử lý được bài. Hãy thử lại cùng mã bài nộp.'};
    // Chỉ giữ lỗi ngắn hạn, không lưu thông tin học viên trong cache.
    if (raw && validId_(raw.submissionId) && validToken_(raw.receiptToken)) {
      try { CacheService.getScriptCache().put(cacheKey_(raw.submissionId,raw.receiptToken), JSON.stringify(result),120); } catch (_) {}
    }
    return json_(result);
  }
}

function doGet(e) {
  const params = e && e.parameter || {};
  let result;
  try {
    if (params.action === 'health') {
      checkHeaders_(sheet_());
      result = {ok:true,ready:CONFIG.ACCEPT_SUBMISSIONS,version:CONFIG.BANK_VERSION,eventCode:CONFIG.EVENT_CODE};
    } else if (params.action === 'status' && validId_(params.submissionId) && validToken_(params.receiptToken)) {
      const sheet = sheet_();
      const rowIndex = findSubmission_(sheet,params.submissionId);
      if (rowIndex) {
        const row = sheet.getRange(rowIndex,1,1,RESULT_HEADERS.length).getValues()[0];
        result = row[19] === digest_(params.receiptToken) ? {ok:true,state:'saved',receipt:receiptFromRow_(row)} : {ok:true,state:'pending'};
      } else {
        const cached = CacheService.getScriptCache().get(cacheKey_(params.submissionId,params.receiptToken));
        result = cached ? JSON.parse(cached) : {ok:true,state:'pending'};
      }
    } else result = {ok:false,state:'rejected',code:'INVALID',message:'Yêu cầu không hợp lệ.'};
  } catch (_) { result = {ok:false,state:'rejected',code:'SERVER',message:'Chưa đọc được trạng thái bài nộp. Hãy thử lại.'}; }
  // JSONP chỉ đọc, không trả họ tên, trường, lớp hoặc câu trả lời.
  const callback = params.callback;
  if (callback && /^pccc_cb_[a-f0-9]{16,64}$/.test(callback)) {
    return ContentService.createTextOutput(callback+'('+JSON.stringify(result)+');').setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return json_(result);
}

function validateSubmission_(raw) {
  if (!CONFIG.ACCEPT_SUBMISSIONS) fail_('CLOSED','Buổi nhận bài đã đóng.');
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) fail_('INVALID','Dữ liệu bài nộp không hợp lệ.');
  if (!validId_(raw.submissionId) || !validToken_(raw.receiptToken)) fail_('INVALID','Mã bài nộp không hợp lệ.');
  if (raw.bankVersion !== CONFIG.BANK_VERSION) fail_('VERSION','Phiên bản đề đã thay đổi. Hãy tải lại trang trước khi làm lượt mới.');
  if (raw.eventCode !== CONFIG.EVENT_CODE || raw.siteUrl !== CONFIG.SITE_URL || raw.mode !== 'submit') fail_('INVALID','Mã buổi hoặc nguồn bài nộp không hợp lệ.');
  if (!['all','1','2'].includes(raw.deck)) fail_('INVALID','Bộ câu hỏi không hợp lệ.');
  if (!raw.student || typeof raw.student !== 'object') fail_('INVALID','Thiếu thông tin học viên.');
  const student = {name:text_(raw.student.name,2,100),school:text_(raw.student.school,2,160),className:text_(raw.student.className,1,30)};
  if (!Array.isArray(raw.answers) || ![10,20].includes(raw.answers.length) || (raw.deck !== 'all' && raw.answers.length !== 10)) fail_('INVALID','Số câu trả lời không hợp lệ.');
  const seen = {};
  let correct = 0;
  const answers = raw.answers.map(function(a) {
    if (!a || !Number.isInteger(a.questionId) || !Number.isInteger(a.picked)) fail_('INVALID','Câu trả lời không hợp lệ.');
    const q = QUESTION_BANK[a.questionId];
    if (!q || seen[a.questionId] || (raw.deck !== 'all' && String(q.deck) !== raw.deck)) fail_('INVALID','Mã câu hỏi bị trùng hoặc không thuộc bộ đề.');
    seen[a.questionId] = true;
    if (!Array.isArray(a.order) || a.order.length !== 4 || a.order.some(v=>!Number.isInteger(v)||v<0||v>3) || new Set(a.order).size !== 4 || !a.order.includes(a.picked)) fail_('INVALID','Thứ tự lựa chọn không hợp lệ.');
    const isCorrect = a.picked === q.correct;
    if (isCorrect) correct++;
    return {questionId:a.questionId,picked:a.picked,order:a.order.slice(),shownLetter:'ABCD'[a.order.indexOf(a.picked)],correct:isCorrect};
  });
  const startedAt = parseTime_(raw.startedAt), submittedAt = parseTime_(raw.submittedAt);
  if (submittedAt < startedAt || submittedAt-startedAt > 86400000 || !Number.isInteger(raw.elapsedSeconds) || raw.elapsedSeconds < 0 || raw.elapsedSeconds > 86400) fail_('INVALID','Thời gian làm bài không hợp lệ.');
  return {submissionId:raw.submissionId,receiptToken:raw.receiptToken,student:student,eventCode:raw.eventCode,mode:'submit',deck:raw.deck,bankVersion:raw.bankVersion,startedAt:new Date(startedAt).toISOString(),submittedAt:new Date(submittedAt).toISOString(),elapsedSeconds:raw.elapsedSeconds,answers:answers,correct:correct};
}

function saveSubmission_(data) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) fail_('BUSY','Hệ thống đang nhận nhiều bài. Hãy thử lại sau ít giây.');
  try {
    const sheet = sheet_(); checkHeaders_(sheet);
    const tokenHash = digest_(data.receiptToken);
    const normalized = {student:data.student,eventCode:data.eventCode,mode:data.mode,deck:data.deck,bankVersion:data.bankVersion,startedAt:data.startedAt,submittedAt:data.submittedAt,elapsedSeconds:data.elapsedSeconds,answers:data.answers};
    const payloadHash = digest_(JSON.stringify(normalized));
    const existing = findSubmission_(sheet,data.submissionId);
    if (existing) {
      const row = sheet.getRange(existing,1,1,RESULT_HEADERS.length).getValues()[0];
      if (row[18] !== payloadHash || row[19] !== tokenHash) fail_('CONFLICT','Mã bài đã được dùng cho nội dung khác. Không thay đổi bài đang chờ xác nhận.');
      return receiptFromRow_(row);
    }
    const total = data.answers.length;
    const row = [data.submissionId,new Date(),safeCell_(data.student.name),safeCell_(data.student.school),safeCell_(data.student.className),safeCell_(data.eventCode),'Nộp kết quả',data.deck,data.bankVersion,total,data.correct,Math.round(data.correct/total*100)/10,Math.round(data.correct/total*100),data.startedAt,data.submittedAt,data.elapsedSeconds,JSON.stringify(data.answers.map(a=>a.questionId)),JSON.stringify(data.answers),payloadHash,tokenHash];
    const next = sheet.getLastRow()+1;
    if (next > sheet.getMaxRows()) sheet.insertRowsAfter(sheet.getMaxRows(),Math.max(200,next-sheet.getMaxRows()));
    // Một hàng chứa cả tổng kết và đáp án: không có trạng thái ghi nửa bài.
    sheet.getRange(next,1,1,row.length).setValues([row]);
    SpreadsheetApp.flush();
    sheet.getRange(next,2).setNumberFormat('yyyy-mm-dd hh:mm:ss');
    return receiptFromRow_(row);
  } finally { lock.releaseLock(); }
}

function sheet_() {
  const id=PropertiesService.getScriptProperties().getProperty('RESULTS_SHEET_ID');
  if(!id) fail_('SETUP','Chưa chạy hàm setup từ bảng kết quả.');
  const sheet = SpreadsheetApp.openById(id).getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) fail_('SETUP','Bảng nhận bài chưa được khởi tạo. Báo người phụ trách.');
  return sheet;
}
function checkHeaders_(sheet) {
  if (sheet.getRange(1,1,1,RESULT_HEADERS.length).getValues()[0].join('\u001f') !== RESULT_HEADERS.join('\u001f')) fail_('SETUP','Cấu trúc bảng nhận bài đã thay đổi. Báo người phụ trách.');
}
function findSubmission_(sheet,id) {
  const last = sheet.getLastRow(); if (last < 2) return 0;
  const match = sheet.getRange(2,1,last-1,1).createTextFinder(id).matchEntireCell(true).findNext();
  return match ? match.getRow() : 0;
}
function receiptFromRow_(row) {
  return {submissionId:row[0],receivedAt:new Date(row[1]).toISOString(),version:row[8],total:Number(row[9]),correct:Number(row[10]),score:Number(row[11]),percent:Number(row[12])};
}
function text_(value,min,max) {
  if (typeof value !== 'string') fail_('INVALID','Thông tin học viên không hợp lệ.');
  const clean=value.trim().replace(/\s+/g,' ');
  if (clean.length < min || clean.length > max || /[\u0000-\u001f\u007f]/.test(value)) fail_('INVALID','Thông tin học viên thiếu hoặc quá dài.');
  return clean;
}
function safeCell_(text) { return /^[=+\-@]/.test(text) ? "'"+text : text; }
function parseTime_(text) { const n=typeof text==='string'?Date.parse(text):NaN; if(!Number.isFinite(n)) fail_('INVALID','Mốc thời gian không hợp lệ.'); return n; }
function validId_(s) { return typeof s==='string' && /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(s); }
function validToken_(s) { return typeof s==='string' && /^[a-f0-9]{64}$/.test(s); }
function digest_(s) { return Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256,s,Utilities.Charset.UTF_8).map(b=>('0'+((b+256)%256).toString(16)).slice(-2)).join(''); }
function cacheKey_(id,token) { return 'receipt:'+id+':'+digest_(token); }
function json_(value) { return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON); }
function fail_(code,message) { const error=new Error(message); error.publicCode=code; error.publicMessage=message; throw error; }
