import { useState, useEffect } from "react";

export default function MobileTableOfContents({ sections }) {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY + window.innerHeight / 3;

      // Find which section we're currently viewing
      const sectionElements = sections
        .map((section) => ({
          id: section.id,
          element: document.getElementById(section.id),
        }))
        .filter((item) => item.element);

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const { id, element } = sectionElements[i];
        if (element) {
          const offsetTop = element.offsetTop;
          if (currentPosition >= offsetTop) {
            setActiveSection(id);
            break;
          }
        }
      }

      // If we're at the very top and no section is found, use the first one
      if (window.scrollY < 100 && sectionElements.length > 0) {
        setActiveSection(sectionElements[0].id);
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
    <div className="lg:hidden container mx-auto px-4 md:px-8 mt-10 mb-16">
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Table of Contents
        </h3>
        <ul className="space-y-3">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={`flex items-center text-gray-300 hover:text-primary transition-colors ${
                  activeSection === section.id ? "text-primary" : ""
                }`}
                onClick={(e) => handleClick(e, section.id)}
              >
                <div
                  className={`w-3 h-3 bg-gray-900 border ${
                    activeSection === section.id
                      ? "border-primary/50"
                      : "border-gray-700/50"
                  } rounded-full flex items-center justify-center mr-3`}
                >
                  <div
                    className={`${
                      activeSection === section.id
                        ? "w-1.5 h-1.5 bg-primary"
                        : "w-1 h-1 bg-gray-400"
                    } rounded-full`}
                  ></div>
                </div>
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
