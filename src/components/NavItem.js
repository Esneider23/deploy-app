import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

class NavItem extends Component {
    render() {
        return (
            <li className="navbar__nav-item nav--border">
                <Link to={this.props.href}>
                    {this.props.children}
                </Link>
            </li>
        );
    }
}

export default NavItem;