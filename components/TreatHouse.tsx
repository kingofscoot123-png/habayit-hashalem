type TreatHouseProps = {
  /** 0 foundation → 1 walls → 2 openings → 3 roof → 4 complete (chimney + gold) */
  stage: number;
};

/**
 * Premium house build in 5 stages (GSAP scroll drives `stage`):
 * 1 Foundation · 2 Walls · 3 Door+windows · 4 Roof · 5 Chimney + organic + gold light
 */
export function TreatHouse({ stage }: TreatHouseProps) {
  const cx = 200;
  const wallX = 100;
  const wallW = 200;
  const wallTop = 168;
  const wallH = 150;
  const peakY = 52;
  const winSize = 44;
  const winY = 190;
  const winCenterOffset = 48;
  const winLeft = cx - winCenterOffset - winSize / 2;
  const winRight = cx + winCenterOffset - winSize / 2;
  const doorW = 54;
  const doorX = cx - doorW / 2;
  const baseY = 318;
  const complete = stage >= 4;

  return (
    <div
      className={`treat-house ${complete ? "is-complete" : ""}`}
      data-stage={Math.min(4, Math.max(0, stage))}
      aria-hidden="true"
    >
      <svg className="treat-house__svg" viewBox="0 0 400 380" width="400" height="380" role="img">
        <defs>
          <linearGradient id="th-roof" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#9E1B32" />
            <stop offset="55%" stopColor="#82152B" />
            <stop offset="100%" stopColor="#5C1220" />
          </linearGradient>
          <linearGradient id="th-wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F3E6D2" />
            <stop offset="100%" stopColor="#E2CFAE" />
          </linearGradient>
          <linearGradient id="th-glass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,236,200,0.78)" />
            <stop offset="100%" stopColor="rgba(197,160,89,0.55)" />
          </linearGradient>
          <linearGradient id="th-base" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#82152B" />
            <stop offset="100%" stopColor="#5C1220" />
          </linearGradient>
          <radialGradient id="th-gold-glow" cx="50%" cy="42%" r="55%">
            <stop offset="0%" stopColor="rgba(197,160,89,0.55)" />
            <stop offset="45%" stopColor="rgba(197,160,89,0.18)" />
            <stop offset="100%" stopColor="rgba(197,160,89,0)" />
          </radialGradient>
          <filter id="th-soft" x="-25%" y="-25%" width="150%" height="150%">
            <feDropShadow dx="0" dy="10" stdDeviation="8" floodColor="#82152B" floodOpacity="0.18" />
          </filter>
          <filter id="th-gold-bloom" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Stage 5 — luxury gold light wash behind the finished house */}
        <ellipse
          data-build="5"
          className="treat-house__gold-light"
          cx={cx}
          cy="210"
          rx="168"
          ry="150"
          fill="url(#th-gold-glow)"
        />

        <g filter="url(#th-soft)">
          {/* Soft full-house ghost — filled silhouette, not hairline strokes */}
          <path
            className="treat-house__ghost treat-house__ghost--body"
            d={`M${wallX} ${wallTop} H${wallX + wallW} V${baseY} H${wallX} Z`}
            fill="rgba(197,160,89,0.18)"
            stroke="#82152B"
            strokeWidth="2.8"
            strokeOpacity="0.45"
          />
          <path
            className="treat-house__ghost treat-house__ghost--roof"
            d={`M${wallX - 14} ${wallTop} L${cx} ${peakY} L${wallX + wallW + 14} ${wallTop} Z`}
            fill="rgba(130,21,43,0.14)"
            stroke="#82152B"
            strokeWidth="3"
            strokeOpacity="0.5"
            strokeLinejoin="round"
          />

          {/* 1 — Foundation (יסודות + קו תחתון) */}
          <rect
            data-build="1"
            className="treat-house__base"
            x="68"
            y={baseY}
            width="264"
            height="18"
            rx="3"
            fill="url(#th-base)"
          />
          <rect data-build="1" x="78" y={baseY + 18} width="244" height="7" rx="2" fill="#C5A059" />

          {/* 2 — Walls / skeleton (קירות אנכיים) */}
          <rect
            data-build="2"
            x={wallX}
            y={wallTop}
            width={wallW}
            height={wallH}
            fill="url(#th-wall)"
            stroke="#82152B"
            strokeWidth="3"
          />
          <path
            data-build="2"
            d={`M${wallX + 18} ${baseY} V${wallTop + 12} M${wallX + wallW - 18} ${baseY} V${wallTop + 12} M${cx} ${baseY} V${wallTop + 12}`}
            fill="none"
            stroke="rgba(130,21,43,0.28)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* 3 — Openings: door + windows (אור ואוויר) */}
          <path
            data-build="3"
            d={`M${doorX} ${baseY} V264 Q${doorX} 252 ${cx} 252 Q${doorX + doorW} 252 ${doorX + doorW} 264 V${baseY} Z`}
            fill="#82152B"
            stroke="#82152B"
            strokeWidth="1.8"
          />
          <path
            data-build="3"
            d={`M${doorX + 6} ${baseY} V270 Q${doorX + 6} 260 ${cx} 260 Q${doorX + doorW - 6} 260 ${doorX + doorW - 6} 270 V${baseY} Z`}
            fill="#5C1220"
            opacity="0.45"
          />
          <circle data-build="3" cx={doorX + doorW - 10} cy="290" r="3.2" fill="#C5A059" />
          <rect
            data-build="3"
            className="treat-house__win"
            x={winLeft}
            y={winY}
            width={winSize}
            height={winSize}
            rx="3"
            fill="url(#th-glass)"
            stroke="#82152B"
            strokeWidth="1.8"
          />
          <rect
            data-build="3"
            className="treat-house__win"
            x={winRight}
            y={winY}
            width={winSize}
            height={winSize}
            rx="3"
            fill="url(#th-glass)"
            stroke="#82152B"
            strokeWidth="1.8"
          />
          <path
            data-build="3"
            stroke="rgba(130,21,43,0.55)"
            strokeWidth="1.2"
            fill="none"
            d={`M${winLeft + winSize / 2} ${winY} V${winY + winSize} M${winLeft} ${winY + winSize / 2} H${winLeft + winSize} M${winRight + winSize / 2} ${winY} V${winY + winSize} M${winRight} ${winY + winSize / 2} H${winRight + winSize}`}
          />

          {/* 4 — Roof (גג משולש) */}
          <g data-build="4">
            <path
              d={`M${wallX - 16} ${wallTop} L${cx} ${peakY} L${wallX + wallW + 16} ${wallTop} Z`}
              fill="url(#th-roof)"
              stroke="#82152B"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            <path
              d={`M${wallX - 16} ${wallTop} L${cx} ${peakY} L${wallX + wallW + 16} ${wallTop}`}
              fill="none"
              stroke="rgba(197,160,89,0.65)"
              strokeWidth="1.6"
            />
          </g>

          {/* 5 — Complete: chimney + organic vine + gold accent */}
          <g data-build="5" className="treat-house__finale">
            <rect x={cx - 10} y={peakY + 14} width="20" height="32" rx="2" fill="#5C1220" opacity="0.95" />
            <rect x={cx - 14} y={peakY + 8} width="28" height="8" rx="2" fill="#82152B" />
            <path
              d={`M${cx - 6} ${peakY + 8} Q${cx - 18} ${peakY - 6} ${cx - 4} ${peakY - 14} Q${cx + 8} ${peakY - 4} ${cx + 4} ${peakY + 8}`}
              fill="rgba(197,160,89,0.35)"
              stroke="#C5A059"
              strokeWidth="1.2"
              opacity="0.85"
            />
            {/* Organic vine / leaf on the right wall */}
            <path
              d={`M${wallX + wallW - 8} ${baseY - 24}
                  C${wallX + wallW + 18} ${baseY - 70},
                   ${wallX + wallW + 10} ${wallTop + 40},
                   ${wallX + wallW - 6} ${wallTop + 18}
                  C${wallX + wallW + 22} ${wallTop + 50},
                   ${wallX + wallW + 28} ${baseY - 90},
                   ${wallX + wallW - 4} ${baseY - 40}`}
              fill="none"
              stroke="#82152B"
              strokeWidth="2.2"
              strokeLinecap="round"
              opacity="0.72"
            />
            <ellipse
              cx={wallX + wallW + 10}
              cy={wallTop + 48}
              rx="7"
              ry="11"
              fill="#82152B"
              opacity="0.55"
              transform={`rotate(-28 ${wallX + wallW + 10} ${wallTop + 48})`}
            />
            <ellipse
              cx={wallX + wallW + 16}
              cy={baseY - 78}
              rx="6"
              ry="10"
              fill="#9E1B32"
              opacity="0.5"
              transform={`rotate(18 ${wallX + wallW + 16} ${baseY - 78})`}
            />
            {/* Gold luxury rim on roof peak */}
            <circle
              cx={cx}
              cy={peakY + 4}
              r="5"
              fill="#C5A059"
              filter="url(#th-gold-bloom)"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
