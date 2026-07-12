// ---------- Mobile Navigation ----------
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });
}

// ---------- Navbar Scroll Effect ----------
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
  } else {
    navbar.style.boxShadow = 'none';
  }
  
  lastScroll = currentScroll;
});

// ---------- Stats Counter Animation ----------
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

function animateStats() {
  statNumbers.forEach(stat => {
    const target = parseInt(stat.dataset.target);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        stat.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        stat.textContent = target;
      }
    };

    updateCounter();
  });
}

// Intersection Observer for stats
const statsSection = document.querySelector('.stats');
if (statsSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        animateStats();
        statsAnimated = true;
      }
    });
  }, { threshold: 0.5 });

  observer.observe(statsSection);
}

// ---------- FAQ Accordion ----------
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  
  question.addEventListener('click', () => {
    const isActive = item.classList.contains('active');
    
    // Close all
    faqItems.forEach(i => i.classList.remove('active'));
    
    // Toggle current
    if (!isActive) {
      item.classList.add('active');
    }
  });
});

// ---------- Consultation Form -> WhatsApp ----------
const consultForm = document.getElementById('consultForm');

if (consultForm) {
  consultForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = consultForm.name.value.trim();
    const phone = consultForm.phone.value.trim();
    const caseType = consultForm.case.value;
    const message = consultForm.message.value.trim();

    if (!name || !phone || !caseType) {
      alert('Mohon lengkapi Nama, No. WhatsApp, dan Jenis Perkara.');
      return;
    }

    const waNumber = '6285119973606';
    const text = 
      `Halo RK Lawyer & Partners, saya ingin konsultasi.%0A%0A` +
      `Nama: ${name}%0A` +
      `No. WhatsApp: ${phone}%0A` +
      `Jenis Perkara: ${caseType}%0A` +
      `Pesan: ${message || '-'}`;

    window.open(`https://wa.me/${waNumber}?text=${text}`, '_blank');
  });
}

// ---------- Smooth Scroll for Anchor Links ----------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ---------- Active Nav Link on Scroll ----------
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset;
  
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    
    const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
    if (navLink) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLink.style.color = '#c9a227';
      } else {
        navLink.style.color = '';
      }
    }
  });
});
