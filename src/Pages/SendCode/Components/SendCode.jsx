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
      <div className="d-flex flex-column gap-2 col-4 align-items-center justify-content-center m-auto">
   <label htmlFor="email">Email</label>
   <input id="email" type="email" value={email} onChange={handleEmail} />
   <input type="submit" value="Register"/>
   </div>
   
   </form>
   
   
  )
}

export default SendCode