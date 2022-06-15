// { LOGIN DETAILS - ADMIN
//     "name":"Shashank",
//     "email":"shashank@gmail.com",
//     "password":"aasthaadminnew"
// }

import React, { Fragment, useRef, useState, useEffect } from "react";
import "./LoginSignUp.css";
import Loader from "../layout/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useLocation } from "react-router-dom";
import profile from "../../images/Profile.png";

const LoginSignUp = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  //const { cartItems } = useSelector((state) => state.cart);

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState(profile);
  const [avatarPreview, setAvatarPreview] = useState(profile);

  const loginSubmit = (e) => {
    // console.log("form submitted");
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    // console.log("register button clicked and img is " + avatar);
    // console.log("register button clicked and name is " + name);
    // console.log("register button clicked and email is " + email);
    // console.log("register button clicked and password is " + password);

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    if (avatar === null) {
      setAvatar(profile);
      setAvatarPreview(profile);

      myForm.set("avatar", avatar);
    } else myForm.set("avatar", avatar);

    //console.log("before dispatch, img is " + avatar);

    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          console.log("image = " + reader.result);
          // 0,1,2 states
          //    if (reader.result === null) {
          //   setAvatarPreview(profile);
          //   setAvatar(profile);
          // } else {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
          //  }
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  // const [searchParams] = useSearchParams();
  // const valueGot = searchParams ? searchParams.get("redirect") : "/account";

  //const redirect = location.search ? location.search.split("=")[1] : "/account";
  const valueGot = searchParams.get("redirect");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    // console.log(1);
    // console.log(isAuthenticated);
    // console.log(valueGot);
    //console.log(2);

    // if (isAuthenticated && valueGot === null) {
    //   navigate(`/account`);
    // } else {
    //   console.log(isAuthenticated);
    //   console.log(valueGot);
    //   navigate(`/${valueGot}`);
    // }

    // if (isAuthenticated == false && valueGot == null) {
    //   navigate("/login");
    // } else navigate(`/${valueGot}`);

    if (isAuthenticated && valueGot !== null) {
      navigate(`/${valueGot}`);
    } else if (isAuthenticated && valueGot === null) {
      //cartItems.length > 0 ? navigate("/cart") : navigate("/account");
      navigate("/account");
    } else {
      navigate("/login");
      // navigate("/cart");
      // if (isAuthenticated) navigate("/cart");
    }
  }, [dispatch, error, alert, isAuthenticated, navigate, valueGot]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
              </div>

              <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                <div className="loginEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <Link to="/password/forgot">Forgot Password</Link>
                <input type="submit" value="Login" className="loginBtn" />
              </form>

              <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>

                <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <input type="submit" value="Register" className="signUpBtn" />
              </form>
            </div>{" "}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default LoginSignUp;
