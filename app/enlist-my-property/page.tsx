"use client";

import React, {useState, useEffect, useRef, ChangeEvent} from "react";
import {Fjalla_One} from "next/font/google";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaTimes } from "react-icons/fa";
import Link from "next/link";
import Footer from "../components/footer/Footer";
import { BiCaretDown, BiCaretUp } from "react-icons/bi";
import { useSendEnlistPropertyMutation } from "../appApi/api";

const Fjalla = Fjalla_One({weight: "400", subsets: ['latin']});

interface PropsFormEnlist {
  FullName: string;
  Email: string;
  ContactNumber: string;
  PropertyName: string;
  PropertyPrice: string;
  LocationProperty: string;
}

interface ErrorSend {
  FullName: string;
  Email: string;
  ContactNumber: string;
  PropertyName: string;
  WhatProperty: string;
  LocationProperty: string;
  PropertyPrice: string;
  Images: string;
}

const EnlistMyProperty: React.FC = () => {

    const fileInputRef = useRef<HTMLInputElement>(null);

    const [SendListProperty, {isLoading: LoadingEnlistProperty}] = useSendEnlistPropertyMutation();

    const [showLooking, setshowLooking] = useState<boolean>(false);
    const LookRef = useRef<HTMLDivElement | null>(null)
    const [Looking, setLoooking] = useState<string>("Choose what property");
    const [ChooseProperty, setChooseProperty] = useState<string>("SELL")
    const [ChoosePropertyToSend, setChoosePropertyToSend] = useState<string>("");
    const [selectedFile, setSelectedFile] = useState<File[]>([]);
    const [base64Images, setBase64Images] = useState<string[]>([]);
    
    const clearAllField = () => {
      setFormEnlist({
        FullName: '',
        Email: '',
        ContactNumber: '',
        PropertyName: '',
        PropertyPrice: '',
        LocationProperty: '',
      })
      setSelectedFile([]);
      setBase64Images([]);
      setChooseProperty("SELL");
      setLoooking("Choose what property");
    }

    const [FormEnlist, setFormEnlist] = useState<PropsFormEnlist>({
      FullName: '',
      Email: '',
      ContactNumber: '',
      PropertyName: '',
      PropertyPrice: '',
      LocationProperty: '',
    })
    
    const [sendMessageFormError, setsendMessageFormError] = useState<ErrorSend>({
      FullName: '',
      Email: '',
      ContactNumber: '',
      PropertyName: '',
      WhatProperty: '',
      LocationProperty: '',
      PropertyPrice: '',
      Images: '',
    })
    
    const changeProperty = (property: string) => {
      setChooseProperty(property);
    }

    const ChangeFormEnlist = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
    
      if (name === 'PropertyPrice') {

        const isValidDecimal = /^\d+(\.\d{1,2})?$/.test(value);
    
        if (isValidDecimal || value === '') {
          setFormEnlist((prevFormProduct: any) => ({ ...prevFormProduct, [name]: value }));
        }
      } else {
        setFormEnlist((prevFormProduct: any) => ({ ...prevFormProduct, [name]: value }));
      }
    };
    



    const SubmitPropertyEnlist = async () =>{

      const errors: ErrorSend  = {...sendMessageFormError};

      try{
        const  {
          FullName,
          Email,
          ContactNumber,
          PropertyName,
          PropertyPrice,
          LocationProperty
        } = FormEnlist;

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

        if(!PropertyName){
          errors.PropertyName = "* Property name is required";
        }else{
          errors.PropertyName = '';
        }
        
        if(!LocationProperty){
          errors.LocationProperty = "* Location is required";
        }
        else{
          errors.LocationProperty = '';
        }

        if(!PropertyPrice){
          errors.PropertyPrice = "* Price is required";
        }
        else{
          errors.PropertyPrice = '';
        }

        if(Looking === "Choose what property"){
          errors.WhatProperty = "* Required";
        }

        else{
          errors.WhatProperty = '';
        }

        if(base64Images?.length < 4){
          errors.Images = "* Only above 4 images can upload.";
        }

        else{
          errors.Images = '';
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
          await SendListProperty({
            FullName: FullName,
            Email: Email,
            ContactNumber: ContactNumber,
            PropertyName: PropertyName,
            WhatProperty: Looking,
            LocationProperty: LocationProperty,
            PropertyPrice: Number(PropertyPrice),
            Type: ChoosePropertyToSend,
            Images: base64Images,
          }).unwrap();
          clearAllField();
        }


      }catch(err){
        return console.error(err);
      }
    }

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


      const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
          const selectedFilesArray = Array.from(files);
          setSelectedFile(selectedFilesArray);
        }
      };
      
      const removeImage = (index: number): void => {
        setBase64Images((prevBase64Images: string[]) => {
          const updatedImages: string[] = [...prevBase64Images];
          updatedImages.splice(index, 1);
          return updatedImages;
        });
      };
      
      function resizeImage(file: File): Promise<string> {
        return new Promise((resolve) => {
          const img = new Image();
          const reader = new FileReader();
      
          reader.onload = () => {
            img.src = reader.result as string;
            img.onload = () => {
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
      
              canvas.width = 1200;
              canvas.height = 980;
      
              ctx?.drawImage(img, 0, 0, 1200, 980);
              const resizedBase64 = canvas.toDataURL('image/jpeg');
              resolve(resizedBase64);
            };
          };
      
          reader.readAsDataURL(file);
        });
      }
    

      useEffect(() => {
        const createBase64Images = async () => {
          const promises = selectedFile.map(async (file) => {
            try {
              const base64 = await resizeImage(file);
              return base64;
            } catch (error) {
              console.error('Error resizing image:', error);
              return '';
            }
          });
      
          try {
            const base64Urls = await Promise.all(promises);
            const filteredUrls = base64Urls.filter(url => url !== '');
            setBase64Images((prevBase64Images) => [...prevBase64Images, ...filteredUrls]);
          } catch (error) {
            console.error('Error reading files:', error);
          }
        };
      
        if (selectedFile.length > 0) {
          createBase64Images();
        }
      }, [selectedFile]);
    
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

      useEffect(() => {
        if(ChooseProperty === "SELL"){
          setChoosePropertyToSend("I want to sell my property");
        }else{
          setChoosePropertyToSend("I want to rent my property");
        }
      }, [ChooseProperty])
      
      useEffect(() => {
        if(LoadingEnlistProperty)
        {
          document.body.classList.add("overflow-y-hidden")
        }else{
          document.body.classList.remove("overflow-y-hidden")
        }
      }, [LoadingEnlistProperty])

    return(
        <React.Fragment>
            <title>Jama Realty | Enlist Property</title>
            {LoadingEnlistProperty && (
              <div className={`${LoadingEnlistProperty ? "fixed" : "hidden"} inset-0 bg-[rgba(0,0,0,.30)] z-[99] overflow-y-auto`}>
                <img alt="Loading" src="/assets/loading/Hourglass.gif" className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] w-[60px] h-[60px]"  />
              </div>
            )}
            <div className="w-full h-full relative">
                <img src='/assets/enlistProperty.jpg' className='bg-cover bg-center w-full h-[450px]' alt='photoabout'/>
                <div className='text-[#fff] absolute top-[35%] left-[50%] transform translate-x-[-50%] translate-x-[-50%] z-[1] w-full container mx-auto max-w-[1150px]'>
                    <p className={`text-[80px] text-center max-[620px]:text-[40px] ${Fjalla.className}`}>Enlist Your Property</p>
                </div>
                <div className='bg-[rgba(0,0,0,0.40)] w-full h-full absolute top-0'></div>
            </div>
            <div className="container mx-auto flex justify-center mt-5 mb-5">
                <p className="text-center font-thin w-[900px]">If you own property is in the <span className="font-bold">Philippines</span> and are looking to sell or rent? We can help you find ready buyers who are eager to invest. We understand that properties are meant to be profitable, and we are committed to helping you achieve that goal quickly.</p>
            </div>
            <div className="flex justify-center flex-col container mx-auto max-[720px]:w-full max-[720px]:px-[10px] w-[630px]">
                <div className="mb-2">{sendMessageFormError.FullName && <p className="text-[red] font-bold">{sendMessageFormError.FullName}</p>}</div>
                <div className="flex justify-center w-full">
                    <input placeholder="Full Name *" value={FormEnlist.FullName} onChange={ChangeFormEnlist} name="FullName" className="px-[10px] py-[10px] rounded-[4px] w-full outline-none border border-solid border-1 border-[#ccc]" />
                </div>
                <div className="flex max-[720px]:flex-col justify-center w-full gap-x-[20px] mb-5 mt-3 w-[500px]">
                    <div className="w-full">
                      <div className="mb-2">{sendMessageFormError.Email && <p className="text-[red] font-bold">{sendMessageFormError.Email}</p>}</div>
                      <input placeholder="Email *" value={FormEnlist.Email} onChange={ChangeFormEnlist} name="Email" className="px-[10px] py-[10px] rounded-[4px] w-full outline-none border border-solid border-1 border-[#ccc]" />
                    </div>
                    <div className="w-full">
                      <div className="mb-2">{sendMessageFormError.ContactNumber && <p className="text-[red] font-bold">{sendMessageFormError.ContactNumber}</p>}</div>
                      <input placeholder="Contact Number *" value={FormEnlist.ContactNumber} onChange={ChangeFormEnlist} name="ContactNumber" className="px-[10px] py-[10px] rounded-[4px] w-full outline-none border border-solid border-1 border-[#ccc]" />
                    </div>
                </div>
      
                <div className="flex flex-col w-full">
                    <div className="mb-2">{sendMessageFormError.PropertyName && <p className="text-[red] font-bold">{sendMessageFormError.PropertyName}</p>}</div>
                    <div className="flex justify-center w-full">
                      <input placeholder="Property Name *" value={FormEnlist.PropertyName} onChange={ChangeFormEnlist} name="PropertyName" className="px-[10px] py-[10px] rounded-[4px] w-full outline-none border border-solid border-1 border-[#ccc]" />
                    </div>
                  <div className="flex flex-col items-center justify-between w-full gap-x-[15px] max-[420px]:flex-col">
                    <div className="mb-2 mt-4">{sendMessageFormError.WhatProperty && <p className="text-[red] font-bold">{sendMessageFormError.WhatProperty}</p>}</div>
                    <div className="w-full">
                      <div className="relative">
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
                        <div ref={LookRef} className={`overflow-y-scroll ${showLooking ? "absolute" : "hidden"} top-[48px] px-[10px] rounded-[5px] border border-solid border-1 border-[#ccc] bg-[#fff] w-full py-[10px] h-[120px]`}>
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
                  <div className="flex flex-col justify-center w-full mt-2">
                     <div className="mb-2">{sendMessageFormError.LocationProperty && <p className="text-[red] font-bold">{sendMessageFormError.LocationProperty}</p>}</div>         
                    <input placeholder="Property Location *" value={FormEnlist.LocationProperty} onChange={ChangeFormEnlist} name="LocationProperty" className="px-[10px] py-[10px] rounded-[4px] w-full outline-none border border-solid border-1 border-[#ccc]" />
                  </div>
                  <div className="flex flex-col justify-center w-full mt-2">
                     <div className="mb-2">{sendMessageFormError.PropertyPrice && <p className="text-[red] font-bold">{sendMessageFormError.PropertyPrice}</p>}</div>         
                    <input placeholder="Asking Price *" value={FormEnlist.PropertyPrice} onChange={ChangeFormEnlist} name="PropertyPrice" className="px-[10px] py-[10px] rounded-[4px] w-full outline-none border border-solid border-1 border-[#ccc]" />
                  </div>
                </div>
                <div className="flex flex-col items-center">
                <p className="mt-5 text-[red]">Choose one you want to do your property *</p>
                </div>
                <div className="flex justify-center max-[720px]:flex-col gap-y-[20px] gap-x-[20px] mt-4">
                    <button type="button" onClick={() => changeProperty("SELL")} className={`${ChooseProperty === "SELL" ? "bg-[green] pointer-events-none text-white" : ""} w-full hover:bg-[green] transition duration-300 ease-in-out hover:text-white bg-[#ccc] py-[10px] rounded-[5px] shadow-3dshadow font-bold`}>I WANT TO SELL MY PROPERTY</button>
                    <button type="button" onClick={() => changeProperty("RENT")} className={`${ChooseProperty === "RENT" ? "bg-[green] pointer-events-none text-white" : ""} w-full hover:bg-[green] transition duration-300 ease-in-out hover:text-white bg-[#ccc] py-[10px] rounded-[5px] shadow-3dshadow font-bold`}>I WANT TO RENT MY PROPERTY</button>
                </div>
                <p className="font-medium mb-3 text-center mt-3 text-[15px]">Note: Before uploading your files, make sure that you are using the latest version of your browser, your internet connection is optimized, and your images are optimized. Limit upload to 4 images.</p>
                <div className="mb-2">{sendMessageFormError.Images && <p className="text-center text-[red] font-bold">{sendMessageFormError.Images}</p>}</div>
                <div className="w-full flex-wrap gap-y-[10px] overflow-y-scroll justify-center gap-x-[15px] flex items-center p-3 h-[140px] border border-solid border-1 border-[#ccc]">
                  {base64Images?.length <= 0 ? 
                  <>
                    <div className="flex justify-center w-full items-center">
                      <p className="text-[22px] font-bold">NO IMAGES YET.</p>
                    </div>
                  </> 
                  : 
                  <>
                    {base64Images.map((item,index) =>(
                      <div key={index} className="relative">
                        <img src={item} alt={`Image ${index}`} className="rounded-[5px] border border-solid border-1 border-[#ccc] w-[120px] h-[120px]" />
                        <button  type="button" className="bg-[#D9D9D9] rounded-[1000px] shadow-3dshadow  p-2 absolute top-0 right-0" onClick={() => removeImage(index)} ><FaTimes size={20} color="#000" /></button>
                      </div>
                    ))}
                  </>
                  }
                </div>
                <div className="w-full mt-4">
                  <label htmlFor="fileInput" className="w-full block mb-3 text-center bg-[blue] text-white cursor-pointer rounded-[5px] shadow-3dshadow py-[8px] text-[18px] transition duration-300 ease-in-out hover:bg-[rgba(0,0,255,0.75)]">Upload File</label>
                  <input
                    className="h-full px-[10px]"
                    type="file"
                    id="fileInput"
                    ref={fileInputRef}
                    accept=".jpg, .png"
                    onChange={handleFileInputChange}
                    style={{ display: 'none' }}
                    multiple
                  />
                </div>
                <div className="bg-[#000] w-full h-[2px] mt-2 mb-4"></div>
                <div className="w-full">
                  <button onClick={SubmitPropertyEnlist} type="button" className="shadow-3dshadow py-[8px] w-full text-white font-bold rounded-[5px] bg-[green] hover:bg-[rgba(0,128,0,.75)] transition duration-300 ease-in-out">SUBMIT</button>
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
                        {paths.map((path: any, index: number) => (
                            <div className="flex items-center gap-x-[20px]" key={index}>
                                <img key={path.name} src={`/icon/${path.name}.png`} width={30} height={5} alt="icon" />
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