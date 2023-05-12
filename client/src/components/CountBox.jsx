import React from 'react'

const CountBox = ({title, value}) => {
  return (
    <div className='font-epilogue flex flex-col items-center w-[150px]'>
        <h4 className='font-bold text-[2rem] p-3 bg-[#1c1c24] rounded-t-[0.7rem] w-full text-center truncate'> {value} </h4>
        <p className='font-normal text-[1rem] text-[#808191] px-3 py-2 bg-[#28282e] w-full rounded-b-[0.7rem] text-center '> {title} </p>
    </div>
  )
}

export default CountBox