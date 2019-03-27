import React from "react";
import Listitem from "./Listitem";

const BreakfastTab = props => {
  const products = props.tabBreakfast;
  return (
    <div className="breakfast">
      <Listitem products={products} remove={props.remove} />
    </div>
  );
};

export default BreakfastTab;
