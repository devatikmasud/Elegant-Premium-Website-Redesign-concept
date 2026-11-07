/* Nexora theme control: compact single-icon toggle with saved preference. */
(function () {
  'use strict';
  var KEY = 'site-theme';
  var root = document.documentElement;
  var darkCss = document.getElementById('theme-dark-css');

  function stored() {
    try { return localStorage.getItem(KEY) === 'dark' ? 'dark' : 'light'; }
    catch (e) { return 'light'; }
  }

  function swapImages(mode) {
    var imgs = document.querySelectorAll('img[data-dark-src]');
    for (var i = 0; i < imgs.length; i++) {
      var img = imgs[i];
      if (!img.getAttribute('data-light-src')) img.setAttribute('data-light-src', img.getAttribute('src'));
      img.setAttribute('src', img.getAttribute(mode === 'dark' ? 'data-dark-src' : 'data-light-src'));
    }
    var signatures = document.querySelectorAll('img[src*="about-four-sign"]');
    for (var j = 0; j < signatures.length; j++) signatures[j].classList.toggle('sig', mode === 'dark');
  }

  function updateButton(mode) {
    var button = document.querySelector('.theme-switch button');
    if (!button) return;
    var nextMode = mode === 'dark' ? 'light' : 'dark';
    var icon = nextMode === 'dark'
      ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 13.2A8.7 8.7 0 0 1 10.8 3.2 8.9 8.9 0 1 0 20.8 13.2Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>'
      : '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3.8" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M12 2v2.2M12 19.8V22M4.93 4.93l1.55 1.55m11.04 11.04 1.55 1.55M2 12h2.2m15.6 0H22M4.93 19.07l1.55-1.55M17.52 6.48l1.55-1.55" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>';
    button.innerHTML = icon;
    button.setAttribute('aria-label', 'Switch to ' + nextMode + ' mode');
    button.setAttribute('title', 'Switch to ' + nextMode + ' mode');
  }

  function apply(mode, save) {
    if (darkCss) darkCss.media = mode === 'dark' ? 'all' : 'not all';
    root.setAttribute('data-theme', mode);
    swapImages(mode);
    updateButton(mode);
    if (save) {
      try { localStorage.setItem(KEY, mode); } catch (e) {}
    }
  }

  function build() {
    var wrap = document.createElement('div');
    wrap.className = 'theme-switch theme-switch--header';
    wrap.innerHTML = '<button type="button" aria-label="Switch to dark mode" title="Switch to dark mode"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 13.2A8.7 8.7 0 0 1 10.8 3.2 8.9 8.9 0 1 0 20.8 13.2Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg></button>';
    wrap.addEventListener('click', function () {
      apply(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true);
    });
    var headerTarget = document.querySelector('.header-style-one .outer-box, .main-header .outer-box, header .outer-box');
    if (headerTarget) headerTarget.insertBefore(wrap, headerTarget.firstChild);
    else document.body.appendChild(wrap);
  }

  function init() {
    build();
    apply(stored(), false);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
