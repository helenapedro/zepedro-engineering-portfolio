import React from 'react';

const Card = () => {
  return (
    <article id="card" className="panel intro">
      <header>
        <h1>José Francisco Pedro</h1>
        <p>
          <b>
            <a href="#card" className="icon solid">Objectivo: </a>Produção (Direcção de obra)
            | Gestão de Projectos.
          </b>
        </p>
      </header>
      <a
        href="https://ambrosiopublicfiles.s3.us-east-2.amazonaws.com/Jose_Pedro_Engineering_Order_Card.jpg"
        target="_blank"
        rel="noreferrer"
        className="col-2 col-3-medium col-10-small image fit"
      >
        <span className="arrow icon solid fa-chevron-right"><span><i>Cartão de Membro</i></span></span>
        <img src="https://pedro-pi.s3.us-east-2.amazonaws.com/oea.jpeg" alt="" />
      </a>
    </article>
  );
};

export default Card;
