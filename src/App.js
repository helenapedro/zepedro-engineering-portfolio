import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import './App.module.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import NotFound from './components/NotFound';
import Footer from './components/Footer/Footer';
import Certificate from './components/Certificate/Certificate';
import ProjectsContainer from './components/Projects/ProjectsContainer';
import AboutMeContainer from './components/About/AboutMeContainer';

// Add Font Awesome icons to the library
library.add(fas, fab);

const App = () => {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsContainer />} />
          <Route path="/card" element={<AboutMeContainer />} />
          <Route path="/certificate" element={<Certificate />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
