import {readFile,mkdir,writeFile} from 'node:fs/promises';
const base=new URL('../',import.meta.url);
const manifest=JSON.parse(await readFile(new URL('game-content.json',base),'utf8'));
await mkdir(new URL('assets/cards/',base),{recursive:true});
const ink='#203975';
for(const item of Object.values(manifest.items)){
  let art;
  if(item.representation==='analog'){
    const numerals=Array.from({length:12},(_,i)=>{
      const n=i+1,a=n*Math.PI/6;
      return `<text x="${(120+73*Math.sin(a)).toFixed(2)}" y="${(120-73*Math.cos(a)+7).toFixed(2)}" text-anchor="middle" fill="${ink}" font-family="Arial,sans-serif" font-size="23" font-weight="700">${n}</text>`;
    }).join('');
    const ticks=Array.from({length:12},(_,i)=>`<path d="M120 30v5" transform="rotate(${i*30} 120 120)" stroke="${ink}" stroke-width="2.5" stroke-linecap="round"/>`).join('');
    art=`<circle cx="120" cy="124" r="105" fill="#a0b4dc"/><circle cx="120" cy="119" r="105" fill="url(#rim)" stroke="${ink}" stroke-width="5"/><circle cx="120" cy="119" r="96" fill="#fffdf5" stroke="#fff" stroke-width="3"/>${ticks}${numerals}<g data-hand="minute" transform="rotate(0 120 120)"><path d="M120 120V57" stroke="${ink}" stroke-width="7" stroke-linecap="round"/></g><g data-hand="hour" transform="rotate(${item.hour*30} 120 120)"><path d="M120 120V79" stroke="#c16b0d" stroke-width="10" stroke-linecap="round"/></g><circle cx="120" cy="120" r="8" fill="#ffd45c" stroke="${ink}" stroke-width="3"/>`;
  }else{
    // Numerical time only: no activity names, AM/PM, or extra labels.
    art=`<text x="120" y="139" text-anchor="middle" fill="${ink}" font-family="Arial,sans-serif" font-size="${item.hour===10?62:72}" font-weight="900" letter-spacing="-2">${item.hour}:00</text>`;
  }
  await writeFile(new URL(`assets/cards/${item.asset}`,base),`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240"><defs><linearGradient id="rim" x2="0" y2="1"><stop stop-color="#ffe895"/><stop offset="1" stop-color="#ffc447"/></linearGradient></defs>${art}</svg>`);
}
console.log('Generated 16 precise whole-hour clock and digital-time cards.');
