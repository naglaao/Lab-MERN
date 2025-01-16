import React from 'react'
import { NavLink } from "react-router-dom";
import {links} from "../data"

const Navbar = () => {
  return (
    <nav className="rounded-2xl w-[880px] bg-secondary-color flex flex-row justify-between items-center p-[80px] ">
    {
      links.map((link,index) => (
        <div key={index} className="flex flex-col gap-4 ">
          <img src={link.icon} className=" size-[140px]"/>
          <NavLink to={link.path} className="font-['Cairo'] font-bold text-4xl text-black">
            {link.title}
          </NavLink>
        </div>
      ))
    }
  </nav>
  )
}

export default Navbar