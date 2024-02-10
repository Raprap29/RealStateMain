"use client"

import React, {useState, useRef, useEffect} from 'react';
import Image from 'next/image';
import Contact from '../components/contact/contact';
import BankLoan from '../components/loan/Loan';
import QuickSearch from '../components/quicksearch/quickSearch';
import Footer from '../components/footer/Footer';
import { MuseoModerno } from "next/font/google";
const Museo_Moderno = MuseoModerno({weight: '700', preload: false})

const AboutPage = () => {
  const [Phone, setPhone] = useState<boolean>(false);
  
  useEffect(()=>{
    window.addEventListener(
        "resize",
        () => window.innerWidth >= 720 ? setPhone(false) : setPhone(true)
    );
  }, [Phone])

  return (
    <>
        <title>Jama Realty - About Us</title>
        <div className="w-full h-full relative">

        <div className='bg-cover bg-center w-full h-[450px]' style={{ backgroundImage: 'url(/assets/PhotoAbout.jpg)' }} />
          <div className='text-[#fff] absolute top-[35%] left-[50%] transform translate-x-[-50%] translate-x-[-50%] z-[1] w-full container mx-auto max-w-[1150px]'>
            <p className={`text-[45px] max-[720px]:text-[22px] max-[720px]:px-[30px] ${Museo_Moderno.className}`}>Building Dreams, Crafting Destinations</p>
            <p className={`text-[45px] max-[720px]:text-[22px] max-[720px]:px-[30px] ${Museo_Moderno.className}`}>Discover the Essence of Jama Realty in Real Estate</p>
          </div>
          <div className='bg-[rgba(0,0,0,0.25)] w-full h-full absolute top-0'></div>
        </div>
        <QuickSearch />
        <div className='mx-auto container max-w-[1100px] max-[720px]:w-full max-[720px]:flex-col flex justify-center gap-x-[50px] mb-7'>
          <div className='flex flex-col gap-y-[20px] w-full max-[720px]:mb-5'>
            <p className='text-[40px] drop-shadow-[0_2px_3px_rgba(0,0,0,0.70)] font-bold text-[#3B5189] max-[720px]:px-[20px]'>OUR STORY</p>
            <p className='text-[20px] text-justify max-[720px]:px-[20px]'>Ms. Angelina Aranton, President & CEO of JAMA REALTY , is a real estate broker/realtor who is a member of the Real Estate Brokers Association of the Philippines - REBAP. She has a degree in Business Management with masteral units in Business Management from Polytechnic University of the Philippines.</p>
            <p className='text-[20px] text-justify max-[720px]:px-[20px]'>Ms Aranton has extensive real estate experience in assisting buyers and sellers of residential and commercial properties as well as in managing a real estate team. With her knowledge of the financial services industry and estate planning, she has served numerous clients in the ownership and preservation of their real estate properties.</p>
          </div>
          <div className='w-full flex items-center justify-center px-[20px]'><Image src="/assets/JamarealtyPhoto.jpg" className='rounded-[5px]' width={400} height={300} alt='photoAbout'/></div>
        </div>
        <div className='bg-[#3B5189] h-[120px] w-full flex items-center justify-center'>
          <p className='text-[40px] text-[#fff] font-black max-[720px]:text-center max-[720px]:text-[30px]'>OUR MISSION, VISSION AND VALUES</p>
        </div>
        {Phone ? 
        <>
          <div className='mb-8 flex flex-col gap-y-[20px] items-center mt-[3rem]'>    
              <div className='relative px-[10px]'>
                <div className='absolute top-[28px] left-[45px]'>
                  <div className='border bg-[#fff] shadow-3dshadow border-solid border-[#A49D9D] w-[45px] h-[45px] flex justify-center items-center transform translate-x-[-50%] translate-y-[-50%] absolute top-[50%] left-[50%] rounded-[1000px] border-1'>
                  <Image alt='icon' src='/icon/vission.png' width={30} height={30} />
                  </div>
                </div>
                <div className='bg-[#1B7E19] rounded-[10px] pl-[20px] pr-[20px] py-[20px] max-[420px]:w-full w-[300px] z-[-1]'>
                  <p className='text-center text-[#fff] font-black text-[23px] mb-2 max-[420px]:text-[15px]'>OUR VISSION</p>
                  <p className='text-justify text-[15px] text-[#fff] font-medium'>Our vision at Jama Realty is to be the leading real estate company that transforms lives and communities through outstanding service and expertise. We envision a future where everyone can find their perfect home or investment property, supported by our knowledgeable team and cutting-edge technology.</p>
                </div>
              </div>
            <div className='relative px-[10px]'>
              <div className='absolute top-[28px] left-[45px]'>
                <div className='border bg-[#fff] shadow-3dshadow border-solid border-[#A49D9D] w-[45px] h-[45px] flex justify-center items-center transform translate-x-[-50%] translate-y-[-50%] absolute top-[50%] left-[50%] rounded-[1000px] border-1'>
                  <Image alt='icon' src='/icon/Mission.png' width={30} height={30} />
                </div>
              </div>
              <div className='bg-[#1B7E19] rounded-[10px] pl-[20px] pr-[20px] py-[20px] max-[420px]:w-full w-[300px] z-[-1]'>
                <p className='text-center text-[#fff] font-black text-[23px] mb-2 max-[420px]:text-[15px]'>OUR MISSION</p>
                <p className='text-justify text-[15px] text-[#fff] font-medium'>At Jama Realty, our mission is to provide unparalleled real estate services, helping individuals and families achieve their dreams of homeownership and investment success. We are dedicated to delivering exceptional customer experiences, offering comprehensive guidance, and utilizing innovative solutions</p>
              </div>
            </div>
            <div className='relative px-[10px]'>
              <div className='absolute top-[28px] left-[45px]'>
                <div className='border bg-[#fff] shadow-3dshadow border-solid border-[#A49D9D] w-[45px] h-[45px] flex justify-center items-center transform translate-x-[-50%] translate-y-[-50%] absolute top-[50%] left-[50%] rounded-[1000px] border-1'>
                  <Image alt='icon' src='/icon/values.png' width={30} height={30} />
                </div>
              </div>
              <div className='bg-[#1B7E19] rounded-[10px] pb-[20px] pt-6 pl-[20px] pr-[20px] w-full z-[-1]'>
                <p className='text-center text-[#fff] font-black text-[23px] mb-2 max-[420px]:text-[15px]'>OUR VALUES</p>
                <ul className='px-4'>
                  <li className='text-justify text-[15px] text-[#fff] font-medium list-disc text-[18px]'>Integrity</li>
                  <li className='text-justify text-[15px] text-[#fff] font-medium list-disc text-[18px]'>Quality of Service</li>
                  <li className='text-justify text-[15px] text-[#fff] font-medium list-disc text-[18px]'>Fair Practices</li>
                  <li className='text-justify text-[15px] text-[#fff] font-medium list-disc text-[18px]'>Privacy of Client Information</li>
                  <li className='text-justify text-[15px] text-[#fff] font-medium list-disc text-[18px]'>Integrating Social Values</li>
                  <li className='text-justify text-[15px] text-[#fff] font-medium list-disc text-[18px]'>Collaboration</li>
                  <li className='text-justify text-[15px] text-[#fff] font-medium list-disc text-[18px]'>Excellence</li>
                </ul>
              </div>
            </div>
        </div>
        </> : 
        <>
        <div className='h-[660px] flex flex-col items-center mt-[3rem]'>
          <div className='w-[280px] h-[280px] relative'>
          <div className='rounded-[1000px] w-full h-full bg-cover bg-center' style={{ backgroundImage: 'url(/assets/097feff961369265243eca1867c57edc.jpg)' }} />
            <div className='border border-solid border-1 border-[#9D9D9D] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] h-[290px] w-[290px] rounded-[1000px]'></div>
            <div className='absolute top-[35%] transform left-[-50px]'>
              <div className='bg-[#fff] w-[75px] h-[75px] rounded-[1000px] z-[1]'>
              <div className='relative' style={{ width: '50px', height: '50px' }}>
                <Image alt='icon' src='/icon/vission.png' layout='fill' className='z-[2]' />
              </div>
                <div className='z-[1] border bg-[#fff] border-solid border-[#A49D9D] w-[65px] h-[65px] transform translate-x-[-50%] translate-y-[-50%] absolute top-[50%] left-[50%] rounded-[1000px] border-1'></div>
                <div className='bg-[#1B7E19] rounded-[10px] pl-[20px] py-[20px] pr-[40px] absolute top-[-130%] right-[55%] w-[300px] z-[-1]'>
                  <p className='text-center text-[#fff] font-black text-[23px] mb-2'>OUR VISSION</p>
                  <p className='text-justify text-[15px] text-[#fff] font-medium'>Our vision at Jama Realty is to be the leading real estate company that transforms lives and communities through outstanding service and expertise. We envision a future where everyone can find their perfect home or investment property, supported by our knowledgeable team and cutting-edge technology.</p>
                </div>
              </div>
            </div>
            <div className='absolute top-[35%] transform right-[-50px]'>
              <div className='bg-[#fff] w-[75px] h-[75px] rounded-[1000px] z-[1]'> 
              <Image alt='icon' src='/icon/Mission.png' width={1000} height={1000} className='w-[50px] h-[50px] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]' />
                <div className='border border-solid border-[#A49D9D] w-[65px] h-[65px] transform translate-x-[-50%] translate-y-[-50%] absolute top-[50%] left-[50%] rounded-[1000px] border-1'></div>
                <div className='bg-[#1B7E19] rounded-[10px] pr-[20px] py-[20px] pl-[40px] absolute top-[-130%] left-[55%] w-[300px] z-[-1]'>
                  <p className='text-center text-[#fff] font-black text-[23px] mb-2'>OUR MISSION</p>
                  <p className='text-justify text-[15px] text-[#fff] font-medium'>At Jama Realty, our mission is to provide unparalleled real estate services, helping individuals and families achieve their dreams of homeownership and investment success. We are dedicated to delivering exceptional customer experiences, offering comprehensive guidance, and utilizing innovative solutions</p>
                </div>
              </div>
            </div>
            <div className='absolute top-[110%] transform transate-x-[-50%] left-[35%] translate-y-[-50%]'>
              <div className='bg-[#fff] w-[75px] h-[75px] rounded-[1000px] z-[1]'>
              <Image alt='icon' src='/icon/values.png' width={1000} height={1000} className='w-[50px] h-[50px] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]' />
                <div className='border border-solid border-[#A49D9D] w-[65px] h-[65px] transform translate-x-[-50%] translate-y-[-50%] absolute top-[50%] left-[50%] rounded-[1000px] border-1'></div>
                <div className='bg-[#1B7E19] rounded-[10px] p-5 mt-3 pt-6 absolute top-[50%] transform translate-x-[-50%] left-[50%] w-[300px] z-[-1]'>
                  <p className='text-center text-[#fff] font-black text-[23px] mb-2'>OUR VALUES</p>
                  <ul className='px-4'>
                    <li className='text-justify text-[15px] text-[#fff] font-medium list-disc text-[18px]'>Integrity</li>
                    <li className='text-justify text-[15px] text-[#fff] font-medium list-disc text-[18px]'>Quality of Service</li>
                    <li className='text-justify text-[15px] text-[#fff] font-medium list-disc text-[18px]'>Fair Practices</li>
                    <li className='text-justify text-[15px] text-[#fff] font-medium list-disc text-[18px]'>Privacy of Client Information</li>
                    <li className='text-justify text-[15px] text-[#fff] font-medium list-disc text-[18px]'>Integrating Social Values</li>
                    <li className='text-justify text-[15px] text-[#fff] font-medium list-disc text-[18px]'>Collaboration</li>
                    <li className='text-justify text-[15px] text-[#fff] font-medium list-disc text-[18px]'>Excellence</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        </>}
        <Contact mt={0} />
        <BankLoan />
        <Footer />
    </>
  );
};

export default AboutPage;
