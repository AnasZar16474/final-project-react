import axios from "axios";
import { useState } from "react";
import { object, string } from 'yup';
import {  Bounce, toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../../context/User";
function Signin() {
  const{setUserToken}=useContext(UserContext)
  const navigate=useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "", 
  });
  const[error,setError]=useState([])
  const[loader,setLoader]=useState(false)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const validateLogin= async()=>{
   const schemaLogin= object({
      email: string().email().required(),
      password: string().min(5).max(18).required(),
    })
    try{ await schemaLogin.validate(user,{abortEarly:false})
     return true}
    catch(Error){console.log(Error) 
setError(Error.errors)
      return false}
   
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    if(await validateLogin()){
    try{
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/signin`,
     user
    );
    console.log("data", data);
    if(data.message=="success"){
      toast.success("login success", {
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
  localStorage.setItem("userToken",data.token);
  setUserToken(data.token)
  navigate("/");
} catch(Error){
  if(Error.response.data.message==="plz confirm your email"){
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
  else if(Error.response.data.message==="data invalid"){
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
finally{setLoader(false)}
  }setLoader(false);
};
  return (
    <>
    {error.length > 0 ? error.map((e) => <p key={e}>{e}</p>) : ""}
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">email</label>
      <input
        type="email"
        id="email"
        name="email"
        onChange={handleChange}
        value={user.email}
      />
      <label htmlFor=" password"> password</label>
      <input
        type="password"
        id="password"
        name="password"
        onChange={handleChange}
        value={user.password}
      />
      <input type="submit" disabled={loader?"disabled":null} value="Login" />
    </form>
    <Link to="/SendCode">Forgot Password??</Link>
    </>
  )
}

export default Signin
