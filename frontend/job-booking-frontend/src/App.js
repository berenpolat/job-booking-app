import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import JobSearch from "./components/JobSearch";
import HotelSearch from "./components/HotelSearch";
import AIAgent from "./components/AIAgent";

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">AI Agent</Link> | 
        <Link to="/jobs">Job Search</Link> | 
        <Link to="/hotels">Hotel Search</Link>
      </nav>
      <Routes>
        <Route path="/" element={<AIAgent />} />
        <Route path="/jobs" element={<JobSearch />} />
        <Route path="/hotels" element={<HotelSearch />} />
      </Routes>
    </BrowserRouter>
  );
}
