import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AvailableDoctors from './pages/AvailableDoctors.jsx';
import DoctorAppointments from './pages/DoctorAppointments.jsx';
import Records from './pages/Records.jsx';
import '../src/App.css';

function App() {
  const [user, setUser] = useState(null); // User state for authentication

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/dashboard" element={<Dashboard user={user} setUser={setUser} />} />
        <Route path="/available-doctors" element={<AvailableDoctors />} />
        <Route path="/doctor-appointments" element={<DoctorAppointments />} />
        <Route path="/records" element={<Records />} />
      </Routes>
    </Router>
  );
}

export default App
