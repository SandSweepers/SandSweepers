import React from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "../../PageComponents/HomePageComponent/HomePage.jsx";
import { UserPage } from "../../PageComponents/UserPageComponent/UserPage.jsx";
import { MapPage } from "../../PageComponents/MapPageComponent/MapPage.jsx";
import { LandingPage } from "../../PageComponents/Auth/LandingPage";
import  SignUpPage  from "../../PageComponents/Auth/SignUpPage";
import { LoginPage } from "../../PageComponents/Auth/LoginPage";
import { MapView } from "../MapCreateComponent/MapView.jsx";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/user" element={<UserPage />} />
      <Route path="/map" element={<MapPage />} />
      <Route path="/user" element={<UserPage/>}/>
      <Route path="/" index element={<HomePage />} />
      <Route path="/map" element={<MapPage/>}/>
      <Route path="/card" element={<MapView/>}/>
    </Routes>
  );
};
