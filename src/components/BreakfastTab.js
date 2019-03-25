import React from "react";
import Listitem from "./Listitem";

const BreakfastTab = props => {
  const short = props.tabBreakfast;
  return (
    <div className="breakfast">
      <Listitem short={short} remove={props.remove} />
    </div>
  );
};

export default BreakfastTab;
