/* 
 * Phép tính dân gian Việt Nam phổ biến để tham khảo năm làm nhà.
 * Kim Lâu: tuổi mụ % 9 in {1,3,6,8}.
 * Hoang Ốc: mốc hàng chục 10/20/30/40/50/60 lần lượt vào sáu cung;
 *           từ mốc hàng chục đếm tiếp từng tuổi qua vòng sáu cung.
 * Tam Tai: xét nhóm tam hợp của năm sinh âm lịch và chi năm âm lịch cần xem.
 * Đây là quy ước văn hóa, không phải kết luận khoa học.
 */
'use strict';
const HOANG_OC = [
 {number:1,name:'Nhất Cát',favorable:true},
 {number:2,name:'Nhì Nghi',favorable:true},
 {number:3,name:'Tam Địa Sát',favorable:false},
 {number:4,name:'Tứ Tấn Tài',favorable:true},
 {number:5,name:'Ngũ Thọ Tử',favorable:false},
 {number:6,name:'Lục Hoang Ốc',favorable:false}
];
const KIM_LAU_NAMES={1:'Kim Lâu Thân',3:'Kim Lâu Thê',6:'Kim Lâu Tử',8:'Kim Lâu Lục Súc'};
const CHI=['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'];
const TAM_TAI_GROUPS=[
 {birth:['Thân','Tý','Thìn'],target:['Dần','Mão','Thìn']},
 {birth:['Dần','Ngọ','Tuất'],target:['Thân','Dậu','Tuất']},
 {birth:['Hợi','Mão','Mùi'],target:['Tỵ','Ngọ','Mùi']},
 {birth:['Tỵ','Dậu','Sửu'],target:['Hợi','Tý','Sửu']}
];
function calcKimLau(age){
 if(!Number.isInteger(age)||age<1||age>200)return null;
 const remainder=age%9,kind=KIM_LAU_NAMES[remainder]||null;
 return {age,remainder,name:kind||'Không phạm Kim Lâu',favorable:!kind};
}
function calcHoangOc(age){
 if(!Number.isInteger(age)||age<1||age>200)return null;
 // Under 10, count from age 1 at Nhất Cát; from age 10, use decade anchors.
 const index=age<10?(age-1)%6:(Math.floor(age/10)-1+age%10)%6;
 return {...HOANG_OC[index],age};
}
function lunarYearBranch(year){
 if(!Number.isInteger(year)||year<1900||year>2099)return null;
 // 1984 is Giáp Tý, the reference year for the 12-branch cycle.
 return CHI[((year-1984)%12+12)%12];
}
function calcTamTai(birthLunarYear,targetLunarYear){
 const birthBranch=lunarYearBranch(birthLunarYear),targetBranch=lunarYearBranch(targetLunarYear);
 if(!birthBranch||!targetBranch)return null;
 const group=TAM_TAI_GROUPS.find(g=>g.birth.includes(birthBranch));
 const index=group.target.indexOf(targetBranch);
 return {birthLunarYear,targetLunarYear,birthBranch,targetBranch,favorable:index<0,affected:index>=0,yearInCycle:index<0?0:index+1,targetYears:group.target.slice()};
}
function analyzeHouseYear(birthLunarYear,targetLunarYear){
 if(!Number.isInteger(birthLunarYear)||!Number.isInteger(targetLunarYear)||birthLunarYear<1900||birthLunarYear>2099||targetLunarYear<1900||targetLunarYear>2099||targetLunarYear<birthLunarYear)return null;
 const age=targetLunarYear-birthLunarYear+1;
 return {birthLunarYear,targetLunarYear,age,kimLau:calcKimLau(age),hoangOc:calcHoangOc(age),tamTai:calcTamTai(birthLunarYear,targetLunarYear)};
}
function getLunarYearForBirthDate(day,month,solarYear){
 if(typeof module!=='undefined'&&module.exports){
  const batTrach=require('./bat-trach.js');
  return batTrach.getBirthLunarYear(day,month,solarYear);
 }
 if(typeof window!=='undefined'&&window.PhongThuyBatTrach)return window.PhongThuyBatTrach.getBirthLunarYear(day,month,solarYear);
 return null;
}
const PhongThuyNgayXayDung=Object.freeze({calcKimLau,calcHoangOc,calcTamTai,analyzeHouseYear,lunarYearBranch,getLunarYearForBirthDate});
if(typeof module!=='undefined'&&module.exports)module.exports=PhongThuyNgayXayDung;
if(typeof window!=='undefined')window.PhongThuyNgayXayDung=PhongThuyNgayXayDung;
