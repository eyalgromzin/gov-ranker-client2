import React, {useState} from 'react';
import './KnessetChairs.css';
import ClickableCircularImage from "./ClickableCircularImage";


interface MyObject {
    id: number;
    name: string;
    description:string;
    url:string;
}

interface DisplayMembers {
    dataArray: MyObject[];
}
const KnessetComp:React.FC<DisplayMembers> =({dataArray})=>{

    const handleImageClick=()=> {

    }


    return    <div className="knesset-flex">
        {
            dataArray.map((box, index) => (
                <ClickableCircularImage key={box.url} imageUrl={box.url}  onClick={handleImageClick}
                                         text1={box.name}



                />

        ))}
    </div>
};

export default KnessetComp;
