// rfc
import React, { useState } from "react";
//import {ReactNavbar} from "overlay-navbar"
import "./Header.css";
//import Search from "../../Product/Search"
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <div>
      <div className="wrapper">
        <nav>
          <input type="checkbox" id="show-search" />
          <input type="checkbox" id="show-cart" />
          <input type="checkbox" id="show-menu" />
          <label htmlFor="show-menu" className="menu-icon">
            <i className="fas fa-bars"></i>
          </label>
          <div className="content">
            <div className="logo">
              <a href="/">Bookshelf</a>
            </div>
            <ul className="links">
              <li>
                <a href="/products">Books</a>
              </li>
              <li>
                <a href="/products/bestsellers">Bestsellers</a>
              </li>

              <li>
                <a href="#" className="desktop-link">
                  Genres
                </a>
                <input type="checkbox" id="show-items" />
                <label htmlFor="show-items">Genres</label>
                <ul>
                  <li>
                    <a href="#" className="desktop-link">
                      Fiction
                    </a>
                    <input type="checkbox" id="show-fiction" />
                    <label htmlFor="show-fiction">Fiction</label>
                    <ul>
                      <li>
                        <a href="/products/action">Action & Adventure</a>
                      </li>
                      <li>
                        <a href="/products/literature">Literature</a>
                      </li>
                      <li>
                        <a href="/products/romance">Romance</a>
                      </li>
                      <li>
                        <a href="/products/horror">Horror</a>
                      </li>
                      <li>
                        <a href="/products/crime">Crime & Mystery</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#" className="desktop-link">
                      Non-Fiction
                    </a>
                    <input type="checkbox" id="show-nonfiction" />
                    <label htmlFor="show-nonfiction">Non-Fiction</label>
                    <ul>
                      <li>
                        <a href="/products/business">Business & Economics</a>
                      </li>
                      <li>
                        <a href="/products/self-help">Self-Help</a>
                      </li>
                      <li>
                        <a href="/products/biography">Biography</a>
                      </li>
                      <li>
                        <a href="/products/history-humanities">
                          History & Humanities
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>

              <li>
                <a href="#" className="desktop-link">
                  Study Material
                </a>
                <input type="checkbox" id="show-services" />
                <label htmlFor="show-services">Study Material</label>
                <ul>
                  <li>
                    <a href="/products/school-textbooks">School Textbooks</a>
                  </li>
                  <li>
                    <a href="/products/competitive-exams">Competitive Exams</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="/products/used-books">Buy Used Books</a>
              </li>

              <li>
                <a href="#">Sell Old Books</a>
              </li>
            </ul>
          </div>

          <div className="content">
            <label htmlFor="show-search" className="search-icon">
              <i className="fas fa-search"></i>
            </label>

            <a
              href="/cart"
              className="search-icon"
              aria-label="View items in your shopping cart"
            >
              <i className="fa fa-shopping-cart" aria-hidden="true"></i>
            </a>

            <a className="search-icon" href="/login">
              <i className="fa fa-user-circle-o fa-lg" aria-hidden="true"></i>
            </a>
          </div>
          <form className="search-box" onSubmit={searchSubmitHandler}>
            <input
              type="text"
              placeholder="Search a Product..."
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button type="submit" className="go-icon">
              <i className="fas fa-long-arrow-alt-right"></i>
            </button>
          </form>
        </nav>
      </div>
    </div>
  );
};
export default Header;
