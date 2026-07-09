import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search as SearchIcon } from 'lucide-react';
import api from '../services/api';

export default function SearchPage() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!keyword.trim()) {
        setResults([]);
        return;
      }
      async function search() {
        setLoading(true);
        try {
          const response = await api.get(`/search?keyword=${encodeURIComponent(keyword)}`);
          setResults(response.data.data || []);
        } catch (err) {
          setError('Search failed.');
        } finally {
          setLoading(false);
        }
      }
      search();
    }, 400);

    return () => clearTimeout(timer);
  }, [keyword]);

  return (
    <>
      <Helmet>
        <title>Search Reviews | Meta Glasses Reviews</title>
        <meta name="description" content="Search the review corpus for topics, products, and customer feedback related to Ray-Ban Meta." />
      </Helmet>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute left-4 top-4 text-slate-500" size={18} />
            <input value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="Search reviews, users, countries..." className="w-full rounded-full border border-white/10 bg-[#0a0e14] px-12 py-3 text-slate-200 outline-none" />
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {loading ? [1,2].map((item) => <div key={item} className="h-28 animate-pulse rounded-[1.25rem] border border-white/10 bg-white/5" />) : error ? <div className="rounded-[1.25rem] border border-rose-400/20 bg-rose-500/10 p-4 text-slate-300">Failed to load search results.</div> : results.length === 0 ? <div className="rounded-[1.25rem] border border-white/10 bg-white/5 p-4 text-slate-400">No results yet.</div> : results.map((review) => <div key={review._id} className="rounded-[1.25rem] border border-white/10 bg-white/5 p-5"><p className="font-semibold text-white">{review.title}</p><p className="mt-2 text-sm text-slate-400">{review.review?.slice(0, 120)}...</p></div>)}
          </div>
        </div>
      </section>
    </>
  );
}
