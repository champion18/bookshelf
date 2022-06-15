import React, { useEffect } from "react";
import "./dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";
import MetaData from "../layout/MetaData";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PeopleIcon from "@material-ui/icons/People";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  //   const lineState = {
  //     labels: ["Initial Amount", "Amount Earned"],
  //     datasets: [
  //       {
  //         label: "TOTAL AMOUNT",
  //         backgroundColor: ["tomato"],
  //         hoverBackgroundColor: ["rgb(197, 72, 49)"],
  //         // data: [0, totalAmount],
  //         data: [0, 4000],
  //       },
  //     ],
  //   };

  //   const doughnutState = {
  //     labels: ["Out of Stock", "InStock"],
  //     datasets: [
  //       {
  //         backgroundColor: ["#00A6B4", "#6800B4"],
  //         hoverBackgroundColor: ["#4B5000", "#35014F"],
  //         data: [outOfStock, products.length - outOfStock],
  //       },
  //     ],
  //   };

  return (
    <div className="sidebar">
      <div className="dashboard">
        <MetaData title="Dashboard - Admin Panel" />
        <div className="sitename">
          <Typography component="h1">Dashboard</Typography>
        </div>
        <div className="centerdiv">
          <Link to="/admin/product">
            <p>
              <ListAltIcon />
              Create Product
            </p>
          </Link>
          <Link to="/admin/products">
            <p>
              <ListAltIcon />
              View All Products
            </p>
          </Link>
          <Link to="/admin/orders">
            <p>
              <ListAltIcon />
              Orders
            </p>
          </Link>
          <Link to="/admin/users">
            <p>
              <PeopleIcon /> Users
            </p>
          </Link>
        </div>
        <div className="data">
          <ul>
            Total Products
            <li>{products && products.length} </li>
          </ul>

          <ul>
            Users
            <li> {users && users.length}</li>
          </ul>

          <ul>
            Products (in stock)
            <li>{products.length - outOfStock}</li>
          </ul>
        </div>

        <div className="data">
          <ul>
            Total Revenue
            <li>₹ {totalAmount} </li>
          </ul>

          <ul>
            Orders
            <li>{orders && orders.length} </li>
          </ul>

          <ul>
            Products (out of stock)
            <li>{outOfStock} </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
