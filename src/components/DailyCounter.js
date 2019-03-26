import React from "react";

const DailyCounter = props => {
  const amountAll = () => {
    let amountProtein = 0;
    let amountCarbons = 0;
    let amountFat = 0;
    let amountCalories = 0;

    for (let i = 0; i < props.product.length; i++) {
      amountProtein =
        amountProtein +
        props.product[i].protein * 1 * (props.product[i].amount / 100);
      amountCarbons =
        amountCarbons +
        props.product[i].carbohydrate * 1 * (props.product[i].amount / 100);
      amountFat =
        amountFat + props.product[i].fat * 1 * (props.product[i].amount / 100);
      amountCalories =
        amountCalories +
        props.product[i].calorie * 1 * (props.product[i].amount / 100);
    }
    return (
      <>
        <td>{amountProtein.toFixed(1)}</td>
        <td>{amountCarbons.toFixed(1)}</td>
        <td>{amountFat.toFixed(1)}</td>
        <td>{amountCalories.toFixed(1)}</td>
      </>
    );
  };
  return (
    <div className="dailyCounter">
      <table>
        <tbody>
          <tr>
            <th rowSpan="2">Podsumowanie dzienne</th>
            <th>B</th>
            <th>W</th>
            <th>T</th>
            <th>kcal</th>
          </tr>

          <tr>{amountAll()}</tr>
        </tbody>
      </table>
    </div>
  );
};

export default DailyCounter;
