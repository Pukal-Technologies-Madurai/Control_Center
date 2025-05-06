import { createSlice } from "@reduxjs/toolkit";

const getUserFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    try {
     
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      return null;
    }
  }
  return null;
};

const initialState = {
  user: getUserFromLocalStorage(),
  isAuthenticated: !!getUserFromLocalStorage(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action.payload));
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.UserName = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
      }
    },
    checkAuth: (state) => {
            const user = localStorage.getItem("user");
            const session = localStorage.getItem("session");
      
            if (user && session) {
              state.isAuthenticated = true;
            } else {
              state.isAuthenticated = false;
            }
          },
  },
});

export const { loginSuccess, logout,checkAuth } = authSlice.actions;
export default authSlice.reducer;




// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   isAuthenticated: false,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     login: (state) => {
//       state.isAuthenticated = true;
//     },
//     logout: (state) => {
//       state.isAuthenticated = false;
//     },
//     checkAuth: (state) => {
//       const user = localStorage.getItem("user");
//       const session = localStorage.getItem("session");

//       if (user && session) {
//         state.isAuthenticated = true;
//       } else {
//         state.isAuthenticated = false;
//       }
//     },
//   },
// });

// export const { login, logout, checkAuth } = authSlice.actions;
// export default authSlice.reducer;
