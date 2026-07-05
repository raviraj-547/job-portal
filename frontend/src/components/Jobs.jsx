import React, { useEffect, useState, useRef } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { Briefcase, Search } from 'lucide-react';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Footer from './shared/Footer';

const Jobs = () => {
  useGetAllJobs();
  const { allJobs, searchedQuery } = useSelector(store => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  const [searchInput, setSearchInput] = useState('');
  const contentRef = useRef(null);

  useEffect(() => {
   
  }, []);

  useEffect(() => {
    const q = searchedQuery || searchInput;
    if (q) {
      const filtered = allJobs.filter((job) =>
        job.title.toLowerCase().includes(q.toLowerCase()) ||
        job.description.toLowerCase().includes(q.toLowerCase()) ||
        job.location.toLowerCase().includes(q.toLowerCase())
      );
      setFilterJobs(filtered);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery, searchInput]);

  // Animate cards when filterJobs changes
  useGSAP(() => {
    if (!contentRef.current) return;
    const cards = contentRef.current.querySelectorAll('.job-card-item');
    if (cards.length === 0) return;
    gsap.fromTo(cards,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, stagger: 0.05, duration: 0.35, ease: 'power2.out' }
    );
  }, { dependencies: [filterJobs] });

  return (
    <div className='min-h-screen bg-background'>
      <Navbar />

      <div className='max-w-7xl mx-auto mt-8 px-4 lg:px-6 pb-24'>

        {/* Page header */}
        <div className='mb-8'>
          <h1 className='text-2xl font-extrabold text-foreground tracking-tight'>
            Find Your Next <span className='text-gradient'>Opportunity</span>
          </h1>
          <p className='text-muted-foreground text-sm mt-1 font-medium'>
            <span className='text-foreground font-semibold'>{filterJobs.length}</span> active listings found
          </p>
        </div>

        <div className='flex gap-6 items-start'>

          {/* Sidebar — hidden on mobile */}
          <aside className='hidden lg:block w-72 flex-shrink-0'>
            <FilterCard />
          </aside>

          {/* Main content */}
          <main className='flex-1 min-w-0' ref={contentRef}>
            {/* Inline search */}
            <div className='relative mb-5 lg:hidden'>
              <Search className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
              <input
                type='text'
                placeholder='Search jobs...'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className='input-premium pl-10'
              />
            </div>

            {filterJobs.length === 0 ? (
              <div className='bg-card border border-border rounded-xl p-16 text-center shadow-sm'>
                <Briefcase className='w-10 h-10 text-muted-foreground/30 mx-auto mb-3' />
                <p className='text-foreground font-semibold text-sm'>No jobs matching your criteria</p>
                <p className='text-muted-foreground text-xs mt-1'>Try adjusting or clearing your filters</p>
              </div>
            ) : (
              <div className='grid grid-cols-1 xl:grid-cols-2 gap-4'>
                {filterJobs.map((job) => (
                  <div key={job?._id} className='job-card-item' style={{ opacity: 0 }}>
                    <Job job={job} />
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Jobs