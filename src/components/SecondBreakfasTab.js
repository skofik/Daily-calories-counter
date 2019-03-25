import React from "react";
import Listitem from "./Listitem";

const SecondBreakfasTab = props => {
  const short = props.secondBreakfastTab;
  return (
    <div className="secondBreakfast">
      <Listitem short={short} remove={props.remove}/>
    </div>
  );
};

export default SecondBreakfasTab;
