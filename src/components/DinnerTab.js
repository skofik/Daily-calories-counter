import React from "react";
import Listitem from "./Listitem";

const DinnerTab = props => {
  const short = props.tabDinner;

  return (
    <div className="dinner">
      <Listitem short={short} remove={props.remove} />
    </div>
  );
};

export default DinnerTab;
