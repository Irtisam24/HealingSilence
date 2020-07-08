import React from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

const FooterLink = ({title}) => {
  return (
    <>
      <li className='text-white text-md transition duration-500 ease-in-out 
            transform hover:-translate-y-1 hover:scale-110 subpixel-antialiased'>
            <Link to='/'><FontAwesomeIcon className='pr-1' icon={faAngleDoubleRight} />{title}</Link></li>
    </>
  )
}

export default FooterLink
