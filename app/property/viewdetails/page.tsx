"use client"

import React, {useState, useEffect, useRef, FormEvent} from "react";


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
import {useRouter} from "next/navigation";
import { useGetSlideImageQuery, useGetPropertyQuery } from "../../appApi/api";
SwiperCore.use([
    EffectCoverflow,
    EffectCube,
    EffectFade,
    Navigation,
    Pagination,
    Autoplay,
  ]);


const ViewDetails: React.FC = () =>{

    const BoxPropertyRef = useRef<HTMLDivElement | null>(null);

    const [showLoc, setshowLoc] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>("");
    const [showBoxOption, setshowBoxOption] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<string>("All");

    const Router = useRouter();

    const {data: Property} = useGetPropertyQuery();

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
          <form onSubmit={handleSumbitForMobile} className='container mx-auto max-w-[1150px] mt-8 mb-8 p-[20px] '>
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
                <div className="w-full gap-y-[20px] flex gap-x-[50px] justify-center items-center px-5">
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

export default ViewDetails;