import React from 'react'
import {GiKnifeFork} from'react-icons/gi'
import "../Component/FilterProduct.css"
function FilterProduct({Category,onClick}) {



  return (
    <div className='mt-2 fil' onClick={onClick}>

   <div className='fs-2 text-center p-3 text-warning mx-2  rounded-circle bg-light'><GiKnifeFork/></div>
   <p className='text-center my-1' ><b>{Category }</b></p>
    </div>
  )
}

export default FilterProduct