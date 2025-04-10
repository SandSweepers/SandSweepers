import React from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "../../PageComponents/HomePageComponent/HomePage.jsx";
import { UserPage } from "../../PageComponents/UserPageComponent/UserPage.jsx";
import { MapPage } from "../../PageComponents/MapPageComponent/MapPage.jsx";
import { LandingPage } from "../../PageComponents/Auth/LandingPage";
import SignUpPage from "../../PageComponents/Auth/SignUpPage";
import { LoginPage } from "../../PageComponents/Auth/LoginPage";
import { MapView } from "../MapCreateComponent/MapView.jsx";
import PrivateRoute from "../RouterComponent/PrivateRoute.jsx";

import { BeachDetail } from "../BeachDetailComponent/BeachDetail.jsx";
import { CleanupForm } from "../CleanupFormComponent/CleaupForm.jsx";


export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/user"
        element={
          <PrivateRoute>
            <UserPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/map"
        element={
          <PrivateRoute>
            <MapPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/card"
        element={
          <PrivateRoute>
            <MapView />
          </PrivateRoute>
        }
      />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
        <Route
        path="/beach/:id"
        element={
          <PrivateRoute>
            <BeachDetail />
          </PrivateRoute>
        }
      />
        <Route
        path="/cleanup-form/:id"
        element={
          <PrivateRoute>
            <CleanupForm />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};
