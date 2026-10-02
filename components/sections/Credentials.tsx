import { content } from "@/content";

export function Credentials() {
  return (
    <section id="credentials" className="px-6 py-[88px] lg:px-16 lg:py-[140px]">
      <h2 className="mx-auto mb-14 max-w-3xl text-center text-h2" data-reveal>
        {content.credentials.title}
      </h2>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2">
        {content.credentials.items.map((item) => (
          <figure key={item.src} className="cert-photo rounded-shell p-[12px]">
            <img src={item.src} alt={item.alt} />
            <figcaption>{item.alt.replace("תעודת ", "")}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
