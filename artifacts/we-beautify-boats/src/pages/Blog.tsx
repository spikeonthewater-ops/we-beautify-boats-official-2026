import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Calendar, Tag, ArrowRight } from "lucide-react";
import { blogPosts, CATEGORIES, getPostsByCategory, formatDate } from "@/data/blogPosts";
import { useQuote } from "@/context/QuoteContext";

export default function Blog() {
  const { openQuote } = useQuote();
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered = getPostsByCategory(activeCategory);

  const featured = blogPosts[0];
  const rest = filtered.slice(activeCategory === "All" ? 1 : 0);

  return (
    <div className="min-h-screen bg-background pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <span className="text-cyan-500 font-semibold tracking-wider uppercase text-sm mb-3 block">
            We Beautify Boats Blog
          </span>
          <h1 className="text-5xl md:text-6xl font-display font-bold text-marine-900 mb-5">
            Marine Knowledge Hub
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Expert insight on boat detailing, hull care, seasonal maintenance, and protecting your investment on Ontario's freshwater lakes.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-cyan-500 text-white shadow-md"
                  : "bg-white border border-border text-muted-foreground hover:border-cyan-500 hover:text-cyan-500"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Post — only show when "All" selected */}
        {activeCategory === "All" && featured && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-14"
          >
            <Link href={`/blog/${featured.slug}`} className="group block">
              <div className="grid md:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-border shadow-lg hover:shadow-xl transition-shadow bg-white">
                <div className="relative h-72 md:h-auto overflow-hidden">
                  <img
                    src={featured.image}
                    alt={featured.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-marine-900/40 to-transparent" />
                  <span className="absolute top-4 left-4 bg-cyan-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                    Featured
                  </span>
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Tag className="w-3.5 h-3.5" /> {featured.category}
                    </span>
                    <span className="text-border">·</span>
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5" /> {formatDate(featured.date)}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-marine-900 mb-4 group-hover:text-cyan-600 transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {featured.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-2 text-cyan-500 font-semibold text-sm group-hover:gap-3 transition-all">
                    Read Article <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Post Grid */}
        {rest.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {rest.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={`/blog/${post.slug}`} className="group block h-full">
                  <div className="h-full flex flex-col rounded-2xl overflow-hidden border border-border bg-white hover:shadow-lg hover:border-cyan-500/30 transition-all duration-300">
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.imageAlt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-marine-900/50 to-transparent" />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="bg-cyan-500/10 text-cyan-600 text-xs font-semibold px-2.5 py-1 rounded-full">
                          {post.category}
                        </span>
                        <span className="text-xs text-muted-foreground ml-auto flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {formatDate(post.date)}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-marine-900 text-lg mb-3 leading-snug group-hover:text-cyan-600 transition-colors flex-1">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-cyan-500 text-sm font-semibold group-hover:gap-2.5 transition-all">
                        Read More <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 text-muted-foreground">
            No posts in this category yet.
          </div>
        )}

        {/* CTA */}
        <div className="mt-20 text-center bg-marine-900 rounded-3xl p-12">
          <h2 className="text-3xl font-display font-bold text-white mb-4">
            Ready to give your boat the attention it deserves?
          </h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            25 years of freshwater expertise across Ontario's lakes and marinas. Book directly with Spike.
          </p>
          <button
            onClick={() => openQuote()}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-cyan-500 hover:bg-cyan-400 text-white font-bold text-lg transition-all hover:-translate-y-0.5"
          >
            Reserve Assessment
          </button>
        </div>
      </div>
    </div>
  );
}
