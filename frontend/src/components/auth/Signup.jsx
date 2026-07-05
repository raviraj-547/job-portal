import React, { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2, Mail, Lock, User, Briefcase, GraduationCap, Building2, UploadCloud, ArrowLeft, ArrowRight, ImagePlus } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: ""
  });
  const [fileName, setFileName] = useState("");
  const { loading, user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formRef = useRef(null);
  const panelRef = useRef(null);
  const fileInputRef = useRef(null);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, file });
      setFileName(file.name);
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!input.role) {
      toast.error("Please select a role (Job Seeker or Recruiter).");
      return;
    }

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { 'Content-Type': "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to register.");
    } finally {
      dispatch(setLoading(false));
    }
  }

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    if (panelRef.current) {
      tl.fromTo(panelRef.current,
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7 }
      );
    }
    if (formRef.current) {
      tl.fromTo(formRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.05, duration: 0.4 },
        '-=0.4'
      );
    }
  }, []);

  return (
    <div className='min-h-screen flex bg-background'>

      {/* Left form panel */}
      <div className='flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-16 xl:px-24 bg-background min-h-screen py-10 overflow-y-auto'>
        {/* Mobile logo */}
        <div className='lg:hidden flex items-center gap-2 mb-8'>
          <div className='w-8 h-8 rounded-xl flex items-center justify-center'
            style={{ background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)' }}>
            <Briefcase className='w-4 h-4 text-white' />
          </div>
          <span className='font-bold text-foreground'>Job<span className='text-gradient'>Portal</span></span>
        </div>

        <div ref={formRef} className='w-full max-w-md mx-auto'>
          {/* Header */}
          <div className='mb-8' style={{ opacity: 0 }}>
            <Link to="/login" className='inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground mb-4 transition-colors'>
              <ArrowLeft className='w-3.5 h-3.5' /> Back to Login
            </Link>
            <h1 className='text-2xl font-extrabold text-foreground tracking-tight'>Create an account</h1>
            <p className='text-muted-foreground text-sm mt-1.5'>Join JobPortal and accelerate your career</p>
          </div>

          <form onSubmit={submitHandler} className='space-y-4'>
            {/* Full Name */}
            <div className='space-y-1.5' style={{ opacity: 0 }}>
              <label className='text-xs font-semibold text-foreground uppercase tracking-wider block'>
                Full Name
              </label>
              <div className='relative'>
                <User className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                <input
                  type='text'
                  name='fullname'
                  value={input.fullname}
                  onChange={changeEventHandler}
                  placeholder='John Doe'
                  className='input-premium pl-10'
                  required
                />
              </div>
            </div>

            {/* Email & Phone Grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4' style={{ opacity: 0 }}>
              <div className='space-y-1.5'>
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
                    placeholder='john@example.com'
                    className='input-premium pl-10'
                    required
                  />
                </div>
              </div>

              <div className='space-y-1.5'>
                <label className='text-xs font-semibold text-foreground uppercase tracking-wider block'>
                  Phone Number
                </label>
                <div className='relative'>
                  <span className='absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-semibold'>+91</span>
                  <input
                    type='text'
                    name='phoneNumber'
                    value={input.phoneNumber}
                    onChange={changeEventHandler}
                    placeholder='9876543210'
                    className='input-premium pl-10'
                    required
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div className='space-y-1.5' style={{ opacity: 0 }}>
              <label className='text-xs font-semibold text-foreground uppercase tracking-wider block'>
                Password
              </label>
              <div className='relative'>
                <Lock className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                <input
                  type='password'
                  name='password'
                  value={input.password}
                  onChange={changeEventHandler}
                  placeholder='••••••••'
                  className='input-premium pl-10'
                  required
                />
              </div>
            </div>

            {/* Role selector */}
            <div className='space-y-2 pt-1' style={{ opacity: 0 }}>
              <label className='text-xs font-semibold text-foreground uppercase tracking-wider block'>
                I am signing up as a
              </label>
              <div className='grid grid-cols-2 gap-3'>
                {[
                  { value: 'student', label: 'Job Seeker', icon: GraduationCap },
                  { value: 'recruiter', label: 'Recruiter', icon: Building2 },
                ].map(({ value, label, icon: Icon }) => (
                  <label
                    key={value}
                    className={`flex flex-col items-center justify-center gap-1.5 py-3 px-3 rounded-xl border-2 cursor-pointer transition-all ${
                      input.role === value
                        ? 'border-primary bg-primary text-white shadow-md shadow-primary/20'
                        : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:bg-muted'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${input.role === value ? 'text-white' : 'text-primary'}`} />
                    <span className='text-xs font-semibold'>{label}</span>
                    <input type='radio' name='role' value={value} checked={input.role === value} onChange={changeEventHandler} className='sr-only' />
                  </label>
                ))}
              </div>
            </div>

            {/* Profile Photo Upload */}
            <div className='space-y-1.5 pt-1' style={{ opacity: 0 }}>
              <label className='text-xs font-semibold text-foreground uppercase tracking-wider block'>
                Profile Photo <span className='text-muted-foreground lowercase normal-case font-medium'>(Optional)</span>
              </label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className='flex items-center gap-3 p-3 border-2 border-dashed border-border rounded-xl bg-card hover:bg-muted transition-colors cursor-pointer group'
              >
                <div className='w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0'>
                  {fileName ? <ImagePlus className='w-4 h-4 text-primary' /> : <UploadCloud className='w-4 h-4 text-primary' />}
                </div>
                <div className='flex-1 min-w-0'>
                  <p className='text-sm font-semibold text-foreground truncate'>
                    {fileName || 'Upload a photo'}
                  </p>
                  <p className='text-xs text-muted-foreground'>JPEG, PNG up to 2MB</p>
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="hidden"
              />
            </div>

            {/* Submit */}
            <button
              type='submit'
              disabled={loading}
              className='btn-primary w-full flex items-center justify-center gap-2 py-3.5 text-sm rounded-xl mt-4'
              style={{ opacity: 0 }}
            >
              {loading
                ? <><Loader2 className='w-4 h-4 animate-spin' /> Creating account...</>
                : 'Create Account'
              }
            </button>
            
            <p className='text-center text-xs text-muted-foreground mt-4' style={{ opacity: 0 }}>
              Already have an account? <Link to="/login" className='text-primary font-semibold hover:underline'>Sign in</Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right branding panel */}
      <div
        ref={panelRef}
        className='hidden lg:flex lg:w-5/12 xl:w-1/2 flex-col justify-between relative overflow-hidden'
        style={{
          background: 'linear-gradient(145deg, #0c4a6e 0%, #4c1d95 50%, #1e3a8a 100%)',
          opacity: 0
        }}
      >
        <div className='absolute inset-0 pointer-events-none overflow-hidden'>
          <div className='absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/5 blur-xl' />
          <div className='absolute bottom-10 left-10 w-96 h-96 rounded-full bg-white/5 blur-xl' />
        </div>
        <div className='absolute inset-0 opacity-[0.06]'
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />

        <div className='relative z-10 p-10 flex flex-col h-full'>
          <div className='flex items-center gap-2.5 ml-auto'>
            <span className='text-white font-bold text-lg tracking-tight'>
              Job<span className='text-blue-200'>Portal</span>
            </span>
            <div className='w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center'>
              <Briefcase className='w-5 h-5 text-white' />
            </div>
          </div>

          <div className='mt-auto space-y-6'>
            <h2 className='text-3xl xl:text-4xl font-extrabold text-white leading-tight tracking-tight'>
              Fast-track your<br />
              <span className='text-blue-200'>professional journey</span>.
            </h2>
            <div className='space-y-4 pt-4 border-t border-white/10'>
              {[
                { title: 'One-click apply', desc: 'Save time by using your profile to apply instantly.' },
                { title: 'Curated matches', desc: 'Get recommendations based on your skills and preferences.' },
                { title: 'Direct contact', desc: 'Connect directly with recruiters from top companies.' },
              ].map((item, idx) => (
                <div key={idx} className='flex gap-3'>
                  <div className='w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5'>
                    <div className='w-2 h-2 rounded-full bg-blue-300' />
                  </div>
                  <div>
                    <h3 className='text-white font-bold text-sm'>{item.title}</h3>
                    <p className='text-blue-200/70 text-xs mt-0.5'>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
