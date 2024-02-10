import React from 'react';
import ClickableCircularImage from "./ClickableCircularImage";
import '../components/Ministers.css'
import ClickableCircularMinisters from "./ClickableCircularMinisters";

interface MyObject {
    id: number;
    name: string;
    description:string;
    url:string;

}
const MinistersGridComp = () => {
    // Sample data for images and texts (to be replaced with your data)
    const myMinisters: MyObject[] = [
        {id:1, name:'בני גנץ', description: 'שר בלי תיק',url:'/src/assets/ministersImg/ganzM.jpg' },
        {id:1, name:'בני גנץ', description: 'שר בלי תיק',url:'/src/assets/ministersImg/ganzM.jpg' },
        {id:1, name:'בני גנץ', description: 'שר בלי תיק',url:'/src/assets/ministersImg/ganzM.jpg' },
        {id:1, name:'בני גנץ', description: 'שר בלי תיק',url:'/src/assets/ministersImg/ganzM.jpg' },
        {id:1, name:'בני גנץ', description: 'שר בלי תיק',url:'/src/assets/ministersImg/ganzM.jpg' },
        {id:1, name:'בני גנץ', description: 'שר בלי תיק',url:'/src/assets/ministersImg/ganzM.jpg' },
        {id:1, name:'בני גנץ', description: 'שר בלי תיק',url:'/src/assets/ministersImg/ganzM.jpg' },
        {id:1, name:'בני גנץ', description: 'שר בלי תיק',url:'/src/assets/ministersImg/ganzM.jpg' },
        {id:1, name:'בני גנץ', description: 'שר בלי תיק',url:'/src/assets/ministersImg/ganzM.jpg' },
        {id:1, name:'בני גנץ', description: 'שר בלי תיק',url:'/src/assets/ministersImg/ganzM.jpg' },
        {id:1, name:'בני גנץ', description: 'שר בלי תיק',url:'/src/assets/ministersImg/ganzM.jpg' },
        {id:1, name:'בני גנץ', description: 'שר בלי תיק',url:'/src/assets/ministersImg/ganzM.jpg' },
        {id:1, name:'בני גנץ', description: 'שר בלי תיק',url:'/src/assets/ministersImg/ganzM.jpg' },
        {id:1, name:'בני גנץ', description: 'שר בלי תיק',url:'/src/assets/ministersImg/ganzM.jpg' },
        {id:1, name:'בני גנץ', description: 'שר בלי תיק',url:'/src/assets/ministersImg/ganzM.jpg' },
        {id:1, name:'בני גנץ', description: 'שר בלי תיק',url:'/src/assets/ministersImg/ganzM.jpg' },
        {id:1, name:'בני גנץ', description: 'שר בלי תיק',url:'/src/assets/ministersImg/ganzM.jpg' },
        {id:1, name:'בני גנץ', description: 'שר בלי תיק',url:'/src/assets/ministersImg/ganzM.jpg' },
        {id:1, name:'בני גנץ', description: 'שר בלי תיק',url:'/src/assets/ministersImg/ganzM.jpg' },
        {id:1, name:'בני גנץ', description: 'שר בלי תיק',url:'/src/assets/ministersImg/ganzM.jpg' },
        {id:1, name:'בני גנץ', description: 'שר בלי תיק',url:'/src/assets/ministersImg/ganzM.jpg' },
        {id:1, name:'בני גנץ', description: 'שר בלי תיק',url:'/src/assets/ministersImg/ganzM.jpg' },
        {id:1, name:'בני גנץ', description: 'שר בלי תיק',url:'/src/assets/ministersImg/ganzM.jpg' },
        {id:1, name:'בני גנץ', description: 'שר בלי תיק',url:'/src/assets/ministersImg/ganzM.jpg' },
        {id:1, name:'בני גנץ', description: 'שר בלי תיק',url:'/src/assets/ministersImg/ganzM.jpg' },
        {id:1, name:'בני גנץ', description: 'שר בלי תיק',url:'/src/assets/ministersImg/ganzM.jpg' },
        {id:1, name:'בני גנץ', description: 'שר בלי תיק',url:'/src/assets/ministersImg/ganzM.jpg' },
        {id:1, name:'בני גנץ', description: 'שר בלי תיק',url:'/src/assets/ministersImg/ganzM.jpg' },
        {id:1, name:'בני גנץ', description: 'שר בלי תיק',url:'/src/assets/ministersImg/ganzM.jpg' },
        {id:1, name:'בני גנץ', description: 'שר בלי תיק',url:'/src/assets/ministersImg/ganzM.jpg' },
        {id:1, name:'בני גנץ', description: 'שר בלי תיק',url:'/src/assets/ministersImg/ganzM.jpg' },
        {id:1, name:'בני גנץ', description: 'שר בלי תיק',url:'/src/assets/ministersImg/ganzM.jpg' },
        {id:1, name:'בני גנץ', description: 'שר בלי תיק',url:'/src/assets/ministersImg/ganzM.jpg' },
        {id:1, name:'בני גנץ', description: 'שר בלי תיק',url:'/src/assets/ministersImg/ganzM.jpg' },
        {id:1, name:'בני גנץ', description: 'שר בלי תיק',url:'/src/assets/ministersImg/ganzM.jpg' },
        {id:1, name:'בני גנץ', description: 'שר בלי תיק',url:'/src/assets/ministersImg/ganzM.jpg' },

    ];

    const handleButtonClick = (cardId: number) => {
        // Handle button click logic based on card ID or other data
        console.log(`Button clicked in card ${cardId}`);
    };

    return (
<div>
    <div className="cool-header">
        <h1 className="cool-text">
            <span className="blue-text">שרים </span>
            <span className="gray-text">בממשלה</span>
        </h1>
    </div>

        <div className="grid-container">


            {myMinisters.map((card) => (
                <ClickableCircularMinisters key={card.id}  imageUrl={card.url}  onClick={handleButtonClick}
                                         text1={card.description}



                />
            ))}
        </div>
</div>
    );
};

export default MinistersGridComp;