import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Owners from './pages/Owners';
import Patients from './pages/Patients';
import OwnerCreate from './pages/OwnerCreate';
import OwnerEdit from './pages/OwnerEdit';
import OwnerDelete from './pages/OwnerDelete';
import OwnerDetail from './components/owners/OwnerDetail';
import PatientCreate from './pages/PatientCreate';
import PatientEdit from './pages/PatientEdit';
import PatientDelete from './pages/PatientDelete';
import PatientDetail from './components/patients/PatientDetail';
import useAuth from './hooks/useAuth';

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" />;
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/login" element={<Login />} />

      {/* Accueil */}
      <Route path="/" element={
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      } />

      {/* PROPRIÉTAIRES */}
      <Route path="/owners" element={
        <PrivateRoute allowedRoles={['admin', 'receptionist', 'vet']}>
          <Owners />
        </PrivateRoute>
      } />
      <Route path="/owners/new" element={
        <PrivateRoute allowedRoles={['admin', 'receptionist']}>
          <OwnerCreate />
        </PrivateRoute>
      } />
      <Route path="/owners/edit/:id" element={
        <PrivateRoute allowedRoles={['admin', 'receptionist']}>
          <OwnerEdit />
        </PrivateRoute>
      } />
      <Route path="/owners/delete/:id" element={
        <PrivateRoute allowedRoles={['admin', 'receptionist']}>
          <OwnerDelete />
        </PrivateRoute>
      } />
      <Route path="/owners/:id" element={
        <PrivateRoute allowedRoles={['admin', 'receptionist', 'vet']}>
          <OwnerDetail />
        </PrivateRoute>
      } />

      {/* PATIENTS */}
      <Route path="/patients" element={
        <PrivateRoute allowedRoles={['admin', 'receptionist', 'vet']}>
          <Patients />
        </PrivateRoute>
      } />
      <Route path="/patients/new" element={
        <PrivateRoute allowedRoles={['vet']}>
          <PatientCreate />
        </PrivateRoute>
      } />
      <Route path="/patients/edit/:id" element={
        <PrivateRoute allowedRoles={['vet']}>
          <PatientEdit />
        </PrivateRoute>
      } />
      <Route path="/patients/delete/:id" element={
        <PrivateRoute allowedRoles={['vet']}>
          <PatientDelete />
        </PrivateRoute>
      } />
      <Route path="/patients/:id" element={
        <PrivateRoute allowedRoles={['admin', 'receptionist', 'vet']}>
          <PatientDetail />
        </PrivateRoute>
      } />
    </Routes>
  );
}

export default AppRoutes;
