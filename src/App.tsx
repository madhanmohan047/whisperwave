import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import BreakPointProvider from "./hooks/BreakPointProvider";
import FireBaseProvider from "./hooks/FireBaseProvider";
import AuthProvider from "./hooks/AuthProvider";
import PrivateRoute from "./router/route/PrivateRoute";
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import themes from './config/branding-config';
import './App.css';

const theme = createTheme(themes.whisperwave);

function App() {

  return (
    <ThemeProvider theme={theme}>
      <div className='app'>
        <BrowserRouter>
          <BreakPointProvider>
            <FireBaseProvider>
              <AuthProvider>
                <Routes>
                  <Route path='/signin'
                    element={<SignIn />} />
                  <Route path='/signup'
                    element={<SignUp />} />
                  <Route element={<PrivateRoute />}>
                    <Route path='/'
                      element={<Dashboard />} />
                    <Route path='/dashboard'
                    element={<Dashboard />} />
                  </Route>
                </Routes>
              </AuthProvider>
            </FireBaseProvider>
          </BreakPointProvider>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
