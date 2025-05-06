"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { logout } from "../store/slices/authSlice";
import LogoutIcon from "@mui/icons-material/Logout";
import { Dashboard, Assessment, Settings, Person, ExitToApp } from "@mui/icons-material";
import Navbar from "../Navbar";
import { LuBringToFront } from "react-icons/lu";
import { FcFactory } from "react-icons/fc";
import { ImUsers } from "react-icons/im";
import { ImProfile } from "react-icons/im";
import { MdOutlineSettingsApplications } from "react-icons/md";
import { BsDatabaseFillGear } from "react-icons/bs";
import { GiServerRack } from "react-icons/gi";
export default function DashboardMenu ()  {
  const [counts, setCounts] = useState({
    company: 0,
    users: 0,
    userType: 0,
    totalDBSize: "0 MB",
    totalServerSpace: "0 MB",
  });

  const [error, setError] = useState(null);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/dashboard/counts");
        const data = await response.json();
    
        if (data.success) {
         
          setCounts({
            company: data.data[0]?.company || 0,
            users: data.data[0]?.users || 0,
            userType: data.data[0]?.userType || 0,
            totalDBSize: data.data[0]?.totalDBSize || "0 MB",
            totalServerSpace: data.data[0]?.totalServerSpace || "0 MB",
          });
        
        } else {
          setError(data.message || "Failed to fetch company data.");
        }
      } catch (e) {
        setError("Something went wrong. Please try again.");
        console.error("Fetch error:", e);
      }
    };

    fetchData();
  }, []);


  const menuItems = [
    { title: "Masters", icon: <LuBringToFront />, path: "/masters", bgColor: "#7A5980", value: 4 },
    { title: "Company", icon: <FcFactory />, path: "/companyMaster", bgColor:  "#9999A1", value: counts.company },
    { title: "Users", icon: <ImUsers />, path: "/users", bgColor: "#7A5980", value: counts.users },
    { title: "User Profile", icon: <ImProfile />, path: "/userProfileMaster", bgColor: "#2f27ce", value: counts.userType },
    { title: "Application", icon: <MdOutlineSettingsApplications />, path: "/application", bgColor: "#7A4747", value: 0 },
    { title: "Database", icon: <BsDatabaseFillGear />, path: "/database", bgColor: "#3B3B58", value: counts.totalDBSize },
    { title: "ServerSpace", icon: <GiServerRack />, path: "/rights", bgColor: "#2F9C95", value: counts.totalServerSpace },
  ];



  return (
 
    <div className="hold-transition sidebar-mini sidebar-collapse">
   
      
      <div className="wrapper">
       
       
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  {/* <h1>PUKAL TECHNOLOGIES</h1> */}
                </div>
              </div>
            </div>
          </section>

          <section className="content">
  <div className="container-fluid">
    <div className="row">
      {menuItems.map((item, index) => (
        <div key={index} className="col-md-3 mb-3">
          <Link href={item.path} passHref>
            <div
              className="card text-center shadow-sm p-3 rounded"
              style={{
                backgroundColor: item.bgColor,
                color: "#fff",
                cursor: "pointer",
              }}
            >
              <div
                className="card-body d-flex flex-column align-items-center justify-content-center"
              >
                <div style={{ fontSize: 40 }}>{item.icon}</div>
                <h5 className="card-title mt-2">{item.title}</h5>
                <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                  {item.value}
                </span>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  </div>
</section>

        {/* </div> */}

        {/* Footer */}
      
      </div>
    </div>
  );
}
