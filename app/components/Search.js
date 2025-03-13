import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Separator } from '@/components/ui/separator';

const Search = () => {
    return (
        <div className='flex gap-10 md:p-5 bg-white rounded-md md:rounded-full flex-col md:flex md:flex-row px-5 py-5 items-center w-fit md:w-max '>

            <Select>
                <SelectTrigger className="w-[180px] outline-none md:border-none shadow-none text-lg">
                    <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                </SelectContent>
            </Select>

            <Separator  orientation='vertical'/>

            <Select>
                <SelectTrigger className="w-[180px] outline-none md:border-none shadow-none text-lg">
                    <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                </SelectContent>
            </Select>

            <Separator orientation='vertical' />

            <Select>
                <SelectTrigger className="w-[180px] outline-none md:border-none shadow-none text-lg">
                    <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                </SelectContent>
            </Select>

        </div>
    )
}

export default Search