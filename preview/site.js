'use strict';
const $ = (selector,root=document) => root.querySelector(selector);
const $$ = (selector,root=document) => Array.from(root.querySelectorAll(selector));
const lang = document.documentElement.lang;
const menuToggle = $('#menu-toggle'), menu = $('#mobile-nav');
function setMenu(open) {
  menu.hidden = !open;
  menuToggle.setAttribute('aria-expanded',String(open));
  menuToggle.setAttribute('aria-label',open ? menuToggle.dataset.close : menuToggle.dataset.open);
}
menuToggle.addEventListener('click',()=>setMenu(menu.hidden));
menu.addEventListener('click',()=>setMenu(false));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!menu.hidden){setMenu(false);menuToggle.focus();}});
matchMedia('(min-width:721px)').addEventListener('change', e=>{if(e.matches)setMenu(false);});
const langLink = $('.language');
function syncLanguageLink(){
  const target=new URL(langLink.href);
  target.hash = location.hash;
  langLink.href = target.href;
}
syncLanguageLink();
window.addEventListener('hashchange',syncLanguageLink);
const layers = $$('button[data-layer]');
layers.forEach(button=>button.addEventListener('click',()=>{
  layers.forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
  $('.layer-desc').textContent = button.dataset.info;
  $('.art-stage').dataset.layer = button.dataset.layer;
}));
const demoButtons = $$('[data-demo]');
if(demoButtons.length){
  const fmt=new Intl.NumberFormat(lang==='bn'?'bn-BD':'en');
  const initial=[24,12,8],counts=[...initial];
  const taskInputs=$$('[data-task]');
  function renderStock(){
    counts.forEach((count,i)=>{
      $('#stock-'+i).textContent=fmt.format(count);
      $(`[data-stock="${i}"][data-delta="-1"]`).disabled=count===0;
    });
    $('#stock-total').textContent=fmt.format(counts.reduce((a,b)=>a+b,0));
  }
  function renderTasks(){
    $('#task-total').textContent=fmt.format(taskInputs.filter(x=>x.checked).length)+' / '+fmt.format(taskInputs.length);
  }
  function selectDemo(){
    const id=location.hash==='#fieldnote'?'fieldnote':'canopy';
    demoButtons.forEach(button=>{
      const active=button.dataset.demo===id;
      button.setAttribute('aria-pressed',String(active));
      document.getElementById(button.dataset.demo).hidden=!active;
    });
    syncLanguageLink();
  }
  demoButtons.forEach(button=>button.addEventListener('click',()=>{
    history.replaceState(null,'','#'+button.dataset.demo);
    selectDemo();
  }));
  window.addEventListener('hashchange',selectDemo);
  selectDemo();
  $$('[data-stock]').forEach(button=>button.addEventListener('click',()=>{
    const i=Number(button.dataset.stock);
    counts[i]=Math.max(0,counts[i]+Number(button.dataset.delta));
    renderStock();
  }));
  taskInputs.forEach(input=>input.addEventListener('change',renderTasks));
  $('[data-reset="canopy"]').addEventListener('click',()=>{counts.splice(0,counts.length,...initial);renderStock();});
  $('[data-reset="fieldnote"]').addEventListener('click',()=>{taskInputs.forEach((el,i)=>{el.checked=i===0;});renderTasks();});
}
const enquiry=$('#enquiry');
if(enquiry){
  const ui=JSON.parse(enquiry.dataset.ui), status=$('#form-status'),fallback=$('#mail-fallback');
  const submit=$('button[type=submit]',enquiry);
  const fields=['name','email','service','message'];
  function values(){
    const data=new FormData(enquiry);
    return Object.fromEntries([...fields,'company_url'].map(k=>[k,String(data.get(k)||'').trim()]));
  }
  function brief(data){return `${ui.name}: ${data.name}\n${ui.mail}: ${data.email}\n${ui.interest}: ${data.service}\n\n${ui.message}\n${data.message}`;}
  function mailto(data){return 'mailto:'+enquiry.dataset.email+'?subject='+encodeURIComponent('jhijhilab · '+data.service)+'&body='+encodeURIComponent(brief(data));}
  function check(){
    enquiry.elements.name.setCustomValidity(enquiry.elements.name.value.trim()?'':(lang==='bn'?'আপনার নাম লিখুন।':'Please enter your name.'));
    enquiry.elements.message.setCustomValidity(enquiry.elements.message.value.trim().length>=10?'':(lang==='bn'?'অন্তত ১০ অক্ষরে প্রজেক্টের বিবরণ লিখুন।':'Describe the project in at least 10 characters.'));
    return enquiry.reportValidity();
  }
  enquiry.addEventListener('input',()=>{
    enquiry.elements.name.setCustomValidity('');enquiry.elements.message.setCustomValidity('');
    fallback.hidden=true;status.textContent='';
  });
  $('#download-brief').addEventListener('click',()=>{
    if(!check())return;
    const url=URL.createObjectURL(new Blob(['\uFEFF'+brief(values())],{type:'text/plain;charset=utf-8'}));
    const a=document.createElement('a');a.href=url;a.download='jhijhilab-project-brief.txt';a.click();
    setTimeout(()=>URL.revokeObjectURL(url),3000);status.textContent=ui.saved;
  });
  enquiry.addEventListener('submit',async event=>{
    event.preventDefault();
    if(!check()||submit.disabled)return;
    const data=values();fallback.href=mailto(data);
    if(enquiry.dataset.online!=='true'){
      location.href=fallback.href;status.textContent=ui.opened;fallback.hidden=false;return;
    }
    submit.disabled=true;submit.querySelector('span').textContent=ui.sending;fallback.hidden=true;status.textContent='';
    try{
      const response=await fetch('/api/inquiry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data),signal:AbortSignal.timeout(18000)});
      if(!response.ok || !(await response.json()).accepted)throw new Error('Delivery');
      enquiry.reset();status.textContent=ui.sent;
    }catch{
      status.textContent=ui.error;fallback.hidden=false;
    }finally{
      submit.disabled=false;submit.querySelector('span').textContent=ui.send;
    }
  });
}

