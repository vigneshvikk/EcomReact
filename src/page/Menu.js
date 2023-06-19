import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'
import "../page/Menu.css"
import axios from 'axios';
import  { toast } from 'react-hot-toast';




function Menu() {
  const {filterby}=useParams()
  // console.log(params.filterby);
  const productData=useSelector(state=>(state.product.productList))
    // console.log(productData);
    const productDisplay=productData.filter(i=>(i._id === filterby))[0]
    // console.log(productDisplay);

//addcart
let location=useNavigate()
const addCart=async (cartList)=>{
  console.log(cartList);
  if(localStorage.getItem(("phNumber")|| "")){
// console.log(localStorage.getItem(("phNumber")|| ""));
const data={
  id:cartList._id,
  ProductName:cartList.ProductName,
  ProductCategory:cartList.productCategory,
  Price:cartList.price,
  imgUrl:cartList.imgUrl,
  Discription:cartList.discription,
  userPhone:(localStorage.getItem(("phNumber")|| "")),
  
}

console.log(data);


const result=await axios.post('http://localhost:8081/addCart',data)
toast(result.data.message);
location('/')


  }else{
    alert("please login ")
    location('/login')
  }

}

  return (
    <div>
   <Container className='shad mt-4  w-75  '>
    <Row id='row'>

    <Col lg={5} md={5} class Name='firstcol'>
    <div className='imagediv '>
    <img src={productDisplay.imgUrl} className='singleimg' alt="" />
    </div>
  </Col>

    <Col lg={7} md={7} className='secnodcol mt-5'>
    <h1 className='text-start mt-5 name'>{productDisplay.ProductName}</h1>
    <h4>{productDisplay.productCategory}</h4>
    <h4>{productDisplay.discription}</h4>
    
    <h2  >{productDisplay.price}<span> &#8377;</span> </h2>

    <div className='text-start d-flex gap-3 btnflx' >
    <div className='addcart'><button className='btn bg-primary btndiv text-light '   onClick={()=>addCart(productDisplay)}><strong>Add Cart</strong></button></div>
    <div className='buy '><button className='btn  buybtn text-light '><strong> Buy </strong></button></div>
    </div>

    </Col>
    </Row>
   </Container>
    </div>
  )
}

export default Menu