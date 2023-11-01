import React, { Component } from 'react';
import NavComponent from './../components/NavComponent';
import Footer from './../components/Footer';
import carrito from './../assets/img/stock1.png';
import './Cotizar.css';


class Cotizar extends Component {

    state = {
        stock: [],
        status: false
    }

    getVehicles = () => {
        const options = { method: 'GET', headers: { Authorization: 'Basic Og==' } };
        fetch('https://servicio-stock.onrender.com/vehicles', options)
            .then(response => response.json())
            .then(response => {
                this.setState({
                    stock: response.vehicles,
                    status: true
                })
            })
            .catch(err => console.error(err));
    }

    componentDidMount() {
        this.getVehicles();
    }

    submitEvent = (event) => {
        event.preventDefault();
        const vehicleId = event.target[0].value;
        const name = event.target[1].value;
        const last_name = event.target[2].value;
        const email = event.target[3].value;
        const checkbox = event.target[4].checked;

        if (vehicleId === '0') {
            alert('Debe seleccionar un vehículo');
        }
        if (name === '') {
            alert('Debe ingresar su nombre');
        }
        if (last_name === '') {
            alert('Debe ingresar su apellido');
        }
        if (email === '') {
            alert('Debe ingresar su email');
        }
        if (!checkbox) {
            alert('Debe aceptar el tratamiento de datos');
        }

        if (vehicleId !== '0' && name !== '' && last_name !== '' && email !== '' && checkbox) {
            alert('Formulario enviado correctamente');
            window.location.href = '/';
        }
    }


    render() {
        return (
            <div>
                <NavComponent />
                <form className='form-cotizar' onSubmit={this.submitEvent}>
                    <div className='form-cotizar__left'>
                        <label htmlFor="select-vehicle">
                            <span>Cotizar:</span>
                            <select name="select" id="select-vehicle">
                                <option value="0">Seleccione un vehículo</option>
                                {
                                    this.state.stock.map((vehicle, vehicleIndex) => {
                                        return (
                                            <option key={vehicleIndex} value={vehicle.id}>{vehicle.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </label>
                        <img src={carrito} alt="Imagen de un carrito azul" />
                        <p>Conoce los precios y versiones haciendo click aquí o ingresa tus datos y un asesor se comunicara contigo.</p>
                    </div>
                    <div className='form-cotizar__right'>
                        <label htmlFor="name">
                            <span>Nombre:</span>
                            <input type="text" name="name" id="name" />
                        </label>
                        <label htmlFor="last-name">
                            <span>Apellido:</span>
                            <input type="text" name="last-name" id="last-name" />
                        </label>
                        <label htmlFor="email">
                            <span>Correo:</span>
                            <input type="email" name="email" id="email" />
                        </label>
                        <label htmlFor="terms">
                            <input className='checkbox-input' type="checkbox" name="terms" id="terms" />
                            <span>Aceptas el tratamiento de datos por parte de Motorshop S.A.S</span>
                        </label>
                        <button className='btn-subtmit' type="submit">Enviar</button>
                    </div>
                </form>
                <Footer />
            </div>
        )
    }
}

export default Cotizar;