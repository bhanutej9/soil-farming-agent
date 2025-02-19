import { useNavigate } from 'react-router-dom';

const ContactDeveloper = () => {
    const navigate = useNavigate();

    return (
        <div className="contact-developer">
            <h1>Contact Developer</h1>
            <br/>
            
            <p><strong>Name:</strong> Bhanuteja RV</p>
            <p><strong>Email:</strong> bhanutejrv@gmail.com</p>
            <p><strong>Phone:</strong> (+91) 8008292499</p>

            <button className="btn-back" onClick={() => navigate('/')}>Back to Home</button>
        </div>
    );
};

export default ContactDeveloper;
