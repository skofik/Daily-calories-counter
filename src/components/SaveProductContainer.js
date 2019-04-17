import React from 'react';



const SaveProductContainer = (props) => {

    const saveTabel = props.product;

    let liCreation = () => {
        return saveTabel.map((item, index) => (
            <li key={item.name + index}>
                <span className="productName">{item.name}</span>
                <span>|{item.protein}<small>(b)</small>|</span>
                <span>|{item.carbohydrate} <small>(w)</small>|</span>
                <span>|{item.fat}<small>(t)</small>|</span>
                <span>|{item.calorie}<small>(kcal)</small>|</span>
            </li>
        ));
    };


    return (
        <div className="saveProductContainer">
            <ul>
                {liCreation()}
            </ul>
        </div>
    );
}

export default SaveProductContainer;