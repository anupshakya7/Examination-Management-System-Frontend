import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  //Local Storage User Info
  const userInfo = JSON.parse(localStorage.getItem("user-info"));
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("user-info");
    navigate("/login");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            EMS
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {!userInfo ? (
              <>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
                <div className="d-flex">
                  <Link to="/login" className="btn btn-outline-primary mx-1 ">
                    Login
                  </Link>
                  <Link to="/register" className="btn btn-outline-danger mx-1">
                    Register
                  </Link>
                </div>
              </>
            ) : (
              <>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        location.pathname === "/" ? "active" : ""
                      }`}
                      to="/"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        location.pathname === "/question" ? "active" : ""
                      }`}
                      to="/question"
                    >
                      Questions
                    </Link>
                  </li>
                </ul>
                <div className="dropdown" style={{ marginRight: "80px" }}>
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {userInfo.name}
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
