import React, { useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
  });

  const [errors, setErrors] = useState({});

  const handleNext = () => {
    const validationErrors = validateStep(step);
    if (Object.keys(validationErrors).length === 0) {
      setStep(step + 1);
    } else {
      setErrors(validationErrors);
    }
  };

  const handleBack = () => setStep(step - 1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear errors for the current field
  };

  const handleSubmit = () => {
    const validationErrors = validateStep(step);
    if (Object.keys(validationErrors).length === 0) {
      console.log('Form Submitted:', formData);
      alert('Form successfully submitted!');
    } else {
      setErrors(validationErrors);
    }
  };

  const validateStep = (currentStep) => {
    const newErrors = {};
    if (currentStep === 1) {
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is not valid';
      }
    }
    if (currentStep === 2) {
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.zip.trim()) {
        newErrors.zip = 'ZIP code is required';
      } else if (formData.zip.length !== 5 || isNaN(formData.zip)) {
        newErrors.zip = 'ZIP code must be a 5-digit number';
      }
    }
    return newErrors;
  };

  return (
    <div className="card">
      <div className="card-body">
        {step === 1 && <Step1 formData={formData} handleChange={handleChange} errors={errors} />}
        {step === 2 && <Step2 formData={formData} handleChange={handleChange} errors={errors} />}
        {step === 3 && <Step3 formData={formData} handleSubmit={handleSubmit} />}
        <div className="d-flex justify-content-between mt-3">
          {step > 1 && (
            <button className="btn btn-secondary" onClick={handleBack}>
              Back
            </button>
          )}
          {step < 3 ? (
            <button className="btn btn-primary" onClick={handleNext}>
              Next
            </button>
          ) : (
            <button className="btn btn-success" onClick={handleSubmit}>
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;