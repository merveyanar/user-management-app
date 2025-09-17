import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Giris';
import UserList from './components/UserList';
import PrivateRoute from './PrivateRoute';
import ChangePasswordForm from './components/ChangePasswordForm';
import Profile from './components/Profile';
import ProfileDetail from './components/ProfileDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/change" element={<ChangePasswordForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:id" element={<ProfileDetail />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <UserList />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
