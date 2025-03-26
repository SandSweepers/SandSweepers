import { Link, NavLink } from "react-router-dom";
import React, { useState } from 'react';
import './Nav.scss';

export const Navbar = () => {

    return (
        
            <nav>
                <ul >
                    <li><Link to={"/user"}>User</Link></li>
                    <li><Link to={"/"}>Home</Link></li>
                    <li><Link to={"/map"}>Map</Link></li>
                </ul>
            
            </nav>
        
    )
};