import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import NavBar from './components/NavBar';
import Home from './components/Home';
import Projects from './components/Projects';
import Card from './components/Card';
import NotFound from './components/NotFound';
import Footer from './components/Footer';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Certificate from './components/Certificate';

const App = () => {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/card" element={<Card />} />
          <Route path="/certificate" element={<Certificate />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
