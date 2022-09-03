import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useGlobalContext } from "../../context";
import { setCurrentPage } from "../../redux/slices/filterSlice";
import styles from "./Pagination.module.scss";

function Pagination() {
  const { currentPage } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  // const { paaginationActive, pageActive } = useGlobalContext();
  const page = [{ num: "1" }, { num: "2" }, { num: "3" }];
  return (
    <div className={styles.root}>
      <ul className={styles.ul}>
        {page.map((page, i) => {
          const style = styles.active;
          return (
            <li
              key={i}
              className={currentPage.num === page.num ? style : ""}
              onClick={() => dispatch(setCurrentPage(page))}
            >
              {page.num}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Pagination;
