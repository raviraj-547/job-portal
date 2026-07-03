import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import { motion } from 'framer-motion';

import { 
    Layout, 
    Server, 
    BarChart3, 
    PenTool, 
    Layers, 
    Settings, 
    Smartphone,
    ArrowRight 
} from 'lucide-react';

const categories = [
    { 
        label: "Frontend Developer", 
        icon: Layout, 
        jobs: "220+ Openings",
        bg: "bg-[#f3efff] border-[#e0dbff] text-[#5d53c4]",
        iconBg: "bg-white/60 text-[#5d53c4]"
    },
    { 
        label: "Backend Developer", 
        icon: Server, 
        jobs: "180+ Openings",
        bg: "bg-[#e8f4fd] border-[#d1e8fc] text-[#0d47a1]",
        iconBg: "bg-white/60 text-[#0d47a1]"
    },
    { 
        label: "Data Science", 
        icon: BarChart3, 
        jobs: "140+ Openings",
        bg: "bg-[#e6f7f2] border-[#d2f2e8] text-[#1b7c5f]",
        iconBg: "bg-white/60 text-[#1b7c5f]"
    },
    { 
        label: "Graphic Designer", 
        icon: PenTool, 
        jobs: "95+ Openings",
        bg: "bg-[#fff2eb] border-[#ffe3d3] text-[#d35400]",
        iconBg: "bg-white/60 text-[#d35400]"
    },
    { 
        label: "FullStack Developer", 
        icon: Layers, 
        jobs: "310+ Openings",
        bg: "bg-[#f3efff] border-[#e0dbff] text-[#5d53c4]",
        iconBg: "bg-white/60 text-[#5d53c4]"
    },
    { 
        label: "DevOps Engineer", 
        icon: Settings, 
        jobs: "120+ Openings",
        bg: "bg-[#e8f4fd] border-[#d1e8fc] text-[#0d47a1]",
        iconBg: "bg-white/60 text-[#0d47a1]"
    },
    { 
        label: "Mobile Developer", 
        icon: Smartphone, 
        jobs: "150+ Openings",
        bg: "bg-[#e6f7f2] border-[#d2f2e8] text-[#1b7c5f]",
        iconBg: "bg-white/60 text-[#1b7c5f]"
    },
]

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <section className='py-20 px-4 bg-gradient-to-b from-white to-[#f8f9fa] border-b border-[#ebedf5]'>
            <div className='max-w-5xl mx-auto'>
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className='text-center mb-12'
                >
                    <h2 className='text-3xl font-extrabold text-[#1a1a24] mb-3 tracking-tight'>
                        Search by <span className='text-[#5d53c4]'>Category</span>
                    </h2>
                    <p className='text-[#5e6475] text-sm font-semibold max-w-md mx-auto'>
                        Explore thousands of active job opportunities across leading industry verticals
                    </p>
                </motion.div>

                <Carousel className="w-full relative px-4">
                    <CarouselContent className="-ml-4">
                        {categories.map((cat) => {
                            const IconComponent = cat.icon;
                            return (
                                <CarouselItem key={cat.label} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 pl-4">
                                    <button
                                        onClick={() => searchJobHandler(cat.label)}
                                        className={`w-full ${cat.bg} border rounded-3xl p-6 text-left transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_24px_-10px_rgba(93,83,196,0.15)] cursor-pointer group relative flex flex-col justify-between h-[156px]`}
                                    >
                                        <div>
                                            <div className={`w-10 h-10 rounded-2xl ${cat.iconBg} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
                                                <IconComponent className="w-5 h-5" />
                                            </div>
                                            <span className='text-sm font-bold block text-[#1a1a24] tracking-tight group-hover:text-[#5d53c4] transition-colors duration-200'>
                                                {cat.label}
                                            </span>
                                        </div>
                                        <div className='flex items-center justify-between mt-4 w-full'>
                                            <span className='text-[11px] font-semibold text-[#5e6475]'>
                                                {cat.jobs}
                                            </span>
                                            <div className='w-7 h-7 rounded-xl bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 shadow-sm border border-[#ebedf5]'>
                                                <ArrowRight className="w-3.5 h-3.5 text-[#5d53c4]" />
                                            </div>
                                        </div>
                                    </button>
                                </CarouselItem>
                            );
                        })}
                    </CarouselContent>
                    <CarouselPrevious className='bg-white border-[#ebedf5] text-[#5e6475] hover:bg-[#f5f6fa] hover:text-[#1a1a24] -left-2 shadow-md w-10 h-10' />
                    <CarouselNext className='bg-white border-[#ebedf5] text-[#5e6475] hover:bg-[#f5f6fa] hover:text-[#1a1a24] -right-2 shadow-md w-10 h-10' />
                </Carousel>
            </div>
        </section>
    )
}

export default CategoryCarousel