import React from 'react';

const Dashboard = ({ user }) => {  // Assume user prop with role
    const userRole = user?.role || 'patient';  // Placeholder, replace with actual user data

    return (
        <div style={{ fontFamily: 'Arial', background: '#f0f2f5', margin: 0 }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', background: '#0077b6', color: '#fff' }}>
                <div>HealthConnect Dashboard</div>
                <div>
                    <span>{user?.name || 'User'} ({userRole})</span>
                    <button style={{ marginLeft: '1rem', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>Logout</button>
                </div>
            </header>

            <div style={{ maxWidth: '900px', margin: '30px auto', background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                <h1>Welcome, {user?.name || 'User'}</h1>

                {userRole === 'patient' ? (
                    <div>
                        <h2>Patient Actions</h2>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li style={{ margin: '8px 0' }}><a href="#" style={{ color: '#0077b6', textDecoration: 'none' }}>View Doctors & Book Appointment</a></li>
                            <li style={{ margin: '8px 0' }}><a href="#" style={{ color: '#0077b6', textDecoration: 'none' }}>My Appointments</a></li>
                            <li style={{ margin: '8px 0' }}><a href="#" style={{ color: '#0077b6', textDecoration: 'none' }}>My Prescriptions / Reports</a></li>
                            <li style={{ margin: '8px 0' }}><a href="#" style={{ color: '#0077b6', textDecoration: 'none' }}>Nearby Hospitals & Doctors</a></li>
                        </ul>
                    </div>
                ) : (
                    <div>
                        <h2>Doctor Actions</h2>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li style={{ margin: '8px 0' }}><a href="#" style={{ color: '#0077b6', textDecoration: 'none' }}>Manage Appointments</a></li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
