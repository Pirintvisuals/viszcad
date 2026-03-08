// counter.js – Animated number counters
// Finds first numeric text node inside .stat-num / .band-stat-num
// and counts from 0 to target when element enters viewport.

(function () {
  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  function runCounter(el) {
    // Find the first text-node child that starts with digits
    let textNode = null;
    let target = 0;
    for (const node of el.childNodes) {
      if (node.nodeType === 3) {           // TEXT_NODE
        const m = node.textContent.match(/^(\d+)/);
        if (m) {
          textNode = node;
          target = parseInt(m[1], 10);
          break;
        }
      }
    }
    if (!textNode || target === 0) return;

    const duration = target > 50 ? 3500 : 2500;
    const start = performance.now();

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.round(easeOutCubic(progress) * target);
      textNode.textContent = value;
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        textNode.textContent = target;   // ensure exact final value
      }
    }
    requestAnimationFrame(tick);
  }

  function initCounters() {
    const els = document.querySelectorAll('.stat-num, .band-stat-num');
    if (!els.length) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        if (el.dataset.counted) return;
        el.dataset.counted = '1';
        observer.unobserve(el);
        runCounter(el);
      });
    }, { threshold: 0.4 });

    els.forEach(function (el) { observer.observe(el); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCounters);
  } else {
    initCounters();
  }
})();
