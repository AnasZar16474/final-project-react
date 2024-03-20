import axios from "axios";
import { useState } from "react";
import { object, string } from "yup";
import {  Bounce, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
function Signup() {
  const navigate=useNavigate();
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    image: "",
  });
  const [error, setError] = useState([]);
  const[loader,setLoader]=useState(false)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleImage = (e) => {
    const { name, files } = e.target;
    setUser({
      ...user,
      [name]: files[0],
    });
  };
  const validateData = async () => {
    const registerSchema = object({
      userName: string().min(5).max(10).required(),
      email: string().email().required(),
      password: string().min(5).max(18).required(),
      image: string().required(),
    });
    try {
      await registerSchema.validate(user, { abortEarly: false });
      return true;
    } catch (Error) {
      console.log(Error.errors);
      setError(Error.errors);
      return false;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    if (await validateData()) {
      const formData = new FormData();
      formData.append("userName", user.userName);
      formData.append("email", user.email);
      formData.append("password", user.password);
      formData.append("image", user.image);
      console.log(user);
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/signup`,
          formData
        );
        console.log("data", data);
        if(data.message=="success"){
          toast.success('created success', {
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
            navigate("/");
    
        }
      } catch (Error) {
        if(Error.response.data.message === "email already exists"){
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
      }finally{
        setLoader(false);
      }
    }
    setLoader(false);
  };
  return (
    <>
      {error.length > 0 ? error.map((e) => <p key={e}>{e}</p>) : ""}
      <form onSubmit={handleSubmit}>
        <label htmlFor="userName">userName</label>
        <input
          type="text"
          placeholder="Entre name"
          id="userName"
          name="userName"
          onChange={handleChange}
          value={user.userName}
        />
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
        <label htmlFor="image">image</label>
        <input type="file" id="image" name="image" onChange={handleImage} />
        <input type="submit" disabled={loader?"disabled":null} value="Register" />
      </form>
    </>
  );
}
export default Signup;
