import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { useSelector } from 'react-redux'
import { Briefcase } from 'lucide-react'

const statusConfig = {
    pending: { label: 'Pending', cls: 'badge badge-orange' },
    accepted: { label: 'Accepted', cls: 'badge badge-green' },
    rejected: { label: 'Rejected', cls: 'badge badge-red' },
}

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job);

    if (allAppliedJobs.length <= 0) {
        return (
            <div className='flex flex-col items-center py-14 text-center border-2 border-dashed border-border rounded-xl'>
                <div className='w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3'>
                    <Briefcase className='w-6 h-6 text-muted-foreground/60' />
                </div>
                <p className='text-foreground font-semibold text-sm'>No applications submitted yet.</p>
                <p className='text-muted-foreground text-xs mt-1 max-w-sm'>
                    Job applications you submit will list here.
                </p>
            </div>
        )
    }

    return (
        <div className='overflow-hidden rounded-xl border border-border shadow-sm'>
            <Table>
                <TableHeader>
                    <TableRow className='border-border hover:bg-transparent bg-muted/50'>
                        <TableHead className='text-muted-foreground text-[11px] font-bold uppercase tracking-wider py-4 pl-5'>Applied Date</TableHead>
                        <TableHead className='text-muted-foreground text-[11px] font-bold uppercase tracking-wider py-4'>Job Role</TableHead>
                        <TableHead className='text-muted-foreground text-[11px] font-bold uppercase tracking-wider py-4'>Company</TableHead>
                        <TableHead className='text-muted-foreground text-[11px] font-bold uppercase tracking-wider py-4 text-right pr-5'>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allAppliedJobs.map((appliedJob) => {
                        const status = appliedJob?.status?.toLowerCase();
                        const { label, cls } = statusConfig[status] || statusConfig.pending;
                        return (
                            <TableRow key={appliedJob?._id} className='border-border hover:bg-muted/30 transition-colors'>
                                <TableCell className='text-muted-foreground text-xs py-4 pl-5'>
                                    {appliedJob?.createdAt?.split("T")[0]}
                                </TableCell>
                                <TableCell className='text-foreground text-sm font-semibold py-4'>
                                    {appliedJob?.job?.title}
                                </TableCell>
                                <TableCell className='text-muted-foreground text-xs font-semibold py-4'>
                                    {appliedJob?.job?.company?.name}
                                </TableCell>
                                <TableCell className='py-4 text-right pr-5'>
                                    <span className={cls}>
                                        {label}
                                    </span>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable