import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal, Calendar, Building } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if (!searchCompanyByText) {
                return true
            }
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText])

    if (!filterCompany || filterCompany.length === 0) {
        return (
            <div className='flex flex-col items-center py-10 text-center'>
                <Building className='w-10 h-10 text-slate-300 mb-2' />
                <p className='text-[#5e6475] font-semibold text-xs'>No companies registered yet.</p>
                <p className='text-[#a0a6b5] text-[10px] mt-0.5'>Onboard a company profile to post vacancy listings.</p>
            </div>
        )
    }

    return (
        <div className='overflow-hidden rounded-2xl border border-[#ebedf5]'>
            <Table>
                <TableHeader>
                    <TableRow className='border-[#ebedf5] hover:bg-transparent bg-[#f5f6fa]'>
                        <TableHead className='text-[#5e6475] text-[10px] font-bold uppercase tracking-wider py-3.5 pl-5'>Logo</TableHead>
                        <TableHead className='text-[#5e6475] text-[10px] font-bold uppercase tracking-wider py-3.5'>Company Name</TableHead>
                        <TableHead className='text-[#5e6475] text-[10px] font-bold uppercase tracking-wider py-3.5'>Onboarding Date</TableHead>
                        <TableHead className='text-[#5e6475] text-[10px] font-bold uppercase tracking-wider py-3.5 text-right pr-5'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterCompany.map((company) => (
                        <TableRow 
                            key={company._id} 
                            className='border-[#ebedf5] hover:bg-[#fcfcff] transition-colors'
                        >
                            <TableCell className='py-3.5 pl-5'>
                                <div className='p-0.5 rounded-xl bg-[#f1efff] border border-[#e0dbff] w-10 h-10 flex items-center justify-center flex-shrink-0'>
                                    <Avatar className="h-full w-full rounded-[10px]">
                                        <AvatarImage src={company.logo} className="object-cover" />
                                    </Avatar>
                                </div>
                            </TableCell>
                            <TableCell className='text-[#1a1a24] text-xs font-bold py-3.5'>
                                {company.name}
                            </TableCell>
                            <TableCell className='text-[#5e6475] text-xs py-3.5'>
                                <div className='flex items-center gap-1.5'>
                                    <Calendar className='w-3.5 h-3.5 text-slate-400' />
                                    <span>{company?.createdAt?.split("T")[0]}</span>
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
                                        <button 
                                            onClick={() => navigate(`/admin/companies/${company._id}`)} 
                                            className='flex w-full items-center gap-2 px-2.5 py-1.5 rounded-xl text-[#5e6475] hover:text-[#5d53c4] hover:bg-[#f1efff] transition-all text-xs font-bold cursor-pointer'
                                        >
                                            <Edit2 className='w-3.5 h-3.5 text-[#5d53c4]' />
                                            <span>Edit Profile</span>
                                        </button>
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

export default CompaniesTable