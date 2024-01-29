import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Parking from './pages/Parking';
import CarPayment from './pages/CarPayment';
import Carinput from './pages/Carinput';
import './global.css'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/parking" element={<Parking />} />
        <Route path="/parking/carDetails" element={<CarPayment id={0}/>} />
        <Route path="/parking/Register" element={<Carinput />} />
      </Routes>
    </Router>
  );
};


export default App;
