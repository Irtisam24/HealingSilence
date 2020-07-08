import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'
import { Modal,Button,Form,Alert } from 'react-bootstrap';
import ValidateErrors from './validateEditPostModal'
import Axios from 'axios';

const EditTopicModal = ({show,handlehide,post,setpost}) => {
    const {post_id,post_desc}=post
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
      formdata.set('post_desc',post_desc)
      
      if(Object.keys(validate).length===0){
        const editpost=await Axios.patch('http://localhost:5000/admin/editpost',formdata)
        if(editpost){
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
              <Form.Label>Post Description</Form.Label>
              <Form.Control as="textarea" rows='4' 
              placeholder="Enter Post Description" 
              name='post_desc'
              value={post_desc}
              onChange={handleonChange}   
              />
              {errors.topic_desc ? (
                  <Alert className='alert alert-danger mt-2'>
                  {errors.topic_desc}
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

export default EditTopicModal
