import React from 'react';
import { Link } from 'react-router-dom';
import Styles from '../pages/About/About.module.css'

const NotFound = () => {
  return (
    <div id='main' className={Styles.panel}> 
      <div className={Styles.name}>
        <h2 >Page Not Found</h2>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Link to="/">
          Home Page
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
