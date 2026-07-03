import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Bookmark, MapPin, Clock, Banknote, Users, ArrowRight } from 'lucide-react'

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    }

    const daysAgo = daysAgoFunction(job?.createdAt);

    return (
        <div className='pastel-card pastel-card-hover border border-[#ebedf5] p-5 flex flex-col gap-4 group h-full'>
            {/* Header row */}
            <div className='flex items-start justify-between gap-2'>
                <div className='flex items-center gap-1.5 text-[10px] font-bold text-[#a0a6b5]'>
                    <Clock className='w-3 h-3 text-[#cbd0dd]' />
                    <span>{daysAgo === 0 ? 'Today' : `${daysAgo} days ago`}</span>
                </div>
                <button
                    className='w-7 h-7 rounded-xl bg-[#f5f6fa] border border-[#ebedf5] flex items-center justify-center text-[#5e6475] hover:text-yellow-500 hover:border-yellow-200 hover:bg-yellow-50 transition-all flex-shrink-0 cursor-pointer'
                    onClick={(e) => e.stopPropagation()}
                >
                    <Bookmark className='w-3.5 h-3.5' />
                </button>
            </div>

            {/* Company detail */}
            <div className='flex items-center gap-3'>
                <div className='w-11 h-11 rounded-2xl bg-[#f1efff] border border-[#e0dbff] flex items-center justify-center text-sm font-bold text-[#5d53c4] flex-shrink-0'>
                    {job?.company?.name?.[0]?.toUpperCase() || '?'}
                </div>
                <div className='min-w-0'>
                    <h3 className='font-bold text-[#1a1a24] text-sm truncate'>{job?.company?.name}</h3>
                    <div className='flex items-center gap-1 text-[10px] font-semibold text-[#a0a6b5]'>
                        <MapPin className='w-3 h-3 text-[#cbd0dd]' />
                        <span>India</span>
                    </div>
                </div>
            </div>

            {/* Title & description */}
            <div className='flex-1'>
                <h2 className='font-bold text-[#1a1a24] text-sm mb-1.5 group-hover:text-[#5d53c4] transition-colors line-clamp-1'>
                    {job?.title}
                </h2>
                <p className='text-[#5e6475] text-[11px] font-medium leading-relaxed line-clamp-2'>
                    {job?.description}
                </p>
            </div>

            {/* Pastel badges */}
            <div className='flex flex-wrap gap-2'>
                <span className='px-2.5 py-1.5 rounded-xl text-[10px] font-bold pastel-badge-blue'>
                    {job?.position} Positions
                </span>
                <span className='px-2.5 py-1.5 rounded-xl text-[10px] font-bold pastel-badge-orange'>
                    {job?.jobType}
                </span>
                <span className='px-2.5 py-1.5 rounded-xl text-[10px] font-bold pastel-badge-purple'>
                    {job?.salary} LPA
                </span>
            </div>

            {/* Button Actions */}
            <div className='flex items-center gap-2 pt-2 border-t border-[#ebedf5]'>
                <button
                    onClick={() => navigate(`/description/${job?._id}`)}
                    className='flex-1 flex items-center justify-center gap-1 py-2 rounded-xl btn-pastel-secondary text-xs cursor-pointer'
                >
                    Details
                    <ArrowRight className='w-3 h-3' />
                </button>
                <button className='flex-1 py-2 rounded-xl btn-pastel-primary text-xs cursor-pointer'>
                    Save Job
                </button>
            </div>
        </div>
    )
}

export default Job