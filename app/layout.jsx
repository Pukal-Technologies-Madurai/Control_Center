"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Provider } from "react-redux";
import store from "./store/index";
import "../app/globals.css";
import Navbar from "../app/Navbar";
import Footer from "./footer";
import LoginPage from "./loginPage/layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingPage from "../functions/loadingPage";
import { useRouter } from "next/navigation";

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <AppContent>{children}</AppContent>
    </Provider>
  );
}

function AppContent({ children }) {
  const dispatch = useDispatch();
  const router = useRouter(); 
  const { asPath } = router;
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const session = localStorage.getItem("session");

    if (user && session) {
      dispatch({ type: "auth/login" });
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("session");
    }

    setLoading(false);

 
    if (isAuthenticated || asPath == "/") {
      router.push("/dashboard");
    }
  }, [dispatch, isAuthenticated, router, asPath]);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <>
      {isAuthenticated ? (
        <>
          <Navbar />
          {children}
          <Footer />
        </>
      ) : (
        <LoginPage />
      )}
      <ToastContainer />
    </>
  );
}
