import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { Calendar, Tag, ArrowLeft, ArrowRight, Phone } from "lucide-react";
import { getPostBySlug, blogPosts, formatDate } from "@/data/blogPosts";
import { useQuote } from "@/context/QuoteContext";

function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={key++} className="text-2xl font-display font-bold text-marine-900 mt-10 mb-4">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3 key={key++} className="text-xl font-display font-bold text-marine-900 mt-8 mb-3">
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith("**") && line.endsWith("**") && line.length > 4) {
      elements.push(
        <p key={key++} className="font-semibold text-marine-900 mb-3 leading-relaxed">
          {line.slice(2, -2)}
        </p>
      );
    } else if (line.startsWith("> ")) {
      elements.push(
        <blockquote key={key++} className="border-l-4 border-cyan-500 pl-5 my-6 italic text-muted-foreground bg-cyan-500/5 py-4 pr-4 rounded-r-xl">
          {line.slice(2)}
        </blockquote>
      );
    } else if (line.startsWith("- ")) {
      const listItems: string[] = [line.slice(2)];
      while (i + 1 < lines.length && lines[i + 1].startsWith("- ")) {
        i++;
        listItems.push(lines[i].slice(2));
      }
      elements.push(
        <ul key={key++} className="list-none space-y-2 my-4">
          {listItems.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2.5 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    } else if (line.startsWith("---")) {
      elements.push(<hr key={key++} className="border-border my-8" />);
    } else if (line.trim() === "") {
      elements.push(<div key={key++} className="h-2" />);
    } else {
      // Inline bold handling
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      elements.push(
        <p key={key++} className="text-foreground leading-relaxed mb-1">
          {parts.map((part, idx) =>
            part.startsWith("**") && part.endsWith("**") ? (
              <strong key={idx} className="font-semibold text-marine-900">
                {part.slice(2, -2)}
              </strong>
            ) : (
              part
            )
          )}
        </p>
      );
    }
  }

  return elements;
}

export default function BlogPost() {
  const { openQuote } = useQuote();
  const params = useParams<{ slug: string }>();
  const post = getPostBySlug(params.slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pt-32">
        <div className="text-center">
          <h1 className="text-3xl font-display font-bold text-marine-900 mb-4">Post Not Found</h1>
          <Link href="/blog" className="text-cyan-500 hover:underline">← Back to Blog</Link>
        </div>
      </div>
    );
  }

  const currentIndex = blogPosts.findIndex((p) => p.slug === post.slug);
  const prevPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background pt-16 pb-24">

      {/* Hero */}
      <div className="relative h-72 md:h-[420px] overflow-hidden">
        <img
          src={post.image}
          alt={post.imageAlt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-marine-900/80 via-marine-900/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end max-w-4xl mx-auto px-4 sm:px-6 pb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-cyan-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1.5">
              <Tag className="w-3 h-3" /> {post.category}
            </span>
            <span className="text-white/70 text-sm flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> {formatDate(post.date)}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight">
            {post.title}
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back link */}
        <div className="mt-8 mb-10">
          <Link href="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-cyan-500 transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </div>

        {/* Excerpt */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl text-muted-foreground leading-relaxed mb-10 pb-10 border-b border-border font-light"
        >
          {post.excerpt}
        </motion.p>

        {/* Body */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="prose-custom text-base"
        >
          {renderContent(post.content)}
        </motion.div>

        {/* CTA Box */}
        <div className="mt-14 bg-marine-900 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h3 className="text-2xl font-display font-bold text-white mb-2">
              Ready to book this service?
            </h3>
            <p className="text-gray-300 text-sm">
              Call Spike directly or book online. Phone calls are preferred for the best service experience.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="tel:4168905899"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors"
            >
              <Phone className="w-4 h-4 text-cyan-400" /> 416-890-5899
            </a>
            <button
              onClick={() => openQuote()}
              className="flex items-center justify-center px-6 py-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-white font-bold transition-all"
            >
              Reserve Assessment
            </button>
          </div>
        </div>

        {/* Prev / Next */}
        <div className="mt-12 grid sm:grid-cols-2 gap-4">
          {prevPost && (
            <Link href={`/blog/${prevPost.slug}`} className="group flex items-start gap-4 p-5 rounded-2xl border border-border hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-all">
              <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-cyan-500 transition-colors mt-0.5 shrink-0" />
              <div>
                <div className="text-xs text-muted-foreground mb-1">Previous</div>
                <div className="text-sm font-display font-bold text-marine-900 group-hover:text-cyan-600 transition-colors leading-snug">
                  {prevPost.title}
                </div>
              </div>
            </Link>
          )}
          {nextPost && (
            <Link href={`/blog/${nextPost.slug}`} className="group flex items-start gap-4 p-5 rounded-2xl border border-border hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-all sm:text-right sm:flex-row-reverse">
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-cyan-500 transition-colors mt-0.5 shrink-0" />
              <div>
                <div className="text-xs text-muted-foreground mb-1">Next</div>
                <div className="text-sm font-display font-bold text-marine-900 group-hover:text-cyan-600 transition-colors leading-snug">
                  {nextPost.title}
                </div>
              </div>
            </Link>
          )}
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-display font-bold text-marine-900 mb-7">
              More in {post.category}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedPosts.map((related) => (
                <Link key={related.slug} href={`/blog/${related.slug}`} className="group block">
                  <div className="rounded-2xl overflow-hidden border border-border hover:shadow-md hover:border-cyan-500/30 transition-all bg-white">
                    <div className="h-36 overflow-hidden">
                      <img
                        src={related.image}
                        alt={related.imageAlt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-muted-foreground mb-2">{formatDate(related.date)}</p>
                      <h3 className="text-sm font-display font-bold text-marine-900 leading-snug group-hover:text-cyan-600 transition-colors">
                        {related.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
