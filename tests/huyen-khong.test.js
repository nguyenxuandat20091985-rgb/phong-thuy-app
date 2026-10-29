const assert=require('node:assert/strict');
const flying=require('../huyen-khong.js');

// Published reference fixtures transcribed as numeric test expectations from
// Joey Yap, Real Feng Shui (2014–2016), Period 8 Flying Star Charts, printed p.13:
// facing S2/S3, N2/N3 and E2/E3. Each triple is mountain / facing / period star.
const fixtures=[
 {name:'Period 8, facing S2/S3',period:8,facing:'S2',expected:{
  NW:[5,2,9],N:[9,7,4],NE:[7,9,2],W:[6,1,1],CENTER:[4,3,8],E:[2,5,6],SW:[1,6,5],S:[8,8,3],SE:[3,4,7]}},
 {name:'Period 8, facing N2/N3',period:8,facing:'N2',expected:{
  NW:[2,5,9],N:[7,9,4],NE:[9,7,2],W:[1,6,1],CENTER:[3,4,8],E:[5,2,6],SW:[6,1,5],S:[8,8,3],SE:[4,3,7]}},
 {name:'Period 8, facing E2/E3',period:8,facing:'E2',expected:{
  NW:[9,7,9],N:[5,2,4],NE:[7,9,2],W:[8,8,1],CENTER:[1,6,8],E:[3,4,6],SW:[4,3,5],S:[6,1,3],SE:[2,5,7]}}
];
for(const fixture of fixtures){
 const chart=flying.calculateChart(fixture.period,fixture.facing);
 assert.ok(chart,fixture.name+' should produce a chart');
 for(const [palace,expected] of Object.entries(fixture.expected)){
  const actual=chart.palaces[palace];
  assert.deepEqual([actual.mountain,actual.facing,actual.period],expected,fixture.name+' '+palace);
 }
 for(const plate of [chart.base,chart.mountain,chart.water]){
  assert.deepEqual(Object.values(plate).sort((a,b)=>a-b),[1,2,3,4,5,6,7,8,9],fixture.name+' each plate must contain stars 1-9 once');
 }
}

// 24 mountains and degree-boundary checks.
assert.equal(flying.getMountains().length,24);
assert.equal(flying.bearingToMountain(0),'N2');
assert.equal(flying.bearingToMountain(7.5),'N3');
assert.equal(flying.bearingToMountain(352.5),'N2');
assert.equal(flying.bearingToMountain(337.5),'N1');
assert.equal(flying.bearingToMountain(360),'N2');
assert.equal(flying.bearingToMountain(-1),null);
assert.equal(flying.oppositeMountain('S2'),'N2');
assert.equal(flying.oppositeMountain('N1'),'S1');
assert.equal(flying.calculateChart(10,'S2'),null);
assert.equal(flying.calculateChart(9,'bad'),null);

// Formation classification checks: algorithmic examples across periods/mountains.
assert.equal(flying.calculateChart(8,'S2').formations.songTinhHoiHuong,true);
assert.equal(flying.calculateChart(2,'NE1').formations.wangShanWangXiang,true);
assert.equal(flying.calculateChart(2,'NE2').formations.shangShanXiaShui,true);
assert.equal(flying.calculateChart(1,'NW2').formations.heShiMountainPeriod,true);
console.log('Huyền Không tests passed: 3 published Period-8 charts, 24-mountain boundaries, 9-star permutations, and formation cases.');
