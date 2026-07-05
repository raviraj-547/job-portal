import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { MapPin, Briefcase, IndianRupee, X, SlidersHorizontal } from 'lucide-react'

const filterData = [
  {
    filterType: 'Location',
    icon: MapPin,
    array: ['Delhi NCR', 'Bangalore', 'Hyderabad', 'Pune', 'Mumbai'],
  },
  {
    filterType: 'Industry',
    icon: Briefcase,
    array: ['Frontend Developer', 'Backend Developer', 'FullStack Developer', 'Data Science', 'DevOps Engineer'],
  },
  {
    filterType: 'Salary',
    icon: IndianRupee,
    array: ['0-40k', '42k-1L', '1L to 5L'],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();

  const changeHandler = (value) => setSelectedValue(value);
  const clearFilter = () => setSelectedValue('');

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className='bg-card border border-border rounded-xl p-5 sticky top-24 shadow-sm'>

      {/* Header */}
      <div className='flex items-center justify-between mb-5'>
        <div className='flex items-center gap-2'>
          <SlidersHorizontal className='w-4 h-4 text-primary' />
          <h2 className='font-semibold text-sm text-foreground'>Filters</h2>
        </div>
        {selectedValue && (
          <button
            onClick={clearFilter}
            className='flex items-center gap-1 text-xs font-semibold text-red-500 hover:text-red-600 transition-colors cursor-pointer px-2 py-1 rounded-md hover:bg-red-50 dark:hover:bg-red-950/20'
          >
            <X className='w-3.5 h-3.5' />
            Clear all
          </button>
        )}
      </div>

      <RadioGroup value={selectedValue} onValueChange={changeHandler} className='space-y-6'>
        {filterData.map((data) => {
          const Icon = data.icon;
          return (
            <div key={data.filterType}>
              {/* Section header */}
              <div className='flex items-center gap-2 mb-3'>
                <div className='w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0'>
                  <Icon className='w-3.5 h-3.5 text-primary' />
                </div>
                <h3 className='text-xs font-semibold text-foreground uppercase tracking-wider'>
                  {data.filterType}
                </h3>
              </div>

              {/* Options */}
              <div className='space-y-2 pl-1'>
                {data.array.map((item, idx) => {
                  const itemId = `filter-${data.filterType}-${idx}`;
                  const isSelected = selectedValue === item;
                  return (
                    <div
                      key={itemId}
                      className={`flex items-center gap-2.5 p-2 rounded-lg cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-primary/10 border border-primary/20'
                          : 'hover:bg-muted border border-transparent'
                      }`}
                      onClick={() => changeHandler(isSelected ? '' : item)}
                    >
                      <RadioGroupItem
                        value={item}
                        id={itemId}
                        className='border-border text-primary'
                      />
                      <Label
                        htmlFor={itemId}
                        className={`text-xs cursor-pointer leading-none font-medium transition-colors ${
                          isSelected ? 'text-primary' : 'text-muted-foreground'
                        }`}
                      >
                        {item}
                      </Label>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
}

export default FilterCard