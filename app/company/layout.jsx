// "use client";

// import Navbar from "../Navbar";
// import { useRouter } from "next/navigation";
// import { logout } from "../store/slices/authSlice";
// import { useDispatch } from "react-redux";
// import LogoutIcon from "@mui/icons-material/Logout";
// import { useEffect } from "react";

// export default function CompanyLayout({ children }) {
//   const router = useRouter();
//   const dispatch = useDispatch();

//   const handleLogout = () => {
//     localStorage.clear();
//     dispatch(logout());
//     router.push("/");
//   };

//   // Apply AdminLTE classes on mount
//   useEffect(() => {
//     document.body.classList.add("hold-transition", "sidebar-mini", "sidebar-collapse");
//     return () => {
//       document.body.classList.remove("hold-transition", "sidebar-mini", "sidebar-collapse");
//     };
//   }, []);

//   return (
//     <div style={{ display: "flex", height: "100vh" }}>

     
//       <div style={{ background: "#f8f9fa" }}>
//         <Navbar />
//       </div>

//       <div className="wrapper" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
     
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

       
//         <div style={{ flex: 1, padding: "20px" }}>
//           <main>{children}</main>
//         </div>
//       </div>

//       </div>

//   );
// }





"use client";

import Navbar from "../Navbar";
import { useRouter } from "next/navigation";
import { logout } from "../store/slices/authSlice";
import { useDispatch } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import { useEffect } from "react";

export default function CompanyLayout({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
    router.push("/");
  };




  return (
   
     

      
        <div style={{ flex: 1, padding: "20px" }}>
          <main>{children}</main>
        </div>
    
  );
}
