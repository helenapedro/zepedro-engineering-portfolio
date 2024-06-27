import React from 'react';

const Projects = () => {
  return (
    <article id="projects" className="panel">
      <header>
        <h2 className="quote__title">Reabilitação da Pista do Pavimento do Aeroporto Maria Mambo Café - Cabinda ~ 2023</h2>
        <i className="quote__organization">MOTA-ENGIL ANGOLA</i>
      </header>
      <p className="quote__line">
        <b>
          O projecto envolveu a intervenção na pista do principal aeródromo da província de Cabinda.
          Visando preservar a economia local e atender às necessidades da população em relação aos serviços de voo,
          as atividades foram desenvolvidas durante o periódo noturno, após o fecho do último serviço,
          entre as <b className="year">00h</b> ás <b className="year">06h</b> da manhã, focando principalmente nas seguintes atividades:
        </b>
        <ul className="list list--tick">
          <li className="list__item">
            Fresagem em 5 cm de espessura, com comprimento total de <b className="year">600</b> metros e <b className="year">16</b> metros de largura respectivamente;
          </li>
          <li className="list__item">
            Recomposição da camada fresada com betuminoso.
          </li>
        </ul>
      </p>
      <section>
        <div className="row">
          <div className="col-4 col-6-medium col-12-small">
            <a className="image fit zoomed"><img src="https://pedro-pi.s3.us-east-2.amazonaws.com/A3.jpg" alt="" /></a>
          </div>
          {/* Add other project images similarly */}
        </div>
      </section>
      <a href="#projects" className="arrow icon solid fa-arrow-up"></a>
    </article>
  );
};

export default Projects;
