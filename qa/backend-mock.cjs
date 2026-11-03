// Apps Script service double: no network and no writes to a real Google Sheet.
const fs=require('fs');const path=require('path');const vm=require('vm');const crypto=require('crypto');
function createBackend() {
  const rows=[],cache=new Map(),properties=new Map();let locked=false,denyLock=false,maxRows=1000;
  function range(r,c,n=1,m=1){return {
    getValues:()=>Array.from({length:n},(_,i)=>Array.from({length:m},(_,j)=>rows[r-1+i]?.[c-1+j]??'')),
    setValues:values=>{for(let i=0;i<values.length;i++){rows[r-1+i]??=[];values[i].forEach((v,j)=>rows[r-1+i][c-1+j]=v);}return range(r,c,n,m);},
    setNumberFormat:()=>{},
    createTextFinder:needle=>({matchEntireCell:()=>({findNext:()=>{const index=rows.findIndex((row,i)=>i>=r-1&&i<r-1+n&&row[c-1]===needle);return index<0?null:{getRow:()=>index+1};}})})
  };}
  const sheet={getLastRow:()=>rows.length,getRange:range,setFrozenRows:()=>{},getMaxRows:()=>maxRows,insertRowsAfter:(_,count)=>{maxRows+=count;}};
  const book={getId:()=> 'TEST_PRIVATE_SHEET',getSheetByName:()=>sheet,insertSheet:()=>sheet,setSpreadsheetTimeZone:()=>{},getUrl:()=> 'https://docs.google.com/spreadsheets/d/TEST'};
  const sandbox={console:{log:()=>{}},PropertiesService:{getScriptProperties:()=>({getProperty:k=>properties.get(k)||null,setProperty:(k,v)=>properties.set(k,v)})},SpreadsheetApp:{getActiveSpreadsheet:()=>book,openById:()=>book,flush:()=>{}},Utilities:{DigestAlgorithm:{SHA_256:'sha256'},Charset:{UTF_8:'utf8'},computeDigest:(_,s)=>Array.from(crypto.createHash('sha256').update(s).digest())},LockService:{getScriptLock:()=>({tryLock:()=>{if(locked||denyLock)return false;locked=true;return true;},releaseLock:()=>{locked=false;}})},CacheService:{getScriptCache:()=>({put:(k,v)=>cache.set(k,v),get:k=>cache.get(k)||null})},ContentService:{MimeType:{JSON:'json',JAVASCRIPT:'js'},createTextOutput:text=>({text,setMimeType(type){this.mime=type;return this;}})}};
  vm.createContext(sandbox);vm.runInContext(fs.readFileSync(path.join(__dirname,'../apps-script/Code.gs'),'utf8'),sandbox);sandbox.setup();
  return {sandbox,rows,cache,post:payload=>JSON.parse(sandbox.doPost({postData:{contents:JSON.stringify(payload)},contentLength:Buffer.byteLength(JSON.stringify(payload))}).text),get:params=>sandbox.doGet({parameter:params}),denyLock:value=>denyLock=value};
}
module.exports={createBackend};
