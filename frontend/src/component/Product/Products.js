// slider not included 7:01, but its styling included in products.css

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

const categories = [
  "bestsellers",
  "action",
  "literature",
  "romance",
  "horror",
  "crime",
  "business",
  "self-help",
  "biography",
  "history-humanities",
  "school-textbooks",
  "competitive-exams",
  "used-books",
];
let heading = "All Books";

const Products = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 2000]);
  const [category, setCategory] = useState("");

  // const [ratings, setRatings] = useState(0);

  const {
    products,
    loading,
    error,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const { keyword } = useParams();

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  let count = filteredProductsCount;
  // useEffect(() => {
  //   if (error) {
  //     alert.error(error);
  //     dispatch(clearErrors());
  //   }

  //   // keyword, currentPage, price, category, ratings;
  //   dispatch(getProduct(keyword, currentPage, price, category));
  // }, [dispatch, keyword, currentPage, price, category, alert, error]);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (keyword === "bestsellers" || category === "bestsellers") {
      heading = "Bestsellers";
      dispatch(getProduct("", currentPage, price, "", 4));
    } else if (categories.includes(keyword)) {
      heading = keyword.charAt(0).toUpperCase() + keyword.slice(1);
      dispatch(getProduct("", currentPage, price, keyword, 0));
    }
    // keyword, currentPage, price, category, ratings;
    else {
      // if (category === "bestsellers") {
      //   dispatch(getProduct("", currentPage, price, "", 4));
      //   heading = "Bestsellers";
      // } else {
      if (!keyword && !category) heading = "All Books";
      else if (keyword) heading = "Search Results";
      else heading = category.charAt(0).toUpperCase() + category.slice(1);
      dispatch(getProduct(keyword, currentPage, price, category));
    }
  }, [dispatch, keyword, currentPage, price, category, alert, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={heading} />

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
              <span>Selected price range</span>
              <p id="pricerange">
                <b>
                  ₹{price[0]} - ₹{price[1]}
                </b>
              </p>
              <span>{count} product(s) found</span>
            </div>

            {!categories.includes(keyword) && (
              <ul className="categoryBox">
                <Typography>Categories</Typography>

                {categories.map((category) => (
                  <li
                    className="category-link"
                    key={category}
                    onClick={() => setCategory(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* pagination */}
          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={filteredProductsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Previous"
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
export default Products;
