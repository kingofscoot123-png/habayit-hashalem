export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`min-w-0 ${className}`}>
      <span className="logo-word block font-display text-xl font-extrabold leading-none tracking-[-0.03em]">
        הבית השלם
      </span>
      <span className="logo-sub text-xs font-extrabold tracking-[0.16em] text-gold">מיכאל מרום</span>
    </span>
  );
}
