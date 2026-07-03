import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal, Calendar, Briefcase } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => { 
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(() => { 
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true
            }
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase());
        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText])

    if (!filterJobs || filterJobs.length === 0) {
        return (
            <div className='flex flex-col items-center py-10 text-center'>
                <Briefcase className='w-10 h-10 text-slate-300 mb-2' />
                <p className='text-[#5e6475] font-semibold text-xs'>No jobs listed yet.</p>
                <p className='text-[#a0a6b5] text-[10px] mt-0.5'>Post a new job opening to start receiving candidates.</p>
            </div>
        )
    }

    return (
        <div className='overflow-hidden rounded-2xl border border-[#ebedf5]'>
            <Table>
                <TableHeader>
                    <TableRow className='border-[#ebedf5] hover:bg-transparent bg-[#f5f6fa]'>
                        <TableHead className='text-[#5e6475] text-[10px] font-bold uppercase tracking-wider py-3.5 pl-5'>Company</TableHead>
                        <TableHead className='text-[#5e6475] text-[10px] font-bold uppercase tracking-wider py-3.5'>Role / Title</TableHead>
                        <TableHead className='text-[#5e6475] text-[10px] font-bold uppercase tracking-wider py-3.5'>Posted Date</TableHead>
                        <TableHead className='text-[#5e6475] text-[10px] font-bold uppercase tracking-wider py-3.5 text-right pr-5'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterJobs.map((job) => (
                        <TableRow 
                            key={job._id} 
                            className='border-[#ebedf5] hover:bg-[#fcfcff] transition-colors'
                        >
                            <TableCell className='text-[#1a1a24] text-xs font-bold py-3.5 pl-5'>
                                {job?.company?.name}
                            </TableCell>
                            <TableCell className='text-[#5e6475] text-xs font-semibold py-3.5'>
                                {job?.title}
                            </TableCell>
                            <TableCell className='text-[#5e6475] text-xs py-3.5'>
                                <div className='flex items-center gap-1.5'>
                                    <Calendar className='w-3.5 h-3.5 text-slate-400' />
                                    <span>{job?.createdAt?.split("T")[0]}</span>
                                </div>
                            </TableCell>
                            <TableCell className='py-3.5 text-right pr-5'>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <button className='w-7.5 h-7.5 rounded-lg bg-[#f5f6fa] border border-[#ebedf5] flex items-center justify-center text-[#5e6475] hover:text-[#5d53c4] hover:border-[#e0dbff] hover:bg-[#f1efff] transition-all ml-auto cursor-pointer'>
                                            <MoreHorizontal className='w-4 h-4' />
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-36 bg-white border border-[#ebedf5] p-1.5 mt-1 rounded-2xl shadow-md">
                                        <div className='flex flex-col gap-1'>
                                            <button 
                                                onClick={() => navigate(`/admin/companies/${job?.company?._id}`)} 
                                                className='flex w-full items-center gap-2 px-2.5 py-1.5 rounded-xl text-[#5e6475] hover:text-[#5d53c4] hover:bg-[#f1efff] transition-all text-xs font-bold cursor-pointer'
                                            >
                                                <Edit2 className='w-3.5 h-3.5 text-[#5d53c4]' />
                                                <span>Edit Company</span>
                                            </button>
                                            <button 
                                                onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} 
                                                className='flex w-full items-center gap-2 px-2.5 py-1.5 rounded-xl text-[#5e6475] hover:text-[#5d53c4] hover:bg-[#f1efff] transition-all text-xs font-bold cursor-pointer'
                                            >
                                                <Eye className='w-3.5 h-3.5 text-blue-500' />
                                                <span>Candidates</span>
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

export default AdminJobsTable