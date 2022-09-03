import qs from "qs";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "./redux/slices/filterSlice";

// import { reducer } from "./reducer";
import { sortName } from "./components/Sort";
import { fetchPizza } from "./redux/slices/pizzaSlice";
const AppContext = createContext();

function AppProvider({ children }) {
  // let initialState = {
  //   pizzaData: [],
  //   loader: true,
  // };
  // const [state, useDispatch] = useReducer(reducer, initialState);

  // ! =============================== VARIABLES ===============================

  const [search, searchItem] = useState("");
  const [loader, setIsLoader] = useState(false);
  const { categoryId, sort } = useSelector((state) => state.filter);
  const sortProperty = sort.sortProperty;

  const { currentPage } = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  // ! ===============================  HANDLER FUNCTIONS ===============================

  const fetchData = async () => {
    const categoryIndex = `&category=${categoryId}`;
    const order = sortProperty.includes("-") ? "asc" : "desc";
    const sortIndex = `&sortBy=${sortProperty.replace("-", "")}&order=${order}`;
    const searchValue = `${search ? `search=${search}` : ""} `;
    // ! --------------------   URL   -----------------------

    try {
      setIsLoader(true);
      dispatch(
        fetchPizza({
          categoryIndex,
          sortIndex,
          searchValue,
          currentPage,
          categoryId,
        })
      );
      setIsLoader(false);
    } catch (error) {
      alert("something wrong on the server side");
      setIsLoader(false);
    }
  };

  // TODO if changed params and was first render
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, currentPage, sortProperty, navigate, sort]);
  // TODO : if was first render , then check for url params after we are keeping it on redux

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortName.find(
        (obj) => obj.sortProperty === params.sortProperty
      );
      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, [dispatch]); //dispatch

  // TODO : if was first render in order to ask for data

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchData();
    }
    isSearch.current = false;
  }, [categoryId, currentPage, sortProperty]);

  return (
    <AppContext.Provider value={{ loader, search, searchItem }}>
      {children}
    </AppContext.Provider>
  );
}
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
