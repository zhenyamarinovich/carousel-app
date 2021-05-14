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

  const disableElement = (e) => {
    if (e) {
      if (e.target.localName === 'img') {
        e.target.offsetParent.classList.toggle('disable');
      } else {
        e.target.classList.toggle('disable');
      }
    }
  };

  const offsetRight = () => {
    const mass = [...data];
    mass.forEach((element) => {
      element.offset += 1;
    });
    let index = mass[0].index - 1;
    if (index === -1) {
      index = 5;
    }
    mass.unshift({ offset: mass[0].offset - 1, index });
    return mass;
  };

  const prevElement = (e) => {
    disableElement(e);
    setData(offsetRight());
    setTimeout(() => {
      setData((elem) => {
        const mass = elem.slice();
        mass.pop();
        return mass;
      });
      disableElement(e);
    }, 700);
    setCurrentIndex((ind) => {
      if (ind === 0) {
        return 5;
      }
      return ind - 1;
    });
  };

  const offsetLeft = () => {
    const mass = [...data];
    mass.forEach((element) => {
      element.offset -= 1;
    });
    let index = mass[mass.length - 1].index + 1;
    if (index === 6) {
      index = 0;
    }
    mass.push({ offset: mass[mass.length - 1].offset + 1, index });
    return mass;
  };

  const nextElement = (e) => {
    disableElement(e);
    setData(offsetLeft());
    setTimeout(() => {
      setData((elem) => {
        const mass = elem.slice();
        mass.splice(0, 1);
        return mass;
      });
      disableElement(e);
    }, 700);
    setCurrentIndex((ind) => {
      if (ind === 5) {
        return 0;
      }
      return ind + 1;
    });
  };

  const toXImage = (e) => {
    const number = +e.target.innerHTML;
    let position = currentIndex;
    let time = 0;
    if (number !== currentIndex + 1) {
      while (position + 1 !== number) {
        setTimeout(() => {
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
        }, time * 700);
        time += 1;
        if (position + 1 === elements.length) {
          position = 0;
        } else {
          position += 1;
        }
      }
    }
    setCurrentIndex(position);
  };

  const pictureNumbers = [1, 2, 3, 4, 5, 6];

  const pictureNumbersElement = pictureNumbers.map((elem) => {
    let className = 'carousel__picture-number ';
    if (elem === currentIndex + 1) {
      className += 'carousel__current-number';
    }
    return (
      <button type="button" className={className} onClick={(e) => toXImage(e)}>
        {elem}
      </button>
    );
  });

  const handleTouchMove = (e) => {
    if (positionX || positionY) {
      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      if (Math.abs(currentX - positionX) > Math.abs(currentY - positionY)) {
        if (currentX - positionX > 0) {
          prevElement(e);
        } else {
          nextElement(e);
        }
      }
      setPositionX(null);
      setPositionY(null);
    }
  };

  return (
    <>
      <div
        className="carousel"
        onTouchStart={(e) => handleTouchStart(e)}
        onTouchMove={(e) => handleTouchMove(e)}
      >
        {images}
      </div>
      <div className="carousel__button-container">
        <button
          type="button"
          className="carousel__button-control"
          onClick={(e) => prevElement(e)}
        >
          &lt;
        </button>
        {pictureNumbersElement}
        <button
          type="button"
          className="carousel__button-control"
          onClick={(e) => nextElement(e)}
        >
          &gt;
        </button>
      </div>
    </>
  );
};

export default Carousel;
