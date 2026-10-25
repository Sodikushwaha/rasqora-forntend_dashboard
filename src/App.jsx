import React from 'react'
import LandingPage from './vendorDashboard/components/pages/LandingPage'
import { Routes,Route } from 'react-router-dom';
import './App.css';
import NotFoundPage from './vendorDashboard/components/NotFoundPage';

export const App = () => {
  return (
    <div>

      <Routes>
        <Route path='/'element = {<LandingPage />}></Route>
        <Route path='/*'element={<NotFoundPage />}></Route>
       </Routes>
    </div>
  )
}

export default App;
