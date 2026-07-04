import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Jobs = () => {
    useGetAllJobs();
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        // #region agent log
        fetch('http://127.0.0.1:7688/ingest/48fa31b3-06f2-4b31-be74-84d918315c47',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'7985e6'},body:JSON.stringify({sessionId:'7985e6',location:'Jobs.jsx:mount',message:'Jobs page mounted',data:{allJobsCount:allJobs?.length,hasUseGetAllJobsHook:true},timestamp:Date.now(),hypothesisId:'B',runId:'post-fix'})}).catch(()=>{});
        // #endregion
    }, []);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery]);

    return (
        <div className='min-h-screen bg-[#f8f9fa]'>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-8 px-4 pb-16'>
                {/* Header */}
                <div className='mb-6'>
                    <h1 className='text-xl font-extrabold text-[#1a1a24]'>
                        Find Your Next <span className='text-[#5d53c4]'>Opportunity</span>
                    </h1>
                    <p className='text-[#5e6475] text-xs font-semibold mt-1'>
                        {filterJobs.length} active job listings found
                    </p>
                </div>

                <div className='flex gap-6'>
                    {/* Sidebar */}
                    <aside className='w-72 flex-shrink-0'>
                        <FilterCard />
                    </aside>

                    {/* Content */}
                    <main className='flex-1 min-w-0'>
                        {filterJobs.length <= 0 ? (
                            <div className='bg-white border border-[#ebedf5] rounded-3xl p-16 text-center shadow-sm'>
                                <Briefcase className='w-10 h-10 text-slate-400 mx-auto mb-3' />
                                <p className='text-[#5e6475] font-bold text-sm'>No jobs matching selection</p>
                                <p className='text-[#a0a6b5] text-xs mt-1'>Try clearing your filter criteria</p>
                            </div>
                        ) : (
                            <div className='h-[calc(100vh-200px)] overflow-y-auto pr-2'>
                                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                                    <AnimatePresence>
                                        {filterJobs.map((job, index) => (
                                            <motion.div
                                                key={job?._id}
                                                initial={{ opacity: 0, y: 15 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                transition={{ duration: 0.3, delay: index * 0.03 }}
                                            >
                                                <Job job={job} />
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    )
}

export default Jobs