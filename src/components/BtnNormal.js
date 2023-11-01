import React, { Component } from "react";
import "./BtnNormal.css";

class BtnNormal extends Component {
    render() {
        return (
            <button className="btn-normal">
                {this.props.children}
            </button>
        );
    }
}

export default BtnNormal;