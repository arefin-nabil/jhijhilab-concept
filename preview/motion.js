'use strict';
(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const activeAnimations = new Set();

  function enter(element, distance = 16, delay = 0) {
    if (reduced.matches || typeof element.animate !== 'function') return;
    const animation = element.animate([
      {opacity: 0.58, transform: `translateY(${distance}px)`},
      {opacity: 1, transform: 'translateY(0)'}
    ], {duration: 540, delay, easing: 'cubic-bezier(.2,.75,.24,1)', fill: 'backwards'});
    activeAnimations.add(animation);
    animation.onfinish = animation.oncancel = () => activeAnimations.delete(animation);
  }

  const gallery = document.querySelector('.project-gallery');
  if (gallery) {
    const tabs = Array.from(gallery.querySelectorAll('[data-project]'));
    const list = gallery.querySelector('.project-tabs');
    const panels = tabs.map(tab => document.getElementById(tab.getAttribute('aria-controls')));
    list.setAttribute('role','tablist');
    tabs.forEach((tab,index) => {
      tab.setAttribute('role','tab');
      panels[index].setAttribute('role','tabpanel');
      panels[index].setAttribute('aria-labelledby',tab.id);
    });
    let current = -1;

    function select(index, animate) {
      if (index === current) return;
      current = index;
      tabs.forEach((tab,i) => {
        const selected = i === index;
        tab.setAttribute('aria-selected',String(selected));
        tab.tabIndex = selected ? 0 : -1;
        panels[i].hidden = !selected;
      });
      if (animate) {
        enter(panels[index].querySelector('.project-story'),9);
        enter(panels[index].querySelector('.project-visual'),17);
      }
    }
    function selectFromLocation() {
      const found = panels.findIndex(panel => '#'+panel.id === window.location.hash);
      if (found >= 0 || current < 0) select(Math.max(0,found),false);
    }
    tabs.forEach((tab,index) => {
      function choose() {
        select(index,true);
        // Keep the same project selected after switching language or copying the URL.
        const hash = '#'+panels[index].id;
        try {
          history.replaceState(null,'',hash);
          const languageLink = document.querySelector('a.language');
          if (languageLink) languageLink.hash = hash;
        } catch { /* Some offline previews restrict updates to browser history. */ }
      }
      tab.addEventListener('click',choose);
      tab.addEventListener('keydown',event => {
        const last = tabs.length - 1;
        const destination = {ArrowRight:(index+1)%tabs.length, ArrowLeft:(index+last)%tabs.length, Home:0, End:last}[event.key];
        if (destination === undefined) return;
        event.preventDefault();
        tabs[destination].focus();
        tabs[destination].click();
      });
    });
    selectFromLocation();
    list.hidden = false;
    window.addEventListener('hashchange',selectFromLocation);
  }

  const stage = document.querySelector('.art-stage');
  const precise = window.matchMedia('(hover:hover) and (pointer:fine)');
  let frame = 0;
  function restStage() {
    cancelAnimationFrame(frame);
    frame = 0;
    if (stage) {
      stage.style.removeProperty('--tilt-x');
      stage.style.removeProperty('--tilt-y');
    }
  }
  if (stage) {
    let x = 0, y = 0;
    stage.addEventListener('pointermove',event => {
      if (!precise.matches || reduced.matches || event.pointerType === 'touch') return;
      x = event.clientX;
      y = event.clientY;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const bounds = stage.getBoundingClientRect();
        const offsetX = Math.min(1,Math.max(-1,(x-bounds.left)/bounds.width*2-1));
        const offsetY = Math.min(1,Math.max(-1,(y-bounds.top)/bounds.height*2-1));
        stage.style.setProperty('--tilt-x',(-offsetY*3.5).toFixed(2)+'deg');
        stage.style.setProperty('--tilt-y',(offsetX*5).toFixed(2)+'deg');
      });
    },{passive:true});
    stage.addEventListener('pointerleave',restStage);
    stage.addEventListener('pointercancel',restStage);
    precise.addEventListener('change',restStage);
  }

  if ('IntersectionObserver' in window && !reduced.matches) {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting);
      visible.forEach((entry,i) => {
        observer.unobserve(entry.target);
        enter(entry.target,15,Math.min(i,2)*45);
      });
    },{threshold:0.08});
    document.querySelectorAll('.section-heading,.service-card,.work-card,.steps article,.invite-in,.project-gallery').forEach(element => observer.observe(element));
  }
  reduced.addEventListener('change',() => {
    if (!reduced.matches) return;
    activeAnimations.forEach(animation => animation.cancel());
    restStage();
  });
})();
