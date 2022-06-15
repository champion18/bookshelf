import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <footer id="footer">
      {/* use className instead of class */}
      <div className="leftFooter">
        <span>Download Our App</span>

        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>
      <div className="midFooter">
        <h1>Bookshelf.com</h1>
        <p>&copy; AasthaSingh</p> <p>All Rights Reserved 2022 </p>
      </div>

      <div className="rightFooter">
        <p>About the Developer</p>
        <div className="socialinks">
          <a href="https://www.linkedin.com/in/aastha-singh-05889a1a5/">
            {" "}
            <LinkedInIcon />
          </a>
          <a href="https://github.com/champion18">
            {" "}
            <GitHubIcon />
          </a>
          <a href="https://www.instagram.com/aastha9x/">
            <InstagramIcon />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
