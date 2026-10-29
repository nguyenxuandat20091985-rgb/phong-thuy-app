const assert=require('node:assert/strict');
const rules=require('../ngay-xay-dung.js');
const lunar=require('../bat-trach.js');

// Kim Lâu: at least five test cases, covering all four remainders and a safe remainder.
assert.equal(rules.calcKimLau(28).name,'Kim Lâu Thân');
assert.equal(rules.calcKimLau(30).name,'Kim Lâu Thê');
assert.equal(rules.calcKimLau(33).name,'Kim Lâu Tử');
assert.equal(rules.calcKimLau(35).name,'Kim Lâu Lục Súc');
assert.equal(rules.calcKimLau(29).favorable,true);
assert.equal(rules.calcKimLau(42).name,'Kim Lâu Tử');

// Hoang Ốc: test all six decade anchors plus intermediate ages.
assert.equal(rules.calcHoangOc(10).name,'Nhất Cát');
assert.equal(rules.calcHoangOc(20).name,'Nhì Nghi');
assert.equal(rules.calcHoangOc(30).name,'Tam Địa Sát');
assert.equal(rules.calcHoangOc(40).name,'Tứ Tấn Tài');
assert.equal(rules.calcHoangOc(50).name,'Ngũ Thọ Tử');
assert.equal(rules.calcHoangOc(60).name,'Lục Hoang Ốc');
assert.equal(rules.calcHoangOc(31).name,'Tứ Tấn Tài');
assert.equal(rules.calcHoangOc(36).name,'Tam Địa Sát');

// Tam Tai: test all four birth groups and a non-affected year.
assert.equal(rules.calcTamTai(1984,2022).affected,true); // Tý meets Dần
assert.equal(rules.calcTamTai(1984,2023).affected,true); // Tý meets Mão
assert.equal(rules.calcTamTai(1984,2024).affected,true); // Tý meets Thìn
assert.equal(rules.calcTamTai(1984,2025).affected,false);
assert.equal(rules.calcTamTai(1986,2028).affected,true); // Dần meets Thân
assert.equal(rules.calcTamTai(1987,2026).affected,true); // Mão meets Ngọ
assert.equal(rules.calcTamTai(1989,2020).affected,true); // Tỵ meets Tý

// Age formula and solar dates before Tết use the Vietnamese lunar birth year.
assert.equal(lunar.getBirthLunarYear(1,1,1990),1989);
assert.equal(rules.analyzeHouseYear(1985,2026).age,42);
assert.equal(rules.analyzeHouseYear(2027,2026),null);
assert.equal(rules.calcKimLau(0),null);
assert.equal(rules.calcHoangOc(0),null);
console.log('Kim Lâu, Hoang Ốc, Tam Tai tests passed (6 Kim Lâu, 8 Hoang Ốc, 7 Tam Tai assertions + validation).');
