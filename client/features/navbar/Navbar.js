import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div>
      <div className="nav"></div>
      <h1 className="logo">
        Nobody Beats the <span>bizz</span>
      </h1>
      <nav>
        {isLoggedIn ? (
          <div>
            <Link to="/home">Home</Link>
            <Link to="/products">All Products</Link>
            <Link to="/cart">My Cart</Link>
            {/* Added link to All Products */}
            <button type="button" onClick={logoutAndRedirectHome}>
              Logout
            </button>
          </div>
        ) : (
          <div>
            <Link to="/Home">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/cart">My Cart</Link>
            <Link to="/products">All Products</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
