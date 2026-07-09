import { Helmet } from 'react-helmet-async';

export default function WriteReviewPage() {
  return (
    <>
      <Helmet>
        <title>Write a Review | Meta Glasses Reviews</title>
        <meta name="description" content="Submit a new Ray-Ban Meta review to Meta Glasses Reviews." />
      </Helmet>
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
          <h1 className="text-3xl font-black text-white">Write a review</h1>
          <form className="mt-8 space-y-4">
            <input className="w-full rounded-full border border-white/10 bg-[#0a0e14] px-4 py-3 text-slate-200 outline-none" placeholder="Title" />
            <input className="w-full rounded-full border border-white/10 bg-[#0a0e14] px-4 py-3 text-slate-200 outline-none" placeholder="Rating (1-5)" />
            <textarea className="min-h-36 w-full rounded-[1.25rem] border border-white/10 bg-[#0a0e14] px-4 py-3 text-slate-200 outline-none" placeholder="Share your experience" />
            <input className="w-full rounded-full border border-white/10 bg-[#0a0e14] px-4 py-3 text-slate-200 outline-none" placeholder="Device name" />
            <label className="flex items-center gap-3 text-sm text-slate-300"><input type="checkbox" /> Verified purchase</label>
            <button className="rounded-full bg-emerald-500 px-5 py-3 font-semibold text-slate-950">Submit review</button>
          </form>
        </div>
      </section>
    </>
  );
}
