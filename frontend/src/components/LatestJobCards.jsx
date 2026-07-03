import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, ArrowRight } from 'lucide-react'

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/description/${job._id}`)}
            className='pastel-card pastel-card-hover border border-[#ebedf5] p-5 flex flex-col gap-4 h-full cursor-pointer group'
        >
            {/* Company Block */}
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

            {/* Job Details */}
            <div className='flex-1'>
                <h2 className='font-bold text-[#1a1a24] text-sm mb-1.5 group-hover:text-[#5d53c4] transition-colors line-clamp-1'>
                    {job?.title}
                </h2>
                <p className='text-[#5e6475] text-[11px] font-medium leading-relaxed line-clamp-2'>
                    {job?.description}
                </p>
            </div>

            {/* Pastel Tags */}
            <div className='flex flex-wrap gap-2 pt-1'>
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

            {/* CTA action link */}
            <div className='flex items-center gap-1 text-[10px] font-bold text-[#5d53c4] pt-2 border-t border-[#ebedf5]'>
                <span>View Opening</span>
                <ArrowRight className='w-3 h-3 transition-transform group-hover:translate-x-0.5' />
            </div>
        </div>
    )
}

export default LatestJobCards