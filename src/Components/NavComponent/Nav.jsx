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