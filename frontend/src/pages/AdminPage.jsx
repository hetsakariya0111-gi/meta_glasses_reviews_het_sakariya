import { Helmet } from 'react-helmet-async';

export default function AdminPage() {
  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Meta Glasses Reviews</title>
        <meta name="description" content="Admin dashboard for managing product reviews and users." />
      </Helmet>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
          <h1 className="text-3xl font-black text-white">Admin dashboard</h1>
          <p className="mt-2 text-slate-400">Manage reviews, users, and moderation workflows.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[{label:'Total reviews', value:'24'}, {label:'Total users', value:'11'}, {label:'Pending flags', value:'2'}].map((item) => (
              <div key={item.label} className="rounded-[1.25rem] border border-white/10 bg-[#0a0e14] p-5"><p className="text-sm text-slate-400">{item.label}</p><p className="mt-3 text-2xl font-bold text-white">{item.value}</p></div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
