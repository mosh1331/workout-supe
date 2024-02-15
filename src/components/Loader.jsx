// Loader.js
import React from 'react';
import IconImage from "/icon-512x512.png"
const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
    <div className="relative w-48 h-48 animate-pulse">
        <img
          src={IconImage} // replace with your image URL
          alt="Loading"
          className="w-full h-full object-cover rounded"
        />
      </div>
    </div>
  );
};

export default Loader;
