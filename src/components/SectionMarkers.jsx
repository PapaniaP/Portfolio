import { useEffect } from "react";

export default function SectionMarkers() {
  useEffect(() => {
    // Find all section headings (assuming h2 elements are used for section headings)
    const sectionHeadings = document.querySelectorAll("h2[id]");

    sectionHeadings.forEach((heading) => {
      // Create the marker element
      const marker = document.createElement("div");
      marker.className = "section-marker";
      marker.innerHTML = `
        <div class="absolute -left-12 top-2 w-5 h-5 bg-gray-900 border border-gray-700/50 rounded-full flex items-center justify-center">
          <div class="w-1.5 h-1.5 bg-primary rounded-full"></div>
        </div>
      `;

      // Make parent position relative if it's not already
      const parent = heading.parentElement;
      if (parent) {
        if (getComputedStyle(parent).position === "static") {
          parent.style.position = "relative";
        }

        // Insert the marker before the heading
        parent.insertBefore(marker, heading);
      }
    });
  }, []);

  // This component doesn't render any visible UI
  return null;
}
