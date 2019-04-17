import React, { Component } from "react";
import "../styles/App.css";
import ShowScore from "./ShowScore";
import SaveProductContainer from "./SaveProductContainer";

class App extends Component {
  products = [];
  saveProduct = [];
  tabelRestApiProduct = [];
  state = {
    name: "",
    mealTime: "",
    protein: "",
    carbohydrate: "",
    fat: "",
    calorie: "",
    amount: "",
    save: false,
    visibleSave: false,

    errors: {
      productName: false,
      productAmount: false,
      productValues: false,
      meal: false
    }
  };

  messages = {
    style: {
      color: "red",
      paddingLeft: "10px",
      fontSize: "15px",
      fontStyle: "italic",
      textAlign: "center",
      display: "inline-block"
    },
    productNameError: "(Proszę wpisać nazwę)",
    productAmountError: "(Podaj liczbę od 0 do 1000g)",
    productValuesError: "(Uzupełnij wszystkie pola i podaj liczbę do 1000g)",
    mealError: "(Prosze zaznaczyć porę posiłku)"
  };


  // brak dostepnego lepszego api do uzupelnienia wyszukiwarki ;/


  SecondPart = () => {
    this.tabelRestApiProduct.forEach((food, index) => {


      if (food.name.indexOf(`${this.state.name}`) >= 0) {

        let calorie;
        let carbohydrate;
        let fat;
        food.nutrients.forEach(nutrient => {

          if (nutrient.nutrient_id === "208") {
            calorie = nutrient.value
          } else if (nutrient.nutrient_id === "205") {
            carbohydrate = nutrient.value
          } else if (nutrient.nutrient_id === "204") {
            fat = nutrient.value
          }

        })

        this.setState({
          carbohydrate: carbohydrate,
          fat: fat,
          calorie: calorie,
        })

      }

    })
  }

  handleSreachProduct = () => {

    const API = "http://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=DEMO_KEY&nutrients=205&nutrients=204&nutrients=208&nutrients=269";
    fetch(API)
      .then(response => {
        if (response.ok) { return response }
        throw Error("przekroczono liczbe żądań")
      })
      .then(response => response.json())
      .then(data => this.tabelRestApiProduct = data.report.foods.slice())
      .catch(err => console.log(err))
  }

  handleChange = e => {
    const name = e.target.name;
    let index;

    this.saveProduct.forEach((item) => {
      if (item.name === e.target.value) {
        index = this.saveProduct.indexOf(item)
      }
    })
    if (e.target.name === "mealTime") {
      this.setState({
        mealTime: e.target.value
      });
    } else if (e.target.name === "save") {
      this.setState({
        save: !this.state.save
      });
    }
    else {
      if (typeof (index) === "number") {
        const { name, mealTime, protein, carbohydrate, fat, calorie, amount } = this.saveProduct[index]
        this.setState({
          name: name,
          mealTime: mealTime,
          protein: protein,
          carbohydrate: carbohydrate,
          fat: fat,
          calorie: calorie,
          amount: amount,
        });
        index = "zero"
      } else {
        this.setState({
          [name]: e.target.value
        });
      }
    }

  };

  componentDidMount() {
    this.handleSreachProduct()
  }



  handleSubmit = e => {
    e.preventDefault();


    const validation = this.FormValidation();



    if (validation.correct === true) {
      this.products.push(this.state);
      if (this.state.save === true) {
        this.saveProduct.push(this.state)
      }
      this.setState({
        name: "",
        protein: "",
        carbohydrate: "",
        fat: "",
        calorie: "",
        amount: "",
        errors: {
          productName: false,
          productAmount: false,
          productValues: false,
          meal: false
        }
      });
    } else {
      this.setState({
        errors: {
          productName: !validation.productName,
          productAmount: !validation.productAmount,
          productValues: !validation.productValues,
          meal: !validation.meal
        }
      });
    }



  };

  handleRemove = item => {
    let index = this.products.indexOf(item);
    this.products.splice(index, 1);
    this.setState({
    });
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

  FormValidation = () => {
    let productName = false;
    let productAmount = false;
    let productValues = false;
    let meal = false;
    let correct = false;

    const {
      protein,
      carbohydrate,
      fat,
      calorie,
      amount,
      mealTime,
      name
    } = this.state;

    if (
      ((calorie < 1000 && calorie > 0) && (carbohydrate < 1000 && carbohydrate > 0) && (fat < 1000 && fat > 0) && (protein < 1000 && protein > 0)) &&
      (calorie !== "" && carbohydrate !== "" && fat !== "" && protein !== "")
    ) {
      productValues = true;
    }
    if (amount < 1000 && amount !== "") {
      productAmount = true;
    }
    if (mealTime !== "") {
      meal = true;
    }
    if (name !== "") {
      productName = true;
    }
    if (productName & productAmount & productValues & meal) {
      correct = true;
    }
    return {
      productName,
      productAmount,
      productValues,
      meal,
      correct
    };
  };

  handleSaveProduct = () => {

    this.setState({
      visibleSave: !this.state.visibleSave
    })
  }



  render() {

    return (
      <>
        <div className="App">
          <span className="saveIcon" onClick={this.handleSaveProduct} style={this.state.visibleSave ? { color: "white" } : null}> <i className="fas fa-save"></i></span>
          {this.state.visibleSave ? <SaveProductContainer product={this.saveProduct} /> : null}
          <form onSubmit={this.handleSubmit} noValidate>
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
              {this.state.errors.productName && (
                <span style={this.messages.style}>
                  {this.messages.productNameError}
                </span>
              )}
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
            {this.state.errors.productAmount && (
              <span style={this.messages.style}>
                {this.messages.productAmountError}
              </span>
            )}
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
            </label>
            {this.state.errors.productValues && (
              <span style={this.messages.style}>
                {this.messages.productValuesError}
              </span>
            )}
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
            {this.state.errors.meal && (
              <span style={this.messages.style}>{this.messages.mealError}</span>
            )}

            <br />
            <button className="buttonAdd">Dodaj</button> <label><input type="checkbox" name="save" value="save" onChange={this.handleChange} />zapisz produkt</label>
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
