import React, { Component } from "react";
import "./NavBar.css";


class NavBar extends Component {
    render() {
        return (
            <header>
                <nav className="navbar">
                    {this.props.children}
                </nav>
            </header>
        )
    }
}


export default NavBar;