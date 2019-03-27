import React from "react";
import Listitem from "./Listitem";

const SupperTab = props => {
  const products = props.supperTab;
  return (
    <div className="supper">
      <Listitem products={products} remove={props.remove} />
    </div>
  );
};

export default SupperTab;
