import React from 'react';
import KnessetComp from "./Knesset";
import '../components/Parlament.css'
import MinistersGridComp from "./MinistersGrid";

interface MyObject {
    id: number;
    name: string;
    description:string;
    url:string;
}

// @ts-ignore
const ParliamentComp = ({ }) => {
    const myMembers: MyObject[] = [
        {id:1, name:'ליכוד', description: 'ליכוד',url:'/src/assets/images/b.jpg' },
        {id:2, name:'יש עתיד', description:'יש עתיד',url:'/src/assets/images/lapid.jpg' },
        {id:3, name:'הציונות הדתית', description: 'הציונות הדתית',url:'/src/assets/images/sm.jpeg' },
        {id:4, name:'המחנה הממלחתי', description: 'המחנה הממלחתי',url:'/src/assets/images/ganz.jpeg' },
        {id:5, name:'ש"ס', description: 'ש"ס',url:'/src/assets/images/shas.jpg' },
        {id:6, name:'יהדות התורה', description: 'יהדות התורה',url:'/src/assets/images/ya.jpg' },
        {id:7, name:'ישראל ביתנו', description: 'ישראל ביתנו',url:'/src/assets/images/lib.jpeg' },
        {id:8, name:'העבודה', description: 'העבודה',url:'/src/assets/images/micha.jpg' },
        {id:9, name:'מרצ', description: 'מרצ',url:'/src/assets/images/gor.jpg' },
        {id:10, name:'רע"ם', description: 'רע"ם',url:'/src/assets/images/ram.jpg' }
    ];

    return (
        <div>
            <div className="cool-header">
                <h1 className="cool-text">
                    <span className="blue-text">ראשי </span>
                    <span className="gray-text">מפלגות</span>
                </h1>
            </div>
      <KnessetComp dataArray={myMembers}/><br/>
            <MinistersGridComp/>
        </div>
    );
};

export default ParliamentComp;
