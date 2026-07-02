// ============================================================
// Carousel — Hero banner slider
// ============================================================
import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  { id: 1, title: 'Biggest Sale of the Year!', subtitle: 'Up to 70% off on Electronics', cta: 'Shop Now', link: '/category/electronics', color: 'from-orange-500 to-red-500', emoji: '⚡' },
  { id: 2, title: 'New Fashion Collection', subtitle: 'Eid Special — Lawn Suits from Rs. 999', cta: 'Explore', link: '/category/fashion', color: 'from-purple-500 to-pink-500', emoji: '👗' },
  { id: 3, title: 'Home Makeover Sale', subtitle: 'Upgrade your home with best deals', cta: 'Discover', link: '/category/home-living', color: 'from-teal-500 to-cyan-500', emoji: '🏠' },
  { id: 4, title: 'Sports & Fitness Fest', subtitle: 'Get fit with up to 50% off', cta: 'Get Active', link: '/category/sports', color: 'from-green-500 to-emerald-600', emoji: '💪' },
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => setCurrent(c => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent(c => (c - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next, isPaused]);

  return (
    <div
      className="relative overflow-hidden rounded-lg bg-gray-100"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative h-48 sm:h-64 md:h-80 lg:h-96">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${idx === current ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            <div className={`w-full h-full bg-gradient-to-r ${slide.color} flex items-center`}>
              <div className="max-w-7xl mx-auto px-6 sm:px-12 w-full flex items-center justify-between">
                <div className="text-white space-y-2 sm:space-y-4 max-w-lg">
                  <span className="text-3xl sm:text-5xl">{slide.emoji}</span>
                  <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold leading-tight">{slide.title}</h2>
                  <p className="text-sm sm:text-lg opacity-90">{slide.subtitle}</p>
                  <a href={slide.link} className="inline-block bg-white text-gray-900 px-5 py-2 sm:px-6 sm:py-2.5 rounded-full font-semibold text-sm hover:bg-gray-100 transition shadow-lg">
                    {slide.cta}
                  </a>
                </div>
                <div className="hidden md:block text-[100px] lg:text-[140px] opacity-30">{slide.emoji}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 shadow transition">
        <ChevronLeft size={20} />
      </button>
      <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 shadow transition">
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all ${idx === current ? 'bg-white scale-125 shadow' : 'bg-white/50 hover:bg-white/80'}`}
          />
        ))}
      </div>
    </div>
  );
}
