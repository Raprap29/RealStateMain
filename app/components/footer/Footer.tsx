"use client";

import Link from "next/link";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useSendSubsriberMutation } from "@/app/appApi/api";
import { Fjalla_One } from "next/font/google";
import Image from "next/image";

const Fjalla = Fjalla_One({weight: "400", subsets: ['latin']});

interface RegisterSubs {
    email: string;
}

const Footer: React.FC = () => {

    const [RegisterSubsriber, {isLoading}] = useSendSubsriberMutation();
    
    const [Register, setRegister] = useState<RegisterSubs>({
        email: '',
    })

    const [openError, setOpenError] = useState<boolean>(false);
    const [messageError, setmessageError] = useState<string>("");

    const chanageInput = (e: ChangeEvent<HTMLInputElement>) => {
        setRegister({...Register, [e.target.name]: e.target.value});
    }

    const HandleSubmitSubscribe = async (e: FormEvent) => {
        e.preventDefault();

        const {email} = Register;

        try{
            if (!email || !IsValidEmail(email)) {
                setOpenError(true); // Show an error if email is missing or invalid
                return;
            }

            setOpenError(false);
            setmessageError("");
            await RegisterSubsriber({
                email: email,
            }).unwrap();

            setRegister({
                email: '',
            })

        }catch(err)
        {
            setOpenError(true);
            setmessageError("This email is already exist.");
            return;
        }
    }

    const IsValidEmail = (Email: string) => {
        const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        
          return pattern.test(Email);
    }   

    return(
        <>
           <div className="flex flex-col items-center justify-center">
            <div className="bg-[#fff] max-[620px]:px-[20px] gap-y-[20px] grid grid-cols-3 max-[620px]:grid-cols-1 w-full max-[620px]:justify-center container mx-auto mt-4 mb-4">
                    <div className="w-full flex flex-col items-center">
                    <div className="max-w-[520px] w-[150px]">
                        <Image src="/logo/jamarealty.png" alt="JAMA REALTY Logo" layout="responsive" width={150} height={150} />
                    </div>
                    </div>
                    <div className="flex flex-col w-[200px] max-[620px]:w-full max-[620px]:items-center">
                        <div><h1 className={`${Fjalla.className} font-bold text-[30px] max-[520px]:text-[20px]`}>USEFUL LINES</h1></div>
                        <div className="w-full">
                            <div className="w-full max-[620px]:text-center">
                                <Link href="/" className="font-bold w-full max-[520px]:text-[13px]">HOME</Link>
                                <div className="bg-[#000] w-full h-[2px]"></div>
                            </div>
                            <div className="w-full max-[620px]:text-center">
                                <Link href="/about" className="font-bold w-full max-[520px]:text-[13px]">ABOUT</Link>
                                <div className="bg-[#000] w-full h-[2px]"></div>
                            </div>
                            <div className="w-full max-[620px]:text-center">
                                <Link href="/property/rent-list" className="font-bold w-full max-[520px]:text-[13px]">RENT</Link>
                                <div className="bg-[#000] w-full h-[2px]"></div>
                            </div>
                            <div className="w-full max-[620px]:text-center">
                                <Link href="/property/sale-list" className="font-bold w-full max-[520px]:text-[13px]">BUY</Link>
                                <div className="bg-[#000] w-full h-[2px]"></div>
                            </div>
                            <div className="w-full max-[620px]:text-center">
                                <Link href="/" className="font-bold w-full max-[520px]:text-[13px]">CONTACT US</Link>
                                <div className="bg-[#000] w-full h-[2px]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-col items-center">
                        <div className="w-full flex flex-col items-center">
                            <p className={`${Fjalla.className} text-[30px] max-[520px]:text-[20px]`}>SUBSCRIBE</p>
                            <p>Sign up for real estate news.</p>
                        </div>
                        <div className="w-full mt-[20px]">
                            <p className="ml-1 text-[red] mb-2">{messageError}</p>
                            <div className="flex items-center gap-x-[20px] w-full ">
                                <input name="email" value={Register.email} onChange={chanageInput} className={`w-full h-[40px] px-[10px] outline-none border  border-solid ${openError ? "border-[red] border-1 " : "border-[rgba(0,0,0,.50)] border-1 "} rounded-[5px] rounded-[5px]`} placeholder="Email Address" />
                                <button onClick={HandleSubmitSubscribe} type="button" className="bg-[#25D242] max-[520px]:text-[12px] h-[40px] w-[150px] font-bold rounded-[5px]">{isLoading ? "Loading..." : "SIGN UP"}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="container mx-auto w-full mt-3 mb-4">
                <div className="flex flex-col items-center w-full">
                    <p className="text-[rgba(0,0,0,.50)] font-bold text-center max-[520px]:text-[12px]">COPYRIGHT © 2023 <span className="text-[#0E7324]">Jama Realty.</span>  ALL RIGHTS RESERVED.</p>
                </div>
                <div className="flex flex-col items-center w-full mt-2 text-center">
                    <p className="text-[rgba(0,0,0,.50)] font-bold max-[520px]:text-[12px]">344 Maple Avenue W, #140, Vienna, VA 22180</p>
                    <p className="text-[rgba(0,0,0,.50)] font-bold max-[520px]:text-[12px]">info@jamarealty.com</p>
                    <p className="text-[rgba(0,0,0,.50)] font-bold max-[520px]:text-[12px]">571-766-6046</p>
                </div>
            </div>
        </>
    )
}

export default Footer;