import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { BarChart, Bar, CartesianGrid, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { fetchStats } from '../features/stats/statsSlice';

const demoBar = [
  { name: '1★', count: 2 },
  { name: '2★', count: 5 },
  { name: '3★', count: 9 },
  { name: '4★', count: 15 },
  { name: '5★', count: 20 }
];

const demoLine = [
  { month: 'Jan', avg: 3.7 },
  { month: 'Feb', avg: 4.1 },
  { month: 'Mar', avg: 4.0 },
  { month: 'Apr', avg: 4.3 },
  { month: 'May', avg: 4.4 }
];

export default function StatsPage() {
  const dispatch = useDispatch();
  const { overview, loading, error } = useSelector((state) => state.stats);

  useEffect(() => {
    dispatch(fetchStats());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Analytics Dashboard | Meta Glasses Reviews</title>
        <meta name="description" content="Explore product analytics for Ray-Ban Meta reviews including ratings distribution, monthly trend, and country insights." />
      </Helmet>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">Analytics</p>
          <h1 className="mt-2 text-3xl font-black text-white">Public review performance at a glance.</h1>
        </div>

        {loading ? <div className="h-40 animate-pulse rounded-[2rem] border border-white/10 bg-white/5" /> : error ? <div className="rounded-[1.5rem] border border-rose-400/20 bg-rose-500/10 p-6 text-slate-300">Failed to load analytics.</div> : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              { label: 'Average rating', value: overview.average?.averageRating?.toFixed(1) || '0.0' },
              { label: 'Positive reviews', value: `${overview.positive?.percentage || 0}%` },
              { label: 'Verified purchases', value: `${overview.verified?.percentage || 0}%` },
              { label: 'Top reviewers', value: overview.topReviewers?.length || 0 }
            ].map((item) => (
              <div key={item.label} className="rounded-[1.75rem] border border-emerald-400/20 bg-gradient-to-br from-emerald-500/10 to-slate-900 p-6 shadow-[0_0_40px_rgba(34,197,94,0.08)]">
                <p className="text-sm text-slate-400">{item.label}</p>
                <p className="mt-3 text-3xl font-bold text-white">{item.value}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 grid gap-6 xl:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold text-white">Rating distribution</h2>
            <div className="mt-6 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={demoBar}>
                  <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Bar dataKey="count" fill="#22c55e" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold text-white">Monthly trend</h2>
            <div className="mt-6 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={demoLine}>
                  <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="avg" stroke="#14b8a6" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold text-white">Country share</h2>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={[{ name: 'US', value: 41 }, { name: 'UK', value: 24 }, { name: 'DE', value: 18 }, { name: 'Others', value: 17 }]} dataKey="value" nameKey="name" innerRadius={70} outerRadius={110} fill="#22c55e" />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </>
  );
}
