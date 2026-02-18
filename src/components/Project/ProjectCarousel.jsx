import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import imagestyles from '../../components/ui/Image.module.css';

const ProjectCarousel = ({ images, title, onImageClick }) => {
     const [activeSlide, setActiveSlide] = useState(0);
     const [hovered, setHovered] = useState(null);

     return (
          <div>
               <Carousel
                    interval={null}
                    controls
                    indicators={false}
                    onSelect={(selectedIndex) => setActiveSlide(selectedIndex)}
                    prevIcon={
                         <div className={imagestyles.customArrow} style={{ left: '10px' }}>
                              <FaChevronLeft size={24} />
                         </div>
                    }
                    nextIcon={
                         <div className={imagestyles.customArrow} style={{ right: '10px' }}>
                              <FaChevronRight size={24} />
                         </div>
                    }
                    className={imagestyles.imageCarousel}
               >
                    {images.map((image, index) => (
                         <Carousel.Item key={index}>
                              <div
                                   className={imagestyles.imageWrapper}
                                   onMouseEnter={() => setHovered(index)}
                                   onMouseLeave={() => setHovered(null)}
                                   onClick={() => onImageClick(image)}
                              >
                                   <img
                                        src={image.startsWith('http') ? image : `${process.env.REACT_APP_BASE_URL}${image}`}
                                        alt={`${title} ${index + 1}`}
                                        className={imagestyles.imageContainer}
                                   />
                                   {hovered === index && <div className={imagestyles.viewImageOverlay}>View Image</div>}
                              </div>
                         </Carousel.Item>
                    ))}
               </Carousel>

               <div className={imagestyles.slideCounter}>
                    {activeSlide + 1} / {images.length}
               </div>
          </div>
     );
};

export default ProjectCarousel;
