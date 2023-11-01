import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavComponent from "./../components/NavComponent";
import Footer from "./../components/Footer";
import BtnBold from "./../components/BtnBold";
import check from "./../assets/icons/check-circle.svg";
import "./AddedCart.css";


class AddedCart extends Component {
    
    addCart = () => {
        const options = { method: "GET" };
        let path = window.location.pathname;
        let id = path.split("/")[2];
        console.log("id", id)
        
        fetch(`https://sales-cart-cot.onrender.com/shopcar/${id}`, options)
            .then((response) => response.json())
            .then((response) => {
                console.log(response.messeger);
            })
            .catch((err) => console.error(err));
    }

    componentDidMount() {
        this.addCart();
    }

    render() {
        return (
            <div>
                <NavComponent />
                <div className="added-cart-container">
                    <div className="added-cart__content">
                        <h2>Producto agregado al carrito</h2>
                        <img src={check} alt="Imagen de check" />
                        <div>
                            <Link to={`/vehiculos`}>
                                <BtnBold>Seguir comprando</BtnBold>
                            </Link>
                            <Link to={`/carrito`}>
                                <BtnBold>Ir al carrito</BtnBold>
                            </Link>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default AddedCart;