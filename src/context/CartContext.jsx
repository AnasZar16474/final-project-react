import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const token = localStorage.getItem("userToken");
  const [count, setCount] = useState(0);
  const [details, setDetails] = useState([]);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(true);
  const getCart = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      });
      setCount(data.count);
      setDetails(data.products);
    } catch (Error) {
      setError(Error.response.data.message);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    getCart();
  }, []);

  return (
    <CartContext.Provider value={{ count,getCart,details,error,loader }}>{children}</CartContext.Provider>
  );
};
export default CartContextProvider;
