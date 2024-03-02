import axios from "axios"
import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
function Categories() {
  const[categories,setCategories]=useState([])
  const getCategories=async()=>{
  const {data}=await axios.get("https://ecommerce-node4.vercel.app/categories/active?page=1&limit=10")
  setCategories(data.categories)
 }
  useEffect(()=>{
    getCategories()
  })


  
  return (
<>
<Swiper
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
  {
    categories.map(e=>
      <div className="row"   key={e.id}>
 <SwiperSlide key={e.id}><img   className="col-xl-6 col-md-4 col-sm-6" src={e.image.secure_url}/></SwiperSlide>

      </div>
      )
  }
    
    
  </Swiper>
  
 
</>
  )





}



export default Categories