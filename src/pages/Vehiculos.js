import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavComponent from "./../components/NavComponent";
import Footer from "./../components/Footer";
import "./Vehiculos.css";

class Vehiculos extends Component {
    state = {
        stock: [],
        status: false,
    }

    cargarDatos = () => {
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
        this.cargarDatos();
    }    

    render() {
        console.log(this.state.stock);
        return (
            <div>
                <NavComponent />
                <div className="vehicles-container">
                    <h3>Nuestro catalogo.</h3>
                    {
                        this.state.status === false && (
                            <div className="loading">
                                <h1>Cargando...</h1>
                            </div>
                        )   
                    }
                    {
                        this.state.status === true &&
                        (
                            <div className="vehicles-list">
                                {
                                    this.state.stock.map((item, index) => {
                                        return (
                                            <Link key={index} to={`/detalle/${item.id}`} >
                                                <div className="vehicle-list__item" >
                                                    <img src={item.image} alt="Imagen del producto." />
                                                    <h4>{item.name}</h4>
                                                    <p>{Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(item.price)} COP</p>
                                                </div>
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                        )
                    }
                </div>
                <Footer />
            </div >
        )
    }
}

export default Vehiculos;