import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// 🔐 Auth Pages
import SignupPage from './pages/signuppage';
import LoginPage from './pages/loginpage';
import ResetPassword from './pages/ResetPassword';

// 🎓 Student/Organization Shared
import LandingPage from './pages/landingpage';
import CoursesPage from './pages/CoursesPage';
import CourseDetail from './pages/CourseDetail';
import AddCoursePage from './pages/AddCoursePage';
import MyCoursesPage from './pages/MyCoursesPage';
import AssignedCoursesPage from './pages/AssignedCoursesPage';

// 👑 Admin Pages
import AdminDashboard from './pages/AdminDashboard';
import ManageUsersPage from './pages/manageusers';
import AssignCoursePage from './pages/AssignCoursePage';
import AdminViewCoursesPage from './pages/AdminViewCoursesPage';
import CreateOrganizationUserPage from './pages/org/CreateOrganizationUserPage';

// 🏢 Organization Pages
import OrganizationDashboard from './pages/org/OrganizationDashboard';
import CreateBatchForm from './pages/org/CreateBatchForm';
import ListBatches from './pages/org/ListBatches';
import AssignUserToBatch from './pages/org/AssignUserToBatch';
import AssignCourseToBatch from './pages/org/AssignCourseToBatch';
import ListBatchCourses from './pages/org/ListBatchCourses';
import RemoveCourseFromBatch from './pages/org/RemoveCourseFromBatch';
import RemoveUserFromBatch from './pages/org/RemoveUserFromBatch';
import OrganizationAddCoursePage from './pages/org/OrganizationAddCoursePage';
import OrganizationCreateUserPage from './pages/org/OrganizationCreateUserPage';
import ViewUsersInAllBatches from './pages/org/ViewUsersInBatch';


// 🔐 Route Protection
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import OrganizationRoute from './components/OrganizationRoute';

function App() {
  return (
    <Router>
      <Routes>

        {/* 🔓 Public Routes */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* 🔐 Student/Organization Shared */}
        <Route path="/landing" element={<PrivateRoute><LandingPage /></PrivateRoute>} />
        <Route path="/courses" element={<PrivateRoute><CoursesPage /></PrivateRoute>} />
        <Route path="/courses/:id" element={<PrivateRoute><CourseDetail /></PrivateRoute>} />
        <Route path="/courses/add" element={<PrivateRoute><AddCoursePage /></PrivateRoute>} />
        <Route path="/my-courses" element={<PrivateRoute><MyCoursesPage /></PrivateRoute>} />

        {/* 👑 Admin-only */}
        <Route path="/admin/dashboard" element={<PrivateRoute><AdminRoute><AdminDashboard /></AdminRoute></PrivateRoute>} />
        <Route path="/admin/manage-users" element={<PrivateRoute><AdminRoute><ManageUsersPage /></AdminRoute></PrivateRoute>} />
        <Route path="/admin/assign-course" element={<PrivateRoute><AdminRoute><AssignCoursePage /></AdminRoute></PrivateRoute>} />
        <Route path="/admin/view-courses" element={<PrivateRoute><AdminRoute><AdminViewCoursesPage /></AdminRoute></PrivateRoute>} />
        <Route path="/admin/assigned-courses" element={<PrivateRoute><AdminRoute><AssignedCoursesPage /></AdminRoute></PrivateRoute>} />
        <Route path="/admin/create-organization" element={<PrivateRoute><AdminRoute><CreateOrganizationUserPage /></AdminRoute></PrivateRoute>} />

        {/* 🏢 Organization-only */}
        <Route path="/organization/dashboard" element={<PrivateRoute><OrganizationRoute><OrganizationDashboard /></OrganizationRoute></PrivateRoute>} />
        <Route path="/org/batches/create" element={<PrivateRoute><OrganizationRoute><CreateBatchForm /></OrganizationRoute></PrivateRoute>} />
        <Route path="/org/batches" element={<PrivateRoute><OrganizationRoute><ListBatches /></OrganizationRoute></PrivateRoute>} />
        <Route path="/org/assign-user"element={<PrivateRoute><OrganizationRoute><AssignUserToBatch /></OrganizationRoute></PrivateRoute>}/>

        <Route path="/org/assign-course" element={<PrivateRoute><OrganizationRoute><AssignCourseToBatch /></OrganizationRoute></PrivateRoute>} />
        <Route path="/org/batches-with-courses" element={<PrivateRoute><OrganizationRoute><ListBatchCourses /></OrganizationRoute></PrivateRoute>} />
        <Route path="/org/view-batch-users" element={<ViewUsersInAllBatches />} />
        <Route path="/org/remove-course" element={<PrivateRoute><OrganizationRoute><RemoveCourseFromBatch /></OrganizationRoute></PrivateRoute>} />
        <Route path="/org/remove-user" element={<PrivateRoute><OrganizationRoute><RemoveUserFromBatch /></OrganizationRoute></PrivateRoute>} />
        <Route path="/organization/add-course" element={<PrivateRoute><OrganizationRoute><OrganizationAddCoursePage /></OrganizationRoute></PrivateRoute>} />
        <Route path="/organization/create-user" element={<PrivateRoute><OrganizationRoute><OrganizationCreateUserPage /></OrganizationRoute></PrivateRoute>} />


        {/* 🚫 Catch All */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
