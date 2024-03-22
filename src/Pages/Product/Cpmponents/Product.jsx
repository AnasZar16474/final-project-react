import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Bounce, toast } from "react-toastify";
import Loader from "../../../Loader/Loader";


function Product() {
  const [loaderA,setLoaderA]=useState(false);
  const token=localStorage.getItem("userToken")
  const{id}=useParams();
  const [productDetails, setProductDetails] = useState({});
  const[loader,setLoader]=useState(true);
  const getProductDetails=async()=>{
    try{
    const{data}=await axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`)
    console.log(productDetails)
    setProductDetails(data.product)
  }catch(Error){console.log(Error)}
finally{
  setLoader(false)
}}
  useEffect(()=>{
  getProductDetails(),[]
})
const addToCart=async(productId)=>{
  setLoaderA(true);
  try{
  const{data}=await axios.post(`${import.meta.env.VITE_API_URL}/cart`,{
    productId
  },
  {
    headers:{
      Authorization:`Tariq__${token}`

    }
  })
  if(data.message==="success"){
    toast.success("added success", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
      });
  }
}catch(Error){if(Error.response.data.message==="product already exists"){
  toast.error(Error.response.data.message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
    });
}}
finally{
  setLoaderA(false);
}
}
if(loader){
  return <Loader />
}
  return (
    <div className="d-flex flex-column gap-3">
<div className="d-flex gap-3 justify-content-between">
    <img src={productDetails.mainImage?.secure_url}/>
        
    {
      productDetails.subImages?.map(e=>
<div key={e.public_id}>
<img src={e.secure_url}/>
</div>
      )
    }
    </div>
    <div className="d-flex gap-3">
    <p>price: <span className="text-decoration-line-through">{productDetails.price}</span></p>
    <p>{productDetails.finalPrice}</p>
    </div>
    <button disabled={loaderA?"disabled":null}  className="btn btn-primary" onClick={()=>addToCart(productDetails._id)}>Add to cart</button>
    
    </div>
  )
}

export default Product