import React from "react";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { FirebaseContextholder } from "./Firebase";
import { useNavigate } from "react-router-dom";
function Cardcomponent(props) {
  const firebase = useContext(FirebaseContextholder);
  const [url, seturl] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    firebase.getImageURL(props.imageURL).then((url) => seturl(url));
  }, []);
  return (
    <>
      <div className="card p-3" style={{ width: "18rem" }}>
        <img className="card-img-top" src={url} alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">
            Title of this book: {props.name}
            <br />
            This book is sold by: {props.authorname}
            <br />
            This book costs: Rs. {props.price}
            <br />
          </p>
          <div className="text-center ">
            <button
              className="btn bg-secondary"
              style={{ color: "white" }}
              onClick={(e) => navigate(`/book/view/${props.id}`)}
            >
              View
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cardcomponent;
