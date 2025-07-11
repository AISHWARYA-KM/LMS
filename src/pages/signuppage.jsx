import SignupForm from '../components/signupform';
import '../styles/authpage.css';
import signup from '../assets/signup.png';

function SignupPage() {
  return (
    <div className="signup-container">
      <div className="form-section">
        <SignupForm />
      </div>
      <div className="info-section">
        <h1>Welcome to NammaQa Learning Management System</h1>
        <img
          src={signup}
          alt="student"
          className="info-image"
        />
      </div>
    </div>
  );
}

export default SignupPage;
