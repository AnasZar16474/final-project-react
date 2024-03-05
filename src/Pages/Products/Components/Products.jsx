import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Products() {
  const [product, setProduct] = useState([]);
  const { id } = useParams();
  const getProducts = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/products/category/${id}`
    );
    setProduct(data.products);
    console.log(id);
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      {product.map((e) => (
        <div key={e.id}>
          <p>{e.name}</p>
          <img src={e.mainImage.secure_url}/>
          <img src={e.subImages.secure_url}/>
        </div>
      ))}
    </>
  );
}

export default Products;
