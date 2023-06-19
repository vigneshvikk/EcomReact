import React, { useState } from 'react'
import { Col, Container, FormGroup, InputGroup, Row } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import slogo from "../assest/slogo.png";
import logingif from "../assest/logingif.gif"
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import '../page/Signup.css'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from"yup";
import {FaEyeSlash,FaEye} from 'react-icons/fa'
import '../page/Signup.css';
import 'animate.css';
import axios from 'axios';
import { ImagetoBase64 } from '../utility/Imagetobase64';
import  { toast } from 'react-hot-toast';



const schema = yup.object().shape({
  FullName:yup.string().required(),
  PhoneNumber:yup.string().required("phone number is required field").matches(/^(\d{3})[- ]?(\d{3})[- ]?(\d{4})$/,"Phone number not valid !"),
  Email:yup.string().required("Email is required").email("Email is not valid !"),
  Password:yup.string().min(6,"password must be atleast 6 characters"),
  ConfirmPassword:yup.string().oneOf([yup.ref("Password")],"password must be match"),
 
})









function Signup() {


//use state for hide and show eye icon
const [visible,setvisible]=useState(false)
const [visible2,setvisible2]=useState(false)


const [img,setImg]=useState({
  Image:""
})


const handleVisible=()=>{
  setvisible(!visible)

}

const handleVisible2=()=>{
  setvisible2(!visible2)

}




const { handleSubmit,register,formState:{errors}}=useForm({
      resolver:yupResolver(schema)
    });



 const formSubmit = (data)=>{
// console.log(data);
 signupUser(data)
 
 }



const location=useNavigate()

 const signupUser= async (data) =>{

  const datas={
    FullName:data.FullName,
    PhoneNumber:data.PhoneNumber,
    Email:data.Email,
    Password:data.Password,
    ConfirmPassword:data.ConfirmPassword,
   Image:img.Image
  
  }
console.log(datas);

   try{ 
   
    
    const result=await axios.post('http://localhost:8081/signup',datas)

     toast(result.data.message)
    location("/login")
  }
    catch(err){
   toast(err.response.data.message)
   window.location.reload();
    }
    
    
  
  
  }

  
  const handleUploadProfileImage = async(e)=>{
    
    const data = await ImagetoBase64(e.target.files[0])
    setImg((preve)=>{
      return{
        ...preve,
        Image : data
      }
  })
  }
console.log(img);









  return (
    <div >
 
    <Container className='w-75 mt-5 mb-5   shadow animate__animated animate__fadeInRight'>
    <Row>
    <Col lg={5} md={5} className='bg-white p-5'>
    <div>
    <img src={slogo} alt=""  className='w-100 mt-5 '/>
  </div>
     <div className='picup'>
        <div className='text-center  '   onSubmit={handleSubmit(formSubmit)}>
        <img src={ img.Image ? img.Image : logingif} alt=""  className='mt-3  upimg'/>
        </div>
        <label htmlFor="profileImage">
        <div className='upload'>
        <p className='text'>Upload</p>
        </div>
        <span className="glyphicon glyphicon-folder-open" aria-hidden="true"></span>
        <input type={"file"}  accept='image/*'  id='profileImage'  style={{display:"none"}}   onChange={handleUploadProfileImage}/>
        </label>
     </div>
  
    </Col>

    
    <Col lg={7} md={7} className='bg-white p-5'>
    <div>
    <Form  onSubmit={handleSubmit(formSubmit)}>
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <Form.Label>Full Name</Form.Label>
      <Form.Control {...register("FullName")} type="text"  placeholder="Enter First Name" />
    </Form.Group>
   <>
   <p className='text-danger small '>{errors.FullName?.message}</p>
  </>

    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
    <Form.Label>Phone Number</Form.Label>
    <Form.Control {...register("PhoneNumber")} type="text" placeholder="Enter Phone Number" />
  </Form.Group>
  <>
  <p className='text-danger small'>{errors.PhoneNumber?.message}</p>
 </>

  <Form.Group  className="mb-3" controlId="exampleForm.ControlInput3">
  <Form.Label>Email address</Form.Label>
  <Form.Control {...register("Email")}  type="email" placeholder="name@example.com" />
</Form.Group>
<>
<p className='text-danger small'>{errors.Email?.message}</p>
</>


<FormGroup className="mb-3" controlId="exampleForm.ControlInput4">
  
  <Form.Label>Password</Form.Label> 
  <InputGroup>
  <Form.Control className='rounded' {...register("Password")}
   type={visible?"text":"password"}  />
  <p id='eye' href='' onClick={handleVisible}>{visible ? <FaEyeSlash/> :<FaEye/> }</p>
  </InputGroup>
</FormGroup>
<>
<p className='text-danger small'>{errors.Password?.message}</p>
</>



<FormGroup className="mb-3" controlId="exampleForm.ControlInput4">
  <Form.Label>Password</Form.Label> 
  <InputGroup>
  <Form.Control className='rounded' {...register("ConfirmPassword")}
   type={visible2?"text":"password"}  />
  <p id='eye' onClick={handleVisible2}>{visible2 ? <FaEyeSlash/> :<FaEye/> }</p>
  </InputGroup>
</FormGroup>
<>
<p className='text-danger small'>{errors.ConfirmPassword?.message}</p>
</>



<Link to={'/login'} className='text-secondary text-decoration-none'><div className='mb-2 para'>Already have an account? Login</div></Link>



<div className="d-grid gap-2">
<Button id='signupbtn' variant="primary" type='submit' size="lg"  >
  Sign Up
</Button>
</div>
</Form>
    </div>
    </Col>
    </Row>
    </Container>
    </div>
  )
}

export default Signup