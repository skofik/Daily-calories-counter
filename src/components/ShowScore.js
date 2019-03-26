import React from "react";
import BreakfastTab from "./BreakfastTab";
import SecondBreakfasTab from "./SecondBreakfasTab";
import DinnerTab from "./DinnerTab";
import SnackTab from "./SnackTab";
import SupperTab from "./SupperTab";
import DailyCounter from "./DailyCounter";

const ShowScore = props => {
  const tabel = props.product;
  const breakfastTab = [];
  const secondBreakfastTab = [];
  const dinnerTab = [];
  const snackTab = [];
  const supperTab = [];

  function distribution() {
    tabel.map(product => {
      if (product.mealTime === "breakfast") {
        breakfastTab.push(product);
      } else if (product.mealTime === "second-Breakfast") {
        secondBreakfastTab.push(product);
      } else if (product.mealTime === "dinner") {
        dinnerTab.push(product);
      } else if (product.mealTime === "snack") {
        snackTab.push(product);
      } else if (product.mealTime === "supper") {
        supperTab.push(product);
      }
      return tabel;
    });
  }

  distribution();
  return (
    <>
      <div className="boardScore">
        {breakfastTab.length >= 1 ? (
          <BreakfastTab tabBreakfast={breakfastTab} remove={props.remove} />
        ) : null}
        {secondBreakfastTab.length >= 1 ? (
          <SecondBreakfasTab
            secondBreakfastTab={secondBreakfastTab}
            remove={props.remove}
          />
        ) : null}
        {dinnerTab.length >= 1 ? (
          <DinnerTab tabDinner={dinnerTab} remove={props.remove} />
        ) : null}
        {snackTab.length >= 1 ? (
          <SnackTab snackTab={snackTab} remove={props.remove} />
        ) : null}
        {supperTab.length >= 1 ? (
          <SupperTab supperTab={supperTab} remove={props.remove} />
        ) : null}
      </div>
      <DailyCounter product={props.product} />
    </>
  );
};

export default ShowScore;
