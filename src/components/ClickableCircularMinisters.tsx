import React, {useState} from 'react';
import  '../components/ClickableCircliMinisters.css'
// @ts-ignore
const ClickableCircularMinisters = ({ imageUrl,onClick, text1 }) => {


    const handleImageClick=()=>{

   }
    return (
        <div className="clickable-circular-image-m" onFocus={handleImageClick}>

            <img src={imageUrl}/>
            <p style={{marginTop: '5px'}}>{text1}</p>

        </div>
    );
};

export default ClickableCircularMinisters;
