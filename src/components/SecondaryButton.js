import React from 'react'

const SecondaryButton = ({text,action}) => {
  return (
    <>
      <button className='text-white font-bold bg-teal-600 rounded-md p-2 mt-2 mb-2 transition duration-500 ease-in-out hover:bg-teal-800 
            transform hover:-translate-y-1 hover:scale-110 subpixel-antialiased' 
            onClick={action}
            >{text}</button>
    </>
  )
}

export default SecondaryButton
