import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignupPage from './pages/signuppage';
import LoginPage from './pages/loginpage';
import LandingPage from './pages/landingpage';
import CoursesPage from './pages/CoursesPage';
import CourseDetail from './pages/CourseDetail';
import ResetPassword from './pages/ResetPassword';
import AddCoursePage from './pages/AddCoursePage';
import AdminDashboard from './pages/AdminDashboard'; // if created

import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute'; // create this component
import ManageUsersPage from './pages/manageusers';
import AssignCoursePage from './pages/AssignCoursePage';
import MyCoursesPage from './pages/MyCoursesPage';
import AssignedCoursesPage from './pages/AssignedCoursesPage';
import AdminViewCoursesPage from './pages/AdminViewCoursesPage'; // if created

function App() {
  return (
    <Router>
      <Routes>

        {/* ✅ Public Routes */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* 🔐 Student/Organization Protected Routes */}
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

        {/* ➕ Add Course: Protected for Organization (optional) */}
        <Route path="/courses/add" element={
          <PrivateRoute>
            <AddCoursePage />
          </PrivateRoute>
        } />

        {/* 👑 Admin-only dashboard (Optional) */}
        <Route path="/admin-dashboard" element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } />
        <Route path="/admin/manage-users" element={
  <PrivateRoute>
    <ManageUsersPage />
  </PrivateRoute>
} />
  <Route path ="/admin/assign-course" element={
  <PrivateRoute>
    <AdminRoute>
    <AssignCoursePage />
    </AdminRoute>
  </PrivateRoute>
} />

        <Route path="*" element={<Navigate to="/login" />} />

        <Route path="/my-courses" element={
          <PrivateRoute>
            <MyCoursesPage />
          </PrivateRoute>
        } />
        <Route path="/admin/assigned-courses" element={<AssignedCoursesPage />} />
        <Route path="/admin/view-courses" element={
          <PrivateRoute>
            <AdminRoute>
              <AdminViewCoursesPage />
            </AdminRoute>
          </PrivateRoute>
        } />
        <Route path="/admin/dashboard" element={
          <PrivateRoute>
            <AdminDashboard/>
          </PrivateRoute>
        } />


      </Routes>
    </Router>
  );
}

export default App;
