import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import icon from '../assets/icons/user-circle.svg';
import './NavBar.css';


class NavUser extends Component {
    render() {
        return (
            <li className="navbar__user-icon">
                <Link to="/profile">
                    <img src={icon} alt="" />
                </Link>
            </li>
        );
    }
}

export default NavUser;