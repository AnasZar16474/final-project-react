import axios from "axios"
import { useEffect, useState } from "react"
function Products() {
  const[products,setProducts]=useState([])
  const token=localStorage.getItem("userToken")
  const getProducts=async()=>{
    const{data}=await axios.get(`${import.meta.env.VITE_API_URL}/products?page=1&limit=10`)
setProducts(data.products);
  }
  useEffect(()=>{
    getProducts()
  },[])
  const addToCart=async(id)=>{
    const{data}=await axios.post(`${import.meta.env.VITE_API_URL}/cart`,{
      productId:id
    },
    {
      headers:{
        Authorization:`Tariq__${token}`

      }
    })
    console.log(data)
  }
  return (
  <>
  
  {
    products.map(e=>
      <div className="d-flex" key={e._id}>
        <p>{e.name}</p>
        <img src={e.mainImage.secure_url}/>
        <button onClick={()=>addToCart(e._id)}>Add to cart</button>
      </div>

    )
  }
  
  
  
  </>
  )
}

export default Products
