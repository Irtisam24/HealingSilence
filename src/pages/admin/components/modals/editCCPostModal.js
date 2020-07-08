import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'
import { Modal,Button,Form,Alert } from 'react-bootstrap';
import ValidateErrors from './validateCCPostModal'
import Axios from 'axios';

const EditCCPostModal = ({show,handlehide,post,setpost}) => {
    const {post_id,post_title,post_desc}=post
    const [errors,seterrors]=useState({})
    
    
  
    const handleonChange=e=>{
      setpost({...post,
        [e.target.name]:e.target.value
      })
    }
  
  
    const history=useHistory()

    const handleonSubmit=async (e)=>{
      e.preventDefault()
      const validate=await ValidateErrors(post)
      seterrors(validate)
      const formdata=new FormData();
      formdata.set('post_id',post_id)
      formdata.set('post_title',post_title)
      formdata.set('post_desc',post_desc)
      
      if(Object.keys(validate).length===0){
        const editCategory=await Axios.patch('http://localhost:5000/admin/editccpost',formdata)
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
            <Modal.Title>Edit Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form onSubmit={handleonSubmit}>
  
          <Form.Group>
              <Form.Label>Post Title</Form.Label>
              <Form.Control type="text" 
              placeholder="Enter Post Title" 
              name='post_title'
              value={post_title}
              onChange={handleonChange}   
              />
              {errors.post_title ? (
                  <Alert className='alert alert-danger mt-2'>
                  {errors.post_title}
                  </Alert>)
               :null}
          </Form.Group>
          
          <Form.Group>
              <Form.Label>Post Description</Form.Label>
              <Form.Control as='textarea' rows='4' 
              name='post_desc'
              value={post_desc} 
              onChange={handleonChange}    
              />
              {errors.post_desc ? (
                  <Alert className='alert alert-danger mt-2'>
                  {errors.post_desc}
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

export default EditCCPostModal
