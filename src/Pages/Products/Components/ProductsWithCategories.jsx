import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../../Loader/Loader";
import { Bounce, toast } from "react-toastify";

function Products() {
  const [product, setProduct] = useState([]);
  const { id } = useParams();
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(true);
  const [loaderA, setLoaderA] = useState(false);
  const token = localStorage.getItem("userToken");
  const getProducts = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/category/${id}`
      );
      setProduct(data.products);
    } catch (Error) {
      setError(Error.response.data.message);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  const addToCart = async (productId) => {
    setLoaderA(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/cart`,
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
        toast.success("added success", {
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
      }
    } catch (Error) {
      if (Error.response.data.message === "product already exists") {
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
    } finally {
      setLoaderA(false);
    }
  };

  if (loader) {
    return <Loader />;
  }

  return (
    <>
      <p className="text-center fs-2">{error}</p>
      <div className="d-flex justify-content-between flex-wrap gap-3">
        {product.map((e) => (
          <div key={e._id} className="card" style={{ width: "18rem" }}>
            <img
              src={e.mainImage.secure_url}
              className="card-img-top ratio ratio-4x3"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">{e.name}</h5>
              <p className="card-text">{e.description}</p>
              <button
                disabled={loaderA ? "disabled" : null}
                className="btn btn-primary"
                onClick={() => addToCart(e._id)}
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Products;
