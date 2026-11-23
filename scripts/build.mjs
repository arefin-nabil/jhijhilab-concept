import { mkdir, cp, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { render, href, paths } from '../src/render.mjs';
import { company } from '../src/company.mjs';

const project = fileURLToPath(new URL('../',import.meta.url));
const dest=join(project,'dist');
const origin=new URL(process.env.SITE_URL||company.origin).origin;
if(!/^https?:\/\//.test(origin))throw new Error('SITE_URL must be an HTTP or HTTPS origin.');
const token=process.env.GOOGLE_SITE_VERIFICATION||'';
const canSend=Boolean(process.env.RESEND_API_KEY?.trim() && process.env.INQUIRY_FROM?.trim());
await mkdir(dest,{recursive:true});
await cp(join(project,'public'),dest,{recursive:true});
const write=(name,text)=>writeFile(join(dest,name),text,'utf8');
for(const lang of ['en','bn']){
  for(const page of Object.keys(paths)){
    const directory=href(lang,page).slice(1);
    await mkdir(join(dest,directory),{recursive:true});
    await write(join(directory,'index.html'),render(lang,page,{origin,token,canSend}));
  }
}
await write('404.html',render('en','404',{origin,token,canSend}));
const urls=['en','bn'].flatMap(lang=>Object.keys(paths).map(page=>`<url><loc>${origin+href(lang,page)}</loc></url>`)).join('\n');
await write('sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>\n`);
await write('robots.txt',`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
console.log('Built 10 bilingual pages, 404, sitemap and assets in dist/.');

