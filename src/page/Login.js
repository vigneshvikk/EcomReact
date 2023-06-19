import React, {  useState } from 'react'
import { Col, Container, InputGroup, Row } from 'react-bootstrap'
import inimages from'../assest/inimages.png'
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
import { useDispatch, useSelector } from 'react-redux';
import { loginRedux } from '../Redux/userSlice';


const schema = yup.object().shape({
  Email:yup.string().required("Email is required").email("Email is not valid !"),
  Password:yup.string().min(6,"password must be atleast 6 characters"),

})



function Login() {
  //use state for hide and show eye icon
  const [hideandshow,setHideAndShow]=useState(false)
  
  const eyeChange=()=>{
setHideAndShow(!hideandshow)
  }



  // const [isLoading, setLoading] = useState(false);

  // useEffect(() => {
  //   function simulateNetworkRequest() {
  //     return new Promise((resolve) => setTimeout(resolve, 2000));
  //   }

  //   if (isLoading) {
  //     simulateNetworkRequest().then(() => {
  //       setLoading(false);
  //     });
  //   }
  // }, [isLoading]);

  // const handleClick = () => setLoading(true);

const userData=useSelector(state=>state)
console.log(userData.user,'this');


const dispatch =useDispatch()


  const { handleSubmit,register,formState:{errors}}=useForm({
    resolver:yupResolver(schema)
  });
  
  
  
  const formSubmit = (data)=>{
 login(data);

}


let location=useNavigate()
const login= async (data)=>{
  

try{const result=await axios.post('http://localhost:8081/loginUser',data)
  toast(result.data.message)
  console.log(result.data);
  localStorage.setItem("phNumber",result.data.PhoneNumber)
  localStorage.setItem("image",result.data.Image)
  localStorage.setItem("name",result.data.FullName)

dispatch(loginRedux(result.data))
  setTimeout(()=>{
    location('/')
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
      <Col lg={5} md={5} className='bg-info'>
      <div>
      <img src={inimages} className='w-100' alt="" />
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
    <div ><Link to={"/signup"}  className='text-secondary text-decoration-none'><p id='para'>If you haven't account ?Please Signup </p></Link></div>

    <div className="text-end ">
    <button className='btn bg-primary text-light shadow' >
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

export default Login