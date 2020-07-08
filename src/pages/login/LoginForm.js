import React from 'react';
import {useTrail, animated} from 'react-spring'
import FormLoginValidation from './FormLoginValidation';
import Validatelogin from './validatelogin';
import FormInput from '../../components/FormInput';
import ErrorAlert from '../../components/errorAlert';
import GreenButton from '../../components/button';
import SecondaryButton from '../../components/SecondaryButton';


export default function LoginForm({changeregister,toggle}) {


    const initialvalues={
        email:'',
        pass:''
    }
    

    const {handleonSubmit,handleonChange,values,errors,backEndErrors}=FormLoginValidation(initialvalues,Validatelogin);

    const items = [<FormInput label='email' value={values.email} error={errors.email} onchange={handleonChange} />, 
    <FormInput label='password' value={values.password} error={errors.password} onchange={handleonChange} />]

    const config = { mass: 5, tension: 2000, friction: 200 }

    const trail = useTrail(items.length, {
      config,
      opacity: toggle ? 1 : 0,
      x: toggle ? 0 : 20,
      from: { opacity: 0, x: 20, height: 0 },
    })

  
    return (
    <>
    
    <form onSubmit={handleonSubmit} className='mt-16 pt-8 mr-64'>
    {backEndErrors ? <ErrorAlert error={backEndErrors} /> : null }
    
    {trail.map(({ x, height, ...rest }, index) => (
          <animated.div
            key={items[index]}
            className="trails-text"
            style={{ ...rest, transform: x.interpolate(x => `translate3d(0,${x}px,0)`) }}>
            <animated.div>{items[index]}</animated.div>
          </animated.div>
        ))}
        <div className='mt-2 ml-12'>
        <GreenButton text='Login' />
        <SecondaryButton text='Register' action={changeregister}/>
        </div>
      </form>
      
        
    </>
  );
}
