import React, {useState, useEffect, useRef} from "react";


import SwiperCore, {
    EffectFade,
    EffectCoverflow,
    EffectCube,
} from "swiper";
import { BiChevronLeft, BiChevronRight, BiCaretDown, BiCaretUp } from "react-icons/bi";
import Image from "next/image";
import { Swiper, SwiperSlide} from "swiper/react";
import { MdLocationOn } from "react-icons/md";
import "swiper/css";
import "swiper/css/pagination"
import { Pagination, Navigation, Autoplay } from "swiper";
import { useGetSlideImageQuery } from "./appApi/api";

SwiperCore.use([
    EffectCoverflow,
    EffectCube,
    EffectFade,
    Navigation,
    Pagination,
    Autoplay,
  ]);


const ContentSLide: React.FC<ImageProps> = () =>{
    const [showLoc, setshowLoc] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>("");
    const [showBoxOption, setshowBoxOption] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<string>("ALL");
    const [showbedroom, setshowbedroom] = useState<boolean>(false);
    const [selecterbed, setselecterbed] = useState<string>("BEDROOMS");
    const [ShowOption, setShowOption] = useState<boolean>(false);
    const swiperRef = useRef();

    const {data: SlideImage} = useGetSlideImageQuery();

    const slideNext = () => {
      if (swiperRef && swiperRef.current && swiperRef.current.slideNext) {
        swiperRef.current.slideNext();
      }
    };
  
    const slidePrev = () => {
      if (swiperRef && swiperRef.current && swiperRef.current.slidePrev) {
        swiperRef.current.slidePrev();
      }
    };

    const handleClick = (index: number) => {
      if (swiperRef.current && swiperRef.current.swiper) {
        swiperRef.current.swiper.slideTo(index);
      }
    };
     
  const handleItemClickBed = (item: string): void => {
    setselecterbed(item);
    setshowbedroom(!showbedroom);
  };
  const handleItemClick = (item: string): void => {
    setSelectedItem(item);
    setshowBoxOption(!showBoxOption);
  };
 
  const handleChange = (e: any): void => {
    setInputValue(e.target.value);
 
    if (e.target.value === "") {
      setshowLoc(false);
    } else {
      setshowLoc(true);
    }
  };

  const toggleBedRoomOption = (): void =>{
    setshowbedroom(!showbedroom);
  }

  const toggleArrowOption = (): void =>{
    setshowBoxOption(!showBoxOption);
  }

    return(
        <>
          <div className="w-full h-[500px] max-[420px]:h-[50vh] relative">
          <Swiper
            modules={[Pagination, Autoplay, Navigation]}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            draggable={false}
            navigation={true}
            className="mySwiper h-[500px] max-[420px]:h-[50vh] z-[-1]"
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
           
            {SlideImage && SlideImage.map((item: any, index: number)=> (
              <SwiperSlide key={index}> 
                <Image
                  src={item.images}
                  alt={`Photo-${index}`}
                  layout="fill"
                  objectFit="cover"
                  className="z-[-1]"
                />
              </SwiperSlide>
            ))}
          </Swiper>
            <div className="absolute bg-[rgba(0,0,0,0.20)] h-[500px] w-full top-0 max-[420px]:h-[50vh] z-[1]"></div>
            <div className="z-[10] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] w-full h-full rounded-[10px] flex justify-between">
              <div className="h-full w-[160px] relative">
                <button onClick={slidePrev} className="h-full w-[200px] max-[720px]:w-[50px]  flex justify-center items-center text-[70px]">
                  <BiChevronLeft className="text-[#FFFFFF]" />
                </button>
              </div>
              <div className="absolute transform top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                <p className="text-[30px] font-bold text-white max-[420px]:text-[15px] max-[720px]:text-[25px]">Discover Your Dream Home, Ideal Office, or Lucrative Investment Property!</p>
                <p className="text-white mt-[10px]  max-[720px]:text-[15px] max-[420px]:text-[10px]">Unlock the Gateway to Exceptional Philippine Real Estate: Explore our Verified Listings Now!</p>
                <div className="mt-[20px]">
                  <form className="max-[720px]:hidden">
                    <div className="flex">
                        <div className="relative flex flex-col items-center">
                          <button type="button" onClick={() => setShowOption(!ShowOption)} className={`w-[195px] h-[45px] border-solid border border-[#fff] rounded-tl-[10px] ${ShowOption ? " bg-[#F9F9FB]" : "pointer-events-none bg-[#FFF] font-bold"}`}>
                            SALE PROPERTY
                          </button>
                          {ShowOption ? 
                          <>
                            
                          </>
                          :
                          <>
                            <div className="bg-[#25D242] absolute h-[3px] w-[30%] bottom-[8px]"></div>
                          </>
                        }
                        </div>
                        <div className="relative flex flex-col items-center">
                          <button type="button" onClick={() => setShowOption(!ShowOption)} className={`bg-[#F9F9FB] w-[195px] h-[45px] border-solid border border-[#fff] rounded-tr-[10px] ${ShowOption ? "pointer-events-none bg-[#FFF] font-bold " : "bg-[#F9F9FB]"}`}>
                            RENT PROPERTY
                          </button>
                          {ShowOption ? 
                          <>
                            <div className="bg-[#25D242] absolute h-[3px] w-[30%] bottom-[8px]"></div>
                          </>
                          :
                          <>
                            
                          </>
                          }
                        </div>
                      </div>
                      <div className="w-[100%] h-[60px] bg-[#fff] flex justify-center items-center border-solid border border-[1px] border-[#ffff] rounded-r-[10px]">
                        <button type="button" onClick={toggleArrowOption} className="w-[220px] flex justify-between items-center p-3 relative">
                          <p className="text-[14px] font-bold">{selectedItem}</p>
                          {showBoxOption ? 
                          <>
                            <BiCaretUp className="cursor-pointer" size={30} />
                          </>
                          :
                          <>
                            <BiCaretDown className="cursor-pointer" size={30} />
                          </>}
                          <div className={`${showBoxOption ? "block" : "hidden"} z-[10] bg-[#FFF] border border-solid border-[1px] w-[201px] absolute right-[-4.5px] rounded-[5px] top-[52px] overflow-y-scroll`}>
                            <ul className="divide-y divide-gray-300">
                              <li className="p-2 cursor-pointer" onClick={() => handleItemClick(("ALL"))}>ALL</li>
                              <li className="p-2 cursor-pointer" onClick={() => handleItemClick(("HOUSE"))}>HOUSE</li>
                              <li className="p-2 cursor-pointer" onClick={() => handleItemClick(("LAND"))}>LAND</li>
                              <li className="p-2 cursor-pointer" onClick={() => handleItemClick(("CONDOMINIUM"))}>CONDOMINIUM</li>
                            </ul>
                          </div>

                        </button>
                        <div className="h-[50%] w-[2px] bg-[rgba(0,0,0,0.30)] mr-[12px]"></div>
                        <div className="w-[80%] flex items-center">
                          <input onChange={handleChange} value={inputValue} placeholder="Search for location...." className="w-[100%] h-full pl-3 mr-[20px] border-none outline-none " />
                          {!showLoc ? <MdLocationOn className="mr-[5px]" color="#25D242" size={70} /> : ""}
                          <button type="button" className="py-[12px] rounded-[10px] px-[20px] mr-[5px] bg-[#25D242] whitespace-nowrap "><p className="font-medium">Find Your Home</p></button>
                        </div>
                      </div>
                      <button type="button" onClick={toggleBedRoomOption} className="relative rounded-b-[10px] w-[200px] bg-[#25D242] h-[50px] px-3 flex items-center justify-between">
                        <p className="font-medium">{selecterbed}</p>
                        {showbedroom ? 
                        <>
                          <BiCaretUp className="cursor-pointer" size={30} />
                        </>
                        :
                        <>
                          <BiCaretDown className="cursor-pointer" size={30} />
                        </>}
                        <div className={`${!showbedroom ? "hidden" : "block"} z-[100] bg-[#FFF] border border-solid border-[1px] h-[120px] w-[201px] absolute right-[-3px] rounded-[5px] top-[50px] overflow-y-scroll`}>
                          <ul className="divide-y divide-gray-300">
                            <li className="p-2 cursor-pointer" onClick={() => handleItemClickBed(("BEDROOMS 2"))}>BEDROOMS 2</li>
                            <li className="p-2 cursor-pointer" onClick={() => handleItemClickBed(("BEDROOMS 5"))}>BEDROOMS 5</li>
                            <li className="p-2 cursor-pointer" onClick={() => handleItemClickBed(("BEDROOMS 10"))}>BEDROOMS 10</li>
                            <li className="p-2 cursor-pointer" onClick={() => handleItemClickBed(("BEDROOMS 13"))}>BEDROOMS 13</li>
                          </ul>
                        </div>
                      </button>
                  </form>
                </div>
              </div>
              <button onClick={slideNext} className="h-full w-[200px] max-[720px]:w-[50px] flex justify-center items-center text-[70px]">
                <BiChevronRight className="text-white" />
              </button>
            </div>
          </div>
        </>
    )
}

export default ContentSLide