import axios from "axios";
import { useEffect, useState } from "react";
import style from "../css/Cart.module.css"
function Cart() {
  const [details, setDetails] = useState([]);
  const token = localStorage.getItem("userToken");
  const getCart = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
      headers: {
        Authorization: `Tariq__${token}`,
      },
    });
    setDetails(data.products);
  };
  useEffect(() => {
    getCart();
  },[details]);
  const increase = async (productId) => {
    const { data } = await axios.patch(
      `${import.meta.env.VITE_API_URL}/cart/incraseQuantity`,
      {
        productId,
      },
      {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      }
    );
    console.log(data);
  };
  const decrease = async (productId) => {
    const { data } = await axios.patch(
      `${import.meta.env.VITE_API_URL}/cart/decraseQuantity`,
      {
        productId,
      },
      {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      }
    );
    console.log(data)
  };
  const clearToCart=async(id)=>{
    const{data}=await axios.patch(`${import.meta.env.VITE_API_URL}/cart/removeItem`,{
      productId:id
    },
    {
      headers:{
        Authorization:`Tariq__${token}`

      }
    })
    console.log(data)
  }

  return (
    <>
      {details.map( e => 
        <div key={e.productId}>
          <p>Product Name: {e.details.name}</p>
          <p>Quantity: {e.quantity}</p>
          <button className={style.button} onClick={() => increase(e.productId)}>increase</button>
          <button className={style.button} onClick={() => decrease(e.productId)}>decrease</button>
          <button onClick={()=>clearToCart(e.productId)}>Clear</button>
        </div>
      )}
  
  
  

    </>
  );
}

export default Cart;
