import React from 'react'
import { loader } from '../assets'

const Loader = () => {
  return (
    <div className='fixed inset-0 z-10 h-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col font-epilogue'>
      <img src={loader} alt="loader" className='w-[100px] h-[100px] mt-3 object-contain' />
      <div className='mt-[20px] font-bold text-[1.2rem] text-center '>
        <p> Transaction is in progress </p>
        <p> Please wait... </p>
      </div>
    </div>
  )
}

export default Loader
