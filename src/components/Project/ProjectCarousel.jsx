import React, { useState } from 'react';
import Slider from 'react-slick';
import * as iconsfa from 'react-icons/fa';
import imagestyles from '../ui/Image.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ProjectCarousel = ({ images, title, onImageClick }) => {
     const [activeSlide, setActiveSlide] = useState(0);

     const PrevArrow = ({ onClick }) => (
          <div className={imagestyles.customArrow} style={{ left: '10px' }} onClick={onClick}>
               <iconsfa.FaChevronLeft size={24} />
          </div>
     );

     const NextArrow = ({ onClick }) => (
          <div className={imagestyles.customArrow} style={{ right: '10px' }} onClick={onClick}>
               <iconsfa.FaChevronRight size={24} />
          </div>
     );

     return (
          <div>
               <Slider
                    dots={false}
                    infinite={false}
                    speed={500}
                    slidesToShow={1}
                    slidesToScroll={1}
                    autoplay={false}
                    prevArrow={<PrevArrow />}
                    nextArrow={<NextArrow />}
                    afterChange={(current) => setActiveSlide(current)}
                    className={imagestyles.imageCarousel}
               >
                    {images.map((image, index) => (
                         <div key={index} onClick={() => onImageClick(image)}>
                              <img
                                   src={image.startsWith('http') ? image : `${process.env.REACT_APP_BASE_URL}${image}`}
                                   alt={`${title} image ${index + 1}`}
                                   className={imagestyles.imageContainer}
                                   style={{ width: '100%', height: 'auto', cursor: 'pointer' }}
                              />
                         </div>
                    ))}
               </Slider>

               <div className={imagestyles.slideCounter}>
                    {activeSlide + 1} / {images.length}
               </div>

               <div className={imagestyles.thumbnailContainer}>
                    {images.map((image, index) => (
                         <div
                              key={index}
                              className={`${imagestyles.thumbnail} ${index === activeSlide ? imagestyles.activeThumbnail : ''}`}
                              onClick={() => setActiveSlide(index)}
                         >
                              <img
                                   src={image.startsWith('http') ? image : `${process.env.REACT_APP_BASE_URL}${image}`}
                                   alt={`Thumbnail ${index + 1}`}
                                   style={{ width: '60px', height: '40px', objectFit: 'cover' }}
                              />
                         </div>
                    ))}
               </div>
          </div>
     );
};

export default ProjectCarousel;
