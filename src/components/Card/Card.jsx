import React from 'react';
import PropTypes from 'prop-types';
import styles from './Card.module.css';

const Card = ({ name, description, imageUrl }) => {
  return (
    <div className={styles.cardContainer}>
      <article className={`${styles.panel} ${styles.introPanel}`}>
        <header className={styles.header}>
          <h1 className={styles.title}>{name}</h1>
          <p className={styles.description}>{description}</p>
        </header>
        <div className={`${styles.imageWrapper} ${styles.fitImage}`}>
          <img src={imageUrl} alt={`${name} image`} className={styles.image} />
        </div>
      </article>
    </div>
  );
};

Card.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default Card;
