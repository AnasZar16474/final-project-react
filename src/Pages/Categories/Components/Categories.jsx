import axios from "axios";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Loader from "../../../Loader/Loader";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
function Categories() {
  const [categories, setCategories] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");
  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/categories/active?page=1&limit=10`
      );
      setCategories(data.categories);
    } catch (Error) {
      setError(Error.response.data.message)
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  if (loader) {
    return <Loader />;
  }

  return (
    <>
      <p className="text-center fs-2">{error}</p>
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          "@0.00": {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          "@0.75": {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          "@1.00": {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          "@1.50": {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {categories.map((e) => (
          <div className="row" key={e._id}>
            <SwiperSlide key={e.id}>
              {" "}
              <Link to={`/products/${e._id}`}>
                {" "}
                <img
                  src={e.image.secure_url}
                />{" "}
              </Link>{" "}
            </SwiperSlide>
          </div>
        ))}
      </Swiper>
    </>
  );
}

export default Categories;
