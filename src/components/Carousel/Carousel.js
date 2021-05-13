import React, { useState } from 'react';
import cheetahImage from '../../assets/images/cheetah.jpg';
import coralImage from '../../assets/images/coral.jpg';
import geeseImage from '../../assets/images/geese.jpg';
import hikingImage from '../../assets/images/hiking.jpg';
import orchidsImage from '../../assets/images/orchids.jpg';
import waspImage from '../../assets/images/wasp.jpg';

import './Carousel.css';

const Carousel = () => {
  const elements = [
    cheetahImage,
    coralImage,
    geeseImage,
    geeseImage,
    hikingImage,
    orchidsImage,
    waspImage,
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [data, setElements] = useState([
    { offset: 0, index: elements.length - 1 },
    { offset: 1, index: currentIndex },
    { offset: 2, index: currentIndex + 1 },
    { offset: 3, index: currentIndex + 2 },
  ]);

  const images = data.map((element) => (
    <img
      key={element.index}
      src={elements[element.index]}
      style={{ left: `${element.offset * 512}px` }}
      alt={`${elements[element.index]}`}
      className="carousel-item"
    />
  ));

  const next = () => {
    let mass = [...data];
    mass.forEach((element) => {
      element.offset -= 1;
    });
    setElements(mass);
    /*setElements([
      { offset: currentOffset - 1, index: elements.length - 1 },
      { offset: currentOffset, index: 0 },
      { offset: currentOffset + 1, index: 1 },
      { offset: currentOffset + 2, index: 2 },
    ]); */
    setTimeout(() => {
      let mass1 = [...data];
      mass1.forEach((element) => {
        if (index === 6) {
          element.index = 0;
        } else {
          element.index += 1;
        }
      });
      console.log(data);
      setElements(mass1);
      console.log(data);
      /* setElements([
        { offset: currentOffset, index: 0 },
        { offset: currentOffset + 1, index: 1 },
        { offset: currentOffset + 2, index: 2 },
        { offset: currentOffset + 3, index: 3 },
      ]); */
    }, 1000);
  };

  return (
    <>
      <div className="carousel">{images}</div>
      <div className="button-container">
        <button type="button" className="prev-image" onClick={next}>
          &lt;
        </button>
        <button type="button" className="next-image" onClick={next}>
          &gt;
        </button>
      </div>
    </>
  );

  /* const [position, setPosition] = useState(10);

  const nextImage = () => {
    if (position === -1190) {
      setPosition(10);
    } else {
      setPosition((p) => p - 400);
    }
  };
  const prevImage = () => {
    if (position === 10) {
      setPosition(-1190);
    } else {
      setPosition((p) => p + 400);
    }
  }; 

  return (
    <div className="carousel-container">
      <div className="carousel">
        <div className="carousel-row" style={{ left: `${position}px` }}>
          <img src={cheetahImage} alt="cheetah" />
          <img src={coralImage} alt="coral" />
          <img src={geeseImage} alt="geese" />
          <img src={hikingImage} alt="hiking" />
          <img src={orchidsImage} alt="orchids" />
          <img src={waspImage} alt="wasp" />
        </div>
      </div>
      <div className="button-container">
        <button type="button" className="prev-image" onClick={prevImage}>
          &lt;
        </button>
        <button type="button" className="next-image" onClick={nextImage}>
          &gt;
        </button>
      </div>
    </div>
  ); */
};

export default Carousel;
