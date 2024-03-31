import axios from "axios";
import { useContext, useEffect, useState } from "react";
import style from "../css/Cart.module.css";
import Loader from "../../../Loader/Loader";
import { Bounce, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { CartContext } from "../../../context/CartContext";
function Cart() {
  const [loaderA, setLoaderA] = useState(false);
  const [loaderB, setLoaderB] = useState(false);
  const [loaderC, setLoaderC] = useState(false);
  const token = localStorage.getItem("userToken");
 const{getCart,details,error,loader}=useContext(CartContext)
 useEffect(()=>{
getCart()
 },[])
  const increase = async (productId) => {
    setLoaderB(true);
    try {
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
      if(data.message==="success"){
       getCart()
      }
    } catch (Error) {
      console.log(Error);
    }
    finally{
      setLoaderB(false)
    }
  };
  const decrease = async (productId) => {
    setLoaderC(true);
    try {
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
      if(data.message==="success"){
        getCart()
       }
    } catch (Error) {
      console.log(Error);
    }
    finally{
      setLoaderC(false)
    }
  };

  const clearToCart = async (productId) => {
    setLoaderA(true);
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/cart/removeItem`,
        {
          productId,
        },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      if (data.message === "success") {
        toast.success("remove success", {
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
        getCart();
      }
    } catch (Error) {
      console.log(Error);
    } finally {
      setLoaderA(false);
    }
  };
  const clearAll= async () => {
    try {
      const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/clear`,null, {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      });
      if(data.message==="success"){
        getCart();
      }
    } catch (Error) {
      console.log(Error);
    }
  };
  if (loader) {
    return <Loader />;
  }

  return (
    <>
      {details.length > 0 ? (
        ""
      ) : (
        <p className="text-center fs-2">cart is empty</p>
      )}
      <p className="text-center fs-2">{error}</p>
      <div className={style.rowA}>
        {details.map((e) => (
          <div className={style.row} key={e.productId}>
            <p className="fs-3"> {e.details.name}</p>
            <button
             disabled={loaderC ? "disabled" : null}
              className={style.button}
              onClick={() => decrease(e.productId)}
            >
              -
            </button>
            <p className="fs-3"> {e.quantity}</p>
            <button
             disabled={loaderB ? "disabled" : null}
              className={style.button}
              onClick={() => increase(e.productId)}
            >
              +
            </button>
            <button
              disabled={loaderA ? "disabled" : null}
              className="fs-3 bg-danger rounded btn btn-secondary"
              onClick={() => clearToCart(e.productId)}
            >
              Clear
            </button>
          </div>
        ))}
       {details.length>0? <Link to="/Order"  className="fs-3 bg-danger rounded btn btn-secondary">checkout</Link>:""}
      </div>
    
      {details.length > 0 ? (
          <button
            className="fs-3 bg-danger rounded btn btn-secondary col-12"
            onClick={clearAll}
          >
            Clear All Products
          </button>
        ) : (
          ""
        )}
    </>
  );
}

export default Cart;
