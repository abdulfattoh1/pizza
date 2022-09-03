export const reducer = (state, action) => {
  if (action.type === "LOADER") {
    return { ...state, loader: action.payload };
  }
  if (action.type === "DATA") {
    return { ...state, pizzaData: action.payload, loader: false };
  }

  return { ...state };
};
