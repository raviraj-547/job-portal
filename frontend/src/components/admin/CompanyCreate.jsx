import React, { useState, useRef } from 'react'
import Navbar from '../shared/Navbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import { Building, ArrowRight, ArrowLeft } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState("");
    const dispatch = useDispatch();
    const pageRef = useRef(null);
    
    const registerNewCompany = async () => {
        if (!companyName.trim()) {
            toast.error("Company name is required.");
            return;
        }
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to register company.");
        }
    }

    useGSAP(() => {
        if (!pageRef.current) return;
        gsap.fromTo(pageRef.current.children,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: 'power2.out' }
        );
    }, { scope: pageRef });

    return (
        <div className='min-h-screen bg-background relative overflow-hidden'>
            <Navbar />
            
            {/* Background effects */}
            <div className='absolute inset-0 pointer-events-none overflow-hidden'>
                <div className='absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-30'
                     style={{ background: 'radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)' }} />
                <div className='absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full opacity-30'
                     style={{ background: 'radial-gradient(circle, hsl(var(--primary) / 0.1) 0%, transparent 70%)' }} />
            </div>

            <div className='relative z-10 flex items-center justify-center min-h-[calc(100vh-64px)] px-4 py-12'>
                <div ref={pageRef} className='w-full max-w-lg'>
                    {/* Header */}
                    <div className='text-center mb-8' style={{ opacity: 0 }}>
                        <div className='w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 shadow-sm border border-primary/20'>
                            <Building className='w-7 h-7 text-primary' />
                        </div>
                        <h1 className='text-2xl font-extrabold text-foreground tracking-tight'>Onboard Your Business</h1>
                        <p className='text-muted-foreground text-sm mt-1.5'>Set up a company profile to post hiring listings</p>
                    </div>

                    {/* Onboarding Card */}
                    <div className='bg-card border border-border rounded-2xl p-8 space-y-6 shadow-sm' style={{ opacity: 0 }}>
                        <div className='space-y-2'>
                            <label className='text-xs font-semibold text-foreground uppercase tracking-wider block'>
                                Company Name
                            </label>
                            <input
                                type="text"
                                placeholder="Microsoft, Google, JobHunt etc."
                                onChange={(e) => setCompanyName(e.target.value)}
                                className='input-premium w-full text-sm'
                            />
                            <p className='text-[11px] text-muted-foreground mt-1 font-medium'>
                                This brand name will display on candidate search cards. You can change this later.
                            </p>
                        </div>

                        {/* Actions */}
                        <div className='flex items-center gap-3 pt-4 border-t border-border'>
                            <button
                                onClick={() => navigate("/admin/companies")}
                                className='flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl btn-secondary text-sm font-semibold'
                            >
                                <ArrowLeft className='w-4 h-4' />
                                Cancel
                            </button>
                            <button
                                onClick={registerNewCompany}
                                className='flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl btn-primary text-sm font-semibold shadow-sm'
                            >
                                Continue
                                <ArrowRight className='w-4 h-4' />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate