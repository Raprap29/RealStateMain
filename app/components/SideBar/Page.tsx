import Link from "next/link";
import React, {useEffect, useState} from "react";
import { BiAlignLeft } from "react-icons/bi";
import { FaHouseUser, FaTimes } from "react-icons/fa";
import {Variant, motion} from "framer-motion";


interface SidebarProps {
  isOpen: boolean;
  setisOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setisOpen }) => {

  const SlideSideBar: Variant = {
    
  }

  const handleCloseNavBar = () =>{
    setisOpen(false);
  }

  return (
    <motion.div className={`overflow-y-scroll fixed left-0 top-0 h-screen transition-all duration-300 ease-in-out z-[9999] w-[70%] bg-gray-200 left-[-300px]`}>
      <div className="absolute top-[20px] right-[25px]">
        <button type="button" onClick={handleCloseNavBar} className="bg-[red] p-1 rounded-[5px] transition duratio-300 ease-in-out shadow-3dshadow text-white hover:bg-[rgba(255,0,0,.75)]"><FaTimes size={20} /></button>
      </div>
       <div className="container mx-auto mt-10">
          <div className="items-center">
            <ul className="list-none flex flex-col justify-center items-center">
              {/* <div className="max-[620px]:block hidden absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]"><Image src="/logo/LogoJama.png" width={Phone ? 120 : 170} alt="logo" height={Phone ? 120 : 170} /></div> */}
                <li className={"nav-item"}>
                  <Link onClick={handleCloseNavBar} className="px-3 py-7 flex items-center text-xs uppercase font-bold leading-snug text-black hover:opacity-75 " href="/">
                    <div className="w-full relative">
                      <span>HOME</span>                     
                    </div>
                  </Link>
                </li>
                <li className={`nav-item`}>
                  <Link onClick={handleCloseNavBar} className="px-3 py-7 flex items-center text-xs uppercase font-bold leading-snug text-black hover:opacity-75" href="/about">
                    <div className="w-full relative">
                      <span>ABOUT US</span>
                    </div>
                  </Link>
                </li>
                <li className={`nav-item`}>
                  <Link onClick={handleCloseNavBar} className="px-3 py-7 flex items-center text-xs uppercase font-bold leading-snug text-black hover:opacity-75" href="/property/rent-list">
                    <div className="w-full relative">
                      <span>RENT</span>
                    </div>
                  </Link>
                </li>
                <li className={`nav-item`}>
                  <Link onClick={handleCloseNavBar} className="px-3 py-7 flex items-center text-xs uppercase font-bold leading-snug text-black hover:opacity-75" href="/property/sale-list">
                    <div className="w-full relative">
                      <span>SALE</span>
                      <div>
                        
                      </div>
                    </div>
                  </Link>
                </li>
                <li className={`nav-item`}>
                  <Link onClick={handleCloseNavBar} className="px-3 py-7 flex items-center text-xs uppercase font-bold leading-snug text-black hover:opacity-75" href="/enlist-my-property">
                    <div className="w-full relative">
                      <span>ENLIST MY PROPERTY</span>
                    </div>
                  </Link>
                </li>
                <li className={`nav-item`}>
                  <div className="relative group h-full">
                    <Link onClick={handleCloseNavBar} className="px-3 py-7 flex items-center text-xs uppercase font-bold leading-snug text-black hover:opacity-75" href="/property/developer">
                      <div className="w-full relative">
                        <span>TOP DEVELOPERS</span>   
                      </div>
                    </Link>
                    <div className="absolute group-hover:block hidden top-[60px]">
                      <div className="bg-[#fff] border border-solid border-1 border-[#ccc] rounded-[5px] w-full">  
                      </div> 
                    </div>
                  </div>
                </li>
                <li className={`nav-item`}>
                  <Link onClick={handleCloseNavBar} className="px-3 py-7 flex items-center text-xs uppercase font-bold leading-snug text-black hover:opacity-75" href="/contact-us">
                    <div className="w-full relative">
                      <span>CONTACT US</span>                 
                    </div>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link onClick={handleCloseNavBar} href="/map" className="px-3 py-4 flex items-center text-xs border border-solid border-[2px] border-[#1B7E19] hover:border-[rgba(27,126,25, 0.75)] uppercase font-bold leading-snug hover:bg-[rgba(37,210,66,0.75)] transition ease-in-out duration-300 font-black bg-[#25D242] rounded-[5px]">
                    <div className="flex items-center justify-center gap-x-5">
                      <p className="text-[20px]"><FaHouseUser /></p>
                      <p className="text-black font-black text-[14px]">EXPLORE LOCATION</p>
                    </div>
                  </Link>
                </li>
            </ul>
          </div>
        </div>
    </motion.div>
  );
};

export default Sidebar;
