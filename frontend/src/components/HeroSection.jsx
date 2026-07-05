import React, { useState, useRef } from 'react'
import { Search, Sparkles, TrendingUp, Users, Briefcase, ArrowRight, MapPin, Code2 } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const stats = [
  { icon: TrendingUp, label: 'Active Jobs', value: '12,000+', color: 'badge-blue' },
  { icon: Users, label: 'Companies Hiring', value: '1,800+', color: 'badge-purple' },
  { icon: Sparkles, label: 'Candidates Hired', value: '6,400+', color: 'badge-green' },
];

const popularSearches = ['React Developer', 'Product Manager', 'UI Designer', 'Data Scientist', 'DevOps'];

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const heroRef = useRef(null);
  const tagRef = useRef(null);
  const headingRef = useRef(null);
  const subRef = useRef(null);
  const searchRef = useRef(null);
  const popularRef = useRef(null);
  const statsRef = useRef(null);
  const blobsRef = useRef(null);

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  }

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Floating blobs
    gsap.to(blobsRef.current?.querySelectorAll('.blob') || [], {
      y: '+=20',
      x: '+=10',
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 1.5,
    });

    // Main entrance sequence
    tl.fromTo(tagRef.current,
      { opacity: 0, y: 20, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6 }
    )
    .fromTo(headingRef.current.children,
      { opacity: 0, y: 40, clipPath: 'inset(100% 0 0 0)' },
      { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)', duration: 0.7, stagger: 0.12 },
      '-=0.2'
    )
    .fromTo(subRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5 },
      '-=0.3'
    )
    .fromTo(searchRef.current,
      { opacity: 0, y: 20, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5 },
      '-=0.2'
    )
    .fromTo(popularRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4 },
      '-=0.1'
    )
    .fromTo(statsRef.current?.children || [],
      { opacity: 0, y: 20, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.08 },
      '-=0.2'
    );
  }, { scope: heroRef });

  return (
    <section
      ref={heroRef}
      className='hero-gradient relative overflow-hidden border-b border-border pt-20 pb-28'
    >
      {/* Background blobs */}
      <div ref={blobsRef} className='absolute inset-0 pointer-events-none overflow-hidden' aria-hidden>
        <div className='blob absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-30'
          style={{ background: 'radial-gradient(circle, hsl(221 83% 53% / 0.15) 0%, transparent 70%)' }} />
        <div className='blob absolute -bottom-24 -right-24 w-[400px] h-[400px] rounded-full opacity-20'
          style={{ background: 'radial-gradient(circle, hsl(265 89% 68% / 0.12) 0%, transparent 70%)' }} />
        <div className='blob absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.04]'
          style={{ background: 'radial-gradient(circle, hsl(188 85% 40% / 0.15) 0%, transparent 70%)' }} />
      </div>

      {/* Grid pattern overlay */}
      <div className='absolute inset-0 pointer-events-none opacity-[0.02] dark:opacity-[0.04]'
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
        aria-hidden
      />

      <div className='relative z-10 max-w-4xl mx-auto px-4 text-center'>

        {/* Tag badge */}
        <div
          ref={tagRef}
          className='inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold mb-8'
          style={{ opacity: 0 }}
        >
          <Sparkles className='w-3.5 h-3.5' />
          <span>India's #1 Job Platform for Tech Professionals</span>
          <span className='w-1.5 h-1.5 rounded-full bg-primary animate-pulse' />
        </div>

        {/* Heading */}
        <h1
          ref={headingRef}
          className='text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground mb-6'
          style={{ lineHeight: 1.12 }}
        >
          <span className='block' style={{ opacity: 0 }}>Find your way to a</span>
          <span className='block text-gradient' style={{ opacity: 0 }}>Dream Career</span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subRef}
          className='text-muted-foreground text-base sm:text-lg mb-8 max-w-2xl mx-auto leading-relaxed'
          style={{ opacity: 0 }}
        >
          Browse thousands of curated developer, designer, and tech roles from top companies.
          Apply with one click and start your next chapter.
        </p>

        {/* Search Bar */}
        <div
          ref={searchRef}
          className='max-w-2xl mx-auto mb-4'
          style={{ opacity: 0 }}
        >
          <div className='flex items-center bg-card border border-border rounded-xl shadow-lg shadow-black/5 p-1.5 transition-shadow focus-within:shadow-xl focus-within:border-primary/30'>
            <div className='flex items-center flex-1 gap-2.5 px-3'>
              <Search className='w-4.5 h-4.5 text-muted-foreground flex-shrink-0' />
              <input
                type="text"
                placeholder='Job title, keyword, or company...'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && searchJobHandler()}
                className='bg-transparent flex-1 text-foreground placeholder:text-muted-foreground/70 outline-none border-none text-sm py-2 font-medium'
                aria-label="Job search"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className='text-muted-foreground hover:text-foreground text-xs px-1'
                >✕</button>
              )}
            </div>
            <button
              onClick={searchJobHandler}
              className='btn-primary rounded-lg flex items-center gap-1.5 text-sm px-5 py-2.5 flex-shrink-0'
            >
              Search
              <ArrowRight className='w-4 h-4' />
            </button>
          </div>
        </div>

        {/* Popular searches */}
        <div
          ref={popularRef}
          className='flex flex-wrap justify-center gap-2 mb-14'
          style={{ opacity: 0 }}
        >
          <span className='text-xs text-muted-foreground font-medium py-1'>Popular:</span>
          {popularSearches.map((term) => (
            <button
              key={term}
              onClick={() => {
                dispatch(setSearchedQuery(term));
                navigate('/browse');
              }}
              className='text-xs font-medium px-3 py-1 rounded-full bg-muted border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-primary/5 transition-all'
            >
              {term}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div ref={statsRef} className='flex flex-wrap justify-center gap-4'>
          {stats.map(({ icon: Icon, label, value, color }) => (
            <div
              key={label}
              className='flex items-center gap-3 bg-card border border-border px-4 py-3 rounded-xl shadow-sm'
              style={{ opacity: 0 }}
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${color}`}
                style={{ background: 'hsl(var(--primary) / 0.08)' }}>
                <Icon className='w-4 h-4' style={{ color: 'hsl(var(--primary))' }} />
              </div>
              <div className='text-left'>
                <p className='text-foreground font-bold text-sm leading-tight'>{value}</p>
                <p className='text-muted-foreground text-xs'>{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className='absolute bottom-0 left-0 right-0 h-20 pointer-events-none'
        style={{ background: 'linear-gradient(to bottom, transparent, hsl(var(--background)))' }}
        aria-hidden
      />
    </section>
  );
}

export default HeroSection