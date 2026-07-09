import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Moon, Sun, Sparkles } from 'lucide-react';
import { toggleTheme } from '../features/ui/uiSlice';
import { logout as logoutUser } from '../features/auth/authSlice';

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector((state) => state.ui.theme);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#060b14]/85 shadow-[0_8px_32px_rgba(2,8,23,0.24)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="rounded-full border border-emerald-400/25 bg-emerald-500/10 p-2 text-emerald-400">
            <Sparkles size={18} />
          </div>
          <div>
            <p className="text-lg font-semibold text-white">Meta Glasses Reviews</p>
            <p className="text-xs text-slate-400">Review intelligence for Ray-Ban Meta</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'text-emerald-400' : 'transition hover:text-white')}>Home</NavLink>
          <NavLink to="/reviews" className={({ isActive }) => (isActive ? 'text-emerald-400' : 'transition hover:text-white')}>Reviews</NavLink>
          <NavLink to="/stats" className={({ isActive }) => (isActive ? 'text-emerald-400' : 'transition hover:text-white')}>Stats</NavLink>
          {!isAuthenticated ? (
            <NavLink to="/login" className={({ isActive }) => (isActive ? 'text-emerald-400' : 'transition hover:text-white')}>Login</NavLink>
          ) : (
            <>
              <NavLink to="/profile" className={({ isActive }) => (isActive ? 'text-emerald-400' : 'transition hover:text-white')}>Profile</NavLink>
              {user?.role === 'admin' ? <NavLink to="/admin" className={({ isActive }) => (isActive ? 'text-emerald-400' : 'transition hover:text-white')}>Admin</NavLink> : null}
            </>
          )}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => dispatch(toggleTheme())}
            className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-200 transition hover:border-emerald-400/50 hover:text-emerald-400"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          {isAuthenticated ? (
            <button onClick={handleLogout} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-rose-400/50 hover:text-rose-300">
              Logout
            </button>
          ) : (
            <Link to="/reviews" className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-400 transition hover:bg-emerald-500/20">
              Get Started
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
