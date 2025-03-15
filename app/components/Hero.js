import React from 'react'
import SearchBox from './Search'
import Categories from './Categories'
import Most_Searched from './Most_Searched'

const Hero = () => {
  return (
    <div className='text-center flex justify-center items-center'>
      <div className='flex flex-col items-center p-10 py-20 gap-6 h-[600px] w-full bg-[#eef0fc]'>
        <h2 className='lg:text-2xl sm:text-xl'>Find cars for sale and for rent near you</h2>
        <h1 className='lg:text-6xl font-bold sm:text-4xl'>Find your dream car</h1>

        <SearchBox />
        <img src='/Mclaren.png' className='object-contain md:w-[1200px] mt-16' />

        <Categories />
        <Most_Searched />
      </div>
    </div>
  )
}

export default Hero
