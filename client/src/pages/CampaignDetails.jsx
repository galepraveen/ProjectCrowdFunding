import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from '../context';
import { CustomButton, CountBox, Loader } from '../components';
import { calculateBarPercentage, daysLeft } from '../utils';
import { thirdweb } from '../assets';

const CampaignDetails = () => {
  
  const { state } = useLocation();
  const navigate = useNavigate();

  const { getDonations, contract, address, donate } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [donators, setDonators] = useState([]);

  const remainingDays = daysLeft(state.deadline);

  const handleDonate = async ()=>{
    setIsLoading(true);
    await donate(state.pId, amount);

    navigate('/');
    setIsLoading(false);
  }

  const fetchDonations = async ()=>{
    const data = await getDonations(state.pId);

    setDonators(data);
  }

  useEffect(()=>{
    if(contract) fetchDonations();
  }, [contract, address])

  return (
    <div>
      {
        isLoading && <Loader />
      }

      <div className='w-full flex md:flex-row flex-col mt-10 gap-[2rem]'>
        <div className='flex-1 flex-col'>
          <img src={state.image} alt="campaign" className='w-full h-[400px] object-cover rounded-xl ' />
          <div className='relative w-full h-[0.4rem] bg-[#3a3a43] mt-2'>
            <div className={`absolute h-full bg-[#4acd8d] w-[${calculateBarPercentage(state.target, state.amountCollected)}%] max-w-full`}>

            </div>
          </div>
        </div>

        <div className='flex md:w-[150px] w-full flex-wrap justify-between gap-[2rem]'>
          <CountBox title='Days Left' value={remainingDays} />
          <CountBox title={`Raised of ${state.target}`} value={state.amountCollected} />
          <CountBox title="Total Backers" value={donators.length} />
        </div>
      </div>

      <div className='mt-[60px] flex lg:flex-row flex-col gap-5'>
        <div className='flex-[2] flex flex-col gap-[40px]'>
          <div>
            <h4 className='font-epilogue font-semibold text-[1.1rem] uppercase'> Creator </h4>

            <div className="mt-[1.2rem] flex flex-row items-center flex-wrap gap-[0.9rem] ">
              <div className='w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer'>
                <img src={thirdweb} alt="user" className='w-[60%] h-[60%] object-contain' />
              </div>
              <div>
                <h4 className='text-[0.9rem] font-epilogue font-semibold break-all '> {state.owner} </h4>
                <p className='mt-[4px] font-epilogue font-normal text-[0.8rem] text-[#808191]'> 10 Campaigns </p>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className='font-epilogue font-semibold text-[1.1rem] uppercase'> Story </h4>
            <div className='mt-[1.2rem]'>
              <p className="font-normal font-epilogue text-[#808191] text-[1rem] leading-[1.6rem] text-justify"> {state.description}</p>
            </div>
          </div>

          <div>
            <h4 className='font-epilogue font-semibold text-[1.1rem] uppercase'> Donators </h4>
            <div className="mt-[1.2rem] flex flex-col gap-4]">
              {
                donators.length > 0
                ?
                  donators.map((item, index)=>(
                    <div>
                      <div key={`${item.donator}-${index}`} className="flex justify-between items-center gap-4 font-epilogue font-normal text-[1rem] leading-[26px] break-all text-[#b2b3bd]">
                        <p> {index+1}. {item.donator}</p>
                        <p className=' font-bold'> {item.donation} </p>
                      </div>
                    </div>
                  ))
                :
                  <p className="font-normal font-epilogue text-[#808191] text-[1rem] leading-[1.6rem] text-justify"> No donators yet. Be the FIRST ONE!! </p>
              }
            </div>
          </div>
        </div>
        
        <div className="flex-1 mt-[1.2rem]">
          <h1 className="font-epilogue font-semibold t-[10px] uppercase "> Fund </h1>

          <div className='mt-[1.2rem] flex flex-col p-4 bg-[#1c1c24] rounded-[0.65rem] font-epilogue'>
              <p className='font-medium text-[1.2rem] leading-[30px] text-center text-[#808191]'> Fund the campaign </p>
              <div className="mt-[30px]">
                <input 
                  type="number" 
                  placeholder='ETH 0.1'
                  step="0.01"
                  className='w-full py-[10px] sm:px-[20px] px-[14px] outline-none border-[1px] border-[#3a3a43] bg-transparent text-[1.1rem] leading-[2rem] placeholder:text-[#4b5264] rounded-[0.7rem]'
                  value={amount}
                  onChange = {(e)=> setAmount(e.target.value)}
                  min='0'
                />

                <div className="mt-[1.2rem] p-4 bg-[#13131a] rounded-[0.7rem] font-epilogue text-center">
                  <h4 className="font-semibold leading-[1.3rem]"> Back it because you believe in it </h4>
                  <p className="mt-[1.2rem] font-normal leading-[1.3rem] text-[#808191] uppercase italic"> Support the project for no reward, just because it speaks to you. </p>
                </div>
                <CustomButton 
                  btnType="button"
                  title="Fund Campaign"
                  styles={`w-full bg-[#8c6dfd]`}
                  handleClick={handleDonate}
                />
              </div>
          </div>
          
        </div>

      </div>

    </div>
  )
}

export default CampaignDetails
