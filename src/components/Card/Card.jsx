import React from 'react';

const Card = () => {
  return (
    <div id='main'>
      <article className="panel intro">
      <header>
        <h1>José Francisco Pedro</h1>
        <p>
          <b>
            <a href="#card" className="icon solid">Interested Area:</a> Construction Management.
          </b>
        </p>
      </header>
      <a
        href="https://ambrosiopublicfiles.s3.us-east-2.amazonaws.com/Jose_Pedro_Engineering_Order_Card.jpg"
        target="_blank"
        rel="noreferrer"
        className="col-2 col-3-medium col-10-small image fit"
      >
        <span className="arrow icon solid fa-chevron-right">
          <span><i>Associated A3  Member of The Order of Engineers of Angola (OEA)</i></span>
        </span>
        <img src="https://pedro-pi.s3.us-east-2.amazonaws.com/oea.jpeg" alt="Cartão de Membro" />
      </a>
    </article>
    </div>
  );
};

export default Card;
