import React, { Component } from "react";
import "../styles/App.css";
import ShowScore from "./ShowScore";
import SaveProductContainer from "./SaveProductContainer";

class App extends Component {
  products = [];
  saveProduct = [];

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
          name,
          mealTime,
          protein,
          carbohydrate,
          fat,
          calorie,
          amount,
        });
        index = "zero"
      } else {
        this.setState({
          [name]: e.target.value
        });
      }
    }
  };


  handleSubmit = e => {
    e.preventDefault();

    const validation = this.FormValidation();
    if (validation.correct) {
      this.products.push(this.state);
      if (this.state.save) {
        this.saveProduct.push(this.state)
      }
      this.setState({
        name: "",
        protein: "",
        carbohydrate: "",
        fat: "",
        calorie: "",
        amount: "",
        errors: { productName: false, productAmount: false, productValues: false, meal: false }
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

  // function dealeted product with list

  handleRemove = item => {
    let index = this.products.indexOf(item);
    this.products.splice(index, 1);
    this.setState({
    });
  };

  ChangeStyle = meal => {
    let color = "";

    switch (meal) {
      case "breakfast":
        color = "aqua";
        break;
      case "second-Breakfast":
        color = "palevioletred";
        break;
      case "dinner":
        color = "green";
        break;
      case "snack":
        color = "red";
        break;
      case "supper":
        color = "orangered";
        break;
      default:
    }

    if (this.state.mealTime === meal) {
      return { color: color, textDecorationLine: "underline" };
    } else {
      return { color: "white" };
    }
  };

  //  function validation of the form

  FormValidation = () => {
    let productName = false;
    let productAmount = false;
    let productValues = false;
    let meal = false;
    let correct = false;

    const { protein, carbohydrate, fat, calorie, amount, mealTime, name } = this.state;

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
      productName, productAmount, productValues, meal, correct
    };
  };


  handleSaveProduct = () => {
    this.setState({
      visibleSave: !this.state.visibleSave
    })
  }



  render() {
    const { visibleSave, name, errors, amount, protein, carbohydrate, fat, calorie, } = this.state;
    const { style, productNameError, productAmountError, productValuesError, mealError } = this.messages;
    return (
      <>
        <div className="App">
          <span className="saveIcon" onClick={this.handleSaveProduct} style={visibleSave ? { color: "blue" } : null}> <i className="fas fa-save"></i></span>
          {visibleSave ? <SaveProductContainer product={this.saveProduct} /> : null}

          <form onSubmit={this.handleSubmit} noValidate>
            <h1>Dzienny licznik kalori</h1>
            <label>
              Wpisz nazwe i ilość spożytego produktu:
              <input name="name" type="text" maxLength="20" placeholder="Produkt" value={name} onChange={this.handleChange} />
              {errors.productName && (<span style={style}> {productNameError} </span>)}
            </label>
            <input type="number" min="1" max="1000" name="amount" placeholder="liczba w(g)" value={amount} onChange={this.handleChange} /> {errors.productAmount && (<span style={style}> {productAmountError} </span>)}
            <br />
            <label>
              Wpisz wartość na 100 g produktu:
              <input type="number" name="protein" placeholder="B (g)" min="1" max="1000" value={protein} onChange={this.handleChange} />
              <input type="number" name="carbohydrate" placeholder="W (g)" min="1" max="1000" value={carbohydrate} onChange={this.handleChange} />
              <input type="number" name="fat" placeholder="T (g)" min="1" max="1000" value={fat} onChange={this.handleChange} />
              <input type="number" name="calorie" placeholder="Kcal" min="1" max="1000" value={calorie} onChange={this.handleChange} />
            </label> {errors.productValues && (<span style={style}> {productValuesError} </span>)}
            <br />
            <label>Czas posiłku: </label>
            <label className="choiceInput">
              <label style={this.ChangeStyle("breakfast")}>
                <input type="radio" name="mealTime" value="breakfast" onChange={this.handleChange} />
                Śniadanie
              </label>
              <label style={this.ChangeStyle("second-Breakfast")}>
                <input type="radio" name="mealTime" value="second-Breakfast" onChange={this.handleChange} />
                II Śniadanie
              </label>
              <label style={this.ChangeStyle("dinner")}>
                <input type="radio" name="mealTime" value="dinner" onChange={this.handleChange} />
                Obiad
              </label>
              <label style={this.ChangeStyle("snack")}>
                <input type="radio" name="mealTime" value="snack" onChange={this.handleChange} />
                Przekąska
              </label>
              <label style={this.ChangeStyle("supper")}>
                <input type="radio" name="mealTime" value="supper" onChange={this.handleChange} />
                Kolacja
              </label>
            </label>
            {errors.meal && (<span style={style}>{mealError}</span>)}
            <br />
            <button className="buttonAdd">Dodaj</button> <label><input type="checkbox" name="save" value="save" onChange={this.handleChange} /> zapisz produkt</label>
          </form>

          {this.products.length >= 1 ? (<ShowScore product={this.products} remove={this.handleRemove} />) : null}
        </div>
      </>
    );
  }
}

export default App;
