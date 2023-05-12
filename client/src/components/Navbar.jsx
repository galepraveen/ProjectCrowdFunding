import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { CustomButton } from './';
import { search, logo, menu, thirdweb } from '../assets';
import { navlinks } from '../navigations';
import { useStateContext } from '../context';


const Navbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('dashboard');
  const [toggleDrawer, setToggleDrawer] = useState(false);

  const { connect, address } = useStateContext();

  return (
    <div className='flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6'>
      <div className='lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24]'>
        <input type="text" placeholder='search for campaigns' className='flex w-full font-epilogue font-normal text-[16px] placeholder:text-[#4b5264] text-white bg-transparent outline-none mr-2'/>
        <div className='w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer'>
          <img src={search} alt="search-icon" className='w-[15px] h-[15px] object-contain'/>
        </div>
      </div>

      <div className='sm:flex hidden flex-row justify-end gap-4'>
        <CustomButton
          btnType='button'
          title={
            address ? 'Create a Campaign' : 'Connect'
          }
          styles={
            address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'
          }
          handleClick={
            () => {
              if(address){
                navigate('create-campaign')
              }else{
                connect();
              }
            }
          }
        />

        <Link to='/profile'>
          <div className='w-[52px] h-[50px] bg-[#2c2f32] flex justify-center items-center cursor-pointer rounded-full'>
            <img src={thirdweb} alt="user-profile" className='w-[60%] h-[60%] ' />
          </div>
        </Link>
      </div>

      {/* small screen navigation */}
      <div className='sm:hidden flex justify-between items-center relative'>
        <div className='w-[45px] h-[45px] bg-[#2c2f32] flex justify-center items-center cursor-pointer rounded-[10px]'>
          <img src={logo} alt="user-profile" className='w-[60%] h-[60%] ' />
        </div>
        
        <img src={menu} alt="menu" 
          className='w-[35px] h-[35px] object-contain cursor-pointer'
          onClick={()=> setToggleDrawer(prev => !prev)}
        />

        <div className={`bg-[#1c1c24] absolute top-[60px] right-0 left-0 z-10 shadow-secondary py-4 ${!toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-0'} transition-all duration-700`}>
          <ul className='mb-4'>
            {
              navlinks.map(link => (
                  <li
                    key={link.name}
                    className={`flex p-4 ${isActive === link.name && 'bg-[#3a3a43]'} ${!link.disabled && 'cursor-pointer'}`}
                    onClick={() => {
                      setIsActive(link.name);
                      setToggleDrawer(false);
                      navigate(link.link);
                    }}>
                    <img 
                      src={link.imgUrl} 
                      alt={link.name} 
                      className={`w-[24px] h-[24px] object-contain ${isActive === link.name ? 'grayscale-0' : 'grayscale'}`}
                    />

                    <p className={`ml-[20px] font-epilogue font-semibold text-[14px] ${isActive === link.name ? 'text-[#1dc071]' : 'text-[#808191]'}`}> 
                      {link.name} 
                    </p>
                  </li>
                )
              )
            }
          </ul>

          <div className='flex mx-4'>
          <CustomButton
            btnType='button'
            title={
              address ? 'Create a Campaign' : 'Connect'
            }
            styles={
              address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'
            }
            handleClick={
              () => {
                if(address){
                  navigate('create-campaign')
                }else{
                  connect();
                }
              }
            }/>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Navbar
