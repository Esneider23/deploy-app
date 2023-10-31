import React, { Component } from "react";
import "./NavBar.css";


class NavBarRight extends Component {
    render() {
        return (
            <ul className="navbar__nav-right">
                {this.props.children}
            </ul>
        );
    }
}

export default NavBarRight;