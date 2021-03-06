const ValidateErrors=values=>{
    
    const errors={}

    //validation for therapists
    if (!values.fullname) {
        errors.fullname = 'Name is required';
      } 
    
      if (!values.pass) {
          errors.pass = 'Password is required';
        } else if (values.pass.length < 6) {
          errors.pass = 'Password must be at least 6 characters';
        }
    
      if (!values.email) {
        errors.email = 'Email is required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
  
      if(!values.username){
          errors.username='Username is required';
      }else if (values.username.length<6){
          errors.username='Username must be at least 6 characters'
      }
  
      if(!values.phone){
          errors.phone='Phone is required';
      }else if (values.phone.length>11){
          errors.phone='Phone cannot contain more than 11 characters'
      }
    
      if(!values.age){
          errors.age='Age is required';
      }
      if(!values.education){
        errors.education='Education is required';
    }

    return errors
}
export default ValidateErrors;