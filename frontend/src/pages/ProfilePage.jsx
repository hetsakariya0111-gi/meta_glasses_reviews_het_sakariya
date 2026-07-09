import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import api from '../services/api';
import { fetchMe, updateProfile } from '../features/auth/authSlice';

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const [reviews, setReviews] = useState([]);
  const [reviewLoading, setReviewLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '' });
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    if (!user) {
      dispatch(fetchMe());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (!user?.name) return;

    setFormState({ name: user.name, email: user.email || '' });

    let ignore = false;
    async function loadReviews() {
      try {
        const response = await api.get(`/users/${encodeURIComponent(user.name)}/reviews`);
        if (!ignore) {
          setReviews(response.data.data || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (!ignore) {
          setReviewLoading(false);
        }
      }
    }

    loadReviews();
    return () => {
      ignore = true;
    };
  }, [user?.name, user?.email]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaveMessage('');

    const result = await dispatch(updateProfile(formState));
    if (updateProfile.fulfilled.match(result)) {
      setIsEditing(false);
      setSaveMessage('Profile updated successfully.');
    } else {
      setSaveMessage(result.payload || 'Unable to update profile.');
    }
  };

  return (
    <>
      <Helmet>
        <title>Profile | Meta Glasses Reviews</title>
        <meta name="description" content="View and manage your Meta Glasses Reviews profile and submitted reviews." />
      </Helmet>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black text-white">Profile</h1>
              <p className="mt-2 text-slate-400">{user?.name || 'Loading profile...'}</p>
            </div>
            <button onClick={() => setIsEditing((value) => !value)} className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-400 transition hover:bg-emerald-500/20">
              {isEditing ? 'Cancel' : 'Edit profile'}
            </button>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-[1.5rem] border border-white/10 bg-[#0a0e14] p-6">
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm text-slate-400">Name</label>
                    <input value={formState.name} onChange={(event) => setFormState({ ...formState, name: event.target.value })} className="mt-2 w-full rounded-full border border-white/10 bg-white/5 px-4 py-3 text-slate-200 outline-none" />
                  </div>
                  <div>
                    <label className="text-sm text-slate-400">Email</label>
                    <input type="email" value={formState.email} onChange={(event) => setFormState({ ...formState, email: event.target.value })} className="mt-2 w-full rounded-full border border-white/10 bg-white/5 px-4 py-3 text-slate-200 outline-none" />
                  </div>
                  {error ? <p className="text-sm text-rose-400">{error}</p> : null}
                  {saveMessage ? <p className="text-sm text-emerald-400">{saveMessage}</p> : null}
                  <button disabled={loading} type="submit" className="w-full rounded-full bg-emerald-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:opacity-60">
                    {loading ? 'Saving...' : 'Save changes'}
                  </button>
                </form>
              ) : (
                <>
                  <p className="text-sm text-slate-400">Email</p>
                  <p className="mt-2 text-lg font-semibold text-white">{user?.email}</p>
                  <div className="mt-6 rounded-[1rem] border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-300">
                    Your account is ready for discovery, review management, and deeper insights.
                  </div>
                </>
              )}
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-[#0a0e14] p-6">
              <h2 className="text-xl font-semibold text-white">Your reviews</h2>
              {reviewLoading ? <div className="mt-4 h-20 animate-pulse rounded-[1rem] bg-white/5" /> : reviews.length === 0 ? <p className="mt-4 text-slate-400">No submitted reviews yet.</p> : <div className="mt-4 space-y-3">{reviews.map((review) => <div key={review._id} className="rounded-[1rem] border border-white/10 bg-white/5 p-4"><p className="font-semibold text-white">{review.title}</p><p className="mt-1 text-sm text-slate-400">{review.review?.slice(0, 80)}...</p></div>)}</div>}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
