import React, { Fragment, useEffect } from "react";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";

// const product = {
//   name: "Nike Downshifter 11",
//   //images: [{ url: "https.//i.ibb.co/DRST11n.webp" }],
//   images: [
//     {
//       url: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/5aa03501-6cb3-4536-8fb3-ce551f1cc925/downshifter-11-road-running-shoes-SfsHLw.png",
//     },
//   ],
//   price: "Rs 3995",
//   _id: "786",
// };

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Bookshelf" />
          <div className="home">
            <div className="homeText">
              <p>
                What is a bookshelf other than a treasure chest for a curious
                mind?
              </p>
              <h1>Dive into the world of books...</h1>
              <a href="#container">
                <button id="explore">Explore</button>
              </a>
            </div>
            <div className="banner"></div>
          </div>

          <h2 className="homeHeading">Must Reads for 2022</h2>

          <div className="mustread" id="mustread"></div>

          <h2 className="homeHeading">Developer's Favourites</h2>

          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
