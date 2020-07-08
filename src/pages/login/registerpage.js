import React,{useState} from 'react';

import LoginForm from './LoginForm';
import Register from '../register/register';
import {Redirect} from 'react-router-dom';
import Navbar from '../../components/navbar';

export default function Login({register,changeregister,userdetails}) {
  

   const [toggle, set] = useState(true)

   
   return (
    <>
    {userdetails.userid ? <Redirect exact={true} to='/' /> : null}
    <div className='bg-cover h-screen'  style={{backgroundImage:`url(${require('../../pictures/main.png')})`}}>
     <div>
     <Navbar/>
     </div> 

    <div className='flex justify-around'>
    
    <div className="bg-green-900 bg-opacity-75 mr-64 flex flex-1 justify-center self-stretch lg:pb-64 lg:pt-64 md:pb-16 md:pt-16
    sm:pt-8 sm:pb-8">
         <div className="mb-64 text-white">
            <h2 className='mb-2 font-bold font-serif text-2xl subpixel-antialiased tracking-wide'>Healing Silence 101<br></br> {register ? 'Register Page' : 'Login Page' }</h2>
            <p>Login or register from here to access.</p>
         </div>
      </div>

      <div className="flex flex-1 justify-center">
         <div className={register ? 'mt-32 pt-8 mx-32' : 'mt-32 pt-8 mr-32'}>
            <div className={!register ? 'mr-32' : null}>
                  {register ? <Register changeregister={changeregister} toggle={toggle} /> : 
                  <LoginForm changeregister={changeregister} toggle={toggle} />}
            </div>
         </div>
      </div>
      </div>

    </div>
    
    </>
  );
}
