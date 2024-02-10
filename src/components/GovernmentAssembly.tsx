import React, { useState } from 'react';


const GovernmentAssembly = () => {
  const [chairs, setChairs] = useState(new Array(120).fill(false)); // מציון אם הכיסא תפוס

  const handleClick = (index: number) => {
    const updatedChairs = [...chairs];
    updatedChairs[index] = !updatedChairs[index];
    setChairs(updatedChairs);
  };

  return (
      <div className="government-assembly">
        <h1>Government Assembly Chairs</h1>
        <div className="chairs">
          {chairs.map((occupied, index) => (
            <div />
              // <GovernmentChair
              //     key={index}
              //     occupied={occupied}
              //     onClick={() => handleClick(index)}
              // />
          ))}
        </div>
      </div>
  );
};

export default GovernmentAssembly;
