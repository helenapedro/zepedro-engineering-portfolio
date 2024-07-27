import { useState, useEffect } from 'react';

const useMotaEngilTrainingData = () => {
  const [medata, setMeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const dataUrl = process.env.REACT_APP_ME_TRAINING_DATA_URL;

    fetch(dataUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setMeData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching professional data:', error);
        setError('Failed to fetch professional data. Please try again later.');
        setLoading(false);
      });
  }, []);

  return { medata, loading, error };
};

export default useMotaEngilTrainingData;
