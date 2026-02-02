// ===== QR Code - Set menu URL and generate QR =====
const menuUrl = new URL('menu.html', window.location.href).href;
const qrImg = document.getElementById('qr-code');
if (qrImg) {
  qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(menuUrl)}&bgcolor=ffffff&color=0d0d0d`;
}

// ===== Mobile Nav Toggle =====
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ===== Scroll Animations =====
const animateEls = document.querySelectorAll('.animate-in');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
);
animateEls.forEach((el) => observer.observe(el));

// ===== Nav Hide on Scroll Down =====
let lastScroll = 0;
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (scrollY > 100 && scrollY > lastScroll) nav?.classList.add('hidden');
  else nav?.classList.remove('hidden');
  lastScroll = scrollY;
}, { passive: true });

// ===== Neon cursor trail – line trail (desktop + mobile) =====
(function () {
  const trail = document.createElement('div');
  trail.className = 'cursor-trail';
  trail.setAttribute('aria-hidden', 'true');
  document.body.appendChild(trail);

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'cursor-trail-svg');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');
  trail.appendChild(svg);

  const maxSegments = 36;
  let lastX = null;
  let lastY = null;
  let lastMove = 0;
  const throttleDesktop = 18;
  const throttleTouch = 14;

  function addLineSegment(x1, y1, x2, y2) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('class', 'cursor-trail-line');
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    svg.appendChild(line);
    if (svg.children.length > maxSegments) svg.removeChild(svg.firstChild);
    setTimeout(() => { if (line.parentNode) svg.removeChild(line); }, 700);
  }

  function handleMove(x, y, throttle) {
    const now = Date.now();
    if (now - lastMove < (throttle ?? throttleDesktop)) return;
    lastMove = now;
    if (lastX !== null && lastY !== null) {
      const dx = x - lastX;
      const dy = y - lastY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist >= 4) addLineSegment(lastX, lastY, x, y);
    }
    lastX = x;
    lastY = y;
  }

  // Desktop: mouse movement
  document.addEventListener('mousemove', (e) => handleMove(e.clientX, e.clientY, throttleDesktop), { passive: true });

  // Mobile: touch movement (trail while dragging)
  document.addEventListener('touchmove', (e) => {
    if (e.touches.length) handleMove(e.touches[0].clientX, e.touches[0].clientY, throttleTouch);
  }, { passive: true });

  // Mobile: short line on tap so trail is visible on first touch
  document.addEventListener('touchstart', (e) => {
    if (e.touches.length) {
      const x = e.touches[0].clientX;
      const y = e.touches[0].clientY;
      addLineSegment(x - 8, y, x + 8, y);
    }
  }, { passive: true });
})();

// ===== Reservation Form =====
const form = document.querySelector('.reservation-form');
if (form) {
  const minDate = new Date().toISOString().split('T')[0];
  const dateInput = form.querySelector('#date');
  if (dateInput) dateInput.min = minDate;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('#name')?.value;
    const email = form.querySelector('#email')?.value;
    const date = form.querySelector('#date')?.value;
    const time = form.querySelector('#time')?.value;
    const guests = form.querySelector('#guests')?.value;

    // For demo - recommend calling RSVP: 882 882 6606
    alert(`Thanks ${name}! We've noted your request for ${guests} guests on ${date} at ${time}. For confirmed booking, please call RSVP: 882 882 6606 or book via EazyDiner / Zomato / Swiggy above.`);
    form.reset();
  });
}
