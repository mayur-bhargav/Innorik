import React, { useState } from 'react';
import '../App.css'; // Import your CSS file for styling

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="image-carousel">
      <button className='butt' onClick={prevSlide}>&lt;</button>
      <img className='imag' src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
      <button className='butt1' onClick={nextSlide}>&gt;</button>
    </div>
  );
};

export default ImageCarousel;
