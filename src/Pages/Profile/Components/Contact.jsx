import axios from "axios"
import { useEffect, useState } from "react"
import Loader from "../../../Loader/Loader"


function Contact() {
  const[user,setUser]=useState({})
  const[loader,setLoader]=useState(true)
  const getProfile=async()=>{
    try{
      setLoader(true)
    const{data}=await axios.get(`${import.meta.env.VITE_API_URL}/user/profile`,
    {
      headers:{
        Authorization:`Tariq__${localStorage.getItem("userToken")}`
      }
    })
    console.log(data.user)
setUser(data.user)}catch(Error){console.log(Error)}
finally{
  setLoader(false)
}
  }
  useEffect(()=>{getProfile()},[])

  if(loader){
    return <Loader/>
  }

  return (
    <div className="d-flex flex-column gap-2">
   <p>email is:{user.email}</p>
   <p>role:{user.role}</p>
   </div>
  )
}

export default Contact