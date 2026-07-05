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
            <div className='flex flex-col items-center py-14 text-center border-2 border-dashed border-border rounded-xl'>
                <div className='w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3'>
                    <ShieldAlert className='w-6 h-6 text-muted-foreground/60' />
                </div>
                <p className='text-foreground font-semibold text-sm'>No applicants for this opening yet.</p>
                <p className='text-muted-foreground text-xs mt-1 max-w-sm'>
                    Applications submitted by candidates will show up here.
                </p>
            </div>
        )
    }

    return (
        <div className='overflow-hidden rounded-xl border border-border shadow-sm'>
            <Table>
                <TableHeader>
                    <TableRow className='border-border hover:bg-transparent bg-muted/50'>
                        <TableHead className='text-muted-foreground text-[11px] font-bold uppercase tracking-wider py-4 pl-5'>FullName</TableHead>
                        <TableHead className='text-muted-foreground text-[11px] font-bold uppercase tracking-wider py-4'>Email Address</TableHead>
                        <TableHead className='text-muted-foreground text-[11px] font-bold uppercase tracking-wider py-4'>Contact Number</TableHead>
                        <TableHead className='text-muted-foreground text-[11px] font-bold uppercase tracking-wider py-4'>Resume Document</TableHead>
                        <TableHead className='text-muted-foreground text-[11px] font-bold uppercase tracking-wider py-4'>Applied Date</TableHead>
                        <TableHead className='text-muted-foreground text-[11px] font-bold uppercase tracking-wider py-4 text-right pr-5'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applicants.applications.map((item) => (
                        <TableRow 
                            key={item._id} 
                            className='border-border hover:bg-muted/30 transition-colors'
                        >
                            <TableCell className='text-foreground text-sm font-semibold py-4 pl-5'>
                                {item?.applicant?.fullname}
                            </TableCell>
                            <TableCell className='text-muted-foreground text-sm font-semibold py-4'>
                                {item?.applicant?.email}
                            </TableCell>
                            <TableCell className='text-muted-foreground text-xs py-4 font-mono'>
                                {item?.applicant?.phoneNumber || 'NA'}
                            </TableCell>
                            <TableCell className='py-4'>
                                {item.applicant?.profile?.resume ? (
                                    <a 
                                        className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline cursor-pointer" 
                                        href={item?.applicant?.profile?.resume} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                    >
                                        <FileText className='w-3.5 h-3.5 text-red-500' />
                                        <span className='truncate max-w-[120px]'>{item?.applicant?.profile?.resumeOriginalName}</span>
                                    </a>
                                ) : (
                                    <span className='text-muted-foreground text-xs font-semibold'>No Resume</span>
                                )}
                            </TableCell>
                            <TableCell className='text-muted-foreground text-xs py-4'>
                                <div className='flex items-center gap-1.5'>
                                    <Calendar className='w-3.5 h-3.5' />
                                    <span>{item?.applicant?.createdAt?.split("T")[0]}</span>
                                </div>
                            </TableCell>
                            <TableCell className='py-4 text-right pr-5'>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <button className='w-8 h-8 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all ml-auto cursor-pointer'>
                                            <MoreHorizontal className='w-4 h-4' />
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent align="end" className="w-36 bg-card border border-border p-1.5 mt-1 rounded-xl shadow-lg">
                                        <div className='flex flex-col gap-1'>
                                            <button 
                                                onClick={() => statusHandler("Accepted", item?._id)} 
                                                className='flex w-full items-center gap-2 px-2.5 py-1.5 rounded-lg text-muted-foreground hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-950/20 transition-all text-xs font-semibold cursor-pointer'
                                            >
                                                <Check className='w-3.5 h-3.5 text-green-500' />
                                                <span>Accept</span>
                                            </button>
                                            <button 
                                                onClick={() => statusHandler("Rejected", item?._id)} 
                                                className='flex w-full items-center gap-2 px-2.5 py-1.5 rounded-lg text-muted-foreground hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all text-xs font-semibold cursor-pointer'
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