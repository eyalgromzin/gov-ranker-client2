import React, {useState} from 'react';
import '../components/ClickableCircli.css'
// @ts-ignore
const ClickableCircularImage = ({ imageUrl,onClick, text1}) => {


    const handleImageClick=()=>{

   }
    return (
        <div className="clickable-circular-image" onFocus={handleImageClick}>
            <img src={imageUrl}/>
            <p>{text1}</p>
        </div>
    );
};

export default ClickableCircularImage;
