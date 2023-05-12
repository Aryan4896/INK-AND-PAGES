import React, { useState } from "react";
import { useContext, useEffect } from "react";
import { FirebaseContextholder } from "./Firebase";
const List = () => {
  const firebase = useContext(FirebaseContextholder);
  const [name, setName] = useState("");
  const [ISBN, setISBN] = useState("");
  const [price, setPrice] = useState("");
  const [coverpic, setcoverpic] = useState("");
  const [authorname, setauthorname] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handlesubmit = async (e) => {
    e.preventDefault();
    await firebase.addlisting(name, ISBN, price, coverpic, authorname);
    setSubmitted(true);
  };

  useEffect(() => {
    if (submitted) {
      setName("");
      setISBN("");
      setPrice("");
      setcoverpic("");
      setauthorname("");
      setSubmitted(false);
    }
  }, [submitted]);
  return (
    <>
      <div
        className="d-flex justify-content-center col-md-12 mx-auto"
        style={{ padding: "10px" }}
      >
        <h3>
          <i style={{ color: "#47734a" }}>
            Unleash the power of your Ink & Pages bookshelf. <br />
            List your books and share your stories with the world.
          </i>
        </h3>
      </div>
      <div className="container my-5 border border-light rounded col-md-10">
        <form>
          <div className="form-group mx-auto">
            <label htmlFor="exampleInputEmail1">Enter book name</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Book name"
            />
          </div>
          <div className="form-group mx-auto">
            <label htmlFor="exampleInputEmail1">Enter Your name</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setauthorname(e.target.value)}
              value={authorname}
              placeholder="Your name"
            />
          </div>
          <div className="form-group mx-auto">
            <label htmlFor="exampleInputEmail1">Enter ISBN</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setISBN(e.target.value)}
              value={ISBN}
              placeholder="ISBN"
            />
          </div>
          <div className="form-group mx-auto">
            <label htmlFor="exampleInputEmail1">Enter Price</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              placeholder="Price"
            />
          </div>

          <div className="form-group mx-auto">
            <label htmlFor="exampleInputEmail1">
              Upload Your Cover Picture
            </label>
            <input
              type="file"
              onChange={(e) => setcoverpic(e.target.files[0])}
              className="form-control"
            />
          </div>

          <div className="d-flex justify-content-center mt-4">
            <button
              type="submit"
              className="btn btn-secondary"
              style={{ width: "200px" }}
              onClick={handlesubmit}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default List;
