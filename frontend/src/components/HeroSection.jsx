import React, { useState } from 'react'
import { Search, Sparkles, TrendingUp, Users, ArrowRight } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const stats = [
    { icon: TrendingUp, label: 'Active Jobs', value: '12K+', color: 'pastel-badge-purple' },
    { icon: Users, label: 'Partner Brands', value: '1.8K+', color: 'pastel-badge-green' },
    { icon: Sparkles, label: 'Candidates Hired', value: '6.4K+', color: 'pastel-badge-orange' },
]

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='pastel-gradient-hero relative overflow-hidden pt-16 pb-24 border-b border-[#ebedf5]'>
            <div className='relative z-10 max-w-5xl mx-auto px-4 text-center'>
                
                {/* Friendly Lilac Tag */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='inline-flex items-center gap-1.5 px-4 py-2 rounded-full pastel-badge-purple text-xs font-semibold mb-6'
                >
                    <Sparkles className='w-3.5 h-3.5' />
                    <span>The Friendly Way to Land Your Dream Role</span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className='text-4xl md:text-6xl font-extrabold leading-tight tracking-tight text-[#1a1a24] mb-6'
                >
                    Find your way to a <br />
                    <span className='text-[#5d53c4] relative'>
                        Dream Career
                        <span className='absolute bottom-1 left-0 w-full h-2.5 bg-[#e8e5ff] -z-10 rounded-full' />
                    </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className='text-[#5e6475] text-sm md:text-base mb-8 max-w-xl mx-auto leading-relaxed'
                >
                    Browse thousands of curated developer, designer, and tech roles. Apply with one simple click and start your onboarding.
                </motion.p>

                {/* Friendly Search Container */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className='flex items-center max-w-xl mx-auto bg-white border border-[#e1e4ed] p-1.5 rounded-2xl shadow-lg shadow-purple-950/5'
                >
                    <div className='flex items-center flex-1 gap-2 px-3'>
                        <Search className='w-4.5 h-4.5 text-[#5e6475] flex-shrink-0' />
                        <input
                            type="text"
                            placeholder='Search title, keyword or company...'
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && searchJobHandler()}
                            className='bg-transparent w-full text-[#1a1a24] placeholder:text-[#a0a6b5] outline-none border-none text-xs py-2'
                        />
                    </div>
                    <button
                        onClick={searchJobHandler}
                        className='btn-pastel-primary rounded-xl px-5 py-2.5 text-xs font-semibold text-white whitespace-nowrap'
                    >
                        Search
                    </button>
                </motion.div>

                {/* Stats Panel */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className='flex flex-wrap justify-center gap-6 mt-12'
                >
                    {stats.map(({ icon: Icon, label, value, color }) => (
                        <div key={label} className='flex items-center gap-2.5 bg-white border border-[#ebedf5] p-3 rounded-2xl shadow-sm'>
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${color}`}>
                                <Icon className='w-4 h-4' />
                            </div>
                            <div className='text-left'>
                                <p className='text-[#1a1a24] font-bold text-sm leading-none'>{value}</p>
                                <p className='text-[#a0a6b5] text-[10px] font-semibold mt-0.5'>{label}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>

            </div>
        </div>
    )
}

export default HeroSection