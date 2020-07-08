const validatelogin=values=>{

    const errors={};

    if(!values.email){
        errors.email="Email is required"
    }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }

    if (!values.pass) {
    errors.password = 'Password is required';
    } else if (values.pass.length < 6) {
    errors.password = 'Password must be at least 6 characters';
    }

    return errors


}

export default validatelogin;