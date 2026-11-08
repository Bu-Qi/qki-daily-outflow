export const ADDRESS = '0x1BaaCb73A31e2014185D9e2D6bC895184DC8c4Aa';
export function dayOf(timestamp) { return new Date(new Date(timestamp).getTime()+8*3600000).toISOString().slice(0,10); }
export function formatQki(value) { const n=BigInt(value); return (n/10n**18n).toLocaleString('en-US')+((n%10n**18n)?'.'+(n%10n**18n).toString().padStart(18,'0').replace(/0+$/,''):''); }
export function summarize(items,start,end) {
 const map=new Map(); for(let time=Date.parse(start+'T00:00:00+08:00');time<=Date.parse(end+'T00:00:00+08:00');time+=86400000)map.set(dayOf(time),{date:dayOf(time),wei:0n,count:0,txs:[]});
 const seen=new Set(); for(const t of items){ if(seen.has(t.hash))continue;seen.add(t.hash);if(t.from?.hash?.toLowerCase()!==ADDRESS.toLowerCase()||t.status!=='ok'||!t.timestamp||t.block_number==null||!/^[0-9]+$/.test(t.value||'')||BigInt(t.value)===0n)continue; const row=map.get(dayOf(t.timestamp));if(row){row.wei+=BigInt(t.value);row.count++;row.txs.push(t);} }
 return [...map.values()].reverse();
}
