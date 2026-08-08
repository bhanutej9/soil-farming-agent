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
          placeholder="Enter Soil or Crop Details"
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

/*✅ Purpose of This Page

This is an Admin Dashboard that allows the admin to:

Post soil and distributor details to Firestore (Firebase)

Log out securely with confirmation

🔍 Key Functionalities Implemented

1. Form Handling with React State

Used useState hooks to manage:

soilDetails – holds the soil/crop information

distributorDetails – holds distributor information

message – shows success or error messages after submission

2. Submitting Data to Firestore

On form submission (handleSubmit):

Adds a new document to the soils collection in Firestore using addDoc

Each document contains:

soilDetails

distributorDetails

timestamp (current time)

Clears the form and displays a success message

Catches and handles errors

3. Logout Functionality
handleLogout asks for confirmation (window.confirm)

If confirmed, navigates back to the homepage (navigate('/'))

4. User Interface (UI)
Styled using CSS (App.css)

Includes:

A Logout button

A form with two textareas for input

A submit button to post the details

A message section that gives feedback after posting

💡 Technologies Used
React (useState, useNavigate)

Firebase Firestore (addDoc, collection)

Custom CSS (App.css)

React Router (useNavigate for redirecting)

*/