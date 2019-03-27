import React from "react";
import Listitem from "./Listitem";

const SecondBreakfasTab = props => {
  const products = props.secondBreakfastTab;
  return (
    <div className="secondBreakfast">
      <Listitem products={products} remove={props.remove} />
    </div>
  );
};

export default SecondBreakfasTab;
