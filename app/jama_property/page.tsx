"use client";

import React, {useState, useEffect, useRef, ChangeEvent, FormEvent} from "react";
import QuickSearch from "../components/quicksearch/quickSearch";
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from "react-icons/md";
import { useSendMessageCustomerToEmailMutation } from "../appApi/api";
import { usePathname, useSearchParams  } from "next/navigation";

interface FormInquire {
    fullname: string;
    email: string;
    contact: string;
    subject: string;
    inquire: string;
}

interface FormInquireError {
    fullname: boolean;
    email: boolean;
    contact: boolean;
    subject: boolean;
    inquire: boolean;
}

const JamaRealtyView: React.FC = () => {

    const pathname = usePathname()
    const searchParams = useSearchParams()
    const type = searchParams.get('id');

    const [sendMessageFormError, setsendMessageFormError] = useState<FormInquireError>({
        fullname: false,
        email: false,
        contact: false,
        subject: false,
        inquire: false,
      })

      const [SendMessageInquire, {isLoading: LoadingInquire}] = useSendMessageCustomerToEmailMutation();

    const [FormInquire, setFormInquire] = useState<FormInquire>({
        fullname: '',
        email: '',
        contact: '',
        subject: '',
        inquire: '',
    })



    const DataProperty = [
        {
            img: "/assets/ezgif.com-webp-to-png.png"
        },
        {
            img: "/assets/097feff961369265243eca1867c57edc.jpg"
        },
        {
            img: "/assets/jason-dent-w3eFhqXjkZE].jpg"
        },
        {
            img: "/assets/ezgif.com-webp-to-png.png"
        },
        {
            img: "/assets/PhotoAbout.jpg"
        },
    ]

    const [currentNumber, setcurrentNumber] = useState<number>(0);

    const handleNext = () => {
        if(currentNumber >=  DataProperty?.length - 1)
        {
            setcurrentNumber(0);
        }else{
            setcurrentNumber(currentNumber + 1);
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormInquire({...FormInquire, [e.target.name]: e.target.value});
    }

    const handlePrev = () => {
        if(currentNumber <= 0)
        {
            setcurrentNumber(DataProperty?.length - 1);
        }else{
            setcurrentNumber(currentNumber - 1);
        }
    }

    const clickHandleImage = (index: number) => {
        setcurrentNumber(index);
    }

    function isValidContactNumber(contactNumber: string) {
        const pattern = /^[0-9]+$/;
    
        return pattern.test(contactNumber);
      }

    function isValidEmail(email: string) {
        const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        
        return pattern.test(email);
    }

    const clearAllField = () => {
        setsendMessageFormError({
            fullname: false,
            email: false,
            contact: false,
            subject: false,
            inquire: false,
        });

        setFormInquire({
            fullname: '',
            email: '',
            contact: '',
            subject: '',
            inquire: '',
        })
      }

    const handleSubmitInquire = async (e: FormEvent) => {
        e.preventDefault();
        const { 
            fullname,
            email,
            contact,
            subject,
            inquire
        } = FormInquire;
        try{

            const errors: FormInquireError = {...sendMessageFormError};
            if(!fullname){
                errors.fullname = true;
              }
              else{
                errors.fullname = false;
              }

              if(!subject){
                errors.subject = true;
              }
              else{
                errors.subject = false;
              }

            if(!inquire){
                errors.inquire = true;
              }
              else{
                errors.inquire = false;
              }
      
              if(!email){
                errors.email = true;
              }else if (!isValidEmail(email)) {
                errors.email = true;
              }
              else{
                errors.email = false;
              }
      
              if(!contact){
                errors.contact = true;
              }else if(isValidContactNumber(contact)){
                errors.contact = true;
              }
              else{
                errors.contact = false;
              }

              setsendMessageFormError(errors);

              if (Object.values(errors).every((error) => !error)) {
                await SendMessageInquire({
                    fullname: fullname,
                    email: email,
                    contact: contact,
                    subject: subject,
                    inquire: inquire,
                    url: `http:localhost:${pathname}?id=${type}`,
                }).unwrap();
                clearAllField();
              }
        }catch(err)
        {
            return console.error(err);
        }
    }

    return(
        <React.Fragment>
            <QuickSearch />
            <div className={`top-0 z-[10] bg-[rgba(0,0,0,0.25)] w-full ${LoadingInquire ? "fixed" : "hidden"} transition duration-300 ease-in-out h-full z-[30]`}>
                <img alt="Loading" src="/assets/Loading/Hourglass.gif" className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] z-[15] w-[60px] h-[60px]"  />
            </div>
            <div className="relative grid gap-x-[70px] grid-cols-[50vw_minmax(40vw,_1fr)] container mx-auto max-w-[1130px] h-[5000px]">
                <div>
                    <div><p className="font-medium text-[18px]">DR88-000132- Uptown Ritz | Conner unit Two Bedroom 2BR Condominium for Rent in 36th St. Cor. 9th Ave. Bonifacio Global City, Taguig</p></div>
                    <div className="relative w-full">
                        <img alt="Pic_1" className="w-[730px] shadow-3dshadow rounded-[5px] h-[350px] mb-[20px] mt-[10px]" src={DataProperty[currentNumber].img} />    
                        <div className="absolute right-[25px] top-[44%]">
                            <button type="button" className="bg-[green] transition duration-300 ease-in-out hover:bg-[rgba(0,128,0,.75)] shadow-3dshadow rounded-[600px]" onClick={handleNext}><MdKeyboardArrowRight size={50} color="#fff" /></button>
                        </div>
                        <div className="absolute top-[44%] left-[25px] top-0">
                            <button type="button" className="bg-[green] transition duration-300 ease-in-out hover:bg-[rgba(0,128,0,.75)] shadow-3dshadow rounded-[600px]" onClick={handlePrev}><MdKeyboardArrowLeft size={50} color="#fff" /></button>
                        </div>
                    </div>
                    <div className="flex mt-2 gap-x-[10px]">
                        {[1, 2, 3].map((offset) => {
                            const index = (currentNumber + offset) % DataProperty.length;
                            return (
                                <div className="cursor-pointer" onClick={() => clickHandleImage(index)} key={index}>
                                    <img
                                        alt={`props-${index}`}
                                        src={DataProperty[index].img}
                                        className="rounded-[5px] w-full h-[150px] shadow-3dshadow"
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <div>
                        <div className="bg-[#000] mt-[20px] w-full h-[2px]"></div>     
                    </div>
                    <div>
                        <p></p>
                    </div>
                </div>
                <div className="p-5 z-[3] sticky top-[90px] shadow-[0px_0px_20px_0px_rgba(0,0,0,.25)] bg-[#fff] h-[565px] w-[380px] border border-solid border-1 border-[green]">
                    <div className="w-full h-[60px] border flex justify-center items-center border-solid border-2 border-[green]">
                        <p className="drop-shadow-lg text-[26px] text-center font-bold text-[#3B5189]">INQUIRE NOW</p>
                    </div>
                    <form onSubmit={handleSubmitInquire} className="flex flex-col gap-y-[20px] mt-5">
                        <div className="w-full">
                            <input onChange={handleChange} value={FormInquire.fullname} name="fullname" type="text" placeholder="Full name *" className={`px-[10px] w-full h-[50px] outline-none border border-1 border-solid bg-[#EAEAEA] rounded-[5px] ${sendMessageFormError.fullname ? "border-[red]" : "border-[#7B7979]"}`} />
                        </div>
                        <div className="w-full">
                            <input onChange={handleChange} value={FormInquire.email} name="email" type="text" placeholder="Email *" className={`px-[10px] w-full h-[50px] outline-none border border-1 border-solid bg-[#EAEAEA] rounded-[5px] ${sendMessageFormError.email ? "border-[red]" : "border-[#7B7979]"}`} />
                        </div>
                        <div className="w-full">
                            <input onChange={handleChange} value={FormInquire.contact} name="contact" type="text" placeholder="+63" className={`px-[10px] w-full h-[50px] outline-none border border-1 border-solid bg-[#EAEAEA] rounded-[5px] ${sendMessageFormError.contact ? "border-[red]" : "border-[#7B7979]"}`} />
                        </div>
                        <div className="w-full">
                            <input onChange={handleChange} value={FormInquire.subject} name="subject" type="text" placeholder="Subject *" className={`px-[10px] w-full h-[50px] outline-none border border-1 border-solid bg-[#EAEAEA] rounded-[5px] ${sendMessageFormError.subject ? "border-[red]" : "border-[#7B7979]"}`} />
                        </div>
                        <div className="h-[100px] w-full">
                            <textarea onChange={handleChange} value={FormInquire.inquire} name="inquire" placeholder="I'd like to inquire about this property." className={`outline-none border border-1 border-solid bg-[#EAEAEA] rounded-[5px] ${sendMessageFormError.inquire ? "border-[red]" : "border-[#7B7979]"} p-2 resize-none h-full w-full`} />
                        </div>
                        <div className="w-full">
                            <button className="w-full py-[13px] transition duration-300 ease-in-out hover:bg-[rgba(31,67,41,0.75)] rounded-[5px] shadow-3dshadow bg-[#1F4329] text-white font-bold" type="submit">Send Inquiry</button>
                        </div>
                    </form>
                </div>
            </div>
            <div>
                
            </div>
        </React.Fragment>
    )
}

export default JamaRealtyView;