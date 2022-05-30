import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'dotenv';

import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { config } from './database/index';

import AuthRoute, { VerifyLogin } from './contexts/auth';
import { HeaderService } from './contexts/header';
import { RegisterService } from './contexts/register';

import { Home } from './views/user/home';
import { Login } from './views/public/login';
import { Register } from './views/public/register';
import { Dashboard } from './views/user/dashboard';
import { Header } from './components/header';
import { Error404 } from './views/public/error';

const app = initializeApp(config.firebaseConfig);
export const db = getFirestore(app);

export function App() {

  const { login } = VerifyLogin();

  return (


    <BrowserRouter>
      {/* <StateUserService> */}
      <Routes>

        {login ?

          <>
            <Route
              path={import.meta.env.VITE_REGISTER}
              element={
                <RegisterService>
                  <Register />
                </RegisterService>
              }
            />

            <Route
              path={import.meta.env.VITE_USER_LOGIN}
              element={<Login />}
            />
          </>


          :

          <>
            <Route
              path={import.meta.env.VITE_HOME}
              element={
                <AuthRoute>

                  <HeaderService>
                    <Header />
                  </HeaderService>

                  <Home />

                </AuthRoute>
              }
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
          </>


        }

        <Route path='*' element={<Error404 />} />


      </Routes>
      {/* </StateUserService> */}
    </BrowserRouter>
  )
}
export default App;