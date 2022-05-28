import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'dotenv';

import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { config } from './database/index';

import AuthRoute, { LoginContext } from './contexts/auth';
import { HeaderService } from './contexts/header';
import { RegisterService } from './contexts/register';

import { Home } from './views/public/home';
import { Login } from './views/public/login';
import { Register } from './views/public/register';
import { Dashboard } from './views/user/dashboard';
import { Header } from './components/header';

const app = initializeApp(config.firebaseConfig);
export const db = getFirestore(app);

export function App() {
  return (
    <BrowserRouter>

      {/* <AuthRoute> */}
      <RegisterService>
      <Routes>
        

        <Route
          path={import.meta.env.VITE_HOME}
          element={<Home />}
        />
        
        

        
        <Route
          path={import.meta.env.VITE_REGISTER}
          element={<Register />}
        />

        <Route
          path={import.meta.env.VITE_USER_LOGIN}
          element={<Login />}
        />

        <Route
          path={import.meta.env.VITE_USER_DASHBOARD}
          element={
            <AuthRoute>
              <HeaderService>
                <Header />
              </HeaderService>
              <Dashboard />
            </AuthRoute>
          }
        />

      </Routes>
      </RegisterService>
      {/* </AuthRoute> */}

    </BrowserRouter>
  )
}

export default App;