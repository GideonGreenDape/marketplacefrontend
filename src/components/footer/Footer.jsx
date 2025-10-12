import React from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="top">
          <div className="item">
            <h2>Categories</h2>
            <Link className="link" to="/gigs?cat=design">
              Graphics & Design
            </Link>
            <Link className="link" to="/gigs?cat=marketing">
              Digital Marketing
            </Link>
            <Link className="link" to="/gigs?cat=writing">
              Writing & Translation
            </Link>
            <Link className="link" to="/gigs?cat=video">
              Video & Animation
            </Link>
            <Link className="link" to="/gigs?cat=music">
              Music & Audio
            </Link>
            <Link className="link" to="/gigs?cat=tech">
              Programming & Tech
            </Link>
            <Link className="link" to="/gigs?cat=data">
              Data
            </Link>
            <Link className="link" to="/gigs?cat=business">
              Business
            </Link>
            <Link className="link" to="/gigs?cat=lifestyle">
              Lifestyle
            </Link>
            <Link className="link" to="/gigs?cat=photography">
              Photography
            </Link>
          </div>
          <div className="item">
            <h2>About</h2>
            <span>Press & News</span>
            <span>Partnerships</span>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Intellectual Property Claims</span>
            <span>Investor Relations</span>
            <span>Contact Sales</span>
          </div>
          <div className="item">
            <h2>Support</h2>
            <span>Help & Support</span>
            <span>Trust & Safety</span>
            <span>Talent on Market Place</span>
            <span>Hiring on Market Place</span>
          </div>
          <div className="item">
            <h2>Community</h2>
            <span>Customer Success Stories</span>
            <span>Community hub</span>
            <span>Forum</span>
            <span>Events</span>
            <span>Blog</span>
            <span>Influencers</span>
            <span>Affiliates</span>
            <span>Podcast</span>
            <span>Invite a Friend</span>
            <span>Become a Talent</span>
            <span>Community Standards</span>
          </div>
          <div className="item">
            <h2>More From Talent Marketplace</h2>
            <span>Market Place Business</span>
            <span>Market Place Pro</span>
            <span>Market Place Logo Maker</span>
            <span>Market Place Guides</span>
            <span>Get Inspired</span>
            <span>Market Place Workspace</span>
            <span>Learn</span>
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <h2>TalentMarket Place</h2>
            <span>© Market Place International Ltd. 2025</span>
          </div>
          <div className="right">
            <div className="social">
              <img src="/img/twitter.png" alt="" />
              <img src="/img/facebook.png" alt="" />
              <img src="/img/linkedin.png" alt="" />
              <img src="/img/pinterest.png" alt="" />
              <img src="/img/instagram.png" alt="" />
            </div>
            <div className="link">
              <img src="/img/language.png" alt="" />
              <span>English</span>
            </div>
            <div className="link">
              <img src="/img/coin.png" alt="" />
              <span>USD</span>
            </div>
            <img src="/img/accessibility.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
