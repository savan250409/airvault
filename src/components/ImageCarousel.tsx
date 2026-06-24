import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageCarouselProps {
  images: string[];
  alt?: string;
  className?: string;   // sizing for the outer box, e.g. "h-72 w-full rounded-xl"
  interval?: number;    // auto-advance delay in ms
}

// Auto-scrolling image slider. Shows a single static image when given one,
// nothing when given none. Advances automatically and pauses on hover.
const ImageCarousel = ({ images, alt = "", className = "", interval = 3000 }: ImageCarouselProps) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = images.length;

  useEffect(() => {
    if (count <= 1 || paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), interval);
    return () => clearInterval(id);
  }, [count, paused, interval]);

  useEffect(() => {
    if (index > count - 1) setIndex(0);
  }, [count, index]);

  if (count === 0) return null;

  const go = (dir: number) => setIndex((i) => (i + dir + count) % count);

  return (
    <div
      className={`relative overflow-hidden group ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="flex h-full w-full transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={alt}
            className="w-full h-full object-cover flex-shrink-0"
          />
        ))}
      </div>

      {count > 1 && (
        <>
          {/* Arrows */}
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to image ${i + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition ${i === index ? "bg-white" : "bg-white/50 hover:bg-white/80"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageCarousel;
