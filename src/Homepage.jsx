import react, { useEffect, useState } from "react";
import { useContext } from "react";
import Cardcomponent from "./Cardcomponent";
import { FirebaseContextholder } from "./Firebase";
import img1 from "./image1.png";
import img2 from "./image2.png";
import img3 from "./img3.png";
const Homepage = () => {
  const firebase = useContext(FirebaseContextholder);
  const [books, setbooks] = useState([]);
  useEffect(() => {
    firebase.listallbooks().then((books) => setbooks(books.docs));
  }, []);

  return (
    <>
      <div className="img-holder">
        <img src={img1} alt="" className="large-image " />
        <img src={img2} alt="" className="medium-image" />
        <img src={img3} alt="" className="small-image" />
      </div>
      <div className="container">
        <h1 className="text-center" style={{ color: "#47734a" }}>
          Our Collection
        </h1>
      </div>

      <div className="container">
        <div
          className="row row-cols-1 row-cols-sm-2 row-cols-md-3  card-class"
          style={{ marginLeft: "60px" }}
        >
          {books.map((book) => (
            <div className="row col-10 mb-4 inner-card" key={book.id}>
              <Cardcomponent id={book.id} {...book.data()} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Homepage;

// name={book.data().name}
// title={book.data().name}
// price={book.data().price}
// authorname={book.data().authorname}
