import React, { useEffect, useRef } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';
import { Users, FileUser, ArrowLeft } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { applicants } = useSelector(store => store.application);
    const pageRef = useRef(null);

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
    }, [params.id, dispatch]);

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

    return (
        <div className='min-h-screen bg-background'>
            <Navbar />
            <div ref={pageRef} className='max-w-6xl mx-auto my-10 px-4 pb-16'>
                {/* Header */}
                <div className='admin-header flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8' style={{ opacity: 0 }}>
                    <div className='flex items-center gap-4'>
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className='w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all cursor-pointer shadow-sm flex-shrink-0'
                        >
                            <ArrowLeft className='w-5 h-5' />
                        </button>
                        <div>
                            <h1 className='text-xl font-extrabold text-foreground tracking-tight'>
                                Job Applicants List
                            </h1>
                            <p className='text-muted-foreground text-sm mt-0.5'>Review resume portfolios and shortlist candidates</p>
                        </div>
                    </div>

                    {/* Stats Counter */}
                    <div className='flex items-center gap-2.5 px-4 py-3 rounded-xl bg-primary/10 border border-primary/20 w-fit shadow-sm'>
                        <FileUser className='w-4 h-4 text-primary' />
                        <span className='text-primary text-[11px] font-bold uppercase tracking-wider'>Total Applications:</span>
                        <span className='text-white font-bold text-xs bg-primary px-2.5 py-0.5 rounded-lg'>
                            {applicants?.applications?.length || 0}
                        </span>
                    </div>
                </div>

                {/* Table Card */}
                <div className='admin-card bg-card border border-border rounded-2xl p-6 shadow-sm' style={{ opacity: 0 }}>
                    <ApplicantsTable />
                </div>
            </div>
        </div>
    )
}

export default Applicants