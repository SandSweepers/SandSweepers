
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

import { NavLink } from "react-router-dom";
import { FaUser, FaHome, FaMapMarkerAlt } from 'react-icons/fa';
import './Nav.scss';

export const Navbar = () => {

import { NavLink } from "react-router-dom";
import { FaUser, FaHome, FaMapMarkerAlt } from 'react-icons/fa';
import './Nav.scss';

export const Navbar = () => {

  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink to="/user" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaUser />
          </NavLink>
        </li>
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaHome />
          </NavLink>
        </li>
        <li>
          <NavLink to="/map" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaMapMarkerAlt />
          </NavLink>

        </li>
      </ul>
    </nav>
  );
};