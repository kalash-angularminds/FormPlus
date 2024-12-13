import { FilePlus2, Plus } from 'lucide-react'
import React from 'react'

function Navbar() {
  return (
      <nav className=" p-4 text-white shadow-md md:p-6">
          <div className="container mx-auto flex flex-col items-center justify-between md:flex-row">
              <span className="flex mb-4 text-xl font-bold md:mb-0">
                  FormPlus <span><FilePlus2 size={30} /></span>
              </span>
              
          </div>
      </nav>
  )
}

export default Navbar