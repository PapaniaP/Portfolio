import React, { useEffect, useState } from "react";

// Lazy load Masonic to ensure it only runs on client
const MasonryGallery = ({ items, gap }) => {
  const [Masonry, setMasonry] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Only import Masonic on the client side
    import("masonic").then((module) => {
      setMasonry(() => module.Masonry);
      setIsClient(true);
    });
  }, []);

  if (!isClient || !Masonry) {
    // Return a simple grid fallback while loading
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <GalleryItemCard
            key={index}
            data={item}
          />
        ))}
      </div>
    );
  }

  return (
    <Masonry
      items={items}
      render={GalleryItemCard}
      columnGutter={gap}
      columnWidth={350}
    />
  );
};

// Component to render each individual gallery item
const GalleryItemCard = ({ data }) => {
  const handleImageClick = () => {
    if (window.openGalleryLightbox) {
      window.openGalleryLightbox(data.src, data.alt);
    }
  };

  return (
    <div
      className="relative group overflow-hidden rounded-xl bg-surface/50 border border-border-primary/50 shadow-card-light hover:shadow-card-hover transition-all duration-300 cursor-pointer"
      onClick={handleImageClick}
    >
      <div className="p-4">
        <div className="rounded-lg overflow-hidden">
          <img
            src={data.src}
            alt={data.alt}
            width={data.width}
            height={data.height}
            loading="lazy"
            className="block w-full h-auto transition-transform duration-300 group-hover:scale-102"
          />
        </div>
        {data.caption && (
          <figcaption className="text-sm text-text-secondary mt-4">
            {data.caption}
          </figcaption>
        )}
      </div>
    </div>
  );
};

// Main gallery component
const CaseStudyGallery = ({ items, gap = 24 }) => {
  return (
    <MasonryGallery
      items={items}
      gap={gap}
    />
  );
};

export default CaseStudyGallery;
