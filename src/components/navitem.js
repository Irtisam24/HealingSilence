import React from 'react'
import {NavLink} from 'react-router-dom'


const NavItem = ({to,title,toggleHover}) => {
  return (
    <>
      <NavLink exact={true} to={to} activeClassName='border-b-2 text-white' className='text-center text-white text-lg subpixel-antialiased hover:font-black'
      onMouseEnter={toggleHover}>
      {title}
      </NavLink>
    </>
  )
}

export default NavItem
