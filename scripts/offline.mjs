import { cp, mkdir, writeFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { render, href, paths } from '../src/render.mjs';
import { company } from '../src/company.mjs';

const root=fileURLToPath(new URL('../',import.meta.url)),out=join(root,'preview');
await mkdir(out,{recursive:true});
await cp(join(root,'public'),out,{recursive:true});
for(const lang of ['en','bn']){
 for(const page of Object.keys(paths)){
   const folder=href(lang,page).slice(1),target=join(out,folder);
   const html=render(lang,page,{origin:company.origin,token:'',canSend:false});
   const localHtml=html.replace(/\b(href|src)="(\/[^"]*)"/g,(_all,attr,url)=>{
     const [path,anchor]=url.split('#');
     const file=join(out,path.endsWith('/')?path+'index.html':path);
     const ref=relative(target,file).split(sep).join('/');
     return `${attr}="${ref}${anchor?'#'+anchor:''}"`;
   });
   await mkdir(target,{recursive:true});
   await writeFile(join(target,'index.html'),localHtml,'utf8');
 }
}
console.log('Open preview/index.html in a browser.');

