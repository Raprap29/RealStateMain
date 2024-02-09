"use client";

import './globals.css'
import { Rubik } from 'next/font/google';
import NavBar from './components/Navbar/Page';
import React, {useEffect} from 'react'
import { ReduxProvider } from './provider/provider';
import Head from 'next/head';
import ArrowUp from './components/ArrowUp/ArrowUp';
import SideBarAds from './components/SideAds/SideBarAds';
const rubik = Rubik({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="logo/LogoJamaRealty.ico" />
        <meta property="og:description" content="Jamarealty leverages advanced real estate technologies and strategic digital marketing to foster seamless connections between brokers, property owners, renters, and buyers. By harnessing the power of data analytics, virtual tours, and targeted advertising, "/>
        <meta property="og:image" content="logo/LogoJama.png" />
      </Head>
      <body className={rubik.className}>
          <ReduxProvider>
            <NavBar />
              {children}
            <ArrowUp />
            <SideBarAds />
          </ReduxProvider>
      </body>
    </html>
  )
}
