import React from 'react'
import { useNavigate } from 'react-router-dom'
import { loader } from '../assets'
import { FunCard } from './'


const DisplayCampaigns = ({title, isLoading, campaigns}) => {
    const navigate = useNavigate();

    const handleNavigate = (campaign)=>{
        navigate(`/campaign-details/${campaign.title}`, {
            state: campaign
        })
    }

  return (
    <div>
        <h1 className='font-epilogue font-semibold text-[18px] text-left'>{title} ({campaigns.length})</h1>

        <div className='flex flex-wrap mt-[1.2rem] gap-[1.7rem]'>
            {
                isLoading && (<img src={loader} alt="loader" className='w-[100px] h-[100px] object-contain relative top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'/>)
                }
            
            {
                
                !isLoading && campaigns.length === 0 && (
                    <p className='font-epilogue font-semibold text-[14px] leading-[2rem] text-[#818183]'> You have not created any campaign yet </p>
                )
            }

            {
                !isLoading && campaigns.length > 0 && campaigns.map(campaign => (
                    <FunCard 
                        key={campaign.id}
                        {...campaign}
                        handleClick = {()=>handleNavigate(campaign)}
                    />
                ))
            }
        </div>
    </div>
  )
}

export default DisplayCampaigns