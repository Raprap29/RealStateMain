"use client";

import './globals.css'
import { Rubik } from 'next/font/google';
import NavBar from './components/Navbar/Page';
import React, {useEffect} from 'react'
import { ReduxProvider } from './provider/provider';
import ArrowUp from './components/ArrowUp/ArrowUp';
import SideBarAds from './components/SideAds/SideBarAds';
import DefaultSeoComponent from './components/DefaultSeo';
const rubik = Rubik({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="en">
      <body className={rubik.className}>
          <ReduxProvider>
          <meta
            property="og:description"
            content="Jamarealty leverages advanced real estate technologies and strategic digital marketing to foster seamless connections between brokers, property owners, renters, and buyers. By harnessing the power of data analytics, virtual tours, and targeted advertising."
          />
          <meta property="og:url" content="https://main--jamarealty.netlify.app/main--jamarealty.netlify.app"></meta>
          <meta property="og:image" content="logo/LogoJama.png"></meta>

            <NavBar />
              {children}
            <ArrowUp />
            <SideBarAds />
          </ReduxProvider>
      </body>
    </html>
  )
}
