"use client";

import React, {useState, useEffect, useRef, ChangeEvent, RefObject} from "react";
import Image from "next/image";
import { MdLocationOn } from "react-icons/md";
import { BiCaretDown } from "react-icons/bi";
import Footer from "../components/footer/Footer";
import QuickSearch from "../components/quicksearch/quickSearch";

interface LoanProp {
    loanyears: string;
    amountloan: string;
}

const BankLoan: React.FC = () => {
    const [showLoc, setshowLoc] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>("");

    const [FormLoan, setFormLoan] = useState<LoanProp>({
        loanyears: '',
        amountloan: '',
    })

    const [Downpayment, setDownpayment] = useState<number>(0.00);
    const [MonthlyPayment, setMonthlyPayment] = useState<number>(0.00);

    const [ErrorLoanYear, setErrorLoanYear] = useState<string>("");
    const [ErrorLoan, setErrorLoan] = useState<string>("");

    const handleChangeLoan = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === 'loanyears') {
            const intValue = parseInt(value, 10);
            if (!isNaN(intValue) && intValue >= 1 && intValue <= 20) {
                setFormLoan({ ...FormLoan, loanyears: intValue.toString() });
            } else if (value === '') {
                setFormLoan({ ...FormLoan, loanyears: '0' });
            }
        } else if (name === 'amountloan') {
            if (/^\d+(\.\d*)?$/.test(value)) {
                setFormLoan({ ...FormLoan, amountloan: value });
            }else if (value === ''){
                setFormLoan({ ...FormLoan, amountloan: '' });
            }
        }
    };

    function formatPrice(price: number) {
        let priceStr = price.toFixed(2);
      
          const [integerPart, decimalPart] = priceStr.split('.');
          
          const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          const formattedDecimalPart = decimalPart ? `.${decimalPart}` : ".00";
      
          return formattedIntegerPart + formattedDecimalPart;
    }

    const handleSubmitCalculate = () => {
        const {loanyears, amountloan} = FormLoan;
        
        if(amountloan === ""){
            setErrorLoan("Please enter valid loan amount.")
        }else{
            setErrorLoan("");
        }

        if(loanyears === "" || loanyears === "0"){
            return setErrorLoanYear("Please enter valid loan years.");
        }else{
            setErrorLoanYear("");
        }
  
        const amountLoan = Number(amountloan);
        const annualInterestRate = 7; // 7% annual interest rate
        const downPaymentPercentage = 0.20; // 20% down payment
        const loanYears = Number(loanyears);

        const downPayment = amountLoan * downPaymentPercentage

        const n = loanYears * 12; // Number of monthly payments
        const r = annualInterestRate / 12 / 100; // Monthly interest rate (annual rate divided by 12 and converted to decimal)
    
        const monthlyPayment = (amountLoan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

        setDownpayment(downPayment);
        setMonthlyPayment(monthlyPayment);

    }

    const handleChange = (e: any): void => {
      setInputValue(e.target.value);
   
      if (e.target.value === "") {
        setshowLoc(false);
      } else {
        setshowLoc(true);
      }
    };
    const scrollRefLoan: RefObject<HTMLDivElement> = useRef(null);
    
    const handleClick = () => {
        scrollRefLoan.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return(
        <React.Fragment>
            <title>Jama Realty - Loan</title>
            <div className="w-full h-full relative">
                <img src='/assets/a769abf246aa73992caf22dde4af3bd4.jpg' className='bg-cover bg-center w-full h-[450px]' alt='photoabout'/>
                <div className='absolute absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] z-[1]'>
                    <img src="/logo/png-clipart-bdo-logo-and-slogan-bank.png" className="w-[580px]" />
                    <div className="group flex justify-center p-2 transition ease-in-out">
                        <button type="button" onClick={handleClick} className="bg-[#FFB20C] p-3 shadow-[0px_5px_5px_0px_rgba(0,73,144,0)] group-hover:shadow-[0px_0px_5px_5px_rgba(0,73,144,0.80)] transition ease-in-out duration-300"><p className={`text-[#fff] text-[16px] max-[520px]:text-[12px]`}>CLICK TO CALCULATE YOUR HOME LOAN</p></button>
                    </div>
                </div>
                <div className='bg-[rgba(0,0,0,0.25)] w-full h-full absolute top-0'></div>
            </div>
            <QuickSearch />
            <div className="bg-[rgba(0,0,0,.50)] w-full h-[1px]"></div>
            <div className="flex justify-center mt-4 mb-5">
                <p className="text-center max-w-[400px] font-medium max-[720px]:px-[20px]">Start living in your dream home with interest rates as low as 7.00%, and enjoy flexible payment options spanning up to 20 years.</p>
            </div>
            <div ref={scrollRefLoan} className="mb-[40px] mt-[15px] container px-[20px] mx-auto max-w-[890px]">
                <div className="border rounded-[5px] grid grid-cols-2 gap-y-[30px] max-[620px]:grid-cols-1 border-solid border-1 border-[rgba(0,0,0,.50)] px-[20px] py-[15px]">
                    <div>
                       <div>
                            <p className="font-bold text-[16px]">Loan Amount</p>
                            <input type="text" onChange={handleChangeLoan} value={FormLoan.amountloan} name="amountloan" className="mt-[20px] px-[10px] rounded-[5px] w-full h-[50px] mt-[5px] outline-none border-1 border-solid border border-[rgba(0,0,0,.50)]" placeholder="Place amount loan..." />
                            <p className="text-[red] text-[16px] font-bold mt-3">{ErrorLoan}</p>
                       </div>
                       <div className="mt-2">
                            <p className="font-bold text-[16px]">Loan term in years</p>
                            <input type="text" onChange={handleChangeLoan} value={FormLoan.loanyears} name="loanyears" className="mt-[20px] px-[10px] rounded-[5px] w-full h-[50px] mt-[5px] outline-none border-1 border-solid border border-[rgba(0,0,0,.50)]" placeholder="Place year of loan..." />
                            <p className="text-[red] text-[16px] font-bold mt-3">{ErrorLoanYear}</p>
                       </div>
                       <div className="w-full mt-3">
                            <button type="button" onClick={handleSubmitCalculate} className="py-[7px] text-white font-bold rounded-[5px] shadow-3dshadow w-full bg-[blue] hover:bg-[rgba(0,0,255,.75)] transition duration-300 ease-in-out">Calculate</button>
                       </div>
                    </div>
                    <div className="w-full">
                        <div className="flex items-center flex-col">
                            <p className="text-center font-bold text-[25px]">Your Computed Results</p>
                        </div>    
                        <div className="flex w-full justify-center">
                            <div className="bg-[rgba(0,0,0,.75)] w-[80%] h-[1px] mt-3"></div>
                        </div>
                        <div className="ml-[30px] mt-6">
                            <p className="font-bold">Down payment required</p>
                            <p className="mt-1">Php {formatPrice(Downpayment)}</p>
                        </div>
                        <div className="ml-[30px] mt-5">
                            <p className="font-bold">Monthly payment</p>
                            <p className="mt-1">Php {formatPrice(MonthlyPayment)}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-[#000] w-full h-[1px] mb-5"></div>
            <Footer />
        </React.Fragment>
    )
}

export default BankLoan;