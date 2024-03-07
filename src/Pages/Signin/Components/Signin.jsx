import axios from "axios";
import { useState } from "react";
import { object, string } from 'yup';
function Signin() {
  const [user, setUser] = useState({
    email: "",
    password: "", 
  });
  const[error,setError]=useState([])
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
    if(await validateLogin()){
    try{
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/signin`,
     {user}
    );
    console.log("data", data);
  }catch(Error){console.log(Error)}
}
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
      <input type="submit" value="Login" />
    </form>
    </>
  )
}

export default Signin