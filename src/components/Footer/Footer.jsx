import React from 'react';

const Footer = () => {
  return (
    <div id="footer">
      <ul className="copyright">
        <li>Engº ZéPedro</li>
        <li>
          <a href="tel:+244947462094" className="icon solid fa-phone"></a>
        </li>
          <li>
            <a 
              href="http://linkedin.com/in/josefpedro/" 
              target="_blank" 
              rel="noreferrer" 
              class="icon brands fa-linkedin">
            </a>
          </li>
          <li><a href="mailto:jose.pedro7@outlook.com" className="icon solid fa-envelope"></a></li>
          <li>
            <a 
              href="https://pedropublicfiles.s3.us-east-2.amazonaws.com/CV_Jose+Pedro+REV.21+Foto+ENG.pdf" 
              target="_blank"
              rel="noreferrer"
              className="icon solid fa-file">
            </a>
          </li>
      </ul>
    </div>
  );
};

export default Footer;
