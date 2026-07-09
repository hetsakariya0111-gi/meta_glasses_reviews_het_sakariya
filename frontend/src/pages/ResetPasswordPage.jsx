import { Helmet } from 'react-helmet-async';

export default function ResetPasswordPage() {
  return (
    <>
      <Helmet>
        <title>Reset Password | Meta Glasses Reviews</title>
        <meta name="description" content="Set a new password for your Meta Glasses Reviews account." />
      </Helmet>
      <section className="flex min-h-[80vh] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/5 p-8">
          <h1 className="text-3xl font-black text-white">Choose a new password</h1>
          <form className="mt-8 space-y-4">
            <input className="w-full rounded-full border border-white/10 bg-[#0a0e14] px-4 py-3 text-slate-200 outline-none" placeholder="New password" />
            <input className="w-full rounded-full border border-white/10 bg-[#0a0e14] px-4 py-3 text-slate-200 outline-none" placeholder="Confirm password" />
            <button className="w-full rounded-full bg-emerald-500 px-4 py-3 font-semibold text-slate-950">Update password</button>
          </form>
        </div>
      </section>
    </>
  );
}
