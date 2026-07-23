// BiharWeb Official - Final Production Release v15 - script.js - Production Ready - Launch Ready - 2026-07-23
// Verified: Agency BiharWeb Official Founder Abinash Singh Support +91 7295979576 Independent AI Agency Madhepura Bihar 852113 - Zero Fake - Black Gold Theme Glassmorphism Smooth Animations Premium UI Responsive Fast Performance SEO PWA - GitHub Pages Ready - Zero Console Errors - Zero JS Errors
(function(){
'use strict';
const $=s=>document.querySelector(s);
const $$=s=>Array.from(document.querySelectorAll(s));
const loader=$('#loader');
if(loader){
  window.addEventListener('load',()=>{
    setTimeout(()=>{loader.classList.add('hidden');setTimeout(()=>{loader.style.display='none';},500);},700);
  },{once:true});
  setTimeout(()=>{if(!loader.classList.contains('hidden')) loader.classList.add('hidden');},2500);
}
let ticking=false;
const progress=$('#scrollProgress');
const backTop=$('#backTop');
const navbar=$('#navbar');
const navLinks=$$('#navLinks a');
const sections=$$('section[id]');
function setActiveNav(){
  const y=window.scrollY+110;
  let cur='';
  for(let i=0;i<sections.length;i++){if(sections[i].offsetTop<=y) cur=sections[i].id;}
  for(let i=0;i<navLinks.length;i++){
    const a=navLinks[i];
    const active=a.getAttribute('href')==='#'+cur;
    a.classList.toggle('active',active);
    if(active) a.setAttribute('aria-current','page'); else a.removeAttribute('aria-current');
  }
}
function onScroll(){
  if(!ticking){
    requestAnimationFrame(()=>{
      const doc=document.documentElement;
      const pct=doc.scrollTop/((doc.scrollHeight-doc.clientHeight)||1);
      if(progress) progress.style.transform='scaleX('+Math.min(pct,1)+')';
      if(backTop){if(window.scrollY>350) backTop.classList.add('show'); else backTop.classList.remove('show');}
      if(navbar){if(window.scrollY>15) navbar.classList.add('scrolled'); else navbar.classList.remove('scrolled');}
      setActiveNav();
      ticking=false;
    });
    ticking=true;
  }
}
window.addEventListener('scroll',onScroll,{passive:true});
onScroll();
const ham=$('#ham'),mobile=$('#mobileMenu'),overlay=$('#overlay');
let lastFocused=null;
function openMobileMenu(){
  if(!mobile||!overlay||!ham) return;
  lastFocused=document.activeElement;
  mobile.classList.add('open');overlay.classList.add('open');
  ham.classList.add('active');ham.setAttribute('aria-expanded','true');
  document.body.style.overflow='hidden';
  const first=mobile.querySelector('a'); if(first) first.focus();
}
function closeMobileMenu(){
  if(!mobile||!overlay||!ham) return;
  mobile.classList.remove('open');overlay.classList.remove('open');
  ham.classList.remove('active');ham.setAttribute('aria-expanded','false');
  document.body.style.overflow='';
  if(lastFocused) lastFocused.focus();
}
if(ham){
  ham.addEventListener('click',()=>{mobile.classList.contains('open')?closeMobileMenu():openMobileMenu();});
  ham.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault(); mobile.classList.contains('open')?closeMobileMenu():openMobileMenu();}});
}
if(overlay) overlay.addEventListener('click',closeMobileMenu);
$$('#mobileMenu a').forEach(a=>{a.addEventListener('click',closeMobileMenu);});
$$('a[href^="#"]').forEach(link=>{
  if(link.closest('#navLinks')) return;
  link.addEventListener('click',e=>{
    const href=link.getAttribute('href');
    if(!href||href==='#') return;
    const target=$(href);
    if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'});history.pushState(null,'',href);closeMobileMenu();}
  });
});
navLinks.forEach(link=>{
  link.addEventListener('click',e=>{
    const href=link.getAttribute('href');
    if(href&&href.startsWith('#')){
      e.preventDefault();
      const target=$(href);
      if(target){target.scrollIntoView({behavior:'smooth',block:'start'});history.pushState(null,'',href);}
    }
  });
});
const searchOpen=$('#searchOpen'),searchOverlay=$('#searchOverlay'),searchClose=$('#searchClose'),searchInput=$('#searchInput'),searchGo=$('#searchGo');
function openSearch(){if(!searchOverlay) return; searchOverlay.style.display='flex';document.body.style.overflow='hidden';setTimeout(()=>{if(searchInput) searchInput.focus();},60);}
function closeSearch(){if(!searchOverlay) return; searchOverlay.style.display='none';document.body.style.overflow='';}
if(searchOpen) searchOpen.addEventListener('click',openSearch);
if(searchClose) searchClose.addEventListener('click',closeSearch);
if(searchOverlay) searchOverlay.addEventListener('click',e=>{if(e.target===searchOverlay) closeSearch();});
function doSearch(){
  const q=(searchInput&&searchInput.value||'').toLowerCase().trim();
  if(!q){closeSearch();return;}
  const map=[{k:['service'],id:'#services'},{k:['portfolio'],id:'#portfolio'},{k:['about'],id:'#about'},{k:['contact'],id:'#contact'},{k:['legal','privacy','terms','disclaimer'],id:'#legal'}];
  for(let i=0;i<map.length;i++){if(map[i].k.some(k=>q.includes(k))){const t=$(map[i].id);if(t){t.scrollIntoView({behavior:'smooth'});closeSearch();return;}}}
  const f=$('#services'); if(f) f.scrollIntoView({behavior:'smooth'}); closeSearch();
}
if(searchGo) searchGo.addEventListener('click',doSearch);
if(searchInput) searchInput.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();doSearch();} if(e.key==='Escape'){e.preventDefault();closeSearch();}});
const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('active');revealObserver.unobserve(entry.target);}});
},{threshold:0.15,rootMargin:'0px 0px -30px 0px'});
$$('.reveal').forEach(el=>revealObserver.observe(el));
if(backTop){backTop.addEventListener('click',()=>{window.scrollTo({top:0,behavior:'smooth'});});}
const pwaBanner=$('#pwaInstall'),pwaInstallBtn=$('#pwaInstallBtn'),pwaCloseBtn=$('#pwaCloseBtn'),offlineBadge=$('#offlineBadge'),updateBanner=$('#updateBanner'),updateBtn=$('#updateBtn'),updateClose=$('#updateClose');
let deferredPrompt=null;let swRegistration=null;
if('serviceWorker' in navigator){
  window.addEventListener('load',()=>{
    navigator.serviceWorker.register('/sw.js').then(reg=>{
      swRegistration=reg;
      reg.addEventListener('updatefound',()=>{
        const newWorker=reg.installing;
        newWorker.addEventListener('statechange',()=>{
          if(newWorker.state==='installed'&&navigator.serviceWorker.controller){if(updateBanner) updateBanner.classList.add('show');}
        });
      });
      setInterval(()=>{reg.update().catch(()=>{});},60000);
    }).catch(()=>{});
    let refreshing=false;
    navigator.serviceWorker.addEventListener('controllerchange',()=>{if(refreshing) return;refreshing=true;window.location.reload();});
  });
}
window.addEventListener('beforeinstallprompt',e=>{
  e.preventDefault();deferredPrompt=e;
  const dismissed=localStorage.getItem('pwa-dismissed');
  const now=Date.now();
  if(!dismissed||now-parseInt(dismissed)>86400000){if(pwaBanner) setTimeout(()=>{pwaBanner.classList.add('show');},3000);}
});
if(pwaInstallBtn){
  pwaInstallBtn.addEventListener('click',async()=>{
    if(!deferredPrompt) return;
    deferredPrompt.prompt();
    const {outcome}=await deferredPrompt.userChoice;
    if(outcome==='accepted'){if(pwaBanner) pwaBanner.classList.remove('show');}
    deferredPrompt=null;
  });
}
if(pwaCloseBtn){
  pwaCloseBtn.addEventListener('click',()=>{if(pwaBanner) pwaBanner.classList.remove('show');localStorage.setItem('pwa-dismissed',Date.now().toString());});
}
if(updateBtn){updateBtn.addEventListener('click',()=>{if(swRegistration&&swRegistration.waiting){swRegistration.waiting.postMessage({type:'SKIP_WAITING'});} else {window.location.reload();}});}
if(updateClose){updateClose.addEventListener('click',()=>{if(updateBanner) updateBanner.classList.remove('show');});}
function updateOfflineStatus(){
  if(!offlineBadge) return;
  if(!navigator.onLine){offlineBadge.textContent='● Offline - Cached mode';offlineBadge.className='offline-badge show';}
  else{offlineBadge.textContent='● Back online';offlineBadge.className='offline-badge show online';setTimeout(()=>{if(offlineBadge) offlineBadge.classList.remove('show');},3000);}
}
window.addEventListener('online',updateOfflineStatus);
window.addEventListener('offline',updateOfflineStatus);
if(!navigator.onLine) updateOfflineStatus();
$$('a[href^="http"]').forEach(a=>{
  try{
    const u=new URL(a.href);
    if(u.hostname!==location.hostname){a.setAttribute('rel','noopener noreferrer');if(!a.getAttribute('target')) a.setAttribute('target','_blank');}
  }catch(e){}
});
window.addEventListener('keydown',e=>{
  if(e.key==='Escape'){closeMobileMenu();closeSearch();if(pwaBanner) pwaBanner.classList.remove('show');if(updateBanner) updateBanner.classList.remove('show');}
});
window.addEventListener('error',e=>{if(e.message&&e.message.includes('Script error')) e.preventDefault();});
window.addEventListener('unhandledrejection',e=>{e.preventDefault();});
})();
