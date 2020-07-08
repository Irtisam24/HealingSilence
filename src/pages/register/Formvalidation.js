import {useState} from 'react';
import axios from 'axios';

const useFormValidation=(initialvalues,validate)=>{

    

    const [values,setvalues]=useState({initialvalues})
    const [errors,setErrors]=useState({});
    const [file,setFile]=useState('');
    const [filename,setFileName]=useState('Upload Image');
    const [backenderrors,setbackenderrors]=useState('')

    const handleChange=(event)=>{
        setvalues({
            ...values,
            [event.target.name]:event.target.value
        })
        
    }

    const handlefile=event=>{

        const uimg=event.target.files[0]
        setFile(uimg);
        if(uimg){
            setFileName(uimg.name)
        }
    }

    const handleBlur=async()=>{

        
        const validationerrors=await validate(values);
        setErrors(validationerrors);
    }

    const submitform=async(e)=>{

        e.preventDefault();
        const validationerrors=await validate(values);
        const formdata=new FormData();
        formdata.set('fullname',values.fullname)
        formdata.set('email',values.email)
        formdata.set('phone',values.phone)
        formdata.set('age',values.age)
        formdata.set('username',values.username)
        formdata.set('pass',values.pass)
        formdata.set('account_type',values.account_type)
        formdata.append('file',file);
        setErrors(validationerrors);
        
        if(Object.keys(validationerrors).length===0){
            try {
                const register=await axios.post('http://localhost:5000/user/signup', formdata,
                {headers: {'Content-Type':'multipart/form-data'}
                });
              if(register.data){
                 localStorage.setItem('x-auth-token',register.data.token)
               window.location.reload();
              } 
            } catch (error) {
                setbackenderrors(error.response.data)
            }

    }

}

    return {submitform,handleChange,handlefile,handleBlur,values,errors,filename,backenderrors}
}

export default useFormValidation;
