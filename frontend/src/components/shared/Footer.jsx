import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Mail, Globe, Sparkles, BookOpen } from 'lucide-react';

const Footer = () => {
  return (
    <footer className='border-t border-[#ebedf5] bg-white mt-20'>
      <div className='max-w-7xl mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* Brand */}
          <div className='md:col-span-2 space-y-4'>
            <div className='flex items-center gap-2'>
              <div className='w-8 h-8 rounded-xl bg-[#5d53c4] flex items-center justify-center shadow-sm'>
                <Briefcase className='w-4 h-4 text-white' />
              </div>
              <span className='text-md font-bold text-[#1a1a24]'>
                Job<span className='text-[#5d53c4]'>Portal</span>
              </span>
            </div>
            <p className='text-[#5e6475] text-xs leading-relaxed max-w-xs'>
              The friendliest and most intuitive job platform. Connect with top companies and grow your career.
            </p>
            <div className='flex gap-3 pt-1'>
              <a href="https://twitter.com" aria-label="Twitter" className='w-8.5 h-8.5 rounded-xl bg-[#f5f6fa] border border-[#ebedf5] flex items-center justify-center text-[#5e6475] hover:text-[#5d53c4] hover:border-[#e0dbff] hover:bg-[#f1efff] transition-all'>
                <Globe className='w-3.5 h-3.5' />
              </a>
              <a href="https://linkedin.com" aria-label="LinkedIn" className='w-8.5 h-8.5 rounded-xl bg-[#f5f6fa] border border-[#ebedf5] flex items-center justify-center text-[#5e6475] hover:text-[#5d53c4] hover:border-[#e0dbff] hover:bg-[#f1efff] transition-all'>
                <Sparkles className='w-3.5 h-3.5' />
              </a>
              <a href="https://github.com" aria-label="GitHub" className='w-8.5 h-8.5 rounded-xl bg-[#f5f6fa] border border-[#ebedf5] flex items-center justify-center text-[#5e6475] hover:text-[#5d53c4] hover:border-[#e0dbff] hover:bg-[#f1efff] transition-all'>
                <BookOpen className='w-3.5 h-3.5' />
              </a>
              <a href="mailto:hello@jobportal.com" aria-label="Email" className='w-8.5 h-8.5 rounded-xl bg-[#f5f6fa] border border-[#ebedf5] flex items-center justify-center text-[#5e6475] hover:text-[#5d53c4] hover:border-[#e0dbff] hover:bg-[#f1efff] transition-all'>
                <Mail className='w-3.5 h-3.5' />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='text-xs font-bold text-[#1a1a24] uppercase tracking-wider mb-4'>Explore</h3>
            <ul className='space-y-2'>
              {[['/', 'Home'], ['/jobs', 'Browse Jobs'], ['/browse', 'All Listings'], ['/profile', 'My Profile']].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className='text-xs text-[#5e6475] hover:text-[#5d53c4] transition-colors font-medium'>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className='text-xs font-bold text-[#1a1a24] uppercase tracking-wider mb-4'>Company</h3>
            <ul className='space-y-2'>
              {['About Us', 'Careers', 'Privacy Policy', 'Terms of Service'].map(label => (
                <li key={label}>
                  <span className='text-xs text-[#5e6475] hover:text-[#5d53c4] transition-colors cursor-pointer font-medium'>
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className='border-t border-[#ebedf5] mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4'>
          <p className='text-[#a0a6b5] text-xs font-medium'>© 2026 JobPortal. All rights reserved.</p>
          <p className='text-[#a0a6b5] text-xs font-medium'>Designed with clean minimalist pastel aesthetics</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;