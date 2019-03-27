import React, { Component } from "react";
import "../styles/App.css";
import ShowScore from "./ShowScore";

class App extends Component {
  products = [];
  state = {
    name: "",
    mealTime: "",
    protein: "",
    carbohydrate: "",
    fat: "",
    calorie: "",
    amount: ""
  };
  correct = true;

  handleChange = e => {
    const name = e.target.name;
    if (e.target.name === "mealTime") {
      this.setState({
        mealTime: e.target.value
      });
    } else {
      this.setState({
        [name]: e.target.value
      });
    }
  };
  handleSubmit = e => {
    e.preventDefault();
    if (this.correct === true) {
      this.products.push(this.state);
      this.setState({
        name: "",
        protein: "",
        carbohydrate: "",
        fat: "",
        calorie: "",
        amount: ""
      });
    }
  };

  handleRemove = name => {
    let index = this.products.indexOf(name);
    this.products.splice(index, 1);
    this.setState({});
  };

  ChangeStyle = meal => {
    let color = "";
    if (meal === "breakfast") {
      color = "aqua";
    } else if (meal === "second-Breakfast") {
      color = "palevioletred";
    } else if (meal === "dinner") {
      color = "green";
    } else if (meal === "snack") {
      color = "red";
    } else if (meal === "supper") {
      color = "orangered";
    }

    if (this.state.mealTime === meal) {
      return { color: color, textDecorationLine: "underline" };
    } else {
      return { color: "white" };
    }
  };

  CheckedValue = name => {
    const style = {
      color: "red",
      paddingLeft: "10px",
      fontSize: "15px",
      fontStyle: "italic"
    };
    const { protein, carbohydrate, fat, calorie, amount } = this.state;

    if (name === "components") {
      if (
        calorie > 1000 ||
        carbohydrate > 1000 ||
        fat > 1000 ||
        protein > 1000
      ) {
        this.correct = false;
        return (
          <span style={style}>(liczba nie może być wieksza niż 1000 g) </span>
        );
      } else {
        this.correct = true;
      }
    } else if (name === "amount") {
      if (amount > 1000) {
        this.correct = false;
        return (
          <span style={style}>(liczba nie może być wieksza niż 1000 g) </span>
        );
      } else {
        this.correct = true;
      }
    } else if (name === "meal") {
      if (this.state.mealTime === "") {
        return <span style={style}>(proszę zaznaczyć porę posiłku) </span>;
      }
    }
  };

  render() {
    return (
      <>
        <div className="App">
          <form onSubmit={this.handleSubmit}>
            <h1>Dzienny licznik kalori</h1>
            <label>
              Wpisz nazwe i ilość spożytego produktu:
              <input
                name="name"
                type="text"
                maxLength="20"
                placeholder="Produkt"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </label>
            <input
              type="number"
              min="1"
              max="1000"
              name="amount"
              placeholder="liczba w(g)"
              value={this.state.amount}
              onChange={this.handleChange}
            />
            {this.CheckedValue("amount")}
            <br />
            <label>
              Wpisz wartość na 100 g produktu:
              <input
                type="number"
                name="protein"
                placeholder="B (g)"
                min="1"
                max="1000"
                value={this.state.protein}
                onChange={this.handleChange}
              />
              <input
                type="number"
                name="carbohydrate"
                placeholder="W (g)"
                min="1"
                max="1000"
                value={this.state.carbohydrate}
                onChange={this.handleChange}
              />
              <input
                type="number"
                name="fat"
                placeholder="T (g)"
                min="1"
                max="1000"
                value={this.state.fat}
                onChange={this.handleChange}
              />
              <input
                type="number"
                name="calorie"
                placeholder="Kcal"
                min="1"
                max="1000"
                value={this.state.calorie}
                onChange={this.handleChange}
              />
              {this.CheckedValue("components")}
            </label>
            <br />

            <label>Czas posiłku: </label>
            <label className="choiceInput">
              <label style={this.ChangeStyle("breakfast")}>
                <input
                  type="radio"
                  name="mealTime"
                  value="breakfast"
                  onChange={this.handleChange}
                />
                Śniadanie
              </label>
              <label style={this.ChangeStyle("second-Breakfast")}>
                <input
                  type="radio"
                  name="mealTime"
                  value="second-Breakfast"
                  onChange={this.handleChange}
                />
                II Śniadanie
              </label>
              <label style={this.ChangeStyle("dinner")}>
                <input
                  type="radio"
                  name="mealTime"
                  value="dinner"
                  onChange={this.handleChange}
                />
                Obiad
              </label>
              <label style={this.ChangeStyle("snack")}>
                <input
                  type="radio"
                  name="mealTime"
                  value="snack"
                  onChange={this.handleChange}
                />
                Przekąska
              </label>
              <label style={this.ChangeStyle("supper")}>
                <input
                  type="radio"
                  name="mealTime"
                  value="supper"
                  onChange={this.handleChange}
                />
                Kolacja
              </label>
            </label>
            {this.CheckedValue("meal")}

            <br />
            <button className="buttonAdd">Dodaj</button>
          </form>

          {this.products.length >= 1 ? (
            <ShowScore product={this.products} remove={this.handleRemove} />
          ) : null}
        </div>
      </>
    );
  }
}

export default App;
