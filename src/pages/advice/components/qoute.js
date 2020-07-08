import React from "react";


const RandomQoute = ({ qoute }) => {
  return (
    <>
      <blockquote className="blockquote text-center text-xl">
        <p className="text-black font-semibold subpixel-antialiased">{qoute.text}</p>
        <footer className="text-black font-light subpixel-antialiased">{qoute.author}</footer>
      </blockquote>
    </>
  );
};

export default RandomQoute;
