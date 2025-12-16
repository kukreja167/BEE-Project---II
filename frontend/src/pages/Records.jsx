import React from 'react';

const Records = () => {
    // Placeholder data - replace with API call later
    const prescriptions = [
        {
            _id: '1',
            doctorId: { name: 'Dr. John Doe' },
            date: new Date(),
            diagnosis: 'Common Cold',
            medicines: [
                { name: 'Paracetamol', dosage: '500mg', frequency: 'Twice a day', duration: '5 days' },
                { name: 'Cough Syrup', dosage: '10ml', frequency: 'Thrice a day', duration: '3 days' }
            ]
        },
        // Add more as needed
    ];

    const handleDownload = (prescriptionId) => {
        // Placeholder - download PDF
        alert(`Downloading PDF for prescription ${prescriptionId}`);
    };

    return (
        <div className="records-container">
            <h2>My Prescriptions / Reports</h2>
            {prescriptions.length === 0 ? (
                <p>No prescriptions available.</p>
            ) : (
                prescriptions.map(prescription => (
                    <div key={prescription._id} className="prescription-card">
                        <p><strong>Doctor:</strong> {prescription.doctorId ? prescription.doctorId.name : 'N/A'}</p>
                        <p><strong>Date:</strong> {new Date(prescription.date).toDateString()}</p>
                        <p><strong>Diagnosis:</strong> {prescription.diagnosis}</p>
                        <p><strong>Medicines:</strong></p>
                        <ul>
                            {prescription.medicines.map((medicine, index) => (
                                <li key={index}>{medicine.name} - {medicine.dosage} {medicine.frequency} for {medicine.duration}</li>
                            ))}
                        </ul>
                        <button
                            onClick={() => handleDownload(prescription._id)}
                            className="download-btn"
                        >
                            Download PDF
                        </button>
                    </div>
                ))
            )}
        </div>
    );
};

export default Records;
