import React from 'react';
import Card from './Card';
import styles from './CardPage.module.css';

const CardEngineer = () => {
  const cardData = {
    name: 'José Francisco Pedro',
    description: 'Associated A3 Member of The Order of Engineers of Angola (OEA). Interested Area: Construction Management.',
    imageUrl: 'https://pedro-pi.s3.us-east-2.amazonaws.com/oea.jpeg'
  };

  return (
    <div className={styles.cardPageContainer}>
      <Card
        name={cardData.name}
        description={cardData.description}
        imageUrl={cardData.imageUrl}
      />
    </div>
  );
};

export default CardEngineer;
