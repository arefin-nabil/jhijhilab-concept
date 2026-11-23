import { createHash } from 'node:crypto';
import { company } from '../src/company.mjs';
import { copy } from '../src/content.mjs';

const reply=(code,data,headers={})=>Response.json(data,{status:code,headers:{'Cache-Control':'no-store',...headers}});
async function handle(request){
  if(request.method!=='POST')return reply(405,{accepted:false},{Allow:'POST'});
  if(!request.headers.get('content-type')?.startsWith('application/json'))return reply(415,{accepted:false});
  const origin=request.headers.get('origin');
  if(origin && origin!==new URL(request.url).origin)return reply(403,{accepted:false});
  const max=16384;
  if(Number(request.headers.get('content-length'))>max)return reply(413,{accepted:false});
  let data;
  try{
    const reader=request.body?.getReader();
    if(!reader)return reply(400,{accepted:false});
    let size=0;const chunks=[];
    while(true){
      const {value,done}=await reader.read();
      if(done)break;
      size+=value.byteLength;if(size>max){await reader.cancel();return reply(413,{accepted:false});}chunks.push(value);
    }
    data=JSON.parse(Buffer.concat(chunks).toString('utf8'));
  }catch{return reply(400,{accepted:false});}
  if(!data||typeof data!=='object')return reply(400,{accepted:false});
  if(data.company_url)return reply(422,{accepted:false});
  const clean=key=>typeof data[key]==='string'?data[key].trim():'';
  const name=clean('name'),email=clean('email'),service=clean('service'),message=clean('message');
  const choices=[...copy.en.options,...copy.bn.options];
  if(!name||name.length>100||email.length>254||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(email)||!choices.includes(service)||message.length<10||message.length>3000)return reply(422,{accepted:false});
  if(!process.env.RESEND_API_KEY||!process.env.INQUIRY_FROM)return reply(503,{accepted:false});
  const text=`Name: ${name}\nEmail: ${email}\nService: ${service}\n\n${message}`;
  const key=createHash('sha256').update(Math.floor(Date.now()/86400000)+'\n'+text).digest('hex');
  try{
    const delivery=await fetch('https://api.resend.com/emails',{
      method:'POST',signal:AbortSignal.timeout(12000),headers:{Authorization:`Bearer ${process.env.RESEND_API_KEY}`,'Content-Type':'application/json','Idempotency-Key':key},
      body:JSON.stringify({from:process.env.INQUIRY_FROM,to:[company.email],reply_to:email,subject:`jhijhilab · ${service}`,text})
    });
    if(!delivery.ok || !(await delivery.json()).id)return reply(502,{accepted:false});
    return reply(200,{accepted:true});
  }catch{return reply(502,{accepted:false});}
}

export default { fetch: handle };

