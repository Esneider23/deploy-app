import React, { Component } from 'react';
import './BtnLight.css';

class BtnLight extends Component {
    render() {
        return (
            <button className="btn-light">
                {this.props.children}
            </button>
        );
    }
}

export default BtnLight;