import React, { Component } from "react";
import "./BtnDelete.css";

class BtnDelete extends Component {
    deleteShoppingCart = () => {
        const options = { method: 'GET' };
        fetch('https://sales-cart-cot.onrender.com/', options)
            .then(response => response.json())
            .then(response => {
                console.log("Deleted");
                window.location.href = '/carrito';
            })
            .catch(err => console.error(err));
    }

    render() {
        return (
            <button onClick={this.deleteShoppingCart} className="btn-delete">
                {this.props.children}
            </button>
        );
    }
}

export default BtnDelete;