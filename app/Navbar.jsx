"use client"

import Link from 'next/link';
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import DesktopNavLinks from "./DesktopNavLinks"
import MobileDrawer from "./MobileDrawer"
import { useDispatch } from "react-redux";
import { logout } from "./store/slices/authSlice";
import { useRouter } from "next/navigation";
import Footer from './footer'
const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
    <nav className=" shadow-sm bg-textinfo">

      <div className="hidden sm:block container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-gray-800 flex items-center">
  <img src='/pukallogo.webp' alt="Pukal Technologies" style={{ width: "50px", height: "50px" }} />
  <h5 className="ml-2">Pukal Technologies</h5>
</Link>


          <DesktopNavLinks />
          
        </div>
      </div>

      <div className="sm:hidden flex items-center justify-between px-4 py-4">
     
        <button
          onClick={handleDrawerToggle}
          className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
          aria-label="Toggle menu"
          aria-expanded={isDrawerOpen}
        >
          <FontAwesomeIcon 
            icon={isDrawerOpen ? faTimes : faBars} 
            className="h-6 w-6"
          />
        </button>
      </div>

      <MobileDrawer isOpen={isDrawerOpen} onClose={handleDrawerToggle} />

    
    </nav>
   </>
  );
};

export default Navbar;