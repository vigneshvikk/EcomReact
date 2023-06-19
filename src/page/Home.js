import axios from 'axios'
import React, { useEffect, useState} from 'react'
import { setDataProduct } from '../Redux/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import '../page/Home.css';
import { Col, Container, Row } from 'react-bootstrap';
import {BsCartFill} from'react-icons/bs'
import FilterProduct from '../Component/FilterProduct';
import { Link, useNavigate } from 'react-router-dom';





function Home() {
const dispatch=useDispatch()
const productData=useSelector(state=>(state.product.productList))


  useEffect(()=>{
    getAllData();
    // setDataFilter(productData)
  },[])

  const getAllData=async ()=>{
    const result=await axios.get('http://localhost:8081/getAllProduct')
    dispatch(setDataProduct(result.data.message))
  }
  console.log(productData);



 const CategoryList = [...new Set(productData.map(el=>el.productCategory))]
console.log(CategoryList);

// filterdata display
// const [filterby,setFilterby]=useState([])
const [dataFilter,setDataFilter]=useState([])

const handleFilterProduct=(productCategory)=>{
  const filter=productData.filter(el=>el.productCategory.toLowerCase()==productCategory.toLowerCase())
  setDataFilter(()=>{
    return[
      ...filter
    ]
  })
}
console.log(dataFilter);


// addcart
let location = useNavigate()
const handleAddCartProduct=(id)=>{
location(`/menu/${id}`)
}



  return (

   
  <div>
      <div className='back  animate__animated animate__bounceInUp animate__slower'>
     <Container >
     <Row>
     <Col lg={6} md={6} >
     <h2 className='text-white text-left mt-5 headh2'><span className='text-danger'>
     The Fasted Delivery</span> In Your Home
     <div className='imgdiv text-end'><img src="https://i.postimg.cc/NMRZhnzb/del-removebg-preview.png"  alt="" /></div>
     </h2>
     <div className='mt-5'>
     <h3>Welcome to Veagle</h3>
     <p className='paras'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit nobis eos ratione laborum sequi, eaque illo blanditiis, beatae nulla enim in quidem cumque earum hic. Assumenda, consequatur dignissimos. Quod, rerum!  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi maiores, ea hic maxime facere quod corrupti adipisci sit nesciunt id enim praesentium earum asperiores quidem mollitia officiis soluta reiciendis. Laboriosam facere illo itaque optio nihil suscipit, quo placeat minima obcaecati.</p>
  
     <div className='text-end'><button className='btn bg-danger text-white' ><a href='#items' className='linkbtn'>Order Now</a></button></div>
     </div>
     </Col>
  
    <Col lg={6} md={6} className=''>
   
        
          
  
  
  
   
    
    </Col>
     </Row>
     </Container>
  </div>


 

        <div className='d-flex gap-2 justify-content-center filter'>
        {
          CategoryList[0] && CategoryList.map(el=>{
            return(
              <FilterProduct Category={el} onClick={()=>handleFilterProduct(el)}></FilterProduct>
            )
          })
        }
      </div>
  






<div>
   <Container id='filitems' >
  
  <hr />
  <Row>
  {
    dataFilter.map(i=>(
  
  
      <Col lg={3} md={4}  className='py-4  d-flex justify-content-center '>
     
           <div className='Main'>
              <div class="card shadow" >
             <Link to={`menu/${i._id}`}> <img src={i.imgUrl} alt="" className='w-100 pdtimg' height={300}/></Link>
          <div class="card-body">
            <h5 class="card-title">{i.ProductName}</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <h6 >{i.price} &#8377;</h6>
          <div className='p-2 text-end' ><button className='btn bg-warning  text-light' onClick={()=>handleAddCartProduct(i._id)}><strong>Add Cart</strong><BsCartFill className=' fs-4 text-primary ms-1'/></button></div>
          </div>
        </div>
              </div>
            
         
      
      </Col>
  
    ))
  
  }
  </Row>
  </Container>

  
  
    <Container id='items'>
    <h1 className='text-center mt-3'>Your Products</h1>
    <hr />
   <Row>
   {
    productData.map(i=>(
    
        <Col lg={3} md={4}  className='py-4  d-flex justify-content-center '>
             <div className='Main'>
           
                <div class="card shadow" >
                
                <Link to={`menu/${i._id}`} >
                <img src={i.imgUrl} alt="" className='w-100 pdtimg' height={300}/>
                </Link>
            <div class="card-body" >
              <h5  class="card-title">{i.ProductName}</h5>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <h6 >{i.price} &#8377;</h6>
            <div className='d-flex justify-content-between '><div onClick={()=>handleAddCartProduct(i._id)}><a href="#" class="btn btn-primary">Add Cart</a></div> <div><BsCartFill className=' fs-4 text-warning'/></div></div>
            </div>
          </div>
          
                </div>
              
           
        
        </Col>
    
      ))
  
    }
   </Row>
    </Container>
  
  
   
  
</div>  

 </div>
    
  )
}

export default Home