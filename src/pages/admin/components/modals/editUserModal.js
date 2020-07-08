import React,{useState} from 'react'
import { Modal,Button,Form,Alert } from 'react-bootstrap';
import {useHistory} from 'react-router-dom'
import Axios from 'axios'
import ValidateErrors from './validateEditUserModal'

const EditUserModal = ({show,handlehide,user,setUser}) => {
    const {user_id,fullname,email,username,phone,age}=user
      const [errors,seterrors]=useState({})
      
      
    
      const handleonChange=e=>{
        setUser({...user,
          [e.target.name]:e.target.value
        })
      }
    
    
      const history=useHistory()

      const handleonSubmit=async (e)=>{
        e.preventDefault()
        const validate=await ValidateErrors(user)
        seterrors(validate)
        const formdata=new FormData();
        formdata.set('user_id',user_id)
        formdata.set('fullname',fullname)
        formdata.set('email',email)
        formdata.set('phone',phone)
        formdata.set('age',age)
        formdata.set('username',username)
        
        if(Object.keys(validate).length===0){
          const editUserDetails=await Axios.patch('http://localhost:5000/admin/edituser',formdata)
          if(editUserDetails){
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
                <Form.Label>Fullname</Form.Label>
                <Form.Control type="text" 
                placeholder="Enter Fullname" 
                name='fullname'
                value={fullname}
                onChange={handleonChange}   
                />
                {errors.fullname ? (
                    <Alert className='alert alert-danger mt-2'>
                    {errors.fullname}
                    </Alert>)
                 :null}
            </Form.Group>
            
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' 
                name='email'
                value={email} 
                onChange={handleonChange}    
                />
                {errors.email ? (
                    <Alert className='alert alert-danger mt-2'>
                    {errors.email}
                    </Alert>)
                 :null}
            </Form.Group>
    
            <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control type='text' 
                name='username' 
                value={username}
                onChange={handleonChange}    
                />
                {errors.username ? (
                    <Alert className='alert alert-danger mt-2'>
                    {errors.username}
                    </Alert>)
                 :null}
            </Form.Group>
    
            
            <Form.Group>
                <Form.Label>Phone</Form.Label>
                <Form.Control type='number' 
                name='phone' 
                value={phone}
                onChange={handleonChange}    
                />
                {errors.phone ? (
                    <Alert className='alert alert-danger mt-2'>
                    {errors.phone}
                    </Alert>)
                 :null}
            </Form.Group>
    
            <Form.Group>
                <Form.Label>Age</Form.Label>
                <Form.Control type='number' 
                name='age' 
                value={age}
                onChange={handleonChange}    
                />
                {errors.age ? (
                    <Alert className='alert alert-danger mt-2'>
                    {errors.age}
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

export default EditUserModal
