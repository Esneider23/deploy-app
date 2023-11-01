import React, { Component } from "react";
import "./NavBar.css";


class NavBarLeft extends Component {
    render() {
        return (
            <ul className="navbar__nav-left">
                {this.props.children}
            </ul>
        );
    }
}

export default NavBarLeft;