import React from 'react';

const Project = ({ title, organization, description, activities, finalDescription, images }) => {
  return (
    <article className="panel">
      <header>
        {title && <h2 className="quote__title">{title}</h2>}
        {organization && <i className="quote__organization">{organization}</i>}
      </header>
      {description && <p className="quote__line"><b>{description}</b></p>}
      {activities.length > 0 && (
        <ul className="list list--tick">
          {activities.map((activity, index) => (
            <li className="list__item" key={index}>{activity}</li>
          ))}
        </ul>
      )}
      {finalDescription && <p className="quote__line"><b>{finalDescription}</b></p>}
      {images.length > 0 && (
        <section>
          <div className="row">
            {images.map((image, index) => (
              <div className="col-4 col-6-medium col-12-small" key={index}>
                <a className="image fit zoomed"><img src={image} alt="" /></a>
              </div>
            ))}
          </div>
        </section>
      )}
      {/* <a href="#projects" className="arrow icon solid fa-arrow-up"></a> */}
    </article>
  );
};

export default Project;
