import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../../Loader/Loader";
import { Link } from "react-router-dom";
function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(true);
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [data, setData] = useState({});
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 3;
  const nPage = Math.ceil(data.total / recordsPerPage);
  const getProducts = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/products?page=1&limit=10`
      );
      setProducts(data.products);
      setData(data);
      console.log(data);
    } catch (Error) {
      setError(Error.response.data.message);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  const searchProducts = async (e) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/products?search=${e.target.value}`
      );
      setProducts(data.products);
    } catch (Error) {
      setError(Error.response.data.message);
    } finally {
      setLoader(false);
    }
  };
  const getValue = async (search) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/products?page=1&limit=10&sort=${search}`
      );
      setProducts(data.products);
    } catch (Error) {
      setError(Error.response.data.message);
    } finally {
      setLoader(false);
    }
  };
  const handleFormA = (e) => {
    setPriceMin(e.target.value);
    console.log(priceMin);
  };
  const handleFormB = (e) => {
    setPriceMax(e.target.value);
    console.log(priceMax);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/products?price[gte]=${priceMin}&price[lte]=${priceMax}`
      );
      setProducts(data.products);
      console.log(data);
    } catch (Error) {
      setError(Error.response.data.message);
    } finally {
      setLoader(false);
    }
  };
  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const changeCPage = (id) => {
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
      <div className="input-group mb-3">
        <input
          type="text"
          placeholder="Search Products"
          onChange={searchProducts}
          className="form-control"
          aria-label="Dollar amount (with dot and two decimal places)"
        />
      </div>
      <div className="d-flex justify-content-between flex-wrap">
        <div className="d-flex gap-2">
        <p className="fs-3">SortBy</p>
        <select onChange={(e)=>getValue(e.target.value)}>
          <option value="default"> default</option>
          <option value="finalPrice"> finalPrice</option>
          <option value="-finalPrice"> -finalPrice </option>
          <option value="name"> name </option>
          <option value="-name"> -name </option>
          <option value="discount"> discount </option>
          <option value="-discount"> -discount </option>
        </select>
        </div>
        <form onSubmit={handleSubmit}>
          <input type="number" placeholder="min price" onChange={handleFormA} />
          <input type="number" placeholder="max price" onChange={handleFormB} />
          <input className="ps-2 pe-2 bg-danger text-info" type="submit" value="Go" />
        </form>
      </div>
      <div className="d-flex flex-column gap-2 justify-content-center">
      <div className="d-flex justify-content-between flex-wrap gap-3">
        {products.slice((currentPage - 1) * 3, currentPage * 3).map((e) => {
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
        })}
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
