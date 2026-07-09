import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Helmet } from 'react-helmet-async';
import { loginUser } from '../features/auth/authSlice';

const schema = Yup.object({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required')
});

export default function LoginPage() {
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  if (isAuthenticated) return <Navigate to="/profile" replace />;

  return (
    <>
      <Helmet>
        <title>Login | Meta Glasses Reviews</title>
        <meta name="description" content="Sign in to Meta Glasses Reviews and manage your review activity." />
      </Helmet>

      <section className="flex min-h-[80vh] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="page-shell w-full max-w-md rounded-[2rem] p-8 shadow-2xl shadow-black/20">
          <h1 className="text-3xl font-black text-white">Welcome back</h1>
          <p className="mt-2 text-sm text-slate-400">Access your reviews, profile, and insights.</p>
          <Formik initialValues={{ email: '', password: '' }} validationSchema={schema} onSubmit={(values) => dispatch(loginUser(values))}>
            <Form className="mt-8 space-y-4">
              <div>
                <Field name="email" type="email" placeholder="Email" className="w-full rounded-full border border-white/10 bg-[#0a0e14] px-4 py-3 text-slate-200 outline-none" />
                <ErrorMessage name="email" component="div" className="mt-2 text-sm text-rose-400" />
              </div>
              <div>
                <Field name="password" type="password" placeholder="Password" className="w-full rounded-full border border-white/10 bg-[#0a0e14] px-4 py-3 text-slate-200 outline-none" />
                <ErrorMessage name="password" component="div" className="mt-2 text-sm text-rose-400" />
              </div>
              {error ? <div className="text-sm text-rose-400">{error}</div> : null}
              <button disabled={loading} type="submit" className="w-full rounded-full bg-emerald-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:opacity-60">{loading ? 'Signing in...' : 'Login'}</button>
            </Form>
          </Formik>
          <div className="mt-6 flex flex-col gap-2 text-sm text-slate-400">
            <Link to="/forgot-password" className="text-emerald-400">Forgot password?</Link>
            <Link to="/register" className="text-emerald-400">Don’t have an account? Register</Link>
          </div>
        </div>
      </section>
    </>
  );
}
