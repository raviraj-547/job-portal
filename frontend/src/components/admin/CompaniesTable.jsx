import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal, Calendar, Building, Sparkles } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if (!searchCompanyByText) {
                return true;
            }
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText])

    if (!filterCompany || filterCompany.length === 0) {
        return (
            <div className='flex flex-col items-center py-14 text-center border-2 border-dashed border-border rounded-xl'>
                <div className='w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3'>
                    <Building className='w-6 h-6 text-muted-foreground/60' />
                </div>
                <p className='text-foreground font-semibold text-sm'>No companies found</p>
                <p className='text-muted-foreground text-xs mt-1 max-w-sm'>
                    Onboard a new company profile to start posting vacancy listings.
                </p>
            </div>
        )
    }

    return (
        <div className='overflow-hidden rounded-xl border border-border shadow-sm'>
            <Table>
                <TableHeader>
                    <TableRow className='border-border hover:bg-transparent bg-muted/50'>
                        <TableHead className='text-muted-foreground text-[11px] font-bold uppercase tracking-wider py-4 pl-5'>Logo</TableHead>
                        <TableHead className='text-muted-foreground text-[11px] font-bold uppercase tracking-wider py-4'>Company Name</TableHead>
                        <TableHead className='text-muted-foreground text-[11px] font-bold uppercase tracking-wider py-4'>Onboarding Date</TableHead>
                        <TableHead className='text-muted-foreground text-[11px] font-bold uppercase tracking-wider py-4 text-right pr-5'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterCompany.map((company) => (
                        <TableRow 
                            key={company._id} 
                            className='border-border hover:bg-muted/30 transition-colors'
                        >
                            <TableCell className='py-4 pl-5'>
                                <div className='w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center flex-shrink-0 p-1 shadow-sm'>
                                    <Avatar className="h-full w-full rounded-lg">
                                        <AvatarImage src={company.logo} className="object-cover" />
                                    </Avatar>
                                </div>
                            </TableCell>
                            <TableCell className='text-foreground text-sm font-semibold py-4'>
                                {company.name}
                            </TableCell>
                            <TableCell className='text-muted-foreground text-xs font-medium py-4'>
                                <div className='flex items-center gap-1.5'>
                                    <Calendar className='w-3.5 h-3.5' />
                                    <span>{company?.createdAt?.split("T")[0]}</span>
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
                                        <button 
                                            onClick={() => navigate(`/admin/companies/${company._id}`)} 
                                            className='flex w-full items-center gap-2.5 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all text-xs font-semibold cursor-pointer'
                                        >
                                            <Edit2 className='w-3.5 h-3.5 text-primary' />
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