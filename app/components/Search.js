import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Separator } from '@/components/ui/separator';
import { Search } from 'lucide-react';
import { Car_Makers, Pricing } from "@/app/shared/Car_Makers"

const SearchBox = () => {
    return (
        <div className='flex gap-10 md:p-5 bg-white rounded-md md:rounded-full flex-col md:flex md:flex-row px-5 py-5 items-center w-fit md:w-max '>

            <Select>
                <SelectTrigger className="w-[180px] outline-none md:border-none shadow-none text-lg">
                    <SelectValue placeholder="Cars" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="old">Old</SelectItem>
                </SelectContent>
            </Select>

            <Separator  orientation='vertical' className="hidden md:block" />

            <Select>
                <SelectTrigger className="w-[180px] outline-none md:border-none shadow-none text-lg">
                    <SelectValue placeholder="Car Maker" />
                </SelectTrigger>
                <SelectContent>
                    {Car_Makers.map((maker) => (
                        <SelectItem key={maker.id} value={maker.name}>
                            {maker.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Separator orientation='vertical' className="hidden md:block" />

            <Select>
                <SelectTrigger className="w-[180px] outline-none md:border-none shadow-none text-lg">
                    <SelectValue placeholder="Pricing" />
                </SelectTrigger>
                <SelectContent>
                    {Pricing.map((price) => (
                        <SelectItem key={price.id} value={price.price}>
                            {price.price}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <div className='mr-3 flex justify-center items-center align-middle'>
                <Search className='cursor-pointer hover:fill-black ' />
            </div>

        </div>
    )
}

export default SearchBox