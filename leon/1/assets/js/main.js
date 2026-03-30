// Year
document.getElementById('year').textContent = new Date().getFullYear();

// ── SIDEBAR ──────────────────────────────────────────────
var sidebar = document.getElementById('sidebar');
var sidebarBtn = document.getElementById('sidebarBtn');
var sidebarClose = document.getElementById('sidebarClose');
var sidebarOverlay = document.getElementById('sidebarOverlay');

function openSidebar() {
  sidebar.classList.add('open');
  sidebarOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeSidebar() {
  sidebar.classList.remove('open');
  sidebarOverlay.classList.remove('active');
  document.body.style.overflow = '';
}
sidebarBtn.addEventListener('click', openSidebar);
sidebarClose.addEventListener('click', closeSidebar);
sidebarOverlay.addEventListener('click', closeSidebar);

// ── BURGER NAV ───────────────────────────────────────────
var burger = document.getElementById('burger');
var nav = document.getElementById('nav');

burger.addEventListener('click', function() {
  var isOpen = nav.classList.contains('open');
  burger.classList.toggle('active');
  nav.classList.toggle('open');
  burger.setAttribute('aria-expanded', !isOpen);
});
nav.querySelectorAll('.nav__link').forEach(function(link) {
  link.addEventListener('click', function() {
    burger.classList.remove('active');
    nav.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  });
});
document.addEventListener('click', function(e) {
  if (!burger.contains(e.target) && !nav.contains(e.target)) {
    burger.classList.remove('active');
    nav.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }
});

// ── CAROUSEL ─────────────────────────────────────────────
var track = document.getElementById('carouselTrack');
var dots = document.querySelectorAll('.carousel__dot');
var slides = document.querySelectorAll('.carousel__slide');
var current = 0;
var total = slides.length;
var autoTimer;

function goTo(index) {
  current = (index + total) % total;
  track.style.transform = 'translateX(-' + current * 100 + '%)';
  dots.forEach(function(d, i) { d.classList.toggle('active', i === current); });
}

function next() { goTo(current + 1); }
function prev() { goTo(current - 1); }

function startAuto() {
  autoTimer = setInterval(next, 5000);
}
function resetAuto() {
  clearInterval(autoTimer);
  startAuto();
}

document.getElementById('carouselNext').addEventListener('click', function() { next(); resetAuto(); });
document.getElementById('carouselPrev').addEventListener('click', function() { prev(); resetAuto(); });
dots.forEach(function(dot) {
  dot.addEventListener('click', function() {
    goTo(parseInt(this.dataset.index));
    resetAuto();
  });
});

// Touch swipe
var touchStartX = 0;
track.addEventListener('touchstart', function(e) { touchStartX = e.touches[0].clientX; }, { passive: true });
track.addEventListener('touchend', function(e) {
  var diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 40) { diff > 0 ? next() : prev(); resetAuto(); }
}, { passive: true });

startAuto();

// ── FAQ ──────────────────────────────────────────────────
document.querySelectorAll('.faq__q').forEach(function(q) {
  q.addEventListener('click', function() {
    var item = this.closest('.faq__item');
    var isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq__item').forEach(function(i) { i.classList.remove('open'); });
    if (!isOpen) { item.classList.add('open'); }
  });
});

// ── SMOOTH SCROLL ────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.pageYOffset - 70;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
  });
});
