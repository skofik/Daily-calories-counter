import React from "react";
import Listitem from "./Listitem";

const DinnerTab = props => {
  const products = props.tabDinner;

  return (
    <div className="dinner">
      <Listitem products={products} remove={props.remove} />
    </div>
  );
};

export default DinnerTab;
