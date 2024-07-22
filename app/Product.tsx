import Link from "next/link";
import React from "react";
import { MdLocationOn } from "react-icons/md";
import Image from "next/image";
export default function Product(props: any){

    function handleChangeWord(sentence: string): string{

        const words = sentence?.split(" ");

        if (words?.length < 5) {
            return sentence;
        }

        const truncatedWords = words?.slice(0, 13);
        const truncatedSentence = truncatedWords?.join(' ');
      
        return `${truncatedSentence}...`;
    }
    
    return(
        <>
            <div key={props.id} className="relative rounded-[5px] bg-[#fff] flex flex-col items-center shadow-[0px_0px_3px_2px_rgba(74,107,222,.25)] max-[360px]:w-[220px] w-[260px] h-[440px]">
                <div className="p-2 relative">
                    <Image src={props.isImage} alt="image" width={240} height={180} className="rounded-[5px]" />
                    <div className="absolute top-[17px] left-[22px] flex gap-x-[30px]">
                        <div className={`${props.TypeProp === "Rent" ? "bg-[blue]" : "bg-[#FF8A00]"} px-3 py-2 rounded-[5px] font-medium text-white shadow-3dshadow max-[360px]:text-[12px]`}>For {props.TypeProp}</div>
                        <div className="bg-[#26E926] px-3 py-2 rounded-[5px] font-medium text-white shadow-3dshadow max-[360px]:text-[12px]">New</div>
                    </div>
                    <div className="absolute bottom-[20px] left-[20px] right-[20px] bg-[#D9D9D9] rounded-[5px]">
                        <div className="flex items-center py-[8px] pr-[5px]">
                            <MdLocationOn className="mr-[5px]" color="#25D242" size={30} />
                            <p className="text-[11px] text-black font-medium max-[360px]:text-[9px]">{handleChangeWord(props.location)}</p>
                        </div>
                    </div>
                </div>
                    <div className="mt-1">
                        <p className="max-[360px]:ml-10 max-[360px]:mr-10 mr-[50px] ml-[50px] mt-[4px] text-[14px] font-medium max-[360px]:text-[10px]">{handleChangeWord(props.content)}</p>
                        <div className="flex text-[15px] justify-between pr-[10px]  pl-[10px] mt-2 ml-10 mr-10">
                        <div className="text-[12px] max-[400px]:text-[10px]">
                            <p className="font-light pt-1 pb-1">Property Type: <span className="font-medium">{props.type}</span></p>
                            <div className={`bg-[#000] h-[2px] w-[118px] max-[390px]:w-[95px]`} style={{background: "repeating-linear-gradient(90deg,rgba(0,0,0,0.50) 0 4px ,#0000 0 8px) center", backgroundSize: "100% 2px"}}></div>
                            <p className={`font-light pt-1 pb-1 ${props.type === "Land" ? "hidden" : props.type === "Condo/Apartment" ? "block" : props.type === "Office" ? "hidden" : "block" }`}>Bedroods: <span className="font-medium">3</span></p>
                            <div className={`bg-[#000] h-[2px] w-[118px] max-[390px]:w-[95px]`} style={{background: "repeating-linear-gradient(90deg,rgba(0,0,0,0.50) 0 4px ,#0000 0 8px) center", backgroundSize: "100% 2px"}}></div>
                            <p className={`font-light pt-1 ${props.type === "Land" || props.type === "Condo/Apartment" ? "hidden" : "block" }`}>Floor: <span className="font-medium">100 sqm.</span></p>
                            {props.type === "Condo/Apartment" ? <p className="font-light text-[12px] pt-1">Unit: <span className="font-medium">{props.unit}</span></p> : <></>}
                        </div>
                        <div className={`bg-[#000] w-[2px] ${props.type === "Land" ? "h-[30px]" : props.type === "Office" ? "h-[55px]" : "h-[80px]" }`} style={{background: "repeating-linear-gradient(180deg,rgba(0,0,0,0.50) 0 4px ,#0000 0 8px) center", backgroundSize: "100% 2px"}}></div>
                        <div className="text-[12px] max-[400px]:text-[10px]">
                            <p className={`font-light p-1 ${props.type === "Land" ? "hidden" : props.type === "Condo/Apartment" ? "block" : props.type === "Office" ? "hidden" : "block" }`}>Bathroom: <span className="font-medium">3</span></p>
                            <div className={`bg-[#000] h-[2px] w-[118px] max-[390px]:w-[95px] ${props.type === "Land" ? "hidden" : props.type === "Condo/Apartment" ? "block" : props.type === "Office" ? "hidden" : "block" }`} style={{background: "repeating-linear-gradient(90deg,rgba(0,0,0,0.50) 0 4px ,#0000 0 8px) center", backgroundSize: "100% 2px"}}></div>
                            {props.type === "Condo/Apartment" || props.type === "Apartment" ? 
                                <>
                                    <p className={`font-light p-1 `}>Floor: <span className="font-medium">{props.floor} sqm</span></p>
                                </>:
                                <>
                                    <p className={`font-light p-1 `}>Lot: <span className="font-medium">{props.lot} sqm</span></p>
                                </>
                            }
                            <div className={`bg-[#000] h-[2px] w-[118px] max-[390px]:w-[95px]`} style={{background: "repeating-linear-gradient(90deg,rgba(0,0,0,0.50) 0 4px ,#0000 0 8px) center", backgroundSize: "100% 2px"}}></div>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-[17px] flex">
                    <div className="flex justify-between items-center w-full pl-2 pr-2  max-[360px]:pl-[30px] max-[360px]:pr-[30px]">
                        <Link href={`/jama_property/${props._id}`} className="rounded-[5px] text-white bg-[#18872B] px-5 py-[8px]">View Details</Link>
                    </div>
                </div>
            </div>
        </>
    )
}