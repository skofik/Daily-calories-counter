import React from "react";

const DailyCounter = props => {


  const amountAll = () => {
    let amountProtein = 0;
    let amountCarbons = 0;
    let amountFat = 0;
    let amountCalories = 0;

    for (let i = 0; i < props.product.length; i++) {
      const { protein, carbohydrate, fat, calorie, amount } = props.product[i];
      amountProtein = amountProtein + protein * 1 * (amount / 100);
      amountCarbons = amountCarbons + carbohydrate * 1 * (amount / 100);
      amountFat = amountFat + fat * 1 * (amount / 100);
      amountCalories = amountCalories + calorie * 1 * (amount / 100);
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
