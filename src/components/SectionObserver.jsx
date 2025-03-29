import { useEffect } from "react";

export default function SectionObserver() {
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Remove active class from all sections
          sections.forEach((s) =>
            s.classList.remove("section-active")
          );

          // Add active class to current section
          entry.target.classList.add("section-active");

          // Update the navigation dot if using SectionGuide
          const sectionId = entry.target.id;
          const navigationDots = document.querySelectorAll(
            `.fixed.z-50.lg\\:flex.flex-col a[href^="#"]`
          );

          navigationDots.forEach((dot) => {
            const dotHref = dot.getAttribute("href");
            const dotSectionId = dotHref ? dotHref.substring(1) : "";

            const innerDot = dot.querySelector("div > div");
            const outerDot = dot.querySelector("div");

            if (dotSectionId === sectionId) {
              // Active state
              innerDot?.classList.remove(
                "w-1.5",
                "h-1.5",
                "bg-gray-400"
              );
              innerDot?.classList.add("w-2.5", "h-2.5", "bg-primary");
              outerDot?.classList.remove("border-gray-700/50");
              outerDot?.classList.add("border-primary/50");
            } else {
              // Inactive state - only change if not being hovered
              if (!dot.matches(":hover")) {
                innerDot?.classList.remove(
                  "w-2.5",
                  "h-2.5",
                  "bg-primary"
                );
                innerDot?.classList.add(
                  "w-1.5",
                  "h-1.5",
                  "bg-gray-400"
                );
                outerDot?.classList.remove("border-primary/50");
                outerDot?.classList.add("border-gray-700/50");
              }
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((section) => {
      observer.observe(section);
    });

    // Cleanup function
    return () => {
      observer.disconnect();
    };
  }, []);

  // This component doesn't render any visible UI
  return null;
}
