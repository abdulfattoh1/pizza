import React from "react";
import Header from "./components/Header";
import Home from "./components/pages/Home";
import "./scss/app.scss";
import { Routes, Route } from "react-router-dom";
import Error from "./components/NotFound";
import Cart from "./components/pages/Cart";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
