import React from "react";
// Use the simpler Masonry component directly
import { Masonry } from "masonic";

// React version of Tag component to match our Astro Tag component
const Tag = ({ text, variant = "primary" }) => {
  // Define tailwind classes based on variants
  const variantClasses = {
    default:
      "bg-surface-accent text-text-secondary border-border-secondary",
    primary:
      "bg-brand-primary/10 text-brand-primary border-brand-primary/20",
    secondary:
      "bg-brand-secondary/10 text-brand-secondary border-brand-secondary/20",
    success: "bg-green-100 text-green-800 border-green-200",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
    danger: "bg-red-100 text-red-800 border-red-200",
    surface:
      "bg-surface/90 backdrop-blur-sm text-text-secondary border-border-primary/50",
  };

  return (
    <span
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-full text-xs px-3 py-1 font-medium border transition-colors ${variantClasses[variant]}`}
    >
      {text}
    </span>
  );
};

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

  // Extract tags from data if they exist
  const tags = data.tags || [];
  const category = data.category || null;

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

      {/* Overlay with caption and tags on hover */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-300 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100">
        {/* Category tag if provided */}
        {category && (
          <div className="mb-2">
            <Tag
              text={category}
              variant="secondary"
            />
          </div>
        )}

        <div className="text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="font-medium text-sm md:text-base">
            {data.alt}
          </h3>

          {data.description && (
            <p className="text-xs md:text-sm text-white/80 mt-1 line-clamp-2 mb-2">
              {data.description}
            </p>
          )}

          {/* Show tags if available */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.slice(0, 3).map((tag, index) => (
                <Tag
                  key={index}
                  text={tag}
                  variant="surface"
                />
              ))}
              {tags.length > 3 && (
                <span className="text-xs text-white/70">
                  +{tags.length - 3} more
                </span>
              )}
            </div>
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
