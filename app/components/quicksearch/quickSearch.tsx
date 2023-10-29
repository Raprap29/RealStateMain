"use client"

import React, {useState, useRef, FormEvent} from 'react';
import { MuseoModerno } from "next/font/google";
import { BiCaretDown, BiCaretUp } from 'react-icons/bi';
import { MdLocationOn } from "react-icons/md";
import Image from 'next/image';
import { useGetPropertyQuery } from '@/app/appApi/api';
import { useRouter } from 'next/navigation';

const Museo_Moderno = MuseoModerno({weight: '700', preload: false});

const QuickSearch: React.FC = () => {
    const BoxPropertyRef = useRef<HTMLDivElement | null>(null);

    const Router = useRouter();

    const BoxPropertyTypeRef = useRef<HTMLDivElement | null>(null);
    const BoxPropertyBed = useRef<HTMLDivElement | null>(null);

    const [showLoc, setshowLoc] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>("");
  
    const {data: Property} = useGetPropertyQuery();
    const FilterRent: any = Property?.filter((property: any) => property.Type === "Rent");
  
    const [propertyBuyRent, setpropertyBuyRent] = useState<string>("BUY PROPERTY");
  
    const FilterSale: any = Property?.filter((property: any) => property.Type === "Sales");
    
    const bedroomsUniqueRent = Array.from(new Set(FilterRent?.map((property: any) => property.Bedrooms)))
    .filter((bedroom) => bedroom !== undefined);
  
    const bedroomsUniqueSale = Array.from(new Set(FilterSale?.map((property: any) => property.Bedrooms)))
    .filter((bedroom) => bedroom !== undefined);
  
    const [showBoxPropertyBuyRent, setshowBoxPropertyBuyRent] = useState<boolean>(false);
  
    const handleShowBoxBuyRent = () => {
      setshowBoxPropertyBuyRent(!showBoxPropertyBuyRent);
    }
    const [showbedroom, setshowbedroom] = useState<boolean>(false);
    const [showBoxPropertyType, setshowBoxPropertyType] = useState<boolean>(false);
    const [selecterbed, setselecterbed] = useState<string>("");
    const handleshowBoxPropertyType = () => {
      setshowBoxPropertyType(!showBoxPropertyType);
    }

    const toggleBedRoomOption = (): void =>{
        setshowbedroom(!showbedroom);
    }

    const handleSumbit = (e: FormEvent) => {
        e.preventDefault();
        if(propertyBuyRent === "BUY PROPERTY"){
          Router.push(`/property/sale?type=${selectedItem}&province=${inputValue}&bedrooms=${selecterbed}`);
        }else{
          Router.push(`/property/rent?type=${selectedItem}&province=${inputValue}&bedrooms=${selecterbed}`);
        }
    
      }
  
    const handleSetBuyRent = (value: string) => {
  
      if(value === "BUY PROPERTY")
      {
        setShowOption(false);
      }else{
        setShowOption(true);
      }
  
      setpropertyBuyRent(value);
      handleShowBoxBuyRent();
     
      setSelectedItem("PROPERTY TYPE")
    }
  
    const handleItemClickBed = (item: string): void => {
        setselecterbed(item);
        setshowbedroom(!showbedroom);
      };

    const handleChange = (e: any): void => {
      setInputValue(e.target.value);
   
      if (e.target.value === "") {
        setshowLoc(false);
      } else {
        setshowLoc(true);
      }
    };
  
    const [ShowOption, setShowOption] = useState<boolean>(false);
  
    const [selectedItem, setSelectedItem] = useState<string>("PROPERTY TYPE");
  
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
  
  
      const handleItemClick = (item: string): void => {
        setSelectedItem(item);
        handleshowBoxPropertyType();
      };
     
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
  
  
    React.useEffect(() => {
      if (showBoxPropertyBuyRent) {
        const handleClickOutside = (event: MouseEvent): void => {
            if (BoxPropertyRef.current && !BoxPropertyRef.current.contains(event.target as Node)) {
                setshowBoxPropertyBuyRent(false);
            }
        };
    
        document.addEventListener('click', handleClickOutside);
    
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }
  
    }, [showBoxPropertyBuyRent])
    
    React.useEffect(() => {
      if (showBoxPropertyType) {
        const handleClickOutside = (event: MouseEvent): void => {
            if (BoxPropertyTypeRef.current && !BoxPropertyTypeRef.current.contains(event.target as Node)) {
                setshowBoxPropertyType(false);
            }
        };
    
        document.addEventListener('click', handleClickOutside);
    
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }
  
    }, [showBoxPropertyType])
    
    React.useEffect(() => {
      if (showbedroom) {
        const handleClickOutside = (event: MouseEvent): void => {
            if (BoxPropertyBed.current && !BoxPropertyBed.current.contains(event.target as Node)) {
                setshowbedroom(false);
            }
        };
    
        document.addEventListener('click', handleClickOutside);
    
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }
  
    }, [showbedroom])

    return(
        <div className='container mx-auto max-w-[1150px] mt-8 mb-8'>
          <form onSubmit={handleSumbit} className='w-full h-full border border-solid border-1 rounded-[5px] border-[#B9AFAF] shadow-[2px_2px_3px_0px_rgba(0,0,0,0.25)]'>
              <div className='flex p-5 gap-x-[5px] justify-between'>
                <div className='relative'>
                  <button onClick={handleShowBoxBuyRent} type='button' className='rounded-[10px] px-10 py-3 border border-solid border-1 border-[#BCBCBC]'>
                    <div className='flex gap-x-[50px] items-center'>
                      <p className='font-bold text-[18px]'>
                        {propertyBuyRent}
                      </p>
                      <BiCaretDown size={30} />
                    </div>
                  </button>
                  <div ref={BoxPropertyRef} className={`${showBoxPropertyBuyRent ? "flex" : "hidden"} flex-col z-[3] py-[10px] gap-y-[10px] bg-[#fff] absolute top-[60px] border border-solid border-1 border-[rgba(0,0,0,.75)] w-full rounded-[5px]`}>
                    <button type='button' onClick={() => handleSetBuyRent("BUY PROPERTY")} className='w-full font-medium'>
                      <p>BUY PROPERTY</p>
                    </button>
                    <button type='button' onClick={() => handleSetBuyRent("RENT PROPERTY")}  className='w-full font-medium'><p>RENT PROPERTY</p></button>
                  </div>
                </div>
                <div className='relative'>
                  <button type='button' onClick={handleshowBoxPropertyType} className='rounded-[10px] px-10 py-3 border border-solid border-1 border-[#BCBCBC]'>
                    <div className='flex gap-x-[50px] items-center'>
                      <p className='font-bold text-[18px]'>{selectedItem}</p>
                      <BiCaretDown size={30} />
                    </div>
                  </button>
                  <div ref={BoxPropertyTypeRef} className={`${showBoxPropertyType ? "flex" : "hidden"} flex-col z-[3] py-[10px] gap-y-[10px] bg-[#fff] absolute top-[60px] border border-solid border-1 border-[rgba(0,0,0,.75)] w-full rounded-[5px]`}>
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
                </div>
                <div className='relative'>
                    <button type='button' onClick={toggleBedRoomOption} className='rounded-[10px] px-10 py-3 border border-solid border-1 border-[#BCBCBC]'>
                        <div className='flex gap-x-[50px] items-center'>
                            <p className="font-medium">{selecterbed} BEDROOMS</p>
                            {showbedroom ? 
                            <>
                            <BiCaretUp className="cursor-pointer" size={30} />
                            </>
                            :
                            <>
                            <BiCaretDown className="cursor-pointer" size={30} />
                            </>}
                        </div>
                    </button>
                        <div ref={BoxPropertyBed} className={`${!showbedroom ? "hidden" : "block"} z-[100] bg-[#FFF] border border-solid border-[1px] h-[120px] absolute w-full right-[-3px] rounded-[5px] top-[59px] overflow-y-scroll`}>
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
                </div>
              </div>
              <div>
              <div className="w-full flex gap-x-[50px] items-center px-5">
                <div className='relative w-full'>
                  <input onChange={handleChange} value={inputValue} placeholder="Search for location...." className="py-[12px] w-[100%] h-full pl-3 mr-[20px] outline-none border border-solid border-1 border-[#BCBCBC] rounded-[5px]" />
                  {!showLoc ? <MdLocationOn className="absolute top-[4px] right-[20px]" color="#25D242" size={40} /> : ""}
                </div>
                <button type="submit" className="py-[12px] rounded-[10px] px-[35px] mr-[5px] bg-[#25D242] whitespace-nowrap "><p className="font-bold">Find Your Home</p></button>
                <Image src="/logo/LogoJama.png" width={180} height={180} alt="photoLogo" />
              </div>
              </div>
          </form>
        </div>
    )
}

export default QuickSearch;