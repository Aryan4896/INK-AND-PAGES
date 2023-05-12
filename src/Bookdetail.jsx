import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FirebaseContextholder } from "./Firebase";
import { useContext } from "react";

const Bookdetail = () => {
  const firebase = useContext(FirebaseContextholder);
  const [quantity, setquantity] = useState(1);
  const [data, setData] = useState(null);
  const [url, setURL] = useState(null);
  const params = useParams();
  console.log(params);

  useEffect(() => {
    firebase.getBookById(params.bookId).then((value) => {
      setData(value.data());
    });
  }, []);

  useEffect(() => {
    if (data) {
      const imageURL = data.imageURL;
      firebase.getImageURL(imageURL).then((url) => setURL(url));
    }
  }, [data]);
  const placeOrder = async () => {
    const result = await firebase.placeorder(params.bookId, quantity);
    console.log("Order placed:", result);
  };
  return (
    <>
      {data && (
        <div
          className="container mt-5 d-flex flex-column align-items-center justify-content-center"
          style={{ minHeight: "80vh" }}
        >
          <h1 style={{ marginBottom: "10px" }}>{data.name}</h1>
          <img
            src={url}
            alt={data.name}
            width="250px"
            style={{ borderRadius: "10px" }}
          />
          <h1>Details</h1>
          <h4>Price:{data.price}</h4>
          <h4>By-{data.authorname}</h4>
          {/* <h4>By-{data.userEmail}</h4> */}
          {/* <input
            type="number"
            value={quantity}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter quantity"
            onChange={(e) => setquantity(e.target.value)}
          /> */}
          {/* <button className="btn btn-primary" onClick={placeOrder}>
            Buy Now
          </button> */}
        </div>
      )}
    </>
  );
};
export default Bookdetail;
