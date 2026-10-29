/* Chọn ngày làm nhà. Lịch âm Việt Nam UTC+7 qua bat-trach.js.
 * Trường phái dân gian: Tam Nương 3,7,13,18,22,27; Nguyệt Kỵ 5,14,23;
 * Sát Chủ/Thọ Tử dùng bảng phổ biến ghi dưới đây, có dị bản theo lịch/vùng.
 * Đây là bộ lọc tránh ngày kiêng, không phải khẳng định ngày đại cát hay giờ tốt.
 */
'use strict';
(function(root){
 const lunarApi=typeof module!=='undefined'&&module.exports?require('./bat-trach.js'):root.PhongThuyBatTrach;
 const STORE_KEY='pt_build_date_planner_v1',CHI=['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'],CAN=['Giáp','Ất','Bính','Đinh','Mậu','Kỷ','Canh','Tân','Nhâm','Quý'];
 const TAM_NUONG=new Set([3,7,13,18,22,27]),NGUYET_KY=new Set([5,14,23]);
 const SAT_CHU=['Tỵ','Tý','Mùi','Mão','Thân','Tuất','Sửu','Hợi','Ngọ','Dậu','Dần','Thìn'];
 const THO_TU=['Ngọ','Tỵ','Thìn','Mão','Dần','Sửu','Tý','Hợi','Tuất','Dậu','Thân','Mùi'];
 function jdFromDate(dd,mm,yy){const a=Math.floor((14-mm)/12),y=yy+4800-a,m=mm+12*a-3;let jd=dd+Math.floor((153*m+2)/5)+365*y+Math.floor(y/4)-Math.floor(y/100)+Math.floor(y/400)-32045;if(jd<2299161)jd=dd+Math.floor((153*m+2)/5)+365*y+Math.floor(y/4)-32083;return jd;}
 function dayCycle(date){const n=jdFromDate(date.getUTCDate(),date.getUTCMonth()+1,date.getUTCFullYear());const canIndex=((n+9)%10+10)%10,chiIndex=((n+1)%12+12)%12;return{can:CAN[canIndex],chi:CHI[chiIndex],index:((n+49)%60+60)%60};}
 function isoDate(d){return d.getUTCFullYear()+'-'+String(d.getUTCMonth()+1).padStart(2,'0')+'-'+String(d.getUTCDate()).padStart(2,'0');}
 function parseBirthYear(v){const n=Number(v);return Number.isInteger(n)&&n>=1900&&n<=2099?n:null;}
 function analyzeDate(date,birthYear){
  if(!(date instanceof Date)||Number.isNaN(date.getTime())||!lunarApi)return null;
  const lunar=lunarApi.convertSolarToLunar(date.getUTCDate(),date.getUTCMonth()+1,date.getUTCFullYear(),7);if(!lunar)return null;
  const cyc=dayCycle(date),reasons=[];
  if(TAM_NUONG.has(lunar.day))reasons.push('Tam Nương');
  if(NGUYET_KY.has(lunar.day))reasons.push('Nguyệt Kỵ');
  if(SAT_CHU[lunar.month-1]===cyc.chi)reasons.push('Sát Chủ (bảng dân gian)');
  if(THO_TU[lunar.month-1]===cyc.chi)reasons.push('Thọ Tử (bảng dân gian)');
  const by=parseBirthYear(birthYear),birthBranch=by===null?null:CHI[((by-1984)%12+12)%12];
  if(birthBranch&&cyc.chi===CHI[(CHI.indexOf(birthBranch)+6)%12])reasons.push('Ngày xung tuổi '+birthBranch);
  return{date:isoDate(date),lunar,canChi:cyc.can+' '+cyc.chi,dayBranch:cyc.chi,birthBranch,reasons,eligible:reasons.length===0};
 }
 function getCandidates(o){
  const birth=parseBirthYear(o&&o.birthLunarYear),days=Number(o&&o.windowDays);
  if(birth===null)throw new RangeError('Nhập năm sinh âm lịch từ 1900 đến 2099.');
  if(![30,60,90].includes(days))throw new RangeError('Chọn khoảng 30, 60 hoặc 90 ngày.');
  const now=o&&o.startDate instanceof Date?o.startDate:new Date();
  const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Ho_Chi_Minh',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now);
  const p=t=>parts.find(x=>x.type===t).value,start=new Date(Date.UTC(Number(p('year')),Number(p('month'))-1,Number(p('day')))),all=[];
  for(let i=0;i<days;i++){const d=new Date(start.getTime()+i*86400000),x=analyzeDate(d,birth);if(x)all.push(x);}
  return{birthLunarYear:birth,windowDays:days,activity:String(o.activity||'Động thổ'),school:'Âm lịch Việt Nam UTC+7; Tam Nương, Nguyệt Kỵ, Sát Chủ/Thọ Tử theo các bảng dân gian được chú thích; xung tuổi theo địa chi năm sinh âm lịch.',days:all.filter(x=>x.eligible),excluded:all.filter(x=>!x.eligible),checked:all.length};
 }
 function loadConfig(){try{const v=JSON.parse(root.localStorage.getItem(STORE_KEY)||'null');return v&&typeof v==='object'?v:null;}catch(_){return null;}}
 function saveConfig(c){if(!c||parseBirthYear(c.birthLunarYear)===null||![30,60,90].includes(Number(c.windowDays))||!['Động thổ','Đổ mái','Nhập trạch','An vị bàn thờ'].includes(c.activity))return false;try{root.localStorage.setItem(STORE_KEY,JSON.stringify({birthLunarYear:Number(c.birthLunarYear),windowDays:Number(c.windowDays),activity:c.activity}));return true;}catch(_){return false;}}
 const api=Object.freeze({analyzeDate,getCandidates,dayCycle,parseBirthYear,loadConfig,saveConfig,STORE_KEY});
 if(typeof module!=='undefined'&&module.exports)module.exports=api;
 if(root)root.PhongThuyNgayLamNha=api;
})(typeof window!=='undefined'?window:globalThis);
