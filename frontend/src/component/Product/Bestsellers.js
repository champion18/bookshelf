// // slider not included 7:01, but its styling included in products.css

import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";

import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";

import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";

// const categories = [
//   "Laptop",
//   "Footwear",
//   "samosa",
//   "laddu",
//   "Bottom",
//   "Tops",
//   "Attire",
//   "Camera",
//   "SmartPhones",
// ];

const Bestsellers = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 2000]);
  const [category, setCategory] = useState("");

  const [ratings, setRatings] = useState(0);

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const { keyword } = useParams();

  const heading = keyword.charAt(0).toUpperCase() + keyword.slice(1);
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  let count = filteredProductsCount;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (keyword === "bestsellers")
      dispatch(getProduct("", currentPage, price, "", 4));
    else dispatch(getProduct("", currentPage, price, keyword, 0));

    // keyword, currentPage, price, category, ratings;
    // dispatch(getProduct(keyword, currentPage, price, "", 1));
  }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);

  // useEffect(() => {
  //   if (error) {
  //     alert.error(error);
  //     dispatch(clearErrors());
  //   }
  //   if (keyword === "bestsellers")
  //     dispatch(getProduct(currentPage, price, "", 4));
  //   else dispatch(getProduct(currentPage, price, keyword, 0));

  //   // keyword, currentPage, price, category, ratings;
  //   // dispatch(getProduct(keyword, currentPage, price, "", 1));
  // }, [dispatch, currentPage, price, category, ratings, alert, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="ShoeBazaar - Bestsellers" />

          <h2 className="productsHeading">{heading}</h2>

          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className="filterBox">
            <Typography>Filter by Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={2000}
            />

            <div className="productsFound">
              {" "}
              Selected price range
              <p>
                <b>
                  ₹{price[0]} - ₹{price[1]}
                </b>
              </p>
              <span>{count} product(s) found</span>
            </div>
          </div>

          {/* pagination */}
          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Previous"
                firstPageText="First"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};
export default Bestsellers;
