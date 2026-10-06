"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const navMenu = document.getElementById("portfolioNav");
  const navLinks = document.querySelectorAll("#portfolioNav .nav-link");
  const backToTop = document.getElementById("backToTop");
  const year = document.getElementById("currentYear");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  year.textContent = new Date().getFullYear();

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.bootstrap && navMenu.classList.contains("show")) {
        window.bootstrap.Collapse.getOrCreateInstance(navMenu).hide();
      }
    });
  });

  const updateBackToTop = () => {
    backToTop.classList.toggle("visible", window.scrollY > 450);
  };

  window.addEventListener("scroll", updateBackToTop, { passive: true });
  updateBackToTop();

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  });

  if ("IntersectionObserver" in window && !reducedMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
  } else {
    document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
  }
});
