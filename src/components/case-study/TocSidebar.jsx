import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function TocSidebar({ sections }) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const handleClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100, // Offset for header
        behavior: "smooth",
      });
    }
  };

  return (
    <aside className="hidden lg:block sticky top-24 w-64 pr-8">
      <nav className="space-y-2">
        {sections.map((section) => (
          <motion.a
            key={section.id}
            href={`#${section.id}`}
            onClick={(e) => handleClick(e, section.id)}
            className={`block text-sm transition-colors hover:text-primary ${
              section.id === activeId
                ? "text-primary font-semibold"
                : "text-gray-400"
            }`}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            {section.title}
          </motion.a>
        ))}
      </nav>
    </aside>
  );
}
