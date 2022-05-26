import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'dotenv';

import AuthRoute from './contexts/auth';

import { Home } from './views/public/home';
import { Login } from './views/public/login';
import { Dashboard } from './views/user/dashboard';

import { initializeApp } from 'firebase/app';
import { config } from './database/index';

export const db = initializeApp(config.firebaseConfig);

export function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route 
          path={import.meta.env.VITE_HOME} 
          element={<Home/>}
        />

        <Route 
          path={import.meta.env.VITE_USER_LOGIN} 
          element={<Login/>}
        />

        <Route
          path={import.meta.env.VITE_USER_DASHBOARD}
          element={
            <AuthRoute>
              <Dashboard/>
            </AuthRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App;