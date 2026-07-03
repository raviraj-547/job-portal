import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);

    return (
        <section className='py-16 px-4 bg-[#f8f9fa]'>
            <div className='max-w-7xl mx-auto'>
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className='mb-8'
                >
                    <h2 className='text-2xl md:text-3xl font-extrabold text-[#1a1a24]'>
                        Latest <span className='text-[#5d53c4]'>Job Openings</span>
                    </h2>
                    <p className='text-[#5e6475] mt-1 text-xs font-semibold'>Handpicked, freshly posted vacancies</p>
                </motion.div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                    {allJobs.length <= 0
                        ? (
                            <div className='col-span-3 text-center py-16 bg-white border border-[#ebedf5] rounded-3xl'>
                                <p className='text-[#5e6475] font-semibold text-sm'>No jobs listed at the moment.</p>
                                <p className='text-[#a0a6b5] text-xs mt-1'>Check back later for updates!</p>
                            </div>
                        )
                        : allJobs.slice(0, 6).map((job, index) => (
                            <motion.div
                                key={job._id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                            >
                                <LatestJobCards job={job} />
                            </motion.div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default LatestJobs