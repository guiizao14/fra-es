// Progressive enhancement: purchase links, navigation and FAQ work without JavaScript.
(() => {
  const video = document.querySelector('#product-video');
  const launch = document.querySelector('.video-launch');
  if (video && launch) {
    const status = document.querySelector('.video-status');
    // The HTML keeps native controls as a no-JS fallback. Show them after play.
    video.controls = false;
    launch.hidden = false;
    launch.addEventListener('click', async () => {
      try {
        status.hidden = true;
        video.controls = true;
        await video.play();
      } catch {
        status.hidden = false;
      }
    });
    video.addEventListener('play', () => { launch.hidden = true; status.hidden = true; });
    video.addEventListener('ended', () => { video.controls = false; launch.hidden = false; });
    video.addEventListener('error', () => { video.controls = true; status.hidden = false; launch.hidden = false; });
  }
  const dialog = document.querySelector('.preview-dialog');
  if (dialog && typeof dialog.showModal === 'function') {
    const image = dialog.querySelector('#dialog-image');
    let trigger;
    for (const link of document.querySelectorAll('.preview-open')) {
      link.addEventListener('click', (event) => {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        trigger = link;
        image.src = link.href;
        image.alt = link.querySelector('img').alt;
        dialog.querySelector('#dialog-title').textContent = link.dataset.title;
        dialog.querySelector('#dialog-caption').textContent = link.dataset.caption;
        dialog.showModal();
        dialog.scrollTop = 0;
        document.body.classList.add('modal-open');
        dialog.querySelector('.dialog-close').focus();
      });
    }
    dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => {
      const rect = dialog.getBoundingClientRect();
      if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
    });
    dialog.addEventListener('close', () => {
      document.body.classList.remove('modal-open');
      trigger?.focus({ preventScroll: true });
    });
  }

  const bar = document.querySelector('.mobile-purchase');
  if (bar && 'IntersectionObserver' in window) {
    const hero = document.querySelector('.hero');
    const offers = document.querySelector('#ofertas');
    const footer = document.querySelector('.site-footer');
    const state = new Map([[hero, true], [offers, false], [footer, false]]);
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) state.set(entry.target, entry.isIntersecting);
      bar.hidden = state.get(hero) || state.get(offers) || state.get(footer);
    });
    for (const element of state.keys()) observer.observe(element);
  }
})();
