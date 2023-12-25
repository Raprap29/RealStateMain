"use client";

import QuickSearch from "@/app/components/quicksearch/quickSearch";
import Link from "next/link";
import React, {useState, useEffect} from "react";
import { AiOutlineShareAlt } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";
import {Coustard} from "next/font/google";
import { useGetDeveloperQuery, useGetPropertyQuery } from "@/app/appApi/api";
import { useSearchParams } from "next/navigation";
import {Stint_Ultra_Condensed} from "next/font/google";

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import { FreeMode, Navigation, Thumbs } from 'swiper';
import BankLoan from "@/app/components/loan/Loan";
import Contact from "@/app/components/contact/contact";
import Footer from "@/app/components/footer/Footer";

const Coustard_Font = Coustard({weight: "400", subsets: ['latin']})
const Stint_Ultra = Stint_Ultra_Condensed({weight: "400", subsets: ['latin']});

const ViewDeveloper: React.FC = () => {

    const [thumbsSwiper, setThumbsSwiper] = useState<null>(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const searchParams = useSearchParams();
    const developer = searchParams.get('developer');

    const {data: Property} = useGetPropertyQuery();
    const {data: Developer} = useGetDeveloperQuery();

    const filteredDevelopers = Property && Property?.filter((item: any) => item.Developer === developer);
    
    const filterViewDevelopers = Developer && Developer?.filter((item: any) => item.nameDeveloper === developer);

    function handleChangeWord(sentence: string): string{

        const words = sentence.split(" ");

        if (words.length < 13) {
            return sentence;
        }

        const truncatedWords = words.slice(0, 13);
        const truncatedSentence = truncatedWords.join(' ');
      
        return `${truncatedSentence}...`;
    }
    
    function formatPrice(price: number): string {
        let priceStr = price.toFixed(2);
        
        const [integerPart, decimalPart] = priceStr.split('.');
        
        const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        const formattedDecimalPart = decimalPart ? `.${decimalPart}` : ".00";
    
        return formattedIntegerPart + formattedDecimalPart;

    }

    useEffect(() => {
        // Function to update window width
        const updateWindowWidth = () => {
          setWindowWidth(window.innerWidth);
        };
    
        // Add event listener for window resize
        window.addEventListener('resize', updateWindowWidth);
    
        // Initial update of window width
        updateWindowWidth();
    
        // Cleanup: Remove event listener on component unmount
        return () => {
          window.removeEventListener('resize', updateWindowWidth);
        };
      }, []);
    
    return(
        <React.Fragment>
            <title>Jama Realty Developer</title>
            <QuickSearch />
            <div className="container mx-auto max-w-[960px]">
                <div>
                    {filteredDevelopers && filteredDevelopers?.length <= 0 ? <></> : 
                    <>
                        <div className="flex justify-center max-[720px]:px-[20px]">
                            <p className={`font-medium text-[18px] mb-4 text-[24px] ${Coustard_Font.className} `}>Related Properties</p>
                        </div>   
                        {filteredDevelopers && filteredDevelopers?.slice(0,4)?.map((item: any, index: number) => (
                            <div className={`flex justify-center flex-wrap`} key={index}>
                                <div className={`group bg-[#fff] w-[300px] border border-solid border-2 border-[#000000] h-[432.5px] rounded-[10px] transition-transform scale-95 hover:scale-100 transition ease-in-out duration-500 hover:shadow-[0px_10px_20px_2px_rgba(0,0,0,0.25)] shadow-[0px_0px_3px_2px_rgba(0,0,0,.25)]`}>
                                    <Link href={`/jama_property?id=${item?._id}`}>
                                        <div className="flex flex-col items-center relative px-2">
                                            <img src={item?.Images[0]} alt="photo" className="h-[240px] w-full mt-2 rounded-[10px]" />
                                            <div className="absolute top-[25px] bg-[#FF8A00] shadow-3dshadow px-4 py-2 rounded-[10px] left-[30px]"><p className="text-[#fff] font-bold">FOR {item?.Type && item?.Type.toUpperCase()}</p></div>
                                            <div className="absolute bottom-4 rounded-[5px] w-full px-[20px]">
                                                <div className="flex items-center pr-[5px] bg-[#D9D9D9] py-[5px] rounded-[5px]">
                                                    <MdLocationOn className="mr-[5px]" color="#25D242" size={35} />
                                                    <p className="text-[14px] text-black font-bold max-[360px]:text-[9px]">{item?.Address}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                    <div className="p-3"><p className="font-bold">{handleChangeWord(item?.TitleState)}</p></div>
                                    <div className="pl-3 pr-3 pt-2 flex justify-between items-center">
                                        <div className="font-medium"><p>Price: ₱<span>{formatPrice(item?.Price)}</span></p></div>
                                        <div className="cursor-pointer"><AiOutlineShareAlt color="#25D242" size={25}/></div>
                                    </div>
                                    <Link href={`/jama_property?id=${item?._id}`} className="bg-[#D9D9D9] rounded-b-[10px] border border-solid border-t-2 border-b-2 w-full border-[#000] py-3 absolute bottom-0 flex justify-center cursor-pointer group-hover:bg-[#25D242] group-hover:text-[#fff] transition ease-in-out duration-300"><h1 className="font-bold">VIEW MORE</h1></Link>
                                </div>
                            </div>
                        ))}
                    </>}

                </div>
                {filterViewDevelopers && filterViewDevelopers?.map((item: any, index: number) => (
                    <div className="flex justify-center" key={index}>
                        <p className={`font-medium text-[18px] mb-4 text-[24px] ${Coustard_Font.className} text-center max-[720px]:px-[20px]`}>{item?.nameDeveloper}</p>
                    </div>
                ))}
                <div className="max-[720px]:px-[20px]">
                <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                  }}
                    loop={true}
                    spaceBetween={10}
                    navigation={true}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper2"
                >
                    {filterViewDevelopers && filterViewDevelopers?.map((item: any, index: number) => (
                        <div key={index}>
                            {item?.desciptionImagesForView && item?.desciptionImagesForView?.map((item: any, index: number) => (
                                <SwiperSlide key={index}>
                                    <img className="h-[300px] w-full rounded-[5px]" src={item} />
                                </SwiperSlide>
                            ))}
                        </div>
                    ))}
                   
                </Swiper>
                {windowWidth <= 820 ? <></> : 
                <>
                <Swiper
                    onSwiper={setThumbsSwiper}
                    loop={true}
                    spaceBetween={10}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper mt-4 block"
                >
                    {filterViewDevelopers && filterViewDevelopers?.map((item: any, index: number) => (
                        <div key={index}>
                            {item?.desciptionImagesForView && item?.desciptionImagesForView?.map((item: any, index: number) => (
                                <SwiperSlide key={index}>
                                    <img className="h-[150px] w-full cursor-pointer" src={item} />
                                </SwiperSlide>
                            ))}
                        </div>
                    ))}
                </Swiper>
                
                </>}
                </div>
            </div>
            <div className="mt-5 mb-5 container mx-auto">
                <hr />
                {filterViewDevelopers && filterViewDevelopers?.map((item:any, index: number) => (
                    <div className="flex justify-center mt-5 flex-col items-center max-[720px]:px-[20px]" key={index}>
                        <img alt="Logo" className="w-[250px] h-[200px] rounded-[5px]" src={item?.logo}/>
                        <p className={`text-[16px] text-justify w-[900px] max-[820px]:w-full max-[820px]:px-[10px] mt-5`}>{item?.descriptionLogo}</p>
                    </div>
                ))}
                <hr className="mt-4 mb-4" />
                {filterViewDevelopers && filterViewDevelopers?.map((item: any, index: number) => (
                    <div key={index}>
                        {item?.desciptionImagesOfLogo && item?.desciptionImagesOfLogo?.map((item: any, index: number) => (
                            <div className="flex justify-center mt-5 flex-col items-center mb-5 max-[720px]:px-[20px]" key={index}>
                                <img alt="Logo" className="h-[400px] rounded-[5px]" src={item?.image} />
                                <p className={`text-[16px] text-justify w-[900px] mt-5 max-[820px]:w-full max-[820px]:px-[10px]`}>{item?.descriptionImage}</p>
                            </div>
                        ))}
                    </div>
                ))}
               
            </div>
            <Contact mt={0} />
            <BankLoan />
            <Footer />
        </React.Fragment>
    )
}

export default ViewDeveloper;