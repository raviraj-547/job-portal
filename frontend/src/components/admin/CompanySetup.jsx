import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { ArrowLeft, Loader2, Save, FileText, Image, Globe, MapPin, AlignLeft, Info } from 'lucide-react'
import { Label } from '../ui/label'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'
import { motion } from 'framer-motion'

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });
    const { singleCompany } = useSelector(store => store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to update company.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setInput({
            name: singleCompany?.name || "",
            description: singleCompany?.description || "",
            website: singleCompany?.website || "",
            location: singleCompany?.location || "",
            file: singleCompany?.file || null
        })
    }, [singleCompany]);

    const fields = [
        { name: 'name', label: 'Company Name', placeholder: 'JobHunt Inc.', icon: Info },
        { name: 'description', label: 'Company Description', placeholder: 'A leading SaaS provider...', icon: AlignLeft },
        { name: 'website', label: 'Website Link', placeholder: 'https://example.com', icon: Globe },
        { name: 'location', label: 'Location', placeholder: 'Bangalore, India', icon: MapPin },
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
                            onClick={() => navigate("/admin/companies")}
                            className='w-9 h-9 rounded-xl bg-white border border-[#ebedf5] flex items-center justify-center text-[#5e6475] hover:text-[#5d53c4] hover:border-[#e0dbff] hover:bg-[#f1efff] transition-all cursor-pointer'
                        >
                            <ArrowLeft className='w-4 h-4' />
                        </button>
                        <div>
                            <h1 className='text-xl font-extrabold text-[#1a1a24]'>Company Onboarding Details</h1>
                            <p className='text-[#5e6475] text-xs font-semibold mt-0.5'>Provide brand name, logo and summary profile details</p>
                        </div>
                    </div>

                    {/* Form Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className='bg-white border border-[#ebedf5] rounded-3xl p-8 space-y-6 shadow-sm'
                    >
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                            {fields.map(({ name, label, placeholder, icon: Icon }) => (
                                <div key={name} className='space-y-1.5'>
                                    <Label className='text-[#5e6475] text-[10px] font-bold uppercase tracking-wider'>{label}</Label>
                                    <div className='relative'>
                                        <Icon className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a0a6b5]' />
                                        <input
                                            type="text"
                                            name={name}
                                            value={input[name]}
                                            onChange={changeEventHandler}
                                            placeholder={placeholder}
                                            className='w-full bg-[#f8f9fa] border border-[#e1e4ed] rounded-xl pl-9 pr-4 py-2.5 text-xs text-[#1a1a24] placeholder:text-[#a0a6b5] outline-none focus:border-[#5d53c4] focus:bg-white transition-all'
                                        />
                                    </div>
                                </div>
                            ))}

                            {/* File Upload */}
                            <div className='space-y-1.5 md:col-span-2'>
                                <Label className='text-[#5e6475] text-[10px] font-bold uppercase tracking-wider'>Company Logo Image</Label>
                                <label className='flex items-center gap-3 p-3 rounded-xl border border-[#ebedf5] bg-[#f8f9fa] cursor-pointer hover:border-[#5d53c4]/50 transition-all group'>
                                    <div className='w-8 h-8 rounded-lg bg-[#e8f4fd] border border-[#d1e8fc] flex items-center justify-center flex-shrink-0'>
                                        <Image className='w-4 h-4 text-[#0d47a1]' />
                                    </div>
                                    <div className='flex-1 min-w-0'>
                                        <p className='text-xs text-[#a0a6b5] group-hover:text-slate-600 truncate'>
                                            {input.file && typeof input.file === 'object' ? input.file.name : 'Select business logo photo'}
                                        </p>
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={changeFileHandler}
                                        className='hidden'
                                    />
                                </label>
                                {singleCompany?.logo && (
                                    <div className='flex items-center gap-2 mt-2 px-1'>
                                        <span className='text-[10px] font-bold text-[#a0a6b5] uppercase tracking-wider'>Active Logo:</span>
                                        <img src={singleCompany.logo} alt="current logo" className='w-6 h-6 rounded-md object-cover border border-[#ebedf5]' />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Submit Actions */}
                        <div className='pt-4 border-t border-[#ebedf5]'>
                            <button
                                type="submit"
                                disabled={loading}
                                className='w-full btn-pastel-primary rounded-xl py-3 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-sm'
                            >
                                {loading ? (
                                    <><Loader2 className='w-3.5 h-3.5 animate-spin' /> Saving details...</>
                                ) : (
                                    <><Save className='w-3.5 h-3.5' /> Save Changes</>
                                )}
                            </button>
                        </div>
                    </motion.div>
                </form>
            </div>
        </div>
    )
}

export default CompanySetup