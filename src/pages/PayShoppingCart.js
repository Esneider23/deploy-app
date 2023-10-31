import React, { Component } from 'react';
import NavComponent from './../components/NavComponent';
import Footer from './../components/Footer';
import './PayShoppingCart.css';



class PayShoppingCart extends Component {
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

    payEvent = (event) => {
        event.preventDefault();
        const number = event.target[0].value;
        const name = event.target[1].value;
        const expiration = event.target[2].value;
        const cvv = event.target[3].value;

        if (number === '') {
            alert('Debe ingresar el número de la tarjeta');
        }
        if (name === '') {
            alert('Debe ingresar el nombre del titular');
        }
        if (expiration === '') {
            alert('Debe ingresar la fecha de vencimiento');
        }
        if (cvv === '') {
            alert('Debe ingresar el cvv');
        }

        if (number !== '' && name !== '' && expiration !== '' && cvv !== '') {
            console.log(number, name, expiration, cvv);

            const options = { method: 'GET' };

            fetch('https://sales-cart-cot.onrender.com/', options)
                .then(response => response.json())
                .then(response => {
                    alert('Pago realizado correctamente');
                    window.location.href = '/';
                })
                .catch(err => console.error(err));
        }

    }


    render() {
        const copAmount = Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' })
            .format(this.state.totalPrice);
        return (
            <div>
                <NavComponent />
                <div className="shopping-cart-pay--container">
                    <div className="shopping-cart-pay__content">
                        <article>
                            <h2>Items a comprar:</h2>
                            {
                                this.state.status === false && (
                                    <div className='carrito__items__loading'>
                                        <h2>Cargando...</h2>
                                    </div>
                                )
                            }
                            {
                                this.state.status === true && (
                                    this.state.vehicles.map((carro, indexCarro) => {
                                        return (
                                            <p key={indexCarro}>{carro[1]}: {Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(carro[3])}</p>
                                        )
                                    })
                                )
                            }
                            <p><span>Total a pagar: </span> {copAmount}</p>
                        </article>
                        {
                            this.state.totalPrice > 0 && (
                                <form onSubmit={this.payEvent}>
                                    <label htmlFor="t-number">
                                        <p>Numero de tarjeta</p>
                                        <input type="number" name="number" id="t-number" placeholder="***** ***** ***** *****" />
                                    </label>
                                    <label htmlFor="t-name">
                                        <p>Nombre del propietario</p>
                                        <input type="text" name="name" id="t-name" placeholder="John Doe" />
                                    </label>
                                    <label htmlFor="t-expiration">
                                        <p>Fecha de expiracion</p>
                                        <input type="date" name="expiration" id="t-expiration" />
                                    </label>
                                    <label htmlFor="t-cvv">
                                        <p>CVV</p>
                                        <input type="number" name="cvv" id="t-cvv" placeholder="***" />
                                    </label>
                                    <input className="pay-btn" type="submit" value="Pagar" />
                                </form>
                            )
                        }
                    </div>
                </div>
                <Footer />
            </div >
        )
    }
}

export default PayShoppingCart;
