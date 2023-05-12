import React from "react";
import logo from "./logo.png";
import { useContext, useState, useEffect } from "react";
import { FirebaseContextholder } from "./Firebase";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const firebase = useContext(FirebaseContextholder);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (firebase.isloggedin) {
      // navigate to home
      navigate("/");
    }
  }, [firebase, navigate]);
  const handlesubmit = (e) => {
    firebase.signupuser(email, password);
    e.preventDefault();
  };

  return (
    <>
      <div className="container">
        <figure className=" d-flex justify-content-center">
          <img
            src={logo}
            style={{ height: "250px" }}
            className="register-logo"
          />
        </figure>
      </div>
      <div
        className="d-flex justify-content-center col-md-12 mx-auto"
        style={{ padding: "10px" }}
      >
        <h3>
          <i style={{ color: "#47734a" }}>
            Unlock the full potential of our website by creating an account.
            It's quick, easy, and free!
          </i>
        </h3>
      </div>
      <div className="container my-5 border border-light rounded col-md-10">
        <form onSubmit={handlesubmit}>
          <div className="form-group mx-auto">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              value={email}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              value={password}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="d-flex justify-content-center mt-4">
            <button
              type="submit"
              className="btn btn-secondary"
              style={{ width: "200px" }}
              // onClick={handlesubmit}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default Register;
