import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";


function SendCode() {
    const[email,setEmail]=useState("")
    const[loader,setLoader]=useState(false)
    const navigate=useNavigate();
    const handleEmail=(e)=>{
        setEmail(e.target.value)
    }
    const handleSubmit=async(e)=>{
      e.preventDefault();
      setLoader(true);
      try{
        const{data}=await axios.patch(`${import.meta.env.VITE_API_URL}/auth/sendcode`,{email})
        if(data.message=="success"){
          toast.success('please check your email', {
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
            navigate("/ForgotPassword");
    
        }}catch(Error){console.log(Error)}
        finally{
          setLoader(false)
        }

    }
  return (
  <form onSubmit={handleSubmit}>
      <div className="d-flex flex-column gap-2 col-4 align-items-center justify-content-center m-auto">
   <label htmlFor="email">Email</label>
   <input id="email" type="email" value={email} onChange={handleEmail} />
   <input type="submit" value="Register" disabled={loader?"disabled":""}/>
   </div>
   
   </form>
   
   
  )
}

export default SendCode