/*
 * Xuan Kong Flying Stars (玄空飛星), standard chart / Xia Gua (下卦) method.
 * 24 mountains: each 15 degrees; bearing is clockwise from true north.
 * Lo Shu flight path: Center, NW, W, NE, S, N, SW, E, SE.
 * Base plate flies forward. Mountain/facing plates use the polarity of the
 * same-rank mountain in the seed star's home palace; star 5 borrows the period
 * star's home-palace pattern. Cardinal first mountain is Yang and 2nd/3rd Yin;
 * corner first mountain is Yin and 2nd/3rd Yang.
 * This module does not implement replacement-star (替卦) boundary charts.
 */
'use strict';
const MOUNTAINS=[
 {id:'N1',chinese:'壬',direction:'N',rank:1,start:337.5,end:352.5},
 {id:'N2',chinese:'子',direction:'N',rank:2,start:352.5,end:7.5},
 {id:'N3',chinese:'癸',direction:'N',rank:3,start:7.5,end:22.5},
 {id:'NE1',chinese:'丑',direction:'NE',rank:1,start:22.5,end:37.5},
 {id:'NE2',chinese:'艮',direction:'NE',rank:2,start:37.5,end:52.5},
 {id:'NE3',chinese:'寅',direction:'NE',rank:3,start:52.5,end:67.5},
 {id:'E1',chinese:'甲',direction:'E',rank:1,start:67.5,end:82.5},
 {id:'E2',chinese:'卯',direction:'E',rank:2,start:82.5,end:97.5},
 {id:'E3',chinese:'乙',direction:'E',rank:3,start:97.5,end:112.5},
 {id:'SE1',chinese:'辰',direction:'SE',rank:1,start:112.5,end:127.5},
 {id:'SE2',chinese:'巽',direction:'SE',rank:2,start:127.5,end:142.5},
 {id:'SE3',chinese:'巳',direction:'SE',rank:3,start:142.5,end:157.5},
 {id:'S1',chinese:'丙',direction:'S',rank:1,start:157.5,end:172.5},
 {id:'S2',chinese:'午',direction:'S',rank:2,start:172.5,end:187.5},
 {id:'S3',chinese:'丁',direction:'S',rank:3,start:187.5,end:202.5},
 {id:'SW1',chinese:'未',direction:'SW',rank:1,start:202.5,end:217.5},
 {id:'SW2',chinese:'坤',direction:'SW',rank:2,start:217.5,end:232.5},
 {id:'SW3',chinese:'申',direction:'SW',rank:3,start:232.5,end:247.5},
 {id:'W1',chinese:'庚',direction:'W',rank:1,start:247.5,end:262.5},
 {id:'W2',chinese:'酉',direction:'W',rank:2,start:262.5,end:277.5},
 {id:'W3',chinese:'辛',direction:'W',rank:3,start:277.5,end:292.5},
 {id:'NW1',chinese:'戌',direction:'NW',rank:1,start:292.5,end:307.5},
 {id:'NW2',chinese:'乾',direction:'NW',rank:2,start:307.5,end:322.5},
 {id:'NW3',chinese:'亥',direction:'NW',rank:3,start:322.5,end:337.5}
];
const BEARING_ORDER=['N2','N3','NE1','NE2','NE3','E1','E2','E3','SE1','SE2','SE3','S1','S2','S3','SW1','SW2','SW3','W1','W2','W3','NW1','NW2','NW3','N1'];
const FLIGHT_PATH=['CENTER','NW','W','NE','S','N','SW','E','SE'];
const PALACES=['NW','N','NE','W','CENTER','E','SW','S','SE'];
const STAR_HOME={1:'N',2:'SW',3:'E',4:'SE',6:'NW',7:'W',8:'NE',9:'S'};
const CARDINAL=['N','E','S','W'];
function getMountain(id){return MOUNTAINS.find(m=>m.id===id)||null;}
function bearingToMountain(degrees){
 if(typeof degrees!=='number'||!Number.isFinite(degrees)||degrees<0||degrees>360)return null;
 const normalized=degrees===360?0:degrees;
 const index=Math.floor(((normalized+7.5)%360)/15);
 return BEARING_ORDER[index]||null;
}
function oppositeMountain(id){
 const index=BEARING_ORDER.indexOf(id);
 return index<0?null:BEARING_ORDER[(index+12)%24];
}
function flyPlate(seed,forward){
 if(!Number.isInteger(seed)||seed<1||seed>9)return null;
 const out={};
 FLIGHT_PATH.forEach((palace,i)=>{out[palace]=((seed-1+(forward?i:-i)+18)%9)+1;});
 return out;
}
function isYangAtRank(direction,rank){
 if(CARDINAL.includes(direction))return rank===1;
 return rank===2||rank===3;
}
function flightIsForward(seed,period,rank){
 const home=STAR_HOME[seed===5?period:seed];
 if(!home)return null;
 return isYangAtRank(home,rank);
}
function formationFlags(period,facingMountain,sittingMountain,base,mountain,water){
 const facing=getMountain(facingMountain),sitting=getMountain(sittingMountain);
 const fd=facing.direction,sd=sitting.direction;
 const all=fn=>PALACES.every(p=>fn(p));
 return {
  wangShanWangXiang:mountain[sd]===period&&water[fd]===period,
  shangShanXiaShui:mountain[fd]===period&&water[sd]===period,
  songTinhHoiHuong:mountain[fd]===period&&water[fd]===period,
  songTinhHoiToa:mountain[sd]===period&&water[sd]===period,
  heShiMountainPeriod:all(p=>mountain[p]+base[p]===10),
  heShiFacingPeriod:all(p=>water[p]+base[p]===10),
  heShiMountainFacing:all(p=>mountain[p]+water[p]===10)
 };
}
function calculateChart(period,facingMountain){
 if(!Number.isInteger(period)||period<1||period>9)return null;
 const facing=getMountain(facingMountain),sittingId=oppositeMountain(facingMountain),sitting=getMountain(sittingId);
 if(!facing||!sitting)return null;
 const base=flyPlate(period,true);
 const mountainSeed=base[sitting.direction],waterSeed=base[facing.direction];
 const mountainForward=flightIsForward(mountainSeed,period,sitting.rank);
 const waterForward=flightIsForward(waterSeed,period,facing.rank);
 if(mountainForward===null||waterForward===null)return null;
 const mountain=flyPlate(mountainSeed,mountainForward),water=flyPlate(waterSeed,waterForward);
 const palaces={};
 for(const p of PALACES)palaces[p]={direction:p,mountain:mountain[p],facing:water[p],period:base[p]};
 return {period,facing,sitting,mountainSeed,waterSeed,mountainForward,waterForward,base,mountain,water,palaces,formations:formationFlags(period,facingMountain,sittingId,base,mountain,water)};
}
const PhongThuyPhiTinh=Object.freeze({getMountains:()=>MOUNTAINS.map(m=>({...m})),bearingToMountain,oppositeMountain,calculateChart});
if(typeof module!=='undefined'&&module.exports)module.exports=PhongThuyPhiTinh;
if(typeof window!=='undefined')window.PhongThuyPhiTinh=PhongThuyPhiTinh;
