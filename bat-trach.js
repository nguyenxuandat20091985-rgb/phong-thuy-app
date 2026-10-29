/* Bát Trạch utilities — Vietnamese lunar year conversion, UTC+7.
 * School: common Bát Trạch year-digit method specified in PR #14.
 * Birth year is the Vietnamese lunar year; a solar birth date before Tết uses the prior lunar year.
 * This is traditional/cultural guidance, not a scientific prediction.
 */
'use strict';
function jdFromDate(dd,mm,yy){
 const a=Math.floor((14-mm)/12),y=yy+4800-a,m=mm+12*a-3;
 let jd=dd+Math.floor((153*m+2)/5)+365*y+Math.floor(y/4)-Math.floor(y/100)+Math.floor(y/400)-32045;
 if(jd<2299161) jd=dd+Math.floor((153*m+2)/5)+365*y+Math.floor(y/4)-32083;
 return jd;
}
function newMoon(k){
 const T=k/1236.85,T2=T*T,T3=T2*T,dr=Math.PI/180;
 let jd=2415020.75933+29.53058868*k+0.0001178*T2-0.000000155*T3;
 jd+=0.00033*Math.sin((166.56+132.87*T-0.009173*T2)*dr);
 const M=359.2242+29.10535608*k-0.0000333*T2-0.00000347*T3;
 const Mp=306.0253+385.81691806*k+0.0107306*T2+0.00001236*T3;
 const F=21.2964+390.67050646*k-0.0016528*T2-0.00000239*T3;
 let C=(0.1734-0.000393*T)*Math.sin(M*dr)+0.0021*Math.sin(2*M*dr);
 C-=0.4068*Math.sin(Mp*dr)+0.0161*Math.sin(2*Mp*dr)+0.0004*Math.sin(3*Mp*dr);
 C+=0.0104*Math.sin(2*F*dr)-0.0051*Math.sin((M+Mp)*dr)-0.0074*Math.sin((M-Mp)*dr);
 C+=0.0004*Math.sin((2*F+M)*dr)-0.0004*Math.sin((2*F-M)*dr)-0.0006*Math.sin((2*F+Mp)*dr)+0.0010*Math.sin((2*F-Mp)*dr)+0.0005*Math.sin((2*Mp+M)*dr);
 const deltaT=T < -11 ? 0.001+0.000839*T+0.0002261*T2-0.00000845*T3-0.000000081*T*T3 : -0.000278+0.000265*T+0.000262*T2;
 return jd+C-deltaT;
}
function getNewMoonDay(k,tz){return Math.floor(newMoon(k)+0.5+tz/24);}
function sunLongitude(jdn){
 const T=(jdn-2451545.0)/36525,T2=T*T,dr=Math.PI/180;
 const M=357.52910+35999.05030*T-0.0001559*T2-0.00000048*T*T2;
 const L0=280.46645+36000.76983*T+0.0003032*T2;
 let DL=(1.914600-0.004817*T-0.000014*T2)*Math.sin(dr*M);
 DL+=(0.019993-0.000101*T)*Math.sin(2*dr*M)+0.000290*Math.sin(3*dr*M);
 let L=(L0+DL)*dr;L-=Math.PI*2*Math.floor(L/(Math.PI*2));
 return Math.floor(L/Math.PI*6);
}
function getSunLongitude(dayNumber,tz){return sunLongitude(dayNumber-0.5-tz/24);}
function getLunarMonth11(yy,tz){
 const off=jdFromDate(31,12,yy)-2415021,k=Math.floor(off/29.530588853);
 let nm=getNewMoonDay(k,tz);if(getSunLongitude(nm,tz)>=9)nm=getNewMoonDay(k-1,tz);return nm;
}
function getLeapMonthOffset(a11,tz){
 const k=Math.floor(0.5+(a11-2415021.076998695)/29.530588853);
 let last=0,i=1,arc=getSunLongitude(getNewMoonDay(k+i,tz),tz);
 do{last=arc;i++;arc=getSunLongitude(getNewMoonDay(k+i,tz),tz);}while(arc!==last&&i<14);
 return i-1;
}
function convertSolarToLunar(dd,mm,yy,tz=7){
 if(!Number.isInteger(dd)||!Number.isInteger(mm)||!Number.isInteger(yy)||yy<1900||yy>2099||mm<1||mm>12||dd<1)return null;
 const calendarDate=new Date(Date.UTC(yy,mm-1,dd));
 if(calendarDate.getUTCFullYear()!==yy||calendarDate.getUTCMonth()!==mm-1||calendarDate.getUTCDate()!==dd)return null;
 const dayNumber=jdFromDate(dd,mm,yy),k=Math.floor((dayNumber-2415021.076998695)/29.530588853);
 let monthStart=getNewMoonDay(k+1,tz);if(monthStart>dayNumber)monthStart=getNewMoonDay(k,tz);
 let a11=getLunarMonth11(yy,tz),b11=a11,lunarYear;
 if(a11>=monthStart){lunarYear=yy;a11=getLunarMonth11(yy-1,tz);}else{lunarYear=yy+1;b11=getLunarMonth11(yy+1,tz);}
 const lunarDay=dayNumber-monthStart+1,diff=Math.floor((monthStart-a11)/29);
 let lunarLeap=0,lunarMonth=diff+11;
 if(b11-a11>365){const leapDiff=getLeapMonthOffset(a11,tz);if(diff>=leapDiff){lunarMonth=diff+10;if(diff===leapDiff)lunarLeap=1;}}
 if(lunarMonth>12)lunarMonth-=12;
 if(lunarMonth>=11&&diff<4)lunarYear--;
 return {day:lunarDay,month:lunarMonth,year:lunarYear,leap:lunarLeap};
}
function reduceDigitsToOneDigit(value) {
  let n = String(value).split('').reduce((sum, digit) => sum + Number(digit), 0);
  while (n > 9) n = String(n).split('').reduce((sum, digit) => sum + Number(digit), 0);
  return n;
}
const CUNG_PHI = {
  1: { number: 1, name: 'Khảm', hanh: 'Thủy', group: 'Đông Tứ Trạch' },
  2: { number: 2, name: 'Khôn', hanh: 'Thổ', group: 'Tây Tứ Trạch' },
  3: { number: 3, name: 'Chấn', hanh: 'Mộc', group: 'Đông Tứ Trạch' },
  4: { number: 4, name: 'Tốn', hanh: 'Mộc', group: 'Đông Tứ Trạch' },
  6: { number: 6, name: 'Càn', hanh: 'Kim', group: 'Tây Tứ Trạch' },
  7: { number: 7, name: 'Đoài', hanh: 'Kim', group: 'Tây Tứ Trạch' },
  8: { number: 8, name: 'Cấn', hanh: 'Thổ', group: 'Tây Tứ Trạch' },
  9: { number: 9, name: 'Ly', hanh: 'Hỏa', group: 'Đông Tứ Trạch' }
};
function getBirthLunarYear(day, month, solarYear) {
  const lunar = convertSolarToLunar(day, month, solarYear, 7);
  return lunar ? lunar.year : null;
}
function calcCungFromLunarYear(lunarYear, gender) {
  if (!Number.isInteger(lunarYear) || lunarYear < 1900 || lunarYear > 2099) return null;
  if (gender !== 'nam' && gender !== 'nu') return null;
  // User-approved rule: sum digits of the FULL lunar birth year, then reduce to one digit.
  const sum = reduceDigitsToOneDigit(lunarYear);
  let number = lunarYear >= 2000
    ? (gender === 'nam' ? 9 - sum : sum + 6)
    : (gender === 'nam' ? 10 - sum : sum + 5);
  while (number > 9) number = reduceDigitsToOneDigit(number);
  while (number < 1) number += 9;
  // Traditional exception: number 5 is assigned to 2 (Khôn) for men and 8 (Cấn) for women.
  if (number === 5) number = gender === 'nam' ? 2 : 8;
  return CUNG_PHI[number] || null;
}
const PhongThuyBatTrach = Object.freeze({ convertSolarToLunar, getBirthLunarYear, calcCungFromLunarYear, reduceDigitsToOneDigit });
if (typeof module !== 'undefined' && module.exports) module.exports = PhongThuyBatTrach;
if (typeof window !== 'undefined') window.PhongThuyBatTrach = PhongThuyBatTrach;
