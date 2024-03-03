import axios from "axios"
import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Loader from "./Loader";
function Categories() {
  const[categories,setCategories]=useState([])
  const[loader,setLoader]=useState(true)
  const[error,setError]=useState("")
  const getCategories=async()=>{
    try{
    const {data}=await axios.get("https://ecommerce-node4.vercel.app/categories/active?page=1&limit=10")
    setCategories(data.categories)
   }catch(error){setError(error)}
   finally{
    setLoader(false);
   }}
 
  useEffect(()=>{
    getCategories()
  })
if(loader){
  return <Loader/>
}

  
  return (
<>
<p>{error}</p>
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