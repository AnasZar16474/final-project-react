import axios from "axios"
import { useEffect } from "react"


function Profile() {
    const token=localStorage.getItem("userToken");
    const getOrder=async()=>{
        try{
        const{data}=await axios.get( `${import.meta.env.VITE_API_URL}/order`,{
            headers:{
                Authorization:`Tariq__${token}`
            }
        })
        console.log(data)
    }catch(Error){console.log(Error)}}
    useEffect(()=>{getOrder()},[])
  return (
    <div>Profile</div>
  )
}

export default Profile