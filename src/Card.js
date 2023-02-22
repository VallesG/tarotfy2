import React, { useRef } from 'react';

const Card = ({ image, onClick }) => {
  const cardRef = useRef();

  const handleCardClick = () => {
    cardRef.current.classList.toggle('flip');
    onClick();
  };

  return (
    <div
      className="card-container"
      onClick={handleCardClick}
      ref={cardRef}
    >
      <div className="card-face card-front">
        <img
          src={image}
          alt="card"
          className="card-image"
        />
      </div>
      <div className="card-face card-back"></div>
    </div>
  );
};

export default Card;
