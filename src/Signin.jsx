import React from "react";
import logo from "./logo.png";
import { Icon } from "@iconify/react";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseContextholder } from "./Firebase";

const Signin = () => {
  const firebase = useContext(FirebaseContextholder);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (firebase.isloggedin) {
      // navigate to home
      navigate("/");
    }
  }, [firebase]);

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      await firebase.signinuser(email, password);
    } catch (error) {
      // Handle the error here
      console.error("Sign in error:", error);
      alert("Failed to sign in. Please try again.");
    }
  };
  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await firebase.signinwithgoogle();
    } catch (error) {
      console.error("Google sign in error:", error);
      alert("Failed to sign in with Google. Please try again.");
    }
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
            Let's get lost in the world of books
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
              Sign In
            </button>
          </div>
        </form>
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-secondary mt-3"
            style={{ width: "200px" }}
            onClick={handleGoogleSignIn}
          >
            Sign in with Google <br />
            <Icon icon="bi:google" color="white" height="20" width="20" />
          </button>
        </div>
      </div>
    </>
  );
};
export default Signin;
