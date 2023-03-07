
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import SignUpPage from "./components/SignUpPage"
import LoginPage from "./components/LoginPage"
import ItineraryPage from "./components/ItineraryPage"
import HomePage from "./components/HomePage"
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  return (
    <BrowserRouter>
      
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create" element={<ItineraryPage />} />

        </Routes>
     
    </BrowserRouter>
  );
}

export default App;
