import React, { useRef } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Layout,
  Server,
  BarChart3,
  PenTool,
  Layers,
  Settings,
  Smartphone,
  Brain,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { label: 'Frontend Developer', icon: Layout,      jobs: '220+ Openings', accent: '#2563EB' },
  { label: 'Backend Developer',  icon: Server,      jobs: '180+ Openings', accent: '#7C3AED' },
  { label: 'Data Science',       icon: BarChart3,   jobs: '140+ Openings', accent: '#10B981' },
  { label: 'Graphic Designer',   icon: PenTool,     jobs: '95+ Openings',  accent: '#F59E0B' },
  { label: 'FullStack Developer',icon: Layers,      jobs: '310+ Openings', accent: '#2563EB' },
  { label: 'DevOps Engineer',    icon: Settings,    jobs: '120+ Openings', accent: '#06B6D4' },
  { label: 'Mobile Developer',   icon: Smartphone,  jobs: '150+ Openings', accent: '#7C3AED' },
  { label: 'AI / ML Engineer',   icon: Brain,       jobs: '200+ Openings', accent: '#EF4444' },
  { label: 'Cybersecurity',      icon: ShieldCheck, jobs: '80+ Openings',  accent: '#10B981' },
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sectionRef = useRef(null);

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  }

  useGSAP(() => {
    // Section heading
    gsap.fromTo(
      sectionRef.current.querySelector('.cat-heading'),
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        }
      }
    );

    // Carousel items stagger
    gsap.fromTo(
      sectionRef.current.querySelectorAll('.cat-card'),
      { opacity: 0, y: 30, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.06,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className='py-24 px-4 bg-background border-b border-border'>
      <div className='max-w-6xl mx-auto'>

        {/* Heading */}
        <div className='cat-heading text-center mb-14' style={{ opacity: 0 }}>
          <div className='section-divider' />
          <h2 className='text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight mb-3'>
            Browse by <span className='text-gradient'>Category</span>
          </h2>
          <p className='text-muted-foreground text-sm max-w-md mx-auto'>
            Explore thousands of active opportunities across leading industry verticals
          </p>
        </div>

        <Carousel className="w-full relative">
          <CarouselContent className="-ml-4">
            {categories.map((cat) => {
              const IconComponent = cat.icon;
              return (
                <CarouselItem key={cat.label} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 pl-4">
                  <button
                    onClick={() => searchJobHandler(cat.label)}
                    className='cat-card w-full group relative cursor-pointer text-left p-5 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-lg transition-all duration-300 flex flex-col gap-4 h-[160px] overflow-hidden'
                    style={{ opacity: 0 }}
                    aria-label={`Browse ${cat.label} jobs`}
                  >
                    {/* Accent glow on hover */}
                    <div
                      className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none'
                      style={{
                        background: `radial-gradient(ellipse at top left, ${cat.accent}10 0%, transparent 70%)`
                      }}
                    />

                    <div>
                      {/* Icon */}
                      <div
                        className='w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110'
                        style={{ background: `${cat.accent}15`, color: cat.accent }}
                      >
                        <IconComponent className='w-5 h-5' />
                      </div>

                      {/* Label */}
                      <p className='text-sm font-semibold text-foreground leading-tight group-hover:text-primary transition-colors duration-200'>
                        {cat.label}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className='flex items-center justify-between mt-auto'>
                      <span className='text-xs font-medium text-muted-foreground'>
                        {cat.jobs}
                      </span>
                      <div className='w-6 h-6 rounded-lg bg-muted border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300'>
                        <ArrowRight className='w-3 h-3 text-primary' />
                      </div>
                    </div>
                  </button>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className='bg-card border-border text-muted-foreground hover:bg-muted hover:text-foreground -left-3 shadow-md w-9 h-9' />
          <CarouselNext className='bg-card border-border text-muted-foreground hover:bg-muted hover:text-foreground -right-3 shadow-md w-9 h-9' />
        </Carousel>
      </div>
    </section>
  );
}

export default CategoryCarousel