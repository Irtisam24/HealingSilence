import React from 'react'

const GreenButton = ({text,action}) => {
  return (
    <>
      <button className='text-white font-bold bg-green-800 rounded-md p-2 mt-2 mb-2 ml-2 mr-2 transition duration-500 ease-in-out hover:bg-green-900 
            transform hover:-translate-y-1 hover:scale-110 subpixel-antialiased' 
            onClick={action}
            >{text}</button>
    </>
  )
}

export default GreenButton
