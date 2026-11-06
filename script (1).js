// ========== منوی موبایل ==========
const navToggle = document.getElementById('nav-toggle');
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav-link');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    const icon = navToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
  });
}

// بستن منو بعد از کلیک روی لینک
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
    const icon = navToggle.querySelector('i');
    if (icon) {
      icon.classList.add('fa-bars');
      icon.classList.remove('fa-times');
    }
  });
});

// ========== هدر هنگام اسکرول ==========
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ========== فعال کردن لینک ناوبری بر اساس بخش ==========
const sections = document.querySelectorAll('section[id]');

function highlightNav() {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach(link => link.classList.remove('active'));
      if (navLink) navLink.classList.add('active');
    }
  });
}

window.addEventListener('scroll', highlightNav);

// ========== سال جاری در فوتر ==========
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ========== فرم تماس واقعی (Formspree) ==========
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');

    // نمایش حالت لودینگ
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-flex';
    submitBtn.disabled = true;
    formStatus.textContent = '';
    formStatus.className = 'form-status';

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        formStatus.textContent = 'پیام شما با موفقیت ارسال شد! به زودی پاسخ می‌دهم.';
        formStatus.classList.add('success');
        contactForm.reset();
      } else {
        const data = await response.json();
        if (data.errors) {
          formStatus.textContent = data.errors.map(err => err.message).join(', ');
        } else {
          formStatus.textContent = 'متأسفانه خطایی رخ داد. لطفاً دوباره تلاش کنید.';
        }
        formStatus.classList.add('error');
      }
    } catch (error) {
      formStatus.textContent = 'خطا در اتصال. لطفاً اتصال اینترنت خود را بررسی کنید.';
      formStatus.classList.add('error');
    } finally {
      btnText.style.display = 'inline';
      btnLoading.style.display = 'none';
      submitBtn.disabled = false;
    }
  });
}

// ========== انیمیشن ظاهر شدن هنگام اسکرول ==========
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.skill-card, .project-card, .info-item, .contact-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
  observer.observe(el);
});
