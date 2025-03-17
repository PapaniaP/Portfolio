// Navigation
const initNavigation = () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isExpanded =
        menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", !isExpanded);
      navLinks.classList.toggle("active");
    });
  }
};

// Smooth Scrolling
const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(
        anchor.getAttribute("href")
      );
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
};

// Intersection Observer for animations
const initIntersectionObserver = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px",
    }
  );

  document
    .querySelectorAll(".animate")
    .forEach((el) => observer.observe(el));
};

// Dark mode toggle (if implemented)
const initDarkMode = () => {
  const prefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  );
  const toggleDarkMode = (e) => {
    document.documentElement.classList.toggle("dark", e.matches);
  };

  prefersDark.addEventListener("change", toggleDarkMode);
  toggleDarkMode(prefersDark);
};

// Initialize everything
const init = () => {
  initNavigation();
  initSmoothScroll();
  initIntersectionObserver();
  initDarkMode();
};

// Run initialization when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

// Export for potential use in other modules
export {
  initNavigation,
  initSmoothScroll,
  initIntersectionObserver,
  initDarkMode,
};
