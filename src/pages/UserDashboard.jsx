import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import '../App.css';

const UserDashboard = () => {
  const [soilDetailsList, setSoilDetailsList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch soil details from Firestore
    const fetchSoilDetails = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'soils'));
        const soilDetailsArray = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          const timestamp = data.timestamp
            ? new Date(data.timestamp.seconds * 1000).toLocaleString()
            : 'No timestamp available';
          return {
            ...data,
            timestamp,
          };
        });
        setSoilDetailsList(soilDetailsArray);
      } catch (error) {
        console.error('Error fetching soil details:', error);
      }
    };

    fetchSoilDetails();
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      navigate('/');
    }
  };

  return (
    <div className="user-dashboard">
      {/* Logout Button with Confirmation */}
      <button className="logout-button" onClick={handleLogout}>
        Log Out
      </button>

      <h2>Soil and Distributor Details</h2>

      {/* Table Format for Displaying Data */}
      {soilDetailsList.length > 0 ? (
        <table className="data-table">
          <thead>
            <tr>
              <th>Soil Details</th>
              <th>Distributor Details</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {soilDetailsList.map((item, index) => (
              <tr key={index}>
                <td>{item.soilDetails || 'N/A'}</td>
                <td>{item.distributorDetails || 'N/A'}</td>
                <td>{item.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No soil details available.</p>
      )}
    </div>
  );
};

export default UserDashboard;
