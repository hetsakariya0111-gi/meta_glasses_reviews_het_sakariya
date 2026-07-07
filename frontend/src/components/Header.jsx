import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser, reset } from '../store/authSlice'
import { useTheme } from '../context/ThemeContext'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiLogOut, FiPlus, FiBarChart2, FiGrid, FiMessageSquare, FiSun, FiMoon, FiUser } from 'react-icons/fi'
import { FaGlasses } from 'react-icons/fa'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const { user } = useSelector((state) => state.auth)
  const { theme, toggleTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    dispatch(logoutUser())
    dispatch(reset())
    toast.success('Logged out successfully!')
    navigate('/')
    setIsOpen(false)
  }

  const isActive = (path) => location.pathname === path

  const navLinks = [
    { to: '/reviews', label: 'Reviews', icon: <FiMessageSquare className="w-4 h-4" />, public: true },
    { to: '/create-review', label: 'Write Review', icon: <FiPlus className="w-4 h-4" />, public: false },
    { to: '/my-reviews', label: 'My Reviews', icon: <FiUser className="w-4 h-4" />, public: false },
    { to: '/analytics', label: 'Analytics', icon: <FiBarChart2 className="w-4 h-4" />, public: false },
    { to: '/dashboard', label: 'Dashboard', icon: <FiGrid className="w-4 h-4" />, public: false },
  ]

  const filteredLinks = navLinks.filter(link => link.public || user)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-gray-950/80 backdrop-blur-md text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform duration-200">
              <FaGlasses className="h-5 w-5 text-white" />
            </div>
            <span className="font-display text-xl font-bold tracking-tight bg-gradient-to-r from-white via-gray-200 to-purple-400 bg-clip-text text-transparent">
              Meta Reviews
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {filteredLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 hover:text-purple-400 ${
                  isActive(link.to) ? 'text-purple-400' : 'text-gray-300'
                }`}
              >
                {link.icon}
                {link.label}
                {isActive(link.to) && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-purple-500"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-white/10 text-gray-300 hover:text-purple-400 transition-colors cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </button>

            {user ? (
              <div className="flex items-center gap-3 border-l border-white/10 pl-4">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center font-semibold text-sm border border-purple-400/30">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-200 hidden lg:block">
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-md shadow-purple-950/20 transition-all duration-200 hover:scale-105 cursor-pointer"
                >
                  <FiLogOut className="w-3.5 h-3.5" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 border-l border-white/10 pl-4">
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1.5 rounded-lg text-sm font-semibold shadow-md shadow-purple-950/20 transition-all hover:scale-105"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Actions and Hamburger Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-white/10 text-gray-300 transition-colors cursor-pointer"
            >
              {theme === 'dark' ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-white/10 text-gray-300 transition-colors cursor-pointer"
            >
              {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 bg-gray-950/95 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {filteredLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2.5 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive(link.to)
                      ? 'bg-purple-500/20 text-purple-400 border-l-2 border-purple-500'
                      : 'text-gray-300 hover:bg-white/5'
                  }`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}

              <div className="pt-4 border-t border-white/10 mt-4 space-y-3">
                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 px-4 py-1">
                      <div className="h-9 w-9 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center font-semibold text-sm">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">{user.name}</div>
                        <div className="text-xs text-gray-400">{user.email}</div>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-lg text-sm font-semibold cursor-pointer"
                    >
                      <FiLogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center text-sm font-medium text-gray-300 hover:text-white py-2.5 rounded-lg bg-white/5"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-lg text-sm font-semibold"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header
