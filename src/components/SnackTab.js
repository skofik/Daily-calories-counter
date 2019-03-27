import React from "react";
import Listitem from "./Listitem";

const SnackTab = props => {
  const products = props.snackTab;
  return (
    <div className="snack">
      <Listitem products={products} remove={props.remove} />
    </div>
  );
};

export default SnackTab;
