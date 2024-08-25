import { useState, useEffect } from 'react';

const useProjectDevData = () => {
     const [projects, setProjects] = useState([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);
     
     useEffect(() => {
          fetch('data/projectsData.json')
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
               console.error('Error fetching data:', error);
               setError('Failed to fetch data.');
               setLoading(false);
          });
     }, []);

     return { projects, loading, error };
};

export default useProjectDevData;
