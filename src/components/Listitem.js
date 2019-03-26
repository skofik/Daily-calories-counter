import React from "react";

const Listitem = props => {
  const addition = () => {
    let amountProtein = 0;
    let amountCarbons = 0;
    let amountFat = 0;
    let amountCalories = 0;
    for (let i = 0; i < props.short.length; i++) {
      amountProtein +=
        props.short[i].protein * 1 * (props.short[i].amount / 100);
      amountCarbons +=
        props.short[i].carbohydrate * 1 * (props.short[i].amount / 100);
      amountFat += props.short[i].fat * 1 * (props.short[i].amount / 100);
      amountCalories +=
        props.short[i].calorie * 1 * (props.short[i].amount / 100);
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
    return props.short.map(item => (
      <li key={item.name}>
        <span className="productName">{item.name}</span>
        <span>
          |{item.protein}
          <small>(b)</small>|
        </span>
        <span>
          |{item.carbohydrate}
          <small>(w)</small>|
        </span>
        <span>
          |{item.fat}
          <small>(t)</small>|
        </span>
        <span>
          |{item.calorie}
          <small>(kcal)</small>|
        </span>
        <button className="buttonRemove" onClick={() => props.remove(item)}>
          x
        </button>
      </li>
    ));
  };
  const name = props.short[0].mealTime;

  return (
    <>
      <h1> {name}</h1>
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
