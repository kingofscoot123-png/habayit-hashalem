type TreatHouseProps = {
  stage: number;
};

/** Symmetric premium house — windows inset toward center; roof on step 04. */
export function TreatHouse({ stage }: TreatHouseProps) {
  const cx = 200;
  const wallX = 108;
  const wallW = 184;
  const wallTop = 178;
  const peakY = 64;
  const winSize = 40;
  const winY = 198;
  const winCenterOffset = 44;
  const winLeft = cx - winCenterOffset - winSize / 2;
  const winRight = cx + winCenterOffset - winSize / 2;
  const doorW = 50;
  const doorX = cx - doorW / 2;

  return (
    <div className={`treat-house ${stage >= 3 ? "is-complete" : ""}`} data-stage={stage} aria-hidden="true">
      <svg className="treat-house__svg" viewBox="0 0 400 380" width="400" height="380">
        <defs>
          <linearGradient id="th-roof" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#82152B" />
            <stop offset="55%" stopColor="#9E1B32" />
            <stop offset="100%" stopColor="#5C1220" />
          </linearGradient>
          <linearGradient id="th-wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FAF8F5" />
            <stop offset="100%" stopColor="#EDE8E1" />
          </linearGradient>
          <linearGradient id="th-glass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,236,200,0.62)" />
            <stop offset="100%" stopColor="rgba(197,160,89,0.48)" />
          </linearGradient>
          <filter id="th-soft" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#82152B" floodOpacity="0.12" />
          </filter>
        </defs>

        <g filter="url(#th-soft)">
          <rect data-build="1" className="treat-house__base" x="74" y="318" width="252" height="10" rx="2" fill="#82152B" opacity="0.94" />
          <line data-build="1" x1="82" y1="328" x2="318" y2="328" stroke="rgba(130,21,43,0.35)" strokeWidth="1.2" />

          <path
            data-build="1"
            className="treat-house__ghost treat-house__ghost--roof"
            fill="none"
            stroke="#82152B"
            strokeWidth="1.5"
            d={`M${wallX - 6} ${wallTop} L${cx} ${peakY} L${wallX + wallW + 6} ${wallTop}`}
          />

          <rect
            data-build="2"
            x={wallX}
            y={wallTop}
            width={wallW}
            height={140}
            fill="url(#th-wall)"
            stroke="#82152B"
            strokeWidth="1.8"
          />

          <path
            data-build="2"
            d={`M${doorX} 318 V264 Q${doorX} 254 ${cx} 254 Q${doorX + doorW} 254 ${doorX + doorW} 264 V318 Z`}
            fill="#82152B"
            stroke="#82152B"
            strokeWidth="1.5"
          />
          <path
            data-build="2"
            d={`M${doorX + 5} 318 V268 Q${doorX + 5} 260 ${cx} 260 Q${doorX + doorW - 5} 260 ${doorX + doorW - 5} 268 V318 Z`}
            fill="#82152B"
            opacity="0.32"
          />
          <circle data-build="2" cx={doorX + doorW - 8} cy="287" r="2.5" fill="#C5A059" />

          <rect
            data-build="3"
            className="treat-house__win"
            x={winLeft}
            y={winY}
            width={winSize}
            height={winSize}
            rx="2"
            fill="url(#th-glass)"
            stroke="#82152B"
            strokeWidth="1.2"
          />
          <rect
            data-build="3"
            className="treat-house__win"
            x={winRight}
            y={winY}
            width={winSize}
            height={winSize}
            rx="2"
            fill="url(#th-glass)"
            stroke="#82152B"
            strokeWidth="1.2"
          />
          <path
            data-build="3"
            stroke="rgba(130,21,43,0.45)"
            strokeWidth="0.9"
            fill="none"
            d={`M${winLeft + winSize / 2} ${winY} V${winY + winSize} M${winLeft} ${winY + winSize / 2} H${winLeft + winSize} M${winRight + winSize / 2} ${winY} V${winY + winSize} M${winRight} ${winY + winSize / 2} H${winRight + winSize}`}
          />

          <g data-build="4">
            <path
              d={`M${wallX - 8} ${wallTop} L${cx} ${peakY} L${wallX + wallW + 8} ${wallTop} Z`}
              fill="url(#th-roof)"
              stroke="#82152B"
              strokeWidth="1.6"
              strokeLinejoin="miter"
            />
            <path
              d={`M${wallX - 8} ${wallTop} L${cx} ${peakY} L${wallX + wallW + 8} ${wallTop}`}
              fill="none"
              stroke="rgba(197,160,89,0.5)"
              strokeWidth="1"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
