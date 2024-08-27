import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/navbar/Nav";
import Home from "./components/pages/Home";
import Posts from "./components/pages/Posts";
import Profile from "./components/pages/Profile";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Verify from "./components/pages/Verify";

function App() {
  return (
    <div className="bg-blue-300 min-h-screen">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/posts" element={<Posts />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register/:vtoken/:uid" element={<Verify />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
