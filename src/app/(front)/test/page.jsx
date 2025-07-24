'use client';

import Pin from '@/app/auth/login/Pin/Pin';
import { useState } from 'react';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save to localStorage
    localStorage.setItem('multiStepFormData', JSON.stringify(formData));
    alert('Form submitted and saved to localStorage!');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
      <h2>Step {step}</h2>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div>
            <label>
              First Name:
              <input
                name='firstName'
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <label>
              Last Name:
              <input
                name='lastName'
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <button type='button' onClick={nextStep}>
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <label>
              Email:
              <input
                name='email'
                type='email'
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <label>
              Phone:
              <input
                name='phone'
                type='tel'
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <button type='button' onClick={prevStep}>
              Back
            </button>
            <button type='button' onClick={nextStep}>
              Next
            </button>
          </div>
        )}

        {step === 3 && (
          <div>
            <h4>Review Info:</h4>
            <p>
              <strong>First Name:</strong> {formData.firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {formData.lastName}
            </p>
            <p>
              <strong>Email:</strong> {formData.email}
            </p>
            <p>
              <strong>Phone:</strong> {formData.phone}
            </p>

            <button type='button' onClick={prevStep}>
              Back
            </button>
            <button type='submit'>Submit</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default MultiStepForm;
