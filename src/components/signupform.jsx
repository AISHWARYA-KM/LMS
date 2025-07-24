import '../styles/authpage.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import axios from 'axios';

function SignupForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    referralCode: '',
  });

  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  const requiredFields = [
    { name: 'fullName', label: 'Full Name' },
    { name: 'email', label: 'Email' },
    { name: 'phone', label: 'Phone Number' },
    { name: 'password', label: 'Password' },
    { name: 'confirmPassword', label: 'Confirm Password' },
  ];

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordStrengthRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFieldErrors(prev => ({ ...prev, [name]: false }));
  };

  const validateFields = () => {
    const errors = {};

    requiredFields.forEach(field => {
      if (!formData[field.name]?.trim()) {
        errors[field.name] = `${field.label} is required.`;
      }
    });

    if (formData.email && !emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = 'The phone format is invalid.';
    }

    if (formData.password && !passwordStrengthRegex.test(formData.password)) {
      errors.password =
        'Password must be at least 8 characters, include uppercase, lowercase, number, and special character.';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'The password confirmation does not match.';
    }

    return errors;
  };

  const getInputClass = (field) => (fieldErrors[field] ? 'input-error' : '');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setError('');
    const errors = validateFields();
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      setError('Please fill all required fields correctly.');
      const firstErrorField = document.querySelector('.input-error');
      if (firstErrorField) firstErrorField.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/register/", {
        username: formData.fullName,  // use email as username, or use fullName if you prefer
        password: formData.password,
        email: formData.email,
        phone: formData.phone,
        referral_code: formData.referralCode,
        role:'student',  // Default role for signup
      });
      alert("Registration successful!");
      navigate('/login');
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 400) {
        const errorData = err.response.data;
        if (errorData.username) {
          setError(errorData.username[0]);
        } else if (errorData.email) {
          setError(errorData.email[0]);
        } else if(typeof errorData === 'string') {
          setError(errorData);
        }else {
          setError("Registration failed. Please check the form.");
        }
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  }
 

  return (
    <form className="signup-form" onSubmit={handleSubmit} noValidate>
      <img src={logo} alt="Infix Logo" className="logo" />
      <h2>Sign Up Details</h2>
      {requiredFields.map((field) => (
        <div key={field.name}>
          <input
            name={field.name}
            type={
              field.name.includes('password')
                ? 'password'
                : field.name === 'email'
                ? 'email'
                : field.name === 'phone'
                ? 'tel'
                : 'text'
            }
            placeholder={`Enter ${field.label} *`}
            onChange={handleChange}
            value={formData[field.name]}
            className={getInputClass(field.name)}
            required
            pattern={field.name === 'phone' ? '\\d{10}' : undefined}
          />
          {fieldErrors[field.name] && (
            <div className="field-error">{fieldErrors[field.name]}</div>
          )}
        </div>
      ))}

      <input
        name="referralCode"
        type="text"
        placeholder="Referral Code (Optional)"
        onChange={handleChange}
        value={formData.referralCode}
      />

      <div className="form-group agreement">
        <label>
          <input
            type="checkbox"
            checked={agreed}
            onChange={() => setAgreed(!agreed)}
          />
          By signing up, you agree to <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
        </label>
      </div>

      {error && <div className="error-message">{error}</div>}

      <button
        type="submit"
        className={`register-button ${agreed ? 'active' : 'disabled'}`}
        disabled={!agreed}
      >
        Register
      </button>

      <p className="login-text">
        You already have an account? <Link to="/login">Login</Link>
      </p>
    </form>
  );
}

export default SignupForm;
