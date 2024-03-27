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
        <div className="d-flex flex-column gap-2 col-4 align-items-center justify-content-center m-auto">
<label htmlFor="email"> email </label>
<input id="email" type="email" name="email" value={user.email} onChange={handleChange}/>
<label htmlFor="password"> password </label>
<input id="password"  type="password" name="password" value={user.password} onChange={handleChange}/>
<label htmlFor="code"> code </label>
<input id="code"  type="text" name="code" value={user.code} onChange={handleChange}/>
<input type="submit" value="Register"/>
</div>
    </form>
  )
}

export default ForgotPassword