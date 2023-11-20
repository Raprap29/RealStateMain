"use client";

import React, {ChangeEvent, useState, useRef, FormEvent} from "react";
import { BiCaretDown, BiCaretUp } from "react-icons/bi";
import Image from "next/image";
import { useSendMessageCustomerMutation } from "@/app/appApi/api";

interface styles {
    mt: number,
}

interface PropsSendMessage {
  FullName: string;
  Email: string;
  ContactNumber: string;
  Subject: string;
  Message: string;
}

interface ErrorSend {
  FullName: string;
  Email: string;
  ContactNumber: string;
  Subject: string;
  Message: string;
  ForLook: string;
  ForSale: string;
}


const Contact:React.FC<styles> = ({mt = 0}) =>{
    const [showLooking, setshowLooking] = useState<boolean>(false);
    const [showproperty, setshowproperty] = useState<boolean>(false);
    const LookRef = useRef<HTMLDivElement | null>(null)
    const LookSale = useRef<HTMLDivElement | null>(null);

    const [Looking, setLoooking] = useState<string>("Look For");
    const [Property, setProperty] = useState<string>("For Sale");

    const [sendMessageAdmin, {isLoading}] = useSendMessageCustomerMutation();

    const [sendMessageForm, setsendMessageForm] = useState<PropsSendMessage>({
      FullName: '',
      Email: '',
      ContactNumber: '',
      Subject: '',
      Message: '',
    })

    const clearAllField = () => {
      setsendMessageForm({
        FullName: '',
        Email: '',
        ContactNumber: '',
        Subject: '',
        Message: '',
      });
      setLoooking("Look For");
      setProperty("For Sale");
    }

    const [sendMessageFormError, setsendMessageFormError] = useState<ErrorSend>({
      FullName: '',
      Email: '',
      ContactNumber: '',
      Subject: '',
      Message: '',
      ForLook: '',
      ForSale: '',
    })

    const handleChangeMessage = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setsendMessageForm({...sendMessageForm, [e.target.name]: e.target.value});
    }

    const setLookFor = (look: string) => {
      setLoooking(look);
      setshowLooking(false);
    }

    const setLookSale = (look: string) => {
      setProperty(look);
      setshowproperty(false);
    }

    const handleSubmitSend = async (e: FormEvent) => {
        e.preventDefault();

        const errors: ErrorSend  = {...sendMessageFormError};

        try{
          const { FullName,
          Email,
          ContactNumber,
          Subject,
          Message
        } = sendMessageForm;

        if(!FullName){
          errors.FullName = '* Full Name is required';
        }
        else{
          errors.FullName = '';
        }

        if(!Email){
          errors.Email = '* Email is required';
        }else if (!isValidEmail(Email)) {
          errors.Email = '* Invalid email format';
        }
        else{
          errors.Email = '';
        }

        if(!ContactNumber){
          errors.ContactNumber = '* Contact number is required';
        }else if(isValidContactNumber(ContactNumber)){
          errors.ContactNumber = '* Invalid format';
        }
        else{
          errors.ContactNumber = '';
        }

        if(!Subject){
          errors.Subject = "* Subject is required";
        }else{
          errors.Subject = '';
        }

        if(!Message){
          errors.Message = "* Message is required";
        }
        else{
          errors.Message = '';
        }

        if(Looking === "Look For"){
          errors.ForLook = "* Required";
        }
        else{
          errors.ForLook = '';
        }

        if(Property === "For Sale"){
          errors.ForSale = "* Required";
        }
        else{
          errors.ForSale = '';
        }
        
        function isValidContactNumber(contactNumber: string) {
          const pattern = /^[0-9]+$/;
      
          return pattern.test(contactNumber);
        }

        function isValidEmail(email: string) {
          const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        
          return pattern.test(email);
        }

        setsendMessageFormError(errors);

        if (Object.values(errors).every((error) => !error)) {
          await sendMessageAdmin({
            FullName: FullName,
            Email: Email,
            ContactNumber: ContactNumber,
            Subject: Subject,
            Message: Message,
            LookF: Looking,
            TypeP: Property,
          }).unwrap();
          clearAllField();
        }

        }catch(err)
        {
          console.error(err);
          return;
        }
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

    React.useEffect(() => {
      if(showproperty){
        const handleClickOutside = (event: MouseEvent): void => {
          if (LookSale.current && !LookSale.current.contains(event.target as Node)) {
            setshowproperty(false);
          }
        };
    
        document.addEventListener('click', handleClickOutside);
    
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
      }
    }, [showproperty]);


    return(
        <div className={`w-full h-[900px] max-[420px]:h-[900px] relative mt-${mt}`}>
        <div className="h-screen max-[420px]:h-[800px]">
          <Image
            src="/assets/ezgif.com-webp-to-png.png"
            alt="Photo"
            layout="fill"
            objectFit="cover"
            className="z-[-1]"
          />
        </div>
        <div className="absolute top-0 bg-[rgba(0,0,0,0.25)] w-full h-full"></div>
        <div className="absolute top-[50%] max-w-[700px] left-[50%] transform translate-x-[-50%] translate-y-[-50%]">
            <div className="w-full">
            <p className="text-white text-[30px] font-light text-center mb-5">SEND <span className="font-medium">INQUIRY</span></p>
            <form onSubmit={handleSubmitSend}>
              <div className="max-[520px]:w-[320px] max-[360px]:w-[280px] max-[320px]:w-[220px] flex flex-col items-center gap-2">
                <div className="w-full">
                  <div className="mb-2">{sendMessageFormError.FullName && <p className="text-[red] font-bold">{sendMessageFormError.FullName}</p>}</div>
                  <input onChange={handleChangeMessage} value={sendMessageForm.FullName} name="FullName" className="w-full p-2 rounded-[5px] bg-[#EAEAEA] border-solid border-[1px] pl-[15px] border-[#7b7979] outline-none" placeholder="Full Name *" />
                </div>
                <div className="flex w-full gap-x-[10px] max-[420px]:flex-col gap-y-[10px]">
                  <div>
                  <div className="mb-2">{sendMessageFormError.Email && <p className="text-[red] font-bold">{sendMessageFormError.Email}</p>}</div>
                    <input onChange={handleChangeMessage} value={sendMessageForm.Email} name="Email" className="w-full p-2 rounded-[5px] bg-[#EAEAEA] border-solid border-[1px] pl-[15px] border-[#7b7979] outline-none" placeholder="Email *" />
                  </div>
                  <div>
                  <div className="mb-2">{sendMessageFormError.ContactNumber && <p className="text-[red] font-bold">{sendMessageFormError.ContactNumber}</p>}</div>
                    <input onChange={handleChangeMessage} value={sendMessageForm.ContactNumber} name="ContactNumber" className="w-full p-2 rounded-[5px] bg-[#EAEAEA] border-solid border-[1px] pl-[15px] border-[#7b7979] outline-none" placeholder="+63" />
                  </div>
                </div>
                <div className="w-full">
                <div className="mb-2">{sendMessageFormError.Subject && <p className="text-[red] font-bold">{sendMessageFormError.Subject}</p>}</div>
                  <input onChange={handleChangeMessage} value={sendMessageForm.Subject} name="Subject" className="w-full p-2 rounded-[5px] bg-[#EAEAEA] border-solid border-[1px] pl-[15px] border-[#7b7979] outline-none" placeholder="Subject" />
                </div>
                <div className="w-full">
                <div className="mb-2">{sendMessageFormError.Message && <p className="text-[red] font-bold">{sendMessageFormError.Message}</p>}</div>
                  <textarea onChange={handleChangeMessage} value={sendMessageForm.Message} name="Message" className="w-full resize-none p-2 rounded-[5px] h-[200px] bg-[#EAEAEA] border-solid border-[1px] pl-[15px] border-[#7b7979] outline-none" placeholder="Message..." />
                </div>
                <div className="flex flex-col items-center w-full">
                  <div className="flex justify-between w-full gap-x-[15px] max-[420px]:flex-col">
                    <div className="w-full">
                      <p className="text-white text-[16px] font-medium max-[560px]:text-[10px]">Look for</p>
                      <div className="relative">
                      <div className="mb-2">{sendMessageFormError.ForLook && <p className="text-[red] font-bold">{sendMessageFormError.ForLook}</p>}</div>
                        <button type="button" onClick={() => setshowLooking(!showLooking)} className="flex items-center justify-between w-full bg-[#EAEAEA] py-2 mt-3 rounded-[5px]">
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
                    <div className="w-full flex-wrap">
                      <p className="text-white text-[16px] font-medium max-[560px]:text-[10px]">Type of Property</p>
                      <div className="relative">
                        <div className="mb-2">{sendMessageFormError.ForSale && <p className="text-[red] font-bold">{sendMessageFormError.ForSale}</p>}</div>
                        <button type="button" onClick={() => setshowproperty(!showproperty)} className="flex items-center justify-between w-full bg-[#EAEAEA] py-2 mt-3 rounded-[5px]">
                          <p className="pl-3">{Property}</p> 
                          {showproperty ? 
                          <>
                            <BiCaretUp className="cursor-pointer pr-2" onClick={() => setshowproperty(!showproperty)} size={30} />
                          </>
                          : 
                          <>
                            <BiCaretDown className="cursor-pointer pr-2" onClick={() => setshowproperty(!showproperty)} size={30} />
                          </>}
                        </button>
                        <div ref={LookSale} className={`${showproperty ? "absolute" : "hidden"} top-[48px] px-[10px] rounded-[5px] shadow-3dshadow bg-[#fff] w-full py-[10px]`}>
                            <div className="group w-full">
                              <button onClick={() => setLookSale("Sales")} type="button" className="w-full text-[20px] font-bold">Sales</button>
                              <div className="h-[0px] group-hover:h-[2px] w-full bg-[#000]"></div>
                            </div>
                            <div className="group w-full">
                              <button onClick={() => setLookSale("Rent")} type="button" className="w-full text-[20px] font-bold">Rent</button>
                              <div className="h-[0px] group-hover:h-[2px] w-full bg-[#000]"></div>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full mt-4">
                  <button type="submit" className="bg-[#1F4329] py-3 text-white rounded-[5px] w-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] hover:bg-[#183520] duration-300 transistion ease-in-out">{isLoading ? "Loading..." : "SEND"}</button>
                </div>
              </div>
            </form>
            </div>
        </div>
      </div>
    )
}

export default Contact;