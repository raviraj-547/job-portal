import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, ArrowRight, Banknote, Briefcase } from 'lucide-react'
import gsap from 'gsap';

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  const cardRef = useRef(null);

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

  const companyInitial = job?.company?.name?.[0]?.toUpperCase() || '?';

  return (
    <div
      ref={cardRef}
      onClick={() => navigate(`/description/${job._id}`)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className='card-premium cursor-pointer flex flex-col gap-4 p-5 h-full group'
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/description/${job._id}`)}
      aria-label={`View ${job?.title} at ${job?.company?.name}`}
    >
      {/* Company */}
      <div className='flex items-center gap-3'>
        <div
          className='w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 border border-border'
          style={{
            background: 'hsl(var(--primary) / 0.08)',
            color: 'hsl(var(--primary))'
          }}
        >
          {companyInitial}
        </div>
        <div className='min-w-0'>
          <p className='font-semibold text-sm text-foreground truncate'>{job?.company?.name}</p>
          <div className='flex items-center gap-1 text-xs text-muted-foreground mt-0.5'>
            <MapPin className='w-3 h-3' />
            <span>{job?.location || 'India'}</span>
          </div>
        </div>
      </div>

      {/* Job info */}
      <div className='flex-1'>
        <h3 className='font-bold text-foreground text-sm mb-1.5 group-hover:text-primary transition-colors line-clamp-1'>
          {job?.title}
        </h3>
        <p className='text-muted-foreground text-xs leading-relaxed line-clamp-2'>
          {job?.description}
        </p>
      </div>

      {/* Badges */}
      <div className='flex flex-wrap gap-1.5'>
        <span className='badge badge-blue'>
          <Briefcase className='w-3 h-3' />
          {job?.position} {Number(job?.position) === 1 ? 'Position' : 'Positions'}
        </span>
        <span className='badge badge-orange'>{job?.jobType}</span>
        <span className='badge badge-purple'>
          <Banknote className='w-3 h-3' />
          {job?.salary} LPA
        </span>
      </div>

      {/* CTA */}
      <div className='flex items-center gap-1 text-xs font-semibold text-primary pt-2 border-t border-border'>
        <span>View Opening</span>
        <ArrowRight className='w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5' />
      </div>
    </div>
  );
}

export default LatestJobCards