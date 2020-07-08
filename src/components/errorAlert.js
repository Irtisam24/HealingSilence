import React from 'react'

const ErrorAlert = ({error}) => {
  return (
    <>
      <p className='box-border bg-red-600 rounded-md mt-2 p-1 text-white text-md-center bg-opacity-50'>{error}</p>
    </>
  )
}

export default ErrorAlert
