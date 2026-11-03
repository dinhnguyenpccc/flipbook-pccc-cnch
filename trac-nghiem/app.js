(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const bank = window.QUIZ_QUESTIONS;
  const core = window.QuizCore;
  const config = window.QUIZ_CONFIG;
  const submission = window.QuizSubmission;
  const sources = new Map(window.QUIZ_SOURCES.map(s => [s.id, s]));
  core.validate(bank);
  let session = [], position = 0, mode = 'practice', finished = false;
  let learner = null, timing = null, pendingSubmission = null, receivedReceipt = null, submissionBusy = false, starting = false;
  const labels = ['A', 'B', 'C', 'D'];
  const storageKey = 'pccc-quiz-best-v1';
  let best = {};
  try { best = JSON.parse(localStorage.getItem(storageKey) || '{}') || {}; } catch (_) { best = {}; }
  function el(tag, className, text) { const e = document.createElement(tag); if (className) e.className = className; if (text !== undefined) e.textContent = text; return e; }
  function sourceLinks(ids) {
    const box = el('div', 'source-links');
    for (const id of ids || []) { const s = sources.get(id); if (!s) continue; const a = el('a', '', s.name + ' ↗'); a.href = s.url; a.target = '_blank'; a.rel = 'noopener noreferrer'; box.append(a); }
    return box;
  }
  const sourceGrid = el('div', 'source-grid');
  for (const s of sources.values()) { const a = el('a', '', s.name + ' ↗'); a.href = s.url; a.target = '_blank'; a.rel = 'noopener noreferrer'; sourceGrid.append(a); }
  $('source-list').append(sourceGrid);
  function show(view) { ['home', 'quiz', 'result'].forEach(id => $(id).hidden = id !== view); window.scrollTo({top:0, behavior:'instant'}); }
  function refreshBest() {
    const scores = Object.values(best).filter(v => v && Number.isFinite(v.percent));
    $('best').hidden = !scores.length;
    if (scores.length) $('best').textContent = 'Dấu mốc trên thiết bị này: ' + Math.max(...scores.map(v => v.percent)) + '% câu đúng. Luyện thêm một lượt nhé!';
  }
  function updateSetup() {
    const restricted = $('deck').value !== 'all';
    $('count').querySelector('option[value="20"]').disabled = restricted;
    if (restricted) $('count').value = '10';
  }
  $('deck').addEventListener('change', updateSetup);
  $('submit-mode').disabled = !submission.configured(config);
  if ($('submit-mode').disabled) { $('connection-note').hidden=false; $('connection-note').textContent='Chế độ nộp kết quả chưa mở. Bạn vẫn có thể luyện tập và thử thách.'; }
  function updateMode() {
    const value=document.querySelector('[name="mode"]:checked').value;
    $('start').firstChild.textContent=value==='practice'?'Bắt đầu luyện tập ':value==='challenge'?'Bắt đầu thử thách ':'Bắt đầu làm bài ';
    $('learner-form').hidden=value!=='submit';
    $('learner-form').querySelectorAll('input').forEach(i=>i.disabled=value!=='submit');
  }
  document.querySelectorAll('[name="mode"]').forEach(input => input.addEventListener('change',updateMode));
  $('learner-form').addEventListener('submit',event=>{event.preventDefault();$('start').click();});
  $('start').addEventListener('click', async () => {
    if(starting)return;
    const chosenMode = document.querySelector('[name="mode"]:checked').value;
    if(chosenMode==='submit') {
      if(!submission.configured(config))return;
      $('learner-form').querySelectorAll('input').forEach(i=>i.value=i.value.trim());
      if(!$('learner-form').reportValidity())return;
      starting=true;$('start').disabled=true;$('connection-note').hidden=false;$('connection-note').textContent='Đang kiểm tra kết nối nhận bài…';
      try {
        const health=await submission.health(config);
        if(!health.ok||!health.ready||health.version!==config.bankVersion||health.eventCode!==config.eventCode)throw new Error('Buổi nhận bài chưa sẵn sàng hoặc đề đã thay đổi. Báo người phụ trách và tải lại trang.');
      }catch(error){$('connection-note').textContent=error.message;return;}finally{starting=false;$('start').disabled=false;}
      if(chosenMode!==document.querySelector('[name="mode"]:checked').value)return;
      learner={name:$('student-name').value,school:$('student-school').value,className:$('student-class').value};
      $('connection-note').hidden=true;
    }else learner=null;
    mode=chosenMode;
    session = core.makeSession(bank, $('deck').value, Number($('count').value));
    position = 0; finished = false;
    timing={startedAt:new Date().toISOString(),startTick:performance.now()};pendingSubmission=null;receivedReceipt=null;submissionBusy=false;
    $('submission-status').hidden=true;$('saved-receipt').hidden=true;
    show('quiz'); renderQuestion();
  });
  function renderQuestion() {
    const q = session[position], showAnswers = mode === 'practice' && q.checked, locked = showAnswers || !!pendingSubmission;
    $('mode-label').textContent = mode === 'practice' ? 'Luyện tập · giải thích từng câu' : mode==='challenge'?'Thử thách · chấm cuối lượt':'Nộp kết quả · chấm khi nộp';
    $('counter').textContent = 'Câu ' + (position + 1).toString().padStart(2,'0') + ' / ' + session.length;
    const answered = session.filter(x => x.choice !== null).length;
    $('answered').textContent = 'Đã chọn ' + answered + '/' + session.length;
    const percent = Math.round(answered / session.length * 100);
    $('progress').setAttribute('aria-valuenow', String(percent)); $('progress').firstElementChild.style.width = percent + '%';
    $('topic').textContent = q.topic;
    $('original').textContent = 'Tình huống ' + String(q.id).padStart(2,'0');
    $('question-title').textContent = q.prompt;
    $('hint').open = false; $('hint-text').textContent = q.hint;
    $('answers').querySelectorAll('.answer').forEach(e => e.remove());
    q.options.forEach((option, index) => {
      const label = el('label', 'answer');
      const input = document.createElement('input'); input.type = 'radio'; input.name = 'answer'; input.value = String(index); input.checked = q.choice === index; input.disabled = locked;
      const content = el('span', 'choice-content'); content.append(el('span', 'letter', labels[index]), el('span', 'answer-text', option.text));
      if (locked) {
        label.classList.add('locked');
        if (showAnswers && option.correct) { label.classList.add('correct'); content.append(el('span','answer-state','✓ Đúng')); }
        else if (showAnswers && q.choice === index) { label.classList.add('wrong'); content.append(el('span','answer-state','✕ Đã chọn')); }
      }
      input.addEventListener('change', () => {
        q.choice = index; $('question-error').hidden = true;
        const n = session.filter(x => x.choice !== null).length;
        $('answered').textContent = 'Đã chọn ' + n + '/' + session.length;
        const p = Math.round(n/session.length*100); $('progress').setAttribute('aria-valuenow', String(p)); $('progress').firstElementChild.style.width = p + '%';
      });
      label.append(input, content); $('answers').append(label);
    });
    $('previous').disabled = position === 0 || !!pendingSubmission;
    $('check').hidden = mode !== 'practice' || locked;
    $('next').hidden = mode === 'practice' && !locked;
    $('next').disabled=submissionBusy;
    $('exit').disabled=submissionBusy;
    $('next').textContent = position === session.length - 1 ? (mode==='submit' ? (submissionBusy?'Đang nộp…':pendingSubmission?'Thử nộp lại →':'Nộp bài & lưu kết quả →') : 'Xem kết quả →') : 'Câu tiếp theo →';
    $('feedback').hidden = !showAnswers; $('feedback').replaceChildren();
    if (showAnswers) renderFeedback(q);
    $('question-error').hidden = true;
    $('question-title').focus({preventScroll:true});
  }
  function renderFeedback(q) {
    const chosen = q.options[q.choice], correct = q.options.find(o => o.correct);
    const box = $('feedback'); box.className = chosen.correct ? '' : 'incorrect';
    box.append(el('h3','',chosen.correct ? 'Đúng rồi. Bạn đã nhận diện được nguy cơ.' : 'Cùng nhìn lại lựa chọn này.'));
    box.append(el('p','',chosen.feedback));
    if (!chosen.correct) { box.append(el('p','', 'Phương án an toàn: ' + correct.text), el('p','',correct.feedback)); }
    box.append(sourceLinks(q.sources));
  }
  $('check').addEventListener('click', () => {
    const q = session[position];
    if (q.choice === null) { $('question-error').hidden = false; $('answers').querySelector('input').focus(); return; }
    q.checked = true; renderQuestion(); $('feedback').scrollIntoView({block:'nearest',behavior:'instant'}); $('next').focus({preventScroll:true});
  });
  $('next').addEventListener('click', async () => {
    if(submissionBusy)return;
    if (session[position].choice === null) { $('question-error').hidden = false; $('answers').querySelector('input').focus(); return; }
    if (position === session.length - 1) { if(mode==='submit')await submitCurrent();else finish(); return; }
    position++; renderQuestion(); $('quiz').scrollIntoView({block:'start',behavior:'instant'});
  });
  $('previous').addEventListener('click', () => { if (position > 0) { position--; renderQuestion(); } });
  async function submitCurrent() {
    if(session.some(q=>q.choice===null))return;
    if(!pendingSubmission)pendingSubmission=submission.buildPayload(config,session,learner,timing,$('deck').value);
    submissionBusy=true;renderQuestion();$('submission-status').hidden=false;
    const notify=text=>$('submission-status').textContent=text;
    notify('Đang gửi bài. Giữ trang mở đến khi nhận được xác nhận.');
    try {
      receivedReceipt=await submission.send(config,pendingSubmission,notify);
      finish(receivedReceipt);
    }catch(error){notify(error.message);}finally{submissionBusy=false;if(!receivedReceipt)renderQuestion();}
  }
  function finish(receipt=null) {
    if (session.some(q => q.choice === null)) return;
    finished = true; const correct = receipt?receipt.correct:core.score(session), total = session.length, percent = Math.round(correct/total*100);
    const key = mode + ':' + $('deck').value + ':' + total;
    const previousBest = best[key] && Number.isFinite(best[key].percent) ? best[key].percent : -1;
    if (percent > previousBest) { best[key] = {percent,correct,total}; try { localStorage.setItem(storageKey,JSON.stringify(best)); } catch (_) {} }
    $('score').textContent = String(correct); $('score-total').textContent = '/ ' + total + ' câu đúng';
    document.querySelector('.score-disc').style.setProperty('--score-angle', (correct / total * 360) + 'deg');
    $('result-message').textContent = percent === 100 ? 'Một lượt làm bài rất chắc chắn.' : percent >= 80 ? 'Bạn đã có nền tảng tốt.' : percent >= 50 ? 'Đã hiểu thêm, cùng củng cố tiếp.' : 'Bắt đầu từ những điều cần nhớ nhất.';
    $('result-detail').textContent = 'Bạn trả lời đúng ' + percent + '% tình huống. ' + (correct === total ? 'Tiếp tục thực hành cùng người hướng dẫn để biến kiến thức thành kỹ năng.' : 'Xem lại ' + (total-correct) + ' câu cần ôn và tìm hiểu lý do phía sau mỗi đáp án.');
    $('result-best').textContent = 'Kết quả tốt nhất cho cùng chế độ, bộ câu và số câu trên thiết bị này: ' + best[key].percent + '%.';
    $('review-wrong').textContent = 'Câu cần ôn (' + (total-correct) + ')';
    $('saved-receipt').hidden=!receipt;
    if(receipt)$('saved-receipt').textContent='✓ Đã được hệ thống xác nhận lưu kết quả. Mã bài: '+receipt.submissionId+'. Nhận lúc '+new Intl.DateTimeFormat('vi-VN',{dateStyle:'short',timeStyle:'medium',timeZone:'Asia/Ho_Chi_Minh'}).format(new Date(receipt.receivedAt))+'.';
    show('result'); renderReview(false); refreshBest(); $('result-title').focus({preventScroll:true});
  }
  function renderReview(wrongOnly) {
    const container = $('review-list'); container.replaceChildren();
    $('review-wrong').setAttribute('aria-pressed', String(wrongOnly)); $('review-all').setAttribute('aria-pressed', String(!wrongOnly));
    const filtered = session.filter(q => !wrongOnly || !q.options[q.choice].correct);
    if (!filtered.length) { container.append(el('p','empty-review','Không có câu sai trong lượt này. Bạn có thể làm lượt mới để củng cố kiến thức.')); return; }
    filtered.forEach(q => {
      const chosen = q.options[q.choice], correct = q.options.find(o => o.correct);
      const details = el('details','review-card' + (chosen.correct ? '' : ' missed'));
      if (wrongOnly) details.open = true;
      const summary = el('summary'); summary.append(el('span','review-status',chosen.correct ? '✓ Đúng' : 'Cần ôn'), document.createTextNode('Tình huống ' + q.id + ' · ' + q.title));
      details.append(summary,el('p','',q.prompt),el('p','', 'Bạn chọn: ' + chosen.text));
      if (!chosen.correct) details.append(el('p','',chosen.feedback));
      details.append(el('p','', 'Đáp án: ' + correct.text),el('p','',correct.feedback),sourceLinks(q.sources)); container.append(details);
    });
  }
  $('review-wrong').addEventListener('click', () => renderReview(true)); $('review-all').addEventListener('click', () => renderReview(false));
  $('restart').addEventListener('click', () => { show('home'); $('start').focus({preventScroll:true}); });
  $('exit').addEventListener('click', () => { if(!submissionBusy)$('exit-dialog').showModal(); });
  $('cancel-exit').addEventListener('click', () => $('exit-dialog').close());
  $('confirm-exit').addEventListener('click', () => { if(submissionBusy)return;$('exit-dialog').close(); session=[];pendingSubmission=null;learner=null; show('home'); $('start').focus({preventScroll:true}); });
  window.addEventListener('beforeunload', event => { if (session.length && !finished && !$('quiz').hidden && session.some(q=>q.choice!==null)) { event.preventDefault(); event.returnValue=''; } });
  document.addEventListener('keydown', event => {
    if ($('quiz').hidden || $('exit-dialog').open || /INPUT|SELECT|TEXTAREA/.test(document.activeElement.tagName)) return;
    if (/^[1-4]$/.test(event.key)) { const input = $('answers').querySelectorAll('input')[Number(event.key)-1]; if (!input.disabled) { input.checked=true; input.dispatchEvent(new Event('change')); input.focus(); } }
  });
  updateSetup();updateMode(); refreshBest();
})();
