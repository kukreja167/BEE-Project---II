import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div className="home-container">
            <Navbar />
            <main className="home-main">
                <h1>Welcome to HealthConnect</h1>
                <p>Your trusted platform for managing healthcare appointments and records.</p>
                <Link to="/login">Get Started</Link>
                <Link to="/available-doctors">Find Hospitals</Link>
            </main>
            <section className="features">
                <div className="feature-card">
                    <h3>Book Appointments</h3>
                    <p>Easily schedule appointments with doctors.</p>
                </div>
                <div className="feature-card">
                    <h3>Manage Records</h3>
                    <p>Access your medical records and prescriptions.</p>
                </div>
                <div className="feature-card">
                    <h3>Find Hospitals</h3>
                    <p>Locate nearby hospitals and healthcare providers.</p>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Home;
