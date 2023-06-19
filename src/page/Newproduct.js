import React, { useState } from 'react'
import '../page/Newproduct.css';
import { Button, Col, Container ,Row} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import  { toast } from 'react-hot-toast';

function Newproduct() {
  const [name,setName]=useState("")
  const [category,setCategory]=useState("")
  const [imgUrl,setImgUrl]=useState("")
  const [price,setPrice]=useState(0)
  const [discription,setDiscription]=useState("")


  

let location=useNavigate()
  const addProduct=async (e)=>{
    e.preventDefault()
   
    const body={
      ProductName:name,
      productCategory:category,
      imgUrl,
      price,
      discription
    }

    if(body.ProductName && body.productCategory && body.imgUrl && body.price && body.discription){
      const result=await axios.post('http://localhost:8081/addProduct',body)
      
      toast(result.data.message)

      setTimeout(()=>{
        location('/')
      },2000)
    }else{
      toast("please fill required content")
    }
 

    
    


  }
  return (
     <div >
    <Container className='w-75 mt-5 mb-5 backclr   animate__animated animate__pulse'>
      <Row>
      <Col lg={12} md={12} >
      <form action="">
    <div id='h1head'>  <h1>Add Products</h1></div>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <Form.Label>Name Of Product</Form.Label>
      <Form.Control onChange={(e)=>setName(e.target.value)} type="text" placeholder="Name" />
    </Form.Group>

    <Form.Group className="mb-3" >
        <Form.Label>Category</Form.Label>
        <Form.Select onChange={(e)=>setCategory(e.target.value)}>
          <option value={"other"}>Select Category</option>
          <option value={"Icecream"}>Icecream</option>
          <option value={"Vegitables"}>Vegitables</option>
          <option value={"Fruits"}>Fruits</option>
          <option value={"Dosa"}>Dosa</option>
          <option value={"Pizza"}>Pizza</option>
          <option value={"Rice"}>Rice</option>
          <option value={"Cake"}>Cake</option>
          <option value={"Burger"}>Burger</option>
          <option value={"Chiken"}>Chiken</option>
          <option value={"Paneer"}>Paneer</option>
          <option value={"Sanwitch"}>Sanwitch</option>
        </Form.Select>
      </Form.Group>


      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
      <Form.Label>Image Url</Form.Label>
      <Form.Control onChange={(e)=>setImgUrl(e.target.value)} type="text" placeholder="Image Url" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
      <Form.Label>Price</Form.Label>
      <Form.Control onChange={(e)=>setPrice(e.target.value)} type="text" placeholder="Price" />
    </Form.Group>

    
    <FloatingLabel controlId="floatingTextarea2" label="Discription" className='mt-4 mb-2'>
    <Form.Control
    onChange={(e)=>setDiscription(e.target.value)}
      as="textarea"
      placeholder="Leave a comment here"
      style={{ height: '100px' }}
    />
  </FloatingLabel>

  <div className='text-left mt-3 me-1'>
  <Button variant="primary" type="submit"  onClick={(e)=>addProduct(e)}>
    Save &#128512;
  </Button>
</div>

      </form>
     </Col>
      </Row>
    </Container>
  
    </div>
  )
}

export default Newproduct

