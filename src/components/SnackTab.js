import React from "react";
import Listitem from "./Listitem";

const SnackTab = props => {
  const short = props.snackTab;
  return (
    <div className="snack">
      <Listitem short={short} remove={props.remove} />
    </div>
  );
};

export default SnackTab;
