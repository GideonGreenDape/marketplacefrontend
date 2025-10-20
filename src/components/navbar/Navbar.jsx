import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Navbar.scss";

function Navbar() {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log(currentUser)

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="left_align">
          <Link className="text " to="/">
            <span className="logotext">Talent MarketPlace</span>
          </Link>
          <span className="text dot">.</span>
        </div>
        <div className="links">
          {!currentUser?.isSeller && <span className="linktext">Become a Freelancer</span>}
          {currentUser ? (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src={currentUser.img || "/img/noavatar.jpg"} alt="" />
              <span className="username" >{currentUser?.username}</span>
              {open && (
                <div className="options">
                  {currentUser.isSeller && (
                    <>
                      <Link className="optiontext" to="/mygigs">
                        Gigs
                      </Link>
                      <Link className="optiontext" to="/add">
                        Add New Gig
                      </Link>
                    </>
                  )}
                  <Link className="optiontext" to="/orders">
                    Orders
                  </Link>
                  <Link className="optiontext" to="/messages">
                    Messages
                  </Link>
                  <Link className="optiontext" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="signInText">
                Sign in
              </Link>
              <Link className="buttonlink " to="/register">
                <button>Join</button>
              </Link>
            </>
          )}
        </div>
      </div>
      {(active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            <Link className="link menuLink" to="/gigs?cat=design">
              Graphics & Design
            </Link>
            <Link className="link menuLink" to="/gigs?cat=video">
              Video & Animation
            </Link>
            <Link className="link menuLink" to="/gigs?cat=writing">
              Writing & Translation
            </Link>
            <Link className="link menuLink" to="/gigs?cat=ai">
              AI Services
            </Link>
            <Link className="link menuLink" to="/gigs?cat=marketing">
              Digital Marketing
            </Link>
            <Link className="link menuLink" to="/gigs?cat=music">
              Music & Audio
            </Link>
            <Link className="link menuLink" to="/gigs?cat=tech">
              Programming & Tech
            </Link>
            <Link className="link menuLink" to="/gigs?cat=business">
              Business
            </Link>
            <Link className="link menuLink" to="/gigs?cat=lifestyle">
              Lifestyle
            </Link>
          </div>
          <hr />
        </>
      )}
    </div>
  );
}

export default Navbar;
