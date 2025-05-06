"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { logout } from "../store/slices/authSlice";
import LogoutIcon from "@mui/icons-material/Logout";
import { Dashboard, Assessment, Settings, Person, ExitToApp } from "@mui/icons-material";
import Navbar from "../Navbar";

import Footer from '../footer'
export default function page() {
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
    <div className="hold-transition sidebar-mini sidebar-collapse">
      <div className="wrapper">
     
     
      <Navbar username={username} />

  
        <div className="content-wrapper">
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>PUKAL TECHNOLOGIES</h1>
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
                        <div className="card-body">
                          <div style={{ fontSize: 40 }}>{item.icon}</div>
                          <h5 className="card-title mt-2">{item.title}</h5>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

    {/* <Footer/>
        <footer className="main-footer text-center">
          <div>
            <b>Version</b> 3.1.10
          </div>
          <strong>
            Copyright &copy; 2014-2021 <a href="https://pukaltechnologies.in">PUKAL TECH</a>.
          </strong>{" "}
          All rights reserved.
        </footer> */}
      </div>
    </div>
  );
}
