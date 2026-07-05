import React, { useState, useRef, useEffect } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2, Briefcase, Menu, X, Sun, Moon, ChevronDown } from 'lucide-react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import { useTheme } from '@/context/ThemeContext'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Navbar = () => {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Scroll listener for enhanced glass effect
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // GSAP entrance animation
  useGSAP(() => {
    gsap.fromTo(navRef.current,
      { y: -64, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.1 }
    );
  }, []);

  // Mobile menu animation
  useGSAP(() => {
    if (!mobileMenuRef.current) return;
    if (mobileOpen) {
      gsap.fromTo(mobileMenuRef.current,
        { y: -12, opacity: 0, height: 0 },
        { y: 0, opacity: 1, height: 'auto', duration: 0.3, ease: 'power2.out' }
      );
    }
  }, { dependencies: [mobileOpen] });

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
        setMobileOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to logout.");
    }
  }

  const isActive = (path) => location.pathname === path;

  const studentLinks = [
    { to: '/', label: 'Home' },
    { to: '/jobs', label: 'Jobs' },
    { to: '/browse', label: 'Browse' },
  ];

  const recruiterLinks = [
    { to: '/admin/companies', label: 'Companies' },
    { to: '/admin/jobs', label: 'Jobs' },
  ];

  const navLinks = user?.role === 'recruiter' ? recruiterLinks : studentLinks;

  return (
    <nav
      ref={navRef}
      className={`navbar-glass sticky top-0 z-50 ${scrolled ? 'shadow-sm' : ''}`}
      style={{ opacity: 0 }}
    >
      <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4 lg:px-6'>

        {/* Logo */}
        <Link to="/" className='flex items-center gap-2.5 group' aria-label="JobPortal Home">
          <div className='w-8 h-8 rounded-lg flex items-center justify-center shadow-sm transition-transform duration-200 group-hover:scale-105 flex-shrink-0'
            style={{ background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)' }}>
            <Briefcase className='w-4 h-4 text-white' />
          </div>
          <span className='text-base font-bold tracking-tight text-foreground hidden sm:block'>
            Job<span className='text-gradient'>Portal</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className='hidden md:flex items-center gap-1'>
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className={`nav-link px-3 py-2 rounded-lg text-sm font-medium transition-colors inline-block ${
                  isActive(to)
                    ? 'text-foreground bg-muted'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className='flex items-center gap-2'>

          {/* Theme Toggle */}
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

          {/* Auth */}
          {!user ? (
            <div className='hidden sm:flex items-center gap-2'>
              <Link to="/login">
                <button className='btn-ghost text-sm h-9 px-3 rounded-lg font-medium'>Login</button>
              </Link>
              <Link to="/signup">
                <button className='btn-primary text-sm h-9 px-4 rounded-lg'>Sign Up</button>
              </Link>
            </div>
          ) : (
            <UserMenu user={user} logoutHandler={logoutHandler} />
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(v => !v)}
            className='md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-muted-foreground hover:bg-muted transition-colors'
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className='w-5 h-5' /> : <Menu className='w-5 h-5' />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          ref={mobileMenuRef}
          className='md:hidden border-t border-border bg-background/95 backdrop-blur-md'
          style={{ overflow: 'hidden' }}
        >
          <div className='max-w-7xl mx-auto px-4 py-3 space-y-1'>
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive(to)
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                {label}
              </Link>
            ))}

            {!user && (
              <div className='grid grid-cols-2 gap-2 pt-2 border-t border-border mt-2'>
                <Link to="/login" onClick={() => setMobileOpen(false)}>
                  <button className='w-full btn-secondary text-sm h-9 rounded-lg'>Login</button>
                </Link>
                <Link to="/signup" onClick={() => setMobileOpen(false)}>
                  <button className='w-full btn-primary text-sm h-9 rounded-lg'>Sign Up</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

/* ─── Theme Toggle Button ─────────────────────────────── */
const ThemeToggle = ({ theme, toggleTheme }) => {
  const btnRef = useRef(null);
  const iconRef = useRef(null);

  const handleClick = () => {
    // Quick rotation animation
    gsap.to(iconRef.current, {
      rotate: 360,
      duration: 0.4,
      ease: 'power2.inOut',
      onComplete: () => gsap.set(iconRef.current, { rotate: 0 })
    });
    toggleTheme();
  };

  return (
    <button
      ref={btnRef}
      onClick={handleClick}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className='w-9 h-9 flex items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors'
    >
      <span ref={iconRef} className='flex items-center justify-center'>
        {theme === 'dark'
          ? <Sun className='w-4.5 h-4.5' />
          : <Moon className='w-4.5 h-4.5' />
        }
      </span>
    </button>
  );
};

/* ─── User Avatar Dropdown ────────────────────────────── */
const UserMenu = ({ user, logoutHandler }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className='flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg hover:bg-muted transition-colors group' aria-label="User menu">
          <div className='w-7 h-7 rounded-full ring-2 ring-border group-hover:ring-primary/30 transition-all'>
            <Avatar className="h-full w-full">
              <AvatarImage
                src={user?.profile?.profilePhoto}
                alt={user?.fullname}
              />
            </Avatar>
          </div>
          <ChevronDown className='w-3.5 h-3.5 text-muted-foreground hidden sm:block transition-transform group-data-[state=open]:rotate-180' />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-64 p-0 rounded-xl border-border shadow-xl bg-card overflow-hidden"
      >
        {/* User info header */}
        <div className='p-4 border-b border-border bg-muted/30'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 rounded-full ring-2 ring-border flex-shrink-0'>
              <Avatar className="h-full w-full">
                <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
              </Avatar>
            </div>
            <div className='min-w-0 flex-1'>
              <p className='font-semibold text-sm text-foreground truncate'>{user?.fullname}</p>
              <p className='text-xs text-muted-foreground truncate'>{user?.email}</p>
            </div>
          </div>
          {user?.profile?.bio && (
            <p className='text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed'>{user.profile.bio}</p>
          )}
        </div>

        {/* Menu items */}
        <div className='p-1.5'>
          {user?.role === 'student' && (
            <Link to="/profile">
              <button className='flex w-full items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-all font-medium'>
                <User2 className='w-4 h-4' />
                View Profile
              </button>
            </Link>
          )}
          <button
            onClick={logoutHandler}
            className='flex w-full items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all font-medium mt-0.5'
          >
            <LogOut className='w-4 h-4' />
            Sign out
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Navbar