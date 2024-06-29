import React from 'react';
import SkillsTable from '../comon/SkillsTable'

const Certificate = () => {
  return (
    <div id='main'>
    <article id="certificate" className="panel">
      <section>
        <header className="quote__school"><u>FORMAÇÃO ACADÊMICA</u></header>
        <p></p>
        <h1 className="quote__course">Licenciatura em Engenharia Civil, <b className="year">2021</b></h1>
        <b className="quote__institute">
          Instituto Superior Politécnico Metropolitano de Angola
          <a href="http://www.imetroangola.com/" target="_blank"> (IMETRO)</a>
        </b>
        <br />
        <b className="quote__engineer quote__line">
          Orientadora de Monografia: Engª._Mestre - CEO Next Building
          <a href="https://www.linkedin.com/in/tatiana-encarna%C3%A7%C3%A3o-engenheiracivil-gerentedeprojectos/" target="_blank">Tatiana da Encarnação Casaca</a>
        </b>
        <div className="row">
          <div className="col-4 col-6-medium col-12-small">
            <a href="https://pedro-pi.s3.us-east-2.amazonaws.com/grad2.jpg" target="_blank" className="image fit">
              <img src="https://pedro-pi.s3.us-east-2.amazonaws.com/grad2.jpg" alt="" />
            </a>
          </div>
          {/* Add other graduation images similarly */}
        </div>
        <header>
          <h1 className="quote__course">Ensino Médio Técnico em Construção Civil - Técnico de Obras, <b className="year">2014</b></h1>
          <b className="quote__institute">
            Instituto Médio Industrial de Luanda
            <a href="#certificate" target="_blank"> (IMIL)</a>
          </b>
          <p className="quote__school"><u>FORMAÇÃO MOTA-ENGIL</u></p>
        </header>
        <div className="row">
          <div className="col-4 col-6-medium col-12-small">
            <a href="https://pedro-pi.s3.us-east-2.amazonaws.com/SAP.jpeg" target="_blank" className="image fit zoomed">
              <img src="https://pedro-pi.s3.us-east-2.amazonaws.com/SAP.jpeg" alt="" />
            </a>
            <p>
              <b>SAP Aprovisionamentos, Logística e Armazém ~ 2023</b>
            </p>
          </div>
          {/* Add other certification images similarly */}
        </div>
      </section>
    </article>
    <SkillsTable />
    <a href="#certificate" className="arrow icon solid fa-arrow-up"></a>
    </div>
  );
};

export default Certificate;
