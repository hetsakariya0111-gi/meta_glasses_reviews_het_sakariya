import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BadgeCheck, ThumbsUp, Star, MessageSquareQuote, Sparkles } from 'lucide-react';
import api from '../services/api';

export default function ReviewDetailPage() {
  const { id } = useParams();
  const [review, setReview] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadReview() {
      try {
        const response = await api.get(`/reviews/${id}`);
        setReview(response.data.data);
        const relatedRes = await api.get(`/reviews?country=${encodeURIComponent(response.data.data.country || '')}&limit=3`);
        setRelated(relatedRes.data.data?.filter((item) => item._id !== response.data.data._id) || []);
      } catch (err) {
        setError('Failed to load review.');
      } finally {
        setLoading(false);
      }
    }

    loadReview();
  }, [id]);

  if (loading) {
    return <div className="mx-auto max-w-6xl px-4 py-16"> <div className="h-64 animate-pulse rounded-[2rem] border border-white/10 bg-white/5" /> </div>;
  }

  if (error || !review) {
    return <div className="mx-auto max-w-6xl px-4 py-16 text-slate-300">Failed to load review. Please retry.</div>;
  }

  return (
    <>
      <Helmet>
        <title>{review.title} | Meta Glasses Reviews</title>
        <meta name="description" content={`Read the full review for ${review.title} from Meta Glasses Reviews.`} />
      </Helmet>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-[2.25rem] border border-emerald-400/20 bg-gradient-to-br from-emerald-500/10 to-slate-900 p-8 shadow-[0_0_70px_rgba(34,197,94,0.1)]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">Review detail</p>
              <h1 className="mt-2 text-3xl font-black text-white">{review.title}</h1>
            </div>
            <div className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-400">{review.rating}/5</div>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
            <div>
              <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-6">
                <div className="flex items-center gap-2 text-emerald-400"><MessageSquareQuote size={16} /> Review excerpt</div>
                <p className="mt-4 text-slate-300">{review.review}</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-400">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">By {review.name}</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">{review.country || 'Unknown'}</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">{review.date || review.createdAt?.slice(0,10)}</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Device {review.device || 'Ray-Ban Meta'}</span>
              </div>
              <button className="mt-8 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 font-semibold text-emerald-400 transition hover:bg-emerald-500/20">
                <ThumbsUp size={16} /> Mark Helpful ({review.helpful || 0})
              </button>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-[#0a0e14] p-6">
              <div className="flex items-center gap-2 text-emerald-400"><BadgeCheck size={18} /> Verified purchase</div>
              <p className="mt-4 text-sm text-slate-400">{review.verifiedPurchase || 'False'}</p>
              <div className="mt-6 space-y-3 text-sm text-slate-300">
                <div className="flex justify-between"><span>Helpful count</span><span>{review.helpful || 0}</span></div>
                <div className="flex justify-between"><span>Country</span><span>{review.country || 'Unknown'}</span></div>
                <div className="flex justify-between"><span>Author</span><span>{review.name}</span></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold text-white">Related reviews</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <div key={item._id} className="rounded-[1.25rem] border border-white/10 bg-white/5 p-5">
                <p className="text-sm font-semibold text-emerald-400">{item.title}</p>
                <p className="mt-2 text-sm text-slate-400">{item.review?.slice(0, 90)}...</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
