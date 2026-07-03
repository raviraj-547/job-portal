import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import AdminJobsTable from './AdminJobsTable'
import { useNavigate } from 'react-router-dom' 
import { useDispatch } from 'react-redux' 
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'
import { Plus, Search, Briefcase } from 'lucide-react'
import { motion } from 'framer-motion'

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <div className='min-h-screen bg-[#f8f9fa]'>
      <Navbar />
      <div className='max-w-6xl mx-auto my-10 px-4 pb-16'>
        {/* Header */}
        <motion.div 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8'
        >
            <div className='flex items-center gap-3'>
                <div className='w-10 h-10 rounded-xl bg-[#5d53c4] flex items-center justify-center shadow-sm'>
                    <Briefcase className='w-5 h-5 text-white' />
                </div>
                <div>
                    <h1 className='text-xl font-extrabold text-[#1a1a24]'>
                        Posted Vacancies
                    </h1>
                    <p className='text-[#5e6475] text-xs font-semibold mt-0.5'>List and manage candidate hiring positions</p>
                </div>
            </div>
            <button 
                onClick={() => navigate("/admin/jobs/create")}
                className='btn-pastel-primary rounded-xl px-5 py-2.5 text-xs font-semibold text-white flex items-center justify-center gap-1.5 w-fit cursor-pointer shadow-sm'
            >
                <Plus className='w-4 h-4' />
                New Job Listing
            </button>
        </motion.div>

        {/* Filter Card */}
        <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className='bg-white border border-[#ebedf5] rounded-3xl p-6 space-y-6 shadow-sm'
        >
            {/* Filter Input */}
            <div className='relative max-w-sm'>
                <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a0a6b5]' />
                <input
                    type="text"
                    placeholder="Filter by job title, company..."
                    onChange={(e) => setInput(e.target.value)}
                    className='w-full bg-[#f8f9fa] border border-[#e1e4ed] rounded-xl pl-9 pr-4 py-2 text-xs text-[#1a1a24] placeholder:text-[#a0a6b5] outline-none focus:border-[#5d53c4] focus:bg-white transition-all'
                />
            </div>

            <AdminJobsTable />
        </motion.div>
      </div>
    </div>
  )
}

export default AdminJobs