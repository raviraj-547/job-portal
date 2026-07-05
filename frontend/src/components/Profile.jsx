import React, { useState, useRef } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Mail, Phone, Pen, FileText, Download, Sparkles, MapPin, Code2, Briefcase } from 'lucide-react'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Footer from './shared/Footer'

const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector(store => store.auth);
  const [activeTab, setActiveTab] = useState('overview');
  const pageRef = useRef(null);

  useGSAP(() => {
    if (!pageRef.current) return;
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
    tl.fromTo(
      pageRef.current.querySelectorAll('.profile-section'),
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, stagger: 0.08, duration: 0.5 }
    );
  }, { scope: pageRef });

  const tabs = ['overview', 'applications'];

  return (
    <div className='min-h-screen bg-background'>
      <Navbar />

      {/* Profile Banner */}
      <div
        className='h-40 w-full relative'
        style={{
          background: 'linear-gradient(135deg, #1e3a8a 0%, #7c3aed 50%, #0891b2 100%)',
        }}
      >
        <div className='absolute inset-0 opacity-20'
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div ref={pageRef} className='max-w-4xl mx-auto px-4 lg:px-6 pb-24'>

        {/* Profile Card */}
        <div className='profile-section bg-card border border-border rounded-xl p-6 -mt-10 relative shadow-lg' style={{ opacity: 0 }}>
          <div className='flex flex-col sm:flex-row items-start sm:items-end gap-4'>
            {/* Avatar */}
            <div className='relative -mt-16 sm:-mt-20 flex-shrink-0'>
              <div className='w-20 h-20 sm:w-24 sm:h-24 rounded-2xl ring-4 ring-card shadow-xl overflow-hidden'>
                <Avatar className="h-full w-full rounded-2xl">
                  <AvatarImage
                    src={user?.profile?.profilePhoto || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"}
                    alt={user?.fullname}
                    className="object-cover"
                  />
                </Avatar>
              </div>
              <div className='absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 ring-2 ring-card' aria-label="Online" />
            </div>

            {/* Info */}
            <div className='flex-1 min-w-0'>
              <h1 className='text-xl font-extrabold text-foreground tracking-tight'>{user?.fullname}</h1>
              <p className='text-muted-foreground text-sm mt-1 max-w-md leading-relaxed'>
                {user?.profile?.bio || 'Add a bio to tell employers about yourself.'}
              </p>
              <div className='flex flex-wrap gap-3 mt-2.5'>
                {user?.email && (
                  <div className='flex items-center gap-1.5 text-xs text-muted-foreground'>
                    <Mail className='w-3.5 h-3.5' /> {user.email}
                  </div>
                )}
                {user?.phoneNumber && (
                  <div className='flex items-center gap-1.5 text-xs text-muted-foreground'>
                    <Phone className='w-3.5 h-3.5' /> {user.phoneNumber}
                  </div>
                )}
              </div>
            </div>

            {/* Edit button */}
            <button
              onClick={() => setOpen(true)}
              className='btn-secondary flex items-center gap-2 text-sm px-4 py-2 rounded-lg flex-shrink-0'
            >
              <Pen className='w-3.5 h-3.5' />
              Edit Profile
            </button>
          </div>

          {/* Skills preview */}
          {user?.profile?.skills?.length > 0 && (
            <div className='mt-5 pt-5 border-t border-border'>
              <div className='flex flex-wrap gap-2'>
                {user.profile.skills.map((skill, index) => (
                  <span key={index} className='badge badge-purple text-xs px-3 py-1'>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className='profile-section mt-6' style={{ opacity: 0 }}>
          <div className='flex gap-1 p-1 bg-muted rounded-lg w-fit'>
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-all ${
                  activeTab === tab
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab === 'overview' ? 'Overview' : 'Applications'}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        {activeTab === 'overview' && (
          <div className='space-y-5 mt-5'>
            {/* Contact */}
            <div className='profile-section bg-card border border-border rounded-xl p-5 shadow-sm' style={{ opacity: 0 }}>
              <h2 className='font-semibold text-sm text-foreground mb-4 flex items-center gap-2'>
                <Mail className='w-4 h-4 text-primary' />
                Contact Details
              </h2>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                <div className='flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border'>
                  <div className='w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 flex items-center justify-center flex-shrink-0'>
                    <Mail className='w-4 h-4 text-blue-600 dark:text-blue-400' />
                  </div>
                  <div className='min-w-0'>
                    <p className='text-xs font-medium text-muted-foreground'>Email</p>
                    <p className='text-sm font-semibold text-foreground truncate'>{user?.email}</p>
                  </div>
                </div>
                <div className='flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border'>
                  <div className='w-8 h-8 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 flex items-center justify-center flex-shrink-0'>
                    <Phone className='w-4 h-4 text-green-600 dark:text-green-400' />
                  </div>
                  <div>
                    <p className='text-xs font-medium text-muted-foreground'>Phone</p>
                    <p className='text-sm font-semibold text-foreground'>{user?.phoneNumber || 'Not provided'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className='profile-section bg-card border border-border rounded-xl p-5 shadow-sm' style={{ opacity: 0 }}>
              <h2 className='font-semibold text-sm text-foreground mb-4 flex items-center gap-2'>
                <Code2 className='w-4 h-4 text-primary' />
                Professional Skills
              </h2>
              <div className='flex flex-wrap gap-2'>
                {user?.profile?.skills?.length > 0
                  ? user.profile.skills.map((skill, index) => (
                    <span key={index} className='badge badge-purple px-3 py-1.5 text-xs font-semibold'>
                      {skill}
                    </span>
                  ))
                  : (
                    <div className='text-center w-full py-6'>
                      <Sparkles className='w-6 h-6 text-muted-foreground/40 mx-auto mb-2' />
                      <p className='text-muted-foreground text-xs'>No skills added yet. Edit your profile to add skills.</p>
                    </div>
                  )
                }
              </div>
            </div>

            {/* Resume */}
            <div className='profile-section bg-card border border-border rounded-xl p-5 shadow-sm' style={{ opacity: 0 }}>
              <h2 className='font-semibold text-sm text-foreground mb-4 flex items-center gap-2'>
                <FileText className='w-4 h-4 text-primary' />
                Resume
              </h2>
              {isResume && user?.profile?.resume ? (
                <a
                  target='_blank'
                  rel="noopener noreferrer"
                  href={user.profile.resume}
                  className='flex items-center gap-4 p-4 rounded-xl bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 hover:shadow-md transition-all group max-w-sm'
                >
                  <div className='w-10 h-10 rounded-xl bg-red-500/10 border border-red-200 dark:border-red-800 flex items-center justify-center flex-shrink-0'>
                    <FileText className='w-5 h-5 text-red-500' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-sm font-semibold text-foreground truncate group-hover:underline'>
                      {user.profile.resumeOriginalName}
                    </p>
                    <p className='text-xs text-muted-foreground mt-0.5'>PDF Document</p>
                  </div>
                  <Download className='w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0' />
                </a>
              ) : (
                <div className='text-center py-8 border-2 border-dashed border-border rounded-xl'>
                  <FileText className='w-8 h-8 text-muted-foreground/30 mx-auto mb-2' />
                  <p className='text-sm text-muted-foreground font-medium'>No resume uploaded</p>
                  <p className='text-xs text-muted-foreground mt-1'>Edit your profile to upload a resume</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className='profile-section bg-card border border-border rounded-xl p-5 shadow-sm mt-5' style={{ opacity: 0 }}>
            <h2 className='font-semibold text-sm text-foreground mb-4 flex items-center gap-2'>
              <Briefcase className='w-4 h-4 text-primary' />
              Applied Openings
            </h2>
            <AppliedJobTable />
          </div>
        )}
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
      <Footer />
    </div>
  );
}

export default Profile