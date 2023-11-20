"use client";

import React, {useState, useEffect, useRef, ChangeEvent, FormEvent} from "react";
import QuickSearch from "../components/quicksearch/quickSearch";
import {MdKeyboardArrowLeft, MdKeyboardArrowRight, MdLocationOn} from "react-icons/md";
import { useSendMessageCustomerToEmailMutation } from "../appApi/api";
import { usePathname, useSearchParams  } from "next/navigation";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import SwiperCore, {
    EffectFade,
    EffectCoverflow,
    EffectCube,
  } from "swiper";
  import { Swiper, SwiperSlide} from "swiper/react";
  import "swiper/css";
  import "swiper/css/pagination";
  import { Pagination, Navigation, Autoplay } from "swiper";
import Link from "next/link";
import { AiOutlineShareAlt } from "react-icons/ai";
import BankLoan from "../components/loan/Loan";
import Footer from "../components/footer/Footer";
SwiperCore.use([
    EffectCoverflow,
    EffectCube,
    EffectFade,
    Navigation,
    Pagination,
]);

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

    const swiperRef = useRef<HTMLButtonElement>();

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

    const ref = useRef<HTMLDivElement>(null);

    const handleClick = () => {
    ref.current?.scrollIntoView({behavior: 'smooth'});
    };

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

    function formatPrice(price: number): string {
        let priceStr = price.toFixed(2);
        
        const [integerPart, decimalPart] = priceStr.split('.');
        
        const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        const formattedDecimalPart = decimalPart ? `.${decimalPart}` : ".00";
    
        return formattedIntegerPart + formattedDecimalPart;

    }

    function handleChangeWord(sentence: string): string{

        const words = sentence.split(" ");

        if (words.length < 13) {
            return sentence;
        }

        const truncatedWords = words.slice(0, 13);
        const truncatedSentence = truncatedWords.join(' ');
      
        return `${truncatedSentence}...`;
    }

    return(
        <React.Fragment>
            <title>Jama Property | DR88-000132- Uptown Ritz | Conner unit Two Bedroom 2BR Condominium for Rent in 36th St. Cor. 9th Ave. Bonifacio Global City, Taguig</title>
            <QuickSearch />
            <div className={`top-0 z-[10] bg-[rgba(0,0,0,0.25)] w-full ${LoadingInquire ? "fixed" : "hidden"} transition duration-300 ease-in-out h-full z-[30]`}>
                <img alt="Loading" src="/assets/Loading/Hourglass.gif" className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] z-[15] w-[60px] h-[60px]"  />
            </div>
            <div className="relative max-[920px]:justify-center grid gap-x-[70px] max-[920px]:grid-cols-1 grid-cols-[50vw_minmax(40vw,_1fr)] container mx-auto max-w-[1130px]">
                <div className="max-[920px]:px-[100px]">
                    <div><p className="font-medium text-[18px] px-[20px]">DR88-000132- Uptown Ritz | Conner unit Two Bedroom 2BR Condominium for Rent in 36th St. Cor. 9th Ave. Bonifacio Global City, Taguig</p></div>
                    <div className="relative w-full">
                        <img alt="Pic_1" className="w-[730px] max-[920px]:w-full shadow-3dshadow rounded-[5px] h-[350px] mb-[20px] mt-[10px]" src={DataProperty[currentNumber].img} />    
                        <div className="absolute right-[25px] top-[44%]">
                            <button type="button" className="bg-[green] transition duration-300 ease-in-out hover:bg-[rgba(0,128,0,.75)] shadow-3dshadow rounded-[600px]" onClick={handleNext}><MdKeyboardArrowRight size={50} color="#fff" /></button>
                        </div>
                        <div className="absolute top-[44%] left-[25px] top-0">
                            <button type="button" className="bg-[green] transition duration-300 ease-in-out hover:bg-[rgba(0,128,0,.75)] shadow-3dshadow rounded-[600px]" onClick={handlePrev}><MdKeyboardArrowLeft size={50} color="#fff" /></button>
                        </div>
                    </div>
                    <div className="flex mt-2 gap-x-[10px] max-[920px]:hidden">
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
                    <div className="px-[10px]">
                        <div className="mt-3">
                            <p>Code: PR</p>
                        </div>
                        <div className="mt-3">
                            <p>Property Type: House</p>
                        </div>
                        <div className="mt-3">
                            <p>Category: For Sale</p>
                        </div>
                        <div className="mt-3">
                            <p>City: San Marcos, Agoo La Union</p>
                        </div>
                        <div className="mt-3">
                            <p>Bedrooms: Two Bedroom (2BR)</p>
                        </div>
                        <div className="mt-3">
                            <p>Size: 100sqm</p>
                        </div>
                        <div className="mt-3">
                            <p>Floor: 100sqm</p>
                        </div>
                        <div className="mt-3">
                            <p>Price: Php 22,000,000</p>
                        </div>
                    </div>
                    <div className="h-[2px] bg-[#000] w-full mb-3 mt-3"></div>
                </div>
                <div className="p-5 z-[3] sticky max-[920px]:hidden max-[920px]:flex top-[90px] shadow-[0px_0px_20px_0px_rgba(0,0,0,.25)] bg-[#fff] h-[565px] w-[380px] border border-solid border-1 border-[green]">
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
                <div ref={ref} className="px-[20px] w-full">
                    <div className="p-5 z-[3] max-[520px]:w-full hidden max-[920px]:block max-[920px]:px-[20px] w-full top-[90px] shadow-[0px_0px_20px_0px_rgba(0,0,0,.25)] bg-[#fff] h-[565px] border border-solid border-1 border-[green]">
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
                    <div className="bg-[#000] w-full h-[2px] mt-8"></div>
                </div>
            </div>
            <div className="mx-auto container w-[1130px] max-[920px]:w-full">
                <div>
                    <p className="text-[#3B5189] drop-shadow-md font-bold text-[32px] text-center mt-2">Similar Properties</p>
                </div>
                <div>
                <div className="mx-auto container max-w-[1100px]">
                    <div className="mt-2 flex justify-center items-center ">
                        <button type="button" className="max-[420px]:hidden max-[420px]:ml-[60px] max-[390px]:mr-[-60px] max-[420px]:w-[100px]" onClick={() => swiperRef.current.slidePrev()}>
                        <BiChevronLeft size={65} />
                        </button>
                        <Swiper
                            className="mySwiper"
                            slidesPerView={1}
                            spaceBetween={30}
                            slidesPerGroup={1}
                            scrollbar={{ draggable: true }}
                            loop={true}
                            grabCursor={true}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            speed={1700}
                            onSwiper={(swiper: any) => {
                                swiperRef.current = swiper;
                            }}
                        >
                            <div className="container mx-auto">
                                <div className="flex items-center justify-center">
                                    {DataProperty?.map((item: any, index: number) => (
                                        <>
                                            <SwiperSlide key={index} className="pt-5 pb-5">
                                            <div className={`group bg-[#fff] border border-solid border-2 border-[#000000] w-[400px] h-[432.5px] rounded-[10px] transition-transform scale-95 hover:scale-100 transition ease-in-out duration-500 hover:shadow-[0px_10px_20px_2px_rgba(0,0,0,0.25)] shadow-[0px_0px_3px_2px_rgba(0,0,0,.25)]`}>
                                                <Link href="/">
                                                    <div className="flex flex-col items-center relative px-2">
                                                        <img src={item.img} alt="photo" className="h-[240px] w-full mt-2 rounded-[10px]" />
                                                        <div className="absolute top-[25px] bg-[#FF8A00] shadow-3dshadow px-4 py-2 rounded-[10px] left-[30px]"><p className="text-[#fff] font-bold">FOR SALE</p></div>
                                                        <div className="absolute bottom-4 rounded-[5px] w-full px-[20px]">
                                                            <div className="flex items-center pr-[5px] bg-[#D9D9D9] py-[5px] rounded-[5px]">
                                                                <MdLocationOn className="mr-[5px]" color="#25D242" size={35} />
                                                                <p className="text-[14px] text-black font-bold max-[360px]:text-[9px]">Aogoo La union san marocs</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                                <div className="p-3"><p className="font-bold">{handleChangeWord("Dei oworkwoerpwe urwejr oiwejr oiwero werj weoir")}</p></div>
                                                <div className="pl-3 pr-3 pt-2 flex justify-between items-center">
                                                    <div className="font-medium"><p>Price: ₱<span>{formatPrice(200000)}</span></p></div>
                                                    <div className="cursor-pointer"><AiOutlineShareAlt color="#25D242" size={25}/></div>
                                                </div>
                                                <Link href="/" className="bg-[#D9D9D9] rounded-b-[10px] border border-solid border-t-2 border-b-2 w-full border-[#000] py-3 absolute bottom-0 flex justify-center cursor-pointer group-hover:bg-[#25D242] group-hover:text-[#fff] transition ease-in-out duration-300"><h1 className="font-bold">VIEW MORE</h1></Link>
                                            </div>
                                            </SwiperSlide>
                                        </>
                                    ))}
                                </div>
                            </div>      
                        </Swiper>
                        <button type="button" className="max-[420px]:hidden max-[460px]:mr-[-40px] max-[390px]:mr-[-60px]" onClick={() => swiperRef.current.slideNext()}>
                        <BiChevronRight size={65} />
                        </button>
                    </div>
                    <div className="flex justify-center items-center w-full mb-[20px]">
                        <button type="button" className="bg-[#1F4329] text-white h-[50px] w-[300px] text-white font-bold rounded-[5px] shadow-3dshadow transition duration-300 ease-in-out hover:bg-[rgba(31,67,41,.75)]">VIEW ALL</button>
                    </div>
                </div>
                </div>
            </div>
            <BankLoan />
            <Footer />
            <div className="fixed bottom-0 w-full h-[60px] z-[99]">
                <button type="button" onClick={handleClick} className="bg-[rgba(0,128,0)] w-full h-[60px] z-[99] shadow-3dshadow flex justify-center font-bold items-center"><p className="text-white text-center">INQUIRE NOW</p></button>
            </div>
        </React.Fragment>
    )
}

export default JamaRealtyView;