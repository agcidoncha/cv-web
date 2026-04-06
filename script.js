
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
        btnEn.addEventListener('click', () => setLang('en'));
        btnEs.addEventListener('click', () => setLang('es'));
        let savedLang = 'en';
        try {
          savedLang = localStorage.getItem('cv-lang') || 'en';
        } catch (error) {
          console.warn('No se pudo leer el idioma guardado', error);
        }

        setLang(savedLang);
      });
