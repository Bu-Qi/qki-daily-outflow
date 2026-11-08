import assert from 'node:assert/strict';
import {ADDRESS,dayOf,formatQki,summarize} from './src/qki.mjs';
assert.equal(dayOf('2026-11-08T16:00:00Z'),'2026-11-09');
assert.equal(dayOf('2026-11-08T15:59:59.999Z'),'2026-11-08');
const tx=(hash,timestamp,value,status='ok')=>({hash,timestamp,value,status,from:{hash:ADDRESS.toLowerCase()},block_number:1});
const a=tx('a','2026-11-08T15:59:59Z','1000000000000000001');
const rows=summarize([a,a,tx('b','2026-11-08T16:00:00Z','2000000000000000002'),tx('fail','2026-11-08T15:00:00Z','9000000000000000000','error'),tx('zero','2026-11-08T15:00:00Z','0'),{...a,hash:'in',from:{hash:'0xother'}},{...a,hash:'pending',block_number:null}],'2026-11-07','2026-11-09');
assert.deepEqual(rows.map(r=>[r.date,r.wei,r.count]),[['2026-11-09',2000000000000000002n,1],['2026-11-08',1000000000000000001n,1],['2026-11-07',0n,0]]);
assert.equal(formatQki(rows[0].wei),'2.000000000000000002');
assert.equal(formatQki(123456789012345678901234567890n),'123,456,789,012.34567890123456789');
console.log('PASS: UTC+8 midnight, exact precision, failure/pending/incoming exclusion, deduplication and empty days');

