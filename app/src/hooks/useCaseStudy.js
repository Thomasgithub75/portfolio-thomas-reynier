import { useEffect, useState, useRef } from 'react';

export function useScrollProgress() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    function onScroll() {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setWidth(total > 0 ? (window.scrollY / total) * 100 : 0);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return width;
}

export function useBackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    function onScroll() { setVisible(window.scrollY > 400); }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return visible;
}

export function useInViewAnimation(selector = '.case-section, .mission-banner') {
  useEffect(() => {
    const els = document.querySelectorAll(selector);
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); obs.unobserve(e.target); } });
    }, { rootMargin: '-8% 0px -8% 0px', threshold: 0.05 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [selector]);
}

export function useToc(ids) {
  const [activeId, setActiveId] = useState('');
  const [tocVisible, setTocVisible] = useState(true);
  useEffect(() => {
    const sectionEls = ids.map(id => document.getElementById(id)).filter(Boolean);
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveId(entry.target.id);
      });
    }, { rootMargin: '-15% 0px -70% 0px' });
    sectionEls.forEach(el => obs.observe(el));

    const nextSection = document.querySelector('.next-section');
    let hideObs;
    if (nextSection) {
      hideObs = new IntersectionObserver((entries) => {
        entries.forEach(e => setTocVisible(!e.isIntersecting));
      }, { threshold: 0.05 });
      hideObs.observe(nextSection);
    }
    return () => { obs.disconnect(); if (hideObs) hideObs.disconnect(); };
  }, [ids]);
  return { activeId, tocVisible };
}

export function useLightbox() {
  const [lightboxSrc, setLightboxSrc] = useState(null);
  function openLightbox(src) { setLightboxSrc(src); }
  function closeLightbox() { setLightboxSrc(null); }
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') closeLightbox(); }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);
  return { lightboxSrc, openLightbox, closeLightbox };
}
