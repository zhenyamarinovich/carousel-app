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
  const [positionX, setPositionX] = useState(null);
  const [positionY, setPositionY] = useState(null);
  const [data, setData] = useState([
    { offset: -1, index: elements.length - 2 },
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
  };

  const handleTouchMove = (e) => {
    if (!positionX || !positionY) {
      return false;
    }
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    if (Math.abs(currentX - positionX) > Math.abs(currentY - positionY)) {
      if (currentX - positionX > 0) {
        prev(e);
      } else {
        next(e);
      }
    }
    setPositionX(null);
    setPositionY(null);
  };

  const prev = (e) => {
    if (e) {
      if (e.target.localName === 'img') {
        e.target.offsetParent.classList.toggle('disable');
      } else {
        e.target.classList.toggle('disable');
      }
    }
    const mass = [...data];
    mass.forEach((element) => {
      element.offset += 1;
    });
    let index = mass[0].index - 1;
    if (index === -1) {
      index = 5;
    }
    mass.unshift({ offset: mass[0].offset - 1, index });
    setData(mass);
    setTimeout(() => {
      setData((elem) => {
        const mass1 = elem.slice();
        mass1.pop();
        return mass1;
      });
      // setCurrentIndex((index) => index + 1);
      if (e) {
        if (e.target.localName === 'img') {
          e.target.offsetParent.classList.toggle('disable');
        } else {
          e.target.classList.toggle('disable');
        }
      }
    }, 700);
    setCurrentIndex((index) => {
      if (index === 0) {
        return 5;
      } else {
        return index - 1;
      }
    });
  };

  const next = (e) => {
    if (e) {
      if (e.target.localName === 'img') {
        e.target.offsetParent.classList.toggle('disable');
      } else {
        e.target.classList.toggle('disable');
      }
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
      // setCurrentIndex((index) => index + 1);
      if (e) {
        if (e.target.localName === 'img') {
          e.target.offsetParent.classList.toggle('disable');
        } else {
          e.target.classList.toggle('disable');
        }
      }
    }, 700);
    setCurrentIndex((index) => {
      if (index === 5) {
        return 0;
      } else {
        return index + 1;
      }
    });
  };

  const toXImage = (e) => {
    console.log(e.target.innerHTML);
    const number = +e.target.innerHTML;
    let position = currentIndex;
    if (number != currentIndex + 1) {
      while (position + 1 != number) {
        setData((elem) => {
          const mass = elem.slice();
          mass.forEach((element) => {
            element.offset -= 1;
          });
          let index = mass[mass.length - 1].index + 1;
          if (index === 6) {
            index = 0;
          }
          mass.push({ offset: mass[mass.length - 1].offset + 1, index });
          mass.splice(0, 1);
          return mass;
        });
        if (position + 1 === elements.length) {
          position = 0;
        } else {
          position++;
        }
      }
    }
    setCurrentIndex(position);
  };

  const mass = [1, 2, 3, 4, 5, 6];

  const spans = mass.map((elem) => {
    let className = 'number-image ';
    if (elem === currentIndex + 1) {
      className += 'current-number';
    }
    return (
      <span className={className} onClick={(e) => toXImage(e)}>
        {elem}
      </span>
    );
  });

  return (
    <>
      <div
        className="carousel"
        onTouchStart={(e) => handleTouchStart(e)}
        onTouchMove={(e) => handleTouchMove(e)}
      >
        {images}
      </div>
      <div className="button-container">
        <button type="button" className="prev-image" onClick={(e) => prev(e)}>
          &lt;
        </button>
        {spans}
        <button type="button" className="next-image" onClick={(e) => next(e)}>
          &gt;
        </button>
      </div>
    </>
  );
};

export default Carousel;
