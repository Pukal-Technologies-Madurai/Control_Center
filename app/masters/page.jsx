// "use client";
// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { logout } from "../store/slices/authSlice";
// import LogoutIcon from "@mui/icons-material/Logout";
// import { Dashboard, Assessment, Settings, Person, ExitToApp } from "@mui/icons-material";
// import Navbar from "../Navbar";


// // const menuItems=[
// //   { title: "Company Master", icon: <Assessment />, path: "/companyMaster", bgColor: "#7A5980" },
// //   {title: 'App Master', icon: <Dashboard />, path: '/appMaster', bgColor: "#7A4747" },

// //   { title: "User Profile", icon: <Dashboard />, path: "/userProfileMaster", bgColor: "#7A5980" },
 
// //   { title: "Menu Master", icon: <Person />, path: "/menuMaster", bgColor: "#9999A1" },
 
// // ];

// export default function DashboardContent() {
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const [username, setUsername] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       const parsedUser = JSON.parse(storedUser);
//       setUsername(parsedUser.UserName || "User");
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear();
//     dispatch(logout());
//     router.push("/");
//   };

//   return (
//     <div className="hold-transition sidebar-mini sidebar-collapse">
//       <div className="wrapper">
//         {/* Navbar */}
//         <nav className="main-header navbar navbar-expand navbar-white navbar-light">
//           <ul className="navbar-nav">
//             <li className="nav-item">
//               <a className="nav-link" data-widget="pushmenu" href="#" role="button">
//                 <i className="fas fa-bars"></i>
//               </a>
//             </li>
//           </ul>
//           <ul className="navbar-nav ml-auto">
//             <li className="nav-item">
//               <button
//                 onClick={handleLogout}
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   border: "none",
//                   background: "none",
//                   cursor: "pointer",
//                 }}
//               >
//                 <LogoutIcon />
//                 Logout
//               </button>
//             </li>
//           </ul>
//         </nav>

//         {/* Custom Navbar Component */}
//         <Navbar username={username} />
//         {/* <nav className="mt-2">
//             <ul className="nav nav-pills nav-sidebar flex-column"  role="menu" data-accordion="false">
           
        
//               <li className="nav-item">
//                 <a href="#" className="nav-link">
//                   <i className="nav-icon fas fa-tachometer-alt"></i>
//                   <p>
//                     Users
//                       <i className="right fas fa-angle-left"></i>
//                   </p>
//                 </a>
              
//               </li>
//               <li className="nav-item">
//                 <a href="../widgets.html" className="nav-link">
//                   <i className="nav-icon fas fa-th"></i>
//                   <p>
//                     Database
//                     <span className="right badge badge-danger">New</span>
//                   </p>
//                 </a>
//               </li>
        
        
       
             
            
//               <li className="nav-item">
//                 <a href="#" className="nav-link">
//                   <i className="nav-icon far fa-circle text-info"></i>
//                   <p onClick={handleLogout}>Logout</p>
//                 </a>
//               </li>
//             </ul>
//           </nav> */}
//         {/* Main Content */}
//         <div className="content-wrapper">
//           <section className="content-header">
//             <div className="container-fluid">
//               <div className="row mb-2">
//                 <div className="col-sm-6">
//                   <h1>PUKAL TECHNOLOGIES</h1>
//                 </div>
//               </div>
//             </div>
//           </section>

//           <section className="content">
//             <div className="container-fluid">
//               <div className="row">
//                 {menuItems.map((item, index) => (
//                   <div key={index} className="col-md-3 mb-3">
//                     <Link href={item.path} passHref>
//                       <div
//                         className="card text-center shadow-sm p-3 rounded"
//                         style={{
//                           backgroundColor: item.bgColor,
//                           color: "#fff",
//                           cursor: "pointer",
//                         }}
//                       >
//                         <div className="card-body">
//                           <div style={{ fontSize: 40 }}>{item.icon}</div>
//                           <h5 className="card-title mt-2">{item.title}</h5>
//                         </div>
//                       </div>
//                     </Link>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </section>
//         </div>

//         {/* Footer */}
//         <footer className="main-footer text-center">
//           <div>
//             <b>Version</b> 3.1.0
//           </div>
//           <strong>
//             Copyright &copy; 2014-2021 <a href="https://pukaltechnologies.in">PUKAL TECH</a>.
//           </strong>{" "}
//           All rights reserved.
//         </footer>
//       </div>
//     </div>
//   );
// }


import React from 'react'

function page() {
  return (
    <div>page</div>
  )
}

export default page