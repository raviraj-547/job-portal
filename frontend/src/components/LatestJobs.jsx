import React, { useRef } from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const LatestJobs = () => {
  const { allJobs } = useSelector(store => store.job);
  const sectionRef = useRef(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      sectionRef.current.querySelector('.lj-heading'),
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true }
      }
    );

    gsap.fromTo(
      sectionRef.current.querySelectorAll('.job-card-wrap'),
      { opacity: 0, y: 32, scale: 0.97 },
      {
        opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power2.out', stagger: 0.07,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', once: true }
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className='py-24 px-4 bg-muted/20 border-b border-border'>
      <div className='max-w-7xl mx-auto'>

        {/* Header */}
        <div className='lj-heading flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10' style={{ opacity: 0 }}>
          <div>
            <div className='section-divider mx-0 mb-3' />
            <h2 className='text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight'>
              Latest <span className='text-gradient'>Job Openings</span>
            </h2>
            <p className='text-muted-foreground text-sm mt-1.5'>Handpicked, freshly posted vacancies from top companies</p>
          </div>
          <Link to="/jobs">
            <button className='btn-secondary flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg flex-shrink-0'>
              View all jobs
              <ArrowRight className='w-4 h-4' />
            </button>
          </Link>
        </div>

        {/* Grid */}
        {allJobs.length <= 0 ? (
          <div className='text-center py-20 bg-card border border-border rounded-xl'>
            <Briefcase className='w-10 h-10 text-muted-foreground/40 mx-auto mb-3' />
            <p className='text-foreground font-semibold text-sm'>No jobs listed at the moment</p>
            <p className='text-muted-foreground text-xs mt-1'>Check back soon for the latest opportunities</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {allJobs.slice(0, 6).map((job, index) => (
              <div key={job._id} className='job-card-wrap' style={{ opacity: 0 }}>
                <LatestJobCards job={job} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default LatestJobs