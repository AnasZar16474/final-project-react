import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const token = localStorage.getItem("userToken");
  const [count, setCount] = useState("");
  const [data, setData] = useState("");
  const getCart = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      });
      setData(data);
      setCount(data.count);
    } catch (Error) {
      console.log(Error);
    }
  };
  useEffect(() => {
    getCart();
  }, [data]);

  return (
    <CartContext.Provider value={{ count }}>{children}</CartContext.Provider>
  );
};
export default CartContextProvider;
