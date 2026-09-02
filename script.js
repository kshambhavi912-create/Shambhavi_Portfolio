const glow = document.querySelector('.cursor-glow');

if (glow) {
  window.addEventListener('mousemove', (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 30);
});

// Certificate lightbox
const modal = document.getElementById('certificateModal');
const modalImage = document.getElementById('modalImage');
const closeButton = document.querySelector('.modal-close');

function closeCertificate() {
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (modalImage) modalImage.src = '';
}

document.querySelectorAll('.certificate-image').forEach((button) => {
  button.addEventListener('click', () => {
    if (!modal || !modalImage) return;
    const image = button.querySelector('img');
    modalImage.src = button.dataset.full;
    modalImage.alt = image ? image.alt : 'Expanded certificate';
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
});

closeButton?.addEventListener('click', closeCertificate);
modal?.addEventListener('click', (e) => {
  if (e.target === modal) closeCertificate();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeCertificate();
});
