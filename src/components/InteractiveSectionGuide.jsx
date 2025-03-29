import { useState, useEffect } from "react";

export default function InteractiveSectionGuide({
  sections,
  position = "left",
  showLabels = true,
}) {
  const [activeSection, setActiveSection] = useState("");
  const [hoveredSection, setHoveredSection] = useState(null);

  // Position styles
  const positionClasses =
    position === "left" ? "left-6 items-start" : "right-6 items-end";

  // Connection line between dots
  const lineConnectorClasses =
    position === "left" ? "left-2.5 ml-px" : "right-2.5 mr-px";

  // Label position
  const labelClasses = position === "left" ? "left-8" : "right-8";

  useEffect(() => {
    const handleScroll = () => {
      const viewportMiddle = window.scrollY + window.innerHeight / 2;
      let closestSection = null;
      let closestDistance = Infinity;

      // Find which section we're currently viewing
      const sectionElements = sections
        .map((section) => ({
          id: section.id,
          element: document.getElementById(section.id),
        }))
        .filter((item) => item.element);

      // Find closest section to middle of viewport
      sectionElements.forEach(({ id, element }) => {
        if (element) {
          const sectionTop = element.offsetTop;
          const sectionHeight = element.offsetHeight;
          const sectionMiddle = sectionTop + sectionHeight / 2;
          const distance = Math.abs(viewportMiddle - sectionMiddle);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestSection = id;
          }
        }
      });

      // If we're at the very top, use the first section
      if (window.scrollY < 100 && sectionElements.length > 0) {
        closestSection = sectionElements[0].id;
      }

      // If we're at the very bottom, use the last section
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        sectionElements.length > 0
      ) {
        closestSection =
          sectionElements[sectionElements.length - 1].id;
      }

      if (closestSection) {
        setActiveSection(closestSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Set initial active section

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sections]);

  const handleClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
      setActiveSection(id);
    }
  };

  return (
    <div
      className={`fixed ${positionClasses} top-1/2 transform -translate-y-1/2 z-50 hidden lg:flex flex-col`}
    >
      <div className="relative flex flex-col items-center space-y-8">
        {/* Vertical connector line */}
        <div
          className={`absolute ${lineConnectorClasses} top-5 bottom-5 w-px bg-gray-700/30`}
        ></div>

        {sections.map((section) => {
          const isActive = section.id === activeSection;
          const isHovered = section.id === hoveredSection;

          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="group relative z-10"
              onClick={(e) => handleClick(e, section.id)}
              onMouseEnter={() => setHoveredSection(section.id)}
              onMouseLeave={() => setHoveredSection(null)}
            >
              <div
                className={`w-5 h-5 bg-gray-900 border ${
                  isActive || isHovered
                    ? "border-primary/50"
                    : "border-gray-700/50"
                } rounded-full flex items-center justify-center transition-colors duration-300`}
              >
                <div
                  className={`${
                    isActive || isHovered
                      ? "w-2.5 h-2.5 bg-primary"
                      : "w-1.5 h-1.5 bg-gray-400"
                  } rounded-full transition-all duration-300`}
                ></div>
              </div>
              {showLabels && (
                <span
                  className={`absolute ${labelClasses} top-0 ${
                    position === "left"
                      ? isHovered
                        ? "opacity-100"
                        : "opacity-0"
                      : ""
                  } transition-opacity duration-300 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap`}
                >
                  {section.title}
                </span>
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
}
