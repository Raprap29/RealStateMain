"use client"

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const BankLoan = () =>{

    const Router = useRouter();

    const NavigationToBankLoan = () => {
        Router.push("/bankloan")
    }

    return(
        <div className="h-[400px] relative">
            <div style={{ width: '100%', height: '400px' }} className="z-[-1]">
                <Image
                    src="/assets/a769abf246aa73992caf22dde4af3bd4.jpg"
                    layout="fill"
                    objectFit="cover"
                    alt="Background Image"
                />
            </div>
            <div className="absolute top-[50%] left-[50%] transfrom translate-x-[-50%] translate-y-[-50%] z-[2]">
                <Image alt="logojama" src="/logo/png-clipart-bdo-logo-and-slogan-bank.png" width={500} height={1000} className="w-[580px]" />
                <div className="flex justify-center">
                    <div className="group border border-solid border-2 border-[#004990] p-2 transition ease-in-out">
                        <button onClick={NavigationToBankLoan} type="button" className="bg-[#FFB20C] p-3 shadow-[0px_5px_5px_0px_rgba(0,73,144,0)] group-hover:shadow-[0px_0px_5px_5px_rgba(0,73,144,0.80)] transition ease-in-out duration-300"><p className={`text-[#fff] text-[16px] max-[520px]:text-[12px]`}>CLICK TO CALCULATE YOUR HOME LOAN</p></button>
                    </div>
                </div>
            </div>  
            <div className="bg-[rgba(0,0,0,0.10)] absolute top-0 w-full h-full z-[1]"></div>
        </div>
    )
}

export default BankLoan;