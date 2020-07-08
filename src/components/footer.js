import React from "react";
import { Link } from "react-router-dom";
import FooterLink from "./footerLink";

const Footer = () => {
  const path = window.location.pathname;

  return (
    <>
      <div
        className={
          path === "/creativecorner"
            ? "bg-green-900 w-auto "
            : "bg-green-900 bg-opacity-75 w-auto"
        }>
        <div className='flex justify-between p-8'>
          <div className='ml-32'>
            <h5 className='text-white text-xl'>About Us</h5>
            <ul className=''>
              <FooterLink title='FAQ' />
              <FooterLink title='Privacy Policy' />
              <FooterLink title='Services' />
            </ul>
          </div>

          <div className='mr-32'>
            <h5 className='text-white text-xl'>Help</h5>
            <ul>
              <FooterLink title='Get Started' />
              <FooterLink title='Contact Us' />
              <FooterLink title='Advice' />
            </ul>
          </div>

          <div className='mr-32'>
            <h5 className='text-white text-xl'>Quick links</h5>
            <ul>
              <FooterLink title='Community' />
              <FooterLink title='Creative Corner' />
              <FooterLink title='Volunteers' />
            </ul>
          </div>
        </div>

        <div>
          <div
            className='ml-8 mr-32 mt-4 text-center text-white transition duration-500 ease-in-out 
                     transform hover:-translate-y-1 hover:scale-110 subpixel-antialiased  cursor-pointer'>
            <p className='ml-32'>
              © All right Reversed.
              <Link to='/' className='text-green'>
                Mahaan Web developers
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
