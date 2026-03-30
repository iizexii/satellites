// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Burger menu
var burger = document.getElementById('burger');
var nav = document.getElementById('nav');

burger.addEventListener('click', function() {
  var isOpen = nav.classList.contains('open');
  burger.classList.toggle('active');
  nav.classList.toggle('open');
  burger.setAttribute('aria-expanded', !isOpen);
});

// Close nav on link click (mobile)
nav.querySelectorAll('.nav__link').forEach(function(link) {
  link.addEventListener('click', function() {
    burger.classList.remove('active');
    nav.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  });
});

// Close nav on outside click
document.addEventListener('click', function(e) {
  if (!burger.contains(e.target) && !nav.contains(e.target)) {
    burger.classList.remove('active');
    nav.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }
});

// FAQ accordion
document.querySelectorAll('.faq__q').forEach(function(q) {
  q.addEventListener('click', function() {
    var item = this.closest('.faq__item');
    var isOpen = item.classList.contains('open');
    // Close all
    document.querySelectorAll('.faq__item').forEach(function(i) {
      i.classList.remove('open');
    });
    // Open clicked if it was closed
    if (!isOpen) {
      item.classList.add('open');
    }
  });
});

// Smooth scroll offset for sticky header
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      var offset = 70;
      var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
  });
});
