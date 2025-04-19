import React from "react";
// Use the simpler Masonry component directly
import { Masonry } from "masonic";

// Component to render each individual gallery item
const GalleryItemCard = ({ data }) => {
  // Function to call the global lightbox opener
  const handleImageClick = () => {
    if (window.openGalleryLightbox) {
      window.openGalleryLightbox(data.src, data.alt);
    }
  };

  return (
    <div
      className="relative group overflow-hidden rounded-lg bg-background shadow-md cursor-pointer"
      onClick={handleImageClick}
    >
      <img
        src={data.src}
        alt={data.alt}
        width={data.width} // Provide original width for aspect ratio
        height={data.height} // Provide original height for aspect ratio
        loading="lazy"
        className="block w-full h-auto transition-transform duration-300 group-hover:scale-105"
      />
      <div className="overlay absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
    </div>
  );
};

// Main gallery component using Masonic (Simplified)
const MasonicGallery = ({ items, gap = 12 }) => {
  return (
    <Masonry
      items={items}
      render={GalleryItemCard}
      columnGutter={gap}
      columnWidth={350}
      // overscanBy={5} // Optional: Adjust for smoother scrolling
      // You might need to wrap Masonry in a div with explicit width/height
      // if it doesn't automatically fill its container.
    />
  );
};

export default MasonicGallery;
