const ValidateErrors=values=>{
    
    const errors={}

 

    //validation for Post Editing

    if (!values.post_title) {
        errors.post_title = 'Title is required';
      } 

      if (!values.post_desc) {
        errors.post_desc = 'Name is required';
      } 
  
    return errors
}
export default ValidateErrors;