// USE "/" IN ROUTES

import "./App.css";
import Header from "./component/layout/Header/Header.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import WebFont from "webfontloader";
import React, { useEffect, useState } from "react";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import LoginSignUp from "./component/User/LoginSignUp";
//import Search from "./component/Product/Search.js";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile.js";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import axios from "axios";
import Payment from "./component/Cart/Payment.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import Dashboard from "./component/admin/Dashboard.js";
import ProductList from "./component/admin/ProductList.js";
import NewProduct from "./component/admin/NewProduct";
import UpdateProduct from "./component/admin/UpdateProduct";
import OrderList from "./component/admin/OrderList";
import ProcessOrder from "./component/admin/ProcessOrder";
import UsersList from "./component/admin/UsersList";
import UpdateUser from "./component/admin/UpdateUser";
//import Bestsellers from "./component/Product/Bestsellers";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  //const stripe = useStripe();
  //const Elements = useElements();
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    // if (isAuthenticated) {
    store.dispatch(loadUser());
    getStripeApiKey();
    //  }
  }, []);

  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>
      <Header />

      {isAuthenticated && <UserOptions user={user} />}
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Routes>
            <Route path="/payment/process" element={<ProtectedRoute />}>
              <Route path="/payment/process" element={<Payment />} />
            </Route>
            <Route path="/success" element={<ProtectedRoute />}>
              <Route path="/success" element={<OrderSuccess />} />
            </Route>
          </Routes>
        </Elements>
      )}

      <Routes>
        {/* <Route path="/payment/process" element={<ProtectedRoute />}> */}

        {/* </Route> */}

        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />

        <Route path="/products/:keyword" element={<Products />} />

        {/* <Route path="/products/:keyword" element={<Bestsellers />} /> */}

        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/account" element={<ProtectedRoute />}>
          <Route path="/account" element={<Profile />} />
        </Route>

        <Route path="/me/update" element={<ProtectedRoute />}>
          <Route path="/me/update" element={<UpdateProfile />} />
        </Route>

        <Route path="/password/update" element={<ProtectedRoute />}>
          <Route path="/password/update" element={<UpdatePassword />} />
        </Route>

        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/shipping" element={<ProtectedRoute />}>
          <Route path="/shipping" element={<Shipping />} />
        </Route>

        <Route path="/order/confirm" element={<ProtectedRoute />}>
          <Route path="/order/confirm" element={<ConfirmOrder />} />
        </Route>

        <Route path="/orders" element={<ProtectedRoute />}>
          <Route path="/orders" element={<MyOrders />} />
        </Route>

        <Route path="/order/:id" element={<ProtectedRoute />}>
          <Route path="/order/:id" element={<OrderDetails />} />
        </Route>
        {/* <Route path="/search" element={<Search />} /> */}

        <Route
          isAdmin={true}
          path="/admin/dashboard"
          element={<ProtectedRoute />}
        >
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Route>
        <Route
          isAdmin={true}
          path="/admin/products"
          element={<ProtectedRoute />}
        >
          <Route path="/admin/products" element={<ProductList />} />
        </Route>

        <Route
          isAdmin={true}
          path="/admin/product"
          element={<ProtectedRoute />}
        >
          <Route path="/admin/product" element={<NewProduct />} />
        </Route>

        <Route
          isAdmin={true}
          path="/admin/product/:id"
          element={<ProtectedRoute />}
        >
          <Route path="/admin/product/:id" element={<UpdateProduct />} />
        </Route>

        <Route isAdmin={true} path="/admin/orders" element={<ProtectedRoute />}>
          <Route path="/admin/orders" element={<OrderList />} />
        </Route>

        <Route
          isAdmin={true}
          path="/admin/order/:id"
          element={<ProtectedRoute />}
        >
          <Route
            isAdmin={true}
            path="/admin/order/:id"
            element={<ProcessOrder />}
          />
        </Route>

        <Route isAdmin={true} path="/admin/users" element={<ProtectedRoute />}>
          <Route isAdmin={true} path="/admin/users" element={<UsersList />} />
        </Route>

        <Route
          isAdmin={true}
          path="/admin/user/:id"
          element={<ProtectedRoute />}
        >
          <Route
            isAdmin={true}
            path="/admin/user/:id"
            element={<UpdateUser />}
          />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
