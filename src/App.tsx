import React, { useState } from 'react';
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
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export function App() {

  const auth = getAuth();

  const [verifyUser, setVerifyUser] = useState<boolean>();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      setVerifyUser(true)
      // ...
    } else {
      // User is signed out
      // ...
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

          </>

        }

      </Routes>
      {/* </StateUserService> */}
    </BrowserRouter>
  )
}
export default App;