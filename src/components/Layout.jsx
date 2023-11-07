import React from 'react'
import { Navbar } from './Navbar'

export const Layout = ({ children }) => {
  return (
    <div className="text-white min-h-screen max-w-screen-lg container mx-auto px-4 py-8">
      <Navbar />

      <main className="">
        {children}
      </main>
    </div>
  )
}
