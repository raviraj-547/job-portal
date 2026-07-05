import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bookmark, MapPin, Clock, Banknote, Briefcase, ArrowRight, Star } from 'lucide-react'
import gsap from 'gsap';

const Job = ({ job }) => {
  const navigate = useNavigate();
  const cardRef = useRef(null);

  const daysAgo = Math.floor(
    (new Date() - new Date(job?.createdAt)) / (1000 * 24 * 60 * 60)
  );

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      y: -4,
      boxShadow: '0 12px 40px rgba(0,0,0,0.1)',
      duration: 0.25,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      duration: 0.25,
      ease: 'power2.out'
    });
  };

  return (
    <div
      ref={cardRef}
      className='card-premium flex flex-col gap-4 p-5 group h-full'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Header row */}
      <div className='flex items-start justify-between gap-2'>
        <div className='flex items-center gap-1.5 text-xs text-muted-foreground'>
          <Clock className='w-3.5 h-3.5' />
          <span>{daysAgo === 0 ? 'Today' : `${daysAgo}d ago`}</span>
        </div>
        <button
          className='w-7 h-7 rounded-lg bg-muted border border-border flex items-center justify-center text-muted-foreground hover:text-amber-500 hover:border-amber-200 hover:bg-amber-50 dark:hover:bg-amber-950/20 transition-all flex-shrink-0 cursor-pointer'
          onClick={(e) => e.stopPropagation()}
          aria-label="Bookmark job"
        >
          <Bookmark className='w-3.5 h-3.5' />
        </button>
      </div>

      {/* Company */}
      <div className='flex items-center gap-3'>
        <div
          className='w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 border border-border'
          style={{ background: 'hsl(var(--primary) / 0.08)', color: 'hsl(var(--primary))' }}
        >
          {job?.company?.name?.[0]?.toUpperCase() || '?'}
        </div>
        <div className='min-w-0'>
          <p className='font-semibold text-sm text-foreground truncate'>{job?.company?.name}</p>
          <div className='flex items-center gap-1 text-xs text-muted-foreground mt-0.5'>
            <MapPin className='w-3 h-3' />
            <span>{job?.location || 'India'}</span>
          </div>
        </div>
      </div>

      {/* Title & description */}
      <div className='flex-1'>
        <h2 className='font-bold text-foreground text-sm mb-1.5 group-hover:text-primary transition-colors line-clamp-1'>
          {job?.title}
        </h2>
        <p className='text-muted-foreground text-xs leading-relaxed line-clamp-2'>
          {job?.description}
        </p>
      </div>

      {/* Badges */}
      <div className='flex flex-wrap gap-1.5'>
        <span className='badge badge-blue'>
          <Briefcase className='w-3 h-3' />
          {job?.position} Pos.
        </span>
        <span className='badge badge-orange'>{job?.jobType}</span>
        <span className='badge badge-purple'>
          <Banknote className='w-3 h-3' />
          {job?.salary} LPA
        </span>
      </div>

      {/* Actions */}
      <div className='flex items-center gap-2 pt-2 border-t border-border'>
        <button
          onClick={() => navigate(`/description/${job?._id}`)}
          className='btn-secondary flex-1 flex items-center justify-center gap-1.5 py-2 text-xs rounded-lg'
        >
          Details
          <ArrowRight className='w-3.5 h-3.5' />
        </button>
        <button className='btn-primary flex-1 py-2 text-xs rounded-lg'>
          Quick Apply
        </button>
      </div>
    </div>
  );
}

export default Job