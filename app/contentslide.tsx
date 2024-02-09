import React, {useState, useEffect, useRef, FormEvent, MutableRefObject} from "react";

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
import { useGetSlideImageQuery, useGetPropertyQuery } from "./appApi/api";
import {useRouter} from "next/navigation";
import "./style.css";

SwiperCore.use([
    EffectCoverflow,
    EffectCube,
    EffectFade,
    Navigation,
    Pagination,
    Autoplay,
  ]);


const ContentSLide: React.FC = () =>{

    const BoxPropertyRef = useRef<HTMLDivElement | null>(null);

    const [showLoc, setshowLoc] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>("");
    const [showBoxOption, setshowBoxOption] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<string>("All");
    const [showbedroom, setshowbedroom] = useState<boolean>(false);
    const [selecterbed, setselecterbed] = useState<string>("");
    const [ShowOption, setShowOption] = useState<boolean>(false);
    const swiperRef: MutableRefObject<any | null> = useRef<(() => void) | null>(null);

    const Router = useRouter();

    const {data: Property} = useGetPropertyQuery();

    const {data: SlideImage} = useGetSlideImageQuery();

    const FilterRent: any = Property?.filter((property: any) => property.Type === "Rent");

    const FilterSale: any = Property?.filter((property: any) => property.Type === "Sales");
    const propertyTypeCodeMapSales = new Map();

    FilterSale?.forEach((property: any) => {
      const propertyType = property.PropertyType;
      const code = property.Code;
    
      if (propertyType != null) {
        if (!propertyTypeCodeMapSales.has(propertyType)) {
          propertyTypeCodeMapSales.set(propertyType, [code]);
        } else {
  
          if (!propertyTypeCodeMapSales.get(propertyType).includes(code)) {
            propertyTypeCodeMapSales.get(propertyType).push(code);
          }
        }
      }
    });

    const propertyTypeCodeMapRent = new Map();

    FilterRent?.forEach((property: any) => {
      const propertyType = property.PropertyType;
      const code = property.Code;
    
      if (propertyType != null) {
        if (!propertyTypeCodeMapRent.has(propertyType)) {
          propertyTypeCodeMapRent.set(propertyType, [code]);
        } else {
  
          if (!propertyTypeCodeMapRent.get(propertyType).includes(code)) {
            propertyTypeCodeMapRent.get(propertyType).push(code);
          }
        }
      }
    });

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
     
  const handleItemClickBed = (item: string): void => {
    setselecterbed(item);
    setshowbedroom(!showbedroom);
  };
  const handleItemClick = (item: string): void => {
    setSelectedItem(item);
    setshowBoxOption(!showBoxOption);
  };
 
  const handleSubmitLocation = (e: FormEvent) => {
    e.preventDefault();
    
    if(ShowOption){
      Router.push(`/property/rent?type=${selectedItem}&province=${inputValue}&bedrooms=${selecterbed}`);
    }else{
      Router.push(`/property/sale?type=${selectedItem}&province=${inputValue}&bedrooms=${selecterbed}`);
    }
  }

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

  const handleShowBoxOption = () => {
    setSelectedItem("All");
    setselecterbed("");
    setShowOption(!ShowOption);
  }

  const bedroomsUniqueRent = Array.from(new Set(FilterRent?.map((property: any) => property.Bedrooms)))
  .filter((bedroom) => bedroom !== undefined);

  const bedroomsUniqueSale = Array.from(new Set(FilterSale?.map((property: any) => property.Bedrooms)))
  .filter((bedroom) => bedroom !== undefined);


  // Mobile 

  const [propertyMobile, setpropertyMobile] = useState<boolean>(false);
  const [propertyMobilePhone, setpropertyMobilePhone] = useState<string>("BUY PROPERTY");

  const [propertyMobileTypeShow, setpropertyMobileTypeShow] = useState<boolean>(false);
  const [propertyTypeMobile, setPropertyTypeMobile] = useState<string>("");

  const [propertyBedroomShow, setpropertyBedroomShow] = useState<boolean>(false);
  const [propertyBedroom, setpropertyBedroom] = useState<string>("");

  const handleShowBedroom = () => {
    setpropertyBedroomShow(!propertyBedroomShow);
  }
  
  const handlePropertyShow = () => {
    setpropertyMobile(!propertyMobile); 
  }

  const setProperty = (property: string) => {
    setpropertyMobile(false);
    setpropertyMobilePhone(property)
    setPropertyTypeMobile("");
    setpropertyBedroom("");
  }

  const handleItemClickMobile = (item: string) => {
    setPropertyTypeMobile(item);
    setpropertyMobileTypeShow(false)
  }

  const handleShowBoxProperty = () => {
    setpropertyMobileTypeShow(!propertyMobileTypeShow)
  }

  const handleSumbitForMobile = (e: FormEvent) => {
    e.preventDefault();
    if(propertyMobilePhone === "BUY PROPERTY"){
      Router.push(`/property/sale?type=${propertyTypeMobile}&province=${inputValue}&bedrooms=${propertyBedroom}`);
    }else{
      Router.push(`/property/rent?type=${propertyTypeMobile}&province=${inputValue}&bedrooms=${propertyBedroom}`);
    }

  }

  const handleSetBedroom = (bedroom: string) => {
    setpropertyBedroom(bedroom);
    handleShowBedroom();
    
  }

  useEffect(() => {
    if (propertyMobile) {
      const handleClickOutside = (event: MouseEvent): void => {
          if (BoxPropertyRef.current && !BoxPropertyRef.current.contains(event.target as Node)) {
              setpropertyMobile(false);
          }
      };
  
      document.addEventListener('click', handleClickOutside);
  
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }
    
   
  }, [propertyMobile])


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
            className="mySwiper h-[500px] max-[420px]:h-[50vh] z-[-1]"
            onSwiper={(swiper: any) => {
              swiperRef.current = swiper;
            }}
          >
           
            {SlideImage && SlideImage.map((item: any, index: number)=> (
              <SwiperSlide key={index}> 
                <Image
                  src={`${item.images || "/assets/sean-pollock-PhYq704ffdA-unsplash.jpg"}`}
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
                  <form onSubmit={handleSubmitLocation} className="max-[720px]:hidden">
                    <div className="flex">
                        <div className="relative flex flex-col items-center">
                          <button type="button" onClick={handleShowBoxOption} className={`w-[195px] h-[45px] border-solid border border-[#fff] rounded-tl-[10px] ${ShowOption ? " bg-[#F9F9FB]" : "pointer-events-none bg-[#FFF] font-bold"}`}>
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
                          <button type="button" onClick={handleShowBoxOption} className={`bg-[#F9F9FB] w-[195px] h-[45px] border-solid border border-[#fff] rounded-tr-[10px] ${ShowOption ? "pointer-events-none bg-[#FFF] font-bold " : "bg-[#F9F9FB]"}`}>
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
                              {ShowOption ? 
                              <>
                                <li className="p-2 cursor-pointer" onClick={() => handleItemClick(("All"))}>All</li>
                                {Array.from(propertyTypeCodeMapRent.entries()).map(([propertyType, codes], index) => (      
                                  <li key={index} className="p-2 cursor-pointer" onClick={() => handleItemClick((codes))}>{propertyType}</li>
                                ))}
                              </> 
                              : 
                              <>
                                <li className="p-2 cursor-pointer" onClick={() => handleItemClick(("All"))}>All</li>
                                {Array.from(propertyTypeCodeMapSales.entries()).map(([propertyType, codes], index) => (      
                                  <li key={index} className="p-2 cursor-pointer" onClick={() => handleItemClick((codes))}>{propertyType}</li>
                                ))}
                              </>}
                            </ul>
                          </div>
                        </button>
                        <div className="h-[50%] w-[2px] bg-[rgba(0,0,0,0.30)] mr-[12px]"></div>
                        <div className="w-[80%] flex items-center">
                          <input onChange={handleChange} value={inputValue} placeholder="Search for location province...." className="w-[100%] h-full pl-3 mr-[20px] border-none outline-none " />
                          {!showLoc ? <MdLocationOn className="mr-[5px]" color="#25D242" size={70} /> : ""}
                          <button type="submit" className="py-[12px] rounded-[10px] px-[20px] mr-[5px] bg-[#25D242] whitespace-nowrap "><p className="font-medium">Find Your Home</p></button>
                        </div>
                      </div>
                      <button type="button" onClick={toggleBedRoomOption} className="relative rounded-b-[10px] w-[200px] bg-[#25D242] h-[50px] px-3 flex items-center justify-between">
                        <p className="font-medium">{selecterbed} BEDROOMS</p>
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
                            {ShowOption ?
                            <>
                              {bedroomsUniqueRent?.map((bedroom: any, index: number) => (
                                <li key={index} className="p-2 cursor-pointer" onClick={() => handleItemClickBed((bedroom))}>BEDROOMS {bedroom[index]}</li>
                              ))}
                            </>
                            :
                            <>
                              {bedroomsUniqueSale?.map((bedroom: any, index: number) => (
                                <li key={index} className="p-2 cursor-pointer" onClick={() => handleItemClickBed((bedroom))}>BEDROOMS {bedroom}</li>
                              ))}
                            </>}
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
          <form onSubmit={handleSumbitForMobile} className='container mx-auto max-w-[1150px] mt-8 mb-8 p-[20px] max-[720px]:block hidden'>
          <div className='w-full h-full border border-solid border-1 rounded-[5px] border-[#B9AFAF] shadow-[2px_2px_3px_0px_rgba(0,0,0,0.25)]'>
              <div className='flex p-5 w-full gap-x-[5px] flex-wrap justify-center gap-y-[20px]'>
                <div className="relative">
                  <button onClick={handlePropertyShow} type='button' className='rounded-[10px] px-5 py-3 border border-solid border-1 border-[#BCBCBC]'>
                    <div className='flex gap-x-[50px] items-center'>
                      <p className='font-bold text-[12px]'>{propertyMobilePhone}</p>
                      <BiCaretDown size={20} />
                    </div>
                  </button>
                  <div ref={BoxPropertyRef} className={`${propertyMobile ? "absolute" : "hidden"} z-[50] p-2 flex flex-col gap-y-[10px] top-[48px] border border-solid border-1 border-[#000] rounded-[5px] bg-[#fff] w-full`}>
                    <button type="button" onClick={() => setProperty("BUY PROPERTY")}>BUY PROPERTY</button>
                    <button type="button" onClick={() => setProperty("RENT PROPERTY")}>RENT PROPERTY</button>
                  </div>
                </div>
                <div className="relative">
                  <button onClick={handleShowBoxProperty} type='button' className='w-full rounded-[10px] px-5 py-3 border border-solid border-1 border-[#BCBCBC]'>
                    <div className='flex gap-x-[50px] items-center'>
                      <p className='font-bold text-[12px]'>{propertyTypeMobile || "PROPERTY TYPE"}</p>
                      <BiCaretDown size={20} />
                    </div>
                  </button>
                  <div className={`z-[40] ${propertyMobileTypeShow ? 'absolute' : 'hidden'} p-2 flex h-[100px] overflow-y-scroll flex-col gap-y-[1px] top-[48px] border border-solid border-1 border-[#000] rounded-[5px] bg-[#fff] w-full`}>
                    {propertyMobilePhone === "BUY PROPERTY" ? 
                    <>
                      <button type="button" className="p-2 cursor-pointer" onClick={() => handleItemClickMobile(("All"))}>All</button>
                      {Array.from(propertyTypeCodeMapSales.entries()).map(([propertyType, codes], index) => (      
                        <button type="button" key={index} className="p-2 cursor-pointer" onClick={() => handleItemClickMobile((codes))}>{propertyType}</button>
                      ))}
                    </>
                    : 
                    <>
                      <button type="button" className="p-2 cursor-pointer" onClick={() => handleItemClick(("All"))}>All</button>
                      {Array.from(propertyTypeCodeMapRent.entries()).map(([propertyType, codes], index) => (      
                        <button type="button" key={index} className="p-2 cursor-pointer" onClick={() => handleItemClickMobile((codes))}>{propertyType}</button>
                      ))}
                    </>}
                  </div>
                </div>
               <div className="relative">
                  <button type='button' onClick={handleShowBedroom} className='rounded-[10px] px-5 py-3 border border-solid border-1 border-[#BCBCBC]'>
                    <div className='flex gap-x-[50px] items-center'>
                      <p className='font-bold text-[12px]'>{propertyBedroom} BEDROOMS</p>
                      <BiCaretDown size={20} />
                    </div>
                  </button>
                  <div className={`${propertyBedroomShow ? "absolute" : "hidden"} z-[40] p-2 flex flex-col gap-y-[10px] top-[48px] border border-solid border-1 border-[#000] rounded-[5px] bg-[#fff] w-full`}>
                    {propertyMobilePhone === "BUY PROPERTY" ? 
                    <>
                      {bedroomsUniqueSale.map((property: any, index: number) => (
                        <button key={index} type="button" onClick={() => handleSetBedroom(property)}>{property} BEDROOMS</button>
                      ))} 
                    </> 
                    : 
                    <>
                    {bedroomsUniqueRent.map((property: any, index: number) => (
                      <button key={index} type="button" onClick={() => handleSetBedroom(property)}>{property} BEDROOMS</button>
                    ))} 
                    </>}
                  </div>
               </div>
              </div>
              <div>
              <div className="w-full flex-wrap gap-y-[20px] flex gap-x-[50px] justify-center items-center px-5">
                <div className='relative w-full'>
                  <input onChange={handleChange} value={inputValue} placeholder="Search for location...." className="py-[12px] w-[100%] h-full pl-3 mr-[20px] outline-none border border-solid border-1 border-[#BCBCBC] rounded-[5px]" />
                  {!showLoc ? <MdLocationOn className="absolute top-[7px] right-[20px]" color="#25D242" size={30} /> : ""}
                </div>
                <button type="submit" className="py-[12px] rounded-[10px] px-[35px] mr-[5px] bg-[#25D242] whitespace-nowrap "><p className="font-bold">Find Your Home</p></button>
                <Image src="/logo/LogoJama.png" width={180} height={180} alt="photoLogo" />
              </div>
              </div>
          </div>
        </form>
        </>
    )
}

export default ContentSLide