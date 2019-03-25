import React from "react";
import Listitem from "./Listitem";

const SupperTab = props => {
  const short = props.supperTab;
  return (
    <div className="supper">
      <Listitem short={short} remove={props.remove} />
    </div>
  );
};

export default SupperTab;
