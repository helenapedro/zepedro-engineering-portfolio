import React from 'react';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Projects from './components/Projects';
import Card from './components/Card';
import Certificate from './components/Certificate';
import Footer from './components/Footer';

// Import FontAwesome - using local file
//import './assets/css/fontawesome-all.min.css';

// Or, if you prefer using FontAwesome from node_modules, uncomment the line below and comment the line above
import '@fortawesome/fontawesome-free/css/all.min.css';

import './App.css';

function App() {
  return (
    <div id="app">
      <NavBar />
      <div className="content">
        {/* <Home /> */}
        {/* <Projects />
        <Card />
        <Certificate /> */}
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
