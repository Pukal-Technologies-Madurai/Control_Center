"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { logout } from "../store/slices/authSlice";
import LogoutIcon from "@mui/icons-material/Logout";
import { Dashboard, Assessment, Settings, Person, ExitToApp } from "@mui/icons-material";
import Navbar from "../Navbar";
import Database from './page'



export default function Layout() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUsername(parsedUser.UserName || "User");
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
    router.push("/");
  };




  return (
 
<>        
 <Database/>
     
</>

  );
}

