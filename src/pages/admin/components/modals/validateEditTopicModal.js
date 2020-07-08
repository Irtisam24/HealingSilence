const ValidateErrors=values=>{
    
    const errors={}

 

    //validation for topic Editing

    if (!values.topic_title) {
        errors.topic_title = 'Title is required';
      } 

      if (!values.topic_desc) {
        errors.topic_desc = 'Description is required';
      } 
  
    return errors
}
export default ValidateErrors;