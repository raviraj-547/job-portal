import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2, UserPlus, Mail, Lock, User, Phone, Briefcase, GraduationCap, Building2, Sparkles, Shield, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

const perks = [
    { icon: Zap, text: 'Apply to jobs instantly with 1 click' },
    { icon: Shield, text: 'Your data is always private & secure' },
    { icon: Sparkles, text: 'AI-powered job recommendations' },
]

const Signup = () => {
    const [input, setInput] = useState({ fullname: '', email: '', phoneNumber: '', password: '', role: '', file: '' })
    const { loading, user } = useSelector(store => store.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const changeEventHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value })
    const changeFileHandler = (e) => setInput({ ...input, file: e.target.files?.[0] })

   const submitHandler = async (e) => {
    e.preventDefault();

    try {
        dispatch(setLoading(true));

        const res = await axios.post(
            `${USER_API_END_POINT}/register`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            }
        );

        toast.success(res.data.message);
        navigate("/login");
    } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Signup failed");
    } finally {
        dispatch(setLoading(false));
    }
};

    useEffect(() => {
    if (user) {
        navigate("/");
    }
}, [user, navigate]);
    
    const fields = [
        { name: 'fullname',    label: 'Full Name',     type: 'text',     placeholder: 'Raviraj Somavat', icon: User },
        { name: 'email',       label: 'Email Address', type: 'email',    placeholder: 'you@example.com', icon: Mail },
        { name: 'phoneNumber', label: 'Phone Number',  type: 'text',     placeholder: '9876543210',      icon: Phone },
        { name: 'password',    label: 'Password',      type: 'password', placeholder: '••••••••',        icon: Lock },
    ]

    return (
        <div className='min-h-screen flex'>
            {/* ── Left Branding Panel ── */}
            <div className='hidden lg:flex lg:w-5/12 xl:w-1/2 flex-col justify-between relative overflow-hidden bg-[#5d53c4] p-10'>
                {/* Soft bg blobs */}
                <div className='absolute inset-0 pointer-events-none'>
                    <div className='absolute top-[-80px] right-[-60px] w-96 h-96 rounded-full bg-white/5' />
                    <div className='absolute bottom-[-60px] left-[-40px] w-80 h-80 rounded-full bg-white/5' />
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
                        <span className='text-purple-100 text-xs font-semibold'>Join 50,000+ professionals</span>
                    </div>
                    <h2 className='text-3xl xl:text-4xl font-extrabold text-white leading-tight'>
                        Start your career<br />
                        journey<br />
                        <span className='text-purple-200'>today.</span>
                    </h2>
                    <p className='text-purple-100/80 text-sm leading-relaxed max-w-xs'>
                        Create a free account and get matched with top companies in minutes.
                    </p>

                    {/* Perks list */}
                    <div className='space-y-3 pt-2'>
                        {perks.map(({ icon: Icon, text }) => (
                            <div key={text} className='flex items-center gap-3'>
                                <div className='w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0'>
                                    <Icon className='w-3.5 h-3.5 text-white' />
                                </div>
                                <span className='text-purple-100/90 text-sm'>{text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom free badge */}
                <div className='relative z-10 bg-white/8 border border-white/12 rounded-2xl p-4 flex items-center gap-3'>
                    <div className='w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0'>
                        <Sparkles className='w-5 h-5 text-purple-200' />
                    </div>
                    <div>
                        <p className='text-white font-bold text-sm'>It's completely free</p>
                        <p className='text-purple-200/70 text-xs mt-0.5'>No credit card required. Ever.</p>
                    </div>
                </div>
            </div>

            {/* ── Right Form Panel ── */}
            <div className='flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-16 xl:px-20 bg-[#f8f9fa] min-h-screen py-12'>
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
                    <div className='mb-7'>
                        <h1 className='text-2xl font-extrabold text-[#1a1a24]'>Create account ✨</h1>
                        <p className='text-[#5e6475] text-sm font-medium mt-1'>Fill in the details below to get started</p>
                    </div>

                    <form onSubmit={submitHandler} className='space-y-4'>
                        {/* Text fields */}
                        {fields.map(({ name, label, type, placeholder, icon: Icon }) => (
                            <div key={name} className='space-y-1.5'>
                                <label className='text-[#5e6475] text-[11px] font-bold uppercase tracking-wider block'>{label}</label>
                                <div className='relative'>
                                    <Icon className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a0a6b5]' />
                                    <input
                                        type={type}
                                        name={name}
                                        value={input[name]}
                                        onChange={changeEventHandler}
                                        placeholder={placeholder}
                                        className='w-full bg-white border border-[#e1e4ed] rounded-2xl pl-10 pr-4 py-3 text-sm text-[#1a1a24] placeholder:text-[#c0c6d5] outline-none focus:border-[#5d53c4] focus:ring-2 focus:ring-[#5d53c4]/10 transition-all'
                                    />
                                </div>
                            </div>
                        ))}

                        {/* Role selector */}
                        <div className='space-y-2'>
                            <label className='text-[#5e6475] text-[11px] font-bold uppercase tracking-wider block'>I am joining as</label>
                            <div className='grid grid-cols-2 gap-3'>
                                {[
                                    { value: 'student',   label: 'Job Seeker', icon: GraduationCap },
                                    { value: 'recruiter', label: 'Recruiter',  icon: Building2 },
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

                        {/* Avatar upload */}
                        <div className='space-y-1.5'>
                            <label className='text-[#5e6475] text-[11px] font-bold uppercase tracking-wider block'>Profile Photo (optional)</label>
                            <label className='flex items-center gap-3 p-3 rounded-2xl border-2 border-dashed border-[#e1e4ed] bg-white cursor-pointer hover:border-[#5d53c4]/50 transition-all group'>
                                <div className='w-9 h-9 rounded-xl bg-[#f1efff] flex items-center justify-center flex-shrink-0'>
                                    <UserPlus className='w-4 h-4 text-[#5d53c4]' />
                                </div>
                                <div className='flex-1 min-w-0'>
                                    <p className='text-xs font-semibold text-[#a0a6b5] group-hover:text-[#5d53c4] truncate transition-colors'>
                                        {input.file ? input.file.name : 'Click to upload photo'}
                                    </p>
                                    <p className='text-[10px] text-[#c0c6d5] mt-0.5'>PNG, JPG up to 5MB</p>
                                </div>
                                <input type='file' accept='image/*' onChange={changeFileHandler} className='hidden' />
                            </label>
                        </div>

                        {/* Submit */}
                        <button
                            type='submit'
                            disabled={loading}
                            className='w-full bg-[#5d53c4] hover:bg-[#4b41b3] text-white font-bold text-sm py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer mt-2'
                        >
                            {loading ? <><Loader2 className='w-4 h-4 animate-spin' /> Creating account...</> : <><UserPlus className='w-4 h-4' /> Create Account</>}
                        </button>

                        {/* Divider */}
                        <div className='flex items-center gap-3 py-1'>
                            <div className='flex-1 h-px bg-[#ebedf5]' />
                            <span className='text-[#a0a6b5] text-xs font-semibold'>Have an account?</span>
                            <div className='flex-1 h-px bg-[#ebedf5]' />
                        </div>

                        <Link to='/login'>
                            <button
                                type='button'
                                className='w-full bg-white border-2 border-[#ebedf5] hover:border-[#5d53c4]/40 text-[#1a1a24] font-bold text-sm py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer'
                            >
                                Sign in instead →
                            </button>
                        </Link>
                    </form>
                </motion.div>
            </div>
        </div>
    )
}

export default Signup
