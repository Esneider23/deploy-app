import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BtnBold from './../components/BtnBold';
import NavComponent from './../components/NavComponent';
import vehicle from './../assets/img/stock1.png';
import x_circle from './../assets/icons/x-circle.svg';
import './Carrito.css';
import BtnDelete from '../components/BtnDelete';


class Carrito extends Component {
    state = {
        vehicles: [],
        totalPrice: 0,
        status: false
    }

    getShopCart = () => {
        const options = { method: 'GET' };

        fetch('https://sales-cart-cot.onrender.com/shopcar', options)
            .then(response => response.json())
            .then(response => {
                this.setState({
                    vehicles: response.shopping_cart,
                    totalPrice: response.total_price,
                    status: true
                })
            })
            .catch(err => console.error(err));
    }

    componentDidMount() {
        this.getShopCart();
    }

    render() {
        console.log(this.state.totalPrice);
        return (
            <div>
                <NavComponent />
                <div className='carrito'>
                    <div className='carrito__items'>
                        <h1>Carrito</h1>
                        {
                            this.state.status === false ? (
                                <div className='carrito__items__loading'>
                                    <h2>Cargando...</h2>
                                </div>
                            ) : (
                                this.state.vehicles.map((carro, indexCarro) => {
                                    return (
                                        <div className='carrito__item' id={`item${indexCarro + 1}`}>
                                            <img className="carrito__item__img" src={vehicle} alt='carro' />
                                            <div className='carrito__item__info'>
                                                <p>{carro[1]}</p>
                                                <p>Precio: ${carro[3]}</p>
                                            </div>
                                            <img className='carrito__delete' src={x_circle} alt="" />
                                        </div>
                                    )
                                })
                            )
                        }
                    </div>
                    <div className='carrito__total'>
                        <p>Total: ${this.state.totalPrice}</p>
                        <Link to='/pay-shopping-cart'>
                            <BtnBold>Pagar</BtnBold>
                        </Link>
                        <BtnDelete>Eliminar</BtnDelete>  
                    </div>
                </div>
            </div>
        )
    }
}

export default Carrito;
