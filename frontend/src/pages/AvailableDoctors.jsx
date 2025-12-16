import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { appointmentService } from '../services/appointmentService';

const AvailableDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await appointmentService.getAvailableDoctors();
        setDoctors(data.doctors);
      } catch (err) {
        setError('Failed to load doctors');
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const handleBookAppointment = (doctorId) => {
    // For now, navigate to dashboard or a booking page
    navigate('/dashboard');
  };

  if (loading) return <div>Loading doctors...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="available-doctors">
      <h2>Available Doctors</h2>
      <div className="doctors-list">
        {doctors.map((doctor) => (
          <div key={doctor._id} className="doctor-card">
            <h3>{doctor.name}</h3>
            <p>Specialty: {doctor.specialty}</p>
            <p>Hospital: {doctor.hospital}</p>
            <button onClick={() => handleBookAppointment(doctor._id)}>Book Appointment</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableDoctors;
