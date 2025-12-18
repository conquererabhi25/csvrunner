import React from 'react'
import { PiPersonSimpleRunFill } from "react-icons/pi";

const Header = () => {
  return (
     <div className="flex gap-2 items-center p-2 w-full h-[10vh] shadow-md bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%)">
        <PiPersonSimpleRunFill size={30} />
        <h1 className="font-semibold text-white text-lg">
          <span>RUNNER</span> DASHBOARD
        </h1>
      </div>
  )
}

export default Header
