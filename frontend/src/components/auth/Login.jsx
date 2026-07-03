import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2, LogIn, Mail, Lock, Briefcase, GraduationCap, Building2, Sparkles, TrendingUp, Users } from 'lucide-react'
import { motion } from 'framer-motion'

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

    const changeEventHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value })

    const submitHandler = async (e) => {
        e.preventDefault()
       try {
    dispatch(setLoading(true));

    const res = await axios.post(
        `${USER_API_END_POINT}/login`,
        input,
        { withCredentials: true }
    );

    dispatch(setLoading(false));

    if (res.data.success) {
        navigate("/");
    }
} catch (error) {
    dispatch(setLoading(false));   // IMPORTANT
    toast.error(error.response?.data?.message || "Login failed");
}
    }

useEffect(() => {
    if (user) {
        navigate("/");
    }
}, [user, navigate]);

    return (
        <div className='min-h-screen flex'>
            {/* ── Left Branding Panel ── */}
            <div className='hidden lg:flex lg:w-5/12 xl:w-1/2 flex-col justify-between relative overflow-hidden bg-[#5d53c4] p-10'>
                {/* Soft background blobs */}
                <div className='absolute top-0 left-0 w-full h-full pointer-events-none'>
                    <div className='absolute top-[-60px] left-[-60px] w-80 h-80 rounded-full bg-white/5' />
                    <div className='absolute bottom-[-80px] right-[-40px] w-96 h-96 rounded-full bg-white/5' />
                    <div className='absolute top-1/2 left-1/3 w-48 h-48 rounded-full bg-white/4' />
                </div>

                {/* Logo */}
                <div className='relative z-10 flex items-center gap-2.5'>
                    <div className='w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center'>
                        <Briefcase className='w-5 h-5 text-white' />
                    </div>
                    <span className='text-white font-bold text-lg'>Job<span className='text-purple-200'>Portal</span></span>
                </div>

                {/* Main copy */}
                <div className='relative z-10 space-y-6'>
                    <div className='inline-flex items-center gap-1.5 bg-white/10 border border-white/20 px-3 py-1.5 rounded-full'>
                        <Sparkles className='w-3.5 h-3.5 text-purple-200' />
                        <span className='text-purple-100 text-xs font-semibold'>India's #1 Job Platform</span>
                    </div>
                    <h2 className='text-3xl xl:text-4xl font-extrabold text-white leading-tight'>
                        Your next great<br />
                        <span className='text-purple-200'>opportunity</span><br />
                        awaits you.
                    </h2>
                    <p className='text-purple-100/80 text-sm leading-relaxed max-w-xs'>
                        Sign in to browse thousands of curated openings from the best companies in India.
                    </p>

                    {/* Stats row */}
                    <div className='flex items-center gap-5 pt-2'>
                        {stats.map(({ icon: Icon, value, label }) => (
                            <div key={label} className='text-center'>
                                <p className='text-white font-bold text-lg leading-none'>{value}</p>
                                <p className='text-purple-200/70 text-[10px] font-semibold mt-1'>{label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom testimonial */}
                <div className='relative z-10 bg-white/8 border border-white/12 rounded-2xl p-4'>
                    <p className='text-purple-100 text-xs leading-relaxed italic'>
                        "Got my dream role in 2 weeks through JobPortal. The filtering is incredible!"
                    </p>
                    <div className='flex items-center gap-2 mt-3'>
                        <div className='w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold'>A</div>
                        <div>
                            <p className='text-white text-xs font-bold'>Arjun Mehta</p>
                            <p className='text-purple-200/60 text-[10px]'>Senior Developer @ Razorpay</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Right Form Panel ── */}
            <div className='flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-16 xl:px-24 bg-[#f8f9fa] min-h-screen'>
                {/* Mobile logo */}
                <div className='lg:hidden flex items-center gap-2 mb-8'>
                    <div className='w-8 h-8 rounded-xl bg-[#5d53c4] flex items-center justify-center'>
                        <Briefcase className='w-4 h-4 text-white' />
                    </div>
                    <span className='font-bold text-[#1a1a24]'>Job<span className='text-[#5d53c4]'>Portal</span></span>
                </div>

                <motion.div
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className='w-full max-w-sm mx-auto'
                >
                    {/* Heading */}
                    <div className='mb-8'>
                        <h1 className='text-2xl font-extrabold text-[#1a1a24]'>Welcome back 👋</h1>
                        <p className='text-[#5e6475] text-sm font-medium mt-1'>Sign in to your JobPortal account</p>
                    </div>

                    <form onSubmit={submitHandler} className='space-y-5'>
                        {/* Email */}
                        <div className='space-y-1.5'>
                            <label className='text-[#5e6475] text-[11px] font-bold uppercase tracking-wider block'>Email Address</label>
                            <div className='relative'>
                                <Mail className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a0a6b5]' />
                                <input
                                    type='email'
                                    name='email'
                                    value={input.email}
                                    onChange={changeEventHandler}
                                    placeholder='you@example.com'
                                    className='w-full bg-white border border-[#e1e4ed] rounded-2xl pl-10 pr-4 py-3 text-sm text-[#1a1a24] placeholder:text-[#c0c6d5] outline-none focus:border-[#5d53c4] focus:ring-2 focus:ring-[#5d53c4]/10 transition-all'
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className='space-y-1.5'>
                            <div className='flex items-center justify-between'>
                                <label className='text-[#5e6475] text-[11px] font-bold uppercase tracking-wider block'>Password</label>
                                <span className='text-[#5d53c4] text-xs font-semibold cursor-pointer hover:underline'>Forgot?</span>
                            </div>
                            <div className='relative'>
                                <Lock className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a0a6b5]' />
                                <input
                                    type='password'
                                    name='password'
                                    value={input.password}
                                    onChange={changeEventHandler}
                                    placeholder='••••••••'
                                    className='w-full bg-white border border-[#e1e4ed] rounded-2xl pl-10 pr-4 py-3 text-sm text-[#1a1a24] placeholder:text-[#c0c6d5] outline-none focus:border-[#5d53c4] focus:ring-2 focus:ring-[#5d53c4]/10 transition-all'
                                />
                            </div>
                        </div>

                        {/* Role selector */}
                        <div className='space-y-2'>
                            <label className='text-[#5e6475] text-[11px] font-bold uppercase tracking-wider block'>I am signing in as</label>
                            <div className='grid grid-cols-2 gap-3'>
                                {[
                                    { value: 'student', label: 'Job Seeker', icon: GraduationCap },
                                    { value: 'recruiter', label: 'Recruiter', icon: Building2 },
                                ].map(({ value, label, icon: Icon }) => (
                                    <label
                                        key={value}
                                        className={`flex flex-col items-center justify-center gap-1.5 py-3.5 px-3 rounded-2xl border-2 cursor-pointer transition-all ${
                                            input.role === value
                                                ? 'border-[#5d53c4] bg-[#5d53c4] text-white shadow-lg shadow-purple-500/20'
                                                : 'border-[#ebedf5] bg-white text-[#5e6475] hover:border-[#5d53c4]/40'
                                        }`}
                                    >
                                        <Icon className={`w-5 h-5 ${input.role === value ? 'text-white' : 'text-[#5d53c4]'}`} />
                                        <span className='text-xs font-bold'>{label}</span>
                                        <input type='radio' name='role' value={value} checked={input.role === value} onChange={changeEventHandler} className='sr-only' />
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type='submit'
                            disabled={loading}
                            className='w-full bg-[#5d53c4] hover:bg-[#4b41b3] text-white font-bold text-sm py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer mt-2'
                        >
                            {loading ? <><Loader2 className='w-4 h-4 animate-spin' /> Signing in...</> : <><LogIn className='w-4 h-4' /> Sign In</>}
                        </button>

                        {/* Divider */}
                        <div className='flex items-center gap-3 py-1'>
                            <div className='flex-1 h-px bg-[#ebedf5]' />
                            <span className='text-[#a0a6b5] text-xs font-semibold'>New here?</span>
                            <div className='flex-1 h-px bg-[#ebedf5]' />
                        </div>

                        <Link to='/signup'>
                            <button
                                type='button'
                                className='w-full bg-white border-2 border-[#ebedf5] hover:border-[#5d53c4]/40 text-[#1a1a24] font-bold text-sm py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer'
                            >
                                Create an account →
                            </button>
                        </Link>
                    </form>
                </motion.div>
            </div>
        </div>
    )
}

export default Login
