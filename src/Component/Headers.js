import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import vfly from '../assest/vfly.png'
import {BsCartFill} from'react-icons/bs'
import {FaUserCircle} from'react-icons/fa'
import { Link } from 'react-router-dom';
import './Headers.css';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import eagle from '../assest/eagle.png'
import { useDispatch, useSelector } from 'react-redux';
import { logoutRedux } from '../Redux/userSlice';
import  { toast } from 'react-hot-toast';

function Headers() {

  const [userimage,setuserimage]=useState('')
  const [name,setname]=useState('')

  const userData=useSelector((state)=>state.user)
  
useEffect(()=>{
  setuserimage(localStorage.getItem("image")|| "")
  setname(localStorage.getItem("name")|| "")
  
})
  console.log(name);



console.log(userimage);

  const [hide,setHide]=useState(true)

  const dispatch=useDispatch()


  const handleLogout=()=>{
   dispatch(logoutRedux())
   setHide(false)
   localStorage.removeItem("phNumber"); 
   localStorage.removeItem("image")
   toast("Logout Succesfully")
  }
  
  console.log(userData);
  return (
    <div >
 
    <Navbar bg="light" expand="lg" className='shadow'>
      <Container>
<Link to={''}>
          <Navbar.Brand href=""><img src={vfly} alt="" className='icon' style={{width:75}}/><img src={eagle} alt="" className='mt-2 pt-1' style={{width:75}}/></Navbar.Brand>
  
</Link>        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav ">
          <Nav className="ms-auto">

          <Link to={''} className='mt-2 ms-3 link'>Home</Link>
          <Link to={'/about'} className='mt-2 ms-3 link'>About</Link>
          <Link to={'/menu'} className='mt-2 ms-3 link'>Menu</Link>
          <Link to={'/contact'} className='mt-2 ms-3 me-3 link'>Contact</Link>
          </Nav>

          <div className='d-flex align-center'>
          <div >
            <Button variant="light"  className='d-flex align-center ' id='cart' >
            <Link to={'/cart'}><div> <BsCartFill className='fs-4 text-black'/></div></Link>
            <div><Badge bg="secondary" ></Badge></div>
            </Button>
          </div>

          <div className='fs-4 ms-2 cursor'>

          <Dropdown>
          <Dropdown.Toggle variant="light" id="dropdown-basic">
          {
            userimage ? <img src={userimage} alt="" width={30} height={30} className='rounded-circle shadow-sm'  /> : <FaUserCircle className='fs-4 '/>
            }
          </Dropdown.Toggle>
    
          {hide  ? <Dropdown.Menu className='shadow'>
            {
              userimage  ?  <div className='logoutlist ps-2' onClick={handleLogout}>logout<span className='username'>   { name } </span></div> :   <Link to={'/login'} className=' list'><div className='ps-2'>login</div> </Link>
          }
           
            <Link to={'/admin'} className=' list'><div className='ps-2'>Admin Login</div></Link>

          </Dropdown.Menu> : ""}
        </Dropdown>
          
          
         
          
          </div>
          </div>
         
        

        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default Headers