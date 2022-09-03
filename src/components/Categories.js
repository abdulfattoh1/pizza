import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId } from "../redux/slices/filterSlice";

function Categories() {
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filter.categoryId);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };
  const category = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];
  return (
    <div className="categories">
      <ul>
        {category.map((item, index) => {
          return (
            <li
              key={index}
              onClick={() => onChangeCategory(index)}
              className={`${categoryId === index ? "active" : ""}`}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>


        
  );
}

export default Categories;
