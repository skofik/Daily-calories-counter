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
  handleClick = e => {
    e.preventDefault();
    this.products.push(this.state);
    console.log(this.products);
    this.setState({
      name: "",
      protein: "",
      carbohydrate: "",
      fat: "",
      calorie: "",
      amount: ""
    });
  };

  render() {
    return (
      <>
        <div className="App">
          <h1>Daily Counter Calories</h1>
          <form>
            <label>
              Wpisz nazwe i ilość spożytego produktu:
              <input
                name="name"
                type="text"
                placeholder="Product"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </label>
            <input
              type="number"
              name="amount"
              placeholder="amount (g)"
              min="1"
              max="1000"
              value={this.state.amount}
              onChange={this.handleChange}
            />
            <br />
            <label>
              Wpisz wartość na 100g produktu:
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
            </label>
            <br />
            <label>Meal time: </label>
            <label>
              <input
                type="radio"
                name="mealTime"
                value="breakfast"
                onChange={this.handleChange}
              />
              Breakfast
            </label>
            <label>
              <input
                type="radio"
                name="mealTime"
                value="second-Breakfast"
                onChange={this.handleChange}
              />
              II Breakfast
            </label>
            <label>
              <input
                type="radio"
                name="mealTime"
                value="dinner"
                onChange={this.handleChange}
              />
              Dinner
            </label>
            <label>
              <input
                type="radio"
                name="mealTime"
                value="snack"
                onChange={this.handleChange}
              />
              Snack
            </label>
            <label>
              <input
                type="radio"
                name="mealTime"
                value="supper"
                onChange={this.handleChange}
              />
              Kolacja
            </label>

            <br />
            <button className="add" onClick={this.handleClick}>
              Dodaj
            </button>
          </form>
        </div>
        {this.products.length >= 1 ? (
          <ShowScore product={this.products} />
        ) : null}
      </>
    );
  }
}

export default App;
