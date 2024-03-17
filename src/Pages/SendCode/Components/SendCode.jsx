import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function SendCode() {
    const[email,setEmail]=useState("")
    const navigate=useNavigate();
    const handleEmail=(e)=>{
        setEmail(e.target.value)
    }
    const handleSubmit=async(e)=>{
      e.preventDefault();
        const{data}=await axios.patch(`${import.meta.env.VITE_API_URL}/auth/sendcode`,{email})
        console.log(data)
        navigate("/ForgotPassword")

    }
  return (
  <form onSubmit={handleSubmit}>
   <label>Email</label>
   <input type="email" value={email} onChange={handleEmail} />
   <input type="submit" value="Register"/>
   
   
   </form>
   
   
  )
}

export default SendCode