const baseUrl = process.env.REACT_APP_BASE_URL;

const config = {
    graduationImagesUrl: `${baseUrl}graduation/`,
    projectsUrl: baseUrl,
    trainingUrl: `${baseUrl}certificates/`,
    projectsDataUrl: `${baseUrl}data/projectsData.json`,
    resumeUrl:"https://pedropublicfiles.s3.us-east-2.amazonaws.com/CV_Jose_Pedro_EN.pdf",
    linkedInUrl: "http://linkedin.com/in/josefpedro/"
};

export default config;
  