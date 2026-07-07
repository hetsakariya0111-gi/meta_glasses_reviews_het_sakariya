import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import toast from 'react-hot-toast'
import { loginUser, reset } from '../store/authSlice'
import { motion } from 'framer-motion'
import { FiMail, FiLock, FiLogIn, FiAlertCircle } from 'react-icons/fi'

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
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-950 text-white relative overflow-hidden px-4">
      {/* Glowing details */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="glass-panel p-8 rounded-3xl shadow-2xl border border-white/10">
          <div className="text-center mb-8">
            <h2 className="font-display text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className="text-sm text-gray-400 mt-2">
              Sign in to manage and share your reviews
            </p>
          </div>

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={onSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="space-y-5">
                {/* Email Input */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <FiMail className="w-4 h-4" />
                    </div>
                    <Field
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      className={`w-full pl-10 pr-4 py-3 bg-gray-900/60 border rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                        errors.email && touched.email
                          ? 'border-red-500/50 focus:ring-red-500/30'
                          : 'border-white/10 focus:ring-purple-500/30 focus:border-purple-500/50'
                      }`}
                    />
                  </div>
                  {errors.email && touched.email && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-1 text-red-400 text-xs mt-1"
                    >
                      <FiAlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.email}</span>
                    </motion.div>
                  )}
                </div>

                {/* Password Input */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <FiLock className="w-4 h-4" />
                    </div>
                    <Field
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      className={`w-full pl-10 pr-4 py-3 bg-gray-900/60 border rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                        errors.password && touched.password
                          ? 'border-red-500/50 focus:ring-red-500/30'
                          : 'border-white/10 focus:ring-purple-500/30 focus:border-purple-500/50'
                      }`}
                    />
                  </div>
                  {errors.password && touched.password && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-1 text-red-400 text-xs mt-1"
                    >
                      <FiAlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.password}</span>
                    </motion.div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white py-3 rounded-xl font-semibold text-sm shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 transition-all hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? (
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  ) : (
                    <>
                      <FiLogIn className="w-4 h-4" />
                      Sign In
                    </>
                  )}
                </button>
              </Form>
            )}
          </Formik>

          <div className="text-center mt-8 pt-6 border-t border-white/5 text-sm text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
              Sign Up
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Login
