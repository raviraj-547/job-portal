import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal, FileText, Calendar, Check, X, ShieldAlert } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        try {
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status }, { withCredentials: true });
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update candidate status.");
        }
    }

    if (!applicants?.applications || applicants.applications.length === 0) {
        return (
            <div className='flex flex-col items-center py-10 text-center'>
                <ShieldAlert className='w-10 h-10 text-slate-300 mb-2' />
                <p className='text-[#5e6475] font-semibold text-xs'>No applicants for this opening yet.</p>
                <p className='text-[#a0a6b5] text-[10px] mt-0.5'>Applications submitted by candidates will show up here.</p>
            </div>
        )
    }

    return (
        <div className='overflow-hidden rounded-2xl border border-[#ebedf5]'>
            <Table>
                <TableHeader>
                    <TableRow className='border-[#ebedf5] hover:bg-transparent bg-[#f5f6fa]'>
                        <TableHead className='text-[#5e6475] text-[10px] font-bold uppercase tracking-wider py-3.5 pl-5'>FullName</TableHead>
                        <TableHead className='text-[#5e6475] text-[10px] font-bold uppercase tracking-wider py-3.5'>Email Address</TableHead>
                        <TableHead className='text-[#5e6475] text-[10px] font-bold uppercase tracking-wider py-3.5'>Contact Number</TableHead>
                        <TableHead className='text-[#5e6475] text-[10px] font-bold uppercase tracking-wider py-3.5'>Resume Document</TableHead>
                        <TableHead className='text-[#5e6475] text-[10px] font-bold uppercase tracking-wider py-3.5'>Applied Date</TableHead>
                        <TableHead className='text-[#5e6475] text-[10px] font-bold uppercase tracking-wider py-3.5 text-right pr-5'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applicants.applications.map((item) => (
                        <TableRow 
                            key={item._id} 
                            className='border-[#ebedf5] hover:bg-[#fcfcff] transition-colors'
                        >
                            <TableCell className='text-[#1a1a24] text-xs font-bold py-3.5 pl-5'>
                                {item?.applicant?.fullname}
                            </TableCell>
                            <TableCell className='text-[#5e6475] text-xs py-3.5'>
                                {item?.applicant?.email}
                            </TableCell>
                            <TableCell className='text-[#5e6475] text-xs py-3.5 font-mono'>
                                {item?.applicant?.phoneNumber || 'NA'}
                            </TableCell>
                            <TableCell className='py-3.5'>
                                {item.applicant?.profile?.resume ? (
                                    <a 
                                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5d53c4] hover:underline cursor-pointer" 
                                        href={item?.applicant?.profile?.resume} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                    >
                                        <FileText className='w-3.5 h-3.5 text-red-500' />
                                        <span className='truncate max-w-[120px]'>{item?.applicant?.profile?.resumeOriginalName}</span>
                                    </a>
                                ) : (
                                    <span className='text-[#a0a6b5] text-xs font-semibold'>No Resume</span>
                                )}
                            </TableCell>
                            <TableCell className='text-[#5e6475] text-xs py-3.5'>
                                <div className='flex items-center gap-1.5'>
                                    <Calendar className='w-3.5 h-3.5 text-slate-400' />
                                    <span>{item?.applicant?.createdAt?.split("T")[0]}</span>
                                </div>
                            </TableCell>
                            <TableCell className='py-3.5 text-right pr-5'>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <button className='w-7.5 h-7.5 rounded-lg bg-[#f5f6fa] border border-[#ebedf5] flex items-center justify-center text-[#5e6475] hover:text-[#5d53c4] hover:border-[#e0dbff] hover:bg-[#f1efff] transition-all ml-auto cursor-pointer'>
                                            <MoreHorizontal className='w-4 h-4' />
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-32 bg-white border border-[#ebedf5] p-1.5 mt-1 rounded-2xl shadow-md">
                                        <div className='flex flex-col gap-1'>
                                            <button 
                                                onClick={() => statusHandler("Accepted", item?._id)} 
                                                className='flex w-full items-center gap-2 px-2.5 py-1.5 rounded-xl text-[#5e6475] hover:text-[#1b7c5f] hover:bg-[#e6f7f2] transition-all text-xs font-bold cursor-pointer'
                                            >
                                                <Check className='w-3.5 h-3.5 text-[#1b7c5f]' />
                                                <span>Accept</span>
                                            </button>
                                            <button 
                                                onClick={() => statusHandler("Rejected", item?._id)} 
                                                className='flex w-full items-center gap-2 px-2.5 py-1.5 rounded-xl text-[#5e6475] hover:text-red-500 hover:bg-red-50 transition-all text-xs font-bold cursor-pointer'
                                            >
                                                <X className='w-3.5 h-3.5 text-red-500' />
                                                <span>Reject</span>
                                            </button>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicantsTable