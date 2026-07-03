import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';
import { Users, FileUser, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { applicants } = useSelector(store => store.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllApplicants();
    }, []);

    return (
        <div className='min-h-screen bg-[#f8f9fa]'>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10 px-4 pb-16'>
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8'
                >
                    <div className='flex items-center gap-3'>
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className='w-9 h-9 rounded-xl bg-white border border-[#ebedf5] flex items-center justify-center text-[#5e6475] hover:text-[#5d53c4] hover:border-[#e0dbff] hover:bg-[#f1efff] transition-all cursor-pointer'
                        >
                            <ArrowLeft className='w-4 h-4' />
                        </button>
                        <div>
                            <h1 className='text-xl font-extrabold text-[#1a1a24]'>
                                Job Applicants List
                            </h1>
                            <p className='text-[#5e6475] text-xs font-semibold mt-0.5'>Review resume portfolios and shortlist candidates</p>
                        </div>
                    </div>

                    {/* Stats Counter */}
                    <div className='flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#f1efff] border border-[#e0dbff] w-fit shadow-sm'>
                        <FileUser className='w-4 h-4 text-[#5d53c4]' />
                        <span className='text-[#5e6475] text-[10px] font-bold uppercase tracking-wider'>Total Applications:</span>
                        <span className='text-white font-bold text-xs bg-[#5d53c4] px-2.5 py-0.5 rounded-lg'>
                            {applicants?.applications?.length || 0}
                        </span>
                    </div>
                </motion.div>

                {/* Table Card */}
                <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className='bg-white border border-[#ebedf5] rounded-3xl p-6 shadow-sm'
                >
                    <ApplicantsTable />
                </motion.div>
            </div>
        </div>
    )
}

export default Applicants