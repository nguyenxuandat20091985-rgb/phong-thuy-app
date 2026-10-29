const assert=require('node:assert/strict');
const remedies=require('../hoa-giai-sat-khi.js');
const types=remedies.getShaTypes(),stars=remedies.getStarRules();
assert.equal(types.length,8);
assert.deepEqual(stars.map(s=>s.id),[2,3,4,5].sort((a,b)=>a-b));
for(const type of types)for(const star of stars){
 const r=remedies.getRemedy(type.id,star.id);
 assert.ok(r,type.id+' star '+star.id);
 assert.ok(r.principle.length>0);
 assert.ok(r.practicalAction.length>0);
 assert.ok(r.traditionalAction.length>0);
 assert.ok(r.avoid.length>0);
 assert.ok(r.physicalPriority.length>0);
}
assert.match(remedies.getRemedy('road',5).principle,/Tiết Thổ/);
assert.match(remedies.getRemedy('corner',3).principle,/Chế Mộc/);
assert.match(remedies.getRemedy('crack',4).physicalPriority,/Khẩn cấp/);
assert.match(remedies.getRemedy('drain',2).physicalPriority,/Cao/);
assert.match(remedies.getRemedy('water',4).avoid,/Không lấp mương/);
assert.match(remedies.getRemedy('pole',5).practicalAction,/điện lực/);
assert.equal(remedies.getRemedy('unknown',5),null);
assert.equal(remedies.getRemedy('road',9),null);
console.log('Sát khí remedy tests passed: all 32 combinations plus safety, element and invalid-input checks.');
