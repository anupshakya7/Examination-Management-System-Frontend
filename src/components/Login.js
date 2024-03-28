import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = localStorage.getItem("user-info");
    if (userInfo) {
      navigate("/");
    }
  }, [navigate]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (data.status === 200) {
        localStorage.setItem("user-info", JSON.stringify(data.user));
        navigate("/");
      }
    } catch (error) {
      console.error("There was an error!!!", error);
    }
  };
  return (
    <div className="card p-3 text-start shadow w-50 m-auto">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            onChange={handleChange}
            placeholder="Enter Email.."
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={handleChange}
            placeholder="Enter Password.."
          />
        </div>
        <button type="submit" className="btn btn-primary shadow">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
