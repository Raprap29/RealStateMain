"use client"

import React, {useState, useEffect} from "react"; 
import { AiOutlineShareAlt } from "react-icons/ai";
import Link from "next/link";
import { MdLocationOn } from "react-icons/md";
import { MuseoModerno } from "next/font/google";
import Image from "next/image";

const Museo_Moderno = MuseoModerno({weight: '700', preload: false})

interface CardProps {
    isImage: string,
    title: string,
    price: number,
    link: string,
    location: string,
    id: number,
    opening: boolean,
}

const CardState: React.FC<CardProps> = ({isImage, title, price, link, location, id, opening}) =>{
    
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    
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
    
    return(
        <>
            {!opening ? 
                <>
                <div key={id} className={`max-[620px]:w-full max-[620px]:px-[20px] group bg-[#fff] border border-solid border-2 border-[#000000] w-[400px] h-[432.5px] rounded-[10px] transition-transform scale-95 hover:scale-100 transition ease-in-out duration-500 hover:shadow-[0px_10px_20px_2px_rgba(0,0,0,0.25)] shadow-[0px_0px_3px_2px_rgba(0,0,0,.25)]`}>
                    <Link href={link}>
                        <div className="flex flex-col items-center relative px-2">
                            <Image width={1000} height={240} src={isImage} alt="photo" className="h-[240px] w-full mt-2 rounded-[10px]" />
                            <div className="absolute top-[25px] bg-[#FF8A00] shadow-3dshadow px-4 py-2 rounded-[10px] left-[30px]"><p className="text-[#fff] font-bold">FOR SALE</p></div>
                            <div className="absolute bottom-4">
                                <div className="bg-[#D9D9D9] rounded-[5px] max-[620px]:w-full w-[330px]">
                                    <div className="flex items-center pr-[5px]">
                                        <MdLocationOn className="mr-[5px]" color="#25D242" size={windowWidth <= 620 ? 35 : 55} />
                                        <p className="text-[14px] text-black font-bold max-[360px]:text-[9px]">{handleChangeWord(location)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <div className="p-3"><p className="font-bold">{handleChangeWord(title)}</p></div>
                    <div className="pl-3 pr-3 pt-2 flex justify-between items-center">
                        <div className="font-medium"><p>Price: ₱<span> {formatPrice(price)}</span></p></div>
                    </div>
                    
                    {windowWidth >= 620 ? <> <Link href={link} className="bg-[#D9D9D9] rounded-b-[10px] border border-solid border-t-2 border-b-2 w-full border-[#000] py-3 absolute bottom-0 flex justify-center cursor-pointer group-hover:bg-[#25D242] group-hover:text-[#fff] transition ease-in-out duration-300"><h1 className="font-bold">VIEW MORE</h1></Link></> :
                    <>
                       <div className="mb-6">
                        <Link href={link} className="bg-[#D9D9D9] mt-7 rounded-[5px] border border-solid border-t-2 border-b-2 w-full border-[#000] py-3 flex justify-center cursor-pointer group-hover:bg-[#25D242] group-hover:text-[#fff] transition ease-in-out duration-300"><h1 className="font-bold">VIEW MORE</h1></Link>
                       </div>
                    </>
                    }
                </div>
                </>
                :
                <>
                <div key={id} className="group bg-[#fff] border border-solid border-2 border-[#000000] w-full h-full rounded-[10px] flex mb-4 scale-95 hover:scale-100 transition ease-in-out duration-500">
                    <Link href={link}>
                        <div className="h-full items-center flex py-2 px-2 w-full">
                            <Image width={1000} height={240} src={isImage} alt="photo" className="h-[240px] w-full rounded-[10px]" />
                        </div>
                    </Link>
                    <div className="py-3 px-3">
                        <Link href={link}>
                            <div className="flex justify-between">
                                <div className="bg-[#FF8A00] shadow-3dshadow px-4 py-2 rounded-[10px]">
                                    <p className="text-[#fff] font-bold">FOR SALE</p>
                                </div>
                                <div className={`font-bold text-[#25D242] text-[20px] ${Museo_Moderno.className}`}><p>₱<span>{formatPrice(price)}</span></p></div>
                            </div>
                            <div className="w-[500px] mt-2">
                                <p className="font-bold text-[22px]">{handleChangeWord(title)}</p>
                            </div>
                        <div className="flex items-center pr-[5px] mt-3">
                            <MdLocationOn className="mr-[5px]" color="#25D242" size={30} />
                            <p className="text-[14px] text-black font-bold max-[360px]:text-[12px]">{handleChangeWord(location)}</p>
                        </div>
                        </Link>
                        <div className="flex justify-between items-center mt-8 px-3">
                            <Link href={link} className="bg-[#D9D9D9] cursor-pointer px-5 py-2 rounded-[5px] group-hover:text-[#fff] group-hover:bg-[#25D242] transition ease-in-out duration-300"><p className="font-bold">View More</p></Link>
                            <div className="cursor-pointer"><AiOutlineShareAlt color="#25D242" size={40}/></div>
                        </div>
                    </div>
                </div>
                </>
            }
        </>
    )
}

export default CardState;