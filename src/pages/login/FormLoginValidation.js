import {useState} from 'react';
import axios from 'axios';

const FormLoginValidation=(initialvalues,validate)=>{
    
    const [values,setValues]=useState({initialvalues});
    const [errors,setErrors]=useState({});
    const [backEndErrors,setBackEndErrors]=useState('')

    const handleonChange=(event)=>{
    
        setValues({
            ...values,
            [event.target.name]:event.target.value
        })
    }

    const handleonSubmit=async(e)=>{
        e.preventDefault();
        const validaterrors=await validate(values);
        setErrors(validaterrors)

       if(Object.keys(validaterrors).length===0){
           try{
               const login=await axios.post('http://localhost:5000/user/login',{
               email:values.email,
               pass:values.pass
           });
           if(login.data){
               localStorage.setItem('x-auth-token',login.data.token)
               window.location.reload();
           }
        }catch(error){
            setBackEndErrors(error.response.data)
        }
       }
    }

    return {handleonSubmit,handleonChange,values,errors,backEndErrors}

}


export default FormLoginValidation;