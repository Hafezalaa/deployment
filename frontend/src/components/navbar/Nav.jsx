import React from "react";
import { NavLink } from "react-router-dom";

function Nav() {
  
  return (
    <nav className="main-nav bg-white p-5">
      <ul className="flex gap-x-4">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/posts">Posts</NavLink>
        </li>
        <li>
          <NavLink to="/profile">Profile</NavLink>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
        <li>
          <NavLink to="/register">Register</NavLink>
        </li>
        <li>
          <NavLink to="/logout">Logout</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
