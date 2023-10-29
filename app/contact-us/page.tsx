"use client";

import React, {useState, useEffect, useRef} from "react";
import ContentSLide from "../contentslide";
import Contact from "../components/contact/contact";
import Footer from "../components/footer/Footer";
import BankLoan from "../components/loan/Loan";

const ContactUs: React.FC = () => {
    return(
        <React.Fragment>
            <title>Jama Realty - Contact Us</title>
            <ContentSLide />
            <Contact mt={0} />
            <div className="container mx-auto mt-5 mb-5 flex justify-center w-full">
                <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30885.476540425894!2d120.98098403127582!3d14.61703637461936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b610d6fe5db1%3A0xafb0f8ebbe1b2d81!2sD.%20Tuazon!5e0!3m2!1sen!2sid!4v1698597240347!5m2!1sen!2sid"
                width="1200"
                height="450"
                frameBorder="0"
                style={{ border: 0 }}
                aria-hidden="false"
                tabIndex="0"
                />
            </div>
            <BankLoan />
            <Footer />
        </React.Fragment>
    )
}

export default ContactUs;