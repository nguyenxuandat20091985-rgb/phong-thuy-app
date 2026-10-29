const assert = require('node:assert/strict');
const fengShui = require('../bat-trach.js');

function assertCung(year, gender, expectedName, expectedNumber) {
  const result = fengShui.calcCungFromLunarYear(year, gender);
  assert.ok(result, `No result for ${gender} ${year}`);
  assert.equal(result.name, expectedName, `${gender} ${year}`);
  assert.equal(result.number, expectedNumber, `${gender} ${year} number`);
}

// Four mandatory cases supplied by the user.
assertCung(1985, 'nam', 'Khôn', 2);
assertCung(1985, 'nu', 'Khảm', 1);
assertCung(1990, 'nam', 'Ly', 9);
assertCung(2000, 'nam', 'Đoài', 7);

// Validate Vietnamese lunar-year boundary handling (UTC+7).
assert.equal(fengShui.getBirthLunarYear(20, 1, 1985), 1984, '1985 birth before Vietnamese Tết uses lunar year 1984');
assert.equal(fengShui.getBirthLunarYear(21, 1, 1985), 1985, 'Vietnamese Tết 1985 starts lunar year 1985');
assert.equal(fengShui.getBirthLunarYear(4, 2, 2000), 1999, '2000 birth before Tết uses lunar year 1999');
assert.equal(fengShui.getBirthLunarYear(5, 2, 2000), 2000, 'Tết 2000 starts lunar year 2000');

// Dates around Tết must produce the expected distinct Kua results.
assert.equal(fengShui.calcCungFromLunarYear(fengShui.getBirthLunarYear(20, 1, 1985), 'nam').name, 'Càn');
assert.equal(fengShui.calcCungFromLunarYear(fengShui.getBirthLunarYear(21, 1, 1985), 'nam').name, 'Khôn');
assert.equal(fengShui.calcCungFromLunarYear(fengShui.getBirthLunarYear(4, 2, 2000), 'nam').name, 'Ly');
assert.equal(fengShui.calcCungFromLunarYear(fengShui.getBirthLunarYear(5, 2, 2000), 'nam').name, 'Đoài');

// Invalid input is rejected instead of returning a fabricated palace.
assert.equal(fengShui.getBirthLunarYear(31, 2, 2000), null);
assert.equal(fengShui.calcCungFromLunarYear(2100, 'nam'), null);
assert.equal(fengShui.calcCungFromLunarYear(1985, 'unknown'), null);
console.log('Bát Trạch unit tests passed (4 mandatory cases, Tết boundary cases, invalid input).');
