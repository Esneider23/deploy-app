import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/motorshop_logo.png";
import "./NavBar.css";


class NavLogo extends Component {
    render() {
        return (
            <li className="navbar__nav-item ">
                <Link to="/">
                    <img className="navbar__logo" src={logo} alt="Logo_motorshop" />
                </Link>
            </li>
        );
    }
}

export default NavLogo;