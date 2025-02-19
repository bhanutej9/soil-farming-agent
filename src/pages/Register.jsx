import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import '../App.css';
import '../firebase'; // Ensure this is correctly set up

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      // Register user with Firebase Authentication
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);

      // Show success message before redirecting
      setSuccessMessage('Registration successful! Redirecting to login...');

      // Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="register-page">
      {/* Back Button */}
      <button className="back-button" onClick={() => navigate('/')}>
        &lt; Back to Home
      </button>

      <h1 className="register-header">Register as User</h1>
      <form onSubmit={handleSubmit} className="register-form" autoComplete="off">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="input-field"
          autoComplete="off"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="input-field"
          autoComplete="off"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="input-field"
          autoComplete="new-password"
          required
        />
        <button type="submit" className="btn-register">Submit</button>
      </form>

      {error && <p 
      style={{
        color: 'red',
        fontSize: '25px',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: '10px',
        padding: '10px',  
      }}
      className="error-message">{error}</p>}
      {successMessage && <p
      style={{
        color: 'white',
        fontSize: '32px',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: '10px',
        padding: '10px',
        
      }}
      className="success-message">{successMessage}</p>}

      <p className="existing-user">
        Already an existing user?{' '}
        <button className="btn-login-here" onClick={() => navigate('/login')}>
          Login Here
        </button>
      </p>
    </div>
  );
};

export default Register;
