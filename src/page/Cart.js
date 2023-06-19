import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import '../page/Cart.css'
import axios from 'axios'
import Form from 'react-bootstrap/Form';
import  { toast } from 'react-hot-toast';
function Cart() {
  const [Cartdata,setCartdata]=useState([])

  const [qty,setqty]=useState('')

const [sum,setsum]=useState('')




  useEffect(()=>{
    if(localStorage.getItem(("phNumber")||"")){
      const data=((localStorage.getItem(("phNumber")||"")));
      console.log(data);
      getCartItems(data)
     
    }else{
      console.log("please login");
    }

  },[])

  const getCartItems= async(userPhone)=>{
    console.log(userPhone);
const getdatas=await axios.post("http://localhost:8081/getCart",{"userPhone":userPhone});
setCartdata(getdatas.data.message);


// total()
}
console.log(Cartdata);

//total price

const totalPrice=()=>{
 var sum=0
Cartdata.map(i=>{
  
  sum=sum+((i.Price)*i.qty)
  console.log(i);
})

setsum(sum);
}

//handleqty
const handleQty= async(_id)=>{
  const data={
    _id,
    qty:qty
  }

  console.log(data);
const result=await axios.post("http://localhost:8081/addCartQty",data);
console.log(result.data.message);

setTimeout(()=>{
  window.location.reload();
},5000)


}




const deleteCart = async (_id)=>{
  console.log(_id);
  const result=await axios.post("http://localhost:8081/RemoveCartItem",{"_id":_id});
  toast(result.data.message)

  setTimeout(()=>{
    window.location.reload();
  },700)
}








  
  return (
    <div>
<Container className='mt-4'>
<Row>
<Col>
 <h2 className='text-start'>Your Cart <span>Items</span></h2>

{
 Cartdata.map(i=>{
    return(
    <Container id='cartcont'>
    <Row>
    <Col  lg={4} md={4} className='imgcol  text-center'>
    <div><img src={i.imgUrl}   alt="" /></div>
    </Col>
    <Col lg={8} md={8} className='contentcol'>
    <div className='d-flex justify-content-between'><div><h5 className='productName'>{i.ProductName}</h5></div><div className='mt-2  remove' onClick={()=>deleteCart(i._id)}>Remove</div></div>
    <p className='small dis'>{i.Discription}</p>
    <p className='price'>{i.Price}<span> &#8377;</span></p>
  
    <Form.Group className="qty" >
       
        <Form.Select id='qtysl' onChange={(e)=>setqty(e.target.value)} onClick={()=>{handleQty(i._id)}}  >
          <option value={"Qty"}>Qty</option>
          <option value={'1'} >1</option>
          <option value={'2'} >2</option>
          <option value={'3'} >3</option>
          <option value={'4'} >4</option>
          <option value={'5'} >5</option>
          <option value={'6'} >6</option>
          <option value={'7'} >7</option>
          <option value={'8'} >8</option>
        </Form.Select>
      </Form.Group>
      
      <p className='pqty'>Your have Selected {i.qty} Qty</p>
     
    </Col>
    </Row>
    </Container>


 

  
    )
  })
}
</Col>
</Row>
</Container>




 <Container id='endcont'>
<div className='d-flex divs'>
<div className='cls1'><p onClick={()=>totalPrice()}> View Total Price <span >{sum } &#8377;</span></p> 

</div>
<div className='cls2'><p>Place Order</p></div>
</div>
</Container>  




  </div>
  )
}

export default Cart