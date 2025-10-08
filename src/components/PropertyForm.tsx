import React, { useState } from 'react';
import { ArrowLeft, Home } from 'lucide-react';

interface FormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  emailAddress: string;
  propertyAddress: string;
  planningSelling: 'yes' | 'no' | '';
  sellingSoon: 'less-than-1-month' | 'less-than-6-months' | 'more-than-6-months' | '';
}

interface FormErrors {
  [key: string]: string;
}

const PropertyForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    emailAddress: '',
    propertyAddress: '',
    planningSelling: '',
    sellingSoon: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid numeric phone number';
    }

    if (!formData.emailAddress.trim()) {
      newErrors.emailAddress = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailAddress)) {
      newErrors.emailAddress = 'Please enter a valid email address';
    }

    if (!formData.propertyAddress.trim()) {
      newErrors.propertyAddress = 'Property address is required';
    }

    if (!formData.planningSelling) {
      newErrors.planningSelling = 'Please select if you are planning on selling';
    }

    if (formData.planningSelling === 'yes' && !formData.sellingSoon) {
      newErrors.sellingSoon = 'Please select how soon you plan to sell';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // STEP 1: Replace this URL with your Google Apps Script Web App URL
      // Follow the instructions in google-sheets-setup.md to get your URL
      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyNk4rR1bEN-kSw8jcCQfB9c1IKDkn9lP8YASwcP0OLWB3uhUA1tAwcKFHRfvd7b0MQ/exec';
      
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          phoneNumber: formData.phoneNumber,
          emailAddress: formData.emailAddress,
          propertyAddress: formData.propertyAddress,
          planningSelling: formData.planningSelling,
          howSoon: formData.sellingSoon,
          timestamp: new Date().toISOString()
        })
      });

      setShowSuccess(true);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitMessage('There was an error submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="relative w-full max-w-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-700 to-amber-400 rounded-3xl"></div>
          <div className="relative bg-gradient-to-r from-[#111357to-[#FCBA04] rounded-3xl p-12 text-center shadow-2xl">
            <div className="mb-8">
              <img
                src="https://i.pinimg.com/736x/16/65/3a/16653a58a87e1065465cff5e4d9fd53c.jpg"
                alt="Received"
                className="w-64 h-48 object-cover mx-auto rounded-lg shadow-lg"
              />
            </div>

            <h1 className="text-5xl font-bold text-amber-400 mb-4">Received</h1>

            <p className="text-white text-lg mb-2">Your application has been received.</p>
            <p className="text-white text-lg mb-8">You will get an email with a property report</p>

            <button
              onClick={() => window.location.href = 'https://www.stonerealestate.com.au/'}
              className="bg-white text-gray-800 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`
        }}
      />
      
      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-6">
        <button className="text-white hover:text-gray-300 transition-colors duration-200">
          <ArrowLeft size={24} />
        </button>
        <div className="bg-white px-4 py-2 rounded font-bold text-gray-800 text-lg tracking-wider shadow-lg">
          STONE
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-4">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Hero Content */}
          <div className="text-white space-y-6 lg:pr-8">
            <div className="flex items-center space-x-3 mb-8">
              <Home size={40} className="text-white" />
              <span className="text-2xl font-light">Property Valuation</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              How much is your property worth?
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-md">
              Enter the brief details and you will get a report about your property, let's start!
            </p>
          </div>

          {/* Right Side - Form */}
          <div className="w-full max-w-lg mx-auto lg:mx-0">
            <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-10">
              {submitMessage && (
                <div className={`mb-6 p-4 rounded-lg text-sm font-medium ${
                  submitMessage.includes('error') 
                    ? 'bg-red-50 text-red-800 border border-red-200' 
                    : 'bg-green-50 text-green-800 border border-green-200'
                }`}>
                  {submitMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter first name"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.firstName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter last name"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.lastName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.phoneNumber ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="emailAddress"
                    value={formData.emailAddress}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.emailAddress ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {errors.emailAddress && (
                    <p className="text-red-500 text-xs mt-1">{errors.emailAddress}</p>
                  )}
                </div>

                {/* Property Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="propertyAddress"
                    value={formData.propertyAddress}
                    onChange={handleInputChange}
                    placeholder="Enter property address"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.propertyAddress ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {errors.propertyAddress && (
                    <p className="text-red-500 text-xs mt-1">{errors.propertyAddress}</p>
                  )}
                </div>

                {/* Are you planning on selling? */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Are you planning on selling? <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="planningSelling"
                        value="yes"
                        checked={formData.planningSelling === 'yes'}
                        onChange={handleInputChange}
                        className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="text-gray-700">Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="planningSelling"
                        value="no"
                        checked={formData.planningSelling === 'no'}
                        onChange={handleInputChange}
                        className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="text-gray-700">No</span>
                    </label>
                  </div>
                  {errors.planningSelling && (
                    <p className="text-red-500 text-xs mt-1">{errors.planningSelling}</p>
                  )}
                </div>

                {/* If yes, how soon? */}
                {formData.planningSelling === 'yes' && (
                  <div className="animate-fadeIn">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      If yes, how soon? <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="sellingSoon"
                          value="less-than-1-month"
                          checked={formData.sellingSoon === 'less-than-1-month'}
                          onChange={handleInputChange}
                          className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="text-gray-700">Less than 1 month</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="sellingSoon"
                          value="less-than-6-months"
                          checked={formData.sellingSoon === 'less-than-6-months'}
                          onChange={handleInputChange}
                          className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="text-gray-700">Less than 6 months</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="sellingSoon"
                          value="more-than-6-months"
                          checked={formData.sellingSoon === 'more-than-6-months'}
                          onChange={handleInputChange}
                          className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="text-gray-700">More than 6 months</span>
                      </label>
                    </div>
                    {errors.sellingSoon && (
                      <p className="text-red-500 text-xs mt-1">{errors.sellingSoon}</p>
                    )}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyForm;
