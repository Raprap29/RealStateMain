"use client";

import React, {useState, useEffect, useRef} from "react";
import Image from "next/image";
import { FaTimes } from "react-icons/fa";
import { useGetSocMedQuery } from "@/app/appApi/api";
import { cp } from "fs";

interface showAdsBoxProps{
    showAds: boolean;
    setshowAds: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShowAdsBox: React.FC<showAdsBoxProps> = ({showAds, setshowAds}) => {

    const {data: SocMed} = useGetSocMedQuery()

    const [facebook, setFacebook] = useState<string>("");

    const [youtube, setYoutube] = useState<string>("");

    const handleShowAds = () => {
        setshowAds(!showAds);
    
    }

    const handleNavigateToWebsite = (url: string) => {
        window.location.href = url;
      };
    

    useEffect(() => {
        SocMed?.forEach((item: any) => {
            if (item?.name === "youtube") {
                setYoutube(item?.link);
            } else if (item?.name === "facebook") {
                setFacebook(item?.link);
            }
        });
    }, [SocMed]);
    
    

    return(
        <React.Fragment>
            <div className={`fixed z-[9999] bg-[rgba(0,0,0,.50)] w-full h-full transition-all duration-300 ease-in-out ${showAds ? "top-[49.9%]" : "top-[-50%]"} left-[50%] transform translate-y-[-50%] translate-x-[-50%]`}> 
                <div className="fixed top-[50%] left-[50%] tranform translate-x-[-50%] translate-y-[-50%] max-[720px]:w-[420px] max-[420px]:w-[360px] max-[370px]:w-[290px] max-[320px]:w-[250px] w-[550px] rounded-[5px] bg-[#fff] transition-all duration-300  ease-in-out">
                    <div className="bg-[#931722] relative h-[40px] flex items-center justify-center rounded-t-[5px]">
                        <p className="text-center text-[#fff] font-bold">Follow Us</p>
                        <div className="absolute top-[10px] right-[20px]">
                            <button type="button" className="text-[#fff]"  onClick={handleShowAds}><FaTimes /></button>
                        </div>
                    </div>
                    <div>
                        <iframe className="w-full" height="315" src="https://www.youtube.com/embed/zN67CXzI2C8" frameborder="0" allowfullscreen></iframe>
                    </div>
                    <div className="flex justify-between items-center w-full px-[20px]">
                        <div className="flex items-center w-full justify-between gap-x-[20px] py-[20px]">
                            <button type="button" onClick={() => handleNavigateToWebsite(facebook)} className="flex items-center w-full justify-center h-[50px] bg-[#316FF6] rounded-[5px] shadow-3dshadow text-[#fff]">Facebook</button>
                            <button type="button" onClick={() => handleNavigateToWebsite(youtube)} className="flex items-center w-full justify-center h-[50px] bg-[#FF5349] rounded-[5px] shadow-3dshadow text-[#fff]">Youtube</button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ShowAdsBox;