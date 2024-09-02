import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from './ThemeProvider';
import '../App.css'; // Ensure App.css is correctly loaded

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleSubmit = async () => {
    try {
      if (isRegistering) {
        await axios.post('https://rib-be-1.onrender.com/api/register', { email, password });
        setError('Registration successful, please log in.');
        setIsRegistering(false);
      } else {
        const response = await axios.post('https://rib-be-1.onrender.com/api/login', { email, password });
        const token = response.data.token;
        localStorage.setItem('authToken', token);
        navigate('/google-login');
      }
    } catch (error) {
      setError(isRegistering ? 'Registration failed' : 'Login failed');
      console.error('Request failed:', error);
    }
  };
  
  return (
    <div className={`login-container ${theme}`}>
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleSubmit}>{isRegistering ? 'Register' : 'Login'}</button>
      <button onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? 'Switch to Login' : 'Switch to Register'}
      </button>
      {/* <button onClick={toggleTheme} className="theme-toggle-btn">
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button> */}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default LoginPage;
