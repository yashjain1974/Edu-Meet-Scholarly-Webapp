import React, { useState, useEffect } from 'react';

function CitaionAuthor() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/citation.json')
      .then(response => response.json())
      .then(data => {setData(data)
        console.log(typeof data);})
      .catch(error => console.error(error));
  }, []);
  const keys = Object.keys(data);
  console.log(keys)
  

  return (
    
       
     <div>
      {keys.map(key => (
        <div key={key}>
          <h2>{data[key].name}</h2>
          <p>Citation: {data[key].citation}</p>
        </div>
      ))}
    </div>
  );
}

export default CitaionAuthor;
