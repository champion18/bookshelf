import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ isAdmin }) {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  return (
    // <Fragment>
    //   {" "}
    //   {loading === false &&
    //     (isAdmin === true ? (
    //       isAuthenticated === true && user.role === "admin" ? (
    //         <Outlet />
    //       ) : (
    //         <Navigate to="/login" />
    //       )
    //     ) : isAuthenticated === true ? (
    //       <Outlet />
    //     ) : (
    //       <Navigate to="/login" />
    //     ))}
    // </Fragment>

    <Fragment>
      {loading === false &&
        (isAuthenticated === true ? (
          isAdmin === true && user.role !== "admin" ? (
            <Navigate to="/login" />
          ) : (
            <Outlet />
          )
        ) : (
          <Navigate to="/login" />
        ))}
    </Fragment>
  );
}
export default ProtectedRoute;
