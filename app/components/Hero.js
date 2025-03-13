import React from 'react'
import Search from './Search'

const Hero = () => {
  return (
    <div className='text-center flex justify-center items-center'>
        <div className='flex flex-col items-center p-10 py-20 gap-6 h-[600px] w-full bg-[#eef0fc]'>
        <h2 className='lg:text-2xl sm:text-xl'>Find cars for sale and for rent near you</h2>
        <h1 className='lg:text-6xl font-bold sm:text-4xl'>Find your dream car</h1>
        <Search />
        </div>
    </div>
  )
}

export default Hero