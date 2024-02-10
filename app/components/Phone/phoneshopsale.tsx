"use client";

import React,{useRef, useState, useEffect, FormEvent} from "react";
import { useSearchParams } from "next/navigation";
import { BiCaretDown, BiCaretUp } from "react-icons/bi";
import { useGetPropertyQuery } from "@/app/appApi/api";
import { useRouter } from "next/navigation";
import CardState from "../card/cardItemSale";
import Link from "next/link";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { AiFillAppstore, AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { Be_Vietnam_Pro } from 'next/font/google';
const VietnamPro = Be_Vietnam_Pro({weight: '700', preload: false})
const PhoneShopSale: React.FC = () => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const ProvinceRef = useRef<HTMLButtonElement | null>(null);
    const CityRef = useRef<HTMLButtonElement | null>(null);
    const PropertyRef = useRef<HTMLButtonElement | null>(null);
    const BedroomsRef = useRef<HTMLButtonElement | null>(null);
    const BathroomsRef = useRef<HTMLButtonElement | null>(null);

    const Router = useRouter();
  
    const {data: PropertySales} =  useGetPropertyQuery()
  
    const dropdownRef = useRef<HTMLDivElement | null>(null);
  
    const [showBoxFormShop, setshowBoxFormShop] = useState<boolean>(false);
    const [sortAsc, setSortAsc] = useState(false);
    const [reverseSort, setreverseSort] = useState(false);
    const [animated, setAnimated] = useState(false);
  
    const [open, setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [showDefault, setShowDefault] = useState(false);
    const [sortAZ, setsortAZ] = useState(false);
    const [reversesortAZ, setreversesortAZ] = useState(false);
    const [text, settext] = useState("Default");
  
    const [ProvinceBox, setProvinceBox] = useState<boolean>(false);
    const [CityBox, setCityBox] = useState<boolean>(false);
    const [PropertyBox, setPropertyBox] = useState<boolean>(false);
    const [BedroomsBox, setBedroomsBox] = useState<boolean>(false);
    const [BathRoomsBox, setBathroomsBox] = useState<boolean>(false);
  
    const [Province, setProvince] = useState<string>("");
    const [City, setCity] = useState<string>("");
    const [Property, setProperty] = useState<string>("");
    const [Bedrooms, setBedrooms] = useState<string>("");
    const [Bathrooms, setBathrooms] = useState<string>("");
    const searchParams = useSearchParams();
    const type = searchParams.get('type');
    const province = searchParams.get('province');
    const city = searchParams.get("city");
    const bedrooms = searchParams.get("bedrooms");
    const bathrooms = searchParams.get("bathrooms");
    const highestPrice: any = searchParams.get("highest");
    const lowestPrice: any = searchParams.get("lowest");
  
    const cardItemperPage = 10;
  
    const FilterTypeNumber: any = PropertySales?.filter((property: any) => property.Type === "Sales");
  
    const FilterType = (type && type !== "All") ? FilterTypeNumber?.filter((property: any) => property.Code === type) : FilterTypeNumber;
  
    const filterProvince: any = FilterType?.filter((property: any) => property.Location.province === province);
  
    const filterProv = filterProvince?.length > 0 ? filterProvince : FilterType;
  
    const filterCity: any = filterProv?.filter((property: any) => property.Location.city === city);
    
    const filterCit = filterCity?.length > 0 ? filterCity : filterProv;
    
    const filterBedrooms: any = filterCit?.filter((property: any) => property.Bedrooms === bedrooms);
  
    const filterBed = filterBedrooms?.length > 0 ? filterBedrooms : filterCit;
  
    const filterBathrooms: any = filterBed?.filter((property: any) => property.Bathrooms === bathrooms);
  
    const filteBath = filterBathrooms?.length > 0 ? filterBathrooms : filterBed;
  
    const filteredProperties = (lowestPrice === 0 && highestPrice === 0 && lowestPrice === null || highestPrice === null)
  ? filteBath 
  : filteBath?.filter((property: any) => {
      const propertyPrice = property.Price;
      return lowestPrice <= propertyPrice && propertyPrice <= highestPrice;
    });
  
    const TotalCardItems = ((type && type !== "All") ? filteredProperties?.filter((property: any) => property.Code === type) : FilterTypeNumber)?.length as number;
    const totalPages = Math.ceil(TotalCardItems / cardItemperPage);
    const startIndex = (currentPage - 1) * cardItemperPage;
    const endIndex = startIndex + cardItemperPage;
    const itemShow: any = filteredProperties?.slice(startIndex, endIndex);
    const [sortedItems, setSortedItems] = useState(itemShow);
    let maxPrice = 0;
  
    for (let i = 0; i < FilterTypeNumber?.length; i++) {
      if (FilterTypeNumber[i].Price > maxPrice) {
        maxPrice = FilterTypeNumber[i].Price;
      }
    }

    const handleClickToggleShop = () => {
        setshowBoxFormShop(!showBoxFormShop);
    }
  
    const [priceRange, setPriceRange] = useState([0, maxPrice]);
  
    const handlePriceChange = (value: any) => {
      setPriceRange(value);
    };
  
    const handleSort = () => {
      setSortAsc(true);
      setreverseSort(false);
      setShowDefault(false);
      setAnimated(true);
      settext("Lowest Prices")
      sortItems()
    };
  
    const handleReverseSort = () =>{
      setreverseSort(true);
      setSortAsc(false);
      setShowDefault(false);
      setAnimated(true);
      settext("Highest Prices")
      sortItems()
    }
  
    const handleAZ = () =>{
      setsortAZ(true);
      setreverseSort(false);
      setSortAsc(false);
      setShowDefault(false);
      setAnimated(true);
      settext("A - Z");
      sortItems();
    }
  
    const handleReverseAZ = () =>{
      setreversesortAZ(true);
      setsortAZ(false);
      setreverseSort(false);
      setSortAsc(false);
      setShowDefault(false);
      setAnimated(true);
      settext("Z - A");
      sortItems();
    }
  
    const handleDefault = () =>{
      setreverseSort(false);
      setSortAsc(false);
      setShowDefault(false);
      setAnimated(true);
      settext("Default");
      setSortedItems(itemShow);
    }
  
    const handlePageClick = (page: number) => {
      setCurrentPage(page);
      setAnimated(true);
    };
  
    const handleProvince = () => {
      setProvinceBox(!ProvinceBox);
    }
  
    const handleCity = () => {
      setCityBox(!CityBox);
    }
  
    const handleProperty = () => {
      setPropertyBox(!PropertyBox);
    }
  
    const handleBedrooms = () => {
      setBedroomsBox(!BedroomsBox);
    }
  
    const handleBathrooms = () => {
      setBathroomsBox(!BathRoomsBox);
    }
  
    const ProvinceSet = (item: string) => {
      setProvince(item);
    };
  
    const CitySet = (item: string) => {
      setCity(item);
    };
  
    const PropertySet = (item: string) => {
      setProperty(item);
    };
  
    const BedroomsSet = (item: string) => {
      setBedrooms(item);
    };
  
    const BathroomsSet = (item: string) => {
      setBathrooms(item);
    };
  
    const handleInputChange = (event: any, index: number) => {
        let { value } = event.target;
        value = Number(value);
  
        const newPriceRange = [...priceRange];
        if (index === 0) {
            value = Math.min(value, priceRange[1]);
            newPriceRange[index] = value;
        } else if (index === 1) {
          value = Math.max(value, priceRange[0]);
  
          value = Math.min(value, maxPrice);
          newPriceRange[index] = value;
        }
  
        setPriceRange(newPriceRange);
    };
  
    const handleSubmitFilter = (e: FormEvent) =>{
      e.preventDefault();
      handleClickToggleShop();
      Router.push(`/property/sale?type=${Property}&province=${Province}&city=${City}&bedrooms=${Bedrooms}&bathrooms=${Bathrooms}&highest=${priceRange[1] === 0 ? maxPrice : priceRange[1]}&lowest=${priceRange[0]}`)
      handleClearFilter();
    }
  
    const handleClearFilter = () => {
      setProvince("");
      setCity("");
      setProperty("");
      setBedrooms("");
      setBathrooms("");
      
      setPriceRange([0, 0]);
    }
  
    const handeClearFilterAll = () => {
      Router.push(`/property/sale?type=All`);
      setProvince("");
      setCity("");
      setProperty("");
      setBedrooms("");
      setBathrooms("");
      handleClickToggleShop();
      
      setPriceRange([0, 0]);
    }
  
    const toggleOpen = (): void =>{
        setOpen(!open);
    }
    const sortItems = () => {
      const sorted = [...itemShow];
      if (sortAsc) {
        sorted.sort((a, b) => a.Price - b.Price);
      } else if (reverseSort) {
        sorted.sort((a, b) => a.Price - b.Price);
        sorted.reverse();
      } else if (sortAZ) {
        sorted.sort((a, b) => a.TitleState.localeCompare(b.TitleState));
      }
      else if(reversesortAZ){
        sorted.sort((a, b) => a.TitleState[0].localeCompare(b.TitleState[0]));
        sorted.reverse();
      }
      setSortedItems(sorted);
    };
    if (sortAsc) {
      sortedItems.sort((a: any, b: any) => a.Price - b.Price);
    } else if (reverseSort) {
      sortedItems.sort((a: any, b: any) => a.Price - b.Price);
      sortedItems.reverse();
    } else if (sortAZ) {
      sortedItems.sort((a: any, b: any) => a.TitleState.localeCompare(b.TitleState));
    }
    else if(reversesortAZ){
      sortedItems.sort((a: any, b: any) => a.TitleState[0].localeCompare(b.TitleState[0]));
      sortedItems.reverse();
    }
   
    const handleNextPage = () =>{
        if(currentPage < totalPages){
            setCurrentPage(currentPage + 1);
        }
        setAnimated(true);
    }
  
    const handlePrevPage = () =>{
        if(currentPage > 1){
            setCurrentPage(currentPage - 1);
        }
        setAnimated(true);
    }
  
    const getPaginationNumbers = () => {
        const paginationNumbers = [];
        let startPage, endPage;
    
        if (totalPages <= 3) {
  
          startPage = 1;
          endPage = totalPages;
        } else {
  
          if (currentPage <= 1) {
            startPage = 1;
            endPage = 3;
          } else if (currentPage + 1 >= totalPages) {
            startPage = totalPages - 2;
            endPage = totalPages;
          } else {
            startPage = currentPage - 1;
            endPage = currentPage + 1;
          }
        }
    
        if (startPage > 1) {
          paginationNumbers.push(
            <button onClick={() => handlePageClick(1)} className='px-7 rounded-[5px] py-2 bg-[#D9D9D9] text-[#000] hover:bg-[#25D242] border boder-solid border-2 hover:border-[#000] transition duration-300 ease-in-out font-bold hover:text-[#000]'>{1}</button>);
          if (startPage > 2) {
            paginationNumbers.push(  
            <button key="left-ellipsis" className="ellipsis" disabled>
            ...
          </button>);
          }
        }
    
        for (let i = startPage; i <= endPage; i++) {
          paginationNumbers.push(
            <button onClick={() => handlePageClick(i)} className={`px-7 rounded-[5px] py-2 border boder-solid border-2 hover:bg-[#25D242] hover:border-[#000] hover:text-[#000] font-bold transition duration-300 ease-in-out ${currentPage === i ? 'bg-[#25D242] text-[#000] font-bold border boder-solid border-2 border-[#000]' : 'bg-[#D9D9D9] text-[#000]'}`}>{i}</button>
          );
        }
  
        if (endPage < totalPages) {
          if (endPage < totalPages - 1) {
            paginationNumbers.push(
                <button key="left-ellipsis" className="ellipsis" disabled>
                ...
              </button>
            );
          }
           // Last button
          paginationNumbers.push(
            <button onClick={() => handlePageClick(totalPages)}  className='px-7 rounded-[5px] py-2 bg-[#D9D9D9] text-[#000] hover:bg-[#25D242]] border boder-solid border-2 hover:border-[#000] transition duration-300 ease-in-out font-bold hover:text-[#000]'>{totalPages}</button>);
        }
    
        return paginationNumbers;
      };
  
      useEffect(()=> {
        if (showDefault) {
          const handleClickOutside = (event: MouseEvent): void => {
              if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                  setShowDefault(false);
              }
          };
      
          document.addEventListener('click', handleClickOutside);
      
          return () => {
            document.removeEventListener('click', handleClickOutside);
          };
        }
      }, [showDefault]);
  
      useEffect(() => {
        if (CityBox) {
          const handleClickOutside = (event: MouseEvent): void => {
              if (CityRef.current && !CityRef.current.contains(event.target as Node)) {
                  setCityBox(false);
              }
          };
      
          document.addEventListener('click', handleClickOutside);
      
          return () => {
            document.removeEventListener('click', handleClickOutside);
          };
        }
        
       
      }, [CityBox])
  
      useEffect(()=> {
        if (ProvinceBox) {
          const handleClickOutside = (event: MouseEvent): void => {
              if (ProvinceRef.current && !ProvinceRef.current.contains(event.target as Node)) {
                  setProvinceBox(false);
              }
          };
      
          document.addEventListener('click', handleClickOutside);
      
          return () => {
              document.removeEventListener('click', handleClickOutside);
          };
          }
  
      }, [ProvinceBox]);
  
      useEffect(()=> {
        if (PropertyBox) {
          const handleClickOutside = (event: MouseEvent): void => {
              if (PropertyRef.current && !PropertyRef.current.contains(event.target as Node)) {
                  setPropertyBox(false);
              }
          };
      
          document.addEventListener('click', handleClickOutside);
      
          return () => {
              document.removeEventListener('click', handleClickOutside);
          };
        }
      }, [PropertyBox]);
  
      useEffect(() => {
        if(BedroomsBox){
          const handleClickOutside = (event: MouseEvent): void => {
            if (BedroomsRef.current && !BedroomsRef.current.contains(event.target as Node)) {
                setBedroomsBox(false);
            }
          };
      
          document.addEventListener('click', handleClickOutside);
      
          return () => {
              document.removeEventListener('click', handleClickOutside);
          };
        }
      }, [BedroomsBox]);
  
      useEffect(() => {
        if(BathRoomsBox){
          const handleClickOutside = (event: MouseEvent): void => {
            if (BathroomsRef.current && !BathroomsRef.current.contains(event.target as Node)) {
                setBathroomsBox(false);
            }
          };
      
          document.addEventListener('click', handleClickOutside);
      
          return () => {
              document.removeEventListener('click', handleClickOutside);
          };
        }
      }, [BathRoomsBox])
  
      const toggleDropdown = () => {
        setShowDefault((prevShowDefault) => !prevShowDefault);
      };
  
    const railStyle = { backgroundColor: '#25D242' };
    const handleStyle = { backgroundColor: '#000000', borderColor: '#000000', borderRadius: '0px' };
    const trackStyle = { backgroundColor: '#1B7E19' }; // Set the track color to green
    const uniqueProvinces = Array.from(new Set(FilterTypeNumber?.map((property: any) => property.Location.province)));
    const uniqueCities = Array.from(new Set(FilterTypeNumber?.map((property: any) => property.Location.city)));
    const bedroomsUnique = Array.from(new Set(FilterTypeNumber?.map((property: any) => property.Bedrooms)))
    .filter((bedroom) => bedroom !== undefined);
  
    const bathroomsUnique = Array.from(new Set(FilterTypeNumber?.map((property: any) => property.Bathrooms))).filter((bathroom) => bathroom !== undefined);
    const propertyTypeCodeMap = new Map();
  
    FilterTypeNumber?.forEach((property: any) => {
      const propertyType = property.PropertyType;
      const code = property.Code;
    
      if (propertyType != null) {
        if (!propertyTypeCodeMap.has(propertyType)) {
          propertyTypeCodeMap.set(propertyType, [code]);
        } else {
  
          if (!propertyTypeCodeMap.get(propertyType).includes(code)) {
            propertyTypeCodeMap.get(propertyType).push(code);
          }
        }
      }
    });
    
    useEffect(() => {
        const updateWindowWidth = () => {
          setWindowWidth(window.innerWidth);
        };
    
        window.addEventListener('resize', updateWindowWidth);
    
        updateWindowWidth();
    
        // Cleanup: Remove event listener on component unmount
        return () => {
          window.removeEventListener('resize', updateWindowWidth);
        };
      }, []);

      useEffect(() => {
        if(windowWidth >= 720){
          document.body.style.overflow = "visible";
        }
      }, [windowWidth]);
      
     useEffect(()=> {
        if(showBoxFormShop){
            document.body.style.overflow = "hidden";
        }else{
            document.body.style.overflow = "visible";
        }
     }, [showBoxFormShop]);

    return(
        <React.Fragment>
             {windowWidth >= 820 ? <></> : 
                <>
                    <div className="relative">
                        <div className="sticky px-[10px] top-[0px] z-[20]">
                            <button onClick={handleClickToggleShop} type="button" className="border bg-[#fff] border-solid border-[3px] border-[#000] rounded-[5px] absolute top-[120px] text-[green] hover:text-[rgba(0,128,0,0.75)] transition duration-300 ease-in-out"><AiFillAppstore size={45} /></button>
                        </div>
                        <div className={`bg-[#fff] w-full h-full ${showBoxFormShop ? "fixed" : "hidden"} top-0 z-[10000] overflow-hidden`}>
                            <div className="h-full overflow-y-scroll">
                                <div className="p-3">
                                <div className="py-5 justify-center flex flex-col items-center">
                                    <button onClick={handleClickToggleShop} type="button" className="bg-[red] text-white w-full block py-2 rounded-[5px] shadow-3dshadow transition duration-300 ease-in-out hover:bg-[rgba(255,0,0,.75)]">CLOSE</button>
                                </div>
                                <form onSubmit={handleSubmitFilter} className="bg-[#3B5189] h-full flex pt-6 flex-col items-center w-full pb-6">
                                    <div className="bg-[#fff] py-[20px] w-[85%] rounded-[10px] sticky top-[100px]">
                                        <div className="flex flex-col items-center px-[25px]">
                                            <div className="mt-5 w-full relative">
                                            <button ref={ProvinceRef} type="button" onClick={handleProvince} className="w-full h-[45px] border border-1 rounded-[5px] color-[#000] border-solid border-[#7B7979] bg-[#EAEAEA] flex items-center pl-3 justify-between pr-3 cursor-pointer">
                                                <p className="text-[#000]">{Province || "Province"}</p>
                                                {ProvinceBox ? <BiCaretUp className="drop-shadow-[0px_10px_10px_0px_rgba(0,0,0,1)]" size={23} /> : <BiCaretDown className="drop-shadow-[0px_10px_10px_0px_rgba(0,0,0,1)]" size={23} />}
                                            </button>
                                            <div className={`px-[10px] px-[10px] z-[100] ${ProvinceBox ? "block" : "hidden"} overflow-y-scroll bg-[#fff] border border-solid border-1 border-[gray] w-full absolute top-[46px] h-[140px] rounded-[5px]`}>
                                                {uniqueProvinces?.map((property: any, index: number) => (
                                                <div className="group p-1 w-full" key={index}>
                                                    <button onClick={() => ProvinceSet(property)} type="button" className=" text-[15px] font-bold text-center w-full">{property}</button>
                                                    <div className="bg-[#000] w-full h-[0px] mt-1 group-hover:h-[2px]"></div>
                                                </div>  
                                                ))}      
                                            </div>
                                            </div>
                                            <div className="mt-5 w-full relative">
                                            <button ref={CityRef} onClick={handleCity} type="button" className="w-full h-[45px] border border-1 rounded-[5px] color-[#000] border-solid border-[#7B7979] bg-[#EAEAEA] flex items-center pl-3 justify-between pr-3 cursor-pointer">   
                                                <p className="text-[#000]">{City || "City"}</p>
                                                {CityBox ? <BiCaretUp className="drop-shadow-[0px_10px_10px_0px_rgba(0,0,0,1)]" size={23} /> : <BiCaretDown className="drop-shadow-[0px_10px_10px_0px_rgba(0,0,0,1)]" size={23} />}
                                            </button>
                                            <div className={`px-[10px] px-[10px] z-[100] ${CityBox ? "block" : "hidden"} overflow-y-scroll bg-[#fff] border border-solid border-1 border-[gray] w-full absolute top-[46px] h-[140px] rounded-[5px]`}>    
                                                {uniqueCities?.map((property: any, index: number) => (
                                                <div className="group p-1 w-full" key={index}>
                                                    <button onClick={() => CitySet(property)} type="button" className="p-1 text-[14px] font-bold text-center w-full">{property}</button>
                                                    <div className="bg-[#000] w-full h-[0px] mt-1 group-hover:h-[2px]"></div>
                                                </div>            
                                                ))}
                                            </div>
                                            </div>
                                            <div className="mt-5 w-full relative">
                                            <button onClick={handleProperty} ref={PropertyRef} type="button" className="w-full h-[45px] border border-1 rounded-[5px] color-[#000] border-solid border-[#7B7979] bg-[#EAEAEA] flex items-center pl-3 justify-between pr-3 cursor-pointer">
                                                <p className="text-[#000]">{Property || "Property Type"}</p>
                                                {PropertyBox ? <BiCaretUp className="drop-shadow-[0px_10px_10px_0px_rgba(0,0,0,1)]" size={23} /> : <BiCaretDown className="drop-shadow-[0px_10px_10px_0px_rgba(0,0,0,1)]" size={23} />}
                                            </button>
                                            <div className={`px-[10px] px-[10px] z-[100] ${PropertyBox ? "block" : "hidden"} overflow-y-scroll bg-[#fff] border border-solid border-1 border-[gray] w-full absolute top-[46px] h-[140px] rounded-[5px]`}>
                                            {Array.from(propertyTypeCodeMap.entries()).map(([propertyType, codes], index) => (
                                                <div className="group p-1 w-full" key={index}>
                                                    <button onClick={() => PropertySet(codes)} type="button" className="p1 text-[18px] font-bold text-center w-full">{propertyType}</button>
                                                    <div className="bg-[#000] w-full h-[0px] mt-1 group-hover:h-[2px]"></div>
                                                </div>  
                                            ))}
                                            </div>
                                            </div>
                                            <div className="mt-5 w-full relative">
                                            <button onClick={handleBedrooms} ref={BedroomsRef} type="button" className="w-full h-[45px] border border-1 rounded-[5px] color-[#000] border-solid border-[#7B7979] bg-[#EAEAEA] flex items-center pl-3 justify-between pr-3 cursor-pointer">
                                                <p className="text-[#000]">{`${Bedrooms} Bedrooms` || "Bedrooms"}</p>
                                                {BedroomsBox ? <BiCaretUp className="drop-shadow-[0px_10px_10px_0px_rgba(0,0,0,1)]" size={23} /> : <BiCaretDown className="drop-shadow-[0px_10px_10px_0px_rgba(0,0,0,1)]" size={23} />}
                                            </button>
                                            <div className={`px-[10px] px-[10px] z-[100] ${BedroomsBox ? "block" : "hidden"} overflow-y-scroll bg-[#fff] border border-solid border-1 border-[gray] w-full absolute top-[46px] h-[140px] rounded-[5px]`}>
                                            {bedroomsUnique && bedroomsUnique.length > 0 ? (
                                                bedroomsUnique.map((property: any, index: number) => (
                                                <div className="group p-1 w-full" key={index}>
                                                    <button onClick={() => BedroomsSet(property)} type="button" className="text-[18px] font-bold text-center w-full">{property} Bedrooms</button>
                                                    <div className="bg-[#000] w-full h-[0px] mt-1 group-hover:h-[2px]"></div>
                                                </div>
                                                ))
                                            ) : (
                                                <p className="text-center w-full mt-2">No bedrooms available</p>
                                            )}                                   
                                            </div>
                                            </div>
                                            <div className="mt-5 w-full relative">
                                            <button onClick={handleBathrooms} type="button" ref={BathroomsRef} className="w-full h-[45px] border border-1 rounded-[5px] color-[#000] border-solid border-[#7B7979] bg-[#EAEAEA] flex items-center pl-3 justify-between pr-3 cursor-pointer">
                                                <p className="text-[#000]">{`${Bathrooms} Bathrooms` || "Bathrooms"}</p>
                                                {BathRoomsBox ? <BiCaretUp className="drop-shadow-[0px_10px_10px_0px_rgba(0,0,0,1)]" size={23} /> : <BiCaretDown className="drop-shadow-[0px_10px_10px_0px_rgba(0,0,0,1)]" size={23} />}
                                            </button>
                                            <div className={`px-[10px] px-[10px] z-[100] ${BathRoomsBox ? "block" : "hidden"} overflow-y-scroll bg-[#fff] border border-solid border-1 border-[gray] w-full absolute top-[46px] h-[140px] rounded-[5px]`}>
                                            {bathroomsUnique && bathroomsUnique.length > 0 ? (
                                                bathroomsUnique.map((property: any, index: number) => (
                                                    <div className="group p-1 w-full" key={index}>
                                                    <button onClick={() => BathroomsSet(property)} type="button" className="text-[18px] font-bold text-center w-full">{property} Bathrooms</button>
                                                    <div className="bg-[#000] w-full h-[0px] mt-1 group-hover:h-[2px]"></div>
                                                    </div>
                                                ))
                                                ) : (
                                                <p className="text-center w-full mt-2">No bathroom options available</p>
                                                )}
                                            </div>
                                            </div>
                                            <div className="mt-4 mb-3">
                                                <p className={`font-bold text-[15px] ${VietnamPro.className}`}>Price Range</p>
                                            </div>
                                            <div className="w-full px-[25px]">
                                            <Slider
                                                min={0}
                                                max={maxPrice}
                                                value={priceRange}
                                                onChange={handlePriceChange}
                                                range
                                                trackStyle={[trackStyle, trackStyle]}
                                                railStyle={railStyle}
                                                handleStyle={[handleStyle, handleStyle]}
                                            />
                                            
                                        </div>
                                        </div>
                                        <div className="flex max-[420px]:flex-col px-5 justify-between items-center w-full mt-4">
                                                <div className="w-[40%] max-[620px]:w-[100%] flex items-center border border-solid border-1 border-[#BCBCBC] h-[40px] rounded-[5px]">
                                                    <p className="pl-2 pr-2">₱</p><input className="w-full outline-none" value={`${priceRange[0]}`} onChange={(e) => handleInputChange(e, 0)} />
                                                </div>
                                                <div className=""><p>to</p></div>
                                                <div className="w-[40%] max-[620px]:w-[100%] flex border border-solid border-1 border-[#BCBCBC] items-center h-[40px] rounded-[5px]">
                                                    <p className="pr-2 pl-2">₱</p><input className="w-full outline-none" value={`${priceRange[1]}`} onChange={(e) => handleInputChange(e, 1)} />
                                                </div>
                                            </div>
                                        <div className="flex flex-col items-center w-full px-10">
                                        <div className="w-full mt-4"><button className="w-full bg-[#25D242] py-2 rounded-[5px] font-bold" type="submit">Search Property</button></div>
                                        <div className="w-full mt-4"><button onClick={handeClearFilterAll} className="w-full bg-[#D9D9D9] py-2 rounded-[5px] font-bold hover:border-[#25D242] border border-solid border-2 transition ease-in-out duration-300" type="button">Clear Filter</button></div>
                                        </div>
                                    </div>
                                </form>
                                </div>
                            </div>
                        </div>
                        <div className="px-[10px] py-[20px]">
                        <div className="border-[#1B7E19] border w-full border-solid border-[2px] px-4 py-4 rounded-[10px] flex justify-between items-center">
                                <div className="flex gap-4 items-center">
                                    <div><p className="font-medium max-[360px]:hidden">Sort by: </p></div>
                                    <div className="relative">
                                    <div className="relative cursor-pointer rounded-[10px] flex py-2 items-center border border-solid border-1 border-[#BCBCBC] w-[200px] justify-between px-2" onClick={toggleDropdown} >
                                        <p className="font-medium">{text}</p>
                                        <BiCaretDown size={20} />
                                    </div>
                                    {showDefault ? <div ref={dropdownRef} className="absolute top-[42px] border border-solid border-1 left-[2px] border-[#BCBCBC] rounded-[5px] z-[1] w-full bg-[#fff]">
                                        <div className="flex flex-col items-center gap-y-1 p-2">
                                        <button type="button" onClick={handleDefault}>Default</button>
                                        <button type="button" onClick={handleReverseSort}>Highest Prices</button>
                                        <button type="button" onClick={handleSort}>Lowest Prices</button>
                                        <button type="button" onClick={handleAZ}>A - Z</button>
                                        <button type="button" onClick={handleReverseAZ}>Z - A</button>
                                        </div>
                                    </div>
                                    : ""  
                                    }
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div className="px-8 flex flex-col items-center">
                        <div className="flex flex-col">
                            {sortedItems && sortedItems.length > 0 ? (
                         <></>
                            ) : (
                            itemShow?.map((item: any, index: number) => (
                                <div
                                key={index}
                                className={`${animated ? "animate-[popUpAnimation_1s_ease-in-out]" : ""}`}
                                onAnimationEnd={() => setAnimated(false)}
                                >
                                <CardState
                                    id={index}
                                    isImage={item.Images[0]}
                                    title={item.TitleState}
                                    price={item.Price}
                                    link={`/jama_property/${item._id}`}
                                    location={`${item.Location.province}, ${item.Location.city}`}
                                    opening={open}
                                />
                                </div>
                            ))
                            )}
                        </div>
                    </div>
                      <div className="flex justify-center items-center p-8 gap-5 mt-5">
                        {itemShow?.length > 0 ? <>
                        <button onClick={handlePrevPage} className={`${currentPage === 1 ? "pointer-events-none bg-[#25D242]" : ""} bg-[#D9D9D9] hover:bg-[#25D242] border boder-solid border-2 border-[#000] hover:border-[#000] transition duration-300 ease-in-out rounded-[10px] text-[#000] px-5 py-3 font-bold hover:text-[#000]`}><AiOutlineArrowLeft style={{fontWeight: 'bold'}} size={20} /></button>
                        <button onClick={handleNextPage} className={`${currentPage === totalPages ? "pointer-events-none bg-[#25D242]" : ""} bg-[#D9D9D9] hover:bg-[#25D242] border boder-solid border-2 border-[#000] hover:border-[#000] transition duration-300 ease-in-out rounded-[10px] text-[#000] px-5 py-3 font-bold hover:text-[#000]`}><AiOutlineArrowRight fontWeight={'700'} style={{fontWeight: 'bold'}} size={20} /></button>
                        </> : 
                        <>
                          <div className="flex flex-col justify-center">
                                <div>
                                  <p className="font-bold">NO PROPERTY SHOW</p>
                                </div>
                                <Link href="/property/sale-list" className="text-center bg-[green] text-white rounded-[5px] shadow-3dshadow py-[8px] mt-5" >BACK TO LIST</Link>
                             </div>
                        </>
                        }
                      </div>
                    </div>
                    </>
                }
        </React.Fragment>
    )
}

export default PhoneShopSale;