import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import imagestyles from '../../components/ui/Image.module.css';

interface ProjectCarouselProps {
     images: string[];
     title: string;
     onImageClick: (image: string) => void;
}

<<<<<<< HEAD:src/components/project/ProjectCarousel.tsx
const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ images, title, onImageClick }) => {
     const [activeSlide, setActiveSlide] = useState<number>(0);
     const [hovered, setHovered] = useState<number | null>(null);

     const PrevArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
          <div className={imagestyles.customArrow} style={{ left: '10px' }} onClick={onClick}>
               <iconsfa.FaChevronLeft size={24} />
          </div>
     );

     const NextArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
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
                    afterChange={(current: number) => setActiveSlide(current)}
=======
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
>>>>>>> c9aebd1bef2f2937159333f4f6d04e981192f8b3:src/components/Project/ProjectCarousel.jsx
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
