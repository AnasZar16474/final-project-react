import axios from "axios";
import { useState } from "react";

function Signin() {
  const [user, setUser] = useState({
    email: "",
    password: "", 
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/signin`,
     {user}
    );
    console.log("data", data);
  }catch(Error){console.log(Error)}
  
  };
  return (
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
      <input type="submit" value="Register" />
    </form>
  )
}

export default Signin