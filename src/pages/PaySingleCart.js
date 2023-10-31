import React, { Component } from 'react';
import NavComponent from './../components/NavComponent';
import Footer from './../components/Footer';
import './PaySingleCart.css';


class PaySingleCart extends Component {

    state = {
        vehicle: [],
        status: false
    }

    getCart = () => {
        const options = { method: 'GET' };
        let path = window.location.pathname;
        let id = path.split("/")[2];

        fetch(`https://servicio-stock.onrender.com/vehicle/${id}`, options)
            .then(response => response.json())
            .then(response => {
                this.setState({
                    vehicle: response.vehicle,
                    status: true
                })
            })
            .catch(err => console.error(err));
    }

    componentDidMount() {
        this.getCart();
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
            alert('Pago realizado correctamente');
            console.log(number, name, expiration, cvv);
            window.location.href = '/';
        }

    }

    render() {
        const copAmount = Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' })
            .format(this.state.vehicle.price);
        return (
            <div>
                <NavComponent />
                <div className="single-pay--container">
                    <div className="single-pay__content">
                        <article>
                            {this.state.status === false ? (
                                <h2>Cargando...</h2>
                            ) : (
                                <div>
                                    <h2>{`Vehículo: ${this.state.vehicle.name}`}</h2>
                                    <p><span>Total a pagar:</span> {copAmount}</p>
                                </div>
                            )

                            }
                        </article>
                        {
                            this.state.status === true && (
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
            </div>
        )
    }
}

export default PaySingleCart;
