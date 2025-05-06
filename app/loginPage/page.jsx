"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/slices/authSlice";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import LoadingPage from "@/functions/loadingPage";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      var data = await response.json();
      if (data.success ) {
 
        dispatch(loginSuccess(data.user));
      
        localStorage.setItem("user", JSON.stringify(data.data.user || {}));
        localStorage.setItem("session", JSON.stringify(data.data.sessionInfo || {}));
        localStorage.setItem("loginAt", new Date().toISOString());
      
        router.push("/dashboard");
        LoadingPage
      } else {
        console.log(data.message || "Login failed. Please check your credentials.");
      }
      
      
    } catch (error) {
 
      console.log("Something went wrong. Please try again.");
    }
  };

  
  return (
    <div>
      <section className="container-fluid d-flex align-items-center justify-content-center vh-100">
        <div className="container">
          <div className="row gx-lg-5 align-items-center justify-content-center">


            <div className="col-lg-6 text-center text-lg-start">
              <div className="text-center">
                <h1 className="display-3 fw-bold" style={{ fontFamily: "Smooch Sans" }}>
                  Welcome
                </h1>
                <h5>We are glad to see you back with us</h5>
              </div>

              <div className="card-body py-5 px-sm-5">
                <form onSubmit={handleLogin}>

                  <div className="form-outline mb-4">
                    <div className="input-group">
                      <span className="input-group-text bg-white border-0">
                        <img src="/LoginPage/Frame1.png" alt="User Icon" width="20px" />
                      </span>
                      <input
                        type="username"
                        placeholder="Username"
                        id="form3Example3"
                        className="form-control"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                  </div>


                  <div className="form-outline mb-4">
                    <div className="input-group">
                      <span className="input-group-text bg-white border-0">
                        <img src="/LoginPage/Frame2.png" alt="Password Icon" width="20px" />
                      </span>
                      <input
                        type="password"
                        placeholder="Password"
                        id="form3Example4"
                        className="form-control"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>


                  <div className="d-flex justify-content-center">
                    <button
                      type="submit"
                      className="mb-4 w-50"
                      style={{
                        backgroundColor: "black",
                        color: "white",
                        border: "none",
                        width: "364px",
                        height: "52px",
                        fontFamily: "Poppins",
                        fontWeight: "bold",
                        borderRadius: "10px",
                        transition: "all 0.3s ease-in-out",
                      }}
                      onMouseOver={(e) => (e.target.style.backgroundColor = "#333")}
                      onMouseOut={(e) => (e.target.style.backgroundColor = "black")}
                    >
                      NEXT
                    </button>
                  </div>


                  <div className="d-flex justify-content-center">
                    <h5>Login With Others</h5>
                  </div>


                  <div className="d-flex justify-content-center">
                    <button
                      type="button"
                      className="mb-4 w-50 d-flex align-items-center justify-content-center"
                      style={{
                        border: "none",
                        width: "364px",
                        height: "52px",
                        fontFamily: "Poppins",
                        fontWeight: "bold",
                        borderRadius: "10px",
                        backgroundColor: "#fff",
                        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <img src="/LoginPage/google 1.png" alt="Google" width="20px" className="me-2" />
                      Login With Google
                    </button>
                  </div>

                  <div className="d-flex justify-content-center">
                    <button
                      type="button"
                      className="mb-4 w-50 d-flex align-items-center justify-content-center"
                      style={{
                        border: "none",
                        width: "364px",
                        height: "52px",
                        fontFamily: "Poppins",
                        fontWeight: "bold",
                        borderRadius: "10px",
                        backgroundColor: "#fff",
                        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <img src="/LoginPage/facebook 1.png" alt="Facebook" width="20px" className="me-2" />
                      Login With Facebook
                    </button>
                  </div>

                  <div className="d-flex justify-content-center gap-3">
                    <button className="btn btn-link btn-floating mx-1">
                      <i className="fab fa-google"></i>
                    </button>
                    <button type="button" className="btn btn-link btn-floating mx-1">
                      <i className="fab fa-twitter"></i>
                    </button>
                    <button type="submit" className="btn btn-link btn-floating mx-1">
                      <i className="fab fa-github"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* <div className="col-lg-6 d-flex justify-content-center">
              <img src="/LoginPage/Rectangle4.png" className="img-fluid" alt="Business Offer" />
            </div> */}
    <div className="col-lg-6 d-flex justify-content-center">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                    style={{"width": "600px" }}/>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
