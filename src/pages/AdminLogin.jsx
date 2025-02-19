import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const AdminLogin = ({ onLogin, isAdmin }) => {
  const [adminData, setAdminData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Define a list of admins with their usernames and passwords
  const adminList = [
    { username: 'admin', password: 'admin123' },
    { username: 'bhanu', password: 'bhanu456' } // Add more admins here
  ];

  // Redirect to admin dashboard if already logged in
  useEffect(() => {
    if (isAdmin) {
      navigate('/admin-dashboard');
    }
  }, [isAdmin, navigate]);

  const handleChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Reset error message

    // Check if entered username and password match any admin in the list
    const validAdmin = adminList.find(
      (admin) => admin.username === adminData.username && admin.password === adminData.password
    );

    if (validAdmin) {
      onLogin(); // Call the onLogin prop to set isAdmin to true
      navigate('/admin-dashboard'); // Redirect to admin dashboard on success
    } else {
      setError('Invalid username or password'); // Display error message on failure
    }
  };

  return (
    <div className="login-page">
      {/* Back to Home Button */}
      <button className="back-button" onClick={() => navigate('/')}>
        &lt; Back to Home
      </button>

      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit} className="login-form" autoComplete="off">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={adminData.username}
          onChange={handleChange}
          className="input-field"
          autoComplete="off"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={adminData.password}
          onChange={handleChange}
          className="input-field"
          autoComplete="new-password"
          required
        />
        <br />
        <button type="submit" className="btn-login">Login</button>
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

      <br />
      <p className="existing-user">
        Not an admin?{' '}
        <button onClick={() => navigate('/register')} className="btn-register-here">
          Register as user
        </button>
      </p>
    </div>
  );
};

export default AdminLogin;
