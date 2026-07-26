/* Scroll-triggered reveal animations, shared across all EEI pages.
   Adds a fade/slide-in transition the first time each element scrolls into view. */
(function () {
  var SELECTOR = [
    // whole-section reveals — the big blocks that make scrolling feel alive
    '.about', '.calendar-section', '.corporate', '.cta', '.cta-band', '.donate',
    '.events-section', '.founders', '.host-section', '.mission', '.partners',
    '.past-section', '.programs', '.programs-section', '.pullquote', '.section',
    '.timeline', '.who-section', '.why',
    // individual cards/blocks within those sections — cascade in on top of the section fade
    '.prog-card', '.who-card', '.stat-card', '.impact-card', '.impact-item', '.social-card',
    '.info-block', '.trust-block', '.ein-block', '.host-form-card', '.form-card',
    '.event-card', '.past-card', '.dl-card', '.ext-card', '.video-card',
    '.founder-card', '.faq-item', '.donate-card', '.tl-item',
    '.host-text', '.settings-note', '.qf-cell', '.stat-cell', '.hs-cell'
  ].join(',');

  function initReveal() {
    var els = Array.prototype.slice.call(document.querySelectorAll(SELECTOR));
    if (!els.length) return;

    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) return;

    els.forEach(function (el, i) {
      el.classList.add('reveal-init');
      el.style.transitionDelay = ((i % 4) * 0.08) + 's';
    });

    function cleanup(el) {
      el.classList.remove('reveal-init', 'is-visible');
      el.style.transitionDelay = '';
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        el.classList.add('is-visible');
        el.addEventListener('transitionend', function handler() {
          cleanup(el);
          el.removeEventListener('transitionend', handler);
        }, { once: true });
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    els.forEach(function (el) { io.observe(el); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReveal);
  } else {
    initReveal();
  }
})();
