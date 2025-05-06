// import Link from 'next/link';

// export default function DesktopNavLinks() {
//   return (
//     <ul className="flex flex-row space-x-6">
//       <li className="text-xl hover:text-blue-300 hover:font-semibold">
//         <Link href="/">Home</Link>
//       </li>
//       <li className="text-xl hover:text-blue-900 hover:font-semibold">
//         <Link href="/about">About</Link>
//       </li>
//       <li className="text-xl hover:text-blue-900 hover:font-semibold">
//         <Link href="/services">Services</Link>
//       </li>
//       <li className="text-xl hover:text-blue-900 hover:font-semibold">
//         <Link href="/contact">Contact</Link>
//       </li>
//     </ul>
//   );
// }

"use client"

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { logout } from "./store/slices/authSlice";
import LogoutIcon from "@mui/icons-material/Logout";


export default function DesktopNavLinks() {
     const dispatch = useDispatch();
      const router = useRouter();
      const handleLogout = () => {
        localStorage.clear();
        dispatch(logout());
        router.push("/");
      };
    
  return (
    <> 
    <ul className="nav d-flex align-items-center gap-4">
      <li className="nav-item">
        <Link 
          href="/dashboard" 
          className="nav-link fs-5 text-dark hover-custom-primary"
        >
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link 
          href="/about" 
          className="nav-link fs-5 text-dark hover-custom-secondary"
        >
          About
        </Link>
      </li>
      <li className="nav-item">
        <Link 
          href="/services" 
          className="nav-link fs-5 text-dark hover-custom-secondary"
        >
          Services
        </Link>
      </li>
      <li className="nav-item">
        <Link 
          href="/contact" 
          className="nav-link fs-5 text-dark hover-custom-secondary"
        >
          Contact
        </Link>
      </li>
      <li className="nav-item">
              <button
                onClick={handleLogout}
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                }}
              >
                <LogoutIcon />
                Logout
              </button>
            </li>
    </ul>
  
    </>
   
  );
}


