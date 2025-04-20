// import { createContext, useState, useEffect } from "react";
// import jwt_decode from "jwt-decode";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   // When the app starts, check if token exists
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       try {
//         const decoded = jwt_decode(token);
//         setUser(decoded); // { id, username, role }
//       } catch (err) {
//         localStorage.removeItem("token");
//       }
//     }
//   }, []);

//   const login = (token) => {
//     localStorage.setItem("token", token);
//     const decoded = jwt_decode(token);
//     setUser(decoded);
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "../utils/axiosConfig"; 

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));
  const [token, setToken] = useState(() => localStorage.getItem("access_token"));

  const login = async (username, password) => {
    const res = await axios.post("http://localhost:8080/api/users/signin", {
      username,
      password,
    });

    const { user, access_token } = res.data;

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("access_token", access_token);

    setUser(user);
    setToken(access_token);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    setUser(null);
    setToken(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};