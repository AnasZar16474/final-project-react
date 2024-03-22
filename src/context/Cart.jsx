import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CartContext=createContext();

export const CartContextProvider=({children})=>{
    const token = localStorage.getItem("userToken");
    const [details, setDetails] = useState([]);
    const[count,setCount]=useState("")
    const [error, setError] = useState("");
    const [loader, setLoader] = useState(true);
    const getCart = async () => {
        try {
          const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
            headers: {
              Authorization: `Tariq__${token}`,
            },
          });
          setDetails(data.products);
          setCount(data.count)
        } catch (Error) {
          setError(Error.response.data.message);
        } finally {
          setLoader(false);
        }
      };
      useEffect(() => {
        getCart();}
        , [details]);

    return(
        <CartContext.Provider value={{count}}>
            {children}
        </CartContext.Provider>
    )
    }
    export default CartContextProvider;