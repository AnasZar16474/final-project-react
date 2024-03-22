import axios from "axios"
import { useEffect, useState } from "react"
import Loader from "../../../Loader/Loader";
import { Link } from "react-router-dom";
function Products() {
  const[products,setProducts]=useState([])
  const [error,setError]=useState("")
  const [loader,setLoader]=useState(true);
  const[priceMin,setPriceMin]=useState("")
  const[priceMax,setPriceMax]=useState("")
  const getProducts=async()=>{
    try{
    const{data}=await axios.get(`${import.meta.env.VITE_API_URL}/products?page=1&limit=10`)
setProducts(data.products);}catch(Error){setError(Error.response.data.message)}
finally{
  setLoader(false)
  
}
  }
  useEffect(()=>{
    getProducts()
  },[])
const searchProducts=async(e)=>{
    try{
    const{data}=await axios.get(`${import.meta.env.VITE_API_URL}/products?search=${e.target.value}`)
setProducts(data.products);}catch(Error){setError(Error.response.data.message)}
finally{
  setLoader(false)
  
}
  
}
const getValue=async()=>{
  const value=document.getElementById("search").value
  console.log(value)
  try{
    const{data}=await axios.get(`${import.meta.env.VITE_API_URL}/products?page=1&limit=10&sort=${value}`)
setProducts(data.products);}catch(Error){setError(Error.response.data.message)}
finally{
  setLoader(false)
  
}
  
}
const handleFormA=(e)=>{

 setPriceMin(e.target.value)
console.log(priceMin)
}
const handleFormB=(e)=>{
  setPriceMax(e.target.value)
  console.log(priceMax)
  
  }
const handleSubmit=async(e)=>{
e.preventDefault();
try{
  const{data}=await axios.get(`${import.meta.env.VITE_API_URL}/products?price[gte]=${priceMin}&price[lte]=${priceMax}`)
setProducts(data.products)
console.log(data)
;}catch(Error){setError(Error.response.data.message)}
finally{
setLoader(false)

}

}

  if(loader){
    return <Loader/>
  }
  return (
  <>
    <p className="text-center fs-2">{error}</p>
<div className="input-group mb-3">
  <input type="text" placeholder="Search Products" onChange={searchProducts} className="form-control" aria-label="Dollar amount (with dot and two decimal places)" />
</div>
<div>
  <p className="fs-3">SortBy</p>
<select id="search" onChange={getValue}>
<option> default</option>
<option> price</option>
<option> -price </option>
<option> name </option>
<option> -name </option>
<option> discount </option>
<option> -discount </option>
</select>
<form onSubmit={handleSubmit}>
<input type="number" placeholder="min price" onChange={handleFormA}/>
<input type="number" placeholder="max price" onChange={handleFormB}/>
<input type="submit"/>
</form>
</div>
   <div className="d-flex justify-content-between flex-wrap gap-3">
{ 
products.map(e=>
<div key={e._id} className="card"  style={{width: '18rem'}}>
  <img src={e.mainImage.secure_url} className="card-img-top ratio ratio-4x3" alt="..." />
  <div className="card-body">
    <h5 className="card-title">{e.name}</h5>
    <p className="card-text">{e.description}</p>
    <Link className="btn btn-primary" to={`/product/${e._id}`}>details</Link>
  </div>
</div>
)
}
</div>
 </>
  )
}

export default Products
