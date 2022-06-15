// // cannot find pathname occurs when we forget to put "to" in <Link> tag

// import React from "react";
// import "./sidebar.css";
// import logo from "../../images/logo.png";
// import { Link } from "react-router-dom";
// import { TreeView, TreeItem } from "@material-ui/lab";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import PostAddIcon from "@material-ui/icons/PostAdd";
// import AddIcon from "@material-ui/icons/Add";
// import ImportExportIcon from "@material-ui/icons/ImportExport";
// import ListAltIcon from "@material-ui/icons/ListAlt";
// import DashboardIcon from "@material-ui/icons/Dashboard";
// import PeopleIcon from "@material-ui/icons/People";
// import RateReviewIcon from "@material-ui/icons/RateReview";

// const Sidebar = () => {
//   return (
//     <div className="left">
//       <div className="sidebar">
//         <Link to="/admin/dashboard">
//           <h2>Dashboard</h2>
//         </Link>

//         <div className="centre div">
//           <Link to="/admin/product" className="options">
//             <p>
//               <ListAltIcon />
//               Create Product
//             </p>
//           </Link>
//           <Link to="/admin/products" className="options">
//             <p>
//               <ListAltIcon />
//               View All Products
//             </p>
//           </Link>
//           <Link to="/admin/orders" className="options">
//             <p>
//               <ListAltIcon />
//               Orders
//             </p>
//           </Link>
//           <Link to="/admin/users" className="options">
//             <p>
//               <PeopleIcon /> Users
//             </p>
//           </Link>
//         </div>
//       </div>

//       <div className="right">
//         <div className="data">
//           <ul>
//             no.of products
//             <li>50 </li>
//           </ul>
//           <ul>
//             no.of users
//             <li> 3</li>
//           </ul>
//           <ul>
//             no.of orders
//             <li>7 </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
