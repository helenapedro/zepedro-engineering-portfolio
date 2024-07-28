import { useState, useEffect } from 'react';

const useData = (dataUrl) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(dataUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(`Failed to fetch data: ${error.message}`);
        setLoading(false);
      });
  }, [dataUrl]);

  return { data, loading, error };
};

export default useData;
