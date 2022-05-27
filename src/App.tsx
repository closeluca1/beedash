import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'dotenv';

import { initializeApp } from 'firebase/app';
import { config } from './database/index';

import AuthRoute from './contexts/auth';
import {HeaderService} from './contexts/header';

import { Home } from './views/public/home';
import { Login } from './views/public/login';
import { Dashboard } from './views/user/dashboard';
import { Header } from './components/header';



export const db = initializeApp(config.firebaseConfig);


export function App() {
  return (
    <BrowserRouter>
      
      <HeaderService>
        <Header/>
      </HeaderService>

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