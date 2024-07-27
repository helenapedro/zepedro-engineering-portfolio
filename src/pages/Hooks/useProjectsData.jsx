import { useState, useEffect } from 'react';

const useProjectsData = (dataUrl) => {
  const [projects, setProjects] = useState([]);
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
        setProjects(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching projects data:', error);
        setError('Failed to fetch data. Please try again later.');
        setLoading(false);
      });
  }, [dataUrl]);

  return { projects, loading, error };
};

export default useProjectsData;
