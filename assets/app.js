/* ============ ASSETS (filled by build) ============ */
const FACE_SRC = {"face-01": "assets/faces/face-01.webp", "face-02": "assets/faces/face-02.webp", "face-03": "assets/faces/face-03.webp", "face-04": "assets/faces/face-04.webp", "face-05": "assets/faces/face-05.webp", "face-06": "assets/faces/face-06.webp", "face-07": "assets/faces/face-07.webp", "face-01-2": "assets/faces/face-01-2.webp"};
const SHOW_CASES = false; // turn back on when cases are ready
const CASE_SRC = {};
const PROJ_SRC = {};
const FACES_GIF = 'assets/faces/faces.gif';

const EAGER = new Set(["face-01", "face-01-2", "face-02", "face-03"]);

/* ============ LANGUAGE ============ */
// URL ?lang= wins (for sharing a link in a given language), then the viewer's last choice, then the browser.
function pickLang() {
  try { const q = new URLSearchParams(location.search).get('lang'); if (q && TEXT[q]) return q; } catch (e) {}
  try { const s = localStorage.getItem('vp-lang'); if (s && TEXT[s]) return s; } catch (e) {}
  return /^(ru|uk|be|kk)/i.test(navigator.language || '') ? 'ru' : 'en';
}
let lang = pickLang();
let TX = TEXT[lang];
const get = (obj, path) => path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);

const FACES = [{ face: 'face-01' }].concat(POS);
const N = POS.length;
const C = N + 1;

/* ============ SLOTS ============ */
const SLOTS_DESK = { '-2': { x: -1500, s: 480, o: 0 }, '-1': { x: -1100, s: 480, o: 0 }, '0': { x: 9, s: 480, o: 1 }, '1': { x: 443, s: 300, o: 1 }, '2': { x: 730.5, s: 187, o: 1 }, '3': { x: 940, s: 120, o: 0 }, '4': { x: 1100, s: 90, o: 0 } };
const SLOTS_MOB  = { '-2': { x: -700, s: 260, o: 0 }, '-1': { x: -470, s: 260, o: 0 }, '0': { x: 0, s: 260, o: 1 }, '1': { x: 205, s: 116, o: 1 }, '2': { x: 296, s: 64, o: 0.9 }, '3': { x: 370, s: 38, o: 0 }, '4': { x: 440, s: 28, o: 0 } };
const FACE_BASE = 480;
let SM = SLOTS_MOB;
const smooth = t => t * t * (3 - 2 * t);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
function slotAt(k, S) {
  const kc = clamp(k, -2, 4);
  const a = Math.floor(kc), b = Math.ceil(kc), t = smooth(kc - a);
  const A = S[a], B = S[b];
  return { x: A.x + (B.x - A.x) * t, s: A.s + (B.s - A.s) * t, o: A.o + (B.o - A.o) * t };
}

/* ============ BUILD ============ */
const $ = id => document.getElementById(id);
const facesEl = $('faces'), copiesEl = $('copies'), dotsEl = $('dots');
let activeStep = 0;

FACES.forEach((f, i) => {
  const d = document.createElement('div');
  d.className = 'face';
  d.innerHTML = `<img class="base" alt="" ${EAGER.has(f.face) ? 'src' : 'data-src'}="${FACE_SRC[f.face] || ''}">` + (i === 0 && FACE_SRC['face-01-2'] ? `<img class="alt" alt="" src="${FACE_SRC['face-01-2']}">` : '');
  d.addEventListener('click', () => {
    if (i === activeStep && i >= 1) openModal(i - 1);
    else if (i === 0 && activeStep === 0) punch(d);
    else go(i);
  });
  facesEl.appendChild(d);
});
let punchT = null;
function punch(el) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { el.classList.add('punch'); setTimeout(() => el.classList.remove('punch'), 350); return; }
  el.classList.remove('punch'); void el.offsetWidth; el.classList.add('punch');
  clearTimeout(punchT); punchT = setTimeout(() => el.classList.remove('punch'), 500);
}
$('cface-img').src = FACES_GIF || FACE_SRC['face-01'] || '';

// copy blocks: one element per step, filled (and re-filled on language switch) from TX
const intro = document.createElement('div'); intro.className = 'copy intro'; copiesEl.appendChild(intro);
POS.forEach(() => { const c = document.createElement('div'); c.className = 'copy'; copiesEl.appendChild(c); });
function fillCopies() {
  intro.innerHTML = `<div class="name">${TX.intro.name}</div><div class="did-wrap"><div>${TX.intro.p.map(p => `<p>${p}</p>`).join('')}</div><button class="btn lg" data-go="contacts">${TX.ui.contactBtn} <svg><use href="#i-star"/></svg></button></div>`;
  TX.pos.forEach((p, k) => {
    copiesEl.children[k + 1].innerHTML = `<div class="head"><div class="co">${p.co}</div><div class="kind">${p.kind}</div></div><div class="role">${p.role}</div><div class="did-wrap"><p class="did">${p.did}</p><button class="btn" data-more="${k}" aria-haspopup="dialog">${TX.ui.more} <svg><use href="#i-corners"/></svg></button></div>`;
  });
}
const copies = Array.from(copiesEl.children);
const faceEls = Array.from(facesEl.children);

for (let i = 0; i <= C; i++) {
  const b = document.createElement('button');
  b.addEventListener('click', () => go(i));
  dotsEl.appendChild(b);
}
const dots = Array.from(dotsEl.children);

/* ============ DATE ROLL ============ */
function setDate(el, text) {
  const parts = text.split('/').map(t => t.trim());
  el.querySelectorAll('.seg').forEach((seg, si) => {
    const next = parts[si] || '';
    const cur = seg.dataset.v || '';
    if (cur === next) return;
    seg.dataset.v = next;
    const len = Math.max(cur.length, next.length);
    seg.innerHTML = '';
    for (let i = 0; i < len; i++) {
      const o = cur[i] || '', n = next[i] || '';
      const d = document.createElement('span'); d.className = 'dg';
      if (o === n || !cur) { d.innerHTML = `<span class="roll"><span>${n}</span></span>`; }
      else {
        d.innerHTML = `<span class="roll"><span>${o}</span><span>${n}</span></span>`;
        setTimeout(() => d.classList.add('go'), 20 + i * 45);
        setTimeout(() => { d.innerHTML = `<span class="roll"><span>${n}</span></span>`; d.classList.remove('go'); }, 600 + i * 45);
      }
      seg.appendChild(d);
    }
  });
}

/* ============ MODAL ============ */
const board = $('board'), modal = $('modal'), dlg = $('dlg'), dlgScroll = dlg.querySelector('.scroll');
let modalOpen = false, lastFocus = null;
let modalK = -1;
function fillModal(k) {
  const p = POS[k], t = TX.pos[k];
  $('dlg-face').src = FACE_SRC[p.face] || '';
  $('dlg-from').textContent = p.from; $('dlg-to').textContent = p.to;
  $('dlg-co').textContent = t.co; $('dlg-kind').textContent = t.kind; $('dlg-role').textContent = t.role;
  const blocks = $('dlg-blocks');
  blocks.innerHTML = t.blocks.map(([h, d], i) => `<div class="blk" style="transition-delay:${120 + i * 60}ms"><div class="t">${h}</div><div class="d">${d}</div></div>`).join('');
  const gal = $('dlg-gal');
  gal.innerHTML = p.works.map((key, i) => `<div class="g" style="transition-delay:${160 + i * 50}ms" title="${t.works[i] || ''}">${CASE_SRC[key] ? `<img alt="${t.works[i] || ''}" src="${CASE_SRC[key]}">` : ''}</div>`).join('');
  const showGal = SHOW_CASES && p.works.length > 0 && !(p.projects && p.projects.length);
  gal.hidden = !showGal;
  const proj = $('dlg-proj');
  const hasProj = SHOW_CASES && !!(p.projects && p.projects.length);
  proj.parentElement.hidden = !hasProj;
  // every popup without a side gallery uses the One Moscow layout: 4 text blocks in a row
  dlg.classList.toggle('wide', !showGal);
  dlg.classList.toggle('nogal', false);
  proj.innerHTML = hasProj ? p.projects.map((key, i) => { const [d, link] = t.projects[i] || ['', null]; return `
    <div class="pcard" style="transition-delay:${200 + i * 70}ms">
      <div class="img">${PROJ_SRC[key] ? `<img alt="" src="${PROJ_SRC[key]}">` : ''}</div>
      <div class="d">${d}</div>
      <div class="lnk${link ? '' : ' nda'}">${link ? `<svg><use href="#i-link"/></svg><u>${link}</u>` : TX.ui.nda}</div>
    </div>`; }).join('') : '';
}
function openModal(k) {
  modalK = k;
  fillModal(k);
  dlgScroll.scrollTop = 0;
  lastFocus = document.activeElement;
  modalOpen = true;
  board.classList.add('modal-open');
  modal.classList.add('on');
  document.documentElement.classList.add('locked');
  setTimeout(() => dlg.querySelector('.x').focus(), 50);
}
function closeModal() {
  if (!modalOpen) return;
  modalOpen = false;
  board.classList.remove('modal-open');
  modal.classList.remove('on');
  document.documentElement.classList.remove('locked');
  if (lastFocus && lastFocus.focus) lastFocus.focus();
}
modal.addEventListener('click', e => { const t = e.target; if (t.closest('[data-close]') || t === modal || t.classList.contains('inner') || t.classList.contains('scroll') || t.classList.contains('blocks') || t.classList.contains('gal')) closeModal(); });
document.addEventListener('click', e => { const m = e.target.closest('[data-more]'); if (m) openModal(+m.dataset.more); });
const faceCue = $('face-cue');

/* ============ MOBILE MENU ============ */
const burger = $('burger'), mmenu = $('mmenu');
function setMenu(on) { mmenu.classList.toggle('on', on); burger.classList.toggle('open', on); burger.setAttribute('aria-expanded', on); }
burger.addEventListener('click', () => setMenu(!mmenu.classList.contains('on')));

/* ============ SCROLL ============ */
const track = $('track'), heroLabel = $('hero-label'), rule = $('rule'), dFrom = $('d-from'), dTo = $('d-to'), hint = $('hint');
const contacts = $('contacts'), mExp = $('m-exp'), mContacts = $('m-contacts'), mmExp = $('mm-exp'), mmContacts = $('mm-contacts'), mAbout = $('m-about'), mmAbout = $('mm-about');

let vh = innerHeight, vw = innerWidth, mobile = false;
const G = { desk: { labelX: 881, dateX: 76, ruleL0: 1077, ruleR0: 76, ruleL1: -96, ruleR1: -96 },
            mob:  { labelX: 24,  dateX: 24, ruleL0: 150,  ruleR0: 24, ruleL1: -24, ruleR1: -24 } };

function layout() {
  vh = innerHeight; vw = innerWidth; mobile = vw <= 760;
  const R = document.documentElement.style;
  if (mobile) {
    // board is 430 wide and exactly as tall as the screen — no letterboxing.
    // Vertical rhythm is derived from the real height so the face never meets the text:
    // nav → face → timeline → copy, each with a fixed breathing gap.
    const u = vw / 430, BH = Math.round(vh / u);
    const fs = clamp(BH - 520, 150, 280);   // active face size
    const fy = 76 + fs / 2;                  // face centre (nav zone is 0..60)
    const tl = fy + fs / 2 + 36;             // timeline
    const ct = tl + 40;                      // copy top
    R.setProperty('--u', u); R.setProperty('--bh', BH + 'px');
    R.setProperty('--fs', fs + 'px'); R.setProperty('--fy', fy + 'px');
    R.setProperty('--tl', tl + 'px'); R.setProperty('--ct', ct + 'px');
    const k = fs / 260;
    SM = {};
    for (const key in SLOTS_MOB) SM[key] = { x: SLOTS_MOB[key].x * k, s: SLOTS_MOB[key].s * k, o: SLOTS_MOB[key].o };
  } else {
    R.setProperty('--u', Math.min(vw / 1920, vh / 1080)); R.setProperty('--bh', '1080px');
    ['--fs', '--fy', '--tl', '--ct'].forEach(v => R.removeProperty(v));
  }
  track.style.height = ((C + 1) * vh) + 'px';
  track.querySelectorAll('.snap').forEach(s => s.remove());
  for (let i = 0; i <= C; i++) { const s = document.createElement('div'); s.className = 'snap'; s.style.top = (i * vh) + 'px'; track.appendChild(s); }
  lastActive = -1; render();
}

let lastActive = -1;
function render() {
  const y = scrollY - track.offsetTop;
  const p = clamp(y / vh, 0, C);
  const S = mobile ? SM : SLOTS_DESK;
  const g = mobile ? G.mob : G.desk;

  faceEls.forEach((el, i) => {
    const st = slotAt(i - p, S);
    el.style.transform = `translate(${st.x}px,0) scale(${st.s / FACE_BASE})`;
    el.style.opacity = st.o;
    el.style.zIndex = 30 - Math.round(Math.abs(i - p) * 4);
    el.style.pointerEvents = st.o > 0.5 ? 'auto' : 'none';
  });
  copies.forEach((el, i) => {
    const d = Math.abs(i - p);
    const o = Math.max(0, 1 - d * 2.2);
    el.style.opacity = o;
    el.style.transform = `translateY(calc(${mobile ? '0px' : '-50%'} + ${(i - p) * -24}px))`;
    el.style.pointerEvents = o > 0.5 ? 'auto' : 'none';
  });

  const t = smooth(clamp(p, 0, 1));
  const dIn = clamp((p - 0.6) / 0.35, 0, 1);
  const tc = clamp(p - N, 0, 1);
  const expO = 1 - smooth(tc);
  heroLabel.style.transform = `translateX(${(g.dateX - g.labelX) * t}px)`;
  heroLabel.style.opacity = (1 - clamp((p - 0.3) / 0.22, 0, 1)) * expO;
  rule.style.left = (g.ruleL0 + (g.ruleL1 - g.ruleL0) * t) + 'px';
  // on the oldest position the line stops at the date instead of running off the page
  let rightVal = g.ruleR0 + (g.ruleR1 - g.ruleR0) * t;
  const stopR = (mobile ? 16 : 66) + dTo.offsetWidth;
  rightVal += (stopR - rightVal) * smooth(clamp(p - (N - 1), 0, 1));
  rule.style.right = rightVal + 'px';
  rule.style.opacity = expO;
  dFrom.style.opacity = dIn * expO; dTo.style.opacity = dIn * expO;
  faceCue.classList.toggle('on', Math.abs(p - Math.round(p)) < 0.3 && Math.round(p) >= 1 && Math.round(p) <= N);
  contacts.style.opacity = smooth(tc);
  contacts.classList.toggle('on', tc > 0.5);
  contacts.style.transform = `translateY(${(1 - smooth(tc)) * 40}px)`;
  hint.style.opacity = p < 0.15 ? 1 : 0;

  const active = Math.round(p);
  activeStep = active;
  if (active !== lastActive) {
    lastActive = active;
    dots.forEach((d, i) => d.classList.toggle('on', i === active));
    const inExp = active >= 1 && active <= N;
    mExp.classList.toggle('on', inExp); mmExp.classList.toggle('on', inExp);
    mAbout.classList.toggle('on', active === 0); mmAbout.classList.toggle('on', active === 0);
    mContacts.classList.toggle('on', active === C); mmContacts.classList.toggle('on', active === C);
    if (inExp) { const pos = POS[active - 1]; setDate(dFrom, pos.from); setDate(dTo, pos.to); }
  }
}

function go(i) {
  if (i === 'contacts') i = C;
  if (i === 'pdf') return;
  setMenu(false);
  scrollTo({ top: track.offsetTop + i * vh, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
}
document.addEventListener('click', e => { const a = e.target.closest('[data-go]'); if (!a) return; e.preventDefault(); const gv = a.dataset.go; go(isNaN(+gv) ? gv : +gv); });
addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeModal(); setMenu(false); return; }
  if (modalOpen) return;
  const cur = Math.round((scrollY - track.offsetTop) / vh);
  if (['ArrowRight', 'ArrowDown', 'PageDown'].includes(e.key)) { e.preventDefault(); go(Math.min(C, cur + 1)); }
  if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) { e.preventDefault(); go(Math.max(0, cur - 1)); }
  if (e.key === 'Enter' && cur >= 1 && cur <= N && document.activeElement === document.body) openModal(cur - 1);
});
let ticking = false;
addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(() => { render(); ticking = false; }); ticking = true; } }, { passive: true });
addEventListener('resize', layout);
/* ============ LANGUAGE SWITCH ============ */
function applyLang() {
  document.documentElement.lang = lang;
  document.title = TX.ui.title;
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = get(TX.ui, el.dataset.i18n) ?? ''; });
  document.querySelectorAll('[data-i18n-html]').forEach(el => { el.innerHTML = get(TX.ui, el.dataset.i18nHtml) ?? ''; });
  document.querySelectorAll('[data-i18n-aria]').forEach(el => { el.setAttribute('aria-label', get(TX.ui, el.dataset.i18nAria) ?? ''); });
  fillCopies();
  faceEls.forEach((f, i) => { f.title = i === 0 ? TX.ui.about : TX.pos[i - 1].co; });
  dots.forEach((d, i) => d.setAttribute('aria-label', i === 0 ? TX.ui.about : i === C ? TX.ui.nav.contacts : TX.pos[i - 1].co));
  document.querySelectorAll('.lang button').forEach(b => { const on = b.dataset.lang === lang; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); });
  if (modalOpen && modalK >= 0) fillModal(modalK);
  render();
}
function setLang(l) {
  if (!TEXT[l] || l === lang) return;
  try { localStorage.setItem('vp-lang', l); } catch (e) {}
  const swap = () => { lang = l; TX = TEXT[l]; applyLang(); };
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return swap();
  board.classList.add('swapping');                       // quick fade of all text
  setTimeout(() => { swap(); requestAnimationFrame(() => requestAnimationFrame(() => board.classList.remove('swapping'))); }, 170);
}
window.setLang = setLang;
document.addEventListener('click', e => { const b = e.target.closest('.lang button'); if (b) { setLang(b.dataset.lang); setMenu(false); } });

document.documentElement.classList.add('snapping');
applyLang();
layout();

addEventListener('load', () => document.querySelectorAll('img[data-src]').forEach(i => { i.src = i.dataset.src; i.removeAttribute('data-src'); }));
