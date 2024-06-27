import React from 'react';

const Home = () => {
  return (
    <div id="main">
      <article id="home" class="panel intro">
        <header>
				  <h1>José Francisco Pedro</h1>
          <p>
            <b>
              With over 3 years of experience in Construction Management, 
              I’ve contributed to significant projects, 
              including the intervention on Cabinda province’s main airstrip 
              and the creation of an alternative route connecting to Cabassango.
              My passion lies in designing and optimizing urban infrastructure, 
              and I thrive on collaborative efforts that strengthen operational ties. 
              Let’s connect and explore exciting opportunities together!
            </b>
          </p>
			  </header>
			  <a href="#work" class="jumplink pic">
				  <span class="arrow icon solid fa-chevron-right"><span>See my work</span></span>
				  <img src="https://pedro-pi.s3.us-east-2.amazonaws.com/me_1.jpg" alt="" />
			  </a>
		  </article>
    </div>
  );
};

export default Home;
