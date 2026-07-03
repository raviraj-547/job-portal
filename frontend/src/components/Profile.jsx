import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Mail, Phone, Pen, FileText, Star, Download, Sparkles } from 'lucide-react'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import { motion } from 'framer-motion'

const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    return (
        <div className='min-h-screen bg-[#f8f9fa]'>
            <Navbar />

            {/* Profile Overview Card */}
            <div className='max-w-4xl mx-auto px-4 mt-8'>
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='bg-white border border-[#ebedf5] p-6 rounded-3xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-5'
                >
                    <div className='flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left'>
                        <div className='p-0.5 rounded-full bg-gradient-to-br from-violet-200 via-purple-300 to-fuchsia-300 shadow-md shadow-purple-500/5'>
                            <Avatar className="h-16 w-16 border-2 border-white">
                                <AvatarImage
                                    src={user?.profile?.profilePhoto || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"}
                                    alt="profile"
                                />
                            </Avatar>
                        </div>
                        <div>
                            <h1 className='text-lg font-extrabold text-[#1a1a24]'>{user?.fullname}</h1>
                            <p className='text-[#5e6475] text-xs font-semibold mt-1 max-w-sm'>{user?.profile?.bio || 'No bio added yet'}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setOpen(true)}
                        className='w-9 h-9 rounded-xl bg-[#f5f6fa] border border-[#ebedf5] flex items-center justify-center text-[#5e6475] hover:text-[#5d53c4] hover:border-[#e0dbff] hover:bg-[#f1efff] transition-all cursor-pointer flex-shrink-0'
                    >
                        <Pen className='w-3.5 h-3.5' />
                    </button>
                </motion.div>
            </div>

            {/* Profile Details Container */}
            <div className='max-w-4xl mx-auto px-4 py-6 space-y-6'>

                {/* Details Card */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.08 }}
                    className='bg-white border border-[#ebedf5] p-6 rounded-3xl shadow-sm space-y-4'
                >
                    <h2 className='font-bold text-[#1a1a24] text-xs uppercase tracking-wider pb-2.5 border-b border-[#ebedf5] flex items-center gap-1.5'>
                        <Star className='w-4 h-4 text-[#5d53c4]' />
                        Contact Details
                    </h2>

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                        {/* Email */}
                        <div className='flex items-center gap-3 p-3 rounded-2xl bg-[#f5f6fa] border border-[#ebedf5]'>
                            <div className='w-8 h-8 rounded-lg bg-[#e8f4fd] border border-[#d1e8fc] flex items-center justify-center flex-shrink-0'>
                                <Mail className='w-4 h-4 text-[#0d47a1]' />
                            </div>
                            <div className='min-w-0'>
                                <p className='text-[10px] font-bold text-[#a0a6b5] uppercase tracking-wider leading-none'>Email Address</p>
                                <p className='text-xs font-bold text-[#1a1a24] truncate mt-1'>{user?.email}</p>
                            </div>
                        </div>
                        {/* Phone */}
                        <div className='flex items-center gap-3 p-3 rounded-2xl bg-[#f5f6fa] border border-[#ebedf5]'>
                            <div className='w-8 h-8 rounded-lg bg-[#e6f7f2] border border-[#d2f2e8] flex items-center justify-center flex-shrink-0'>
                                <Phone className='w-4 h-4 text-[#1b7c5f]' />
                            </div>
                            <div>
                                <p className='text-[10px] font-bold text-[#a0a6b5] uppercase tracking-wider leading-none'>Phone Number</p>
                                <p className='text-xs font-bold text-[#1a1a24] mt-1'>{user?.phoneNumber || 'Not provided'}</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Skills Card */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.12 }}
                    className='bg-white border border-[#ebedf5] p-6 rounded-3xl shadow-sm space-y-4'
                >
                    <h2 className='font-bold text-[#1a1a24] text-xs uppercase tracking-wider pb-2.5 border-b border-[#ebedf5]'>Professional Skills</h2>
                    <div className='flex flex-wrap gap-2'>
                        {user?.profile?.skills?.length > 0
                            ? user.profile.skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className='px-3 py-1.5 rounded-full text-xs font-bold pastel-badge-purple'
                                >
                                    {skill}
                                </span>
                            ))
                            : <span className='text-[#a0a6b5] text-xs font-medium'>No skills declared yet.</span>
                        }
                    </div>
                </motion.div>

                {/* Resume Card */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.16 }}
                    className='bg-white border border-[#ebedf5] p-6 rounded-3xl shadow-sm space-y-4'
                >
                    <h2 className='font-bold text-[#1a1a24] text-xs uppercase tracking-wider pb-2.5 border-b border-[#ebedf5]'>My Resume</h2>
                    {isResume && user?.profile?.resume ? (
                        <a
                            target='_blank'
                            rel="noopener noreferrer"
                            href={user.profile.resume}
                            className='flex items-center gap-3 p-3.5 rounded-2xl bg-[#fff2eb] border border-[#ffe3d3] hover:shadow-sm transition-all group max-w-sm cursor-pointer'
                        >
                            <div className='w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0'>
                                <FileText className='w-4.5 h-4.5 text-red-500' />
                            </div>
                            <div className='flex-1 min-w-0'>
                                <p className='text-xs font-bold text-[#1a1a24] truncate group-hover:underline'>{user.profile.resumeOriginalName}</p>
                                <p className='text-[10px] text-slate-500 mt-0.5'>Uploaded PDF Document</p>
                            </div>
                            <Download className='w-4 h-4 text-slate-400 group-hover:text-[#5d53c4] transition-colors' />
                        </a>
                    ) : (
                        <p className='text-[#a0a6b5] text-xs font-medium'>No resume uploaded.</p>
                    )}
                </motion.div>

                {/* Applied Jobs Card */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className='bg-white border border-[#ebedf5] p-6 rounded-3xl shadow-sm space-y-4'
                >
                    <h2 className='font-bold text-[#1a1a24] text-xs uppercase tracking-wider pb-2.5 border-b border-[#ebedf5]'>Applied Openings</h2>
                    <AppliedJobTable />
                </motion.div>
            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile