'use client';

import React, { useEffect, useRef, useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import {FaArrowRight} from "react-icons/fa";
import Contact from "./components/contact/contact";
import BankLoan from "./components/loan/Loan";

import SwiperCore, {
  EffectFade,
  EffectCoverflow,
  EffectCube,
} from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import ContentSLide from "./contentslide";
import Image from "next/image";
import {  properyIcon } from "./assetsItems";
import { Lexend } from "next/font/google";
import Link from "next/link";
import { useGetPropertyQuery } from "./appApi/api";
import { motion, Variants } from "framer-motion"

// import "swiper/css/navigation"
import Product from "./Product";

import { Pagination, Autoplay } from "swiper";
import Footer from "./components/footer/Footer";

import type { Swiper as SwiperType } from "swiper";

const lexend = Lexend({
  preload: false,
});

SwiperCore.use([
  EffectCoverflow,
  EffectCube,
  EffectFade,
  Pagination,
]);

export default function Home() {  

  const [slidesPerView, setSlidesPerView] = useState(getInitialSlidesPerView());

  const {data: Property} = useGetPropertyQuery() as any;

  const filterNotSold = Property && Property?.filter((item: any) => item.Type !== "Sold Out");

  const swiperRef: React.MutableRefObject<SwiperType | null> = useRef<SwiperType | null>(null);
  
  const cardVariants: Variants = {
    offscreen: {
      y: 400
    },
    onscreen: {
      y: 0,
      rotate: 0,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };

  const cardVariantsExplore: Variants = {
    offscreen: {
      x: 2000
    },
    onscreen: {
      x: 0,
      rotate: 0,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };


  useEffect(() => {
    const handleResize = () => {
      setSlidesPerView(getInitialSlidesPerView());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function getInitialSlidesPerView() {
    const windowWidth = window.innerWidth;

    if (windowWidth <= 720) {
      return 1;
    } else {
      return 3;
    }
  }

  return (
    <React.Fragment>
    <title>Jama Realty</title>
    <div>
    <ContentSLide />
    <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.0 }}
          
      className="h-[500px] overflow-hidden max-[320px]:h-screen max-[720px]:h-full relative z-[2]">
      <motion.div
        variants={cardVariants}

        >
        <div className="flex justify-center flex-col items-center mt-2">
          <p className={`${lexend.className} font-extralight text-[18px]`}>REAL ESTATE JAMAREALTY</p>
        </div>
        <div className="flex flex-col justify-center items-center relative">
          <Image className="z-[-2] opacity-20 max-[720px]:hidden"
            src="/logo/Logo.png"
            alt="Background Image"
            width={1000}
            height={1000}
            quality={100}
          />
          <div className={`top-[4px] max-[720px]:relative absolute flex flex-col items-center max-w-[800px] pb-[20px]`}>
            <div className="text-center">
              <p className="text-[30px] drop-shadow-[0_2px_3px_rgba(0,0,0,0.70)] font-bold text-[#3B5189]">WHO WE ARE</p>
              <p className="mt-5 leading-[40px] font-light max-[620px]:px-10 max-[520px]:text-[14px] max-[520px]:leading-normal max-[360px]:px-1">Jamarealty leverages advanced real estate technologies and strategic digital marketing to foster seamless connections between brokers, property owners, renters, and buyers. By harnessing the power of data analytics, virtual tours, and targeted advertising, Jamarealty streamlines property transactions, enhances market visibility, and maximizes the potential for successful selling and renting. This innovative approach empowers users to navigate the ever-changing real estate landscape efficiently and make informed decisions that align with their goals and aspirations.</p>
            </div>
            <div className="mt-3 flex justify-center items-center gap-x-[80px] gap-y-[15px] flex-wrap">
              <Link
                href="/property/sale-list"
                className="z-[10] bg-[#25D242] px-4 flex items-center text-white rounded-[10px] text-[16px] py-3 uppercase font-bold leading-snug text-black hover:bg-[#1DA834] transition duration-300 ease-in-out shadow-3dshadow max-[460px]:text-[14px]"
              >
                BUY YOUR DREAM HOME
              </Link>
              <Link href="/" className="z-[10] bg-[#25D242] px-4 flex items-center text-white rounded-[10px] text-[16px] py-3 uppercase font-bold leading-snug text-black hover:bg-[#1DA834] transition duration-300 ease-in-out shadow-3dshadow max-[460px]:text-[14px]">
                SELL YOUR PROPERTIES
              </Link>
            </div>
          </div>
        </div>
        <hr className="w-full absolute bottom-0 max-[620px]:hidden"/>
        </motion.div>
      </motion.div>

    {/* Third Screen */}

      <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.2 }}
      className="flex h-[750px] max-[720px]:h-full flex-col items-center pt-10 container overflow-hidden">
        <motion.div variants={cardVariantsExplore}>
          <div className="flex gap-x-[20px] max-[720px]:flex-col">
            <img src="/assets/home-begin-search.jpg" className="w-[500px] max-[720px]:w-full h-[370px] max-[720px]:h-[40%]" />
            <div className="w-[480px] max-[520px]:w-full max-[720px]:px-3">
              <div><p className="text-[#3B5189] text-[25px] font-bold max-[720px]:mt-[20px]">Begin your Philippines real estate search</p></div>
              <div><p className={`${lexend.className} font-light max-[720px]:text-justify`}>Discover the endless possibilities of the Philippine real estate market with JAMAREALTY, your ultimate destination for buying, selling, or investing in properties. With access to a diverse range of verified listings, you can explore a wide variety of residential and commercial properties, all while gaining exclusive neighborhood insights and insider information. Trust JAMAREALTY to connect you with the best agent who will cater to your specific needs, ensuring a seamless and enjoyable real estate journey where you&apos;ll find a space that captures your heart.</p></div>
              <div className="mb-3">
                <Link href="/map" className="flex justify-end items-center text-[#3B5189] font-bold group transition duration-300 ease-in-out hover:translate-x-2 hover:text-[#1DA834] max-[720px]:mb-[20px]">
                  Initiate Your Exploration
                  <FaArrowRight className="ml-3 transition duration-300 ease-in-out group-hover:mr-4 max-[720px]:mr-[10px]" />
                </Link>
              </div>
            </div>
          </div>
          <div className="flex gap-x-[20px] max-[720px]:flex-col-reverse">
            <div className="w-[480px] max-[520px]:w-full max-[720px]:px-3">
              <div><p className="text-[#3B5189] text-[25px] mt-[10px] font-bold max-[720px]:mt-[10px]">Begin Your Real Estate Journey in the Philippines</p></div>
              <div><p className={`${lexend.className} font-light max-[720px]:text-justify`}>Begin your real estate journey in the Philippines, where a wealth of opportunities awaits. With its diverse range of properties, from luxurious beachfront villas to modern urban condos, you&apos;ll find the perfect fit for your lifestyle and investment goals. Explore stunning landscapes, from pristine beaches to lush mountains, and immerse yourself in the rich culture and warmth of the Filipino people. Whether you&apos;re seeking a dream home or a profitable investment, the Philippines offers endless potential. Take the first step and unlock the possibilities that this tropical paradise has to offer, making your real estate journey a truly unforgettable experience.</p></div>
              <div className="mt-3">
                <Link href="/list-my-property" className="flex justify-end items-center text-[#3B5189] font-bold group transition duration-300 ease-in-out hover:translate-x-2 hover:text-[#1DA834]">
                  Begin Your Listing Property
                  <FaArrowRight className="ml-3 transition duration-300 ease-in-out group-hover:mr-4 max-[720px]:mr-[10px]" />
                </Link>
              </div>
            </div>
            <img src="/assets/listing_6110be81026c8960_1628487297.jpg" className="w-[500px] h-[370px] max-[720px]:w-full max-[720px]:h-[40%]" />
          </div>
        </motion.div>
      </motion.div>
    {/* Fourth Screen */}
      <motion.div initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0 }} className="h-full bg-[#F9F9FB] mt-9 overflow-hidden">
        <motion.div variants={cardVariants} className="flex justify-center items-center pt-7 gap-x-[30px] pb-7 gap-y-[20px] flex-wrap">
          {properyIcon.map((item, index)=>(
            <div key={index} className="group shadow-[0px_0px_3px_2px_rgba(0,0,0,.25)] bg-[#fff] h-[450px] w-[300px] flex flex-col items-center relative transition-transform hover:scale-110 hover:shadow-[0px_10px_20px_2px_rgba(0,0,0,0.25)] duration-500 ease-in-out max-[420px]:mx-4">
              <Image src={`/icon/${item.icon}.png`} alt={`icon-${index}`} width={200} height={200} />
              <div className="text-center p-3">
                <p className="font-semibold">{item.properyTitle}</p>
                <p className={`${lexend.className} font-light mt-2`}>{item.paragraphproperty}</p>
              </div>
              <Link href={item.link} className="rounded-[5px] absolute bottom-[30px] border border-solid border-[2px] border-[#25D242] px-5 py-2 text-[#25D242] bg-[#fff] group-hover:bg-[#18872B] group-hover:text-white duration-500 transition ease-in-out group-hover:border-[#18872B]">{item.buttonProperty}</Link>
            </div>
          ))}
        </motion.div>
      </motion.div>
    {/* Fifth Screen */}
      <motion.div initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }} transition={{delay: .5}} className="mx-auto container max-w-[1100px]">
          <div className="flex pt-[40px] justify-center items-center max-[520px]:pl-10 max-[520px]:pr-10 flex-wrap">
            <div className="text-[#3B5189] font-bold flex flex-col items-center">
              <p className="text-[25px] max-[460px]:text-[16px]">FEATURED LISTING</p>
              <div className="bg-[#000] w-[70%] h-[3px] max-[460px]:w-[70%]"></div>
            </div>
          </div>
          <div className="mt-10 flex justify-center items-center m-10">
            <button type="button" className="max-[420px]:hidden max-[420px]:ml-[60px] max-[390px]:mr-[-60px] max-[420px]:w-[100px]" onClick={() => swiperRef.current!.slidePrev()}>
              <BiChevronLeft size={65} />
            </button>
            <Swiper
              modules={[Pagination, Autoplay]}
              className="mySwiper3"
              slidesPerView={slidesPerView}
              spaceBetween={30}
              slidesPerGroup={1}
              scrollbar={{ draggable: true }}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              speed={1700}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
            >
              <div className="container mx-auto">
                <div className="flex items-center justify-center">
                  {filterNotSold && filterNotSold?.length > 8 ? 
                  <>
                    {filterNotSold?.slice(0,8).map((item: any, index: number) => (
                    <SwiperSlide key={index} className="pt-5 pb-5">
                      <Product TypeProp={item?.Type} isImage={item?.Images[0]} id={item?.ProductId} location={`${item?.Location?.city}, ${item?.Location?.province}`} content={item?.TitleState} type={item?.PropertyType} Bathroom={item?.Bathrooms} Bedrooms={item?.Bedrooms} unit={item?.Unit} price={item?.Price} lot={item?.ParkingLot} floor={item?.LotFloor}  />
                    </SwiperSlide>
                  ))} 
                  </>
                  : 
                  <>
                    {filterNotSold?.slice(0,filterNotSold?.length).map((item: any, index: number) => (
                    <SwiperSlide key={index} className="pt-5 pb-5">
                      <Product TypeProp={item?.Type} isImage={item?.Images[0]} id={item?.ProductId} _id={item?._id} location={`${item?.Location?.city}, ${item?.Location?.province}`} content={item?.TitleState} type={item?.PropertyType} Bathroom={item?.Bathrooms} Bedrooms={item?.Bedrooms} unit={item?.Unit} price={item?.Price} lot={item?.ParkingLot} floor={item?.LotFloor}  />
                    </SwiperSlide>
                  ))}
                  </>}
                </div>
              </div>      
            </Swiper>
            <button type="button" className="max-[420px]:hidden max-[460px]:mr-[-40px] max-[390px]:mr-[-60px]" onClick={() => swiperRef.current!.slideNext()}>
              <BiChevronRight size={65} />
            </button>
          </div>
      </motion.div >
      <Contact mt={0} />
      <BankLoan />
      <Footer />
    </div>
    </React.Fragment>     
  )
}
