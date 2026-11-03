(function (root) {
  'use strict';
  function shuffle(items, rng = Math.random) {
    const a = [...items];
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }
  function validate(bank) {
    const ids = new Set();
    for (const q of bank) {
      if (ids.has(q.id) || !q.prompt || !q.hint || !q.topic || ![1, 2].includes(q.deck) || q.options.length !== 4 || new Set(q.options.map(o => o.text)).size !== 4 || q.options.some(o => !o.text || !o.feedback) || !Number.isInteger(q.correct) || q.correct < 0 || q.correct > 3) throw new Error('Câu hỏi không hợp lệ: ' + q.id);
      ids.add(q.id);
    }
    return true;
  }
  function makeSession(bank, deck, count, rng = Math.random) {
    return shuffle(bank.filter(q => deck === 'all' || String(q.deck) === String(deck)), rng).slice(0, count).map(q => ({ ...q, options: shuffle(q.options.map((o, i) => ({...o, value:i, correct: i === q.correct})), rng), choice: null, checked: false }));
  }
  function score(session) { return session.filter(q => q.choice !== null && q.options[q.choice].correct).length; }
  const api = { shuffle, validate, makeSession, score };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.QuizCore = api;
})(typeof window !== 'undefined' ? window : globalThis);
