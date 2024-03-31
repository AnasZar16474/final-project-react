import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { object, string } from "yup";


function ForgotPassword() {
  const navigate=useNavigate();
  const[error,setError]=useState([])
    const[user,setUser]=useState({
        email:"",
        password:"",
        code:""
    })
    const[loader,setLoader]=useState(false)
    const handleChange=(e)=>{
       const{ name , value }=e.target;
       setUser({
        ...user,
           [name]:value
       })

    }
    const validateData = async () => {
      const registerSchema = object({
        email: string().email().required(),
        password: string().required(),
        code: string().required(),
      })
      try {
        await registerSchema.validate(user, { abortEarly: false });
        return true;
      } catch (Error) {
        console.log(Error.errors);
        setError(Error.errors);
        return false;
      }
    }
    const handleSubmit=async(e)=>{
       e.preventDefault();
       setLoader(true);
       if(await validateData()){
       try{
       const{data}=await axios.patch(`${import.meta.env.VITE_API_URL}/auth/forgotPassword`,user)
        if(data.message=="success"){
          toast.success("reset password success", {
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
          navigate("/signin")  
      }
    }catch(Error){if(Error.response.data.message==="invalid code"){
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
    }
    if(Error.response.data.message==="not register account"){
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
        setLoader(false);
    }
  }
  setLoader(false);
  }
  return (
    <>
     {error.length > 0 ? error.map((e) => <p key={e}>{e}</p>) : ""}
    <form onSubmit={handleSubmit}>
        <div className="d-flex flex-column gap-2 col-4 align-items-center justify-content-center m-auto">
<label htmlFor="email"> email </label>
<input id="email" type="email" name="email" value={user.email} onChange={handleChange}/>
<label htmlFor="password"> password </label>
<input id="password"  type="password" name="password" value={user.password} onChange={handleChange}/>
<label htmlFor="code"> code </label>
<input id="code"  type="text" name="code" value={user.code} onChange={handleChange}/>
<input type="submit" value="Register" disabled={loader?"disabled":""}/>
</div>
    </form>
    </>
  )
}

export default ForgotPassword