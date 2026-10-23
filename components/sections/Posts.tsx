import { AccentLead } from "@/components/AccentLead";
import { content } from "@/content";

export function Posts() {
  return (
    <section id="posts" className="mishpacha-canvas px-5 py-16 sm:px-6 lg:px-16 lg:py-[100px]">
      <div
        className="card-glass content-shield mx-auto mb-10 max-w-3xl rounded-2xl border-t-4 border-[#18181B] border-b border-[#C5A059]/30 bg-white/95 p-6 text-center shadow-2xl shadow-black/10 backdrop-blur-md md:p-8"
        data-reveal
      >
        <h2 className="section-title-rule text-h2">
          <AccentLead text={content.posts.title} />
        </h2>
        <p className="mt-3 text-body text-ink">{content.posts.hint}</p>
      </div>
      <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
        {content.posts.items.map((item) => (
          <article
            key={item.title}
            className="card-glass clinic-card rounded-2xl border-t-4 border-[#18181B] border-b border-[#C5A059]/30 bg-white/95 p-6 shadow-2xl shadow-black/10 backdrop-blur-md md:p-8"
            data-reveal
          >
            <h3 className="text-xl font-extrabold text-burgundy">{item.title}</h3>
            <p className="mt-3 text-body text-ink">{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
