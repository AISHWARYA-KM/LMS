import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignupPage from './pages/signuppage';
import LoginPage from './pages/loginpage';
import LandingPage from './pages/landingpage';
import CoursesPage from './pages/CoursesPage';
import CourseDetail from './pages/CourseDetail';
import PrivateRoute from './components/PrivateRoute'; // Import wrapper
import ResetPassword from './pages/ResetPassword';


function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />


        {/* Protected Routes */}
        <Route path="/landing" element={
          <PrivateRoute>
            <LandingPage />
          </PrivateRoute>
        } />
        <Route path="/courses" element={
          <PrivateRoute>
            <CoursesPage />
          </PrivateRoute>
        } />
        <Route path="/courses/:id" element={
          <PrivateRoute>
            <CourseDetail />
          </PrivateRoute>
        } />
        
      </Routes>
    </Router>
  );
}

export default App;
