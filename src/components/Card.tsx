import React from 'react';
import './Card.css'; // Your CSS file for styling
// import imageSrc from './image.jpg';

// @ts-ignore
const Card = ({ image, title, description }) => {
    return (
        <div className="card">
            {/* <img src={imageSrc} alt="Card" className="card-image" /> */}
            <div className="card-content">
                <h3 className="card-title">{title}</h3>
                <p className="card-description">{description}</p>
            </div>
        </div>
    );
};

export default Card;
