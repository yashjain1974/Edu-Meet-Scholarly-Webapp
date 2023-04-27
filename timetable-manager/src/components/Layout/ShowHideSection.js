import React, { useState } from 'react';

function ShowHideSection() {
  const [isShown, setIsShown] = useState(false);

  const toggleVisibility = () => {
    setIsShown(!isShown);
  };

  return (
    <div>
      <button onClick={toggleVisibility}>
        {isShown ? 'Hide' : 'Show'}
      </button>
      {isShown && (
        <div>
          <p>This is the content you want to show or hide.</p>
          <p>It can contain anything: text, images, videos, etc.</p>
        </div>
      )}
    </div>
  );
}

export default ShowHideSection;