import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"


function Product() {
  const{id}=useParams();
  const [productDetails, setProductDetails] = useState();
  const getProductDetails=async()=>{
    const{data}=await axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`)
    console.log(productDetails)
    setProductDetails(data.product)
  }
  useEffect(()=>{
  getProductDetails(),[]
})
  return (
    <>
    <img src={productDetails.mainImage.secure_url}/>
    
    </>
  )
}

export default Product