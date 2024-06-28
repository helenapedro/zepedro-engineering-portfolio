import React from 'react';

const Project = ({ title, organization, description, activities, finalDescription, images }) => {
  return (
    <article id="projects" className="panel">
      <header>
        <h2 className="quote__title">{title}</h2>
        <i className="quote__organization">{organization}</i>
      </header>
      <p className="quote__line">
        <b>{description}</b>
        <ul className="list list--tick">
          {activities.map((activity, index) => (
            <li className="list__item" key={index}>{activity}</li>
          ))}
        </ul>
        <b>{finalDescription}</b>
      </p>
      <section>
        <div className="row">
          {images.map((image, index) => (
            <div className="col-4 col-6-medium col-12-small" key={index}>
              <a className="image fit zoomed"><img src={image} alt="" /></a>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
};

export default Project;
