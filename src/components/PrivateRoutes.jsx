import React from 'react'
import { useMyContext } from '../App';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import Cars from './admins/Cars';
import Admin from './admins/Admin';
import User from './users/Home'
import LayoutUser from './layouts/LayoutUser';

const PrivateRoutes = () => {
    const { statusLogin } = useMyContext();

  return (
    <>
            {statusLogin == 0 && (
          <Routes>
            <Route path="/admin" element={<Layout />}>
              <Route index element={<Admin />} />
              <Route path="/admin/cars" element={<Cars />} />
            </Route>
            <Route path="/" element={<Navigate to="/admin" />} />
            <Route path="*" element={<Navigate to="/admin" />} />
          </Routes>
        )}

{statusLogin == 1 && (
          <Routes>
            <Route path="/user" element={<LayoutUser />}>
              <Route index element={<User />} />
            </Route>
            <Route path="/" element={<Navigate to="/user" />} />
            <Route path="*" element={<Navigate to="/user" />} />
          </Routes>
        )}
    </>
  )
}

export default PrivateRoutes