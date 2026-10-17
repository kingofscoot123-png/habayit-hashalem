type TreatHouseProps = {
  stage: number;
};

/** Classic business house: symmetric triangular roof, stable walls, clear glass windows. */
export function TreatHouse({ stage }: TreatHouseProps) {
  return (
    <div className={`treat-house ${stage >= 3 ? "is-complete" : ""}`} data-stage={stage} aria-hidden="true">
      <svg className="treat-house__svg" viewBox="0 0 400 380" width="400" height="380">
        <defs>
          <linearGradient id="th-roof" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8B5A2B" />
            <stop offset="100%" stopColor="#7C4A2D" />
          </linearGradient>
          <linearGradient id="th-wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fffdf8" />
            <stop offset="100%" stopColor="#ebe4d8" />
          </linearGradient>
          <linearGradient id="th-glass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,253,248,0.94)" />
            <stop offset="100%" stopColor="rgba(245,232,184,0.58)" />
          </linearGradient>
          <linearGradient id="th-side" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FDFBF7" />
            <stop offset="100%" stopColor="#E8DDCC" />
          </linearGradient>
        </defs>

        <rect data-build="1" className="treat-house__base" x="76" y="318" width="248" height="8" rx="2" fill="#1E3A2B" opacity="0.9" />
        <line data-build="1" className="treat-house__base-line" x1="84" y1="326" x2="316" y2="326" stroke="rgba(124,74,45,0.35)" strokeWidth="1.2" />

        <path
          data-build="1"
          className="treat-house__ghost treat-house__ghost--roof"
          fill="none"
          stroke="#2D4A3E"
          strokeWidth="1.5"
          d="M108 178 L200 88 L292 178 Z"
        />

        <rect data-build="2" x="108" y="178" width="184" height="140" fill="url(#th-wall)" stroke="#2D4A3E" strokeWidth="2" />
        <path data-build="2" d="M292 178 L316 190 V318 H292 Z" fill="url(#th-side)" stroke="#2D4A3E" strokeWidth="1.2" opacity="0.92" />

        <path data-build="2" d="M172 318 V264 Q172 254 182 254 H218 Q228 254 228 264 V318 Z" fill="#7C4A2D" stroke="#1E3A2B" strokeWidth="1.4" />
        <path data-build="2" d="M180 318 V268 Q180 262 186 262 H214 Q220 262 220 268 V318 Z" fill="#8B5A2B" opacity="0.42" />
        <circle data-build="2" cx="217" cy="288" r="2.5" fill="#C5A059" />

        <path data-build="3" d="M108 178 L200 88 L292 178 Z" fill="url(#th-roof)" stroke="#1E3A2B" strokeWidth="1.8" />
        <path data-build="3" d="M292 178 L316 190 L200 88 Z" fill="#6F4328" opacity="0.35" />
        <path data-build="3" d="M108 178 H292" fill="none" stroke="#1E3A2B" strokeWidth="2" />
        <rect data-build="3" x="246" y="124" width="16" height="28" rx="2" fill="#1E3A2B" />

        <rect
          data-build="3"
          className="treat-house__win"
          x="128"
          y="198"
          width="44"
          height="44"
          rx="2"
          fill="url(#th-glass)"
          stroke="#2D4A3E"
          strokeWidth="1.2"
        />
        <rect
          data-build="3"
          className="treat-house__win"
          x="228"
          y="198"
          width="44"
          height="44"
          rx="2"
          fill="url(#th-glass)"
          stroke="#2D4A3E"
          strokeWidth="1.2"
        />
        <path
          data-build="3"
          stroke="rgba(124,74,45,0.55)"
          strokeWidth="1"
          fill="none"
          d="M150 198 V242 M128 220 H172 M250 198 V242 M228 220 H272"
        />
      </svg>
    </div>
  );
}
