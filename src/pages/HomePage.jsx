import { useNavigate } from 'react-router-dom';
import '../App.css';

const HomePage = () => {
    const navigate = useNavigate();
  
    return (
      <div className="home-page">
        <div className="rain-container">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="rain"></div>
          ))}
        </div>

        {/* Contact Developer Button */}
        <div className="top-left">
          <button className="btn-contact" onClick={() => navigate('/contact-developer')}>
            Contact Developer
          </button>
        </div>

        <div className="navbar">
          <button className="btn-admin" onClick={() => navigate('/admin-login')}>Admin</button>
        </div>

        <h1 className="home-header">Soil and Crop Management System</h1>

        <p className="home-paragraph">
          Soil plays a vital role in agriculture, serving as the foundation for healthy crops. 
          Different types of soil possess unique characteristics, and each crop thrives best in a 
          specific soil type. Understanding these soil properties is essential for making informed 
          farming decisions.
          <br /><br />
          Our platform bridges the gap between farmers and crop distributors 
          by providing accurate and updated soil-related information. The Admin, with the guidance 
          of soil and crop experts, updates crucial details about soil types and recommended crops, 
          as well as a list of trusted seed and crop distributors.
        </p>

        <div>
          <button className="btn-register" onClick={() => navigate('/register')}>Register / Login as User</button>
        </div>
      </div>
    );
};

export default HomePage;
