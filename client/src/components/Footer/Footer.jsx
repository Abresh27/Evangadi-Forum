import React from "react";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import "./footer.css";

export default function Footer() {
  return (
    <section className="footer-container">
      <div className="footer">
        <div className="footer-section row">
          <div className="col-md-4">
            <img
              src="https://forum.ibrodev.com/assets/evangadi-logo-footer-f73bca57.png"
              alt="Evangadi-logo"
            />
            <div className="social-media-icons">
              <Link>
                <FacebookIcon className="social-media-links" />
              </Link>
              <Link>
                <InstagramIcon className="social-media-links" />
              </Link>
              <Link>
                <YouTubeIcon className="social-media-links" />
              </Link>
            </div>
          </div>
          <div className="col-md-4">
            <div className="footer-title">Useful Link</div>
            <Link className="useful-link">How it works</Link>
            <br />
            <Link className="useful-link">Terms of Service</Link>
            <br />
            <Link className="useful-link">Privacy policy</Link>
          </div>
          <div className="col-md-4">
            <div className="footer-title">Contact Info</div>
            <div className="contact-info">
              Evangadi Networks <br /> support@evangadi.com <br />{" "}
              +1-202-386-2702
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
