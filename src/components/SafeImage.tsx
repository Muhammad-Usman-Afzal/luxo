// SafeImage v2 — Premium fallback with product name initials | BazaarHub
import { useState } from 'react';

const FALLBACKS: Record<string, string> = {
  electronics: '📱', phone: '📲', fashion: '👗', home: '🏠', sports: '⚽',
  beauty: '💄', grocery: '🛒', clothing: '👕', shoes: '👟', watch: '⌚',
  laptop: '💻', headphones: '🎧', tv: '📺', furniture: '🪑', food: '🍚',
  skincare: '🧴', vacuum: '🌀', dyson: '🌀', kurta: '👔', jeans: '👖',
  sneakers: '👟', running: '🏃', bike: '🚲', tea: '🍵', oil: '🫒',
  dryfruit: '🥜', bedsheet: '🛏️', serum: '🧪', cream: '🧴', mascara: '💋',
  lipstick: '💄', concealer: '🎨', foundation: '✨', watch2: '⌚',
  earbuds: '🎧', tablet: '📱', speaker: '🔊', playstation: '🎮', camera: '📷',
  hair: '💇', purifier: '🌬️', lamp: '💡', monitor: '🖥️', keyboard: '⌨️',
  dock: '🔌', hoodie: '🧥', shorts: '🩳', jacket: '🧥', tee: '👕',
  dupatta: '🧣', shawl: '🧣', trouser: '👖', default: '📦',
};

const gradColors = [
  'from-indigo-500 to-violet-600',
  'from-emerald-500 to-teal-600',
  'from-orange-500 to-amber-600',
  'from-rose-500 to-pink-600',
  'from-cyan-500 to-blue-600',
  'from-purple-500 to-fuchsia-600',
  'from-lime-500 to-green-600',
  'from-amber-500 to-yellow-600',
  'from-sky-500 to-indigo-600',
  'from-red-500 to-rose-600',
];

function getFallback(category: string, name: string): string {
  const lower = (category + ' ' + name).toLowerCase();
  for (const [key, emoji] of Object.entries(FALLBACKS)) {
    if (lower.includes(key)) return emoji;
  }
  return FALLBACKS.default;
}

function getGradient(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return gradColors[Math.abs(hash) % gradColors.length];
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(w => w[0])
    .filter(Boolean)
    .slice(0, 3)
    .join('')
    .toUpperCase();
}

interface Props {
  src: string;
  alt: string;
  category?: string;
  className?: string;
}

export default function SafeImage({ src, alt, category = '', className = '' }: Props) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (failed || !src) {
    const emoji = getFallback(category, alt);
    const gradient = getGradient(alt);
    const initials = getInitials(alt);
    return (
      <div className={`bg-gradient-to-br ${gradient} flex flex-col items-center justify-center gap-1 ${className}`}>
        <span className="text-2xl sm:text-3xl drop-shadow-lg">{emoji}</span>
        <span className="text-[8px] sm:text-[10px] font-bold text-white/70 tracking-wider">{initials}</span>
      </div>
    );
  }

  // Try to load
  return (
    <div className={`relative ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg" />
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
