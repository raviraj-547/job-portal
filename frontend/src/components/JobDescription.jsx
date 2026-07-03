import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Navbar from './shared/Navbar';
import { motion } from 'framer-motion';
import {
    MapPin, Banknote, Briefcase, Users, Calendar, Clock,
    CheckCircle2, Zap, Building2, ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to apply.");
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    const details = [
        { icon: MapPin, label: 'Location', value: singleJob?.location },
        { icon: Briefcase, label: 'Job Type', value: singleJob?.jobType },
        { icon: Banknote, label: 'Salary', value: singleJob?.salary ? `${singleJob.salary} LPA` : null },
        { icon: Clock, label: 'Experience', value: singleJob?.experienceLevel ? `${singleJob.experienceLevel} yrs` : null },
        { icon: Users, label: 'Applicants', value: singleJob?.applications?.length },
        { icon: Calendar, label: 'Posted Date', value: singleJob?.createdAt?.split("T")[0] },
    ]

    return (
        <div className='min-h-screen bg-[#f8f9fa]'>
            <Navbar />

            {/* Back Button */}
            <div className='max-w-5xl mx-auto px-4 pt-6'>
                <button
                    onClick={() => navigate(-1)}
                    className='inline-flex items-center gap-1.5 text-xs font-bold text-[#5e6475] hover:text-[#5d53c4] transition-colors cursor-pointer'
                >
                    <ArrowLeft className='w-3.5 h-3.5' />
                    <span>Back to listings</span>
                </button>
            </div>

            {/* Hero Banner Card */}
            <div className='max-w-5xl mx-auto px-4 mt-4'>
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='bg-white border border-[#ebedf5] p-6 rounded-3xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6'
                >
                    {/* Left details */}
                    <div className='flex items-center gap-4'>
                        <div className='w-14 h-14 rounded-2xl bg-[#f1efff] border border-[#e0dbff] flex items-center justify-center text-xl font-bold text-[#5d53c4] flex-shrink-0'>
                            {singleJob?.company?.name?.[0]?.toUpperCase() || <Building2 className='w-6 h-6' />}
                        </div>
                        <div>
                            <p className='text-[#5e6475] text-xs font-bold'>{singleJob?.company?.name}</p>
                            <h1 className='text-xl md:text-2xl font-extrabold text-[#1a1a24] mt-0.5'>{singleJob?.title}</h1>
                            <div className='flex flex-wrap gap-2 mt-2.5'>
                                <span className='px-2.5 py-1 rounded-xl text-[10px] font-bold pastel-badge-blue'>
                                    {singleJob?.position} Positions
                                </span>
                                <span className='px-2.5 py-1 rounded-xl text-[10px] font-bold pastel-badge-orange'>
                                    {singleJob?.jobType}
                                </span>
                                <span className='px-2.5 py-1 rounded-xl text-[10px] font-bold pastel-badge-purple'>
                                    {singleJob?.salary} LPA
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right button */}
                    <button
                        onClick={isApplied ? null : applyJobHandler}
                        disabled={isApplied}
                        className={`px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${isApplied
                            ? 'bg-[#e2f6f0] border border-[#d2f2e8] text-[#1b7c5f] cursor-default'
                            : 'btn-pastel-primary text-white shadow-sm'
                        }`}
                    >
                        {isApplied ? (
                            <><CheckCircle2 className='w-3.5 h-3.5' /> Applied</>
                        ) : (
                            <><Zap className='w-3.5 h-3.5' /> Apply Now</>
                        )}
                    </button>
                </motion.div>
            </div>

            {/* Content Area */}
            <div className='max-w-5xl mx-auto px-4 py-8'>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>

                    {/* Details Description */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className='lg:col-span-2 bg-white border border-[#ebedf5] p-6 rounded-3xl shadow-sm space-y-4'
                    >
                        <h2 className='font-bold text-[#1a1a24] text-sm pb-2.5 border-b border-[#ebedf5]'>Job Description</h2>
                        <p className='text-[#5e6475] text-xs leading-relaxed'>{singleJob?.description}</p>

                        {singleJob?.requirements?.length > 0 && (
                            <div className='pt-2'>
                                <h3 className='font-bold text-slate-800 mb-2.5 text-xs uppercase tracking-wider'>Requirements</h3>
                                <ul className='space-y-2'>
                                    {singleJob.requirements.map((req, idx) => (
                                        <li key={idx} className='flex items-start gap-2 text-[#5e6475] text-xs font-semibold'>
                                            <CheckCircle2 className='w-4.5 h-4.5 text-[#1b7c5f] flex-shrink-0 mt-0.5' />
                                            <span>{req}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </motion.div>

                    {/* Stats Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className='bg-white border border-[#ebedf5] p-6 rounded-3xl shadow-sm h-fit space-y-5'
                    >
                        <h2 className='font-bold text-[#1a1a24] text-xs uppercase tracking-wider pb-2.5 border-b border-[#ebedf5]'>Job Details</h2>
                        <div className='space-y-4'>
                            {details.map(({ icon: Icon, label, value }) => value != null && (
                                <div key={label} className='flex items-center gap-3'>
                                    <div className='w-7 h-7 rounded-lg bg-[#f5f6fa] border border-[#ebedf5] flex items-center justify-center flex-shrink-0'>
                                        <Icon className='w-3.5 h-3.5 text-[#5d53c4]' />
                                    </div>
                                    <div>
                                        <p className='text-[10px] font-bold text-[#a0a6b5] uppercase tracking-wider leading-none'>{label}</p>
                                        <p className='text-xs font-bold text-[#1a1a24] mt-1'>{value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {!isApplied && (
                            <button
                                onClick={applyJobHandler}
                                className='w-full btn-pastel-primary rounded-xl py-2.5 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-sm'
                            >
                                <Zap className='w-3.5 h-3.5' />
                                Apply Now
                            </button>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default JobDescription