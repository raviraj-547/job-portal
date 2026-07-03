import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import { Building, ArrowRight, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState("");
    const dispatch = useDispatch();
    
    const registerNewCompany = async () => {
        if (!companyName.trim()) {
            toast.error("Company name is required.");
            return;
        }
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: {
                    'Content-Type': 'application/json'
                },
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

    return (
        <div className='min-h-screen bg-[#f8f9fa] relative overflow-hidden'>
            <Navbar />
            
            {/* Decorative orbs */}
            <div className='glow-orb w-72 h-72 bg-purple-100 top-20 -left-20' />
            <div className='glow-orb w-60 h-60 bg-teal-50 bottom-10 right-0' />

            <div className='relative z-10 flex items-center justify-center min-h-[calc(100vh-64px)] px-4 py-12'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='w-full max-w-lg'
                >
                    {/* Header */}
                    <div className='text-center mb-6'>
                        <div className='w-12 h-12 rounded-2xl bg-[#5d53c4] flex items-center justify-center mx-auto mb-3 shadow-md shadow-purple-500/10'>
                            <Building className='w-6 h-6 text-white' />
                        </div>
                        <h1 className='text-xl font-extrabold text-[#1a1a24]'>Onboard Your Business</h1>
                        <p className='text-[#5e6475] text-xs font-semibold mt-1'>Set up a company profile to post hiring listings</p>
                    </div>

                    {/* Onboarding Card */}
                    <div className='bg-white border border-[#ebedf5] rounded-3xl p-8 space-y-6 shadow-sm'>
                        <div className='space-y-1.5'>
                            <Label className='text-[#5e6475] text-[10px] font-bold uppercase tracking-wider'>Company Name</Label>
                            <input
                                type="text"
                                placeholder="Microsoft, Google, JobHunt etc."
                                onChange={(e) => setCompanyName(e.target.value)}
                                className='w-full bg-[#f8f9fa] border border-[#e1e4ed] rounded-xl px-4 py-3 text-xs text-[#1a1a24] placeholder:text-[#a0a6b5] outline-none focus:border-[#5d53c4] focus:bg-white transition-all'
                            />
                            <p className='text-[10px] text-[#a0a6b5] mt-1 font-medium'>This brand name will display on candidate search cards. You can change this later.</p>
                        </div>

                        {/* Actions */}
                        <div className='flex items-center gap-3 pt-2'>
                            <button
                                onClick={() => navigate("/admin/companies")}
                                className='flex-1 flex items-center justify-center gap-1 py-2.5 rounded-xl btn-pastel-secondary text-xs cursor-pointer'
                            >
                                <ArrowLeft className='w-3.5 h-3.5' />
                                Cancel
                            </button>
                            <button
                                onClick={registerNewCompany}
                                className='flex-1 flex items-center justify-center gap-1 py-2.5 rounded-xl btn-pastel-primary text-xs cursor-pointer shadow-sm'
                            >
                                Continue
                                <ArrowRight className='w-3.5 h-3.5' />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default CompanyCreate