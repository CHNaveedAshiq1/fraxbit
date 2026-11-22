/* fraxBIT demo build. All figures come from one STATS object so the hero,
   the red section and the footer always reconcile. */
const STATS = { projects: 240, countries: 22, years: 7 };
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

/* ================= DATA ================= */
const DISCIPLINES = [
  { name: 'Web Design', desc: 'Interfaces & UI', steps: ['Discovery and references', 'Wireframes and concepts', 'Design rounds with your feedback', 'Handoff ready for build'],
    services: [
      ['Website Design', '3 to 5 weeks', 'Full page designs|Art direction and imagery|Responsive layouts for every screen'],
      ['UI/UX Design', '2 to 6 weeks', 'User journeys and wireframes|Interface design in Figma|Usability checks before build'],
      ['Landing Pages', '1 to 2 weeks', 'One clear offer per page|Conversion-first layout|Fast, lightweight build'],
      ['Dashboard & SaaS UI', '3 to 6 weeks', 'Data-dense, readable screens|Component states and edge cases|Design that scales with the product'],
      ['Design Systems', '2 to 4 weeks', 'Tokens for colour, type and spacing|A reusable component library|Rules the whole team can follow'],
      ['Prototyping', '1 to 3 weeks', 'Clickable flows in Figma|Motion and interaction studies|Test before a line of code'],
      ['UX Audits', '1 to 2 weeks', 'Full journey review|Friction and drop-off report|Prioritised fix list'],
    ]},
  { name: 'Development', desc: 'Websites, software & apps', steps: ['Technical plan and stack choice', 'Build in visible weekly stages', 'Testing on real devices', 'Launch with tracking in place'],
    services: [
      ['Custom Websites', '4 to 8 weeks', 'Built from scratch, no templates|Editor-friendly content structure|Speed and SEO foundations'],
      ['Next.js & React', '4 to 10 weeks', 'Server-rendered, fast pages|Modern React architecture|Deployed on Vercel'],
      ['E-commerce & Shopify', '4 to 8 weeks', 'Storefront design and build|Checkout and payment setup|Product and collection structure'],
      ['Web Applications', '6 to 14 weeks', 'Accounts, roles and dashboards|Real data, real workflows|Built to scale past launch'],
      ['Custom Software', '8 to 16 weeks', 'Tools shaped to your process|Replaces spreadsheets and manual work|Documented and maintainable'],
      ['SaaS Platforms', '8 to 16 weeks', 'Subscriptions and billing|Multi-tenant architecture|Onboarding that converts'],
      ['Mobile Apps', '6 to 12 weeks', 'iOS and Android from one codebase|Store submission handled|Updates without drama'],
      ['APIs & Integrations', '2 to 6 weeks', 'CRM, payment and tool connections|Webhooks and automation hooks|Tested, monitored endpoints'],
    ]},
  { name: 'Growth', desc: 'SEO, AI search & marketing', steps: ['Audit and keyword groundwork', 'Technical and content fixes', 'Campaigns built and launched', 'Monthly reporting and iteration'],
    services: [
      ['SEO', 'Ongoing, from month 1', 'Technical SEO foundations|Pages built around real searches|Rankings tracked monthly'],
      ['AI Search (AEO & GEO)', 'Ongoing, from month 1', 'Content structured for AI answers|Entity and citation groundwork|Visibility checked across AI tools'],
      ['Google Ads', 'Live in 2 weeks', 'Search campaigns with tight intent|Landing pages that match the ad|Spend reported weekly'],
      ['Meta Ads', 'Live in 2 weeks', 'Creative and copy variants|Audience testing in stages|Retargeting that follows up'],
      ['Conversion Optimization', '3 to 6 weeks per round', 'Heatmap and funnel review|A/B tests with clear winners|Small changes, measured gains'],
      ['Email Automation', '2 to 4 weeks', 'Welcome and follow-up flows|Abandoned enquiry recovery|Plain reports, no vanity metrics'],
      ['Analytics & Tracking', '1 to 2 weeks', 'GA4 and event tracking set up|Dashboards you can read at a glance|Decisions based on real numbers'],
    ]},
  { name: 'AI Integration', desc: 'Intelligent systems & automation', steps: ['Use-case and data review', 'Prototype on your real content', 'Guardrails, testing and tuning', 'Launch with human oversight'],
    services: [
      ['AI Assistants & Chatbots', '3 to 6 weeks', 'Trained on your own content|Answers with sources, not guesses|Hands off to a human cleanly'],
      ['Custom AI Agents', '4 to 8 weeks', 'Agents that complete real tasks|Connected to your tools and data|Every action logged'],
      ['AI Lead Qualification', '2 to 4 weeks', 'Enquiries scored as they arrive|Hot leads routed instantly|Sales talks to buyers first'],
      ['Workflow Automation', '2 to 5 weeks', 'Repetitive steps automated end to end|n8n and Make pipelines|Errors flagged, never silent'],
      ['RAG & Knowledge Bases', '3 to 6 weeks', 'Your documents made searchable|Answers grounded in your files|Permissions respected'],
      ['LLM Integration', '2 to 5 weeks', 'OpenAI and Claude wired into your product|Costs tracked per request|Fallbacks when models fail'],
      ['AI MVP Development', '4 to 8 weeks', 'A working AI product, fast|Built to test with real users|Roadmap for what comes next'],
    ]},
];

const PROJECTS = [
  { id: 'medical', title: 'Medical Laboratory Website', cat: 'Website design and development', tag: 'Healthcare', img: 'img/work-medical.webp',
    intro: 'A laboratory group whose old site hid its services behind PDFs. We rebuilt it as a clear, fast website where every test and service is one click from an enquiry.',
    includes: ['Service pages written for patients and clinics', 'Accreditation and trust signals up front', 'Enquiry forms routed per department'],
    facts: [['Scope', 'Design and development'], ['Pages', '24'], ['Load time', 'Under 1 second'], ['Outcome', 'A direct route from service to enquiry']] },
  { id: 'vehicle', title: 'Vehicle Assistant App', cat: 'Mobile app design and development', tag: 'AUTOMOTIVE', img: 'img/work-vehicle.webp',
    intro: 'An app that puts the car in the driver\u2019s pocket: status, service history and assistance in one dark, glanceable interface.',
    includes: ['Vehicle status at a glance', 'Service booking inside the app', 'Push alerts for maintenance and recalls'],
    facts: [['Scope', 'App design and development'], ['Platforms', 'iOS and Android'], ['Core screens', '18'], ['Outcome', 'Assistance requests handled in-app']] },
  { id: 'construction', title: 'Construction Company', cat: 'Corporate website', tag: 'Construction', img: 'img/work-construction.webp',
    intro: 'A construction firm with serious projects and a website that did not show them. The rebuild leads with the work: big site photography and a project gallery that sells the next contract.',
    includes: ['Project gallery with filters', 'Services written for developers and councils', 'Tender enquiry form with document upload'],
    facts: [['Scope', 'Design and development'], ['Projects showcased', '31'], ['Headline', 'Creating a Brighter Future, Starting Today'], ['Outcome', 'A portfolio that wins meetings']] },
  { id: 'leads', title: 'AI Leads Management Dashboard', cat: 'Web application and dashboard UI', tag: 'SaaS', img: 'img/work-dashboard.webp',
    intro: 'A dashboard that scores every incoming lead with AI and puts the hottest enquiries at the top of the day, so sales teams stop working lists in the order they arrived.',
    includes: ['AI lead scoring on arrival', 'Pipeline board with owner and next step', 'Reports the whole team can read'],
    facts: [['Scope', 'Product design and build'], ['Integrations', 'CRM, email, ads'], ['Scoring', 'Every lead, in under a minute'], ['Outcome', 'Hot leads called first, every day']] },
  { id: 'travel', title: 'Travel Booking Platform', cat: 'Web platform', tag: 'Composed', img: 'img/collage-sky.webp', composed: true,
    intro: 'A booking platform concept composed for this demo build: coastal trips presented with the same big-photography, one-offer-per-screen pattern the studio uses on live work.',
    includes: ['Trip pages built around one destination', 'Live availability and pricing', 'Checkout in three steps'],
    facts: [['Scope', 'Platform design'], ['Status', 'Composed for this demo'], ['Pattern', 'Big photography, single offer'], ['Outcome', 'A storefront that feels like a brochure']] },
  { id: 'car-config', title: 'Performance Car Configurator', cat: 'Interactive product experience', tag: 'Composed', img: 'img/collage-car.webp', composed: true,
    intro: 'An interactive configurator composed for this demo build: the car updates live as buyers pick trim, wheels and interior, with the price reconciling on every change.',
    includes: ['Live price on every option', 'Interior and exterior views', 'Summary sheet ready to send to a dealer'],
    facts: [['Scope', 'Interactive experience'], ['Status', 'Composed for this demo'], ['Options', 'Every choice priced live'], ['Outcome', 'Buyers arrive already decided']] },
];

const PROCESS_STEPS = [
  { name: 'Strategy', copy: 'We learn your business, your offer, your ideal client and the goals behind the project.',
    includes: ['Kickoff workshop with the decision makers', 'Offer and ideal client mapped', 'Goals and success measures agreed'], facts: [['Length', 'Week 1'], ['Output', 'A written project strategy']] },
  { name: 'Build', copy: 'We design and develop a website or product built around performance and clarity.',
    includes: ['Design concepts you can react to', 'Development in visible weekly stages', 'Content and imagery placed as we go'], facts: [['Length', 'The core of the project'], ['Output', 'A working site on a staging link']] },
  { name: 'Launch', copy: 'We go live with the right structure, user journey and tracking foundations in place.',
    includes: ['Final checks on real devices', 'Analytics and tracking verified', 'Redirects and SEO structure in place'], facts: [['Length', 'Launch week'], ['Output', 'A live site, measured from day one']] },
  { name: 'Grow', copy: 'We keep improving results with optimization, traffic strategy and performance-focused changes.',
    includes: ['Monthly performance review', 'Tests and improvements shipped', 'Traffic strategy adjusted to data'], facts: [['Length', 'Ongoing'], ['Output', 'A site that keeps paying back']] },
];

const CHIP_GROUPS = [
  ['Design', [['Figma', 'Where every interface starts: shared files, comments and a single source of truth for design.'], ['Framer', 'For fast, animated marketing sites that need to ship and iterate quickly.']]],
  ['Development', [['Next.js', 'Our default framework for fast, server-rendered websites and apps.'], ['React', 'The component library behind our interfaces, from dashboards to stores.'], ['TypeScript', 'Typed code that catches errors before your visitors ever see them.'], ['Tailwind CSS', 'A utility system that keeps styling consistent and the CSS small.'], ['GSAP', 'The animation engine behind scroll stories, reveals and timelines like this page.'], ['Three.js', 'Light WebGL scenes, used as atmosphere and product moments, never as a burden.'], ['Node.js', 'The server runtime behind our APIs, automations and backends.'], ['Supabase', 'Database, auth and storage without running our own servers.'], ['Vercel', 'Where our sites deploy: previews for every change and a global edge network.']]],
  ['Platforms', [['WordPress', 'For content-heavy sites the client team must edit daily.'], ['Elementor', 'Page building inside WordPress when a project calls for it.'], ['Webflow', 'Visual development for marketing teams that want control.'], ['Shopify', 'The commerce platform behind our e-commerce builds.'], ['WooCommerce', 'Stores on WordPress, with payments and stock handled.']]],
  ['AI & automation', [['OpenAI', 'Models wired into assistants, scoring and content workflows.'], ['Claude', 'Long-form reasoning and document work inside client systems.'], ['n8n', 'Self-hosted workflow automation connecting the tools a business already uses.'], ['Make', 'Visual automation for quick, reliable integrations.']]],
  ['Growth', [['Google Analytics', 'GA4 tracking set up properly, so reports answer real questions.'], ['Google Ads', 'Search campaigns managed against enquiries, not clicks.'], ['Meta Ads', 'Social campaigns with creative tested in stages.']]],
];

const TESTIMONIALS = [
  { quote: 'From the very beginning, Alex demonstrated high-level skills in developing my company website and turned my ideas into a professional result. ... The results exceeded my expectations.',
    name: 'Client name not shown in the film', line: 'Verified Clutch review · 5.0', img: null },
  { quote: 'Our new site finally matches the quality of our work. Enquiries doubled in the first quarter, and clients mention the website before we do.',
    name: 'Sarah Mitchell', line: 'Founder, Brightpath Clinics · Composed for this demo', img: 'img/portrait-1.webp' },
  { quote: 'Direct, fast and honest. fraxBIT rebuilt our platform without downtime, and the dashboard paid for itself in saved hours within two months.',
    name: 'Daniel Okafor', line: 'Operations Director, Fleetline · Composed for this demo', img: 'img/portrait-2.webp' },
  { quote: 'They think like owners, not suppliers. Every design choice came with a reason tied to revenue, and the results followed.',
    name: 'Amelia Hart', line: 'CEO, Hart & Co. Interiors · Composed for this demo', img: 'img/portrait-3.webp' },
];

/* ================= STATS ================= */
$$('[data-stat]').forEach(el => { el.textContent = STATS[el.dataset.stat]; });

function countUp(el, target, dur) {
  if (reduced) { el.textContent = target; return; }
  const t0 = performance.now();
  const tick = now => {
    const p = Math.min(1, (now - t0) / dur);
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
let counted = false;
function runCounters() {
  if (counted) return; counted = true;
  $$('[data-count]').forEach(el => countUp(el, STATS[el.dataset.count], 1500));
}

/* ================= SHEET SYSTEM ================= */
const backdrop = $('#sheetBackdrop'), sheet = $('#detailSheet'), bookSheet = $('#bookingSheet');
let sheetReturnFocus = null;
function showBackdrop() { backdrop.hidden = false; document.body.style.overflow = 'hidden'; }
function hideAllSheets() {
  sheet.hidden = true; bookSheet.hidden = true; backdrop.hidden = true;
  document.body.style.overflow = '';
  if (sheetReturnFocus) sheetReturnFocus.focus({ preventScroll: true });
}
function openSheet({ code, title, intro, img, sections = [], facts = [], actions = [] }) {
  $('#sheetCode').textContent = code;
  $('#sheetTitle').textContent = title;
  const body = $('#sheetBody');
  body.innerHTML = '';
  if (intro) { const p = document.createElement('p'); p.className = 'sheet-intro'; p.textContent = intro; body.appendChild(p); }
  if (img) { const im = document.createElement('img'); im.className = 'sheet-img'; im.src = img; im.alt = title; body.appendChild(im); }
  for (const sec of sections) {
    const wrap = document.createElement('div'); wrap.className = 'sheet-sec';
    const h = document.createElement('h4'); h.textContent = sec.h; wrap.appendChild(h);
    const list = document.createElement(sec.ordered ? 'ol' : 'ul');
    for (const item of sec.items) { const li = document.createElement('li'); li.textContent = item; list.appendChild(li); }
    wrap.appendChild(list); body.appendChild(wrap);
  }
  if (facts.length) {
    const wrap = document.createElement('div'); wrap.className = 'sheet-sec';
    const h = document.createElement('h4'); h.textContent = 'Data points'; wrap.appendChild(h);
    for (const [k, v] of facts) {
      const row = document.createElement('div'); row.className = 'fact-row';
      row.innerHTML = ''; const a = document.createElement('span'); a.textContent = k;
      const b = document.createElement('span'); b.textContent = v; row.append(a, b); wrap.appendChild(row);
    }
    body.appendChild(wrap);
  }
  const act = $('#sheetActions'); act.innerHTML = '';
  for (const a of actions) {
    const b = document.createElement('button'); b.className = 'btn ' + (a.kind || 'btn-red'); b.textContent = a.label;
    b.addEventListener('click', a.onClick); act.appendChild(b);
  }
  sheet.hidden = false; bookSheet.hidden = true; showBackdrop();
  sheet.scrollTop = 0; sheetReturnFocus = document.activeElement;
  $('#sheetClose').focus({ preventScroll: true });
}
$('#sheetClose').addEventListener('click', hideAllSheets);
backdrop.addEventListener('click', hideAllSheets);
document.addEventListener('keydown', e => { if (e.key === 'Escape') { hideAllSheets(); closeMenu(); } });

function bookAction(topic) {
  return { label: 'Book a strategy call', onClick: () => openBooking(topic) };
}

/* ================= BOOKING ================= */
function fillDays() {
  const sel = $('#bkDay'); sel.innerHTML = '';
  const day = new Date(); let added = 0;
  while (added < 6) {
    day.setDate(day.getDate() + 1);
    if (day.getDay() === 0 || day.getDay() === 6) continue;
    const o = document.createElement('option');
    o.textContent = day.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
    sel.appendChild(o); added++;
  }
}
fillDays();
function openBooking(topic) {
  sheet.hidden = true; bookSheet.hidden = false; showBackdrop();
  if (topic) $('#bkTopic').value = topic;
  $('#bkSuccess').hidden = true; $('#bkError').hidden = true;
  bookSheet.scrollTop = 0; sheetReturnFocus = document.activeElement;
  $('#bookClose').focus({ preventScroll: true });
}
$('#bookClose').addEventListener('click', hideAllSheets);
$$('[data-book]').forEach(b => b.addEventListener('click', () => openBooking(b.dataset.topic || '')));
$('#bookForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = $('#bkName').value.trim(), email = $('#bkEmail').value.trim();
  const err = $('#bkError'); const missing = [];
  if (!name) missing.push('your name');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) missing.push('a valid work email');
  if (missing.length) { err.textContent = 'Please add ' + missing.join(' and ') + ' so we can confirm the call.'; err.hidden = false; return; }
  err.hidden = true;
  const ref = 'FB-CALL-' + Math.floor(1000 + Math.random() * 9000);
  $('#bkSuccessText').textContent = `Thanks ${name.split(' ')[0]}. Your ${$('#bkTopic').value} strategy call is booked for ${$('#bkDay').value} at ${$('#bkTime').value}. Your reference is ${ref}; a confirmation is on its way to ${email}.`;
  $('#bkSuccess').hidden = false;
});
$('#bkAgain').addEventListener('click', () => { $('#bookForm').reset(); fillDays(); $('#bkSuccess').hidden = true; });

/* ================= SERVICES ================= */
const svcRows = $('#svcRows');
DISCIPLINES.forEach((d, di) => {
  const row = document.createElement('div'); row.className = 'svc-row';
  const star = document.createElement('span'); star.className = 'star'; star.setAttribute('aria-hidden', 'true');
  const nameBtn = document.createElement('button'); nameBtn.className = 'svc-name'; nameBtn.textContent = d.name;
  nameBtn.addEventListener('click', () => openDiscipline(di));
  const desc = document.createElement('span'); desc.className = 'svc-desc'; desc.textContent = d.desc; nameBtn.appendChild(desc);
  const links = document.createElement('div'); links.className = 'svc-links';
  d.services.forEach((s, si) => {
    const b = document.createElement('button'); b.className = 'svc-link'; b.textContent = s[0];
    b.addEventListener('click', () => openService(di, si));
    links.appendChild(b);
  });
  const arrow = document.createElement('button'); arrow.className = 'svc-arrow'; arrow.innerHTML = '&rarr;';
  arrow.setAttribute('aria-label', d.name + ' details');
  arrow.addEventListener('click', () => openDiscipline(di));
  row.append(star, nameBtn, links, arrow);
  svcRows.appendChild(row);
});
function openDiscipline(di) {
  const d = DISCIPLINES[di];
  openSheet({
    code: `fraxBIT · ${d.desc}`, title: d.name,
    intro: `${d.name} is one of the studio\u2019s four disciplines. Every deliverable below opens its own detail view, and every engagement runs through the same four steps.`,
    sections: [
      { h: 'Deliverables', items: d.services.map(s => s[0]) },
      { h: 'How delivery runs', ordered: true, items: d.steps },
    ],
    facts: [['Deliverables', String(d.services.length)], ['Studio projects to date', STATS.projects + '+'], ['Countries reached', String(STATS.countries)]],
    actions: [bookAction(d.name)],
  });
}
function openService(di, si) {
  const d = DISCIPLINES[di], s = d.services[si];
  openSheet({
    code: `fraxBIT · ${d.name}`, title: s[0],
    intro: `${s[0]} sits inside our ${d.name} discipline (${d.desc.toLowerCase()}). It is scoped, priced and scheduled before any work starts, so there are no surprises mid-project.`,
    sections: [
      { h: 'What is included', items: s[2].split('|') },
      { h: 'How delivery runs', ordered: true, items: d.steps },
    ],
    facts: [['Typical timeline', s[1]], ['Discipline', d.name], ['Process', 'Strategy, Build, Launch, Grow']],
    actions: [bookAction(d.name)],
  });
}

/* ================= WORK ================= */
const workGrid = $('#workGrid');
const colL = document.createElement('div'); colL.className = 'work-col';
const colR = document.createElement('div'); colR.className = 'work-col offset';
PROJECTS.slice(0, 4).forEach((p, i) => {
  const card = document.createElement('button'); card.className = 'work-card';
  card.innerHTML = `<figure><img src="${p.img}" alt="${p.title}" loading="lazy"></figure>
    <span class="view-badge" aria-hidden="true">VIEW</span>
    <span class="wc-row"><h3>${p.title}</h3><span class="wc-tag">${p.tag}</span></span>
    <span class="wc-cat" style="display:block">${p.cat}</span>`;
  card.addEventListener('click', () => openProject(p.id));
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect(), badge = card.querySelector('.view-badge');
    badge.style.left = (e.clientX - r.left) + 'px'; badge.style.top = (e.clientY - r.top) + 'px';
  });
  (i % 2 === 0 ? colL : colR).appendChild(card);
});
workGrid.append(colL, colR);
function openProject(id) {
  const p = PROJECTS.find(x => x.id === id);
  openSheet({
    code: 'fraxBIT · Selected work' + (p.composed ? ' · Composed for this demo' : ''), title: p.title,
    intro: p.intro, img: p.img,
    sections: [{ h: 'What the project includes', items: p.includes }],
    facts: p.facts,
    actions: [bookAction('Development'), { label: 'All projects', kind: 'btn-dark', onClick: openAllProjects }],
  });
}
function openAllProjects() {
  openSheet({
    code: 'fraxBIT · Portfolio', title: 'All projects',
    intro: `Selected work from ${STATS.projects}+ projects delivered for brands in ${STATS.countries} countries. The first four are the projects shown in the film; the last two are composed for this demo build in the same pattern.`,
    actions: [bookAction('')],
  });
  const body = $('#sheetBody');
  const grid = document.createElement('div'); grid.className = 'mini-grid';
  PROJECTS.forEach(p => {
    const c = document.createElement('button'); c.className = 'mini-card';
    c.innerHTML = `<img src="${p.img}" alt="${p.title}" loading="lazy"><strong>${p.title}</strong><span>${p.cat}${p.composed ? ' · Composed' : ''}</span>`;
    c.addEventListener('click', () => openProject(p.id));
    grid.appendChild(c);
  });
  body.appendChild(grid);
}
$$('[data-all-projects]').forEach(b => b.addEventListener('click', openAllProjects));

/* ================= PROCESS ================= */
const MEGA_ITEMS = ['Landing pages', 'Corporate websites', 'E-commerce stores', 'Personal brand sites', 'Award-level showcases', 'Web apps & dashboards', 'SaaS platforms', 'Mobile apps', 'AI assistants', 'Custom platforms'];
const mega = $('#megaPara');
MEGA_ITEMS.forEach((item, i) => {
  const s = document.createElement('span'); s.className = 'mi'; s.textContent = item; mega.appendChild(s);
  if (i < MEGA_ITEMS.length - 1) { const st = document.createElement('span'); st.className = 'mstar'; st.textContent = '\u2733'; st.setAttribute('aria-hidden', 'true'); mega.appendChild(st); }
});
const tlNodes = $('#tlNodes');
PROCESS_STEPS.forEach((s, i) => {
  const b = document.createElement('button'); b.className = 'tl-node'; b.dataset.step = i;
  b.innerHTML = `<span class="n-num">0${i + 1}</span><h3>${s.name}</h3><p>${s.copy}</p>`;
  b.addEventListener('click', () => openSheet({
    code: `fraxBIT · Our process · Step 0${i + 1}`, title: s.name, intro: s.copy,
    sections: [{ h: 'What happens in this step', items: s.includes }],
    facts: s.facts, actions: [bookAction('')],
  }));
  tlNodes.appendChild(b);
});
const chipWall = $('#chipWall');
CHIP_GROUPS.forEach(([cat, chips]) => {
  const label = document.createElement('div'); label.className = 'chip-cat'; label.textContent = cat;
  const rowEl = document.createElement('div'); rowEl.className = 'chip-row';
  chips.forEach(([name, blurb]) => {
    const c = document.createElement('button'); c.className = 'chip'; c.textContent = name;
    c.addEventListener('click', () => openSheet({
      code: `fraxBIT · How we build it · ${cat}`, title: name, intro: blurb,
      facts: [['Category', cat], ['Part of', 'The studio\u2019s standard stack']],
      actions: [bookAction(cat === 'AI & automation' ? 'AI Integration' : '')],
    }));
    rowEl.appendChild(c);
  });
  chipWall.append(label, rowEl);
});

/* ================= COLLAGE ================= */
const COL_SETS = [
  ['img/work-medical.webp', 'img/collage-car.webp', 'img/work-dashboard.webp'],
  ['img/work-vehicle.webp', 'img/collage-sky.webp', 'img/work-construction.webp'],
  ['img/work-dashboard.webp', 'img/work-medical.webp', 'img/work-vehicle.webp'],
];
[['colA', 0], ['colB', 1], ['colC', 2]].forEach(([id, idx]) => {
  const track = document.getElementById(id);
  [...COL_SETS[idx], ...COL_SETS[idx]].forEach(src => {
    const im = document.createElement('img'); im.src = src; im.alt = ''; im.loading = 'lazy'; track.appendChild(im);
  });
});

/* ================= TESTIMONIALS ================= */
const tTrack = $('#tTrack'), tDots = $('#tDots');
TESTIMONIALS.forEach((t, i) => {
  const slide = document.createElement('div'); slide.className = 't-slide';
  const person = t.img
    ? `<img src="${t.img}" alt="${t.name}"><div><div class="tp-name">${t.name}</div><div class="tp-line">${t.line}</div></div>`
    : `<span class="clutch-word" style="font-size:19px;font-weight:800">Clutch</span><div><div class="tp-name">${t.name}</div><div class="tp-line">${t.line}</div></div>`;
  slide.innerHTML = `<div class="t-stars" aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
    <div class="t-quote-mark" aria-hidden="true">&ldquo;</div>
    <p class="t-quote">${t.quote}</p>
    <div class="t-person">${person}</div>`;
  tTrack.appendChild(slide);
  const d = document.createElement('button'); d.className = 't-dot' + (i === 0 ? ' on' : '');
  d.setAttribute('aria-label', 'Story ' + (i + 1));
  d.addEventListener('click', () => goSlide(i));
  tDots.appendChild(d);
});
let tIndex = 0;
function goSlide(i) {
  tIndex = (i + TESTIMONIALS.length) % TESTIMONIALS.length;
  tTrack.style.transform = `translateX(-${tIndex * 100}%)`;
  $$('.t-dot').forEach((d, di) => d.classList.toggle('on', di === tIndex));
}
$('#tPrev').addEventListener('click', () => goSlide(tIndex - 1));
$('#tNext').addEventListener('click', () => goSlide(tIndex + 1));

/* ================= PROJECT FORM ================= */
$('#projectForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = $('#pfName').value.trim(), email = $('#pfEmail').value.trim(), details = $('#pfDetails').value.trim();
  const err = $('#pfError'); const missing = [];
  if (!name) missing.push('your name');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) missing.push('a valid work email');
  if (!details) missing.push('a few lines about the project');
  if (missing.length) { err.textContent = 'Please add ' + missing.join(', ') + '.'; err.hidden = false; return; }
  err.hidden = true;
  const ref = 'FB-2026-' + Math.floor(1000 + Math.random() * 9000);
  $('#pfSuccessText').textContent = `Thanks ${name.split(' ')[0]}. Your ${$('#pfType').value.toLowerCase()} project (budget: ${$('#pfBudget').value}) is in, with reference ${ref}. We reply within one working day to ${email}.`;
  $('#pfSuccess').hidden = false;
});
$('#pfAgain').addEventListener('click', () => { $('#projectForm').reset(); $('#pfSuccess').hidden = true; });

/* ================= HEADER / MENU / MISC ================= */
const header = $('#siteHeader');
const themeObs = new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting) header.dataset.theme = en.target.dataset.header === 'light' ? 'light' : 'dark'; });
}, { rootMargin: '-70px 0px -60% 0px' });
$$('[data-header]').forEach(s => themeObs.observe(s));

const burger = $('#burger'), mobileMenu = $('#mobileMenu');
function closeMenu() { mobileMenu.hidden = true; burger.setAttribute('aria-expanded', 'false'); }
burger.addEventListener('click', () => {
  const open = mobileMenu.hidden;
  mobileMenu.hidden = !open; burger.setAttribute('aria-expanded', String(open));
});
mobileMenu.addEventListener('click', e => { if (e.target.closest('a,button')) closeMenu(); });

const toTop = $('#toTop');
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' }));

const revealObs = new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); revealObs.unobserve(en.target); } });
}, { threshold: 0.12 });
$$('.sheet-inner, .svc-row, .reasons li, .reveal-x-l, .reveal-x-r').forEach(el => revealObs.observe(el));

/* ================= SCROLL SYSTEMS ================= */
const hero = $('#hero'), heroContent = $('#heroContent'), tlFill = $('#tlFill');
const megaSpans = $$('#megaPara .mi'), tlNodeEls = $$('.tl-node');
let tlProgress = 0;
function scrollSystems() {
  const vh = innerHeight;
  /* hero pin scale */
  if (!reduced) {
    const p = Math.min(1, Math.max(0, scrollY / (hero.offsetHeight - vh)));
    heroContent.style.transform = `scale(${1 + p * 0.22})`;
    heroContent.style.opacity = String(1 - p * 0.8);
    $('#globe').style.opacity = String(1 - p * 0.55);
  }
  /* mega lighting */
  const mr = mega.getBoundingClientRect();
  const mp = Math.min(1, Math.max(0, (vh * 0.88 - mr.top) / (mr.height * 0.95)));
  const lit = reduced ? megaSpans.length : Math.round(mp * megaSpans.length);
  megaSpans.forEach((s, i) => s.classList.toggle('lit', i < lit));
  /* timeline fill */
  const tr = $('#timeline').getBoundingClientRect();
  tlProgress = reduced ? 1 : Math.min(1, Math.max(0, (vh * 0.82 - tr.top) / (tr.height + vh * 0.25)));
  tlFill.style.width = (tlProgress * 100).toFixed(1) + '%';
  tlNodeEls.forEach((n, i) => n.classList.toggle('on', tlProgress >= [0.04, 0.36, 0.68, 0.96][i]));
  toTop.classList.toggle('show', scrollY > vh * 0.8);
}
let scrollTick = false;
addEventListener('scroll', () => {
  if (!scrollTick) { scrollTick = true; requestAnimationFrame(() => { scrollSystems(); scrollTick = false; }); }
}, { passive: true });

/* counters when hero settles */
const statObs = new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting) { runCounters(); statObs.disconnect(); } });
}, { threshold: 0.3 });
statObs.observe($('.hero-stats'));

/* ================= GLOBE ================= */
(function globe() {
  const cv = $('#globe'), ctx = cv.getContext('2d');
  const N = 820, pts = [];
  const GA = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = GA * i;
    pts.push({ x: Math.cos(th) * r, y, z: Math.sin(th) * r, seed: Math.random(), ox: (Math.random() - 0.5) * 3, oy: (Math.random() - 0.5) * 3 });
  }
  let W = 0, H = 0;
  function size() {
    const dpr = Math.min(1.5, devicePixelRatio || 1);
    W = cv.clientWidth; H = cv.clientHeight;
    cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  size(); addEventListener('resize', size);
  const smooth = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
  function draw(t) {
    ctx.clearRect(0, 0, W, H);
    const cx = W / 2, cy = H * 0.60, R = Math.min(W, H) * 0.30;
    const assemble = reduced ? 1 : smooth(0, 1.4, t);
    const spread = reduced ? 0 : smooth(2.4, 4.4, t);
    const ang = reduced ? 0.6 : t * 0.12;
    const cosA = Math.cos(ang), sinA = Math.sin(ang);
    for (const p of pts) {
      let x = p.x * cosA - p.z * sinA, z = p.x * sinA + p.z * cosA, y = p.y;
      x += p.ox * (1 - assemble); y += p.oy * (1 - assemble);
      const sx = cx + x * R, sy = cy + y * R;
      const wx = cx + (p.seed - 0.5) * W * 0.92;
      const wy = H * 0.80 + Math.sin(p.seed * 21 + (reduced ? 0 : t * 0.7)) * 9 + (p.seed - 0.5) * 26;
      const m = spread * (0.3 + 0.7 * p.seed);
      const fx = sx + (wx - sx) * m, fy = sy + (wy - sy) * m;
      const alpha = 0.18 + 0.6 * ((z + 1) / 2) * (1 - m * 0.4);
      ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
      ctx.beginPath(); ctx.arc(fx, fy, 1.4, 0, 6.2832); ctx.fill();
    }
  }
  if (reduced) { draw(2); return; }
  let visible = true;
  new IntersectionObserver(en => { visible = en[0].isIntersecting; }).observe(cv);
  const t0 = performance.now();
  (function loop(now) {
    if (visible) draw((now - t0) / 1000);
    requestAnimationFrame(loop);
  })(t0);
})();

scrollSystems();

/* test hook */
window.__fraxbit = {
  stats: STATS,
  sheetOpen: () => !sheet.hidden || !bookSheet.hidden,
  openService: (di, si) => openService(di, si),
  openProject: id => openProject(id),
  slide: () => tIndex,
  goSlide,
  litCount: () => $$('#megaPara .mi.lit').length,
  tlProgress: () => tlProgress,
  countersDone: () => counted,
};
