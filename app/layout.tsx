"use client";

import './globals.css'
import { Rubik } from 'next/font/google';
import NavBar from './components/Navbar/Page';
import React, {useEffect} from 'react'
import { ReduxProvider } from './provider/provider';
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
            <NavBar />
            {children}
          </ReduxProvider>
      </body>
    </html>
  )
}
