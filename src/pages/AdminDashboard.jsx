import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import '../App.css';

const AdminDashboard = () => {
  const [soilDetails, setSoilDetails] = useState('');
  const [distributorDetails, setDistributorDetails] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Posting data to Firestore (soils collection)
      await addDoc(collection(db, 'soils'), {
        soilDetails,
        distributorDetails,
        timestamp: new Date(),
      });

      setMessage('Details posted successfully!');
      setSoilDetails('');
      setDistributorDetails('');
    } catch (error) {
      console.error('Error posting data:', error);
      setMessage('Error posting data');
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      navigate('/');
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Logout Button with Confirmation */}
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>

      <h2>Welcome to Admin Dashboard</h2>
      <h3>Post Soil and Distributor Details</h3>
      
      <form onSubmit={handleSubmit} className="admin-form">
        <textarea
          value={soilDetails}
          onChange={(e) => setSoilDetails(e.target.value)}
          placeholder="Enter Soil Details"
          required
          className="admin-textarea"
        />
        <textarea
          value={distributorDetails}
          onChange={(e) => setDistributorDetails(e.target.value)}
          placeholder="Enter Distributor Details"
          required
          className="admin-textarea"
        />
        <button type="submit" className="admin-submit-btn">Post Details</button>
      </form>

      {message && <p 
      style={{
        color: 'white',
        fontSize: '25px',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: '10px',
        padding: '10px',  
      }}
      className="admin-message">{message}</p>}
    </div>
  );
};

export default AdminDashboard;
