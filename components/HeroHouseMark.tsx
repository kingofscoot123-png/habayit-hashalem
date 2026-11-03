/** Compact house mark for the split hero — burgundy roof, cream body, gold accent. */
export function HeroHouseMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 72 64"
      width="72"
      height="64"
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="hh-roof" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9E1B32" />
          <stop offset="100%" stopColor="#82152B" />
        </linearGradient>
        <linearGradient id="hh-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F7EFE3" />
          <stop offset="100%" stopColor="#E8D7B8" />
        </linearGradient>
      </defs>
      {/* Soft ground swoosh */}
      <path
        d="M8 58 C22 52, 50 52, 64 58"
        fill="none"
        stroke="#C5A059"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.85"
      />
      {/* Walls */}
      <rect x="16" y="28" width="40" height="28" rx="2" fill="url(#hh-wall)" stroke="#82152B" strokeWidth="1.6" />
      {/* Door */}
      <path d="M32 56 V40 Q32 36 36 36 Q40 36 40 40 V56 Z" fill="#82152B" />
      <circle cx="38.5" cy="46" r="1.3" fill="#C5A059" />
      {/* Windows */}
      <rect x="20" y="34" width="8" height="8" rx="1" fill="rgba(197,160,89,0.45)" stroke="#82152B" strokeWidth="1" />
      <rect x="44" y="34" width="8" height="8" rx="1" fill="rgba(197,160,89,0.45)" stroke="#82152B" strokeWidth="1" />
      {/* Roof */}
      <path d="M12 30 L36 8 L60 30 Z" fill="url(#hh-roof)" stroke="#82152B" strokeWidth="1.6" strokeLinejoin="round" />
      {/* Chimney */}
      <rect x="46" y="12" width="7" height="12" rx="1" fill="#5C1220" />
      <rect x="44.5" y="10" width="10" height="3.5" rx="1" fill="#82152B" />
      {/* Organic leaf */}
      <path
        d="M58 26 C66 20, 68 12, 62 8 C70 14, 68 24, 60 28 Z"
        fill="#82152B"
        opacity="0.72"
      />
      <path
        d="M60 26 C64 20, 65 14, 62 10"
        fill="none"
        stroke="#C5A059"
        strokeWidth="1"
        opacity="0.7"
      />
    </svg>
  );
}
