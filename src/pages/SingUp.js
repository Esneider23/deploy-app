import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "./../assets/img/motorshop_logo.png";
import "./SingUp.css";

class SingUp extends Component {

    singUpEvent = (event) => {
        event.preventDefault();
        window.location.href = "/";
    }

    render() {
        return (
            <div className="background">
                <div className="header">
                    <div className="inner-header flex">
                        <div className="singup">
                            <Link to="/">
                                <img src={logo} alt="logo motorshop" />
                            </Link>

                            <form onSubmit={this.singUpEvent} class="flex">
                                <h2>!Crea tu cuenta!</h2>
                                <label htmlFor="u-name">
                                    <input type="text" name="name" id="u-name" placeholder="Nombre" />
                                </label>
                                <label htmlFor="e-mail">
                                    <input type="text" name="email" id="e-mail" placeholder="Correo eléctronico" />
                                </label>
                                <label htmlFor="pass">
                                    <input type="password" name="password" id="pass" placeholder="Contraseña" />
                                </label>
                                <label htmlFor="repit-pass">
                                    <input type="password" name="password" id="repit-pass" placeholder="Repita su contraseña" />
                                </label>

                                <input type="submit" className="singup-btn" value="Registrarse" />
                            </form>
                        </div>
                    </div>

                </div>

                <div className="content flex">
                    <p>Motorshop | Venta de automóviles </p>
                </div>

            </div>
        )
    }
}

export default SingUp;