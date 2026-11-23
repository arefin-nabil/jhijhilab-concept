const projects = [
  {
    id: 'snake-app',
    image: 'app.webp',
    url: 'https://play.google.com/store/apps/details?id=bd.snake.app',
    en: {
      name: 'Snake Rescue BD', group: 'Android app', short: 'Rescue app',
      summary: 'A Bengali field guide for exploring snake species, browsing the rescue map and finding wildlife information on a phone.',
      action: 'View on Google Play', alt: 'A screen from the Snake Rescue BD Android app'
    },
    bn: {
      name: 'স্নেক রেসকিউ বিডি', group: 'অ্যান্ড্রয়েড অ্যাপ', short: 'রেসকিউ অ্যাপ',
      summary: 'ফোনে বাংলায় সাপের প্রজাতি সম্পর্কে পড়া যায়, মানচিত্রে উদ্ধারকারীদের খুঁজে পাওয়া যায় এবং বন্যপ্রাণী সম্পর্কে জানা যায়।',
      action: 'Google Play-তে দেখুন', alt: 'স্নেক রেসকিউ বিডি অ্যান্ড্রয়েড অ্যাপের স্ক্রিন'
    }
  },
  {
    id: 'rescue-web',
    image: 'rescue-web.webp',
    url: 'https://snakerescuebd.com/',
    en: {
      name: 'Snake Rescue BD', group: 'Wildlife resource website', short: 'Rescue website',
      summary: 'A searchable Bengali resource that brings species profiles, district rescue contacts and a hospital directory into one website.',
      action: 'Visit the website', alt: 'The public Snake Rescue BD website'
    },
    bn: {
      name: 'স্নেক রেসকিউ বিডি', group: 'বন্যপ্রাণী বিষয়ক ওয়েবসাইট', short: 'রেসকিউ ওয়েব',
      summary: 'সাপের পরিচিতি, জেলাভিত্তিক উদ্ধারকারীর যোগাযোগ ও হাসপাতালের তালিকা এক জায়গায় খুঁজে পাওয়ার বাংলা ওয়েবসাইট।',
      action: 'ওয়েবসাইট দেখুন', alt: 'স্নেক রেসকিউ বিডির ওয়েবসাইট'
    }
  },
  {
    id: 'buyntake',
    image: 'buyntake.webp',
    url: 'https://buyntake27.com/',
    en: {
      name: 'BuyNTAKE', group: 'E-commerce portal', short: 'BuyNTAKE',
      summary: 'A customer portal for browsing products across fashion, fragrance and electronics, with a member area for wallets and rewards.',
      action: 'Explore the store', alt: 'The BuyNTAKE customer shopping portal'
    },
    bn: {
      name: 'BuyNTAKE', group: 'ই-কমার্স পোর্টাল', short: 'BuyNTAKE',
      summary: 'পোশাক, সুগন্ধি ও ইলেকট্রনিকস পণ্য দেখার অনলাইন পোর্টাল। সদস্যদের জন্য ওয়ালেট ও রিওয়ার্ডস দেখার আলাদা জায়গা রয়েছে।',
      action: 'স্টোর ঘুরে দেখুন', alt: 'BuyNTAKE-এর অনলাইন শপিং পোর্টাল'
    }
  }
];
const workLabels = {
  en: {nav:'Projects', explore:'See our work', section:'Portfolio', heading:'Selected', accent:'work.', intro:'Explore the app and websites we’ve worked on, from wildlife resources to online shopping.', choose:'Choose a project'},
  bn: {nav:'প্রজেক্ট', explore:'আমাদের কাজ দেখুন', section:'পোর্টফোলিও', heading:'নির্বাচিত', accent:'কাজ।', intro:'বন্যপ্রাণী সম্পর্কে জানা থেকে অনলাইন কেনাকাটা পর্যন্ত, আমাদের তৈরি অ্যাপ ও ওয়েবসাইটগুলো ঘুরে দেখুন।', choose:'প্রজেক্ট বেছে নিন'}
};
function projectVisual(project, text) {
  const screen = `<img src="/assets/projects/${project.image}" alt="${text.alt}" loading="lazy" decoding="async">`;
  if (project.id === 'snake-app') return `<div class="project-visual phone-visual"><div class="phone-glass">${screen}</div></div>`;
  return `<div class="project-visual web-visual"><div class="web-glass"><div class="window-bar" aria-hidden="true"><i></i><i></i><i></i></div>${screen}</div></div>`;
}
function portfolio(lang) {
  const t = workLabels[lang];
  const choices = projects.map(project => {
    const item = project[lang];
    return `<button type="button" id="select-${project.id}" data-project="${project.id}" aria-controls="project-${project.id}"><span class="project-key key-${project.id}" aria-hidden="true"></span><span>${item.short}</span></button>`;
  }).join('');
  const panels = projects.map(project => {
    const item = project[lang];
    return `<article class="project-panel ${project.id}" id="project-${project.id}">
      <div class="project-story">
        <p class="project-type">${item.group}</p>
        <h3>${item.name}</h3>
        <p class="project-summary">${item.summary}</p>
        <a class="project-link" href="${project.url}">${item.action}</a>
      </div>
      ${projectVisual(project,item)}
    </article>`;
  }).join('');
  return `<section id="projects" class="section portfolio" aria-labelledby="portfolio-title"><div class="shell">
    <div class="section-heading"><div><p class="eyebrow"><i></i>${t.section}</p><h2 id="portfolio-title">${t.heading} <em>${t.accent}</em></h2></div><p>${t.intro}</p></div>
    <div class="project-gallery"><div class="project-tabs" aria-label="${t.choose}" hidden>${choices}</div><div class="project-panels">${panels}</div></div>
  </div></section>`;
}

export { portfolio, workLabels };
