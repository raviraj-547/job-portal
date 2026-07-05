import React, { useEffect, useState, useRef } from 'react'
import Navbar from '../shared/Navbar'
import AdminJobsTable from './AdminJobsTable'
import { useNavigate } from 'react-router-dom' 
import { useDispatch } from 'react-redux' 
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'
import { Plus, Search, Briefcase } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pageRef = useRef(null);

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]);

  useGSAP(() => {
    if (!pageRef.current) return;
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
    tl.fromTo(pageRef.current.querySelector('.admin-header'),
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 0.5 }
    )
    .fromTo(pageRef.current.querySelector('.admin-card'),
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5 },
        '-=0.3'
    );
  }, { scope: pageRef });

  return (
    <div className='min-h-screen bg-background'>
      <Navbar />
      <div ref={pageRef} className='max-w-6xl mx-auto my-10 px-4 pb-16'>
        {/* Header */}
        <div className='admin-header flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8' style={{ opacity: 0 }}>
            <div className='flex items-center gap-3'>
                <div className='w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shadow-sm flex-shrink-0'>
                    <Briefcase className='w-5 h-5 text-primary' />
                </div>
                <div>
                    <h1 className='text-xl font-extrabold text-foreground tracking-tight'>
                        Posted Vacancies
                    </h1>
                    <p className='text-muted-foreground text-sm mt-0.5'>List and manage candidate hiring positions</p>
                </div>
            </div>
            <button 
                onClick={() => navigate("/admin/jobs/create")}
                className='btn-primary rounded-xl px-5 py-2.5 text-sm font-semibold flex items-center justify-center gap-1.5 w-fit flex-shrink-0 shadow-sm'
            >
                <Plus className='w-4 h-4' />
                New Job Listing
            </button>
        </div>

        {/* Filter Card */}
        <div className='admin-card bg-card border border-border rounded-2xl p-6 space-y-6 shadow-sm' style={{ opacity: 0 }}>
            {/* Filter Input */}
            <div className='relative max-w-sm'>
                <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                <input
                    type="text"
                    placeholder="Filter by job title, company..."
                    onChange={(e) => setInput(e.target.value)}
                    className='input-premium pl-9 text-sm'
                />
            </div>

            <AdminJobsTable />
        </div>
      </div>
    </div>
  )
}

export default AdminJobs