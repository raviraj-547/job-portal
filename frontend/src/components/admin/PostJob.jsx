import React, { useState, useRef } from 'react'
import Navbar from '../shared/Navbar'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2, Save, FileText, MapPin, Briefcase, IndianRupee, Users, Star, ArrowLeft } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const pageRef = useRef(null);

    const { companies } = useSelector(store => store.company);
    
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        if (selectedCompany) {
            setInput({ ...input, companyId: selectedCompany._id });
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!input.companyId) {
            toast.error("Please select a company.");
            return;
        }
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to post job.");
        } finally {
            setLoading(false);
        }
    }

    useGSAP(() => {
        if (!pageRef.current) return;
        const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
        tl.fromTo(pageRef.current.querySelector('.admin-header'),
            { opacity: 0, y: -15 },
            { opacity: 1, y: 0, duration: 0.5 }
        )
        .fromTo(pageRef.current.querySelector('.admin-card'),
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.5 },
            '-=0.3'
        );
    }, { scope: pageRef });

    const fields = [
        { name: 'title', label: 'Job Opening Title', placeholder: 'React Developer', icon: Briefcase, type: 'text' },
        { name: 'description', label: 'Brief Summary description', placeholder: 'Seeking a skilled frontend builder...', icon: FileText, type: 'text' },
        { name: 'requirements', label: 'Job Requirements (comma separated list)', placeholder: 'React, Tailwind CSS, TypeScript', icon: Star, type: 'text' },
        { name: 'salary', label: 'Package Salary (LPA)', placeholder: '10', icon: IndianRupee, type: 'text' },
        { name: 'location', label: 'Work Location', placeholder: 'Bangalore, India', icon: MapPin, type: 'text' },
        { name: 'jobType', label: 'Hiring Type', placeholder: 'Full-Time, Contract', icon: Briefcase, type: 'text' },
        { name: 'experience', label: 'Min Experience (years)', placeholder: '2', icon: Star, type: 'text' },
        { name: 'position', label: 'Number of Open Positions', placeholder: '3', icon: Users, type: 'number' },
    ]

    return (
        <div className='min-h-screen bg-background'>
            <Navbar />
            <div ref={pageRef} className='max-w-3xl mx-auto my-10 px-4 pb-16'>
                <form onSubmit={submitHandler} className='space-y-6'>
                    {/* Header */}
                    <div className='admin-header flex items-center gap-4' style={{ opacity: 0 }}>
                        <button
                            type="button"
                            onClick={() => navigate("/admin/jobs")}
                            className='w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all cursor-pointer shadow-sm flex-shrink-0'
                        >
                            <ArrowLeft className='w-5 h-5' />
                        </button>
                        <div>
                            <h1 className='text-xl font-extrabold text-foreground tracking-tight'>Post Vacant Job Opening</h1>
                            <p className='text-muted-foreground text-sm mt-0.5'>Provide details of the role to publish online</p>
                        </div>
                    </div>

                    {/* Edit Form Card */}
                    <div className='admin-card bg-card border border-border rounded-2xl p-8 space-y-6 shadow-sm' style={{ opacity: 0 }}>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                            {fields.map(({ name, label, placeholder, icon: Icon, type }) => (
                                <div key={name} className='space-y-1.5'>
                                    <label className='text-xs font-semibold text-foreground uppercase tracking-wider block'>{label}</label>
                                    <div className='relative'>
                                        <Icon className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                                        <input
                                            type={type}
                                            name={name}
                                            value={input[name]}
                                            onChange={changeEventHandler}
                                            placeholder={placeholder}
                                            className='input-premium pl-9 text-sm'
                                        />
                                    </div>
                                </div>
                            ))}

                            {/* Select Company */}
                            <div className='space-y-1.5 md:col-span-2'>
                                <label className='text-xs font-semibold text-foreground uppercase tracking-wider block'>Associated Company</label>
                                {companies.length > 0 ? (
                                    <Select onValueChange={selectChangeHandler}>
                                        <SelectTrigger className="w-full bg-card border border-border rounded-xl h-11 text-foreground text-sm outline-none hover:border-primary/40 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all">
                                            <SelectValue placeholder="Select a Company" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-card border-border text-foreground">
                                            <SelectGroup>
                                                {companies.map((company) => (
                                                    <SelectItem 
                                                        key={company._id} 
                                                        value={company?.name?.toLowerCase()}
                                                        className="hover:bg-muted focus:bg-muted focus:text-foreground cursor-pointer text-sm"
                                                    >
                                                        {company.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                ) : (
                                    <div className='p-3.5 rounded-xl border border-red-200 dark:border-red-800/50 bg-red-50 dark:bg-red-950/20 text-red-500 text-xs font-bold'>
                                        * Please register a company profile first before publishing jobs.
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className='pt-5 border-t border-border mt-4'>
                            {companies.length > 0 ? (
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className='w-full btn-primary rounded-xl py-3 text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-sm'
                                >
                                    {loading ? (
                                        <><Loader2 className='w-4 h-4 animate-spin' /> Publishing job...</>
                                    ) : (
                                        <><Save className='w-4 h-4' /> Publish Job Opening</>
                                    )}
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    disabled
                                    className='w-full bg-muted border border-border text-muted-foreground rounded-xl py-3 text-sm font-bold cursor-not-allowed'
                                >
                                    Register Company First
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PostJob