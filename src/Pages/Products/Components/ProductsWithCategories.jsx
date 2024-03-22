import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../../../Loader/Loader";


function Products() {
  const [product, setProduct] = useState([]);
  const { id } = useParams();
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(true);
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
              <Link className="btn btn-primary" to={`/product/${e._id}`}>details</Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Products;
