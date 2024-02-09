"use client"

import React from "react"; 
import { AiOutlineShareAlt } from "react-icons/ai";
import Link from "next/link";
import { MdLocationOn } from "react-icons/md";
import Image from "next/image";

interface CardProps {
    isImage: string;
    title: string;
    price: number;
    link: string;
    location: string;
    id: number;
    type: string;
}

const CardState: React.FC<CardProps> = ({isImage, title, price, link, location, id, type}) =>{
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
      
    return(
        <>
            <div key={id} className={`group bg-[#fff] border border-solid border-2 border-[#000000] w-[350px] h-[432.5px] rounded-[10px] transition-transform scale-95 hover:scale-100 transition ease-in-out duration-500 hover:shadow-[0px_10px_20px_2px_rgba(0,0,0,0.25)] shadow-[0px_0px_3px_2px_rgba(0,0,0,.25)]`}>
                <Link href={link}>
                    <div className="flex flex-col items-center relative px-[10px]">
                        <Image width={1000} height={240} src={isImage} alt="photo" className="h-[240px] w-full mt-2 rounded-[10px]" />
                        <div className={`absolute top-[25px] ${type === "Sales" ? "bg-[#FF8A00]" : "bg-[blue]"} shadow-3dshadow px-4 py-2 rounded-[10px] left-[30px]`}><p className="text-[#fff] font-bold">FOR {type}</p></div>
                        <div className="absolute bottom-4 px-[20px] w-full">
                            <div>
                                <div className="flex items-center pr-[10px] py-[10px] bg-[#D9D9D9] rounded-[5px]">
                                    <MdLocationOn className="mr-[5px]" color="#25D242" size={30} />
                                    <p className="text-[14px] text-black font-bold max-[360px]:text-[9px]">{handleChangeWord(location)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
                <div className="p-3"><p className="font-bold">{handleChangeWord(title)}</p></div>
                <div className="pl-3 pr-3 pt-2 flex justify-between items-center">
                    <div className="font-medium"><p>Price/Montly: ₱<span> {formatPrice(price)}</span></p></div>
                    <div className="cursor-pointer"><AiOutlineShareAlt color="#25D242" size={25}/></div>
                </div>
                <Link href={link} className="bg-[#D9D9D9] rounded-b-[10px] border border-solid border-t-2 border-b-2 w-full border-[#000] py-3 absolute bottom-0 flex justify-center cursor-pointer group-hover:bg-[#25D242] group-hover:text-[#fff] transition ease-in-out duration-300"><h1 className="font-bold">VIEW MORE</h1></Link>
            </div>
        </>
              
    )
}

export default CardState;