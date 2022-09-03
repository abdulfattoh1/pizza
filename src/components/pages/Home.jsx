import React from "react";
import { useSelector } from "react-redux";
// import { useGlobalContext } from "../../context";
import Categories from "../Categories";
import Pagination from "../Pagination";
import PizzaBlock from "../PizzaBlock";
import PizzaLoader from "../PizzaBlock/PizzaLoader";
import Sort from "../Sort";

function Home() {
  // const { loader } = useGlobalContext();

  const { items, status } = useSelector((state) => state.pizza);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === "error" ? (
          <div>
            <h1>
              Sorry !!! , <br /> Unfortunately something wrong on the
              serverside, we could not get pizza
            </h1>
          </div>
        ) : status === "loading" ? (
          [...new Array(10)].map((_, index) => {
            return <PizzaLoader key={index} />;
          })
        ) : (
          items.map((data) => {
            return <PizzaBlock key={data.id} {...data} />;
          })
        )}
      </div>
      <Pagination />
    </div>
  );
}

export default Home;
