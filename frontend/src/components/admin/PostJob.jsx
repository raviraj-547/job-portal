import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2, Save, FileText, MapPin, Briefcase, IndianRupee, Users, Star, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'

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
                headers: {
                    'Content-Type': 'application/json'
                },
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
        <div className='min-h-screen bg-[#f8f9fa]'>
            <Navbar />
            <div className='max-w-3xl mx-auto my-10 px-4 pb-16'>
                <form onSubmit={submitHandler} className='space-y-6'>
                    {/* Header */}
                    <div className='flex items-center gap-3'>
                        <button
                            type="button"
                            onClick={() => navigate("/admin/jobs")}
                            className='w-9 h-9 rounded-xl bg-white border border-[#ebedf5] flex items-center justify-center text-[#5e6475] hover:text-[#5d53c4] hover:border-[#e0dbff] hover:bg-[#f1efff] transition-all cursor-pointer'
                        >
                            <ArrowLeft className='w-4 h-4' />
                        </button>
                        <div>
                            <h1 className='text-xl font-extrabold text-[#1a1a24]'>Post Vacant Job Opening</h1>
                            <p className='text-[#5e6475] text-xs font-semibold mt-0.5'>Provide details of the role to publish online</p>
                        </div>
                    </div>

                    {/* Edit Form Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className='bg-white border border-[#ebedf5] rounded-3xl p-8 space-y-6 shadow-sm'
                    >
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                            {fields.map(({ name, label, placeholder, icon: Icon, type }) => (
                                <div key={name} className='space-y-1.5'>
                                    <Label className='text-[#5e6475] text-[10px] font-bold uppercase tracking-wider'>{label}</Label>
                                    <div className='relative'>
                                        <Icon className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a0a6b5]' />
                                        <input
                                            type={type}
                                            name={name}
                                            value={input[name]}
                                            onChange={changeEventHandler}
                                            placeholder={placeholder}
                                            className='w-full bg-[#f8f9fa] border border-[#e1e4ed] rounded-xl pl-9 pr-4 py-2.5 text-xs text-[#1a1a24] placeholder:text-[#a0a6b5] outline-none focus:border-[#5d53c4] focus:bg-white transition-all'
                                        />
                                    </div>
                                </div>
                            ))}

                            {/* Select Company */}
                            <div className='space-y-1.5 md:col-span-2'>
                                <Label className='text-[#5e6475] text-[10px] font-bold uppercase tracking-wider'>Associated Company</Label>
                                {companies.length > 0 ? (
                                    <Select onValueChange={selectChangeHandler}>
                                        <SelectTrigger className="w-full bg-[#f8f9fa] border border-[#e1e4ed] rounded-xl h-11 text-slate-700 text-xs focus:ring-[#5d53c4] focus:border-[#5d53c4] outline-none">
                                            <SelectValue placeholder="Select a Company" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border-[#ebedf5] text-slate-700">
                                            <SelectGroup>
                                                {companies.map((company) => (
                                                    <SelectItem 
                                                        key={company._id} 
                                                        value={company?.name?.toLowerCase()}
                                                        className="hover:bg-[#f1efff] focus:bg-[#f1efff] focus:text-[#5d53c4] cursor-pointer text-xs"
                                                    >
                                                        {company.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                ) : (
                                    <div className='p-3.5 rounded-xl border border-red-200 bg-red-50 text-red-500 text-xs font-bold'>
                                        * Please register a company profile first before publishing jobs.
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className='pt-4 border-t border-[#ebedf5]'>
                            {companies.length > 0 ? (
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className='w-full btn-pastel-primary rounded-xl py-3 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-sm'
                                >
                                    {loading ? (
                                        <><Loader2 className='w-3.5 h-3.5 animate-spin' /> Publishing job...</>
                                    ) : (
                                        <><Save className='w-3.5 h-3.5' /> Publish Job Opening</>
                                    )}
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    disabled
                                    className='w-full bg-[#f8f9fa] border border-[#e1e4ed] text-[#cbd0dd] rounded-xl py-3 text-xs font-bold cursor-not-allowed'
                                >
                                    Register Company First
                                </button>
                            )}
                        </div>
                    </motion.div>
                </form>
            </div>
        </div>
    )
}

export default PostJob