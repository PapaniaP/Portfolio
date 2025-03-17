// Configuration
const CONFIG = {
  BREAKPOINT: 900,
  PROFILES: {
    GITHUB: "https://github.com/PapaniaP",
    LINKEDIN: "https://www.linkedin.com/in/papaniap/",
  },
  TAGS: {
    JS: { FULL: "JavaScript", SHORT: "JS" },
    WP: { FULL: "WordPress", SHORT: "WP" },
  },
};

// Utility Functions
const openProfile = (profileUrl) => {
  try {
    window.open(profileUrl, "_blank");
  } catch (error) {
    console.error("Error opening profile:", error);
  }
};

const openProfileByIcon = (icon) => {
  try {
    if (icon.classList.contains("github-icon")) {
      openProfile(CONFIG.PROFILES.GITHUB);
    } else if (icon.classList.contains("linkedin-icon")) {
      openProfile(CONFIG.PROFILES.LINKEDIN);
    }
  } catch (error) {
    console.error("Error in profile icon handler:", error);
  }
};

// Content Adjustment Functions
const adjustContent = (
  className,
  contentAbove900px,
  contentBelow900px
) => {
  try {
    const screenWidth = window.innerWidth;
    const elements = document.getElementsByClassName(className);

    Array.from(elements).forEach((element) => {
      element.textContent =
        screenWidth < CONFIG.BREAKPOINT
          ? contentBelow900px
          : contentAbove900px;
    });
  } catch (error) {
    console.error("Error adjusting content:", error);
  }
};

// Mobile Menu Functions
const handleMobileMenu = (isOpening) => {
  try {
    const menu = document.getElementById("menu");
    const burgerLines = document.querySelectorAll(
      ".burger-line, .burger-line-home"
    );

    menu.classList.toggle("open", isOpening);

    burgerLines.forEach((line, index) => {
      const transform = isOpening
        ? index === 0
          ? "translateY(9px) rotate(45deg)"
          : index === 1
          ? "none"
          : "translateY(-9px) rotate(-45deg)"
        : "translateY(0) rotate(0)";

      line.style.transform = transform;
      line.style.opacity = index === 1 && isOpening ? "0" : "1";
    });
  } catch (error) {
    console.error("Error handling mobile menu:", error);
  }
};

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  try {
    // Profile Icons
    const profileIcons = document.querySelectorAll(".profile-link");
    profileIcons.forEach((icon) => {
      icon.addEventListener("click", () => openProfileByIcon(icon));
    });

    // Initial Content Adjustment
    adjustContent(
      "tag-js",
      CONFIG.TAGS.JS.FULL,
      CONFIG.TAGS.JS.SHORT
    );
    adjustContent(
      "tag-wp",
      CONFIG.TAGS.WP.FULL,
      CONFIG.TAGS.WP.SHORT
    );

    // Resize Handler
    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        adjustContent(
          "tag-js",
          CONFIG.TAGS.JS.FULL,
          CONFIG.TAGS.JS.SHORT
        );
        adjustContent(
          "tag-wp",
          CONFIG.TAGS.WP.FULL,
          CONFIG.TAGS.WP.SHORT
        );
      }, 250); // Debounce resize events
    });

    // Mobile Menu
    const burgerButton = document.getElementById("burger-button");
    let isMenuOpen = false;

    if (burgerButton) {
      burgerButton.addEventListener("click", () => {
        isMenuOpen = !isMenuOpen;
        handleMobileMenu(isMenuOpen);
      });
    }
  } catch (error) {
    console.error("Error in initialization:", error);
  }
});
