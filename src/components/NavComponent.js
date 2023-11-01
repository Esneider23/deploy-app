import React, { Component } from 'react';
import NavBar from './NavBar.js';
import NavBarLeft from './NavBarLeft.js';
import NavBarRight from './NavBarRight.js';
import NavLogo from './NavLogo.js';
import NavItem from './NavItem.js';
import NavShoppingCart from './NavShoppingCart.js';
import NavUser from './NavUser.js';
import NavSingUp from './NavSingUp.js';

class NavComponent extends Component {
  render() {
    return (
      <NavBar>
        <NavBarLeft>
          <NavLogo href="/" />
          <NavItem href="/vehiculos">Vehículos</NavItem>
          <NavItem href="/cotizar">Cotizar</NavItem>
        </NavBarLeft>
        <NavBarRight>
          <NavShoppingCart />
          <NavUser />
          <NavItem href="/login">Log In</NavItem>
          <NavSingUp href="/singup">Sing Up</NavSingUp>
        </NavBarRight>
      </NavBar>
    );
  }
}

export default NavComponent;
