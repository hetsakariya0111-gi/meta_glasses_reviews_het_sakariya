import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser, reset } from '../store/authSlice'
import toast from 'react-hot-toast'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logoutUser())
    dispatch(reset())
    toast.success('Logged out successfully!')
    navigate('/')
  }

  return (
    <header className='bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-xl sticky top-0 z-50'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-20'>
          <Link to='/' className='flex items-center gap-2'>
            <div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg'>
              MR
            </div>
            <span className='text-2xl font-extrabold tracking-tight'>
              Meta Reviews
            </span>
          </Link>
          
          <nav className='hidden md:flex items-center gap-8'>
            <Link 
              to='/reviews' 
              className='text-gray-300 hover:text-white font-medium transition-colors flex items-center gap-1'
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Reviews
            </Link>
            
            {user ? (
              <>
                <Link 
                  to='/create-review' 
                  className='text-gray-300 hover:text-white font-medium transition-colors flex items-center gap-1'
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Write Review
                </Link>
                
                <Link 
                  to='/my-reviews' 
                  className='text-gray-300 hover:text-white font-medium transition-colors flex items-center gap-1'
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  My Reviews
                </Link>
                
                <Link 
                  to='/analytics' 
                  className='text-gray-300 hover:text-white font-medium transition-colors flex items-center gap-1'
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Analytics
                </Link>
                
                <Link 
                  to='/dashboard' 
                  className='text-gray-300 hover:text-white font-medium transition-colors flex items-center gap-1'
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2a2 2 0 01-2-2H4a2 2 0 01-2 2v-2a2 2 0 01-2-2v-2a2 2 0 012-2h2a2 2 0 012-2v-2a2 2 0 012-2h2a2 2 0 012-2v2z" />
                  </svg>
                  Dashboard
                </Link>
                
                <div className="flex items-center gap-4 pl-4 border-l border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <span className="hidden lg:block font-medium">
                      {user?.name}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className='bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-red-900/30 transition-all duration-200'
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link 
                  to='/login' 
                  className='text-gray-300 hover:text-white font-medium transition-colors'
                >
                  Login
                </Link>
                <Link
                  to='/register'
                  className='bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-blue-900/30 transition-all duration-200'
                >
                  Get Started
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
