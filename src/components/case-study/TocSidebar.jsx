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
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="hidden lg:block sticky top-24 w-64 pr-8"
    >
      <nav className="space-y-2">
        {sections.map((section) => (
          <div className="relative" key={section.id}>
            {section.id === activeId && (
              <motion.span
                layoutId="toc-active"
                className="absolute left-0 top-0 h-full w-1 bg-primary rounded"
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            )}
            <motion.a
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
          </div>
        ))}
      </nav>
    </motion.aside>
  );
}
