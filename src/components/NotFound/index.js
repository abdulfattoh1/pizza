import React from "react";
import { Link } from "react-router-dom";

function Error() {
  return (
    <>
      <div className="cart cart--empty">
        <h2 style={{ marginBottom: "50px" }}>Корзина пустая 😕</h2>
        <p style={{ marginBottom: "50px" }}>
          Вероятней всего, вы не заказывали ещё пиццу.
          <br />
          Для того, чтобы заказать пиццу, перейди на главную страницу.
        </p>
        <Link to="/" className="button button--black">
          <span>Вернуться назад</span>
        </Link>
      </div>
    </>
  );
}

export default Error;
