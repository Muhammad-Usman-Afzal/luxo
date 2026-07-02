// ============================================================
// Home Page — Fully Responsive Premium Design | BazaarHub
// ============================================================
import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Flame, Truck, Shield, RotateCcw, ChevronLeft, ChevronRight, Sparkles, TrendingUp } from 'lucide-react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';
import { categories } from '../data/mockData';

const mainCategories = categories.filter(c => c.parentId === null);

const heroSlides = [
  { id: 1, tag: 'Tech Fest', title: 'Biggest Tech Fest', subtitle: 'Up to 70% off on Premium Electronics', cta: 'Grab Deal', link: '/category/electronics', bg: 'from-indigo-900 via-violet-800 to-purple-900', overlay: 'from-black/55 via-black/25 to-transparent', img: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1400&h=600&fit=crop&auto=format&q=80' },
  { id: 2, tag: 'New Arrival', title: 'Eid Collection 2026', subtitle: 'Stunning lawn suits starting from Rs. 999', cta: 'Explore Now', link: '/category/fashion', bg: 'from-rose-700 via-pink-700 to-fuchsia-800', overlay: 'from-black/55 via-black/20 to-transparent', img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&h=600&fit=crop&auto=format&q=80' },
  { id: 3, tag: 'Home Makeover', title: 'Upgrade Your Space', subtitle: 'Premium furniture & decor at unbeatable prices', cta: 'Shop Home', link: '/category/home-living', bg: 'from-emerald-700 via-teal-700 to-cyan-800', overlay: 'from-black/55 via-black/25 to-transparent', img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1400&h=600&fit=crop&auto=format&q=80' },
  { id: 4, tag: 'Style Fest', title: 'Fashionista Paradise', subtitle: 'Trendy outfits & accessories up to 60% off', cta: 'Shop Fashion', link: '/category/fashion', bg: 'from-amber-600 via-orange-600 to-red-700', overlay: 'from-black/55 via-black/20 to-transparent', img: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1400&h=600&fit=crop&auto=format&q=80' },
];

type Brand = { name: string; accent: string; logo: string };

const brands: Brand[] = [
  { name: 'Samsung', accent: '#1428A0', logo: 'SAMSUNG' },
  { name: 'Apple', accent: '#555555', logo: 'APPLE' },
  { name: 'Nike', accent: '#EA580C', logo: 'NIKE' },
  { name: 'Sony', accent: '#2563EB', logo: 'SONY' },
  { name: 'Dyson', accent: '#7C3AED', logo: 'dyson' },
  { name: "Levi's", accent: '#C41230', logo: 'LEVI\'S' },
  { name: 'Khaadi', accent: '#059669', logo: 'KHAADI' },
  { name: 'Gul Ahmed', accent: '#B71C1C', logo: 'GUL AHMED' },
  { name: 'Casio', accent: '#002B5C', logo: 'CASIO' },
  { name: 'Maybelline', accent: '#E6007E', logo: 'MAYBELLINE' },
  { name: "L'Oreal", accent: '#7C3AED', logo: 'L\'ORÉAL' },
  { name: 'Dell', accent: '#007DB8', logo: 'DELL' },
];

const trustBadges = [
  { icon: Truck, title: 'Free Shipping', desc: 'On orders above Rs. 5,000' },
  { icon: Shield, title: 'Secure Payment', desc: '100% protected transactions' },
  { icon: RotateCcw, title: 'Easy Returns', desc: '7 days hassle-free return' },
  { icon: Sparkles, title: 'Authentic', desc: '100% genuine guarantee' },
];

// ─── Hero Carousel (Real Premium Images — Auto Changing) ───
function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [imgLoaded, setImgLoaded] = useState<Record<number, boolean>>({});
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  const next = useCallback(() => setCurrent(c => (c + 1) % heroSlides.length), []);
  const prev = useCallback(() => setCurrent(c => (c - 1 + heroSlides.length) % heroSlides.length), []);

  useEffect(() => {
    if (isPaused) return;
    const id = window.setInterval(next, 4500);
    timerRef.current = id;
    return () => window.clearInterval(id);
  }, [next, isPaused]);

  // Preload all images
  useEffect(() => {
    heroSlides.forEach(slide => {
      const img = new Image();
      img.onload = () => setImgLoaded(prev => ({ ...prev, [slide.id]: true }));
      img.src = slide.img;
    });
  }, []);

  return (
    <div
      className="relative overflow-hidden rounded-[16px] sm:rounded-[28px] shadow-2xl shadow-gray-300/40 dark:shadow-black/60 select-none group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative h-[180px] sm:h-[260px] md:h-[300px] lg:h-[340px] xl:h-[380px]">
        {heroSlides.map((slide, idx) => {
          const isActive = idx === current;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
            >
              {/* BG Image + Gradient Fallback */}
              <div className={`absolute inset-0 bg-gradient-to-br ${slide.bg}`}>
                {!imgLoaded[slide.id] && (
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse" />
                )}
                <img
                  src={slide.img}
                  alt={slide.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${imgLoaded[slide.id] ? 'opacity-100' : 'opacity-0'}`}
                />
                {/* Dark overlay for text readability */}
                <div className={`absolute inset-0 bg-gradient-to-r ${slide.overlay}`} />
              </div>

              {/* Content */}
              <div className="relative h-full max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center">
                <div className="max-w-lg sm:max-w-xl text-white">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 backdrop-blur-lg border border-white/25 rounded-full text-[10px] sm:text-xs font-bold mb-4 sm:mb-5 tracking-[0.15em] uppercase shadow-lg">
                    <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
                    {slide.tag}
                  </span>
                  <h2 className="text-[26px] sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] mb-3 sm:mb-4 tracking-tight" style={{ textShadow: '0 4px 60px rgba(0,0,0,0.5)' }}>
                    {slide.title}
                  </h2>
                  <p className="text-sm sm:text-lg md:text-xl text-white/85 mb-5 sm:mb-7 max-w-md leading-relaxed font-medium">
                    {slide.subtitle}
                  </p>
                  <Link
                    to={slide.link}
                    className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 sm:px-8 py-3 sm:py-3.5 rounded-2xl font-bold text-xs sm:text-base hover:bg-gray-100 transition-all hover:scale-105 shadow-2xl shadow-black/40 active:scale-95"
                  >
                    {slide.cta} <ArrowRight size={18} className="sm:w-5 sm:h-5" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-black/30 hover:bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all hover:scale-110 opacity-0 group-hover:opacity-100 border border-white/20"
      >
        <ChevronLeft size={20} className="sm:w-[22px] sm:h-[22px]" />
      </button>
      <button
        onClick={next}
        className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-black/30 hover:bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all hover:scale-110 opacity-0 group-hover:opacity-100 border border-white/20"
      >
        <ChevronRight size={20} className="sm:w-[22px] sm:h-[22px]" />
      </button>

      {/* Dots + Progress */}
      <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 flex items-center justify-center gap-1.5 sm:gap-2">
        {heroSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`transition-all rounded-full ${
              idx === current
                ? 'w-8 sm:w-10 h-2 sm:h-2.5 bg-white shadow-lg'
                : 'w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute top-4 sm:top-6 right-4 sm:right-6 bg-black/30 backdrop-blur-md text-white text-[10px] sm:text-xs px-3 py-1 rounded-full border border-white/20 font-medium">
        {current + 1} / {heroSlides.length}
      </div>
    </div>
  );
}

// ─── Flash Sale Countdown ───
function FlashSaleBar() {
  const [time, setTime] = useState({ h: 5, m: 32, s: 17 });

  useEffect(() => {
    const t = setInterval(() => {
      setTime(prev => {
        let { h, m, s } = prev;
        if (s > 0) s--;
        else { s = 59; if (m > 0) m--; else { m = 59; if (h > 0) h--; } }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative overflow-hidden rounded-[20px] sm:rounded-2xl p-2.5 sm:p-3 flex flex-col sm:flex-row items-center justify-between gap-2 shadow-lg bg-white dark:bg-gray-950 border border-red-100 dark:border-gray-800">
      {/* Background glow — always dark for dramatic Flash Sale feel */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-red-100 dark:bg-red-500/15 rounded-full blur-[80px] animate-pulse" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-amber-50 dark:bg-amber-500/8 rounded-full blur-[80px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-50 dark:bg-indigo-500/5 rounded-full blur-[120px]" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      </div>

      {/* Left: Flash icon + text */}
      <div className="relative z-10 flex items-center gap-3 sm:gap-4 shrink-0">
        <div className="relative">
          <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center shadow-md shadow-red-500/30">
            <Flame size={20} className="text-white sm:w-[22px] sm:h-[22px] drop-shadow-lg" />
          </div>
          
        </div>
        <div>
          <div className="flex items-center gap-1.5 mb-0.5">
            <h3 className="text-gray-900 dark:text-white font-black text-sm sm:text-base tracking-tight">Flash Sale</h3>
            <span className="inline-flex items-center gap-1 bg-red-500 text-white dark:bg-red-500/20 dark:text-red-400 text-[8px] sm:text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-red-500 dark:border-red-500/30">
              <span className="w-1 h-1 bg-white dark:bg-red-400 rounded-full animate-pulse" />
              LIVE
            </span>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-[9px] sm:text-[10px] font-medium hidden sm:block">Grab before they're gone!</p>
        </div>
      </div>

      {/* Right: Countdown + CTA */}
      <div className="relative z-10 flex items-center gap-1.5 sm:gap-2">
        {[
          { label: 'HRS', val: time.h },
          { label: 'MIN', val: time.m },
          { label: 'SEC', val: time.s },
        ].map((item, i) => (
          <div key={item.label} className="flex items-center gap-1.5 sm:gap-2">
            {i > 0 && <span className="text-gray-300 dark:text-gray-600 font-black text-sm sm:text-base select-none">:</span>}
            <div className="text-center">
              <div className="relative w-10 h-9 sm:w-12 sm:h-11 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl flex items-center justify-center text-sm sm:text-lg font-mono font-black text-gray-900 dark:text-white tracking-widest select-none shadow-inner">
                {String(item.val).padStart(2, '0')}
              </div>
              <span className="text-[7px] sm:text-[8px] text-gray-400 dark:text-gray-500 font-bold tracking-[0.15em] mt-0.5 block uppercase">{item.label}</span>
            </div>
          </div>
        ))}
        <Link
          to="/products"
          className="ml-1 sm:ml-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-bold text-[10px] sm:text-xs transition-all hover:scale-105 shadow-lg shadow-red-500/30 active:scale-95 whitespace-nowrap flex items-center gap-1.5"
        >
          Shop Now <ArrowRight size={14} className="sm:w-4 sm:h-4" />
        </Link>
      </div>
    </section>
  );
}

// ─── Category Showcase ───
function CategoryShowcase() {
  return (
    <section>
      <div className="flex items-end justify-between mb-4 sm:mb-6">
        <div>
          <span className="text-[10px] sm:text-xs font-bold text-indigo-600 uppercase tracking-[0.15em]">Categories</span>
          <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mt-0.5">Shop by Category</h2>
        </div>
        <Link to="/products" className="hidden sm:flex items-center gap-1 text-indigo-600 text-sm font-semibold hover:text-indigo-700 transition">
          Browse All <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 lg:gap-4">
        {mainCategories.map(cat => (
          <Link
            key={cat.id}
            to={`/category/${cat.slug}`}
            className="group relative flex flex-col items-center p-3 sm:p-4 lg:p-4 bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-lg hover:shadow-indigo-100/50 dark:hover:shadow-indigo-900/30 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="w-11 h-11 sm:w-14 sm:h-14 lg:w-14 lg:h-14 xl:w-16 xl:h-16 rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 group-hover:from-indigo-100 group-hover:to-violet-200 flex items-center justify-center mb-2 sm:mb-3 lg:mb-2 transition-all duration-300">
              <span className="text-xl sm:text-2xl lg:text-2xl xl:text-3xl">{cat.icon}</span>
            </div>
            <span className="text-[10px] sm:text-sm lg:text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-indigo-700 dark:group-hover:text-indigo-400 text-center leading-tight transition-colors">
              {cat.name}
            </span>
            <span className="text-[9px] sm:text-xs lg:text-xs text-gray-400 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">Shop Now →</span>
          </Link>
        ))}
      </div>

      <Link to="/products" className="sm:hidden flex items-center justify-center gap-1 text-indigo-600 text-sm font-semibold py-3 mt-1">
        Browse All Categories <ArrowRight size={16} />
      </Link>
    </section>
  );
}

// ─── Section Header ───
function SectionHeader({ icon, title, subtitle, link }: { icon: React.ReactNode; title: string; subtitle?: string; link?: string }) {
  return (
    <div className="flex items-end justify-between mb-4 sm:mb-6">
      <div>
        <div className="flex items-center gap-2 mb-0.5">
          {icon}
          <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">{title}</h2>
        </div>
        {subtitle && <p className="text-[11px] sm:text-sm text-gray-500 dark:text-gray-400 ml-7 sm:ml-8">{subtitle}</p>}
      </div>
      {link && (
        <Link to={link} className="hidden sm:flex items-center gap-1 text-indigo-600 text-sm font-semibold hover:text-indigo-700 transition shrink-0">
          View All <ArrowRight size={16} />
        </Link>
      )}
    </div>
  );
}

// ─── Deal of the Day ───
// ─── Brand Strip ───
function BrandStrip() {
  const [showAll, setShowAll] = useState(false);
  const visibleBrands = showAll ? brands : brands.slice(0, 6);
  return (
    <section id="brands">
      <div className="flex items-end justify-between mb-3 sm:mb-5">
        <div>
          <span className="text-[10px] sm:text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.15em]">Premium Brands</span>
          <h2 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white mt-0.5">Top Brands</h2>
        </div>
        {brands.length > 6 && (
          <button onClick={() => setShowAll(!showAll)} className="text-[11px] sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 shrink-0">
            {showAll ? 'Show Less' : `See All (${brands.length})`}
          </button>
        )}
      </div>
      {/* Horizontal scroll on mobile, grid on desktop */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 sm:grid-cols-6">
        {visibleBrands.map(brand => (
          <Link
            key={brand.name}
            to={`/search?q=${encodeURIComponent(brand.name)}`}
            className="flex-shrink-0 w-full group"
          >
            <div className={`h-12 sm:h-14 md:h-16 bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-sm border border-gray-100 dark:border-gray-700 group-hover:shadow-md group-hover:border-indigo-200 dark:group-hover:border-indigo-600 transition-all duration-300 relative overflow-hidden`}>
              <span className="relative text-gray-800 dark:text-gray-200 font-extrabold text-[9px] sm:text-[11px] md:text-xs tracking-[0.08em] text-center leading-none px-1.5 select-none group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {brand.logo}
              </span>
              <div className="absolute bottom-0 left-0 right-0 h-[3px] rounded-b-xl" style={{ backgroundColor: brand.accent }} />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

// ─── Trust Badges ───
function TrustBadges() {
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
      {trustBadges.map(badge => {
        const Icon = badge.icon;
        return (
          <div key={badge.title} className="flex items-center gap-2 sm:gap-3 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-3 sm:p-4 hover:shadow-lg dark:hover:shadow-gray-900/50 transition-shadow">
            <div className="w-9 h-9 sm:w-11 sm:h-11 bg-indigo-50 rounded-lg flex items-center justify-center shrink-0">
              <Icon size={16} className="text-indigo-600 sm:w-[18px] sm:h-[18px]" />
            </div>
            <div>
              <p className="text-[11px] sm:text-sm font-semibold text-gray-900">{badge.title}</p>
              <p className="text-[9px] sm:text-xs text-gray-500">{badge.desc}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
}

// ═══════════════════════════════════════════
// HOME PAGE
// ═══════════════════════════════════════════
export default function Home() {
  const { products } = useProducts();
  const featuredProducts = products.filter(p => p.stock > 0 && p.featured).slice(0, 8);
  const hotDeals = products.filter(p => p.stock > 0 && p.discount >= 30).slice(0, 6);
  const topRated = [...products].filter(p => p.stock > 0).sort((a, b) => b.rating - a.rating).slice(0, 6);
  return (
    <>
      <Navbar />

      <main className="max-w-[1400px] mx-auto px-2 sm:px-3 lg:px-4 py-3 sm:py-4 lg:py-6 space-y-5 sm:space-y-8 lg:space-y-10 dark:text-white">
        {/* Hero Carousel */}
        <HeroCarousel />

        {/* Flash Sale */}
        <FlashSaleBar />

        {/* Categories */}
        <CategoryShowcase />

        {/* Featured Products */}
        <section>
          <SectionHeader
            icon={<Star size={18} className="text-yellow-500 fill-yellow-500 sm:w-5 sm:h-5" />}
            title="Featured Products"
            subtitle="Handpicked just for you"
            link="/products"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 sm:gap-3">
            {featuredProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
          <Link to="/products" className="sm:hidden flex items-center justify-center gap-1 text-indigo-600 text-sm font-semibold py-3 mt-1">
            View All Products <ArrowRight size={16} />
          </Link>
        </section>

        {/* Hot Deals */}
        <section className="bg-gradient-to-br from-red-50 via-rose-50 to-indigo-50 dark:from-red-950 dark:via-rose-950 dark:to-indigo-950 rounded-[20px] sm:rounded-2xl p-4 sm:p-6 lg:p-7 border border-red-100/40 dark:border-red-900/30">
          <SectionHeader
            icon={<Flame size={18} className="text-red-500 sm:w-5 sm:h-5" />}
            title="🔥 Hot Deals"
            subtitle="Limited time offers — up to 70% off"
            link="/products"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 sm:gap-3 lg:gap-4">
            {hotDeals.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>

        {/* Top Rated */}
        <section>
          <SectionHeader
            icon={<TrendingUp size={18} className="text-blue-500 sm:w-5 sm:h-5" />}
            title="Top Rated"
            subtitle="Most loved by our customers"
            link="/products"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3 lg:gap-4">
            {topRated.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>

        {/* Brands */}
        <BrandStrip />

        {/* Trust Badges */}
        <TrustBadges />

        
      </main>
    </>
  );
}
