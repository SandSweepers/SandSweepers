import { Link, NavLink, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import './Nav.scss';

export const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Supprime le token
    navigate("/login"); // Redirige vers la page de connexion
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/user">User</Link>
        </li>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/map">Map</Link>
        </li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};