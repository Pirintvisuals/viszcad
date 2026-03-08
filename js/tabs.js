// tabs.js – Interactive About tabs on homepage

(function () {
  function initTabs() {
    const tabs = document.querySelectorAll('.about-tab');
    if (!tabs.length) return;

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        const idx = tab.dataset.tab;

        // Deactivate all
        document.querySelectorAll('.about-tab').forEach(function (t) {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        document.querySelectorAll('.about-tab-img').forEach(function (img) {
          img.classList.remove('active');
        });
        document.querySelectorAll('.about-tab-content').forEach(function (c) {
          c.classList.remove('active');
        });

        // Activate selected
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        const img = document.getElementById('tabImg' + idx);
        const content = document.getElementById('tabContent' + idx);
        if (img) img.classList.add('active');
        if (content) {
          content.classList.add('active');
          // Re-trigger animation
          content.style.animation = 'none';
          content.offsetHeight; // reflow
          content.style.animation = '';
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTabs);
  } else {
    initTabs();
  }
})();
