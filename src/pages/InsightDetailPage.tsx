import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, ArrowLeft, ArrowRight, Tag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import axios from "axios";
import BASE_URI from "@/config";
import { insightImage, resolveImages } from "@/lib/contentMedia";
import ImageCarousel from "@/components/ImageCarousel";
import type { InsightPost } from "./InsightsPage";

const initials = (name = "") =>
  name.split(" ").filter(Boolean).map((w) => w[0]).slice(0, 2).join("").toUpperCase() || "A";

const InsightDetailPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<InsightPost | null>(null);
  const [related, setRelated] = useState<InsightPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    window.scrollTo(0, 0);
    (async () => {
      try {
        const [one, all] = await Promise.all([
          axios.get(`${BASE_URI}/api/insights/${slug}`),
          axios.get(`${BASE_URI}/api/insights`),
        ]);
        setPost(one.data.status ? one.data.data : null);
        if (all.data.status) {
          setRelated(all.data.data.filter((p: InsightPost) => p.slug !== slug).slice(0, 3));
        }
      } catch (err) {
        console.error(err);
        setPost(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  const tags = (post?.tags || "").split(",").map((t) => t.trim()).filter(Boolean);
  const gallery = post ? resolveImages(post) : [];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <p className="text-center text-gray-400 py-40">Loading…</p>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex flex-col items-center justify-center py-40 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Article not found</h2>
          <Link to="/insights" className="text-blue-900 font-medium hover:underline mt-4 flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Back to Insights
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Immersive hero with overlay */}
      <div className="relative h-[420px] sm:h-[520px] overflow-hidden">
        <img src={insightImage(post)} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/70 to-blue-900/20" />
        <div className="relative h-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col justify-end pb-12">
          <Link to="/insights" className="inline-flex items-center gap-1.5 text-blue-200 hover:text-white text-sm mb-5 transition w-fit">
            <ArrowLeft className="w-4 h-4" /> Back to Insights
          </Link>
          <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-orange-400 mb-4">
            Insight
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.15] mb-6 max-w-3xl">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-blue-100">
            <span className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold ring-2 ring-white/20">
              {initials(post.author)}
            </span>
            <span className="font-semibold text-white">{post.author}</span>
            <span className="w-1 h-1 rounded-full bg-white/40" />
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{post.date}</span>
          </div>
        </div>
      </div>

      {/* Image gallery directly after the hero (auto-scrolls when more than one image) */}
      {gallery.length > 1 && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 pt-10">
          <ImageCarousel
            images={gallery}
            alt={post.title}
            className="h-72 sm:h-[26rem] w-full rounded-2xl shadow-lg ring-1 ring-black/5"
          />
        </div>
      )}

      {/* Reading column */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Lead / excerpt */}
        <div className="border-l-4 border-orange-500 pl-5 mb-9">
          <p className="text-lg sm:text-xl text-gray-700 font-medium leading-relaxed">{post.excerpt}</p>
        </div>

        {/* Content */}
        <div className="space-y-5 text-gray-700 text-[1.05rem] leading-8">
          {post.content.split("\n\n").filter(Boolean).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-gray-100">
            {tags.map((tag) => (
              <span key={tag} className="flex items-center gap-1 bg-blue-50 text-blue-800 text-xs font-semibold px-3 py-1.5 rounded-full border border-blue-100">
                <Tag className="w-3 h-3" />{tag}
              </span>
            ))}
          </div>
        )}
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-gray-50 border-t border-gray-100 py-14">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">
            <h2 className="text-2xl font-bold text-blue-900 mb-8">More Insights</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link to={`/insights/${r.slug}`} key={r.id} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-40 overflow-hidden">
                    <img src={insightImage(r)} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-sm font-bold text-gray-900 group-hover:text-blue-900 transition-colors line-clamp-2 mb-3">{r.title}</h3>
                    <span className="inline-flex items-center gap-1 text-orange-500 text-xs font-semibold group-hover:gap-2 transition-all">
                      Read Article <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Themed CTA */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 py-14 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold mb-3">
            Need reliable <span className="text-orange-400">logistics solutions?</span>
          </h3>
          <p className="text-blue-200 mb-7 max-w-xl mx-auto">
            Talk to the Airvault team about air, sea, and land freight, customs clearance, and end-to-end supply chain support.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-7 py-3 rounded-full transition"
          >
            Contact Airvault <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InsightDetailPage;
