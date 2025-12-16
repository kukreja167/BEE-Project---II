import { useState } from 'react';

export default function Form({ fields, onSubmit, submitText = 'Submit' }) {
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            {fields.map(field => (
                <div key={field.name} className="form-field">
                    <label htmlFor={field.name}>{field.label}</label>
                    <input
                        type={field.type || 'text'}
                        id={field.name}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        required={field.required || false}
                        placeholder={field.placeholder || ''}
                    />
                </div>
            ))}
            <button type="submit" className="submit-btn">{submitText}</button>
        </form>
    );
}
