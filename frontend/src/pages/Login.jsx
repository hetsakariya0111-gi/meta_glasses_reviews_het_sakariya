import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import toast from 'react-hot-toast'
import { loginUser, reset } from '../store/authSlice'
import { motion } from 'framer-motion'
import { Mail, Lock, AlertCircle, ArrowRight, Github } from 'lucide-react'

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
})

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message || 'Failed to login')
    }
    if (isSuccess || user) {
      navigate('/dashboard')
    }
    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onSubmit = async (values) => {
    await dispatch(loginUser(values))
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-[#09090B] text-[#FAFAFA] relative overflow-hidden px-4">
      {/* Background radial gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-blue-900/5 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-[#18181B] border border-white/[0.08] p-8 rounded-[20px] shadow-2xl">
          <div className="text-center mb-6">
            {/* Minimal glasses icon illustration */}
            <div className="mx-auto w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-[#FAFAFA]">
              Sign in to Meta Glasses Reviews
            </h2>
            <p className="text-xs text-[#A1A1AA] mt-2">
              Enter your credentials to access your SaaS analytics dashboard
            </p>
          </div>

          {/* Social login placeholders */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            <button
              type="button"
              onClick={() => toast.success('Social Sign In is not active.')}
              className="flex items-center justify-center gap-2 border border-white/10 bg-[#111113] hover:bg-[#18181B] text-xs font-semibold py-2.5 rounded-xl transition-colors cursor-pointer"
            >
              <Github className="w-4 h-4" />
              GitHub
            </button>
            <button
              type="button"
              onClick={() => toast.success('Social Sign In is not active.')}
              className="flex items-center justify-center gap-2 border border-white/10 bg-[#111113] hover:bg-[#18181B] text-xs font-semibold py-2.5 rounded-xl transition-colors cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12.24 10.285V13.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.859-3.579-7.859-8s3.53-8 7.859-8c2.46 0 4.105 1.025 5.047 1.926l2.427-2.334C17.955 2.192 15.34 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c6.478 0 10.793-4.537 10.793-10.986 0-.746-.08-1.32-.176-1.886H12.24z" />
              </svg>
              Google
            </button>
          </div>

          <div className="relative flex py-3 items-center mb-4">
            <div className="flex-grow border-t border-white/5"></div>
            <span className="flex-shrink mx-3 text-[10px] text-[#A1A1AA] uppercase tracking-widest font-semibold">Or continue with</span>
            <div className="flex-grow border-t border-white/5"></div>
          </div>

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={onSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="space-y-4">
                {/* Email Input */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-semibold text-[#A1A1AA] uppercase tracking-wider">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#A1A1AA]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <Field
                      name="email"
                      type="email"
                      placeholder="you@domain.com"
                      className={`w-full pl-9 pr-4 py-3 bg-[#111113] border rounded-xl text-sm text-[#FAFAFA] placeholder-zinc-600 focus:outline-none focus:ring-1 transition-all ${
                        errors.email && touched.email
                          ? 'border-red-500/50 focus:ring-red-500/30'
                          : 'border-white/10 focus:ring-blue-600/30 focus:border-blue-600/50'
                      }`}
                    />
                  </div>
                  {errors.email && touched.email && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-1 text-red-500 text-xs mt-1"
                    >
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.email}</span>
                    </motion.div>
                  )}
                </div>

                {/* Password Input */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="block text-[10px] font-semibold text-[#A1A1AA] uppercase tracking-wider">
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#A1A1AA]">
                      <Lock className="w-4 h-4" />
                    </div>
                    <Field
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      className={`w-full pl-9 pr-4 py-3 bg-[#111113] border rounded-xl text-sm text-[#FAFAFA] placeholder-zinc-600 focus:outline-none focus:ring-1 transition-all ${
                        errors.password && touched.password
                          ? 'border-red-500/50 focus:ring-red-500/30'
                          : 'border-white/10 focus:ring-blue-600/30 focus:border-blue-600/50'
                      }`}
                    />
                  </div>
                  {errors.password && touched.password && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-1 text-red-500 text-xs mt-1"
                    >
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.password}</span>
                    </motion.div>
                  )}
                </div>

                {/* Remember Me and Forgot Password Placeholders */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      className="rounded border-white/10 bg-[#111113] text-blue-600 focus:ring-0 w-3.5 h-3.5"
                    />
                    <span className="text-xs text-[#A1A1AA]">Remember me</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => toast.error('Forgot password flow is not configured.')}
                    className="text-xs text-blue-500 hover:text-blue-400 font-medium transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold text-sm shadow-md transition-all hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
                >
                  {isLoading ? (
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </Form>
            )}
          </Formik>

          <div className="text-center mt-8 pt-6 border-t border-white/5 text-xs text-[#A1A1AA]">
            New to Meta Reviews?{' '}
            <Link to="/register" className="text-blue-500 hover:text-blue-400 font-medium transition-colors">
              Create an account
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Login
