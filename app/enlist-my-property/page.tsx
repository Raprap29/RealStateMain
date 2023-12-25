"use client";

import React, {useState, useEffect, useRef} from "react";
import {Fjalla_One} from "next/font/google";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import Footer from "../components/footer/Footer";
import { BiCaretDown, BiCaretUp } from "react-icons/bi";

const Fjalla = Fjalla_One({weight: "400", subsets: ['latin']});

const EnlistMyProperty: React.FC = () => {

    const [showLooking, setshowLooking] = useState<boolean>(false);
    const LookRef = useRef<HTMLDivElement | null>(null)
    const [Looking, setLoooking] = useState<string>("Look For");

    const paths = [
        {
            name: "facebook",
            link: "testmuna",
        },
        {
            name: "instagram",
            link: "testmuna",
        },
        {
            name: "viber",
            link: "testmuna",
        },
        {
            name: "youtube",
            link: "testmuna",
        },
        {
            name: "whatsapp",
            link: "testmuna",
        },
    ]

    const setLookFor = (look: string) => {
        setLoooking(look);
        setshowLooking(false);
    }

    const PropertyType = [
        {
          name: "Condo/Apartment"
        },
        {
          name: "Office"
        },
        {
          name: "Hotel"
        },
        {
          name: "Commercial"
        },
        {
          name: "Warehouse"
        },
        {
          name: "Townhouse"
        },
        {
          name: "Lot"
        },
      ]

    
    React.useEffect(() => {
        if(showLooking){
          const handleClickOutside = (event: MouseEvent): void => {
            if (LookRef.current && !LookRef.current.contains(event.target as Node)) {
              setshowLooking(false);
            }
          };
      
          document.addEventListener('click', handleClickOutside);
      
          return () => {
              document.removeEventListener('click', handleClickOutside);
          };
        }
      }, [showLooking]);

    return(
        <React.Fragment>
            <title>Jama Realty | Enlist Property</title>
            <div className="w-full h-full relative">
                <img src='/assets/enlistProperty.jpg' className='bg-cover bg-center w-full h-[450px]' alt='photoabout'/>
                <div className='text-[#fff] absolute top-[35%] left-[50%] transform translate-x-[-50%] translate-x-[-50%] z-[1] w-full container mx-auto max-w-[1150px]'>
                    <p className={`text-[80px] text-center ${Fjalla.className}`}>Enlist Your Property</p>
                </div>
                <div className='bg-[rgba(0,0,0,0.40)] w-full h-full absolute top-0'></div>
            </div>
            <div className="container mx-auto flex justify-center mt-5 mb-5">
                <p className="text-center font-thin w-[900px]">If you own property is in the <span className="font-bold">Manila</span> and are looking to sell or rent it out? We can help you find ready buyers who are eager to invest. We understand that properties are meant to be profitable, and we are committed to helping you achieve that goal quickly.</p>
            </div>
            <div className="flex justify-center flex-col container mx-auto w-[630px]">
                <div className="flex justify-center w-full">
                    <input placeholder="Full Name *" className="px-[10px] py-[10px] rounded-[4px] w-full outline-none border border-solid border-1 border-[#ccc]" />
                </div>
                <div className="flex justify-center w-full gap-x-[20px] mb-5 mt-3 w-[500px]">
                    <div className="w-full">
                        <input placeholder="Email *" className="px-[10px] py-[10px] rounded-[4px] w-full outline-none border border-solid border-1 border-[#ccc]" />
                    </div>
                    <div className="w-full">
                        <input placeholder="Contact Number *" className="px-[10px] py-[10px] rounded-[4px] w-full outline-none border border-solid border-1 border-[#ccc]" />
                    </div>
                </div>
      
                <div className="flex flex-col items-center w-full">
                    <div className="flex justify-center w-full">
                        <input placeholder="Property Name *" className="px-[10px] py-[10px] rounded-[4px] w-full outline-none border border-solid border-1 border-[#ccc]" />
                    </div>
                  <div className="flex flex-col items-center justify-between w-full gap-x-[15px] max-[420px]:flex-col">
                    <div className="w-full">
                      <p className="text-white text-[16px] font-medium max-[560px]:text-[10px]">Look for</p>
                      <div className="relative">
                      {/* <div className="mb-2">{sendMessageFormError.ForLook && <p className="text-[red] font-bold">{sendMessageFormError.ForLook}</p>}</div> */}
                        <button type="button" onClick={() => setshowLooking(!showLooking)} className="flex items-center justify-between w-full bg-[#EAEAEA] py-2 rounded-[5px]">
                          <p className="pl-3">{Looking}</p> 
                          {showLooking ? 
                        <>
                          <BiCaretUp className="cursor-pointer pr-2" onClick={() => setshowLooking(!showLooking)} size={30} />
                        </>
                        :
                        <>
                          <BiCaretDown className="cursor-pointer pr-2" onClick={() => setshowLooking(!showLooking)} size={30} />
                        </>}
                        </button>
                        <div ref={LookRef} className={`overflow-y-scroll ${showLooking ? "absolute" : "hidden"} top-[48px] px-[10px] rounded-[5px] shadow-3dshadow bg-[#fff] w-full py-[10px] h-[120px]`}>
                            {PropertyType && PropertyType?.map((property: any, index: number) => (
                               <div className="group w-full" key={index}>
                                  <button type="button" onClick={() => setLookFor(property.name)} className="w-full">{property.name}</button>
                                  <div className="h-[0px] group-hover:h-[2px] w-full bg-[#000]"></div>
                               </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center w-full mt-2">
                    <input placeholder="Property Location *" className="px-[10px] py-[10px] rounded-[4px] w-full outline-none border border-solid border-1 border-[#ccc]" />
                  </div>
                  <div className="flex justify-center w-full mt-2">
                    <input placeholder="Asking Price *" className="px-[10px] py-[10px] rounded-[4px] w-full outline-none border border-solid border-1 border-[#ccc]" />
                  </div>
                </div>
                <div className="flex flex-col items-center">
                <p className="mt-5 text-[red]">Choose one you want to do your property *</p>
                </div>
                <div className="flex justify-center gap-x-[20px] mt-4">
                    <button type="button" className="w-full bg-[#ccc] py-[10px] rounded-[5px] shadow-3dshadow font-bold">I WANT TO SELL MY PROPERTY</button>
                    <button type="button" className="w-full bg-[#ccc] py-[10px] rounded-[5px] shadow-3dshadow font-bold">I WANT TO RENT MY PROPERTY</button>
                </div>
            </div>
          
            <div className="max-[720px]:px-[10px] container max-[720px]:grid-cols-1 gap-x-[30px] mx-auto mt-5 mb-5 grid justify-center w-full grid-cols-[55vw_minmax(35vw,_1fr)]">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d32020.601698411323!2d-77.26113928704667!3d38.896915577567704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b64bc40ef45803%3A0x43f037fa6d445dd4!2s344%20Maple%20Ave%20W%20%23140%2C%20Vienna%2C%20VA%2022180%2C%20Estados%20Unidos!5e0!3m2!1sfil!2sph!4v1699268451710!5m2!1sfil!2sph" className="w-full" height="450" loading="lazy"></iframe>
                <div className="max-[720px]:mt-[10px]">
                    <p className="text-[20px] font-medium">Contact Jama Realty</p>
                    <div className="mt-3 flex items-center gap-x-[20px]">
                        <FaMapMarkerAlt color="green" size={20} />
                        <p>344 Maple Avenue W, #140, Vienna, VA 22180</p>
                    </div>
                    <div className="mt-3 flex items-center gap-x-[20px]">
                        <FaPhoneAlt color="green" size={20} />
                        <a className="hover:text-[green] text-[#000] transition duration-300 ease-in-out" href="tel:571-766-6046">571-766-6046</a>
                    </div>
                    <div className="mt-3 flex items-center gap-x-[20px]">
                        <FaEnvelope color="green" size={20} />
                        <a className="hover:text-[green] text-[#000] transition duration-300 ease-in-out" href="mailto:info@jamarealty.com">info@jamarealty.com</a>
                    </div>
                    <div className="flex flex-col gap-y-[20px] mt-[35px]">
                        {paths.map((path: any) => (
                            <div className="flex items-center gap-x-[20px]">
                                <Image key={path.name} src={`/icon/${path.name}.png`} width={30} height={5} alt="icon" />
                                <Link href={path.link}>{path.name}</Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <hr/>
            <Footer />
        </React.Fragment>
    )
}

export default EnlistMyProperty;