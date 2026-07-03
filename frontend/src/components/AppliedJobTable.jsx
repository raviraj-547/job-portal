import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { useSelector } from 'react-redux'
import { Briefcase } from 'lucide-react'

const statusConfig = {
    pending: { label: 'Pending', cls: 'pastel-badge-orange' },
    accepted: { label: 'Accepted', cls: 'pastel-badge-green' },
    rejected: { label: 'Rejected', cls: 'bg-red-50 text-red-600 border-red-100' },
}

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job);

    if (allAppliedJobs.length <= 0) {
        return (
            <div className='flex flex-col items-center py-10 text-center'>
                <Briefcase className='w-8 h-8 text-slate-300 mb-2' />
                <p className='text-[#5e6475] font-semibold text-xs'>No applications submitted yet.</p>
                <p className='text-[#a0a6b5] text-[10px] mt-0.5'>Job applications you submit will list here.</p>
            </div>
        )
    }

    return (
        <div className='overflow-hidden rounded-2xl border border-[#ebedf5]'>
            <Table>
                <TableHeader>
                    <TableRow className='border-[#ebedf5] hover:bg-transparent bg-[#f5f6fa]'>
                        <TableHead className='text-[#5e6475] text-[10px] font-bold uppercase tracking-wider py-3 pl-5'>Applied Date</TableHead>
                        <TableHead className='text-[#5e6475] text-[10px] font-bold uppercase tracking-wider py-3'>Job Role</TableHead>
                        <TableHead className='text-[#5e6475] text-[10px] font-bold uppercase tracking-wider py-3'>Company</TableHead>
                        <TableHead className='text-[#5e6475] text-[10px] font-bold uppercase tracking-wider py-3 text-right pr-5'>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allAppliedJobs.map((appliedJob) => {
                        const status = appliedJob?.status?.toLowerCase();
                        const { label, cls } = statusConfig[status] || statusConfig.pending;
                        return (
                            <TableRow key={appliedJob?._id} className='border-[#ebedf5] hover:bg-[#fcfcff] transition-colors'>
                                <TableCell className='text-[#5e6475] text-xs py-3.5 pl-5'>
                                    {appliedJob?.createdAt?.split("T")[0]}
                                </TableCell>
                                <TableCell className='text-[#1a1a24] text-xs font-bold py-3.5'>
                                    {appliedJob?.job?.title}
                                </TableCell>
                                <TableCell className='text-[#5e6475] text-xs font-semibold py-3.5'>
                                    {appliedJob?.job?.company?.name}
                                </TableCell>
                                <TableCell className='py-3.5 text-right pr-5'>
                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-xl text-[10px] font-bold border ${cls}`}>
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