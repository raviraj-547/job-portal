import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { MapPin, Briefcase, IndianRupee, X } from 'lucide-react'

const filterData = [
    {
        filterType: "Location",
        icon: MapPin,
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        icon: Briefcase,
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        filterType: "Salary",
        icon: IndianRupee,
        array: ["0-40k", "42k-1L", "1L to 5L"]
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    }

    const clearFilter = () => {
        setSelectedValue('');
    }

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue]);

    return (
        <div className='bg-white border border-[#ebedf5] p-5 rounded-3xl sticky top-24 shadow-sm'>
            {/* Header */}
            <div className='flex items-center justify-between mb-4 pb-2 border-b border-[#ebedf5]'>
                <h2 className='font-bold text-[#1a1a24] text-xs uppercase tracking-wider'>Filter Jobs</h2>
                {selectedValue && (
                    <button
                        onClick={clearFilter}
                        className='flex items-center gap-0.5 text-[10px] font-bold text-red-500 hover:text-red-600 transition-colors cursor-pointer'
                    >
                        <X className='w-3 h-3' />
                        Clear
                    </button>
                )}
            </div>

            <div className='space-y-5'>
                <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                    {filterData.map((data) => (
                        <div key={data.filterType} className='space-y-2.5'>
                            {/* Section title */}
                            <div className='flex items-center gap-1.5'>
                                <div className='w-6 h-6 rounded-lg bg-[#f5f6fa] border border-[#ebedf5] flex items-center justify-center flex-shrink-0'>
                                    <data.icon className='w-3 h-3 text-[#5d53c4]' />
                                </div>
                                <h3 className='text-[10px] font-bold text-[#5e6475] uppercase tracking-wider'>
                                    {data.filterType}
                                </h3>
                            </div>

                            {/* Options */}
                            <div className='space-y-2 pl-1'>
                                {data.array.map((item, idx) => {
                                    const itemId = `filter-${data.filterType}-${idx}`
                                    return (
                                        <div key={itemId} className='flex items-center gap-2 group cursor-pointer'>
                                            <RadioGroupItem
                                                value={item}
                                                id={itemId}
                                                className='border-[#cbd0dd] text-[#5d53c4] focus:ring-[#5d53c4]'
                                            />
                                            <Label
                                                htmlFor={itemId}
                                                className='text-[#5e6475] text-xs group-hover:text-[#1a1a24] cursor-pointer transition-colors leading-none font-medium'
                                            >
                                                {item}
                                            </Label>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </RadioGroup>
            </div>
        </div>
    )
}

export default FilterCard