import { content } from "@/content";
import { SwipeDeck } from "@/components/SwipeDeck";
import { BreakSwitch } from "@/components/BreakSwitch";

function Cert({ item }: { item: (typeof content.credentials.items)[number] }) {
  return (
    <figure className="cert-photo h-full rounded-shell p-[12px]">
      <img src={item.src} alt={item.alt} />
      <figcaption>{item.alt.replace("תעודת ", "")}</figcaption>
    </figure>
  );
}

function items(prefix: string) {
  return content.credentials.items.map((item) => <Cert key={`${prefix}-${item.src}`} item={item} />);
}

export function Credentials() {
  return (
    <section id="credentials" className="px-0 py-16 lg:px-16 lg:py-[140px]">
      <h2 className="mx-auto mb-10 max-w-3xl px-5 text-center text-h2 sm:px-6 lg:mb-14" data-reveal>
        {content.credentials.title}
      </h2>
      <BreakSwitch
        mobile={
          <SwipeDeck label={content.credentials.title} variant="certs">
            {items("m")}
          </SwipeDeck>
        }
        desktop={<div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-5">{items("d")}</div>}
      />
    </section>
  );
}
