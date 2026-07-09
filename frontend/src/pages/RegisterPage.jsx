import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Helmet } from 'react-helmet-async';
import { registerUser } from '../features/auth/authSlice';

const schema = Yup.object({
  name: Yup.string().min(2, 'Too short').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(8, 'At least 8 chars').matches(/(?=.*[A-Z])/, 'Must include uppercase').matches(/(?=.*[0-9])/, 'Must include a number').required('Required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Required')
});

export default function RegisterPage() {
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  if (isAuthenticated) return <Navigate to="/profile" replace />;

  return (
    <>
      <Helmet>
        <title>Register | Meta Glasses Reviews</title>
        <meta name="description" content="Create an account to contribute and manage Ray-Ban Meta reviews." />
      </Helmet>

      <section className="flex min-h-[80vh] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20">
          <h1 className="text-3xl font-black text-white">Create your account</h1>
          <Formik initialValues={{ name: '', email: '', password: '', confirmPassword: '' }} validationSchema={schema} onSubmit={(values) => dispatch(registerUser({ name: values.name, email: values.email, password: values.password }))}>
            <Form className="mt-8 space-y-4">
              <div>
                <Field name="name" placeholder="Name" className="w-full rounded-full border border-white/10 bg-[#0a0e14] px-4 py-3 text-slate-200 outline-none" />
                <ErrorMessage name="name" component="div" className="mt-2 text-sm text-rose-400" />
              </div>
              <div>
                <Field name="email" type="email" placeholder="Email" className="w-full rounded-full border border-white/10 bg-[#0a0e14] px-4 py-3 text-slate-200 outline-none" />
                <ErrorMessage name="email" component="div" className="mt-2 text-sm text-rose-400" />
              </div>
              <div>
                <Field name="password" type="password" placeholder="Password" className="w-full rounded-full border border-white/10 bg-[#0a0e14] px-4 py-3 text-slate-200 outline-none" />
                <ErrorMessage name="password" component="div" className="mt-2 text-sm text-rose-400" />
              </div>
              <div>
                <Field name="confirmPassword" type="password" placeholder="Confirm password" className="w-full rounded-full border border-white/10 bg-[#0a0e14] px-4 py-3 text-slate-200 outline-none" />
                <ErrorMessage name="confirmPassword" component="div" className="mt-2 text-sm text-rose-400" />
              </div>
              {error ? <div className="text-sm text-rose-400">{error}</div> : null}
              <button disabled={loading} type="submit" className="w-full rounded-full bg-emerald-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:opacity-60">{loading ? 'Creating account...' : 'Register'}</button>
            </Form>
          </Formik>
          <div className="mt-6 text-sm text-slate-400">
            <Link to="/login" className="text-emerald-400">Already have an account? Login</Link>
          </div>
        </div>
      </section>
    </>
  );
}
