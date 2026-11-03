const fs=require('fs');const path=require('path');const vm=require('vm');
const root=path.resolve(__dirname,'..');const s={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(root,'trac-nghiem/questions.js'),'utf8'),s);
const headers=['Mã bài nộp','Thời gian nhận (máy chủ)','Họ và tên','Trường','Lớp','Mã buổi','Chế độ','Bộ câu','Phiên bản đề','Số câu','Số đúng','Điểm / 10','Tỷ lệ đúng (%)','Bắt đầu (thiết bị)','Gửi bài (thiết bị)','Thời gian làm (giây, thiết bị)','Thứ tự mã câu (JSON)','Câu trả lời (JSON)','Băm nội dung','Băm mã xác nhận'];
const bank=Object.fromEntries(s.window.QUIZ_QUESTIONS.map(q=>[q.id,{deck:q.deck,correct:q.correct}]));
const template=fs.readFileSync(path.join(root,'apps-script/Code.template.gs'),'utf8');
fs.writeFileSync(path.join(root,'apps-script/Code.gs'),template.replace('/*HEADERS*/',JSON.stringify(headers)).replace('/*BANK*/',JSON.stringify(bank)));
console.log('Generated Code.gs with '+Object.keys(bank).length+' answer keys and '+headers.length+' columns.');
