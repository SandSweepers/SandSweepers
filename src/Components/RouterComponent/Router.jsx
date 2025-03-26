import React from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "../../PageComponents/HomePageComponent/HomePage.jsx";
import { UserPage } from "../../PageComponents/UserPageComponent/UserPage.jsx";
import { MapPage } from "../../PageComponents/MapPageComponent/MapPage.jsx";

export const Router = () => {

  return (
    <Routes>
      <Route path="/user" element={<UserPage/>}/>
      <Route path="/" index element={<HomePage />} />
      <Route path="/map" element={<MapPage/>}/>
    </Routes>
  )
}
