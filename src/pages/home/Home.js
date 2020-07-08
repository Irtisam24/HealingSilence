import React, { useState } from "react";
import "../home/home.css";
import help from "../../pictures/help.png";
import button from "../../pictures/button.png";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";

export default function Home() {
  const [clicked, setClicked] = useState(false);

  return (
    <>
      <div
        className='bg-no-repeat bg-cover h-screen overflow-hidden w-auto '
        style={{
          backgroundImage: `url(${require("../../pictures/home.png")})`,
        }}>
        <Navbar />

        <img
          src={button}
          className='touch_button rounded-full opacity-75 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 subpixel-antialiased'
          onClick={() => setClicked(!clicked)}></img>
        <img src={help} className='ml-mdd mt-64 mb-32 opacity-75'></img>
      </div>

      {clicked ? <Footer /> : null}
    </>
  );
}
