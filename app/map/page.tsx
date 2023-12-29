'use client'

import React,{useRef, useState, useEffect, FormEvent} from "react";
import { BiCaretDown, BiCaretUp } from "react-icons/bi";
import { Be_Vietnam_Pro } from 'next/font/google';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import CardState from "../components/card/carditemformap";
import { useGetPropertyQuery } from "@/app/appApi/api";
import { MapContainer, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./style.css";
import { Marker } from "react-leaflet";
import { Icon, divIcon, point } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

interface MapInterface {
  lon: number;
  lat: number;
}

const VietnamPro = Be_Vietnam_Pro({weight: '700', preload: false})
const MapJamaRealty: React.FC = () => {


    const ProvinceRef = useRef<HTMLButtonElement | null>(null);
    const PropertyRef = useRef<HTMLButtonElement | null>(null);
    const BedroomsRef = useRef<HTMLButtonElement | null>(null);
    const BathroomsRef = useRef<HTMLButtonElement | null>(null);
    const TypeBoxRef = useRef<HTMLButtonElement | null>(null);

    const {data: PropertyRS} =  useGetPropertyQuery()

    const [centermap, setcentermap] = useState<MapInterface>({
      lon: 121.7740,
      lat: 12.8797,
    })


    const [ProvinceBox, setProvinceBox] = useState<boolean>(false);
    const [PropertyBox, setPropertyBox] = useState<boolean>(false);
    const [BedroomsBox, setBedroomsBox] = useState<boolean>(false);
    const [BathRoomsBox, setBathroomsBox] = useState<boolean>(false);
    const [TypeBox, setTypeBox] = useState<boolean>(false);
    const [Type, setType] = useState<string>("Sales");
    const [Province, setProvince] = useState<string>("");
    const [Property, setProperty] = useState<string>("");
    const [Bedrooms, setBedrooms] = useState<string>("");
    const [Bathrooms, setBathrooms] = useState<string>("");


    const FilterTypeNumber: any = PropertyRS?.filter((property: any) => property.Type === Type);

    const FilterType = (Property[0] && Property[0] !== "") ? FilterTypeNumber?.filter((property: any) => property.Code === Property[0]) : FilterTypeNumber;

    const filterProvince: any = FilterType?.filter((property: any) => property.Location.province === Province);

    const filterProv = filterProvince?.length > 0 ? filterProvince : FilterType;

    const filterBedrooms: any = filterProv?.filter((property: any) => property.Bedrooms === Bedrooms);

    const filterBed = filterBedrooms?.length > 0 ? filterBedrooms : filterProv;

    const filterBathrooms: any = filterBed?.filter((property: any) => property.Bathrooms === Bathrooms);

    const filteBath = filterBathrooms?.length > 0 ? filterBathrooms : filterBed;

    let maxPrice = 0;

    for (let i = 0; i < FilterTypeNumber?.length; i++) {
      if (FilterTypeNumber[i].Price > maxPrice) {
        maxPrice = FilterTypeNumber[i].Price;
      }
    }

    const [priceRange, setPriceRange] = useState([0, maxPrice]);

    const handlePriceChange = (value: any) => {
      setPriceRange(value);
    };


    const handleProvince = () => {
      setProvinceBox(!ProvinceBox);
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

    const handleTypeBox = () => {
      setTypeBox(!TypeBox);
    }

    const handleTypeSet = (type: string) => {
      setType(type)
    }

    const ProvinceSet = (item: string) => {
      setProvince(item);
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

    const handeClearFilterAll = () => {
      setProvince("");
      setProperty("");
      setBedrooms("");
      setBathrooms("");
      
      setPriceRange([0, 0]);
    }


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

      useEffect(() => {
        if(TypeBox){
          const handleClickOutside = (event: MouseEvent): void => {
            if (TypeBoxRef.current && !TypeBoxRef.current.contains(event.target as Node)) {
                setTypeBox(false);
            }
          };
      
          document.addEventListener('click', handleClickOutside);
      
          return () => {
              document.removeEventListener('click', handleClickOutside);
          };
        }
      }, [TypeBox])
      

    const customIcon = new Icon({
      iconUrl: "/icon/location.png",
      iconSize: [38, 38],
    })

    const center: [number, number] = [
      12.8797,
      121.7740,
    ];

    const railStyle = { backgroundColor: '#25D242' };
    const handleStyle = { backgroundColor: '#000000', borderColor: '#000000', borderRadius: '0px' };
    const trackStyle = { backgroundColor: '#1B7E19' }; // Set the track color to green
    const uniqueProvinces = Array.from(new Set(FilterTypeNumber?.map((property: any) => property.Location.province)));
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

    const newFilteredProperties =
    priceRange[0] === 0 && priceRange[1] === 0
      ? filteBath
      : filteBath?.filter((property: any) => {
          const propertyPrice = property.Price;
          return priceRange[0] <= propertyPrice && propertyPrice <= priceRange[1];
        });

    return(
        <React.Fragment>
            <title>Jama Realty | Map</title>
            <div className="bg-[#000] w-full h-[1px]"></div>
            <div className="grid grid grid-cols-[30vw_minmax(60vw,_1fr)]">
                <div>
                    <div className="overflow-y-scroll bg-[#fff] bord h-[100vh] w-full rounded-[10px]">
                        <div className="flex flex-col items-center px-[25px]">
                            <div className="flex w-full gap-x-[10px]">
                                <div className="mt-5 w-full relative">
                                    <button ref={ProvinceRef} type="button" onClick={handleProvince} className="w-full h-[45px] border border-1 rounded-[5px] color-[#000] border-solid border-[#7B7979] bg-[#EAEAEA] flex items-center pl-3 justify-between pr-3 cursor-pointer">
                                    <p className="text-[#000]">{Province || "Province"}</p>
                                    {ProvinceBox ? <BiCaretUp className="drop-shadow-[0px_10px_10px_0px_rgba(0,0,0,1)]" size={23} /> : <BiCaretDown className="drop-shadow-[0px_10px_10px_0px_rgba(0,0,0,1)]" size={23} />}
                                    </button>
                                    <div className={`px-[10px] px-[10px] z-[100] ${ProvinceBox ? "block" : "hidden"} overflow-y-scroll bg-[#fff] border border-solid border-1 border-[gray] w-full absolute top-[46px] h-[140px] rounded-[5px]`}>
                                        {uniqueProvinces?.map((property: any, index: number) => (
                                        <div className="group p-1 w-full" key={index}>
                                        <button onClick={() => ProvinceSet(property)} type="button" className="text-[15px] text-center w-full">{property}</button>
                                        <div className="bg-[#000] w-full h-[0px] mt-1 group-hover:h-[2px]"></div>
                                        </div>  
                                        ))}      
                                    </div>
                                </div>
                                </div>
                                <div className="mt-5 w-full relative">
                                    <button onClick={handleProperty} ref={PropertyRef} type="button" className="w-full h-[45px] border border-1 rounded-[5px] color-[#000] border-solid border-[#7B7979] bg-[#EAEAEA] flex items-center pl-3 justify-between pr-3 cursor-pointer">
                                    <p className="text-[#000]">{Property || "All"}</p>
                                    {PropertyBox ? <BiCaretUp className="drop-shadow-[0px_10px_10px_0px_rgba(0,0,0,1)]" size={23} /> : <BiCaretDown className="drop-shadow-[0px_10px_10px_0px_rgba(0,0,0,1)]" size={23} />}
                                    </button>
                                    <div className={`px-[10px] px-[10px] z-[100] ${PropertyBox ? "block" : "hidden"} overflow-y-scroll bg-[#fff] border border-solid border-1 border-[gray] w-full absolute top-[46px] h-[140px] rounded-[5px]`}>
                                    <div className="group p-1 w-full">
                                        <button onClick={() => PropertySet("")} type="button" className="p1 text-[15px] text-center w-full">All</button>
                                        <div className="bg-[#000] w-full h-[0px] mt-1 group-hover:h-[2px]"></div>
                                    </div>  
                                    {Array.from(propertyTypeCodeMap.entries()).map(([propertyType, codes], index) => (
                                        <div className="group p-1 w-full" key={index}>
                                        <button onClick={() => PropertySet(codes)} type="button" className="p1 text-[15px] text-center w-full">{propertyType}</button>
                                        <div className="bg-[#000] w-full h-[0px] mt-1 group-hover:h-[2px]"></div>
                                        </div>  
                                    ))}
                                    </div>
                                </div>
                            <div className="flex w-full gap-x-[10px]">
                            <div className="mt-5 w-full relative">
                                    <button onClick={handleBedrooms} ref={BedroomsRef} type="button" className="w-full h-[45px] border border-1 rounded-[5px] color-[#000] border-solid border-[#7B7979] bg-[#EAEAEA] flex items-center pl-3 justify-between pr-3 cursor-pointer">
                                    <p className="text-[#000]">{`${Bedrooms} Bedrooms` || "Bedrooms"}</p>
                                    {BedroomsBox ? <BiCaretUp className="drop-shadow-[0px_10px_10px_0px_rgba(0,0,0,1)]" size={23} /> : <BiCaretDown className="drop-shadow-[0px_10px_10px_0px_rgba(0,0,0,1)]" size={23} />}
                                    </button>
                                    <div className={`px-[10px] px-[10px] z-[100] ${BedroomsBox ? "block" : "hidden"} overflow-y-scroll bg-[#fff] border border-solid border-1 border-[gray] w-full absolute top-[46px] h-[140px] rounded-[5px]`}>
                                    {bedroomsUnique && bedroomsUnique.length > 0 ? (
                                    bedroomsUnique.map((property: any, index: number) => (
                                        <div className="group p-1 w-full" key={index}>
                                        <button onClick={() => BedroomsSet(property)} type="button" className="text-[15px]text-center w-full">{property} Bedrooms</button>
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
                                            <button onClick={() => BathroomsSet(property)} type="button" className="text-[15px] text-center w-full">{property} Bathrooms</button>
                                            <div className="bg-[#000] w-full h-[0px] mt-1 group-hover:h-[2px]"></div>
                                        </div>
                                        ))
                                    ) : (
                                        <p className="text-center w-full mt-2">No bathroom options available</p>
                                    )}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 w-full relative">
                                    <button onClick={handleTypeBox} type="button" ref={TypeBoxRef} className="w-full h-[45px] border border-1 rounded-[5px] color-[#000] border-solid border-[#7B7979] bg-[#EAEAEA] flex items-center pl-3 justify-between pr-3 cursor-pointer">
                                    <p className="text-[#000]">{Type}</p>
                                    {TypeBox ? <BiCaretUp className="drop-shadow-[0px_10px_10px_0px_rgba(0,0,0,1)]" size={23} /> : <BiCaretDown className="drop-shadow-[0px_10px_10px_0px_rgba(0,0,0,1)]" size={23} />}
                                    </button>
                                    <div className={`px-[10px] px-[10px] z-[100] ${TypeBox ? "block" : "hidden"} bg-[#fff] border border-solid border-1 border-[gray] w-full absolute top-[46px] rounded-[5px]`}>
                                        <div className="group p-1 w-full">
                                            <button onClick={() => handleTypeSet("Sales")} type="button" className="text-[15px] text-center w-full">Sales</button>
                                            <div className="bg-[#000] w-full h-[0px] mt-1 group-hover:h-[2px]"></div>
                                        </div>                   
                                        <div className="group p-1 w-full">
                                            <button onClick={() => handleTypeSet("Rent")} type="button" className="text-[15px] text-center w-full">Rent</button>
                                            <div className="bg-[#000] w-full h-[0px] mt-1 group-hover:h-[2px]"></div>
                                        </div>
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
                        <div className="flex px-5 justify-between items-center w-full mt-4">
                                <div className="w-[40%] flex items-center border border-solid border-1 border-[#BCBCBC] h-[40px] rounded-[5px]">
                                    <p className="pl-2 pr-2">₱</p><input className="w-full outline-none" value={`${priceRange[0]}`} onChange={(e) => handleInputChange(e, 0)} />
                                </div>
                                <div className=""><p>to</p></div>
                                <div className="w-[40%] flex border border-solid border-1 border-[#BCBCBC] items-center h-[40px] rounded-[5px]">
                                    <p className="pr-2 pl-2">₱</p><input className="w-full outline-none" value={`${priceRange[1]}`} onChange={(e) => handleInputChange(e, 1)} />
                                </div>
                            </div>
                        <div className="flex flex-col items-center w-full px-10">
                            <div className="w-full mt-4"><button onClick={handeClearFilterAll} className="w-full bg-[#D9D9D9] py-2 rounded-[5px] font-bold hover:border-[#25D242] border border-solid border-2 transition ease-in-out duration-300" type="button">Clear Filter</button></div>
                        </div>
                        <div className="bg-[#000] w-full h-[2px] mt-5"></div>
                        <div className="mt-5 flex flex-col items-center pb-5">
                            {newFilteredProperties?.length <= 0 ? 
                            <>
                              <div className="flex justify-center w-full">
                                <p className="text-[red] font-bold">No Property Show Up.</p>
                              </div>
                            </>
                            :   
                            <>
                              {newFilteredProperties && newFilteredProperties?.map((item: any, index: number) => (
                                <CardState key={index}
                                type = {Type}
                                id={index}
                                isImage={item.Images[0]}
                                title={`${item?.Code}${item.ProductId} - ${item.TitleState}`}
                                price={item.Price}
                                link={`/jama_property/${item._id}`}
                                location={`${item.Location.province}, ${item.Location.city}`}
                                />
                            ))}
                            </>}
                        </div>
                    </div>
                </div>
                <div className="">
                    <MapContainer scrollWheelZoom={false} center={newFilteredProperties?.length < 0 ? [12.8797, 121.7740] : [newFilteredProperties?.[0]?.lat, newFilteredProperties?.[0]?.lon]} zoom={newFilteredProperties?.length <= 0 ? 3 : 11}>
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <MarkerClusterGroup
                        chunkedLoading
                      >
                        {newFilteredProperties?.map((item: any, index: number) => (
                          <Marker key={index} position={[item?.lat, item?.lon]} icon={customIcon}>
                            <Popup>{item?.TitleState}</Popup>
                          </Marker>
                        ))}
                      </MarkerClusterGroup>
                    </MapContainer>
                </div>
            </div>
        </React.Fragment>
    )
}

export default MapJamaRealty;