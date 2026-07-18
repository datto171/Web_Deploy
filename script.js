/* ─── Nav scroll class ─── */
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ─── Hamburger (mobile) ─── */
const hamburger = document.getElementById('hamburger');
hamburger.addEventListener('click', () => {
  const links = document.querySelector('.nav-links');
  const open = links.style.display === 'flex';
  links.style.display = open ? 'none' : 'flex';
  links.style.flexDirection = 'column';
  links.style.position = 'fixed';
  links.style.top = '68px';
  links.style.left = '0';
  links.style.right = '0';
  links.style.background = 'rgba(8,8,14,.97)';
  links.style.padding = '20px 28px';
  links.style.gap = '20px';
  links.style.borderBottom = '1px solid rgba(255,255,255,.08)';
  if (!open) {
    links.style.display = 'flex';
    hamburger.children[0].style.transform = 'rotate(45deg) translate(5px,5px)';
    hamburger.children[1].style.transform = 'rotate(-45deg) translate(5px,-5px)';
  } else {
    hamburger.children[0].style.transform = '';
    hamburger.children[1].style.transform = '';
  }
});

/* ─── Close mobile nav on link click ─── */
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    if (window.innerWidth < 640) {
      document.querySelector('.nav-links').style.display = 'none';
      hamburger.children[0].style.transform = '';
      hamburger.children[1].style.transform = '';
    }
  });
});

/* ─── Reveal on scroll ─── */
const revealTargets = [
  '.hero-badge', '.hero-heading', '.hero-tagline', '.hero-btns', '.hero-stats',
  '.about-text', '.about-pills',
  '.bento-cell',
  '.exp-item', '.edu-card',
  '.pcard', '.itch-banner',
  '.contact-text', '.clink',
];

revealTargets.forEach(sel => {
  document.querySelectorAll(sel).forEach((el, i) => {
    el.classList.add('reveal');
    if (i > 0) el.classList.add(`reveal-delay-${Math.min(i, 3)}`);
  });
});

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1 }
);
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ─── Active nav link highlight ─── */
const sections = document.querySelectorAll('section[id], .about-strip[id]');
const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');

const sectionObs = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(l => l.style.color = '');
        const match = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
        if (match) match.style.color = '#fff';
      }
    });
  },
  { rootMargin: '-35% 0px -35% 0px' }
);
sections.forEach(s => sectionObs.observe(s));

/* ─── Subtle parallax on hero orbs (desktop only) ─── */
if (window.innerWidth > 960) {
  document.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth  - .5) * 20;
    const y = (e.clientY / window.innerHeight - .5) * 20;
    document.querySelector('.orb-1').style.transform = `translate(${x * .8}px, ${y * .8}px)`;
    document.querySelector('.orb-2').style.transform = `translate(${-x * .5}px, ${-y * .5}px)`;
    document.querySelector('.orb-3').style.transform = `translate(${x * .3}px, ${y * .3}px)`;
  });
}
