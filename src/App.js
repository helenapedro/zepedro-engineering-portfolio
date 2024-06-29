import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import "./App.module.css"

import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Projects from './components/Project/Projects';
import Card from './components/Card/Card';
import NotFound from './components/NotFound';
import Footer from './components/Footer/Footer';
import Certificate from './components/Certificate/Certificate';

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
