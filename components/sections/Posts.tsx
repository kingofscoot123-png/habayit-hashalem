import { AccentLead } from "@/components/AccentLead";
import { content } from "@/content";

export function Posts() {
  return (
    <section id="posts" className="posts-section mishpacha-canvas px-5 py-14 sm:px-6 lg:px-16 lg:py-20">
      <div
        className="card-glass content-shield posts-head mx-auto mb-8 max-w-3xl rounded-2xl border-t-4 border-[#C5A059] bg-white/95 p-6 text-center shadow-2xl shadow-[#82152B]/12 backdrop-blur-md md:mb-10 md:p-8"
        data-reveal
      >
        <p className="posts-kicker">{content.posts.kicker}</p>
        <h2 className="section-title-rule text-h2">
          <AccentLead text={content.posts.title} />
        </h2>
        <p className="posts-hint mt-3">{content.posts.hint}</p>
      </div>

      <div className="posts-grid mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3" data-stagger>
        {content.posts.items.map((item) => (
          <article key={item.title} className="posts-card clinic-card rounded-2xl bg-white/95 p-6 md:p-7">
            <span className="posts-card__mark" aria-hidden="true" />
            <h3 className="posts-card__title">{item.title}</h3>
            <p className="posts-card__body">{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
