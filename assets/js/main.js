import { businessConfig } from "./config.js";
import { initNavigation } from "./navigation.js";
import { initGallery } from "./gallery.js";
import { initFaq } from "./faq.js";

function getMapsUrl() {
  if (businessConfig.googleMapsUrl) return businessConfig.googleMapsUrl;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(businessConfig.address)}`;
}

function getViberUrl() {
  return businessConfig.viberUrl;
}

function applyConfig() {
  const hasInstagram = Boolean(businessConfig.instagramUrl);
  document.documentElement.classList.toggle("has-instagram", hasInstagram);

  document.querySelectorAll("[data-config]").forEach((element) => {
    const key = element.dataset.config;
    const valueMap = {
      name: businessConfig.name,
      address: businessConfig.address,
      schedule: businessConfig.schedule,
      phonePrimary: businessConfig.phones[0].label,
      phoneSecondary: businessConfig.phones[1].label
    };

    if (valueMap[key]) {
      element.textContent = valueMap[key];
    }
  });

  document.querySelectorAll("[data-phone-primary]").forEach((element) => {
    element.setAttribute("href", businessConfig.phones[0].href);
    if (!element.textContent.trim()) element.textContent = businessConfig.phones[0].label;
  });

  document.querySelectorAll("[data-phone-secondary]").forEach((element) => {
    element.setAttribute("href", businessConfig.phones[1].href);
    if (!element.textContent.trim()) element.textContent = businessConfig.phones[1].label;
  });

  document.querySelectorAll("[data-viber-link]").forEach((element) => {
    element.setAttribute("href", getViberUrl());
  });

  document.querySelectorAll("[data-map-link]").forEach((element) => {
    element.setAttribute("href", getMapsUrl());
  });

  document.querySelectorAll("[data-instagram-link]").forEach((element) => {
    const optionalWrapper = element.closest("[data-optional-instagram]");
    if (!hasInstagram) {
      element.hidden = true;
      if (optionalWrapper) optionalWrapper.hidden = true;
      return;
    }
    element.hidden = false;
    if (optionalWrapper) optionalWrapper.hidden = false;
    element.setAttribute("href", businessConfig.instagramUrl);
  });

  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });
}

function initReveal() {
  const elements = document.querySelectorAll(".reveal");
  if (!elements.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  elements.forEach((element) => observer.observe(element));
}

function initScrollTop() {
  const button = document.querySelector("[data-scroll-top]");
  if (!button) return;

  const toggle = () => {
    button.classList.toggle("is-visible", window.scrollY > 600);
  };

  button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", toggle, { passive: true });
  toggle();
}

document.addEventListener("DOMContentLoaded", () => {
  applyConfig();
  initNavigation();
  initFaq();
  initGallery();
  initReveal();
  initScrollTop();
});
