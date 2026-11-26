"use strict";

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-link");
const form = document.querySelector("#contact-form");
const feedback = document.querySelector("#form-feedback");

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation menu" : "Close navigation menu");
  navLinks.classList.toggle("is-open", !isExpanded);
});

navItems.forEach((link) => {
  link.addEventListener("click", () => {
    navItems.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    navLinks.classList.remove("is-open");
  });
});

const sections = document.querySelectorAll("main section[id]");
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navItems.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: "-30% 0px -60% 0px" });
  sections.forEach((section) => sectionObserver.observe(section));

  const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const progress = entry.target.dataset.progress;
      entry.target.style.setProperty("--progress", `${progress}%`);
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.3 });
  document.querySelectorAll(".skill").forEach((skill) => skillObserver.observe(skill));
} else {
  document.querySelectorAll(".skill").forEach((skill) => {
    skill.style.setProperty("--progress", `${skill.dataset.progress}%`);
    skill.classList.add("is-visible");
  });
}

document.querySelector("#current-year").textContent = new Date().getFullYear();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  feedback.classList.remove("error");

  if (!form.reportValidity()) return;

  feedback.textContent = "Thanks for your note! This demo form is ready to connect to an email service.";
  form.reset();
});
