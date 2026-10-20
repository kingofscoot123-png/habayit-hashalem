export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`min-w-0 ${className}`}>
      <span className="logo-word block font-display text-lg font-extrabold leading-none tracking-[-0.03em]">
        הבית השלם
      </span>
      <span className="logo-sub text-[10px] font-bold tracking-[0.18em] text-gold">מיכאל מרום</span>
    </span>
  );
}
