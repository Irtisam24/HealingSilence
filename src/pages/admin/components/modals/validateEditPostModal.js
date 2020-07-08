const ValidateErrors=values=>{
    
    const errors={}

    //validation for post Editing

    if (!values.post_desc) {
        errors.post_desc = 'Title is required';
      } 

  
    return errors
}
export default ValidateErrors;