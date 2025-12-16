import React from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorAppointments = () => {
    const navigate = useNavigate();

    // Placeholder data - replace with API call later
    const appointments = [
        {
            _id: '1',
            patientId: { name: 'Patient A' },
            date: new Date(),
            timeSlot: '10:00 AM',
            status: 'Pending'
        },
        {
            _id: '2',
            patientId: { name: 'Patient B' },
            date: new Date(),
            timeSlot: '11:00 AM',
            status: 'Approved'
        },
        // Add more as needed
    ];

    const handleStatusChange = (appointmentId, status) => {
        // Placeholder - update status via API
        alert(`Updating status of appointment ${appointmentId} to ${status}`);
    };

    const handlePrescribe = (patientId) => {
        // Placeholder - navigate to prescribe page
        navigate('/records'); // For now, navigate to records
    };

    return (
        <div className="doctor-appointments">
            <h2>Appointments for Dr. [User Name]</h2>
            {appointments.length === 0 ? (
                <p>No appointments assigned.</p>
            ) : (
                <table className="appointments-table">
                    <thead>
                        <tr>
                            <th>Patient</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map(appointment => (
                            <tr key={appointment._id}>
                                <td>{appointment.patientId ? appointment.patientId.name : 'N/A'}</td>
                                <td>{appointment.date ? new Date(appointment.date).toDateString() : ''}</td>
                                <td>{appointment.timeSlot}</td>
                                <td>{appointment.status}</td>
                                <td>
                                    <button
                                        onClick={() => handleStatusChange(appointment._id, 'Approved')}
                                        className="btn-approve"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => handleStatusChange(appointment._id, 'Rejected')}
                                        className="btn-reject"
                                    >
                                        Reject
                                    </button>
                                    <button
                                        onClick={() => handleStatusChange(appointment._id, 'Completed')}
                                        className="btn-complete"
                                    >
                                        Complete
                                    </button>
                                    {appointment.patientId && (
                                        <button
                                            onClick={() => handlePrescribe(appointment.patientId._id)}
                                            className="btn-prescribe"
                                        >
                                            Prescribe
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default DoctorAppointments;
