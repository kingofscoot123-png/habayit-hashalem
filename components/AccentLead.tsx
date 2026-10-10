export function AccentLead({ text }: { text: string }) {
  const [first, ...rest] = text.trim().split(/\s+/);
  return (
    <>
      <span className="text-mint">{first}</span>
      {rest.length ? ` ${rest.join(" ")}` : null}
    </>
  );
}
