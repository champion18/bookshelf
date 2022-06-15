import { Rating } from "@material-ui/lab";
import React from "react";
//import profilePng from "../../images/Profile.png";
import "./ProductDetails.css";

const ReviewCard = ({ review }) => {
  const options = {
    size: "large",
    value: review.rating,
    readOnly: true,
    precision: 0.5,
    name: "simple-controlled",
  };

  // let source = "";
  // if (review.avatar.url) source = review.avatar.url;

  return (
    <div className="reviewCard">
      <img src={review.avatar && review.avatar.url} alt="User" />
      <p>{review.name}</p>
      <Rating {...options} />
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
