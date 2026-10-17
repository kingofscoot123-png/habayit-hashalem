export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`min-w-0 ${className}`}>
      <span className="logo-word block font-display text-lg font-medium leading-none tracking-[0.02em]">
        הבית השלם
      </span>
      <span className="logo-sub text-[10px] font-bold tracking-[0.18em]">מיכאל מרום</span>
    </span>
  );
}
