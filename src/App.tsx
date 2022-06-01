import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'dotenv';

import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { config } from './database/index';

import AuthRoute, { VerifyLogin } from './contexts/auth';
import { HeaderService } from './contexts/header';
import { RegisterService } from './contexts/register';

import { Header } from './components/header';
import { Home } from './views/user/home';
import { Dashboard } from './views/user/dashboard';
import { UserConfig } from './views/user/config';

import { Login } from './views/public/login';
import { Register } from './views/public/register';
import { ForgotPassword } from './views/public/forgotPassword';
import { Error404 } from './views/public/error';
import { Footer } from './views/footer';

const app = initializeApp(config.firebaseConfig);
export const db = getFirestore(app);
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export function App() {

  const auth = getAuth();

  const [verifyUser, setVerifyUser] = useState<boolean>();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setVerifyUser(true);
    } else {
      setVerifyUser(false);
    }
  });

  return (


    <BrowserRouter>
      {/* <StateUserService> */}
      <Routes>

        <Route path='*' element={<Error404 />} />

        {verifyUser ?

          <>
            <Route
              path={import.meta.env.VITE_HOME}
              element={
                <AuthRoute>

                  <>
                    <HeaderService>
                      <Header />
                    </HeaderService>

                    <Home />
                  </>

                </AuthRoute>
              }
            />

            <Route
              path={import.meta.env.VITE_USER_DASHBOARD}
              element={
                <AuthRoute>

                  <>
                    <HeaderService>
                      <Header />
                    </HeaderService>

                    <Dashboard />
                  </>

                </AuthRoute>
              }
            />

            <Route
              path={import.meta.env.VITE_USER_CONFIG}
              element={
                <AuthRoute>

                  <>
                    <HeaderService>
                      <Header />
                    </HeaderService>

                    <UserConfig/>
                  </>

                </AuthRoute>
              }
            />

          </>

          :

          <>

            <Route
              path={import.meta.env.VITE_USER_LOGIN}
              element={<Login />}
            />

            <Route
              path={import.meta.env.VITE_REGISTER}
              element={
                <RegisterService>
                  <Register />
                </RegisterService>
              }
            />

            <Route
              path={import.meta.env.VITE_FORGOT_PASSWORD}
              element={<ForgotPassword />}
            />

          </>

        }

      </Routes>
      <Footer />
      {/* </StateUserService> */}
    </BrowserRouter>
  )
}
export default App;