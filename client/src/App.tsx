import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { UtilsProvider } from './Context/utilsContext';
import { AuthProvider } from './Context/authContext';
import Home from './Components/Home';


const App: React.FC = () => {
  return (
    <>
      <title>MindScribe</title>
      <AuthProvider>
        <UtilsProvider>
          <BrowserRouter>
            <Routes>
              <Route path = '/' element = {<Home/>}> </Route>
            </Routes>
          </BrowserRouter>
        </UtilsProvider>
      </AuthProvider>
    </>
  );
}

export default App;