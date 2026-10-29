const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.join(__dirname,'..');
const frontendFiles=['index.html','phong-thuy-nha-nang-cao.html','app.js','backup.js','sw.js','bat-trach.js','ngay-xay-dung.js','huyen-khong.js','hoa-giai-sat-khi.js'];
const secretPatterns=[
 ['OpenAI/API secret',/\bsk-(?:proj-|live-)?[A-Za-z0-9_-]{20,}\b/],
 ['GitHub token',/\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{30,}\b|\bgithub_pat_[A-Za-z0-9_]{30,}\b/],
 ['AWS access key',/\bAKIA[0-9A-Z]{16}\b/],
 ['Google API key',/\bAIza[0-9A-Za-z_-]{30,}\b/],
 ['Google OAuth client secret',/\bGOCSPX-[A-Za-z0-9_-]{20,}\b/],
 ['Private key block',/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/],
 ['Hard-coded service-role secret',/SUPABASE_SERVICE_ROLE_KEY\s*[:=]\s*['"][^'"]{10,}['"]|service_role.{0,80}eyJ[A-Za-z0-9_-]{20,}/i],
 ['Hard-coded Stripe secret',/\bsk_(?:live|test)_[A-Za-z0-9]{20,}\b/],
 ['Hard-coded Slack token',/\bxox[baprs]-[A-Za-z0-9-]{20,}\b/]
];
for(const file of frontendFiles){
 const content=fs.readFileSync(path.join(root,file),'utf8');
 for(const [label,pattern] of secretPatterns)assert.equal(pattern.test(content),false,file+' contains a possible '+label);
}
const html=fs.readFileSync(path.join(root,'phong-thuy-nha-nang-cao.html'),'utf8');
assert.ok(html.includes('<title>Phong thủy nhà nâng cao | Phong Thủy Việt</title>'),'page title is missing');
assert.match(html,/<meta name="description" content="[^"]{50,160}">/i);
assert.ok(html.includes('<link rel="canonical" href="https://nguyenxuandat20091985-rgb.github.io/phong-thuy-app/phong-thuy-nha-nang-cao.html">'),'canonical URL is missing or incorrect');
console.log('Frontend security and SEO checks passed: no common secret patterns; title, description and canonical present.');
