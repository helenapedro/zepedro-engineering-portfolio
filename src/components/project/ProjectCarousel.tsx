import React, { useState } from 'react';
import Slider from 'react-slick';
import * as iconsfa from 'react-icons/fa';
import imagestyles from '../../components/ui/Image.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface ProjectCarouselProps {
     images: string[];
     title: string;
     onImageClick: (image: string) => void;
}

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
                    className={imagestyles.imageCarousel}
               >
                    {images.map((image, index) => (
                         <div
                              key={index}
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
                    ))}
               </Slider>

               <div className={imagestyles.slideCounter}>
                    {activeSlide + 1} / {images.length}
               </div>
          </div>
     );
};

export default ProjectCarousel;
