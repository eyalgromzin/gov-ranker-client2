import React from "react";

interface ImageTextProps {
    imageUrl: string | undefined;
    description: string | undefined;
    name: string | undefined;
}

const Summary: React.FC<ImageTextProps> = ({ imageUrl, description, name }) => {
    return (
        <div style={{ display: "flex", marginTop: '40px' }}>
            <div style={{marginLeft: '20px'}}>
                <img
                    src={imageUrl}
                    style={{
                        height: "300px",
                        maxWidth: '300px'
                    }}
                />
            </div>
            <div >
                <p style={{fontSize: '40px'}}>{name}</p>
                <div>{description}</div>
            </div>
        </div>
    );
};

export default Summary;
