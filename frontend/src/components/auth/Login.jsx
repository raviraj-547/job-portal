import React, { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2, LogIn, Mail, Lock, Briefcase, GraduationCap, Building2, Sparkles, TrendingUp, Users, ArrowRight } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const stats = [
  { icon: TrendingUp, value: '12K+', label: 'Active Jobs' },
  { icon: Building2, value: '1.8K+', label: 'Companies' },
  { icon: Users, value: '6K+', label: 'Hired' },
]

const Login = () => {
  const [input, setInput] = useState({ email: '', password: '', role: '' })
  const { loading, user } = useSelector(store => store.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const formRef = useRef(null)
  const panelRef = useRef(null)

  const changeEventHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value })

  const submitHandler = async (e) => {
    e.preventDefault()
    if (!input.role) {
      toast.error("Please select whether you are a Job Seeker or a Recruiter.");
      return;
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `${USER_API_END_POINT}/login`,
        input,
        { withCredentials: true, timeout: 60000 }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
        toast.error("Server is waking up, please try again in a moment.");
      } else {
        toast.error(error.response?.data?.message || "Login failed. Please try again.");
      }
    } finally {
      dispatch(setLoading(false));
    }
  }

  useEffect(() => {
    dispatch(setLoading(false));
    if (user) navigate("/");
  }, [user, navigate, dispatch]);

  // GSAP entrance
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    if (panelRef.current) {
      tl.fromTo(panelRef.current,
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7 }
      );
    }
    if (formRef.current) {
      tl.fromTo(formRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.07, duration: 0.5 },
        '-=0.4'
      );
    }
  }, []);

  return (
    <div className='min-h-screen flex bg-background'>

      {/* Left branding panel */}
      <div
        ref={panelRef}
        className='hidden lg:flex lg:w-5/12 xl:w-1/2 flex-col justify-between relative overflow-hidden'
        style={{
          background: 'linear-gradient(145deg, #1e3a8a 0%, #4c1d95 50%, #0c4a6e 100%)',
          opacity: 0
        }}
      >
        {/* Blob decorations */}
        <div className='absolute inset-0 pointer-events-none overflow-hidden'>
          <div className='absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/5 blur-xl' />
          <div className='absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-white/5 blur-xl' />
          <div className='absolute top-1/2 left-1/3 w-48 h-48 rounded-full bg-white/3 blur-2xl' />
        </div>

        {/* Grid overlay */}
        <div className='absolute inset-0 opacity-[0.06]'
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />

        <div className='relative z-10 p-10 flex flex-col justify-between h-full'>
          {/* Logo */}
          <div className='flex items-center gap-2.5'>
            <div className='w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center'>
              <Briefcase className='w-5 h-5 text-white' />
            </div>
            <span className='text-white font-bold text-lg tracking-tight'>
              Job<span className='text-blue-200'>Portal</span>
            </span>
          </div>

          {/* Main copy */}
          <div className='space-y-6'>
            <div className='inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-3.5 py-2 rounded-full'>
              <Sparkles className='w-3.5 h-3.5 text-blue-200' />
              <span className='text-blue-100 text-xs font-semibold'>India's #1 Job Platform</span>
            </div>
            <h2 className='text-3xl xl:text-4xl font-extrabold text-white leading-tight tracking-tight'>
              Your next great<br />
              <span className='text-blue-200'>opportunity</span><br />
              awaits you.
            </h2>
            <p className='text-blue-100/75 text-sm leading-relaxed max-w-xs'>
              Sign in to browse thousands of curated openings from the best companies in India.
            </p>

            {/* Stats */}
            <div className='flex items-center gap-6 pt-2'>
              {stats.map(({ value, label }) => (
                <div key={label}>
                  <p className='text-white font-bold text-lg leading-none'>{value}</p>
                  <p className='text-blue-200/70 text-xs font-medium mt-1'>{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          <div className='bg-white/8 backdrop-blur-sm border border-white/12 rounded-2xl p-5'>
            <p className='text-blue-100 text-sm leading-relaxed italic'>
              "Got my dream role in 2 weeks through JobPortal. The filtering is incredible!"
            </p>
            <div className='flex items-center gap-3 mt-4'>
              <div className='w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold flex-shrink-0'>A</div>
              <div>
                <p className='text-white text-xs font-semibold'>Arjun Mehta</p>
                <p className='text-blue-200/60 text-[11px]'>Senior Developer @ Razorpay</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className='flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-16 xl:px-24 bg-background min-h-screen'>
        {/* Mobile logo */}
        <div className='lg:hidden flex items-center gap-2 mb-8'>
          <div className='w-8 h-8 rounded-xl flex items-center justify-center'
            style={{ background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)' }}>
            <Briefcase className='w-4 h-4 text-white' />
          </div>
          <span className='font-bold text-foreground'>Job<span className='text-gradient'>Portal</span></span>
        </div>

        <div ref={formRef} className='w-full max-w-sm mx-auto'>
          {/* Heading */}
          <div className='mb-8' style={{ opacity: 0 }}>
            <h1 className='text-2xl font-extrabold text-foreground tracking-tight'>Welcome back 👋</h1>
            <p className='text-muted-foreground text-sm mt-1.5'>Sign in to your JobPortal account</p>
          </div>

          <form onSubmit={submitHandler} className='space-y-5'>
            {/* Email */}
            <div className='space-y-1.5' style={{ opacity: 0 }}>
              <label className='text-xs font-semibold text-foreground uppercase tracking-wider block'>
                Email Address
              </label>
              <div className='relative'>
                <Mail className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                <input
                  type='email'
                  name='email'
                  value={input.email}
                  onChange={changeEventHandler}
                  placeholder='you@example.com'
                  className='input-premium pl-10'
                  autoComplete='email'
                />
              </div>
            </div>

            {/* Password */}
            <div className='space-y-1.5' style={{ opacity: 0 }}>
              <div className='flex items-center justify-between'>
                <label className='text-xs font-semibold text-foreground uppercase tracking-wider block'>
                  Password
                </label>
                <span className='text-xs font-medium text-primary cursor-pointer hover:underline'>Forgot?</span>
              </div>
              <div className='relative'>
                <Lock className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                <input
                  type='password'
                  name='password'
                  value={input.password}
                  onChange={changeEventHandler}
                  placeholder='••••••••'
                  className='input-premium pl-10'
                  autoComplete='current-password'
                />
              </div>
            </div>

            {/* Role selector */}
            <div className='space-y-2' style={{ opacity: 0 }}>
              <label className='text-xs font-semibold text-foreground uppercase tracking-wider block'>
                I am signing in as
              </label>
              <div className='grid grid-cols-2 gap-3'>
                {[
                  { value: 'student', label: 'Job Seeker', icon: GraduationCap },
                  { value: 'recruiter', label: 'Recruiter', icon: Building2 },
                ].map(({ value, label, icon: Icon }) => (
                  <label
                    key={value}
                    className={`flex flex-col items-center justify-center gap-2 py-4 px-3 rounded-xl border-2 cursor-pointer transition-all ${
                      input.role === value
                        ? 'border-primary bg-primary text-white shadow-lg shadow-primary/20'
                        : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:bg-muted'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${input.role === value ? 'text-white' : 'text-primary'}`} />
                    <span className='text-xs font-semibold'>{label}</span>
                    <input type='radio' name='role' value={value} checked={input.role === value} onChange={changeEventHandler} className='sr-only' />
                  </label>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              type='submit'
              disabled={loading}
              className='btn-primary w-full flex items-center justify-center gap-2 py-3.5 text-sm rounded-xl'
              style={{ opacity: 0 }}
            >
              {loading
                ? <><Loader2 className='w-4 h-4 animate-spin' /> Signing in...</>
                : <><LogIn className='w-4 h-4' /> Sign In</>
              }
            </button>

            {/* Divider */}
            <div className='flex items-center gap-3' style={{ opacity: 0 }}>
              <div className='flex-1 h-px bg-border' />
              <span className='text-muted-foreground text-xs font-medium'>New here?</span>
              <div className='flex-1 h-px bg-border' />
            </div>

            <Link to='/signup' style={{ opacity: 0, display: 'block' }}>
              <button
                type='button'
                className='btn-secondary w-full flex items-center justify-center gap-2 py-3.5 text-sm rounded-xl'
              >
                Create an account
                <ArrowRight className='w-4 h-4' />
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login
