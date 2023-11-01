import React, { Component } from "react";
import { Link } from "react-router-dom";
import BtnBold from "./BtnBold";
import "./NavBar.css";

class NavSingUp extends Component {
    render() {
        return (
            <li className="navbar__nav-item">
                <Link to={this.props.href}>
                    <BtnBold>{this.props.children}</BtnBold>
                </Link>
            </li>
        );
    }
};

export default NavSingUp;