import { useState, useEffect } from "react";
import { Calendar, ArrowRight, TrendingUp } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import BASE_URI from "@/config";
import { insightImage } from "@/lib/contentMedia";

export interface InsightPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image?: string;
  images?: string;
  tags?: string;
}

const ITEMS_PER_PAGE = 5;

const InsightsPage = () => {
  const [posts, setPosts] = useState<InsightPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${BASE_URI}/api/insights`);
        if (res.data.status) setPosts(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);
  const paginated = posts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const featured = posts[0];
  const rest = paginated.filter((p) => !featured || p.id !== featured.id || currentPage > 1);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-orange-400" />
            <span className="text-orange-400 font-semibold text-sm uppercase tracking-widest">Insights</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            Logistics <span className="text-orange-400">Intelligence</span>
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl">
            In-depth analysis, market intelligence, and operational insights from the Airvault team.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 py-12">

        {loading ? (
          <p className="text-center text-gray-400 py-20">Loading insights…</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-400 py-20">No insights published yet.</p>
        ) : (
          <>
            {/* Featured Article (page 1 only) */}
            {currentPage === 1 && featured && (
              <Link to={`/insights/${featured.slug}`} className="group block mb-10">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow flex flex-col lg:flex-row">
                  <div className="lg:w-1/2 h-64 lg:h-auto overflow-hidden">
                    <img src={insightImage(featured)} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="lg:w-1/2 p-8 flex flex-col justify-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-900 transition-colors leading-snug">
                      {featured.title}
                    </h2>
                    <p className="text-gray-500 text-sm mb-6 leading-relaxed">{featured.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{featured.date}</span>
                    </div>
                    <div className="mt-6 flex items-center gap-2 text-blue-900 font-semibold text-sm group-hover:gap-3 transition-all">
                      Read Article <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Article List */}
            <div className="space-y-5">
              {rest.map((post) => (
                <Link to={`/insights/${post.slug}`} key={post.id} className="group block">
                  <div className="bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow overflow-hidden flex flex-col sm:flex-row">
                    <div className="sm:w-48 h-36 sm:h-auto overflow-hidden shrink-0">
                      <img src={insightImage(post)} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-5 flex flex-col justify-between flex-1">
                      <div>
                        <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-900 transition-colors mb-1 leading-snug">
                          {post.title}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-400 mt-3">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
                        <span className="ml-auto flex items-center gap-1 text-blue-900 font-semibold group-hover:gap-2 transition-all">
                          Read <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-10">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border text-sm font-medium disabled:opacity-40 hover:bg-gray-100"
                >
                  Prev
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition ${
                      currentPage === i + 1 ? "bg-blue-900 text-white border-blue-900" : "hover:bg-gray-100"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg border text-sm font-medium disabled:opacity-40 hover:bg-gray-100"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default InsightsPage;
