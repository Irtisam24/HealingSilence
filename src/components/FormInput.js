import React from 'react'
import ErrorAlert from './errorAlert'

const FormInput = ({label,value,onchange,error}) => {
  return (
    <>
         <div className='mb-4'>
            <label className='capitalize text-white text-xl'>{`${label}: ` }</label>
            <input type={label === 'fullname' ||label=== 'username' ? 'text' : 
            label==='email' ? 'email' : 
            label==='password' ? 'password' :'number' } 
            
            className={'rounded-lg text-sm bg-gray-400 bg-opacity-75 placeholder-black p-1 shadow-md outline-none focus:shadow-outline focus:bg-teal-100'} 
            
            name={label==='password' ? 'pass' : `${label}`} 
            onChange={onchange}
            value={value}
            placeholder={`Enter Your ${label}`}/>
            {error ? <ErrorAlert error={error}/> : ''}

        </div>
    </>
  )
}

export default FormInput
