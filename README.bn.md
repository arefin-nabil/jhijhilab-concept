# jhijhilab কোম্পানি ওয়েবসাইট

ইংরেজি হোমপেজ `/`, বাংলা হোমপেজ `/bn/`। দুই ভাষায় হোম, ল্যাব, স্টুডিও, প্রজেক্ট যোগাযোগ ও গোপনীয়তা পেজ রয়েছে। ল্যাবে নমুনা তথ্য দিয়ে Canopy ও Fieldnote ব্যবহার করা যায়।

## এক মিনিটে দেখে নিন

ZIP ফাইলটি পুরোটা আনজিপ করে `preview/index.html` ব্রাউজারে খুলুন। বাংলা দেখতে নেভিগেশন থেকে **বাংলা** নির্বাচন করুন। অফলাইন প্রিভিউতে লোগো, ছবি, নেভিগেশন, মজুত পরিবর্তন, চেকলিস্ট এবং ব্রিফ ডাউনলোড কাজ করে। ইমেইলের খসড়া খোলার জন্য ডিভাইসে একটি ইমেইল অ্যাপ বা mailto হ্যান্ডলার সেট করা থাকতে হয়।

## লোকাল সার্ভার

Node.js 22 দিয়ে প্রজেক্টের মূল ফোল্ডারে চালান।

```sh
npm run dev
```

টার্মিনালে দেখানো ঠিকানায় সাইট খুলুন। ডিফল্ট ঠিকানা `http://127.0.0.1:4327/`। পরিবর্তনের পর সার্ভার আবার চালালে পেজগুলো নতুন করে তৈরি হবে। আলাদা npm প্যাকেজ ইনস্টল করার প্রয়োজন নেই।

```sh
npm run build
node scripts/offline.mjs
```

প্রথম কমান্ডে প্রোডাকশনের HTML, CSS ও ছবি `dist/`-এ যায়। দ্বিতীয় কমান্ডে `preview/` নতুন করে তৈরি হয়। Vercel Function রয়েছে `api/inquiry.js`-এ।

## Vercel-এ প্রকাশ

১. সোর্স কোড নিজের Git রিপোজিটরিতে রাখুন। Vercel-এ **Add New → Project** দিয়ে সেই রিপোজিটরি ইমপোর্ট করুন। Root Directory হবে যে ফোল্ডারে `package.json` ও `vercel.json` আছে। Framework Preset **Other**। কনফিগারেশনে বিল্ড কমান্ড `npm run build` এবং আউটপুট `dist` দেওয়া আছে।

২. প্রজেক্ট ডিপ্লয় করে পাওয়া প্রিভিউতে দুই ভাষার পেজ ও যোগাযোগ পরীক্ষা করুন। Vercel-এর Hobby শর্ত ব্যক্তিগত বা অবাণিজ্যিক ব্যবহারের জন্য। বাণিজ্যিক স্টুডিওর সাইট চালাতে আপনার টিমের উপযুক্ত প্ল্যান ব্যবহার করুন। [Vercel-এর শর্ত](https://vercel.com/legal/terms)

৩. Project Settings-এর Domains-এ `jhijhilab.com` যোগ করুন। Vercel ওই প্রজেক্টের জন্য যে DNS রেকর্ড দেখায়, ডোমেইনের DNS প্যানেলে সেটি দিন। ইমেইল সচল রাখতে বর্তমান MX, SPF ও DKIM রেকর্ড সংরক্ষণ করুন। HTTPS চালু হলে মূল ডোমেইন থেকে সাইট খুলে দেখুন।

## যোগাযোগ ও ইমেইল

প্রকাশযোগ্য ঠিকানা **Barmi, Sreepur, Gazipur, Bangladesh**। ইমেইল **contact@jhijhilab.com**, ফোন **+880 1401 606882**। ডিফল্ট ফর্ম ক্লায়েন্টের ইমেইল অ্যাপে সম্পূর্ণ ব্রিফসহ খসড়া খোলে। ক্লায়েন্ট সেখানে Send চাপলে বার্তাটি যায়। ব্রিফ টেক্সট ফাইল হিসেবেও ডাউনলোড করা যায়।

সরাসরি ওয়েবসাইট থেকে ব্রিফ পেতে চাইলে Resend-এ প্রেরক ডোমেইন যাচাই করুন। Vercel Environment Variables-এ `RESEND_API_KEY` এবং `INQUIRY_FROM` দিন। দ্বিতীয় মানটি আপনার যাচাইকৃত ডোমেইনের sender address। পুনরায় deploy করলে সরাসরি পাঠানোর বোতাম চালু হবে। API key কেবল সার্ভারে ব্যবহৃত হয়। প্রোডাকশন চালুর পর নিজের ইনবক্সে একটি পরীক্ষামূলক বার্তা পৌঁছাচ্ছে কি না দেখুন। [Resend নির্দেশনা](https://resend.com/docs/api-reference/emails/send-email)

## প্রতিষ্ঠানের পরিচয় ও Google Play

ব্র্যান্ডের ইংরেজি বানান **jhijhilab**। নথিতে নিবন্ধিত নাম নিশ্চিত হলে `src/company.mjs`-এর `legalName`-এ হুবহু সেই নাম লিখুন। বিল্ডের পর সেটি Studio পেজ এবং Organization structured data-তে যোগ হবে। একই ফাইলে যোগাযোগের তথ্য সংশোধন করা যায়। সাইটে অনুমান করে কোনো নিবন্ধন নম্বর বা পদবি যোগ করা হয়নি।

১. D‑U‑N‑S-এর জন্য প্রতিষ্ঠানের নথিতে ব্যবহৃত নাম ও সম্পূর্ণ ব্যবসায়িক ঠিকানা প্রস্তুত করুন। বর্তমান Studio পেজে আপনার দেওয়া সংক্ষিপ্ত ঠিকানা রয়েছে। নথিতে ডাকঘর, পোস্টকোড বা আরও নির্দিষ্ট ঠিকানা থাকলে সেগুলো মিলিয়ে নিন। [Dun & Bradstreet](https://www.dnb.com/en-us/smb/duns/get-a-duns.html)

২. Google Payments-এর প্রতিষ্ঠানের আইনি নাম ও ঠিকানা D&B-এর রেকর্ডের সঙ্গে হুবহু মেলাতে হবে। Play Console-এ প্রতিষ্ঠানের ওয়েবসাইট ও যোগাযোগের তথ্যও লাগে। বাংলাদেশের জন্য প্রযোজ্য নথির বর্তমান তালিকা Google-এর পেজে দেখুন। [Play Console-এর প্রয়োজনীয় তথ্য](https://support.google.com/googleplay/android-developer/answer/13628312) · [বাংলাদেশের নথির তালিকা](https://support.google.com/googleplay/android-developer/answer/15633622?co=GENIE.CountryCode%3DBD&hl=en)

৩. Search Console-এ ডোমেইনের মালিকানা যাচাই করুন। Domain property-তে Google-এর DNS TXT রেকর্ড দিন। URL-prefix property-তে HTML tag পদ্ধতি নিলে `GOOGLE_SITE_VERIFICATION`-এ শুধু token দিয়ে আবার deploy করুন। পরে Play Console-এর Account details থেকে website verification request পাঠান। [ওয়েবসাইট যাচাই](https://support.google.com/googleplay/android-developer/answer/13205715)

## ব্র্যান্ড ও কনটেন্ট সম্পাদনা

| যা বদলাবেন | ফাইল |
| --- | --- |
| যোগাযোগ, ডোমেইন ও নিবন্ধিত নাম | `src/company.mjs` |
| বাংলা ও ইংরেজি লেখা | `src/content.mjs` |
| পেজের কাঠামো | `src/render.mjs` |
| রং, টাইপ ও রেসপনসিভ লেআউট | `public/styles.css` |
| ডেমো ও ব্রিফ ফর্ম | `public/site.js` |
| পূর্ণ লোগো | `public/assets/jhijhilab-logo.svg` ও `public/assets/jhijhilab-logo.png` |
| স্বচ্ছ সাদা মনোগ্রাম | `public/assets/logo-mark.svg` ও `public/assets/logo-mark.png` |
| ফ্যাভিকন | `public/assets/favicon.png` |

