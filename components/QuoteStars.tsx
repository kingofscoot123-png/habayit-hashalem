export function QuoteStars() {
  return (
    <div className="quote-stars" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i}>★</span>
      ))}
    </div>
  );
}
