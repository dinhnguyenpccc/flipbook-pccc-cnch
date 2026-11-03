const assert=require('assert/strict');const crypto=require('crypto');const fs=require('fs');const vm=require('vm');
const {createBackend}=require('./backend-mock.cjs');const backend=createBackend();
const context={window:{}};vm.runInNewContext(fs.readFileSync(require('path').join(__dirname,'../trac-nghiem/questions.js'),'utf8'),context);
const bank=context.window.QUIZ_QUESTIONS;
function payload(){return {submissionId:crypto.randomUUID(),receiptToken:crypto.randomBytes(32).toString('hex'),student:{name:'KIEM TRA HE THONG',school:'TRUONG THU NGHIEM',className:'11A1'},eventCode:'PCCC-THPT-2026',mode:'submit',siteUrl:'https://dinhnguyenpccc.github.io/flipbook-pccc-cnch/trac-nghiem/',bankVersion:'2026-11-03.1',deck:'all',startedAt:'2026-11-03T08:00:00Z',submittedAt:'2026-11-03T08:10:00Z',elapsedSeconds:600,answers:bank.map(q=>({questionId:q.id,picked:q.correct,order:[2,0,3,1]})),clientScore:999};}
const p=payload();let result=backend.post(p);assert(result.ok);assert.equal(result.receipt.correct,20);assert.equal(result.receipt.score,10);assert.equal(backend.rows.length,2);
const receivedAt=result.receipt.receivedAt;
result=backend.post(p);assert(result.ok);assert.equal(backend.rows.length,2);assert.equal(result.receipt.receivedAt,receivedAt);
let changed=structuredClone(p);changed.answers[0].picked=(changed.answers[0].picked+1)%4;assert.equal(backend.post(changed).code,'CONFLICT');assert.equal(backend.rows.length,2);
const status=JSON.parse(backend.get({action:'status',submissionId:p.submissionId,receiptToken:p.receiptToken}).text);assert.equal(status.state,'saved');assert.equal(status.receipt.correct,20);assert(!JSON.stringify(status).includes(p.student.name));assert(!JSON.stringify(status).includes('school'));
const denied=JSON.parse(backend.get({action:'status',submissionId:p.submissionId,receiptToken:'f'.repeat(64)}).text);assert.equal(denied.state,'pending');assert(!denied.receipt);
const countBefore=backend.rows.length;
const changes=[d=>d.bankVersion='old',d=>d.eventCode='wrong',d=>d.student.name='',d=>d.answers[0].picked=99,d=>d.answers[0].order=[0,0,2,3],d=>d.answers[0].questionId=999,d=>d.answers[1].questionId=d.answers[0].questionId,d=>d.deck='1',d=>d.answers.pop(),d=>d.startedAt='invalid',d=>d.submittedAt='2026-11-02T00:00:00Z',d=>d.receiptToken='bad',d=>d.mode='practice'];
for(const change of changes){const bad=payload();change(bad);const r=backend.post(bad);assert.equal(r.ok,false);assert.equal(backend.rows.length,countBefore);}
const rejected=payload();rejected.bankVersion='old';backend.post(rejected);assert.equal(JSON.parse(backend.get({action:'status',submissionId:rejected.submissionId,receiptToken:rejected.receiptToken}).text).code,'VERSION');
const malicious=payload();malicious.student.name='=IMPORTXML("x","y")';assert(backend.post(malicious).ok);assert(backend.rows.at(-1)[2].startsWith("'="));
const q=payload();q.answers=q.answers.slice(0,10);q.answers.forEach(a=>a.picked=(a.picked+1)%4);const wrong=backend.post(q);assert.equal(wrong.receipt.correct,0);assert.equal(wrong.receipt.score,0);
const callback=backend.get({action:'health',callback:'pccc_cb_0123456789abcdef'});assert(callback.text.startsWith('pccc_cb_0123456789abcdef('));assert.equal(callback.mime,'js');
const injection=backend.get({action:'health',callback:'alert(1)//'});assert.equal(injection.mime,'json');assert(!injection.text.includes('alert'));
backend.denyLock(true);assert.equal(backend.post(payload()).code,'BUSY');backend.denyLock(false);
backend.rows[0][0]='BROKEN';assert.equal(backend.post(payload()).code,'SETUP');assert.equal(backend.rows[0][0],'BROKEN');
console.log('PASS: authoritative scoring, shuffled options, 13 validation rejections, idempotent retry, payload conflict, private receipt, JSONP callback validation, formula escaping, lock contention, schema protection.');
module.exports={payload};
