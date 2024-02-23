import React, { useEffect, useState } from "react";
import "./Carousel.css";
import { CarouselImages } from "../data";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animation, setAnimation] = useState("");

  const nextSlide = () => {
    setAnimation("slide-out");
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === CarouselImages.length - 1 ? 0 : prevIndex + 1
      );
      setAnimation("slide-in");
    }, 500); // Wait for slide-out animation to complete
  };

  const prevSlide = () => {
    setAnimation("slide-out");
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? CarouselImages.length - 1 : prevIndex - 1
      );
      setAnimation("slide-in");
    }, 500); // Wait for slide-out animation to complete
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // Automatically advance slide every 3 seconds
    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []); // Run effect only once on component mount

  return (
    <div className="carousel">
      <button className="btn prev" onClick={prevSlide}>
        &#10094;
      </button>
      <div className="slides">
        <div className={`slide ${animation}`}>
          <img
            src={CarouselImages[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
          />
        </div>
      </div>
      <button className="btn next" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};

export default Carousel;
