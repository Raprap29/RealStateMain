"use client";

import React from "react";
import Contact from "../components/contact/contact";
import Footer from "../components/footer/Footer";
import BankLoan from "../components/loan/Loan";
import QuickSearch from "../components/quicksearch/quickSearch";
import { MuseoModerno } from "next/font/google";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
const Museo_Moderno = MuseoModerno({weight: '700', preload: false})

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


const ContactUs: React.FC = () => {
    return(
        <React.Fragment>
            <title>Jama Realty - Contact Us</title>
            <div className="w-full h-full relative">
                <img src='/assets/PhotoAbout.jpg' className='bg-cover bg-center w-full h-[450px]' alt='photoabout'/>
                <div className='text-[#fff] absolute top-[35%] left-[50%] transform translate-x-[-50%] translate-x-[-50%] z-[1] w-full container mx-auto max-w-[1150px]'>
                    <p className={`text-[45px] text-center ${Museo_Moderno.className}`}>Contact Us for Inquire Property</p>
                </div>
                <div className='bg-[rgba(0,0,0,0.40)] w-full h-full absolute top-0'></div>
            </div>
            <QuickSearch />
            <Contact mt={0} />
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
                        {paths.map((path: any, index: number) => (
                            <div key={index} className="flex items-center gap-x-[20px]">
                                <Image key={path.name} src={`/icon/${path.name}.png`} width={30} height={5} alt="icon" />
                                <Link href={path.link}>{path.name}</Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <BankLoan />
            <Footer />
        </React.Fragment>
    )
}

export default ContactUs;