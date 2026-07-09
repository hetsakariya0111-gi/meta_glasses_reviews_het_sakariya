import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>Page not found | Meta Glasses Reviews</title>
        <meta name="description" content="The page you are looking for could not be found." />
      </Helmet>
      <section className="flex min-h-[80vh] items-center justify-center px-4 py-12">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-10 text-center">
          <h1 className="text-4xl font-black text-white">404</h1>
          <p className="mt-3 text-slate-400">The page you requested isn’t available.</p>
          <Link to="/" className="mt-6 inline-block rounded-full bg-emerald-500 px-5 py-3 font-semibold text-slate-950">Back home</Link>
        </div>
      </section>
    </>
  );
}
