import { AccentLead } from "@/components/AccentLead";
import { content } from "@/content";

export function Posts() {
  return (
    <section id="posts" className="posts-lux mishpacha-canvas px-5 py-9 sm:px-6 lg:px-16 lg:py-12">
      <div className="posts-lux__head mx-auto mb-3.5 max-w-2xl text-center">
        <h2 className="section-title-rule text-h2">
          <AccentLead text={content.posts.title} />
        </h2>
        <span className="posts-lux__rule" aria-hidden="true" />
        <p className="posts-lux__hint">{content.posts.hint}</p>
      </div>
      <div className="posts-lux__grid mx-auto grid max-w-5xl gap-3.5 md:grid-cols-2 lg:grid-cols-3" data-stagger>
        {content.posts.items.map((item) => (
          <article key={item.title} className="posts-lux__card">
            <h3 className="posts-lux__title">{item.title}</h3>
            <p className="posts-lux__body">{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
