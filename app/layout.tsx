import './globals.css'
import { Rubik } from 'next/font/google';
import NavBar from './components/Navbar/Page';
import React from 'react'
import { ReduxProvider } from './provider/provider';
import ArrowUp from './components/ArrowUp/ArrowUp';
import SideBarAds from './components/SideAds/SideBarAds';
import { Metadata } from 'next';
const rubik = Rubik({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://jamarealty.netlify.app/'),
  description: "Unlock the Gateway to Exceptional Philippine Real Estate: Explore our Verified Listings Now!",
  openGraph: {
    title: "JAMA REALTY",
    description: "Unlock the Gateway to Exceptional Philippine Real Estate: Explore our Verified Listings Now!",
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="en">
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
