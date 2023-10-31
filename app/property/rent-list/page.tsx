'use client';

import React, { useEffect, useState } from "react";
import {AiOutlineArrowRight} from "react-icons/ai";
import Link from "next/link";
import Contact from "@/app/components/contact/contact";
import ContentSLide from "@/app/contentslide";
import BankLoan from "@/app/components/loan/Loan";
import Footer from "@/app/components/footer/Footer";
interface ImagesList {
    id: number;
    type: string;
    image: string;
    Code: string;
}

const rentlist = () =>{
  const [Phone, setPhone] = useState<boolean>(false);


  const assetsItemImg: ImagesList[] = [
    {
        id: 1,
        type: "Condo/Apartment",
        image: "condopartment",
        Code: "CA",
    },
    {
        id: 2,
        type: "Office",
        image: "office",
        Code: "OF",
    },
    {
        id: 3,
        type: "Hotel",
        image: "hotel",
        Code: "HT",
    },
    {
        id: 4,
        type: "Commercial",
        image: "commercial",
        Code: "CM"
    },
    {
        id: 5,
        type: "Town House",
        image: "house",
        Code: "TH"
    },
    {
        id: 6,
        type: "Lot",
        image: "lot",
        Code: "LT",
    },
    {
        id: 7,
        type: "Warehouse",
        image: "warehouse",
        Code: "WH",
    },
  ]

  useEffect(()=>{
    window.addEventListener(
        "resize",
        () => window.innerWidth >= 620 ? setPhone(false) : setPhone(true)
    );
  }, [Phone])
    return(
        <>
        <title>Jama Realty - For Rent</title>
        <ContentSLide  />
        <div className="mx-auto container max-w-[1100px] mt-5">
          <div className="text-center">
            <p className="font-bold text-[35px]">FOR RENT</p>
            <p className="mt-4">Discover our wide range of rental properties, providing a diverse selection of options, including vacant lots, preselling condominium units, and fully-equipped commercial spaces. Whether you're seeking an investment opportunity or looking for a place to call home, our collection offers excellent choices for your rental needs.</p>
          </div>
            <div className="px-[10px] grid grid-cols-3 gap-4 mt-8 max-[740px]:grid-cols-3 max-[560px]:grid-cols-2 max-[460px]:grid-cols-1">
                {assetsItemImg.map((item, index) => (
                    <div key={index} className="flex justify-center relative">
                        <Link href={`/property/rent?type=${item.Code}`}>
                            <div className="group overflow-hidden w-full h-full flex justify-center relative">
                                <img className="z-[-1] w-[280] h-[280] transition duration-300 ease-in-out transform group-hover:scale-125" alt={`Photo-${item.id}`} src={`/salelist/${item.image}.jpg`}/>
                                <div className="bg-[rgba(0,0,0,0.25)] absolute top-0 w-full h-full"></div>
                                <p className="transition duration-300 ease-in-out group-hover:translate-y-[-1000%] absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] text-white font-bold text-[24px]">{item.type}</p>
                                <div className="z-[10] transition duration-300 ease-in-out group-hover:translate-y-[-50%] transform translate-x-[-50%] translate-y-[1000%] top-[50%] left-[50%] absolute top-0 bg-[rgba(217,217,217)] px-[40px] rounded-full py-3 border border-solid border-1 border-[#1B7E19] flex justify-center items-center text-[#1B7E19]"><p className="font-medium text-[18px] whitespace-nowrap">GO TOWARDS</p> <AiOutlineArrowRight className="font-black ml-4 transform animate-[move_1s_ease-in-out_infinite]" size={20} /></div>
                            </div>  
                        </Link>
                    </div>
                ))}
            </div>
        </div>
        <Contact mt={8} />
        <BankLoan />
        <Footer />
        </>
    )
}

export default rentlist;