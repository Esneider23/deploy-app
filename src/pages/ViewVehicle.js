import React, { Component } from "react";
import BtnBold from "./../components/BtnBold";
import BtnNormal from "./../components/BtnNormal";
import NavComponent from "./../components/NavComponent";
import Footer from "./../components/Footer";
// import vehiclePhoto from "./assets/img/stock1.png";
import { Link } from "react-router-dom";
import './ViewVehicle.css';
import PdfIcon from "./../assets/icons/picture-as-pdf.svg";



let idProduct = 0;

class ViewVehicle extends Component {

    state = {
        vehicle: {},
        status: false
    }

    cargarDatos = () => {
        const options = { method: 'GET' };
        let path = window.location.pathname;
        let id = path.split("/")[2];
        idProduct = id;
        console.log("id", id);

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
        this.cargarDatos();
    }

    render() {
        let { vehicle } = this.state;
        console.log(vehicle);
        const copAmount = Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(vehicle.price);

        return (
            <div id="view-vehicle">
                <NavComponent />
                {
                    this.state.status === false && (
                        <div className="loading">
                            <h1>Cargando...</h1>
                        </div>
                    )

                }
                {
                    this.state.status === true && (
                        <div className="info-vehicle-container">
                            <div className="info-vehicle__left">
                                <picture>
                                    <img className="img-auto-view" src={vehicle.image} alt="" />
                                </picture>
                                <div>
                                    <h2>Description</h2>
                                    <p>
                                        {vehicle.description}
                                    </p>
                                </div>
                            </div>
                            <div className="info-vehicle__right">
                                <div className="info-vehicle__right--details">
                                    <article>
                                        <h2 id="vehicle--name">{vehicle.name}</h2>
                                        <p><span>Precio:</span> {copAmount}</p>
                                        <p>Compralo hoy y recogelo en 15 días.</p>
                                        <p>Hasta <span>108 cuotas</span> ¡Endeudate toda la vida si quieres!</p>
                                    </article>
                                    <div className="buttons-actions">
                                        <Link to={`/pay-single-cart/${idProduct}`}>
                                            <BtnBold>Comprar</BtnBold>
                                        </Link>
                                        <Link to={`/added-cart/${idProduct}`}>
                                            <BtnNormal>Agregar al carrito</BtnNormal>
                                        </Link>
                                    </div>
                                </div>
                                <div>
                                    <h2>Ficha tecnica</h2>
                                    <a href={vehicle.data_sheet} target="_blank">
                                        <picture className="picture-download">
                                            <span>Descargar </span>
                                            <img src={PdfIcon} alt="" />
                                        </picture>
                                    </a>
                                </div>
                            </div>
                        </div>
                    )
                }
                <Footer />
            </div>
        )
    }
}

export default ViewVehicle;