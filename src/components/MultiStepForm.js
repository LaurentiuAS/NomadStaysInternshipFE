import React, { useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    dob: '',
    docpicker: '',
    textarea: '',
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
    setErrors({ ...errors, [name]: '' }); 
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
      
    if (currentStep === 4) {
      if (!formData.docpicker.trim()) newErrors.docpicker = 'Pdf document is requierd'
      if (!formData.dob.trim()) newErrors.dob = 'Date of birth is requierd' }
      else if  (/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.test(formData.dob)) {
        newErrors.dob = 'Date of birth is requierd';
      }
    

    return newErrors;
  };

  return (
    <div className="card">
      <div className="card-body">
        {step === 1 && <Step1 formData={formData} handleChange={handleChange} errors={errors} />}
        {step === 2 && <Step2 formData={formData} handleChange={handleChange} errors={errors} />}
        {step === 3 && <Step3 formData={formData} handleChange={handleChange} errors={errors} />}
        {step === 4 && <Step4 formData={formData} handleChange={handleChange} errors={errors} />}
        {step === 5 && <Step5 formData={formData} handleSubmit={handleSubmit} errors={errors} />}
       
     
          
        </div>
      </div>
    
  );


export default MultiStepForm;
