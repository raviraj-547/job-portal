import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import {
  MapPin, Banknote, Briefcase, Users, Calendar, Clock,
  CheckCircle2, Zap, Building2, ArrowLeft, Share2, Bookmark
} from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const hasUserApplied = (applications, userId) =>
  applications?.some(application => String(application.applicant) === String(userId)) || false;

const JobDescription = () => {
  const { singleJob } = useSelector(store => store.job);
  const { user } = useSelector(store => store.auth);
  const isInitiallyApplied = hasUserApplied(singleJob?.applications, user?._id);
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const heroRef = useRef(null);
  const bodyRef = useRef(null);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }]
        };
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
          const applied = hasUserApplied(res.data.job.applications, user?._id);
          
          setIsApplied(applied);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  // GSAP entrance
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
    if (heroRef.current) {
      tl.fromTo(heroRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.55 }
      );
    }
    if (bodyRef.current) {
      tl.fromTo(
        bodyRef.current.children,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 },
        '-=0.2'
      );
    }
  }, { dependencies: [singleJob?._id] });

  const details = [
    { icon: MapPin,     label: 'Location',    value: singleJob?.location },
    { icon: Briefcase,  label: 'Job Type',    value: singleJob?.jobType },
    { icon: Banknote,   label: 'Salary',      value: singleJob?.salary ? `₹${singleJob.salary} LPA` : null },
    { icon: Clock,      label: 'Experience',  value: singleJob?.experienceLevel ? `${singleJob.experienceLevel} yrs` : null },
    { icon: Users,      label: 'Applicants',  value: singleJob?.applications?.length },
    { icon: Calendar,   label: 'Posted',      value: singleJob?.createdAt?.split("T")[0] },
  ];

  return (
    <div className='min-h-screen bg-background'>
      <Navbar />

      {/* Back */}
      <div className='max-w-5xl mx-auto px-4 lg:px-6 pt-6'>
        <button
          onClick={() => navigate(-1)}
          className='inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
        >
          <ArrowLeft className='w-4 h-4' />
          Back to listings
        </button>
      </div>

      {/* Hero Card */}
      <div className='max-w-5xl mx-auto px-4 lg:px-6 mt-5'>
        <div
          ref={heroRef}
          className='bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6'
          style={{ opacity: 0 }}
        >
          <div className='flex items-center gap-4'>
            {/* Company logo */}
            <div
              className='w-16 h-16 rounded-xl border border-border flex items-center justify-center text-xl font-bold flex-shrink-0'
              style={{ background: 'hsl(var(--primary) / 0.08)', color: 'hsl(var(--primary))' }}
            >
              {singleJob?.company?.name?.[0]?.toUpperCase() || <Building2 className='w-7 h-7' />}
            </div>

            <div>
              <p className='text-sm font-semibold text-muted-foreground'>{singleJob?.company?.name}</p>
              <h1 className='text-2xl md:text-3xl font-extrabold text-foreground tracking-tight mt-0.5'>
                {singleJob?.title}
              </h1>
              <div className='flex flex-wrap gap-2 mt-3'>
                <span className='badge badge-blue'>
                  <Briefcase className='w-3 h-3' />
                  {singleJob?.position} Positions
                </span>
                <span className='badge badge-orange'>{singleJob?.jobType}</span>
                <span className='badge badge-purple'>
                  <Banknote className='w-3 h-3' />
                  {singleJob?.salary} LPA
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-2 flex-shrink-0'>
            <button
              className='w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors'
              aria-label="Share job"
            >
              <Share2 className='w-4 h-4' />
            </button>
            <button
              className='w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-amber-500 hover:border-amber-200 hover:bg-amber-50 dark:hover:bg-amber-950/20 transition-colors'
              aria-label="Save job"
            >
              <Bookmark className='w-4 h-4' />
            </button>
            <button
              onClick={isApplied ? null : applyJobHandler}
              disabled={isApplied}
              className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm transition-all whitespace-nowrap ${
                isApplied
                  ? 'bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 cursor-default'
                  : 'btn-primary cursor-pointer'
              }`}
            >
              {isApplied ? (
                <><CheckCircle2 className='w-4 h-4' /> Applied</>
              ) : (
                <><Zap className='w-4 h-4' /> Apply Now</>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className='max-w-5xl mx-auto px-4 lg:px-6 py-8'>
        <div ref={bodyRef} className='grid grid-cols-1 lg:grid-cols-3 gap-6'>

          {/* Description panel */}
          <div
            className='lg:col-span-2 bg-card border border-border rounded-xl p-6 shadow-sm space-y-6'
            style={{ opacity: 0 }}
          >
            <div>
              <h2 className='text-base font-bold text-foreground mb-3 pb-3 border-b border-border'>
                Job Description
              </h2>
              <p className='text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap'>
                {singleJob?.description}
              </p>
            </div>

            {singleJob?.requirements?.length > 0 && (
              <div>
                <h3 className='text-sm font-bold text-foreground uppercase tracking-wider mb-4'>
                  Requirements
                </h3>
                <ul className='space-y-2.5'>
                  {singleJob.requirements.map((req, idx) => (
                    <li key={idx} className='flex items-start gap-3 text-muted-foreground text-sm'>
                      <CheckCircle2 className='w-4 h-4 text-green-500 flex-shrink-0 mt-0.5' />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div
            className='bg-card border border-border rounded-xl p-5 shadow-sm h-fit space-y-5'
            style={{ opacity: 0 }}
          >
            <h2 className='text-xs font-bold text-foreground uppercase tracking-wider pb-3 border-b border-border'>
              Job Details
            </h2>
            <div className='space-y-4'>
              {details.map(({ icon: Icon, label, value }) => value != null && (
                <div key={label} className='flex items-center gap-3'>
                  <div className='w-8 h-8 rounded-lg bg-primary/8 border border-border flex items-center justify-center flex-shrink-0'>
                    <Icon className='w-4 h-4 text-primary' />
                  </div>
                  <div>
                    <p className='text-xs font-medium text-muted-foreground'>{label}</p>
                    <p className='text-sm font-semibold text-foreground mt-0.5'>{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {!isApplied && (
              <button
                onClick={applyJobHandler}
                className='btn-primary w-full flex items-center justify-center gap-2 py-2.5 text-sm rounded-lg cursor-pointer mt-2'
              >
                <Zap className='w-4 h-4' />
                Apply Now
              </button>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default JobDescription