import React, { useState } from "react";
import PostModal from "./createpostmodal";

const Header = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
  };

  const handlehide = () => {
    setShow(false);
  };

  return (
    <>
      <PostModal show={show} handlehide={handlehide} />
      <div className='flex justify-between items-center ml-64'>
        <div className='flex-1 ml-16'>
          <h2
            className='text-green-800 text-5xl text-center cursor-pointer'
            onClick={handleShow}>
            Share Your Talent
          </h2>
        </div>
        <div className='flex-1 mt-12 ml-32'>
          <img
            src={require("../../pictures/creative.jpeg")}
            className='rounded-lg shadow-lg h-auto w-1/5'
          />
        </div>
      </div>
    </>
  );
};

export default Header;
