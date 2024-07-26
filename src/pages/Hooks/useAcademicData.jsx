import {useState, useEffect} from 'react';
import '../../data/academicData.json'

const useAcademicData = () => {
     const [academic, setAcademic] = useState([]);
     const [error, setError] = useState(null)

     useEffect(() => {
          const dataUrl = process.env.REACT_APP_ACADEMIC_DATA_URL;

          fetch(dataUrl)
          .then((response) => {
               if (!response.ok) {
                    throw new Error('Network response was not ok');
               }
               return response.json();
          })
          .then((data) => {
               setAcademic(data);
          })
          .catch((error) => {
          console.error('Error fetching data:', error);
          setError('Failed to fetch data. Please try again later.');
     });
  }, []); 

  return { academic, error }; 
};

export default useAcademicData;