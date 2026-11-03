(function(root){
  'use strict';
  const endpointPattern=/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/;
  function configured(config) { return !!config && endpointPattern.test(config.endpoint); }
  function randomHex(bytes) { const a=new Uint8Array(bytes); crypto.getRandomValues(a); return Array.from(a,b=>b.toString(16).padStart(2,'0')).join(''); }
  function newId() { const h=randomHex(16); return h.slice(0,8)+'-'+h.slice(8,12)+'-'+h.slice(12,16)+'-'+h.slice(16,20)+'-'+h.slice(20); }
  function buildPayload(config,session,student,timing,deck) {
    return {submissionId:newId(),receiptToken:randomHex(32),bankVersion:config.bankVersion,eventCode:config.eventCode,siteUrl:config.siteUrl,mode:'submit',deck:String(deck),student:{name:student.name.trim(),school:student.school.trim(),className:student.className.trim()},startedAt:timing.startedAt,submittedAt:new Date().toISOString(),elapsedSeconds:Math.max(0,Math.round((performance.now()-timing.startTick)/1000)),answers:session.map(q=>({questionId:q.id,picked:q.options[q.choice].value,order:q.options.map(o=>o.value)}))};
  }
  function jsonp(config,params,timeout=10000) {
    return new Promise((resolve,reject)=>{
      if(!configured(config)){reject(new Error('Hệ thống nhận bài chưa được kết nối.'));return;}
      const callback='pccc_cb_'+randomHex(12), script=document.createElement('script');
      const url=new URL(config.endpoint);Object.entries({...params,callback}).forEach(([k,v])=>url.searchParams.set(k,v));
      let timer;
      function cleanup(){clearTimeout(timer);script.remove();delete root[callback];}
      root[callback]=value=>{cleanup();resolve(value);};
      script.referrerPolicy='no-referrer';script.src=url.href;script.onerror=()=>{cleanup();reject(new Error('Không liên lạc được hệ thống nhận bài.'));};
      timer=setTimeout(()=>{cleanup();reject(new Error('Chưa nhận được phản hồi từ hệ thống.'));},timeout);
      document.head.append(script);
    });
  }
  async function send(config,payload,notify=()=>{}) {
    if(!configured(config))throw new Error('Hệ thống nhận bài chưa được kết nối.');
    // Không coi fetch no-cors thành công là bằng chứng dữ liệu đã được lưu.
    const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),12000);
    try{await fetch(config.endpoint,{method:'POST',mode:'no-cors',credentials:'omit',redirect:'follow',referrerPolicy:'no-referrer',headers:{'Content-Type':'text/plain;charset=UTF-8'},body:JSON.stringify(payload),signal:controller.signal});}catch(_){}finally{clearTimeout(timeout);}
    for(let attempt=0;attempt<6;attempt++){
      notify('Đang chờ hệ thống xác nhận đã lưu ('+(attempt+1)+'/6)…');
      try{
        const status=await jsonp(config,{action:'status',submissionId:payload.submissionId,receiptToken:payload.receiptToken});
        if(status.state==='saved' && status.ok && status.receipt && status.receipt.submissionId===payload.submissionId && status.receipt.version===config.bankVersion && status.receipt.total===payload.answers.length && Number.isInteger(status.receipt.correct) && status.receipt.correct>=0 && status.receipt.correct<=status.receipt.total && Number.isFinite(Date.parse(status.receipt.receivedAt)))return status.receipt;
        if(status.state==='rejected'){const e=new Error(status.message||'Hệ thống chưa chấp nhận bài nộp.');e.serverRejected=true;throw e;}
      }catch(error){if(error.serverRejected)throw error;}
      if(attempt<5)await new Promise(r=>setTimeout(r,1500+attempt*500));
    }
    throw new Error('Chưa xác nhận được bài đã lưu. Giữ trang này và thử nộp lại; hệ thống sẽ dùng cùng mã bài để tránh ghi trùng.');
  }
  root.QuizSubmission={configured,buildPayload,send,health:config=>jsonp(config,{action:'health'})};
})(window);
