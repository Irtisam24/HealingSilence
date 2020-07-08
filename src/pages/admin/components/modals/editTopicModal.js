import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'
import { Modal,Button,Form,Alert } from 'react-bootstrap';
import ValidateErrors from '../modals/validateEditTopicModal'
import Axios from 'axios';

const EditTopicModal = ({show,handlehide,topic,settopic}) => {
    const {topic_id,topic_title,topic_desc}=topic
    const [errors,seterrors]=useState({})
    
    
  
    const handleonChange=e=>{
      settopic({...topic,
        [e.target.name]:e.target.value
      })
    }
  
  
    const history=useHistory()

    const handleonSubmit=async (e)=>{
      e.preventDefault()
      const validate=await ValidateErrors(topic)
      seterrors(validate)
      const formdata=new FormData();
      formdata.set('topic_id',topic_id)
      formdata.set('topic_title',topic_title)
      formdata.set('topic_desc',topic_desc)
      
      if(Object.keys(validate).length===0){
        const edittopic=await Axios.patch('http://localhost:5000/admin/edittopic',formdata)
        if(edittopic){
            handlehide()
            history.push('/admin')
        }
      }
    }
  
    return (

      <>
        <Modal show={show} onHide={handlehide} className='mt-5'>
          <Modal.Header closeButton>
            <Modal.Title>Edit Topic</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form onSubmit={handleonSubmit}>
  
          <Form.Group>
              <Form.Label>Topic Title</Form.Label>
              <Form.Control type="text" 
              placeholder="Enter Fullname" 
              name='post_title'
              value={topic_title}
              onChange={handleonChange}   
              />
              {errors.topic_title ? (
                  <Alert className='alert alert-danger mt-2'>
                  {errors.topic_title}
                  </Alert>)
               :null}
          </Form.Group>
          
          <Form.Group>
              <Form.Label>Post Description</Form.Label>
              <Form.Control as='textarea' rows='4' 
              name='post_desc'
              value={topic_desc} 
              onChange={handleonChange}    
              />
              {errors.topic_desc ? (
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

export default EditTopicModal
