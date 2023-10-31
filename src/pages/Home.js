import React, { Component } from 'react';
import NavComponent from './../components/NavComponent.js';
import ImageSlider from './../components/ImageSlider';
import Footer from './../components/Footer';
import steering from './../assets/icons/steering-2.svg';
import mapPin from './../assets/icons/map-pin-2.svg';
import handCoin from './../assets/icons/hand-coin.svg';
import BtnLight from './../components/BtnLight';
import vehicle3 from './../assets/img/stock3.png';
import { Link } from 'react-router-dom';
import "./Home.css";


class Home extends Component {
  state = {
    vehicles: [],
    status: false
  }

  getVehicles = () => {
    const options = { method: 'GET', headers: { Authorization: 'Basic Og==' } };
    fetch('https://servicio-stock.onrender.com/vehicles', options)
      .then(response => response.json())
      .then(response => {
        this.setState({
          vehicles: response.vehicles,
          status: true
        })
      })
      .catch(err => console.error(err));
  }

  componentDidMount() {
    this.getVehicles();
  }

  render() {

    const slides = [
      { url: "https://i.imgur.com/8lxEjbX.png", title: "Slider 1", },
      { url: "https://i.imgur.com/jP2wkJG.png", title: "Slider 2", },
      { url: "https://i.imgur.com/Vgq0CTu.png", title: "Slider 2", },
    ]

    const containerStyles = {
      width: "100%",
      height: "480px",
      background: "#FFF",
    }


    return (
      <div>
        <NavComponent />
        <div style={containerStyles}>
          <ImageSlider slides={slides} />
        </div>

        <main className="main-container">
          <div className="main__sections">
            <Link to="/vehiculos" className="main__links">
              <div className='section'>
                <img src={steering} alt="" />
                <h3>Nuestro catálogo</h3>
              </div>
            </Link>
            <a href="#About" className="main__links">
              <div className='section'>
                <img src={mapPin} alt="" />
                <h3>¿Dónde estamos?</h3>
              </div>
            </a>
            <Link to="/cotizar" className="main__links">
              <div className='section'>
                <img src={handCoin} alt="" />
                <h3>Cotiza aquí</h3>
              </div>
            </Link>
          </div>
          <h1 className="main__title">¡Encuentra tu próximo vehículo!</h1>

          <div className="main__vehicles">


            {
              this.state.status === false ? (
                <div className="loading">
                  <h1>Cargando...</h1>
                </div>
              ) : this.state.vehicles.map((item, index) => {
                if (index > 3) {
                  return (<div class="hidden-div"></div>)
                }
                else {
                  return (
                    <div key={index} className="main__vehicle">
                      <img src={item.image} alt="" />
                      <h3>{item.name}</h3>
                      <Link to={`/detalle/${item.id}`} className="main__links">
                        <BtnLight>Ver más</BtnLight>
                      </Link>
                    </div>
                  )
                }
              })
            }
          </div>

          <div className="main__about">
            <div className="main__about--text">
              <h2 id="About">
                ¿Qué es MotorShop?
              </h2>
              <p>
                Motorshop es una empresa empresa colombiana, ubicada en Cartagena de Indias,
                que se dedica a la venta de vehículos, con la finalidad de brindar el mejor
                servicio de calidad a nuestros clientes. Nos esforzamos al máximo para
                que nuestros clientes puedan decir que su experiencia con nosotros fue satisfactoria.
              </p>
            </div>
            <div className="main__about--img">
              <img src={vehicle3} alt="about" />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }
}

export default Home;
