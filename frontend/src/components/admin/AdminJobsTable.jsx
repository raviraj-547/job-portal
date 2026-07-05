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
                return true;
            }
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase());
        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText])

    if (!filterJobs || filterJobs.length === 0) {
        return (
            <div className='flex flex-col items-center py-14 text-center border-2 border-dashed border-border rounded-xl'>
                <div className='w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3'>
                    <Briefcase className='w-6 h-6 text-muted-foreground/60' />
                </div>
                <p className='text-foreground font-semibold text-sm'>No jobs listed yet.</p>
                <p className='text-muted-foreground text-xs mt-1 max-w-sm'>
                    Post a new job opening to start receiving candidates.
                </p>
            </div>
        )
    }

    return (
        <div className='overflow-hidden rounded-xl border border-border shadow-sm'>
            <Table>
                <TableHeader>
                    <TableRow className='border-border hover:bg-transparent bg-muted/50'>
                        <TableHead className='text-muted-foreground text-[11px] font-bold uppercase tracking-wider py-4 pl-5'>Company</TableHead>
                        <TableHead className='text-muted-foreground text-[11px] font-bold uppercase tracking-wider py-4'>Role / Title</TableHead>
                        <TableHead className='text-muted-foreground text-[11px] font-bold uppercase tracking-wider py-4'>Posted Date</TableHead>
                        <TableHead className='text-muted-foreground text-[11px] font-bold uppercase tracking-wider py-4 text-right pr-5'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterJobs.map((job) => (
                        <TableRow 
                            key={job._id} 
                            className='border-border hover:bg-muted/30 transition-colors'
                        >
                            <TableCell className='text-foreground text-sm font-semibold py-4 pl-5'>
                                {job?.company?.name}
                            </TableCell>
                            <TableCell className='text-muted-foreground text-sm font-semibold py-4'>
                                {job?.title}
                            </TableCell>
                            <TableCell className='text-muted-foreground text-xs font-medium py-4'>
                                <div className='flex items-center gap-1.5'>
                                    <Calendar className='w-3.5 h-3.5' />
                                    <span>{job?.createdAt?.split("T")[0]}</span>
                                </div>
                            </TableCell>
                            <TableCell className='py-4 text-right pr-5'>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <button className='w-8 h-8 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all ml-auto cursor-pointer'>
                                            <MoreHorizontal className='w-4 h-4' />
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent align="end" className="w-40 bg-card border border-border p-1.5 mt-1 rounded-xl shadow-lg">
                                        <div className='flex flex-col gap-1'>
                                            <button 
                                                onClick={() => navigate(`/admin/companies/${job?.company?._id}`)} 
                                                className='flex w-full items-center gap-2.5 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all text-xs font-semibold cursor-pointer'
                                            >
                                                <Edit2 className='w-3.5 h-3.5 text-primary' />
                                                <span>Edit Company</span>
                                            </button>
                                            <button 
                                                onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} 
                                                className='flex w-full items-center gap-2.5 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all text-xs font-semibold cursor-pointer'
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