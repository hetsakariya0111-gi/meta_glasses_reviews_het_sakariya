import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, BadgeCheck, Camera, Play, Sparkles, TrendingUp, Zap } from 'lucide-react';
import api from '../services/api';
import { fetchReviews } from '../features/reviews/reviewsSlice';
import Observatory from '../components/Observatory';

const featureCards = [
  { title: 'Live POV feed', description: 'See reviews as if you were wearing the glasses and catching each reaction in real time.', icon: Camera },
  { title: 'Signal splitting', description: 'Complex feedback gets refracted into clear product signals and sentiment patterns.', icon: Sparkles },
  { title: 'Reaction velocity', description: 'Track the moments that matter most as review volume rises and dips.', icon: TrendingUp },
  { title: 'Quiet confidence', description: 'Leave the noise behind and ship with evidence that feels unmistakably clear.', icon: Zap }
];

const reviewSnippets = [
  '“The field of view feels almost cinematic.”',
  '“I noticed the audio syncing instantly.”',
  '“The hands-free flow feels effortless.”',
  '“The camera capture is surprisingly natural.”'
];

export default function HomePage() {
  const dispatch = useDispatch();
  const [stats, setStats] = useState({ reviews: 0, users: 0, rating: 0, helpful: 0 });
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    async function loadData() {
      try {
        const [reviewsRes, verifiedRes, averageRes] = await Promise.all([
          api.get('/reviews?limit=4&sort=-helpful'),
          api.get('/reviews?limit=100'),
          api.get('/stats/average-rating')
        ]);
        setFeatured(reviewsRes.data.data || []);
        setStats({
          reviews: reviewsRes.data.count || 0,
          users: verifiedRes.data.data?.length || 0,
          rating: averageRes.data.averageRating || 0,
          helpful: reviewsRes.data.data?.reduce((sum, review) => sum + Number(review.helpful || 0), 0) || 0
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
    dispatch(fetchReviews({ limit: 4, sort: '-helpful' }));
  }, [dispatch]);

  useEffect(() => {
    const onMove = (event) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const heroStats = useMemo(() => [
    { label: 'Live reviews', value: loading ? '…' : stats.reviews },
    { label: 'Verified users', value: loading ? '…' : stats.users },
    { label: 'Avg rating', value: loading ? '…' : `${stats.rating.toFixed(1)}/5` },
    { label: 'Helpful votes', value: loading ? '…' : stats.helpful }
  ], [loading, stats]);

  return (
    <>
      <Helmet>
        <title>Meta Glasses Reviews | Review intelligence for Ray-Ban Meta</title>
        <meta name="description" content="Explore verified customer feedback for Ray-Ban Meta smart glasses and uncover product insights at scale." />
      </Helmet>


      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="h-[690px] rounded-[3rem] border border-white/10 bg-[#02040f]/90 shadow-[0_40px_140px_rgba(0,0,0,0.5)]">
          <div className="relative h-full overflow-hidden rounded-[3rem]">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-[#050813] to-[#02040d]" />
            <div className="absolute inset-0 opacity-80 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.18),transparent_18%),radial-gradient(circle_at_80%_15%,rgba(245,158,11,0.16),transparent_14%),radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.14),transparent_16%)]" />
            <div className="relative z-20 mx-auto flex h-full max-w-7xl flex-col justify-between px-6 py-8 sm:px-8 md:px-10">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.35em] text-slate-300">
                    <span className="h-2 w-2 rounded-full bg-amber-300" />
                    Seeing through someone else’s eyes
                  </span>
                  <h1 className="mt-6 text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                    Explore the lens of every real-world Meta moment.
                  </h1>
                  <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-400">
                    The observatory surfaces every sentiment fragment so your product team can feel the signal, not just read the score.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link to="/reviews" className="group inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,_#8b5cf6_0%,_#38bdf8_45%,_#f59e0b_100%)] px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.01]">
                      Enter the observatory <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
                    </Link>
                    <button onClick={() => window.scrollTo({ top: window.innerHeight * 0.85, behavior: 'smooth' })} className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-white/20 hover:bg-white/10">
                      Pilot deeper
                    </button>
                  </div>
                </div>
                <div className="space-y-4 rounded-[2rem] border border-white/10 bg-[#020611]/70 p-5 backdrop-blur-xl sm:p-6">
                  <div className="rounded-[1.6rem] border border-white/10 bg-[#050a11]/80 p-4">
                    <p className="text-[11px] uppercase tracking-[0.35em] text-slate-400">Live ticker</p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {heroStats.map((item) => (
                        <div key={item.label} className="glass-card rounded-[1.5rem] p-3">
                          <p className="text-[10px] uppercase tracking-[0.35em] text-slate-500">{item.label}</p>
                          <p className="mt-2 font-mono text-2xl font-semibold text-slate-100">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-[1.6rem] border border-white/10 bg-[#02040c]/90 p-4 text-sm leading-7 text-slate-400">
                    Real-time product signals from the eyewear ecosystem, shown as an ambient narrative instead of a static score.
                  </div>
                </div>
              </div>

              <div className="relative mt-6 flex-1 overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#02050c]/70 shadow-[inset_0_0_80px_rgba(2,8,23,0.45)]">
                <Observatory reviews={featured} onDescend={() => window.scrollTo({ top: window.innerHeight * 0.95, behavior: 'smooth' })} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-slate-400">Viewfinder gallery</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Explore the signal clusters that shape product truth.</h2>
          </div>
          <Link to="/reviews" className="text-sm text-slate-400 transition hover:text-white">Browse full review field</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {loading ? [1, 2, 3, 4].map((item) => (
            <div key={item} className="h-52 animate-pulse rounded-[1.75rem] border border-white/10 bg-white/5" />
          )) : featured.map((review, index) => (
            <article key={review._id} className="glass-card group rounded-[2rem] p-5 transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]" style={{ transform: `rotate(${index % 2 === 0 ? '-1.25deg' : '1.15deg'})` }}>
              <div className="flex items-center justify-between gap-3 text-sm text-slate-400">
                <span>{review.country || 'Unknown'}</span>
                <span className="rounded-full bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.35em] text-slate-300">{review.rating}/5</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">{review.title || 'A tight field note'}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">“{review.review?.slice(0, 110) || 'No review text available.'}…”</p>
              <div className="mt-5 flex items-center justify-between text-sm text-slate-500">
                <span className="inline-flex items-center gap-2"><BadgeCheck size={14} className="text-slate-300" /> {review.name || 'Anonymous'}</span>
                <span className="font-mono text-slate-300">{review.helpful || 0} helpful</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="panel-card rounded-[2.2rem] p-6 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-slate-400">Behind the lens</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">From raw review fragments to ambient product intelligence.</h2>
              <p className="mt-4 max-w-xl text-slate-400">Every signal is translated into a live story about battery, camera, audio, comfort, and privacy so teams can act with nuance.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {featureCards.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="glass-card rounded-[1.4rem] p-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-slate-100">
                      <Icon size={18} />
                    </div>
                    <p className="mt-4 text-sm font-semibold text-white">{feature.title}</p>
                    <p className="mt-2 text-sm leading-7 text-slate-400">{feature.description}</p>
                    <div className="mt-4 h-1.5 rounded-full bg-white/10">
                      <div className="h-1.5 rounded-full bg-[linear-gradient(90deg,_#8b5cf6,_#38bdf8,_#f59e0b)]" style={{ width: `${74 + index * 5}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="glass-card rounded-[2rem] p-6">
            <p className="text-[11px] uppercase tracking-[0.35em] text-slate-400">Field notes</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Authentic feedback presented like a sensor readout.</h2>
            <div className="mt-6 space-y-3">
              {reviewSnippets.map((line) => (
                <div key={line} className="rounded-[1.1rem] border border-white/10 bg-[#080c14] p-4 text-sm leading-7 text-slate-400">
                  {line}
                </div>
              ))}
            </div>
          </div>
          <div className="panel-card rounded-[2rem] bg-[linear-gradient(135deg,_rgba(139,92,246,0.17),_rgba(56,189,248,0.08))] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.35em] text-slate-400">Exposure</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Designed to feel like an instrument readout.</h2>
              </div>
              <button className="rounded-full border border-white/10 bg-white/10 p-3 text-slate-100 transition hover:bg-white/15">
                <Play size={16} />
              </button>
            </div>
            <div className="mt-8 rounded-[1.4rem] border border-white/10 bg-[#04070d]/80 p-5 text-sm leading-8 text-slate-400">
              “The experience feels less like a dashboard and more like looking through a calibrated instrument.”
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="panel-card rounded-[2.2rem] p-6 text-center sm:p-8">
          <p className="text-[11px] uppercase tracking-[0.35em] text-slate-400">Shutter</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Atmosphere matters. The observatory changes with it.</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-400">The same review data can feel different depending on the light, palette and signal context around it.</p>
          <button className="mt-6 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.08]">
            Toggle accent mode
          </button>
        </div>
      </section>
    </>
  );
}
