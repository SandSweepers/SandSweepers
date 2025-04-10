
import React, { useState } from 'react';

import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaUser, FaHome, FaMapMarkerAlt } from 'react-icons/fa';
import './Nav.scss';

export const Navbar = () => {
  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem("token"); // Supprime le token
    navigate("/login"); // Redirige vers la page de connexion
  };

  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink to="/user" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaUser />
          </NavLink>
        </li>
        <li>
          <NavLink to="/home" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaHome />
          </NavLink>
        </li>
        <li>
          <NavLink to="/map" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaMapMarkerAlt />
          </NavLink>



        </li>
        <li>
        <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};