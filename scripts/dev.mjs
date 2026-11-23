import './build.mjs';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import inquiry from '../api/inquiry.js';

const root=fileURLToPath(new URL('../dist/',import.meta.url));
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.xml':'application/xml','.txt':'text/plain; charset=utf-8'};
const port=Number(process.env.PORT||4327);
const server=createServer(async (req,res)=>{
  try{
    const url=new URL(req.url,`http://127.0.0.1:${port}`),path=decodeURIComponent(url.pathname);
    if(path.replace(/\/$/,'')==='/api/inquiry'){
      const chunks=[];
      let bytes=0;
      for await(const chunk of req){bytes+=chunk.length;if(bytes>16384){res.writeHead(413).end();return;}chunks.push(chunk);}
      const request=new Request(url,{method:req.method,headers:req.headers,...(!['GET','HEAD'].includes(req.method)?{body:Buffer.concat(chunks)}:{})});
      const result=await inquiry.fetch(request);
      res.writeHead(result.status,Object.fromEntries(result.headers));res.end(await result.text());return;
    }
    if(!['GET','HEAD'].includes(req.method)){res.writeHead(405).end();return;}
    let target=resolve(root,'.'+path);
    if(target!==resolve(root)&&!target.startsWith(resolve(root)+sep)){res.writeHead(403).end();return;}
    let code=200;
    try{
      if((await stat(target)).isDirectory()){
        if(!path.endsWith('/')){res.writeHead(308,{Location:url.pathname+'/'+url.search}).end();return;}
        target=join(target,'index.html');
      }
      if(!(await stat(target)).isFile())throw new Error('Not found');
    }catch{target=join(root,'404.html');code=404;}
    res.writeHead(code,{'Content-Type':mime[extname(target)]||'application/octet-stream','X-Content-Type-Options':'nosniff'});
    res.end(req.method==='HEAD'?undefined:await readFile(target));
  }catch{res.writeHead(400).end();}
});
server.listen(port,'127.0.0.1',()=>console.log(`Local: http://127.0.0.1:${port}/`));

