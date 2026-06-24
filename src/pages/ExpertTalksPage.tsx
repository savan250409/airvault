import { useState, useEffect } from "react";
import { Mic } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import BASE_URI from "@/config";
import { talkImage } from "@/lib/contentMedia";

export interface ExpertTalk {
  id: number;
  slug: string;
  episode: string;
  title: string;
  description: string;
  content: string;
  speaker: string;
  designation: string;
  date: string;
  image?: string;
  images?: string;
}

const ITEMS_PER_PAGE = 4;

const ExpertTalksPage = () => {
  const [talks, setTalks] = useState<ExpertTalk[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${BASE_URI}/api/expert-talks`);
        if (res.data.status) setTalks(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const totalPages = Math.ceil(talks.length / ITEMS_PER_PAGE);
  const paginated = talks.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const featured = talks[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <Mic className="w-4 h-4 text-white" />
            </div>
            <span className="text-orange-400 font-semibold text-sm uppercase tracking-widest">Expert Talks</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            Conversations That <span className="text-orange-400">Matter</span>
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl">
            In-depth discussions with logistics leaders, trade experts, and industry veterans on the forces shaping global freight.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 py-12">

        {loading ? (
          <p className="text-center text-gray-400 py-20">Loading expert talks…</p>
        ) : talks.length === 0 ? (
          <p className="text-center text-gray-400 py-20">No expert talks published yet.</p>
        ) : (
          <>
            {/* Featured Talk */}
            {currentPage === 1 && featured && (
              <Link to={`/expert-talks/${featured.slug}`} className="group block mb-10">
                <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow flex flex-col lg:flex-row">
                  <div className="lg:w-2/5 h-56 lg:h-auto overflow-hidden">
                    <img src={talkImage(featured)} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="lg:w-3/5 p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-blue-900 text-xs font-bold uppercase tracking-widest">{featured.episode}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-900 transition-colors leading-snug">
                      {featured.title}
                    </h2>
                    <p className="text-gray-500 text-sm mb-5 leading-relaxed">{featured.description}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <span className="font-semibold text-gray-800">{featured.speaker}</span>
                      <span className="text-xs">{featured.designation}</span>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Talk Cards Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {paginated
                .filter((t) => !featured || t.id !== featured.id || currentPage > 1)
                .map((talk) => (
                  <Link to={`/expert-talks/${talk.slug}`} key={talk.id} className="group block">
                    <div className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-md transition-all hover:-translate-y-0.5">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-blue-50 rounded-full overflow-hidden shrink-0 border border-blue-100">
                          <img src={talkImage(talk)} alt={talk.speaker} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-blue-900 text-xs font-bold uppercase tracking-widest">{talk.episode}</p>
                          <p className="text-gray-900 font-semibold text-sm">{talk.speaker}</p>
                          <p className="text-gray-500 text-xs">{talk.designation}</p>
                        </div>
                      </div>
                      <h3 className="text-gray-900 font-bold text-base mb-2 group-hover:text-blue-900 transition-colors leading-snug">
                        {talk.title}
                      </h3>
                      <p className="text-gray-500 text-sm line-clamp-2">{talk.description}</p>
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
                  className="px-4 py-2 rounded-lg border text-sm font-medium disabled:opacity-40 hover:bg-gray-100 transition"
                >
                  Prev
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition ${
                      currentPage === i + 1
                        ? "bg-blue-900 text-white border-blue-900"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg border text-sm font-medium disabled:opacity-40 hover:bg-gray-100 transition"
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

export default ExpertTalksPage;
