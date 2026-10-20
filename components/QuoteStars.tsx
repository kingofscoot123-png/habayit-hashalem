export function QuoteStars() {
  return (
    <div className="quote-stars" aria-label="5 כוכבים" role="img">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i}>★</span>
      ))}
    </div>
  );
}
