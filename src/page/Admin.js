import React, {  useState } from 'react'
import { Col, Container, InputGroup, Row } from 'react-bootstrap'

import Form from 'react-bootstrap/Form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from"yup";
import 'animate.css';
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';
import '../page/Login.css';
import  { toast } from 'react-hot-toast';




const schema = yup.object().shape({
    Email:yup.string().required("Email is required").email("Email is not valid !"),
    Password:yup.string().min(6,"password must be atleast 6 characters"),
  
  })
  
function Admin() {
     //use state for hide and show eye icon
  const [hideandshow,setHideAndShow]=useState(false)
  
  const eyeChange=()=>{
setHideAndShow(!hideandshow)
  }







  const { handleSubmit,register,formState:{errors}}=useForm({
    resolver:yupResolver(schema)
  });
  
  
  
  const formSubmit = (data)=>{
    console.log(data);
 login(data);

}


let location=useNavigate()
const login= async (data)=>{
  

try{const result=await axios.post('http://localhost:8081/loginAdmin',data)
  toast(result.data.message)
  console.log(result.data);

  setTimeout(()=>{
    location('/newproduct')
  },1000)
  }
  catch(err){
    toast(err.response.data.message)
    setTimeout(()=>{
      window.location.reload();
    },3000)
  }
  
}
  return (
    <div >
    <Container className='w-75 mt-5 mb-5 bg-white   shadow animate__animated animate__fadeInDown'>
      <Row>
      <Col lg={5} md={5} className='bg-black'>
      <div>
      <img src="https://i.postimg.cc/yYJYLNpk/adlogoimg.jpg" className='w-100 '  alt="" style={{height:"400px"}} />
      </div>
      </Col>
      <Col lg={7} md={7} className='bg-white p-5 mt-5'>
      <div>
      <Form  onSubmit={handleSubmit(formSubmit)}>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email address</Form.Label>
        <Form.Control {...register("Email")} type="email" placeholder="name@example.com" />
      </Form.Group>
      <>
      <p className='text-danger small'>{errors.Email?.message}</p>
      </>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
      <Form.Label>Password</Form.Label>
     <InputGroup> <Form.Control {...register("Password")} type={hideandshow?"text":"password"} placeholder="name@example.com" className='rounded' /><p id='eye' onClick={eyeChange}>{hideandshow ? <FaEyeSlash/> :<FaEye/> }</p></InputGroup>
    </Form.Group>
    <>
    <p className='text-danger small'>{errors.Password?.message}</p>
    </>
    <div ><p class='text-danger '><q>Admin can login this page</q> </p></div>

    <div className="text-end ">
    <button className='btn bg-black text-light shadow '>
     Login
    </button>
    
  </div>
    </Form>
      </div>
      </Col>
      </Row>
    </Container>


    
  
    </div>

  )
}

export default Admin