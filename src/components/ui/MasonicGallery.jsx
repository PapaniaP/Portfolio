import React from "react";
// Use the simpler Masonry component directly
import { Masonry } from "masonic";

// Component to render each individual gallery item
const GalleryItemCard = ({ data }) => {
  // Function to call the global lightbox opener
  const handleImageClick = () => {
    if (window.openGalleryLightbox) {
      // Check if the openGalleryLightbox function accepts 3 parameters by checking its length
      try {
        if (window.openGalleryLightbox.length === 3) {
          window.openGalleryLightbox(
            data.src,
            data.alt,
            data.description || data.alt
          );
        } else {
          // Fallback to the original version with 2 parameters
          window.openGalleryLightbox(data.src, data.alt);
        }
      } catch (e) {
        // If there's any error, use the most basic version
        window.openGalleryLightbox(data.src, data.alt);
      }
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
      {/* Overlay with caption on hover */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end justify-start p-4 opacity-0 group-hover:opacity-100">
        <div className="text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="font-medium text-sm md:text-base">
            {data.alt}
          </h3>
          {data.description && (
            <p className="text-xs md:text-sm text-white/80 mt-1 line-clamp-2">
              {data.description}
            </p>
          )}
        </div>
      </div>
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
