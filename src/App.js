import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import './App.module.css';

import Wrapper from './components/wrapper';
import Main from './components/main';
import NavBar from './pages/NavBar/NavBar';
import Home from './pages/Home/Home';
import ProjectsContainer from './pages/projects/ProjectContainer';
import NotFound from './pages/NotFound';
import Footer from './components/Footer/Footer';
import Certificate from './components/Certificate/Certificate';
import AboutMeContainer from './components/About/AboutMeContainer';

const App = () => {
  return (
    <Router>
      <Wrapper>
        <NavBar />
        <Main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<ProjectsContainer />} />
            <Route path="/card" element={<AboutMeContainer />} />
            <Route path="/certificate" element={<Certificate />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Main>
        <Footer />
      </Wrapper>
    </Router>
  );
}

export default App;
