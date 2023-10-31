import React, { Component } from "react";
import { Link } from "react-router-dom";
import shopping_cart from "../assets/icons/shopping-cart.svg";
import "./NavBar.css";

class NavShoppingCart extends Component {

    state = {
        count: 0,
    }

    getShopCart = () => {
        const options = { method: "GET" };

        fetch("https://sales-cart-cot.onrender.com/show", options)
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    count: response.count
                });
            })
            .catch((err) => console.error(err));
    }

    componentDidMount() {
        this.getShopCart();
    }

    render() {
        return (
            <li className="navbar__nav-item shopping--cart">
                <Link className="shopping-cart--link" to="/carrito">
                    <img src={shopping_cart} alt="shopping_cart" />
                    {
                        (this.state.count > 0) && (
                            <span className="shopping--cart__counter">
                                {this.state.count}
                            </span>
                        )
                    }
                </Link>
            </li>
        );
    }
}

export default NavShoppingCart;