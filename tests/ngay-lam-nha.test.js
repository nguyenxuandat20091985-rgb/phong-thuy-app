const assert=require('node:assert/strict');const planner=require('../ngay-lam-nha.js');const lunar=require('../bat-trach.js');const d=s=>{const[y,m,day]=s.split('-').map(Number);return new Date(Date.UTC(y,m-1,day));};
// Five Vietnamese almanac comparisons for lunar date and can-chi, November 2026.
const refs=[['2026-11-02',24,9,2026,'Canh Thìn'],['2026-11-03',25,9,2026,'Tân Tỵ'],['2026-11-07',29,9,2026,'Ất Dậu'],['2026-11-09',1,10,2026,'Đinh Hợi'],['2026-11-11',3,10,2026,'Kỷ Sửu']];
for(const[iso,day,month,year,cc]of refs){const date=d(iso),actual=lunar.convertSolarToLunar(date.getUTCDate(),date.getUTCMonth()+1,date.getUTCFullYear(),7);assert.deepEqual([actual.day,actual.month,actual.year],[day,month,year],'lunar date '+iso);assert.equal(planner.analyzeDate(date,1985).canChi,cc,'can chi '+iso);}
assert.equal(planner.analyzeDate(d('2026-11-13'),1985).reasons.includes('Nguyệt Kỵ'),true);
assert.equal(planner.analyzeDate(d('2026-11-11'),1985).reasons.includes('Tam Nương'),true);
assert.equal(planner.parseBirthYear('1985'),1985);assert.equal(planner.parseBirthYear('1800'),null);
assert.throws(()=>planner.getCandidates({birthLunarYear:1985,windowDays:45,startDate:d('2026-11-01')}),/30, 60 hoặc 90/);
const c=planner.getCandidates({birthLunarYear:1985,windowDays:30,activity:'Động thổ',startDate:d('2026-11-01')});assert.equal(c.checked,30);assert.ok(c.days.every(x=>x.eligible));
global.localStorage={data:new Map(),getItem(k){return this.data.has(k)?this.data.get(k):null;},setItem(k,v){this.data.set(k,String(v));},removeItem(k){this.data.delete(k);}};assert.equal(planner.saveConfig({birthLunarYear:1985,windowDays:60,activity:'Đổ mái'}),true);assert.equal(planner.saveConfig({birthLunarYear:1985,windowDays:60,activity:'Sai'}),false);
console.log('Build-date planner tests passed: 5 almanac date comparisons, day-cycle/taboo filters, validation and candidate generation.');
