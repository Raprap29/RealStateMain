"use client";

import React, {useState, useEffect} from "react";
import Image from "next/image";
import ShowAdsBox from "./adsBox";

const SideBarAds: React.FC = () => {

    const paths: string[] = ['facebook', 'youtube']

    const [showAds,setshowAds] = useState<boolean>(false);

    const handleShowAds = () => {
        setshowAds(!showAds);
    }

    return(
        <React.Fragment>
            <ShowAdsBox setshowAds={setshowAds} showAds={showAds} />
            <div className="fixed z-[700] top-[50%] left-0">
                <button onClick={handleShowAds} type="button" className="bg-[#000] h-[240px] flex flex-col gap-y-[10px] rounded-[5px] shadow-3dshadow text-white p-1">
                    {paths.map((path: any, index: number) => (
                        <Image key={index} src={`/icon/${path}.png`} width={30} height={5} alt="icon" />
                    ))}
                </button>
            </div>
        </React.Fragment>
    )
}

export default SideBarAds