import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function InteractiveSectionGuide({
  sections,
  position = "left",
  showLabels = true,
  title = "Table of Contents",
}) {
  const [activeSection, setActiveSection] = useState("");
  const [hoveredSection, setHoveredSection] = useState(null);
  const [showMobileTOC, setShowMobileTOC] = useState(false);

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
      const viewportMiddle = window.scrollY + window.innerHeight / 3; // Use top third instead of middle
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
        top: element.offsetTop - 100, // Offset to account for sticky header
        behavior: "smooth",
      });
      setActiveSection(id);
    }

    // Close mobile TOC if it's open
    if (showMobileTOC) {
      setShowMobileTOC(false);
    }
  };

  // Mobile TOC toggle
  const toggleMobileTOC = () => {
    setShowMobileTOC(!showMobileTOC);
  };

  return (
    <>
      {/* Desktop TOC */}
      <div
        className={`fixed ${positionClasses} top-1/3 transform -translate-y-1/2 z-50 hidden lg:flex flex-col`}
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
                  <AnimatePresence>
                    {isHovered && (
                      <motion.span
                        initial={{
                          opacity: 0,
                          x: position === "left" ? -10 : 10,
                        }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{
                          opacity: 0,
                          x: position === "left" ? -10 : 10,
                        }}
                        transition={{ duration: 0.2 }}
                        className={`absolute ${labelClasses} top-0 whitespace-nowrap bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md`}
                      >
                        {section.title}
                      </motion.span>
                    )}
                  </AnimatePresence>
                )}
              </a>
            );
          })}
        </div>
      </div>

      {/* Mobile TOC Button */}
      <div className="fixed bottom-6 right-6 z-50 lg:hidden">
        <button
          onClick={toggleMobileTOC}
          className="bg-gray-800/90 backdrop-blur-sm text-white rounded-full p-3 shadow-lg border border-gray-700/50 flex items-center justify-center"
          aria-label="Toggle table of contents"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Mobile TOC Menu */}
        <AnimatePresence>
          {showMobileTOC && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-16 right-0 bg-gray-800/95 backdrop-blur-md border border-gray-700/50 rounded-xl shadow-xl w-64 overflow-hidden"
            >
              <div className="p-4 border-b border-gray-700/50">
                <h3 className="text-white font-medium">{title}</h3>
              </div>
              <div className="max-h-[60vh] overflow-y-auto p-2">
                <ul className="space-y-1">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        onClick={(e) => handleClick(e, section.id)}
                        className={`block px-4 py-2 rounded-lg text-sm ${
                          section.id === activeSection
                            ? "bg-primary/10 text-primary"
                            : "text-gray-300 hover:bg-gray-700/40"
                        }`}
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
