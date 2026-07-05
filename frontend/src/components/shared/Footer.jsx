import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Mail, ArrowUpRight } from "lucide-react";

// Inline SVGs for Brand Icons since lucide-react removed them
const Github = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>;
const Linkedin = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>;
const Twitter = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>;
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      footerRef.current.querySelectorAll('.footer-col'),
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          once: true,
        }
      }
    );
  }, { scope: footerRef });

  const currentYear = new Date().getFullYear();

  return (
    <footer ref={footerRef} className='border-t border-border bg-card mt-24'>
      <div className='max-w-7xl mx-auto px-4 lg:px-6 py-14'>
        <div className='grid grid-cols-1 md:grid-cols-5 gap-10'>

          {/* Brand Column */}
          <div className='md:col-span-2 footer-col'>
            <Link to="/" className='flex items-center gap-2.5 mb-4 w-fit'>
              <div className='w-8 h-8 rounded-lg flex items-center justify-center shadow-sm'
                style={{ background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)' }}>
                <Briefcase className='w-4 h-4 text-white' />
              </div>
              <span className='font-bold text-base text-foreground'>
                Job<span className='text-gradient'>Portal</span>
              </span>
            </Link>

            <p className='text-sm text-muted-foreground leading-relaxed max-w-xs mb-6'>
              The modern way to find your dream job. Connect with top companies and accelerate your career.
            </p>

            {/* Social Links */}
            <div className='flex gap-2'>
              {[
                { href: 'https://twitter.com', Icon: Twitter, label: 'Twitter' },
                { href: 'https://linkedin.com', Icon: Linkedin, label: 'LinkedIn' },
                { href: 'https://github.com', Icon: Github, label: 'GitHub' },
                { href: 'mailto:hello@jobportal.com', Icon: Mail, label: 'Email' },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className='w-8 h-8 rounded-lg bg-muted border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-primary/5 transition-all'
                >
                  <Icon className='w-3.5 h-3.5' />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div className='footer-col'>
            <h3 className='text-xs font-semibold text-foreground uppercase tracking-widest mb-4'>Explore</h3>
            <ul className='space-y-3'>
              {[
                { to: '/', label: 'Home' },
                { to: '/jobs', label: 'Browse Jobs' },
                { to: '/browse', label: 'All Listings' },
                { to: '/profile', label: 'My Profile' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className='text-sm text-muted-foreground hover:text-foreground transition-colors font-medium inline-flex items-center gap-1 group'
                  >
                    {label}
                    <ArrowUpRight className='w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity' />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className='footer-col'>
            <h3 className='text-xs font-semibold text-foreground uppercase tracking-widest mb-4'>Company</h3>
            <ul className='space-y-3'>
              {['About Us', 'Careers', 'Blog', 'Press'].map(label => (
                <li key={label}>
                  <span className='text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer font-medium'>
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className='footer-col'>
            <h3 className='text-xs font-semibold text-foreground uppercase tracking-widest mb-4'>Legal</h3>
            <ul className='space-y-3'>
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Accessibility'].map(label => (
                <li key={label}>
                  <span className='text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer font-medium'>
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className='border-t border-border mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3'>
          <p className='text-xs text-muted-foreground'>
            © {currentYear} JobPortal, Inc. All rights reserved.
          </p>
          <div className='flex items-center gap-1 text-xs text-muted-foreground'>
            <span>Crafted for ambitious careers</span>
            <span className='text-red-400'>♥</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;