import React from "react";

const Listitem = props => {

  const addition = () => {
    let amountProtein = 0;
    let amountCarbons = 0;
    let amountFat = 0;
    let amountCalories = 0;


    for (let i = 0; i < props.products.length; i++) {
      const { protein, carbohydrate, fat, calorie, amount } = props.products[i];
      amountProtein += protein * 1 * (amount / 100);
      amountCarbons += carbohydrate * 1 * (amount / 100);
      amountFat += fat * 1 * (amount / 100);
      amountCalories += calorie * 1 * (amount / 100);
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

  const liCreation = () => {
    return props.products.map((item, index) => (
      <li key={item.name + index}>
        <span className="productName">{item.name}</span>
        <span>|{item.protein}<small>(b)</small>|</span>
        <span>|{item.carbohydrate}<small>(w)</small>|</span>
        <span>|{item.fat}<small>(t)</small>|</span>
        <span>|{item.calorie}<small>(kcal)</small>|</span>
        <button className="buttonRemove" onClick={() => props.remove(item)}> x </button>
      </li>
    ));
  };
  const name = () => {
    if (props.products[0].mealTime === "breakfast") {
      return "Śniadanie";
    } else if (props.products[0].mealTime === "second-Breakfast") {
      return "II Śniadanie";
    } else if (props.products[0].mealTime === "dinner") {
      return "Obiad";
    } else if (props.products[0].mealTime === "snack") {
      return "Przekąska";
    } else if (props.products[0].mealTime === "supper") {
      return "Kolacja";
    }
  };

  return (
    <>
      <h1> {name()}</h1>
      <h3>Nazwa produktu | białka | węgle | tłuszcze | kalorie</h3>
      <ul>{liCreation()}</ul>
      <table>
        <tbody>
          <tr>
            <th rowSpan="2">Suma</th>
            <th>B</th>
            <th>W</th>
            <th>T</th>
            <th>kcal</th>
          </tr>
          <tr>{addition()}</tr>
        </tbody>
      </table>
    </>
  );
};

export default Listitem;
