// Progressive enhancement: every purchase link works without JavaScript.
// The CTAs are plain anchors straight to the advertised R$9,99 kit checkout —
// nothing stands between the click and the payment page. JS only adds tracking.
(() => {
  /* ---------------------------------------------------------------
     Tracking. fbq is injected asynchronously by the UTMify pixel, so
     every call is guarded — an early click simply sends nothing and
     still follows the link.
     --------------------------------------------------------------- */
  const OFERTAS = {
    kit:   { content_name: 'Kit Frações na Prática',  content_ids: ['kit-fracoes'],   value: 9.99 },
    combo: { content_name: 'Kit + 20 Planos de Aula', content_ids: ['combo-fracoes'], value: 14.99 },
  };

  const track = (event, params, custom) => {
    if (typeof window.fbq !== 'function') return;
    window.fbq(custom ? 'trackCustom' : 'track', event, { ...params, currency: 'BRL' });
  };

  /* ---------------------------------------------------------------
     Checkout clicks. The hrefs stay untouched in the DOM so the UTMify
     script can append the campaign parameters before the click.
     --------------------------------------------------------------- */
  // Delegated, capture phase. The UTMify pixel rewrites these anchors to append
  // the campaign parameters and any listener bound straight to the element is
  // lost in the process — measured in the browser, the per-element version
  // never fired. Capture also puts us ahead of the pixel's own click hijack.
  document.addEventListener('click', (event) => {
    const link = event.target.closest?.('[data-checkout]');
    if (!link) return;
    const produto = link.dataset.checkout;
    const oferta = OFERTAS[produto];
    if (!oferta) return;
    track('InitiateCheckout', oferta);
    track('SaidaParaCheckout', { produto, value: oferta.value }, true);
  }, true);

  /* ---------------------------------------------------------------
     Offer section viewed — fires once.
     --------------------------------------------------------------- */
  const offerSection = document.querySelector('[data-offer-section]');
  if (offerSection && 'IntersectionObserver' in window) {
    const seen = new IntersectionObserver((entries, obs) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        track('ViewContent', OFERTAS.kit);
        obs.disconnect();
      }
    }, { threshold: 0.4 });
    seen.observe(offerSection);
  }

  /* ---------------------------------------------------------------
     Sticky purchase bar. Hidden wherever a full-size CTA is already
     on screen, so two big buttons never compete in the same view.
     --------------------------------------------------------------- */
  const bar = document.querySelector('[data-sticky]');
  if (bar && 'IntersectionObserver' in window) {
    const watched = ['.hero', '#oferta', '.final', '.site-footer']
      .map((sel) => document.querySelector(sel))
      .filter(Boolean);
    const onScreen = new Map(watched.map((el) => [el, false]));
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) onScreen.set(entry.target, entry.isIntersecting);
      bar.hidden = [...onScreen.values()].some(Boolean);
    });
    for (const el of watched) observer.observe(el);
  }

  /* ---------------------------------------------------------------
     Page previews — enlarge a real PDF page.
     --------------------------------------------------------------- */
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
    const closePreview = () => {
      if (dialog.open) dialog.close();
      document.body.classList.remove('modal-open');
      trigger?.focus({ preventScroll: true });
    };

    dialog.querySelector('.dialog-close').addEventListener('click', closePreview);
    dialog.addEventListener('close', closePreview);
    dialog.addEventListener('cancel', closePreview);
    dialog.addEventListener('click', (event) => {
      if (event.target !== dialog) return;
      const box = dialog.getBoundingClientRect();
      const outside = event.clientX < box.left || event.clientX > box.right ||
                      event.clientY < box.top  || event.clientY > box.bottom;
      if (outside) closePreview();
    });
  }
})();
