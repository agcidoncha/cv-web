
      function setLang(lang) {
        document.documentElement.lang = lang;

        document.querySelectorAll('[data-lang]').forEach((el) => {
          el.classList.toggle('active', el.dataset.lang === lang);
        });

        document.querySelectorAll('[data-lang-inline]').forEach((el) => {
          el.classList.toggle('active', el.dataset.langInline === lang);
        });

        const btnEn = document.getElementById('btn-en');
        const btnEs = document.getElementById('btn-es');
        btnEn.classList.toggle('active', lang === 'en');
        btnEs.classList.toggle('active', lang === 'es');        btnEn.setAttribute('aria-pressed', String(lang === 'en'));
        btnEs.setAttribute('aria-pressed', String(lang === 'es'));
        try {
          localStorage.setItem('cv-lang', lang);
        } catch (error) {
          console.warn('localStorage no disponible', error);
        }
      }

      document.addEventListener('DOMContentLoaded', () => {
        const btnEn = document.getElementById('btn-en');
        const btnEs = document.getElementById('btn-es');
        const navToggle = document.getElementById('nav-toggle');
        const topbar = document.querySelector('.topbar');
        const navLinks = document.querySelectorAll('.nav a');

        btnEn.addEventListener('click', () => setLang('en'));
        btnEs.addEventListener('click', () => setLang('es'));

        navToggle.addEventListener('click', () => {
          const expanded = navToggle.getAttribute('aria-expanded') === 'true';
          navToggle.setAttribute('aria-expanded', String(!expanded));
          topbar.classList.toggle('menu-open', !expanded);
        });

        const contactTriggers = document.querySelectorAll('.contact-trigger');
        const contactModal = document.getElementById('contact-modal');
        const modalClose = document.getElementById('modal-close');

        navLinks.forEach((link) => {
          link.addEventListener('click', () => {
            if (topbar.classList.contains('menu-open')) {
              topbar.classList.remove('menu-open');
              navToggle.setAttribute('aria-expanded', 'false');
            }
          });
        });

        const openContactModal = () => {
          contactModal.classList.add('open');
          contactModal.setAttribute('aria-hidden', 'false');
          document.body.style.overflow = 'hidden';
        };

        const closeContactModal = () => {
          contactModal.classList.remove('open');
          contactModal.setAttribute('aria-hidden', 'true');
          document.body.style.overflow = '';
        };

        contactTriggers.forEach((trigger) => {
          trigger.addEventListener('click', (event) => {
            event.preventDefault();
            openContactModal();
            if (topbar.classList.contains('menu-open')) {
              topbar.classList.remove('menu-open');
              navToggle.setAttribute('aria-expanded', 'false');
            }
          });
        });

        modalClose.addEventListener('click', closeContactModal);

        contactModal.addEventListener('click', (event) => {
          if (event.target === contactModal) {
            closeContactModal();
          }
        });

        window.addEventListener('keydown', (event) => {
          if (event.key === 'Escape' && contactModal.classList.contains('open')) {
            closeContactModal();
          }
        });

        // Active link based on scroll position
        const updateActiveLink = () => {
          const sections = document.querySelectorAll('section[id]');
          const scrollPosition = window.scrollY + 170;
          let active = sections.length > 0 ? sections[0].getAttribute('id') : null;

          sections.forEach((section) => {
            const top = section.offsetTop;
            if (scrollPosition >= top) {
              active = section.getAttribute('id');
            }
          });

          navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${active}`) {
              link.classList.add('active');
            }
          });
        };

        // Ejecutar al cargar
        updateActiveLink();

        // Ejecutar al hacer scroll
        let ticking = false;
        window.addEventListener('scroll', () => {
          if (!ticking) {
            window.requestAnimationFrame(() => {
              updateActiveLink();
              ticking = false;
            });
            ticking = true;
          }
        }, { passive: true });

        let savedLang = 'en';
        try {
          savedLang = localStorage.getItem('cv-lang') || 'en';
        } catch (error) {
          console.warn('No se pudo leer el idioma guardado', error);
        }

        setLang(savedLang);
      });
