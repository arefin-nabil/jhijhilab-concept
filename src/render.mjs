import { copy } from './content.mjs';
import { company } from './company.mjs';

const paths = {home:'',lab:'lab/',studio:'studio/',contact:'contact/',privacy:'privacy/'};
const href = (lang, page) => (lang === 'bn' ? '/bn/' : '/') + paths[page];
const esc = v => String(v ?? '').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const symbols = {
  globe:'<circle cx="12" cy="12" r="8.8"/><ellipse cx="12" cy="12" rx="3.6" ry="8.8"/><path d="M3.2 12h17.6"/>',
  mark:'<path d="M7 2v7H2m15-7v7h5M7 22v-7H2m15 7v-7h5"/>',
  menu:'<path d="M3 7h18M3 12h18M3 17h18"/>',
  web:'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 9h20M5 6.5h1m2 0h1"/>',
  mobile:'<rect x="6" y="1.5" width="12" height="21" rx="2.5"/><path d="M10 4h4m-3 16h2"/>',
  backend:'<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v7c0 4 18 4 18 0V5M3 12v7c0 4 18 4 18 0v-7"/>',
  pin:'<path d="M19 9c0 5-7 12-7 12S5 14 5 9a7 7 0 0 1 14 0Z"/><circle cx="12" cy="9" r="2.5"/>',
  mail:'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m3 6 9 7 9-7"/>',
  download:'<path d="M12 2v13m-5-5 5 5 5-5M3 16v5h18v-5"/>',
  play:'<path d="m7 4 13 8-13 8z"/>',
  spark:'<path d="M12 1v22M1 12h22M4 4l16 16M4 20 20 4"/>',
  leaf:'<path d="M19 3C9 3 4 8 5 15c5 5 13 1 14-12ZM4 21 15 9"/>',
  check:'<path d="m4 12 5 5L20 6"/>',
  grid:'<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>'
};
const ico = (name, klass='') => `<svg class="icon ${klass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.55" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${symbols[name]}</svg>`;
function wordmark(lang) {return `<a href="${href(lang,'home')}" class="wordmark" aria-label="jhijhilab · ${copy[lang].home}"><span class="sign"><img src="/assets/logo-mark.svg" alt=""></span><span>jhijhilab<span class="word-period">.</span></span></a>`;}
const eyebrow = value => `<p class="eyebrow"><i></i>${value}</p>`;
const action = (url, label, icon='', style='primary') => `<a class="button ${style}" href="${url}">${icon?ico(icon):''}<span>${label}</span></a>`;
function pageHeading(tag, lines, intro) {return `<div class="page-heading">${eyebrow(tag)}<h1>${lines[0]} <em>${lines[1]}</em></h1><p class="lead">${intro}</p></div>`;}
function header(lang,page){
  const t=copy[lang], other=lang==='en'?'bn':'en';
  const items=[['home',t.nav[0],'#services'],['lab',t.nav[1],''],['studio',t.nav[2],'']];
  const links=items.map(([p,label,anchor])=>`<a ${page===p&&!anchor?'aria-current="page"':''} href="${href(lang,p)}${anchor}">${label}</a>`).join('');
  return `<a class="skip" href="#main">${t.skip}</a><header><div class="shell nav-inner">${wordmark(lang)}
    <nav class="desktop-nav" aria-label="${lang==='en'?'Main':'প্রধান'}">${links}</nav><div class="nav-actions"><a class="language" hreflang="${other}" lang="${other}" href="${href(other,page==='404'?'home':page)}">${ico('globe')}<span>${t.language}</span></a><a class="nav-cta" href="${href(lang,'contact')}">${t.start}</a><button id="menu-toggle" aria-expanded="false" aria-controls="mobile-nav" aria-label="${t.menu}" data-open="${t.menu}" data-close="${t.close}">${ico('menu')}</button></div></div>
    <nav class="mobile-nav" id="mobile-nav" aria-label="${lang==='en'?'Mobile navigation':'মোবাইল মেনু'}" hidden>${links}<a href="${href(lang,'contact')}">${t.start}</a></nav></header>`;
}
const contactLinks=(lang)=>`<a href="mailto:${company.email}">${company.email}</a><a href="tel:${company.phone}">${company.displayPhone}</a><span>${company.address[lang]}</span>`;
function footer(lang){
 const t=copy[lang];
 return `<footer><div class="shell footgrid"><div>${wordmark(lang)}<p>${t.footerIntro}</p></div><div class="footlinks"><a href="${href(lang,'home')}#services">${t.nav[0]}</a><a href="${href(lang,'lab')}">${t.nav[1]}</a><a href="${href(lang,'studio')}">${t.nav[2]}</a></div><div class="footcontact">${contactLinks(lang)}</div></div><div class="shell footbottom"><span>© ${new Date().getUTCFullYear()} jhijhilab</span><a href="${href(lang,'privacy')}">${t.privacy}</a></div></footer>`;
}
function invitation(lang){const t=copy[lang];return `<section class="invitation"><div class="shell invite-in"><div>${eyebrow(t.ctaTag)}<h2>${t.cta}</h2><p>${t.ctaBody}</p></div>${action(href(lang,'contact'),t.start,'','light')}</div></section>`;}
function toolkit(t){return `<div class="toolkit"><div class="shell tool-row"><span class="tool-label">${t.stackLabel}</span><div class="technologies"><span><b class="react-symbol" aria-hidden="true">⚛</b> React</span><span><b class="next-symbol" aria-hidden="true">N</b> Next.js</span><span><b class="node-symbol" aria-hidden="true">JS</b> Node.js</span><span><b class="flutter-symbol" aria-hidden="true"></b> Flutter</span><span>${ico('leaf')} MongoDB</span></div></div></div>`;}
function home(lang){
 const t=copy[lang];
 return `<section class="hero"><div class="shell hero-grid"><div class="hero-copy">${eyebrow(t.heroTag)}<h1>${t.heroTitle[0]}<br><em>${t.heroTitle[1]}</em></h1><p class="lead">${t.intro}</p><div class="actions">${action(href(lang,'contact'),t.start)}${action(href(lang,'lab'),t.seeLab,'grid','secondary')}</div></div>
 <figure class="hero-art"><div class="art-stage"><img class="hero-image" src="/assets/hero.webp" width="1536" height="1024" fetchpriority="high" alt="${t.artwork}"><span class="cross c1" aria-hidden="true"></span><span class="cross c2" aria-hidden="true"></span><span class="cross c3" aria-hidden="true"></span><span class="cross c4" aria-hidden="true"></span></div>
 <figcaption><div class="layer-selector" role="group" aria-label="${t.model}">${t.layers.map((name,i)=>`<button type="button" aria-pressed="${i===0}" data-layer="${i}" data-info="${t.layerInfo[i]}"><i></i>${name}</button>`).join('')}</div><span class="layer-desc" aria-live="polite">${t.layerInfo[0]}</span></figcaption></figure></div></section>
 ${toolkit(t)}
 <section class="section services" id="services"><div class="shell"><div class="section-heading"><div>${eyebrow(t.servicesTag)}<h2>${t.servicesTitle}</h2></div><p>${t.servicesIntro}</p></div><div class="service-grid">${t.services.map(s=>`<article class="service-card"><div class="service-icon">${ico(s.type)}</div><h3>${s.name}</h3><p>${s.desc}</p><details><summary>${t.more}<span class="plus" aria-hidden="true"></span></summary><p>${s.details}</p><small>${s.tools}</small></details></article>`).join('')}</div></div></section>
 <section class="section work"><div class="shell"><div class="section-heading"><div>${eyebrow(t.labTag)}<h2>${t.labTitle}</h2></div><p>${t.labIntro}</p></div><div class="demo-grid">${t.demos.map((d,i)=>`<a class="work-card" href="${href(lang,'lab')}#${d.slug}"><div class="work-image ${d.slug}">${workPreview(t,i)}</div><div class="work-info"><span class="meta">${d.kind}</span><h3>${d.name}</h3><p>${d.desc}</p><span class="text-link">${t.openDemo} ${ico('play')}</span></div></a>`).join('')}</div></div></section>${invitation(lang)}`;
}
function workPreview(t,index){
 if(index===0) return `<div class="mini-browser" aria-hidden="true"><div class="tiny-top"><b></b><b></b><b></b></div><div class="mini-app"><small>${ico('leaf')} CANOPY</small><strong>${t.inventory}</strong>${t.plants.map((p,i)=>`<div><span>${p}</span><b>${[24,12,8][i]}</b></div>`).join('')}</div></div>`;
 return `<div class="mini-phone" aria-hidden="true"><i></i><div class="mini-phone-ui"><small>FIELDNOTE</small>${ico('pin')}<strong>${t.visit}</strong>${t.tasks.map((p,i)=>`<div><b>${i===0?'✓':''}</b>${p}</div>`).join('')}</div></div>`;
}
function companyDetails(lang){const t=copy[lang];const rows=[[t.brand,company.brand],...(company.legalName?[[t.legal,esc(company.legalName)]]:[]),[t.base,company.address[lang]],[t.email,`<a href="mailto:${company.email}">${company.email}</a>`],[t.phone,`<a href="tel:${company.phone}">${company.displayPhone}</a>`],[t.website,`<a href="${company.origin}">${new URL(company.origin).hostname}</a>`]];return `<div class="company-panel"><h2>${t.company}</h2><dl>${rows.map(([k,v])=>`<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl><a class="text-link" href="/assets/jhijhilab-logo.svg" download>${ico('download')}${t.brandAsset}</a></div>`;}
function studio(lang){const t=copy[lang];return `<div class="shell studio-top">${pageHeading(t.studioTag,t.studioTitle,t.studioIntro)}${companyDetails(lang)}</div><section class="section work"><div class="shell"><div class="section-heading"><h2>${t.approach}</h2></div><div class="steps">${t.steps.map(([title,desc])=>`<article><i></i><h3>${title}</h3><p>${desc}</p></article>`).join('')}</div></div></section>${invitation(lang)}`;}
function lab(lang){
 const t=copy[lang],fmt=new Intl.NumberFormat(lang==='bn'?'bn-BD':'en');
 return `<div class="shell inner-page lab-page">${pageHeading(t.labTag,t.labPageTitle,t.labPageDesc)}
 <div class="demo-tabs" role="group" aria-label="${t.demoChooser}">${t.demos.map((d,i)=>`<button aria-pressed="${i===0}" data-demo="${d.slug}">${ico(i?'mobile':'web')}${d.name}</button>`).join('')}</div>
 ${t.demos.map((d,i)=>`<section class="lab-demo" id="${d.slug}" ${i?'hidden':''}><div class="demo-intro">${eyebrow(t.sample)}<h2>${d.name}</h2><p>${d.desc}</p><button type="button" class="text-link" data-reset="${d.slug}">${t.reset}</button></div><div class="product-ui ${d.slug}"><div class="product-bar">${ico(i?'pin':'leaf')}<b>${d.name}</b><span>${d.kind}</span></div>${i===0?`<div class="product-body"><small>${t.inventorySub}</small><h3>${t.inventory}</h3>${t.plants.map((p,j)=>`<div class="stock-row"><span>${p}</span><div><button data-stock="${j}" data-delta="-1" aria-label="${p} · ${t.remove}">−</button><output id="stock-${j}">${fmt.format([24,12,8][j])}</output><button data-stock="${j}" data-delta="1" aria-label="${p} · ${t.add}">+</button></div></div>`).join('')}<div class="total-line"><span>${t.total}</span><strong id="stock-total" aria-live="polite">${fmt.format(44)}</strong></div></div>`:`<div class="product-body"><small>${t.visitSub}</small><h3>${t.visit}</h3>${t.tasks.map((p,j)=>`<label class="task-row"><input type="checkbox" data-task ${j===0?'checked':''}><span>${p}</span></label>`).join('')}<div class="total-line"><span>${t.completed}</span><strong id="task-total" aria-live="polite">${fmt.format(1)} / ${fmt.format(3)}</strong></div></div>`}</div></section>`).join('')}</div>${invitation(lang)}`;
}
function contact(lang, canSend){
 const t=copy[lang];
 const ui=esc(JSON.stringify(Object.fromEntries(['sent','opened','error','sending','saved','send','draft','name','mail','interest','message'].map(k=>[k,t[k]]))));
 return `<div class="shell contact-grid"><div>${pageHeading(t.contactTag,t.contactTitle,t.contactIntro)}<div class="contact-direct"><h2>${t.direct}</h2>${contactLinks(lang)}</div></div>
 <form id="enquiry" class="form-panel" data-online="${canSend}" data-email="${company.email}" data-ui="${ui}" action="mailto:${company.email}" method="post" enctype="text/plain"><h2>${t.formTitle}</h2><div class="fields-pair"><label>${t.name}<input name="name" autocomplete="name" required maxlength="100"></label><label>${t.mail}<input name="email" type="email" autocomplete="email" required maxlength="254"></label></div><label>${t.interest}<select name="service">${t.options.map(v=>`<option>${v}</option>`).join('')}</select></label><label>${t.message}<textarea name="message" rows="5" required minlength="10" maxlength="3000" placeholder="${t.placeholder}"></textarea></label>
 <label class="trap" aria-hidden="true">Company URL<input name="company_url" tabindex="-1" autocomplete="off"></label><p class="form-hint">${canSend?t.onlineHint:t.defaultHint}</p><div class="form-actions"><button type="submit" class="button primary">${ico('mail')}<span>${canSend?t.send:t.draft}</span></button><button type="button" class="text-link" id="download-brief">${ico('download')}${t.save}</button></div><p id="form-status" role="status"></p><a id="mail-fallback" class="text-link" hidden>${t.altDraft}</a></form></div>`;
}
function privacy(lang){const t=copy[lang];return `<div class="shell prose"><h1>${t.privacyTitle}</h1>${t.privacySections.map(([h,p])=>`<h2>${h}</h2><p>${p}</p>`).join('')}<p><a class="text-link" href="mailto:${company.email}">${company.email}</a></p></div>`;}
function render(lang,page,settings){
 const t=copy[lang],titleMap={home:t.homeTitle,lab:t.nav[1],studio:t.nav[2],contact:t.contactTag,privacy:t.privacyTitle,'404':t.notFound}, descMap={home:t.intro,lab:t.labPageDesc,studio:t.studioIntro,contact:t.contactIntro,privacy:t.privacySections[0][1]};
 const title=`${titleMap[page]} | jhijhilab`,desc=descMap[page]||t.intro;
 const markup=page==='home'?home(lang):page==='studio'?studio(lang):page==='lab'?lab(lang):page==='contact'?contact(lang,settings.canSend):page==='privacy'?privacy(lang):`<section class="shell prose"><h1>${t.notFound}</h1>${action(href(lang,'home'),t.back)}</section>`;
 const schema={'@context':'https://schema.org','@type':'Organization',name:company.brand,url:settings.origin,email:company.email,telephone:company.phone,logo:settings.origin+'/assets/favicon.png',address:{'@type':'PostalAddress',streetAddress:'Barmi',addressLocality:'Sreepur',addressRegion:'Gazipur',addressCountry:'BD'},...(company.legalName?{legalName:company.legalName}:{})};
 const canonical=page==='404'?'':settings.origin+href(lang,page);
 const alternates=page==='404'?'':['en','bn','x-default'].map(l=>`<link rel="alternate" hreflang="${l}" href="${settings.origin+href(l==='bn'?'bn':'en',page)}">`).join('');
 return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><meta name="description" content="${esc(desc)}"><meta name="theme-color" content="#090a0e"><link rel="icon" href="/assets/favicon.png" type="image/png"><link rel="apple-touch-icon" href="/assets/favicon.png">${canonical?`<link rel="canonical" href="${canonical}">`:'<meta name="robots" content="noindex">'}${alternates}${settings.token?`<meta name="google-site-verification" content="${esc(settings.token)}">`:''}<meta property="og:type" content="website"><meta property="og:site_name" content="jhijhilab"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:image" content="${settings.origin}/assets/social-card.png">${canonical?`<meta property="og:url" content="${canonical}">`:''}<meta name="twitter:card" content="summary_large_image"><link rel="stylesheet" href="/styles.css"><script type="application/ld+json">${JSON.stringify(schema).replace(/</g,'\\u003c')}</script><script src="/site.js" defer></script></head><body>${header(lang,page)}<main id="main">${markup}</main>${footer(lang)}</body></html>`;
}

export { render, paths, href };

