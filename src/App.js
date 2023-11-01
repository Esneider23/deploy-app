import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import SingUp from './pages/SingUp.js';
import Vehiculos from './pages/Vehiculos.js';
import Cotizar from './pages/Cotizar.js';
import Carrito from './pages/Carrito.js';
import ViewVehicle from './pages/ViewVehicle.js';
import AddedCart from './pages/AddedCart.js';
import PaySingleCart from './pages/PaySingleCart.js';
import PayShoppingCart from './pages/PayShoppingCart.js';
import Profile from './pages/Profile.js';

class App extends Component {
  render() {
    return (
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/singup" element={<SingUp />} /> 
          <Route path="/vehiculos" element={<Vehiculos />} />
          <Route path='/cotizar' element={<Cotizar />} />
          <Route path='/carrito' element={<Carrito />} />
          <Route path="/detalle/:product" element={<ViewVehicle />} />
          <Route path="/added-cart/:id" element={<AddedCart />} />

          <Route path="/pay-single-cart/:id" element={<PaySingleCart />} />
          <Route path="/pay-shopping-cart" element={<PayShoppingCart />} />
          <Route path="/profile" element={<Profile />} />
          
          {/* <Route path="/profile/edit-enventory/add" element={<AddVehicle />} />
          <Route path="/profile/edit-enventory/edit" element={<EditVehicle />} />
          <Route path="/profile/edit-enventory" element={<EditEnventary />} />
          <Route path="/profile/edit-profile" element={<EditProfile />} />
          <Route path="/profile-edit" element={<ProfileEdit />} /> */}

          <Route path="*" element={<h1>Error 404</h1>} />
        </Routes>
      </div>
    );
  }
}

export default App
