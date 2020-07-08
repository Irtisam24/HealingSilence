const ValidateErrors=values=>{
    
    const errors={}

 

    //validation for category creation

    if (!values.cat_title) {
        errors.cat_title = 'Title is required';
      } 

      if (!values.cat_desc) {
        errors.cat_desc = 'Description is required';
      } 
  
    return errors
}
export default ValidateErrors;