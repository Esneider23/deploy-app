import React, { Component } from "react";
import "./BtnBold.css";

class BtnBold extends Component {
    render() {
        return (
            <button className="btn-bold">
                {this.props.children}
            </button>
        );
    }
}

export default BtnBold;