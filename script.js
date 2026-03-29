/* ============================================
   CUSTOM CURSOR
   ============================================ */
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mouseX = 0,
    mouseY = 0,
    ringX = 0,
    ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  dot.style.left = mouseX + 'px';
  dot.style.top = mouseY + 'px';
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;
  ring.style.left = ringX + 'px';
  ring.style.top = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// Expand cursor ring on interactive elements
document.querySelectorAll(
  'a, button, .interactive, .portfolio-card, .service-row, .value-card, .team-card, input, select, textarea'
).forEach((el) => {
  el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
  el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
});

/* ============================================
   FULL-SCREEN MENU
   ============================================ */
const menuOverlay = document.getElementById('menuOverlay');
const menuBtn = document.getElementById('menuBtn');
const menuBtnDesktop = document.getElementById('menuBtnDesktop');
const closeMenuBtn = document.getElementById('closeMenu');
const menuLinks = document.querySelectorAll('[data-menu-link]');
let menuOpen = false;

function openMenu() {
  menuOpen = true;
  menuOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  // Animate hamburger lines to X
  document.querySelectorAll('.menu-line-1').forEach((l) => {
    l.style.transform = 'rotate(45deg) translateY(3px)';
  });
  document.querySelectorAll('.menu-line-2').forEach((l) => {
    l.style.transform = 'rotate(-45deg) translateY(-3px)';
  });
}

function closeMenu() {
  menuOpen = false;
  menuOverlay.classList.remove('open');
  document.body.style.overflow = '';
  document.querySelectorAll('.menu-line-1').forEach((l) => {
    l.style.transform = '';
  });
  document.querySelectorAll('.menu-line-2').forEach((l) => {
    l.style.transform = '';
  });
}

menuBtn.addEventListener('click', () => (menuOpen ? closeMenu() : openMenu()));
menuBtnDesktop.addEventListener('click', () =>
  menuOpen ? closeMenu() : openMenu()
);
closeMenuBtn.addEventListener('click', closeMenu);
menuLinks.forEach((link) => link.addEventListener('click', closeMenu));

// /* ============================================
//    SHOWREEL MODAL
//    ============================================ */
// const showreelModal = document.getElementById('showreelModal');
// const showreelPlayBtn = document.getElementById('showreelPlayBtn');
// const heroShowreelBtn = document.getElementById('heroShowreelBtn');
// const closeShowreelBtn = document.getElementById('closeShowreel');

// function openShowreel(e) {
//   if (e) e.preventDefault();
//   showreelModal.classList.add('open');
//   document.body.style.overflow = 'hidden';
// }

// function closeShowreel() {
//   showreelModal.classList.remove('open');
//   document.body.style.overflow = '';
// }

// showreelPlayBtn.addEventListener('click', openShowreel);
// heroShowreelBtn.addEventListener('click', openShowreel);
// closeShowreelBtn.addEventListener('click', closeShowreel);
// showreelModal.addEventListener('click', (e) => {
//   if (e.target === showreelModal) closeShowreel();
// });

/* ============================================
   SHOWREEL MODAL
   ============================================ */
const showreelModal = document.getElementById('showreelModal');
const showreelPlayBtn = document.getElementById('showreelPlayBtn');
const heroShowreelBtn = document.getElementById('heroShowreelBtn');
const closeShowreelBtn = document.getElementById('closeShowreel');

// ── Choose ONE of these URL formats based on your option above ──

// OPTION 1: Self-hosted MP4 — no URL needed, video plays natively
// (nothing extra required)

// OPTION 2: YouTube — replace YOUR_VIDEO_ID with the 11-char ID from the YouTube URL
const YOUTUBE_VIDEO_ID = 'YOUR_VIDEO_ID';
const youtubeEmbedUrl = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&color=white`;

// OPTION 3: Vimeo — replace YOUR_VIDEO_ID with the number from the Vimeo URL
const VIMEO_VIDEO_ID = 'YOUR_VIDEO_ID';
const vimeoEmbedUrl = `https://player.vimeo.com/video/${VIMEO_VIDEO_ID}?autoplay=1&background=0`;

// ── Use the URL that matches your chosen option ──
const showreelUrl = youtubeEmbedUrl; // change to vimeoEmbedUrl for Vimeo

function openShowreel(e) {
  if (e) e.preventDefault();
  showreelModal.classList.add('open');
  document.body.style.overflow = 'hidden';

  // For YouTube / Vimeo: inject the src to trigger autoplay
  const iframe = document.getElementById('showreelIframe');
  if (iframe && showreelUrl) {
    iframe.src = showreelUrl;
  }

  // For self-hosted MP4: play the video
  const video = document.getElementById('showreelVideo');
  if (video) {
    video.play().catch(() => {});
  }
}

function closeShowreel() {
  showreelModal.classList.remove('open');
  document.body.style.overflow = '';

  // Stop YouTube / Vimeo by clearing src
  const iframe = document.getElementById('showreelIframe');
  if (iframe) {
    iframe.src = '';
  }

  // Pause self-hosted MP4
  const video = document.getElementById('showreelVideo');
  if (video) {
    video.pause();
    video.currentTime = 0;
  }
}

showreelPlayBtn.addEventListener('click', openShowreel);
heroShowreelBtn.addEventListener('click', openShowreel);
closeShowreelBtn.addEventListener('click', closeShowreel);
showreelModal.addEventListener('click', (e) => {
  if (e.target === showreelModal) closeShowreel();
});

/* ============================================
   NAVBAR BACKGROUND ON SCROLL
   ============================================ */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    navbar.style.background = 'rgba(0,0,0,0.85)';
    navbar.style.backdropFilter = 'blur(16px)';
    navbar.style.borderBottom = '1px solid rgba(255,255,255,0.06)';
  } else {
    navbar.style.background = 'transparent';
    navbar.style.backdropFilter = 'none';
    navbar.style.borderBottom = '1px solid transparent';
  }
});

/* ============================================
   SCROLL REVEAL (IntersectionObserver)
   ============================================ */
const revealElements = document.querySelectorAll(
  '.reveal, .reveal-left, .reveal-right, .img-reveal'
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px',
  }
);

revealElements.forEach((el) => revealObserver.observe(el));

// /* ============================================
//    PORTFOLIO HORIZONTAL SCROLL (DRAG)
//    ============================================ */
// const portfolioScroll = document.getElementById('portfolioScroll');
// let isDragging = false,
//     startX,
//     scrollLeftPos;

// portfolioScroll.addEventListener('mousedown', (e) => {
//   isDragging = true;
//   portfolioScroll.classList.add('dragging');
//   startX = e.pageX - portfolioScroll.offsetLeft;
//   scrollLeftPos = portfolioScroll.scrollLeft;
// });

// portfolioScroll.addEventListener('mouseleave', () => {
//   isDragging = false;
//   portfolioScroll.classList.remove('dragging');
// });

// portfolioScroll.addEventListener('mouseup', () => {
//   isDragging = false;
//   portfolioScroll.classList.remove('dragging');
// });

// portfolioScroll.addEventListener('mousemove', (e) => {
//   if (!isDragging) return;
//   e.preventDefault();
//   const x = e.pageX - portfolioScroll.offsetLeft;
//   const walk = (x - startX) * 1.8;
//   portfolioScroll.scrollLeft = scrollLeftPos - walk;
// });

/* ============================================
   PORTFOLIO INLINE VIDEO PLAY/PAUSE
   ============================================ */
document.querySelectorAll('.portfolio-card .play-icon').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const card = btn.closest('.portfolio-card');
    const video = card.querySelector('.portfolio-video');

    if (card.classList.contains('playing')) {
      // Pause
      video.pause();
      card.classList.remove('playing');
    } else {
      // Stop any other playing videos first
      document.querySelectorAll('.portfolio-card.playing').forEach((other) => {
        other.querySelector('.portfolio-video').pause();
        other.classList.remove('playing');
      });

      // Play this one
      video.play().catch(() => {});
      card.classList.add('playing');
    }
  });
});

/* ============================================
   PORTFOLIO GENRE FILTER
   ============================================ */
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const genre = btn.dataset.filter;

    // Update active button
    filterBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    // Pause any playing video before filtering
    document.querySelectorAll('.portfolio-card.playing').forEach((card) => {
      card.querySelector('.portfolio-video').pause();
      card.classList.remove('playing');
    });

    // Filter cards
    portfolioCards.forEach((card) => {
      if (genre === 'all' || card.dataset.genre === genre) {
        card.classList.remove('filtered-out');
      } else {
        card.classList.add('filtered-out');
      }
    });

    // Reset scroll position to start
    document.getElementById('portfolioScroll').scrollLeft = 0;
  });
});

/* ============================================
   CONTACT FORM (MAILTO)
   ============================================ */
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const projectType = document.getElementById('projectType').value;
  const budget = document.getElementById('budget').value;
  const message = document.getElementById('message').value;

  let body = `Name: ${name}%0AEmail: ${email}%0A`;
  if (projectType) body += `Project Type: ${projectType}%0A`;
  if (budget) body += `Budget: ${budget}%0A`;
  body += `%0AProject Details:%0A${message}`;

  window.location.href =
    `mailto:blackkatpictures23@gmail.com?subject=${encodeURIComponent(
      '[Website Inquiry] from ' + name
    )}&body=${body}`;
});

/* ============================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ============================================ */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = 80;
        const pos =
          target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: pos, behavior: 'smooth' });
      }
    }
  });
});

/* ============================================
   HERO PARALLAX (SUBTLE)
   ============================================ */
// const heroBg = document.querySelector('.hero-bg');

// window.addEventListener(
//   'scroll',
//   () => {
//     const scrolled = window.pageYOffset;
//     if (scrolled < window.innerHeight) {
//       heroBg.style.transform = `scale(${
//         1 + scrolled * 0.0001
//       }) translateY(${scrolled * 0.15}px)`;
//     }
//   },
//   { passive: true }
// );

/* ============================================
   KEYBOARD: ESCAPE CLOSES MODALS
   ============================================ */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (showreelModal.classList.contains('open')) closeShowreel();
    if (menuOpen) closeMenu();
  }
});