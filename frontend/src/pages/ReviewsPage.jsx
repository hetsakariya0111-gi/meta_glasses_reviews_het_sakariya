import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, SlidersHorizontal, Star, BadgeCheck, Sparkles } from 'lucide-react';
import { fetchReviews, setFilters } from '../features/reviews/reviewsSlice';
import FilterSelect from '../components/FilterSelect';

export default function ReviewsPage() {
  const dispatch = useDispatch();
  const { items, loading, error, pagination, filters } = useSelector((state) => state.reviews);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const params = {
      page,
      limit: 8,
      ...filters,
      ...(filters.verifiedPurchase ? { verifiedPurchase: filters.verifiedPurchase } : {})
    };
    dispatch(fetchReviews(params));
  }, [dispatch, page, filters]);

  const handleInputChange = (event) => {
    dispatch(setFilters({ [event.target.name]: event.target.value }));
    setPage(1);
  };

  const reviewCards = useMemo(() => items || [], [items]);

  return (
    <>
      <Helmet>
        <title>Browse Reviews | Meta Glasses Reviews</title>
        <meta name="description" content="Browse verified Ray-Ban Meta review insights with filters for rating, country, helpfulness and more." />
      </Helmet>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">Browse reviews</p>
            <h1 className="mt-2 text-3xl font-black text-white">Discover what users really think.</h1>
          </div>
          <div className="flex items-center gap-3 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300 shadow-[0_0_30px_rgba(34,197,94,0.08)]">
            <Sparkles size={16} className="text-emerald-400" />
            Smart filters tuned to live review signals
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="panel-card rounded-[1.75rem] p-5 shadow-[0_0_40px_rgba(34,197,94,0.08)]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-3 text-slate-500" size={18} />
              <input name="search" value={filters.search} onChange={handleInputChange} placeholder="Search reviews" className="soft-input w-full rounded-full px-10 py-2.5 text-sm outline-none ring-0 transition focus:border-emerald-400/40" />
            </div>
            <div className="mt-4 space-y-4">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <div>
                  <label className="mb-2 block text-sm text-slate-400">Min rating</label>
                  <input name="minRating" value={filters.minRating} onChange={handleInputChange} className="soft-input w-full rounded-full px-3 py-2.5 text-sm outline-none transition focus:border-emerald-400/40" />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-slate-400">Max rating</label>
                  <input name="maxRating" value={filters.maxRating} onChange={handleInputChange} className="soft-input w-full rounded-full px-3 py-2.5 text-sm outline-none transition focus:border-emerald-400/40" />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm text-slate-400">Country</label>
                <input name="country" value={filters.country} onChange={handleInputChange} className="soft-input w-full rounded-full px-3 py-2.5 text-sm outline-none transition focus:border-emerald-400/40" />
              </div>
              <FilterSelect
                label="Verified purchase"
                value={filters.verifiedPurchase}
                onChange={(value) => {
                  dispatch(setFilters({ verifiedPurchase: value }));
                  setPage(1);
                }}
                placeholder="Any"
                options={[
                  { value: '', label: 'Any' },
                  { value: 'True', label: 'Verified only' },
                  { value: 'False', label: 'Unverified only' }
                ]}
              />
              <FilterSelect
                label="Sort"
                value={filters.sort}
                onChange={(value) => {
                  dispatch(setFilters({ sort: value }));
                  setPage(1);
                }}
                placeholder="Newest"
                options={[
                  { value: '-createdAt', label: 'Newest first' },
                  { value: 'rating', label: 'Rating ascending' },
                  { value: '-rating', label: 'Rating descending' },
                  { value: '-helpful', label: 'Most helpful' }
                ]}
              />
            </div>
          </aside>

          <div>
            {loading ? (
              <div className="grid gap-4 md:grid-cols-2">
                {[1,2,3,4].map((item) => <div key={item} className="h-44 animate-pulse rounded-[1.5rem] border border-white/10 bg-white/5" />)}
              </div>
            ) : error ? (
              <div className="rounded-[1.5rem] border border-rose-400/20 bg-rose-500/10 p-8 text-center text-slate-300">Failed to load reviews. Please retry.</div>
            ) : reviewCards.length === 0 ? (
              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-8 text-center text-slate-400">No reviews found.</div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {reviewCards.map((review) => (
                  <article key={review._id} className="glass-card group rounded-[1.75rem] p-6 transition hover:-translate-y-1 hover:border-emerald-400/30 hover:bg-emerald-500/10">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-emerald-400">{review.country || 'Unknown'}</p>
                        <h2 className="mt-2 text-xl font-semibold text-white">{review.title}</h2>
                      </div>
                      <div className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-400">{review.rating}/5</div>
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-sm text-slate-400">
                      <Star size={14} className="text-emerald-400" />
                      <span>{review.name || 'Verified reviewer'}</span>
                      <span className="text-slate-500">•</span>
                      <span>{review.date || 'Recent'}</span>
                    </div>
                    <p className="mt-4 text-sm text-slate-400">{review.review?.slice(0, 140)}...</p>
                    <div className="mt-6 flex items-center justify-between text-sm text-slate-500">
                      <span className="inline-flex items-center gap-2"><BadgeCheck size={14} className="text-emerald-400" /> {review.helpful || 0} helpful</span>
                      <Link to={`/reviews/${review._id}`} className="font-semibold text-emerald-400 transition group-hover:translate-x-1">View Details →</Link>
                    </div>
                  </article>
                ))}
              </div>
            )}

            <div className="mt-8 flex justify-center gap-3">
              <button disabled={!pagination.prev} onClick={() => setPage((value) => Math.max(1, value - 1))} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 disabled:opacity-50">Previous</button>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-400">Page {page}</span>
              <button disabled={!pagination.next} onClick={() => setPage((value) => value + 1)} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 disabled:opacity-50">Next</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
