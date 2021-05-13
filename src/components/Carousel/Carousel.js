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
  const[positionX,setPositionX] = useState(null);
  const[positionY,setPositionY] = useState(null);
  const [data, setData] = useState([
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

  const handleTouchStart = (e) => {
    setPositionX(e.touches[0].clientX);
    setPositionY(e.touches[0].clientY);
  }

  const handleTouchMove = (e) => {
    if(!positionX || !positionY) {
      return false;
    }
    let currentX = e.touches[0].clientX;
    let currentY = e.touches[0].clientY;
    if(Math.abs(currentX- positionX) > Math.abs(currentY- positionY)){
      if(currentX - positionX > 0) {
        next(); //right
      } else {
        next(); // left
      }
    } 
    setPositionX(null);
    setPositionY(null);
    console.log(currentX,currentY);
  }

  const next = (e) => {
    if(e){
      e.target.classList.toggle('disable');
    }
   
    const mass = [...data];
    mass.forEach((element) => {
      element.offset -= 1;
    });
    let index = mass[mass.length - 1].index + 1;
    if (index === 6) {
      index = 0;
    }
    mass.push({ offset: mass[mass.length - 1].offset + 1, index });
    setData(mass);
    setTimeout(() => {
      setData((elem) => {
        const mass1 = elem.slice();
        mass1.splice(0, 1);
        return mass1;
      });
      if(e){
        e.target.classList.toggle('disable');
      }
    }, 1000);
  };

  return (
    <>
      <div className="carousel" onTouchStart={(e) => handleTouchStart(e)} onTouchMove={(e) => handleTouchMove(e)}>{images}</div>
      <div className="button-container" >
        <button type="button" className="prev-image" onClick={(e) => next(e)}>
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
