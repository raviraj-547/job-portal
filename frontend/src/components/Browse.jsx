import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const Browse = () => {
    useGetAllJobs();
    const { allJobs } = useSelector(store => store.job);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        }
    }, [])

    return (
        <div className='min-h-screen bg-[#f8f9fa]'>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10 px-4 pb-16'>
                {/* Header */}
                <div className='flex items-center gap-3 mb-8'>
                    <div className='w-9 h-9 rounded-xl bg-[#5d53c4] flex items-center justify-center shadow-sm'>
                        <Search className='w-4.5 h-4.5 text-white' />
                    </div>
                    <div>
                        <h1 className='text-xl font-extrabold text-[#1a1a24]'>
                            Search Results
                        </h1>
                        <p className='text-[#5e6475] text-xs font-semibold'>
                            Found <span className='text-[#5d53c4]'>{allJobs.length}</span> active vacancies
                        </p>
                    </div>
                </div>

                {/* Grid */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                    {allJobs.length <= 0 ? (
                        <div className='col-span-3 bg-white border border-[#ebedf5] rounded-3xl p-16 text-center shadow-sm'>
                            <Search className='w-10 h-10 text-slate-400 mx-auto mb-3' />
                            <p className='text-[#5e6475] font-bold text-sm'>No vacancies found</p>
                            <p className='text-[#a0a6b5] text-xs mt-1'>Try adjusting your search queries</p>
                        </div>
                    ) : (
                        allJobs.map((job, index) => (
                            <motion.div
                                key={job._id}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.35, delay: index * 0.04 }}
                            >
                                <Job job={job} />
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default Browse