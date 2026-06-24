import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Mic, Play, Quote } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import axios from "axios";
import BASE_URI from "@/config";
import { talkImage, resolveImages } from "@/lib/contentMedia";
import ImageCarousel from "@/components/ImageCarousel";
import type { ExpertTalk } from "./ExpertTalksPage";

const initials = (name = "") =>
  name.split(" ").filter(Boolean).map((w) => w[0]).slice(0, 2).join("").toUpperCase() || "A";

const ExpertTalkDetailPage = () => {
  const { slug } = useParams();
  const [talk, setTalk] = useState<ExpertTalk | null>(null);
  const [related, setRelated] = useState<ExpertTalk[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    window.scrollTo(0, 0);
    (async () => {
      try {
        const [one, all] = await Promise.all([
          axios.get(`${BASE_URI}/api/expert-talks/${slug}`),
          axios.get(`${BASE_URI}/api/expert-talks`),
        ]);
        setTalk(one.data.status ? one.data.data : null);
        if (all.data.status) {
          setRelated(all.data.data.filter((t: ExpertTalk) => t.slug !== slug).slice(0, 3));
        }
      } catch (err) {
        console.error(err);
        setTalk(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  const gallery = talk ? resolveImages(talk) : [];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <p className="text-center text-gray-400 py-40">Loading…</p>
        <Footer />
      </div>
    );
  }

  if (!talk) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex flex-col items-center justify-center py-40 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Talk not found</h2>
          <Link to="/expert-talks" className="text-blue-900 font-medium hover:underline mt-4 flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Back to Expert Talks
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
        <img src={talkImage(talk)} alt={talk.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/75 to-blue-900/30" />
        <div className="relative h-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col justify-end pb-12">
          <Link to="/expert-talks" className="inline-flex items-center gap-1.5 text-blue-200 hover:text-white text-sm mb-5 transition w-fit">
            <ArrowLeft className="w-4 h-4" /> Back to Expert Talks
          </Link>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
              <Mic className="w-4 h-4 text-white" />
            </div>
            <span className="text-orange-400 text-xs font-bold uppercase tracking-[0.25em]">
              {talk.episode} • Expert Talk
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.15] mb-6 max-w-3xl">
            {talk.title}
          </h1>
          <div className="flex items-center gap-4 flex-wrap text-sm">
            <div className="flex items-center gap-3">
              <span className="w-11 h-11 rounded-full bg-white/10 border-2 border-orange-400 text-white flex items-center justify-center text-xs font-bold">
                {initials(talk.speaker)}
              </span>
              <div>
                <p className="font-semibold text-white">{talk.speaker}</p>
                <p className="text-blue-200 text-xs">{talk.designation}</p>
              </div>
            </div>
            <span className="hidden sm:block w-px h-8 bg-white/20" />
            <span className="text-blue-200">{talk.date}</span>
          </div>
        </div>
      </div>

      {/* Reading column */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Summary */}
        <div className="relative bg-orange-50 border border-orange-100 rounded-2xl p-6 sm:p-7 mb-10">
          <Quote className="absolute -top-3 left-6 w-7 h-7 text-orange-400 fill-orange-100" />
          <p className="text-gray-700 text-lg leading-relaxed">{talk.description}</p>
        </div>

        {/* Transcript / content */}
        <div className="flex items-center gap-2 mb-5">
          <span className="w-1.5 h-6 rounded-full bg-orange-500" />
          <h2 className="text-xl font-bold text-blue-900">Key Takeaways &amp; Discussion</h2>
        </div>
        <div className="space-y-5 text-gray-700 text-[1.05rem] leading-8">
          {(talk.content || "").split("\n\n").filter(Boolean).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* Gallery (auto-scrolls when more than one image) */}
        {gallery.length > 1 && (
          <ImageCarousel
            images={gallery}
            alt={talk.title}
            className="h-72 sm:h-96 w-full rounded-2xl shadow-lg ring-1 ring-black/5 mt-10"
          />
        )}
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-gray-50 border-t border-gray-100 py-14">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">
            <h2 className="text-2xl font-bold text-blue-900 mb-8">More Expert Talks</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link to={`/expert-talks/${r.slug}`} key={r.id} className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all hover:-translate-y-0.5">
                  <div className="h-36 overflow-hidden">
                    <img src={talkImage(r)} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-full bg-blue-900/5 flex items-center justify-center">
                        <Play className="w-3 h-3 text-blue-900 fill-blue-900" />
                      </div>
                      <p className="text-blue-900 text-xs font-bold uppercase tracking-widest">{r.episode}</p>
                    </div>
                    <h3 className="text-gray-900 text-sm font-bold group-hover:text-blue-900 transition-colors mb-2 line-clamp-2">{r.title}</h3>
                    <p className="text-gray-500 text-xs font-medium">{r.speaker}</p>
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
            Partner with <span className="text-orange-400">Airvault Express</span>
          </h3>
          <p className="text-blue-200 mb-7 max-w-xl mx-auto">
            From air cargo to customs clearance, our experts help your business move freight smarter and faster.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-7 py-3 rounded-full transition"
          >
            Get in Touch <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ExpertTalkDetailPage;
