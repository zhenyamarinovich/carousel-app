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
      style={{ left: `${element.offset * 33}vw` }}
      alt={`${elements[element.index]}`}
      className="carousel-item"
    />
  ));


  const next = (e) => {
    e.target.classList.toggle("disable");
    let mass = [...data];
    mass.forEach((element) => {
      element.offset -= 1;
    });
    let index = mass[mass.length-1].index + 1;
    if( index === 6) {
      index = 0;
    }
    mass.push({ offset: mass[mass.length-1].offset+1, index: index});
    setElements(mass);
    setTimeout(() => {
      setElements((elem) => {
        let mass1 = elem.slice();
        mass1.splice(0,1);
        return mass1;
      })
      e.target.classList.toggle("disable");
    }, 1000); 
  };

  return (
    <>
      <div className="carousel">{images}</div>
      <div className="button-container">
        <button type="button" className="prev-image" onClick={(e) =>next(e)}>
          &lt;
        </button>
        <button type="button" className="next-image" onClick={(e) => next(e)}>
          &gt;
        </button>
      </div>
    </>
  );
};

export default Carousel;
