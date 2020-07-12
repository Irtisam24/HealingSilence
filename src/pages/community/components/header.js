import React from "react";

const Header = () => {
  return (
    <>
      <div className='bg-fixed w-full h-56 flex justify-center bg-green-800 bg-opacity-75 flex-col cursor-default'>
        <h1 className='text-white text-center text-2xl font-black'>
          Community
        </h1>
        <p className='text-white text-xl capitalize text-center font-italic'>
          We cannot help everyone,but everyone can help someone
        </p>
      </div>
    </>
  );
};

export default Header;
