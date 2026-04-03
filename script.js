// ========== PRELOADER ==========
window.addEventListener('load', () => {
  const loader = document.querySelector('.loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 800);
  }
});

// ========== CUSTOM CURSOR ==========
const cursor = document.createElement('div');
const cursorFollower = document.createElement('div');
cursor.className = 'cursor';
cursorFollower.className = 'cursor-follower';
document.body.appendChild(cursor);
document.body.appendChild(cursorFollower);

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  
  setTimeout(() => {
    cursorFollower.style.left = e.clientX + 'px';
    cursorFollower.style.top = e.clientY + 'px';
  }, 50);
});

// Hover effect on interactive elements
const interactiveElements = document.querySelectorAll('a, button, .service-card, .project-card, .skill-card');
interactiveElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
    cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.2)';
    cursorFollower.style.opacity = '0.8';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
    cursorFollower.style.opacity = '0.5';
  });
});

// ========== NAVBAR SCROLL EFFECT ==========
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ========== ACTIVE NAV LINK ON SCROLL ==========
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ========== SCROLL REVEAL ANIMATION ==========
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// Add reveal class to elements
document.querySelectorAll('.service-card, .project-card, .skill-card, .glass, .glass-card, .hero .col-lg-6').forEach(el => {
  el.classList.add('reveal');
});

// ========== SKILLS PROGRESS ANIMATION ==========
const skillSection = document.querySelector('#Skills');
const progressFills = document.querySelectorAll('.progress-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      progressFills.forEach(fill => {
        const width = fill.style.width;
        if (width === '0%' || !width) {
          const targetWidth = fill.getAttribute('data-width') || fill.parentElement.parentElement.querySelector('.skill-percent')?.innerText || '70%';
          fill.style.width = targetWidth;
        }
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

if (skillSection) skillObserver.observe(skillSection);

// Set initial widths from data attributes
progressFills.forEach(fill => {
  const percent = fill.closest('.skill-card')?.querySelector('.skill-percent')?.innerText;
  if (percent) {
    fill.setAttribute('data-width', percent);
  }
});

// ========== TYPED TEXT ANIMATION ==========
const typedTextElement = document.querySelector('.typed-text');
if (typedTextElement) {
  const texts = ['Web Developer', 'UI/UX Designer', 'Tech Enthusiast', 'Creative Thinker'];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  
  function typeEffect() {
    const currentText = texts[textIndex];
    if (isDeleting) {
      typedTextElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedTextElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      setTimeout(typeEffect, 2000);
      return;
    }
    
    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      setTimeout(typeEffect, 500);
      return;
    }
    
    setTimeout(typeEffect, isDeleting ? 50 : 100);
  }
  
  typeEffect();
}

// ========== PARALLAX EFFECT ==========
window.addEventListener('mousemove', (e) => {
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;
  
  const spheres = document.querySelectorAll('.gradient-sphere');
  spheres.forEach((sphere, index) => {
    const moveX = (mouseX - 0.5) * 20 * (index + 1);
    const moveY = (mouseY - 0.5) * 20 * (index + 1);
    sphere.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + (index * 0.05)})`;
  });
});

// ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href !== '') {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

// ========== FORM VALIDATION & SUBMIT ==========
const contactForm = document.querySelector('#Contact form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    const name = contactForm.querySelector('input[name="Name"]');
    const email = contactForm.querySelector('input[name="email"]');
    const message = contactForm.querySelector('textarea[name="message"]');
    
    if (!name.value.trim()) {
      e.preventDefault();
      showNotification('الرجاء إدخال الاسم', 'error');
      name.focus();
      return;
    }
    
    if (!email.value.trim() || !email.value.includes('@')) {
      e.preventDefault();
      showNotification('الرجاء إدخال بريد إلكتروني صحيح', 'error');
      email.focus();
      return;
    }
    
    if (!message.value.trim()) {
      e.preventDefault();
      showNotification('الرجاء إدخال الرسالة', 'error');
      message.focus();
      return;
    }
    
    showNotification('جاري الإرسال...', 'info');
  });
}

// ========== NOTIFICATION SYSTEM ==========
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas ${type === 'error' ? 'fa-exclamation-circle' : type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
      <span>${message}</span>
    </div>
  `;
  notification.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: ${type === 'error' ? '#dc3545' : type === 'success' ? '#28a745' : '#1e88e5'};
    color: white;
    padding: 12px 24px;
    border-radius: 60px;
    z-index: 10000;
    animation: slideInRight 0.3s ease;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  `;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'fadeOutRight 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// ========== PRELOAD IMAGES ==========
const images = document.querySelectorAll('img');
images.forEach(img => {
  img.addEventListener('error', () => {
    console.warn(`Failed to load image: ${img.src}`);
  });
});

// ========== ADD DYNAMIC STYLES FOR NOTIFICATIONS ==========
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from { transform: translateX(100px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes fadeOutRight {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100px); opacity: 0; }
  }
`;
document.head.appendChild(style);

// ========== DARK MODE TOGGLE (OPTIONAL) ==========
// يمكن إضافة زر للتبديل بين الوضع المظلم والفاتح

console.log('✨ Website loaded successfully | Developed by Anas Lotfy');