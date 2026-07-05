import React, { useEffect, useRef } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { Search, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Footer from './shared/Footer';

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector(store => store.job);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const gridRef = useRef(null);

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    }
  }, [])

  useGSAP(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.browse-card');
    if (!cards.length) return;
    gsap.fromTo(cards,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.06, duration: 0.4, ease: 'power2.out' }
    );
  }, { dependencies: [allJobs] });

  return (
    <div className='min-h-screen bg-background'>
      <Navbar />

      <div className='max-w-7xl mx-auto my-10 px-4 lg:px-6 pb-24'>

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className='inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 font-medium'
        >
          <ArrowLeft className='w-4 h-4' />
          Back
        </button>

        {/* Header */}
        <div className='flex items-center gap-3 mb-8'>
          <div className='w-10 h-10 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0'
            style={{ background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)' }}>
            <Search className='w-5 h-5 text-white' />
          </div>
          <div>
            <h1 className='text-2xl font-extrabold text-foreground tracking-tight'>
              Search Results
            </h1>
            <p className='text-muted-foreground text-sm mt-0.5'>
              Found <span className='text-foreground font-semibold'>{allJobs.length}</span> active vacancies
            </p>
          </div>
        </div>

        {/* Grid */}
        <div ref={gridRef} className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
          {allJobs.length === 0 ? (
            <div className='col-span-3 bg-card border border-border rounded-xl p-16 text-center shadow-sm'>
              <Search className='w-10 h-10 text-muted-foreground/30 mx-auto mb-3' />
              <p className='text-foreground font-semibold text-sm'>No vacancies found</p>
              <p className='text-muted-foreground text-xs mt-1'>Try adjusting your search query</p>
            </div>
          ) : (
            allJobs.map((job) => (
              <div key={job._id} className='browse-card' style={{ opacity: 0 }}>
                <Job job={job} />
              </div>
            ))
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Browse