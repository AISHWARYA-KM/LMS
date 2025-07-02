import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from './pages/signuppage';
import LoginPage from './pages/loginpage';
import LandingPage from './pages/landingpage';
import CoursesPage from './pages/CoursesPage';
import CourseDetail from './pages/CourseDetail';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
