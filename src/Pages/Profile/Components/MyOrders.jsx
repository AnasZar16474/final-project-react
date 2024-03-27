import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../../Loader/Loader";

function MyOrders() {
    const[orders,setOrders]=useState([])
    const[loader,setLoader]=useState(true)
    const token=localStorage.getItem("userToken");
    const getOrder=async()=>{
        try{
            setLoader(true)
        const{data}=await axios.get( `${import.meta.env.VITE_API_URL}/order`,{
            headers:{
                Authorization:`Tariq__${token}`
            }
        })
        console.log(data.orders)
        setOrders(data.orders)
    }catch(Error){console.log(Error)}
finally{
    setLoader(false)
}}
    useEffect(()=>{getOrder()},[orders.status])
    const deleteOrder=async(order)=>{
        const token=localStorage.getItem("userToken")
        console.log(order)
    try{
        const{data}=await axios.patch(`${import.meta.env.VITE_API_URL}/order/cancel/${order}`,{},{
            headers:{
                Authorization:`Tariq__${token}`
            }
        })
        console.log(data)
    }catch(Error){console.log("error",Error)}
    }
    if(loader){
        return <Loader/>
    }
  return (
    <div>
    {orders.map((e)=>
        <div className="d-flex gap-3 flex-wrap" key={e._id}>
            <p>price: {e.finalPrice}</p>
            <p>Order Date: {e.createdAt}</p>
            <p>Order Status: {e.status}</p>
            {
               e.status=="pending"? <button className="btn btn-primary" onClick={()=>deleteOrder(e._id)}>Cancelled Order</button>: ""
            }
          
        </div>
   )
    }
    
    </div>
  )
}

export default MyOrders