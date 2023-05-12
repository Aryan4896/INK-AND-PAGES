import "./styles.css";
import bootstrap from "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Signin from "./Signin";
import Register from "./Register";
import CustomNavbar from "./CustomNavbar";
import List from "./List";
import Homepage from "./Homepage";
import Bookdetail from "./Bookdetail";
// import Vieworder from "./Vieworder";

// import Cart from "./Cart";
export default function App() {
  return (
    <>
      <CustomNavbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/list" element={<List />} />
        {/* <Route path="/orders" element={<Cart />} /> */}
        <Route path="/book/view/:bookId" element={<Bookdetail />} />
      </Routes>
    </>
  );
}
