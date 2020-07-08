import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'
import { Modal,Button,Form,Alert } from 'react-bootstrap';
import ValidateErrors from '../validatecategory'
import Axios from 'axios';

const EditCategoryModal = ({show,handlehide,category,setCategory}) => {
    const {cat_id,cat_title,cat_desc}=category
    const [errors,seterrors]=useState({})
    
    
  
    const handleonChange=e=>{
      setCategory({...category,
        [e.target.name]:e.target.value
      })
    }
  
  
    const history=useHistory()

    const handleonSubmit=async (e)=>{
      e.preventDefault()
      const validate=await ValidateErrors(category)
      seterrors(validate)
      const formdata=new FormData();
      formdata.set('cat_id',cat_id)
      formdata.set('cat_title',cat_title)
      formdata.set('cat_desc',cat_desc)
      
      if(Object.keys(validate).length===0){
        const editCategory=await Axios.patch('http://localhost:5000/admin/editcategory',formdata)
        if(editCategory){
            handlehide()
            history.push('/admin')
        }
      }
    }
  
    return (

      <>
        <Modal show={show} onHide={handlehide} className='mt-5'>
          <Modal.Header closeButton>
            <Modal.Title>Edit User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form onSubmit={handleonSubmit}>
  
          <Form.Group>
              <Form.Label>Category Title</Form.Label>
              <Form.Control type="text" 
              placeholder="Enter Fullname" 
              name='cat_title'
              value={cat_title}
              onChange={handleonChange}   
              />
              {errors.cat_title ? (
                  <Alert className='alert alert-danger mt-2'>
                  {errors.cat_title}
                  </Alert>)
               :null}
          </Form.Group>
          
          <Form.Group>
              <Form.Label>Category Description</Form.Label>
              <Form.Control as='textarea' rows='4' 
              name='cat_desc'
              value={cat_desc} 
              onChange={handleonChange}    
              />
              {errors.cat_desc ? (
                  <Alert className='alert alert-danger mt-2'>
                  {errors.email}
                  </Alert>)
               :null}
          </Form.Group>
   
          <Modal.Footer>
            <Button variant="secondary" onClick={handlehide}>
              Close
            </Button>
            <Button variant="primary"
             type='submit'>
              Submit
            </Button>
          </Modal.Footer>
          
          </Form>
          
          </Modal.Body>
        
        </Modal>
      </>
    );
}

export default EditCategoryModal
