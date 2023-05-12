import React from 'react'

const CustomButton = ({ btnType, title, styles, handleClick }) => {
  return (
    <div>
        <button
          type={btnType}
          className={`${styles} font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[40px] mt-2 px-4 rounded-[10px]`}
          onClick={handleClick}
        >
          {title}
        </button>
    </div>
  )
}

export default CustomButton
