import React from 'react';

const Home = () => {
  return (
    <article id="home" className="panel intro">
      <header>
        <h1>José Francisco Pedro</h1>
        <br />
        <p className="quote__line">
          <b>Olá sou o
            <a href="#" className="icon solid">ZéPedro,</a>
            licenciado em <a href="#certificate" className="icon solid">Engenharia Civil</a>
            pelo <a href="http://www.imetroangola.com/" target="_blank">IMETRO</a> e
            <a href="https://ambrosiopublicfiles.s3.us-east-2.amazonaws.com/Jose_Pedro_Engineering_Order_Card.jpg " target="_blank"> Membro Associado A3
            </a> da Ordem dos Engenheiros de Angola (OEA). Tenho mais de 3 anos de experiência profissional.
          </b>
        </p>
      </header>
      <a href="#projects" className="jumplink pic">
        <span className="arrow icon solid fa-chevron-right"><span>See my work</span></span>
        <img src="https://pedro-pi.s3.us-east-2.amazonaws.com/me_1.jpg" alt="" />
      </a>
    </article>
  );
};

export default Home;
