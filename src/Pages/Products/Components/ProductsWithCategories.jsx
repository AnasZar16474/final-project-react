import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../../../Loader/Loader";



function Products() {
  const [product, setProduct] = useState([]);
  const { id } = useParams();
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(true);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 3;
  const nPage = Math.ceil(product.length / recordsPerPage);
  const getProducts = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/category/${id}`
      );
      console.log(data.products)
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
  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const changeCPage = (id) => {
    console.log(currentPage);
    setCurrentPage(id);
  };
  const nextPage = () => {
    if (currentPage !== nPage) {
      setCurrentPage(currentPage + 1);
    }
  };
  const changeItems=()=>{
  for (let i = 1; i <= nPage; i++) {
    items.push(i);
    console.log(items);
  }
}
useEffect(()=>{
  changeItems()
},[nPage])
  if (loader) {
    return <Loader />;
  }

  return (
    <>
      <p className="text-center fs-2">{error}</p>
      <div className="d-flex flex-column gap-2 justify-content-center">
      <div className="d-flex justify-content-between flex-wrap gap-3">
        {product.length>0?product.slice((currentPage - 1) * 3, currentPage * 3).map((e) => {
          return (
            <div key={e._id} className="card" style={{ width: "18rem" }}>
              <img
                src={e.mainImage.secure_url}
                className="card-img-top ratio ratio-4x3"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">{e.name}</h5>
                <p className="card-text">price:{e.finalPrice}</p>
                <Link className="btn btn-primary" to={`/product/${e._id}`}>
                  details
                </Link>
              </div>
            </div>
          );
        }):<p className="text-center fs-2">no products</p>}
        </div>
            <div className="d-flex justify-content-center">
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <button className="page-link" onClick={prePage}>
              Previous
            </button>
          </li>
          {items.map((e) => {
            return (
              <li
                key={e}
                className={`page-item ${currentPage == e ? "active" : ""}`}
              >
                <button onClick={() => changeCPage(e)} className="page-link">
                  {e}
                </button>
              </li>
            );
          })}
          <li className="page-item">
            <button className="page-link" onClick={nextPage}>
              Next
            </button>
          </li>
        </ul>
    </nav>
      </div>
      </div>
    </>
  );
}

export default Products;
