import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser, reset } from '../store/authSlice'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, LogOut, Plus, BarChart3, LayoutDashboard, MessageSquare, User, Glasses } from 'lucide-react'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const { user } = useSelector((state) => state.auth)
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
    { to: '/reviews', label: 'Reviews', icon: <MessageSquare className="w-4 h-4" />, public: true },
    { to: '/create-review', label: 'Write Review', icon: <Plus className="w-4 h-4" />, public: false },
    { to: '/my-reviews', label: 'My Reviews', icon: <User className="w-4 h-4" />, public: false },
    { to: '/analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" />, public: false },
    { to: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" />, public: false },
  ]

  const filteredLinks = navLinks.filter(link => link.public || user)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#09090B]/80 backdrop-blur-md text-[#FAFAFA]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-[#111113] group-hover:border-white/20 transition-all duration-200">
              <Glasses className="h-5 w-5 text-blue-500" />
            </div>
            <span className="font-display text-lg font-bold tracking-tight text-[#FAFAFA]">
              Meta Glasses Reviews
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {filteredLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 hover:text-[#FAFAFA] ${
                  isActive(link.to) ? 'text-[#FAFAFA]' : 'text-[#A1A1AA]'
                }`}
              >
                {link.icon}
                {link.label}
                {isActive(link.to) && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-4 right-4 h-[2px] bg-blue-600"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3 border-l border-white/[0.08] pl-4">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-full bg-[#18181B] border border-white/10 flex items-center justify-center font-semibold text-xs text-[#FAFAFA]">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-[#A1A1AA] hidden lg:block">
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 border border-white/10 bg-[#111113] hover:bg-[#18181B] text-[#FAFAFA] px-3.5 py-1.5 rounded-xl text-xs font-semibold shadow-sm transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 border-l border-white/[0.08] pl-4">
                <Link
                  to="/login"
                  className="text-sm font-medium text-[#A1A1AA] hover:text-[#FAFAFA] px-3.5 py-2 rounded-lg hover:bg-white/[0.04] transition-all"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-[#FAFAFA] px-4.5 py-2 rounded-xl text-sm font-semibold shadow-md shadow-blue-900/10 transition-all hover:scale-[1.02]"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Actions and Hamburger Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg border border-white/5 bg-[#111113] text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors cursor-pointer"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
            className="md:hidden border-t border-white/[0.08] bg-[#09090B] overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {filteredLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive(link.to)
                      ? 'bg-blue-500/10 text-blue-500'
                      : 'text-[#A1A1AA] hover:bg-white/[0.04]'
                  }`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}

              <div className="pt-4 border-t border-white/[0.08] mt-4 space-y-3">
                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 px-4 py-1">
                      <div className="h-9 w-9 rounded-full bg-[#18181B] border border-white/10 flex items-center justify-center font-semibold text-sm">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-[#FAFAFA]">{user.name}</div>
                        <div className="text-xs text-[#A1A1AA]">{user.email}</div>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 border border-white/10 bg-[#111113] hover:bg-[#18181B] text-[#FAFAFA] py-2.5 rounded-xl text-sm font-semibold cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center text-sm font-medium text-[#A1A1AA] hover:text-[#FAFAFA] py-2.5 rounded-xl bg-white/[0.04]"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-[#FAFAFA] py-2.5 rounded-xl text-sm font-semibold"
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
