import axios from "axios";
import { useState } from "react"


function ForgotPassword() {
    const[user,setUser]=useState({
        email:"",
        password:"",
        code:""
    })
    const handleChange=(e)=>{
       const{ name , value }=e.target;
       setUser({
        ...user,
           [name]:value
       })

    }
    const handleSubmit=async(e)=>{
       e.preventDefault();
       const{data}=await axios.patch(`${import.meta.env.VITE_API_URL}/auth/forgotPassword`,user)
       console.log(data)
    }

  return (
    <form onSubmit={handleSubmit}>
<label> email </label>
<input type="email" name="email" value={user.email} onChange={handleChange}/>
<label> password </label>
<input  type="password" name="password" value={user.password} onChange={handleChange}/>
<label> code </label>
<input  type="text" name="code" value={user.code} onChange={handleChange}/>
<input type="submit" value="Register"/>

    </form>
  )
}

export default ForgotPassword