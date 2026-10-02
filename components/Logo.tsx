export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        className="logo-mark h-11 w-11 shrink-0"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="logoGold" x1="8" y1="6" x2="40" y2="42" gradientUnits="userSpaceOnUse">
            <stop stopColor="#bbf7d0" />
            <stop offset="1" stopColor="#86efac" />
          </linearGradient>
        </defs>
        <rect width="48" height="48" rx="14" fill="#0b0f19" />
        <rect x="1" y="1" width="46" height="46" rx="13" fill="none" stroke="url(#logoGold)" strokeWidth="1.4" />
        <path
          d="M10 22.2 24 10.6 38 22.2V36.2a2.2 2.2 0 0 1-2.2 2.2H28.4v-7.4h-8.8v7.4H12.2A2.2 2.2 0 0 1 10 36.2Z"
          fill="url(#logoGold)"
        />
        <circle cx="24" cy="24.4" r="2.3" fill="#0b0f19" />
      </svg>
      <span className="min-w-0">
        <span className="block text-lg font-black leading-none tracking-tight">הבית השלם</span>
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-accent">מיכאל מרום</span>
      </span>
    </span>
  );
}
