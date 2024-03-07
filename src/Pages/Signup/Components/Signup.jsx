import axios from "axios";
import { useState } from "react";
import { object, string } from "yup";
function Signup() {
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    image: "",
  });
  const [error, setError] = useState([]);
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
      } catch (Error) {
        console.log(Error);
      }
    }
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
        <input type="submit" value="Register" />
      </form>
    </>
  );
}

export default Signup;
