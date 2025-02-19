import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import '../App.css';
import '../firebase'; // Ensure this is correctly configured

const Login = ({ onLogin }) => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
      onLogin(); // Call onLogin to set user login state to true
      navigate('/user-dashboard');
    } catch (err) {
      console.log(err);
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="login-page">
      {/* Back Button */}
      <button className="back-button" onClick={() => navigate('/register')}>
        &lt; Back
      </button>

      <h1 className="login-header">User Login</h1>
      <form onSubmit={handleSubmit} className="login-form" autoComplete="off">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={loginData.email}
          onChange={handleChange}
          className="input-field"
          autoComplete="off"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleChange}
          className="input-field"
          autoComplete="new-password"
          required
        />
        <br />
        <button type="submit" className="btn-login">Login</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Login;
