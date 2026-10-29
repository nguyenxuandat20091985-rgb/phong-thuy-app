const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const source=fs.readFileSync(require('node:path').join(__dirname,'..','backup.js'),'utf8');
function createHarness(initial={}) {
 const storage=new Map(Object.entries(initial).map(([k,v])=>[k,typeof v==='string'?v:JSON.stringify(v)]));
 const elements=new Map();
 let ready=null,lastBlob=null;
 function element(id){
  if(!elements.has(id))elements.set(id,{id,value:'',textContent:'',handlers:{},addEventListener(type,fn){this.handlers[type]=fn},click(){this.clicked=true},remove(){},files:[]});
  return elements.get(id);
 }
 class FakeBlob{constructor(parts,options){this.parts=parts;this.type=options&&options.type}}
 const sandbox={
  document:{getElementById:element,addEventListener(type,fn){if(type==='DOMContentLoaded')ready=fn},createElement(tag){return element('created-'+tag)},body:{appendChild(){} }},
  localStorage:{getItem(k){return storage.has(k)?storage.get(k):null},setItem(k,v){storage.set(k,String(v))},removeItem(k){storage.delete(k)}},
  URL:{createObjectURL(blob){lastBlob=blob;return 'blob:test-backup'},revokeObjectURL(){}},
  Blob:FakeBlob,confirm(){return true},Date,JSON,Map,console
 };
 vm.runInNewContext(source,sandbox,{filename:'backup.js'});
 ready();
 return {storage,elements,element,lastBlob:()=>lastBlob};
}
(async()=>{
 const profile={birth:'20/09/1985',gender:'nam',built:'2020',facing:'Nam',bearing:'180',year:'2026',yearToCheck:'2027',housePeriod:'9',facingMountain:'S2',eventType:'Động thổ',eventDate:'2027-03-01',eventNote:'Ghi chú'};
 const event={type:'Động thổ',date:'2027-03-01',note:'Ghi chú'};
 const h=createHarness({pt_advanced_house_profile_v1:profile,pt_advanced_house_profile_v1_event:event});
 h.element('exportBackup').handlers.click();
 const exported=JSON.parse(h.lastBlob().parts[0]);
 assert.equal(exported.format,'phong-thuy-viet-backup');
 assert.deepEqual(JSON.parse(JSON.stringify(exported.data.pt_advanced_house_profile_v1)),profile);
 assert.deepEqual(JSON.parse(JSON.stringify(exported.data.pt_advanced_house_profile_v1_event)),event);

 const target=createHarness({pt_advanced_house_profile_v1:{birth:'01/01/1990',gender:'nu'}});
 const payload={format:'phong-thuy-viet-backup',version:1,exportedAt:new Date().toISOString(),data:{pt_advanced_house_profile_v1:profile,pt_advanced_house_profile_v1_event:event}};
 await target.element('importBackupFile').handlers.change({target:{files:[{size:100,text:async()=>JSON.stringify(payload)}]}});
 assert.deepEqual(JSON.parse(target.storage.get('pt_advanced_house_profile_v1')),profile);
 assert.deepEqual(JSON.parse(target.storage.get('pt_advanced_house_profile_v1_event')),event);
 assert.match(target.element('backupStatus').textContent,/Khôi phục thành công/);

 const legacy=createHarness();
 const oldPayload={format:'phong-thuy-viet-backup',version:1,data:{pt_house_notes_v2:'ghi chú cũ'}};
 await legacy.element('importBackupFile').handlers.change({target:{files:[{size:100,text:async()=>JSON.stringify(oldPayload)}]}});
 assert.equal(legacy.storage.get('pt_house_notes_v2'),JSON.stringify('ghi chú cũ'));
 assert.match(legacy.element('backupStatus').textContent,/Khôi phục thành công/);

 const invalid=createHarness({pt_advanced_house_profile_v1:{birth:'01/01/1990',gender:'nu'}});
 const badPayload={format:'phong-thuy-viet-backup',version:1,data:{pt_advanced_house_profile_v1:{birth:'20/09/1985',gender:'other'}}};
 await invalid.element('importBackupFile').handlers.change({target:{files:[{size:100,text:async()=>JSON.stringify(badPayload)}]}});
 assert.deepEqual(JSON.parse(invalid.storage.get('pt_advanced_house_profile_v1')),{birth:'01/01/1990',gender:'nu'});
 assert.match(invalid.element('backupStatus').textContent,/Không thể khôi phục/);
 console.log('Backup tests passed: advanced profile/event export, restore, legacy compatibility, invalid-data rejection.');
})().catch(error=>{console.error(error);process.exitCode=1});
