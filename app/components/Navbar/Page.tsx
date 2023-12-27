"use client"

import Image from "next/image";
import Link from "next/link";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Lexend } from "next/font/google";
import { usePathname } from "next/navigation";
import { FaHouseUser, FaTimes } from "react-icons/fa";
import {AiFillPhone, AiFillMail} from "react-icons/ai";
import Sidebar from "../SideBar/Page";
import {BiAlignLeft} from "react-icons/bi";
import { useGetDeveloperQuery } from "@/app/appApi/api";

const lexend = Lexend({
  weight: "600",
  preload: false,
});


const NavBar = () => {
  const pathname = usePathname();
  const [ToggleMenu, setToggleMenu] = useState<boolean>(false);
  const [Phone, setPhone] = useState<boolean>(false);
  const paths: string[] = ['facebook', 'instagram', 'viber', 'youtube', 'whatsapp']
  const toggleMenu = (): void => {
    setToggleMenu(!ToggleMenu);
  };

  const path_id = pathname.split("/");
  
  const OrganizeName = (name: string) => {
    const splitWords = name.split(" ");

    for (let i = 0; i < splitWords.length; i++) {
      const word = splitWords[i].toLowerCase();
      splitWords[i] = word.charAt(0).toUpperCase() + word.slice(1);
    }
  
    const finalName = splitWords.join(" ");
  
    return finalName;
  }


  const {data: Developer} = useGetDeveloperQuery();

  // While loading of the website it change if the width of the windows is 740
  useEffect(()=>{
    window.addEventListener(
        "resize",
        () => window.innerWidth >= 740 ? setPhone(false) : setPhone(true)
    );
  }, [Phone])

  return (
    <React.Fragment>
      {pathname === "/map" ? <></> : 
      <>
        <div className="bg-[#FFFFFF] h-[100px] z-70 flex items-center justify-between mx-auto container max-w-[1240px]">
        <div className="px-4 flex items-center max-[720px]:flex-col gap-y-[15px]">
          <p className={`${lexend.className} text-[14px] max-[720px]:text-[10px]`}>GET CONNECTED</p>
          <div className="ml-[20px] flex gap-x-[15px] max-[720px]:ml-[20px]">
            {paths.map((path) => (
              <Image key={path} src={`/icon/${path}.png`}  width={Phone ? 15 : 23} height={5} alt="icon" />
            ))}
          </div>
        </div>
        <div className="max-[620px]:hidden"><Image src="/logo/LogoJama.png" width={170} alt="logo" height={170} /></div>
        <div className="flex justify-center items-center gap-x-[50px]">
          <Link href="/map" className="max-[620px]:mr-[30px]"><Image src="/icon/ExploreLocation.png" width={Phone ? 60 : 80} height={Phone ? 60 : 80} alt="Icon" /></Link>
          <div className="flex-col justify-center items-center max-[620px]:hidden">
            <div className="flex items-center">
              <AiFillPhone className="mr-3" color="#1B7E19" size={25} />
              <p>571-766-6046</p>
            </div>
            <div className="flex items-center mt-3">
              <AiFillMail className="mr-3" color="#1B7E19" size={25} />
              <p>info@jamarealty.com</p>
            </div>
          </div>
        </div>
      </div>
      <nav className="max-[620px]:h-[70px] flex flex-wrap items-center px-1 justify-between bg-[#FFFFFF] sticky top-0 w-full items-center max-[720px]:px-2 z-[50]" style={{ boxShadow: "1px 5px 10px 0px rgba(0,0,0, 0.25)"}}>
        <div className="container mx-auto flex flex-wrap items-center">
          <div className="flex-grow items-center">
            <ul className="flex list-none items-center mx-auto container justify-between">
              <div className="relative justify-center hidden max-[720px]:flex items-center">                 
                <button onClick={toggleMenu} className="text-black cursor-pointer text-xl px-3 py-1">
                  <BiAlignLeft size={30} className="text-[#3B5189]" />
                </button>
              </div>
              <div className="max-[620px]:block hidden absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]"><Image src="/logo/LogoJama.png" width={Phone ? 120 : 170} alt="logo" height={Phone ? 120 : 170} /></div>
              <div className="flex items-center gap-x-2 max-[720px]:hidden">
                <li className={"nav-item"}>
                  <Link className="px-3 py-7 flex items-center text-xs uppercase font-bold leading-snug text-black hover:opacity-75 " href="/">
                    <div className="w-full relative">
                      <span>HOME</span>
                      {pathname === "/" && <div className="border-b-[3px] border-[#25D242] absolute top-6 left-0 right-0"></div>}
                    </div>
                  </Link>
                </li>
                <li className={`nav-item`}>
                  <Link className="px-3 py-7 flex items-center text-xs uppercase font-bold leading-snug text-black hover:opacity-75" href="/about">
                    <div className="w-full relative">
                      <span>ABOUT US</span>
                      {pathname === "/about" && <div className="border-b-[3px] border-[#25D242] absolute top-6 left-0 right-0"></div>}
                    </div>
                  </Link>
                </li>
                <li className={`nav-item`}>
                  <Link className="px-3 py-7 flex items-center text-xs uppercase font-bold leading-snug text-black hover:opacity-75" href="/property/rent-list">
                    <div className="w-full relative">
                      <span>RENT</span>
                      {pathname === "/property/rent-list" || pathname === `/property/rent` ? <div className="border-b-[3px] border-[#25D242] absolute top-6 left-0 right-0"></div> : ""}
                    </div>
                  </Link>
                </li>
                <li className={`nav-item`}>
                  <Link className="px-3 py-7 flex items-center text-xs uppercase font-bold leading-snug text-black hover:opacity-75" href="/property/sale-list">
                    <div className="w-full relative">
                      <span>SALE</span>
                      {pathname === "/property/sale-list" || pathname === `/property/sale` ? <div className="border-b-[3px] border-[#25D242] absolute top-6 left-0 right-0"></div> : ""}
                      <div>
                        
                      </div>
                    </div>
                  </Link>
                </li>
                <li className={`nav-item`}>
                  <Link className="px-3 py-7 flex items-center text-xs uppercase font-bold leading-snug text-black hover:opacity-75" href="/enlist-my-property">
                    <div className="w-full relative">
                      <span>ENLIST MY PROPERTY</span>
                      {pathname === "/enlist-my-property" || pathname === `/enlist-my-property` ? <div className="border-b-[3px] border-[#25D242] absolute top-6 left-0 right-0"></div> : ""}
                    </div>
                  </Link>
                </li>
                <li className={`nav-item`}>
                  <div className="relative group h-full">
                    <Link className="px-3 py-7 flex items-center text-xs uppercase font-bold leading-snug text-black hover:opacity-75" href="/property/developer">
                      <div className="w-full relative">
                        <span>TOP DEVELOPERS</span>
                        {pathname === "/property/developer" || pathname === `/property/developer/${path_id[3]}` ? <div className="border-b-[3px] border-[#25D242] absolute top-6 left-0 right-0"></div> : ""}
                      </div>
                    </Link>
                    <div className="absolute group-hover:block hidden top-[60px]">
                      <div className="bg-[#fff] border border-solid border-1 border-[#ccc] rounded-[5px] w-full">
                        {Developer && Developer?.map((item: any, index: number) => (
                          <div key={index} className="">
                            <Link href={`/property/developer/${item.nameDeveloper}`} className="w-full h-full text-[#000] hover:text-[#25D242]">
                              <p className="whitespace-nowrap py-[5px] px-[10px] font-medium h-full">{OrganizeName(item.nameDeveloper)}</p>
                            </Link>
                          </div>
                        ))}
                      </div> 
                    </div>
                  </div>
                </li>
                <li className={`nav-item`}>
                  <Link className="px-3 py-7 flex items-center text-xs uppercase font-bold leading-snug text-black hover:opacity-75" href="/contact-us">
                    <div className="w-full relative">
                      <span>CONTACT US</span>
                      {pathname === "/contact-us" && <div className="border-b-[3px] border-[#25D242] absolute top-6 left-0 right-0"></div>}
                    </div>
                  </Link>
                </li>
              </div>
              <div className="flex items-center gap-x-10 max-[720px]:hidden">
                <li className="nav-item">
                  <Link href="/map" className="px-3 py-4 flex items-center text-xs border border-solid border-[2px] border-[#1B7E19] hover:border-[rgba(27,126,25, 0.75)] uppercase font-bold leading-snug hover:bg-[rgba(37,210,66,0.75)] transition ease-in-out duration-300 font-black bg-[#25D242] rounded-[5px]">
                    <div className="flex items-center justify-center gap-x-5">
                      <p className="text-[20px]"><FaHouseUser /></p>
                      <p className="text-black font-black text-[14px]">EXPLORE LOCATION</p>
                    </div>
                  </Link>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </nav>
      {ToggleMenu && <Sidebar isOpen={ToggleMenu} setisOpen={setToggleMenu} />}
      </>
      
      }
    </React.Fragment>
  );
};

export default NavBar;
