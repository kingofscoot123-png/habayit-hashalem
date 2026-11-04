/** Compact house mark for the hero — clean house only (no side flourish). */
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
      shapeRendering="geometricPrecision"
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
      <path
        d="M10 58 C24 53, 48 53, 62 58"
        fill="none"
        stroke="#C5A059"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.85"
      />
      <rect x="16" y="28" width="40" height="28" rx="2" fill="url(#hh-wall)" stroke="#82152B" strokeWidth="1.6" />
      <path d="M32 56 V40 Q32 36 36 36 Q40 36 40 40 V56 Z" fill="#82152B" />
      <circle cx="38.5" cy="46" r="1.3" fill="#C5A059" />
      <rect x="20" y="34" width="8" height="8" rx="1" fill="rgba(197,160,89,0.45)" stroke="#82152B" strokeWidth="1" />
      <rect x="44" y="34" width="8" height="8" rx="1" fill="rgba(197,160,89,0.45)" stroke="#82152B" strokeWidth="1" />
      {/* Solid roof — no stroke */}
      <path d="M13 30 L36 9 L59 30 Z" fill="url(#hh-roof)" />
      {/* Chimney last, covers the roof slope junction cleanly */}
      <rect x="45" y="10" width="8" height="15" fill="#5C1220" />
      <rect x="43.5" y="8.5" width="11" height="3.2" fill="#82152B" />
    </svg>
  );
}
