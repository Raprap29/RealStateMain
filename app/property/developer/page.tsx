"use client";

import React, {useState, useEffect, useRef, FormEvent} from "react";
import QuickSearch from "@/app/components/quicksearch/quickSearch";
import { MuseoModerno } from "next/font/google";
import { useGetDeveloperQuery } from "@/app/appApi/api";
import Link from "next/link";
import Contact from "@/app/components/contact/contact";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import Footer from "@/app/components/footer/Footer";


const Museo_Moderno = MuseoModerno({weight: '700', preload: false})
const Developer: React.FC = () => {

    const {data: Developer} = useGetDeveloperQuery();
    const [currentPage, setCurrentPage] = useState(1);

    const cardItemperPage = 10;
    const totalCard = Developer && Developer?.length as any;

    const totalPages = Math.ceil(totalCard / cardItemperPage);
    const startIndex = (currentPage - 1) * cardItemperPage;
    const endIndex = startIndex + cardItemperPage;
    const itemShow: any = Developer && Developer?.slice(startIndex, endIndex);

    const handlePageClick = (page: number) => {
        setCurrentPage(page);
    };

    const handleNextPage = () =>{
        if(currentPage < totalPages){
            setCurrentPage(currentPage + 1);
        }
    }

    const handlePrevPage = () =>{
        if(currentPage > 1){
            setCurrentPage(currentPage - 1);
        }
    }

    const getPaginationNumbers = () => {
        const paginationNumbers = [];
        let startPage, endPage;
    
        if (totalPages <= 3) {

          startPage = 1;
          endPage = totalPages;
        } else {
 
          if (currentPage <= 1) {
            startPage = 1;
            endPage = 3;
          } else if (currentPage + 1 >= totalPages) {
            startPage = totalPages - 2;
            endPage = totalPages;
          } else {
            startPage = currentPage - 1;
            endPage = currentPage + 1;
          }
        }
    
        if (startPage > 1) {
          paginationNumbers.push(
            <button onClick={() => handlePageClick(1)} className='px-7 rounded-[5px] py-2 bg-[#D9D9D9] text-[#000] hover:bg-[#25D242] border boder-solid border-2 hover:border-[#000] transition duration-300 ease-in-out font-bold hover:text-[#000]'>{1}</button>);
          if (startPage > 2) {
            paginationNumbers.push(  
            <button key="left-ellipsis" className="ellipsis" disabled>
            ...
          </button>);
          }
        }
    
        for (let i = startPage; i <= endPage; i++) {
          paginationNumbers.push(
            <button onClick={() => handlePageClick(i)} className={`px-7 rounded-[5px] py-2 border boder-solid border-2 hover:bg-[#25D242] hover:border-[#000] hover:text-[#000] font-bold transition duration-300 ease-in-out ${currentPage === i ? 'bg-[#25D242] text-[#000] font-bold border boder-solid border-2 border-[#000]' : 'bg-[#D9D9D9] text-[#000]'}`}>{i}</button>
          );
        }

        if (endPage < totalPages) {
          if (endPage < totalPages - 1) {
            paginationNumbers.push(
                <button key="left-ellipsis" className="ellipsis" disabled>
                ...
              </button>
            );
          }
           // Last button
          paginationNumbers.push(
            <button onClick={() => handlePageClick(totalPages)}  className='px-7 rounded-[5px] py-2 bg-[#D9D9D9] text-[#000] hover:bg-[#25D242]] border boder-solid border-2 hover:border-[#000] transition duration-300 ease-in-out font-bold hover:text-[#000]'>{totalPages}</button>);
        }
    
        return paginationNumbers;
      };

    return(
        <React.Fragment>
            <title>Jama Realty - Developer</title>
            <div className="w-full h-full relative">
                <img src='/assets/bg.png' className='bg-cover bg-center w-full h-[450px]' alt='photodeveloper'/>
                <div className='text-[#fff] absolute top-[35%] left-[50%] transform translate-x-[-50%] translate-x-[-50%] z-[1] w-full container mx-auto max-w-[1150px]'>
                    <p className={`text-[45px] text-center ${Museo_Moderno.className}`}>TOP DEVELOPER OF THE PROPERTY</p>
                </div>
                <div className='bg-[rgba(0,0,0,0.40)] w-full h-full absolute top-0'></div>
            </div>
            <QuickSearch />
            <div className="mt-5 container mx-auto">
                <div className="flex justify-center mb-5">
                    <p className="text-[#333] font-medium text-center max-[420px]:px-[20px]">Welcome to Top Jama Realty developer, our largest array of property offering. Jama Realty has it all here for you.</p>
                </div>
                <div className="px-[10px] grid gap-5 grid-cols-3 mt-8 max-[920px]:grid-cols-3 max-[720px]:grid-cols-2 max-[620px]:grid-cols-1">
                {itemShow && itemShow?.map((item: any, index: number) => (
                    <div key={index} className="relative flex-col h-full items-center flex">
                        <div className="border border-solid border-1 border-[rgba(0,0,0,.10)]">
                            <Link href={`/property/developer/${item.nameDeveloper}`} className="">
                                <div className="group overflow-hidden w-full flex justify-center relative">
                                    <img className="w-[350px] h-[240px] transition duration-300 ease-in-out transform group-hover:scale-105" alt={`Photo-${item._id}`} src={item.logo}/>
                                </div>  
                                <div className="bg-[rgba(0,0,0,.10)] w-full h-[1px]"></div>
                            </Link>
                            <div className="mt-2 mb-1">
                                <Link href={`/property/developer/${item.nameDeveloper}`}><p className="text-[rgba(0,0,0,.75)] transition duration-300 ease-in-out hover:text-[#25D242] px-[20px] py-[15px] font-medium">{item.descriptionLogo}</p></Link>
                            </div>
                            <p className="px-[20px] text-[rgba(0,0,0,.50)] mb-4 text-[12px]">
                              {item.address}
                            </p>
                            <div className="bg-[rgba(0,0,0,.10)] w-full h-[1px]"></div>
                            <Link href={`/property/developer/${item.nameDeveloper}`} className="bg-[#D9D9D9] rounded-b-[10px] border border-solid border-t-2 border-b-2 w-full border-[#000] py-3 flex justify-center cursor-pointer hover:bg-[#25D242] hover:text-[#fff] transition ease-in-out duration-300"><h1 className="font-bold">VIEW Details</h1></Link>
                        </div>
                    </div>
                ))}
                </div>
                <div className="flex justify-center items-center p-8 gap-5 mt-5">
                   {currentPage === 1 ? "" : <button onClick={handlePrevPage} className="bg-[#D9D9D9] hover:bg-[#25D242] border boder-solid border-2 border-[#000] hover:border-[#000] transition duration-300 ease-in-out rounded-[10px] text-[#000] px-5 py-3 font-bold hover:text-[#000]"><AiOutlineArrowLeft style={{fontWeight: 'bold'}} size={20} /></button>}
                    {getPaginationNumbers().map((page, index)=>(
                        <div key={index}>{page}</div>
                    ))}
                    {currentPage === totalPages ? "" :  <button onClick={handleNextPage} className="bg-[#D9D9D9] hover:bg-[#25D242] border boder-solid border-2 border-[#000] hover:border-[#000] transition duration-300 ease-in-out rounded-[10px] text-[#000] px-5 py-3 font-bold hover:text-[#000]"><AiOutlineArrowRight fontWeight={'700'} style={{fontWeight: 'bold'}} size={20} /></button>}
                   </div>
            </div>
            <Contact mt={0} />
            <div className="mt-4">
                <Footer />
            </div>
        </React.Fragment>
    )
}

export default Developer;