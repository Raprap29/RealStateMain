"use client";

import React, {useEffect, useState} from "react";
import { FaArrowUp } from "react-icons/fa";

export default function ArrowUp(){

    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
      const scrollTop = window.scrollY;
  
      setIsVisible(scrollTop > 200);
    };

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      };

      useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);

    return(
        <React.Fragment>
            <button onClick={scrollToTop} className="bg-[green] p-3 transition duration-300 ease-in-out hover:bg-[rgba(0,128,0,.75)] shadow-3dshadow text-white rounded-[5px] z-[99]" style={{ position: 'fixed', bottom: '20px', right: '20px', opacity: isVisible ? 1 : 0, transition: 'opacity 0.3s' }}>
                <FaArrowUp size={20} />
            </button>
        </React.Fragment>        
    )
}