// DADOS DE CONTATO E REDES
const WHATSAPP_URL = 'https://wa.me/554499016109';
const INSTAGRAM_URL = 'https://www.instagram.com/weverton__personal/';
const EMAIL = 'Wevertongg8@gmail.com';
const CREF_NUMBER = '043932-G/PR';

function renderSocialLinks() {
  const container = document.getElementById('social-links');
  if (!container) return;
  container.innerHTML = '';

  if (WHATSAPP_URL) {
    container.innerHTML += `<a href="${WHATSAPP_URL}" target="_blank" rel="noopener noreferrer" class="text-[#5B6068] hover:text-[#1E5BFF] transition"><i data-lucide="message-circle" style="width:24px;height:24px"></i></a>`;
  }
  if (INSTAGRAM_URL) {
    container.innerHTML += `<a href="${INSTAGRAM_URL}" target="_blank" rel="noopener noreferrer" class="text-[#5B6068] hover:text-[#1E5BFF] transition"><i class="fa-brands fa-instagram" style="font-size:24px"></i></a>`;
  }
  if (EMAIL) {
    container.innerHTML += `<a href="mailto:${EMAIL}" class="text-[#5B6068] hover:text-[#1E5BFF] transition"><i data-lucide="mail" style="width:24px;height:24px"></i></a>`;
  }
}

function renderCref() {
  const el = document.getElementById('cref-display');
  if (!el) return;
  if (CREF_NUMBER) {
    el.textContent = 'CREF: ' + CREF_NUMBER;
    el.classList.remove('hidden');
  }
}

function toggleFaq(el) {
  el.classList.toggle('open');
}

// Menu Mobile
const overlay = document.getElementById('nav-overlay');
const menuToggle = document.getElementById('menu-toggle');
const menuClose = document.getElementById('menu-close');

if (menuToggle && overlay) {
  menuToggle.addEventListener('click', () => overlay.classList.add('open'));
}

if (menuClose && overlay) {
  menuClose.addEventListener('click', () => overlay.classList.remove('open'));
}

document.querySelectorAll('.nav-link').forEach(l => {
  l.addEventListener('click', () => overlay && overlay.classList.remove('open'));
});

// Scroll suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href && href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

// Observer para animações fade-in
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));

// Sticky CTA Mobile - Some ao entrar na seção #planos e reaparece ao sair dela
const stickyCta = document.getElementById('sticky-cta');
const planosSection = document.getElementById('planos');

if (stickyCta && planosSection) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroThreshold = window.innerHeight * 0.6; // Começa a poder exibir após passar do hero
    const rect = planosSection.getBoundingClientRect();

    // Verifica se o usuário está dentro da seção #planos
    const insidePlanos = rect.top <= window.innerHeight && rect.bottom >= 0;

    // Só exibe se já tiver passado do Hero e NÃO estiver na seção de Planos
    if (scrollY > heroThreshold && !insidePlanos) {
      stickyCta.classList.add('show');
    } else {
      stickyCta.classList.remove('show');
    }
  }, { passive: true });
}

// Inicialização
renderSocialLinks();
renderCref();
if (window.lucide) {
  lucide.createIcons();
}

// Desfoque progressivo e fade na arte ao rolar
const heroContainer = document.getElementById('hero-art-container');
const heroImg = document.getElementById('hero-img');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const triggerHeight = window.innerHeight * 0.75;

  if (scrollY <= triggerHeight) {
    const progress = Math.min(scrollY / triggerHeight, 1);
    
    const blurAmount = progress * 14;
    const opacityAmount = 1 - (progress * 0.45);

    if (heroImg) {
      heroImg.style.filter = `blur(${blurAmount}px)`;
      heroImg.style.opacity = opacityAmount;
    }
    if (heroContainer) {
      heroContainer.style.display = 'flex';
    }
  } else {
    if (heroContainer) {
      heroContainer.style.display = 'none';
    }
  }
}, { passive: true });

// Controle inteligente das setas do carrossel no mobile
const carousel = document.getElementById('reviews-carousel');
const prevBtn = document.getElementById('carousel-prev');
const nextBtn = document.getElementById('carousel-next');

if (carousel && prevBtn && nextBtn) {
  carousel.addEventListener('scroll', () => {
    const scrollLeft = carousel.scrollLeft;
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;

    // Se rolou mais de 20px, exibe o botão de voltar
    if (scrollLeft > 20) {
      prevBtn.classList.remove('hidden');
    } else {
      prevBtn.classList.add('hidden');
    }

    // Se chegou perto do final, oculta o botão de avançar
    if (scrollLeft >= maxScroll - 20) {
      nextBtn.classList.add('hidden');
    } else {
      nextBtn.classList.remove('hidden');
    }
  }, { passive: true });
}