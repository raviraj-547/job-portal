import React, { useEffect, useState, useRef } from 'react'
import Navbar from '../shared/Navbar'
import { ArrowLeft, Loader2, Save, FileText, Image, Globe, MapPin, AlignLeft, Info } from 'lucide-react'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

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
    const pageRef = useRef(null);

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
        if (input.file && typeof input.file === 'object') {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
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
            file: singleCompany?.logo || null
        })
    }, [singleCompany]);

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
        { name: 'name', label: 'Company Name', placeholder: 'JobHunt Inc.', icon: Info },
        { name: 'description', label: 'Company Description', placeholder: 'A leading SaaS provider...', icon: AlignLeft },
        { name: 'website', label: 'Website Link', placeholder: 'https://example.com', icon: Globe },
        { name: 'location', label: 'Location', placeholder: 'Bangalore, India', icon: MapPin },
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
                            onClick={() => navigate("/admin/companies")}
                            className='w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all cursor-pointer shadow-sm flex-shrink-0'
                        >
                            <ArrowLeft className='w-5 h-5' />
                        </button>
                        <div>
                            <h1 className='text-xl font-extrabold text-foreground tracking-tight'>Company Setup</h1>
                            <p className='text-muted-foreground text-sm mt-0.5'>Provide brand name, logo and summary profile details</p>
                        </div>
                    </div>

                    {/* Form Card */}
                    <div className='admin-card bg-card border border-border rounded-2xl p-8 space-y-6 shadow-sm' style={{ opacity: 0 }}>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                            {fields.map(({ name, label, placeholder, icon: Icon }) => (
                                <div key={name} className='space-y-1.5'>
                                    <label className='text-xs font-semibold text-foreground uppercase tracking-wider block'>{label}</label>
                                    <div className='relative'>
                                        <Icon className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                                        <input
                                            type="text"
                                            name={name}
                                            value={input[name]}
                                            onChange={changeEventHandler}
                                            placeholder={placeholder}
                                            className='input-premium pl-9 text-sm'
                                        />
                                    </div>
                                </div>
                            ))}

                            {/* File Upload */}
                            <div className='space-y-1.5 md:col-span-2'>
                                <label className='text-xs font-semibold text-foreground uppercase tracking-wider block'>Company Logo</label>
                                <label className='flex items-center gap-3 p-3 rounded-xl border-2 border-dashed border-border bg-card hover:bg-muted cursor-pointer transition-all group'>
                                    <div className='w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0'>
                                        <Image className='w-5 h-5 text-primary' />
                                    </div>
                                    <div className='flex-1 min-w-0'>
                                        <p className='text-sm font-semibold text-foreground truncate'>
                                            {input.file ? (typeof input.file === 'object' ? input.file.name : input.file.split('/').pop()) : 'Upload logo image'}
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
                                        <span className='text-[10px] font-bold text-muted-foreground uppercase tracking-wider'>Active Logo:</span>
                                        <img src={singleCompany.logo} alt="current logo" className='w-6 h-6 rounded-md object-cover border border-border bg-white' />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Submit Actions */}
                        <div className='pt-5 border-t border-border mt-4'>
                            <button
                                type="submit"
                                disabled={loading}
                                className='w-full btn-primary rounded-xl py-3 text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-sm'
                            >
                                {loading ? (
                                    <><Loader2 className='w-4 h-4 animate-spin' /> Saving...</>
                                ) : (
                                    <><Save className='w-4 h-4' /> Save Changes</>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CompanySetup