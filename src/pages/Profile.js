import React, { Component } from 'react';
import NavComponent from './../components/NavComponent';
import Footer from './../components/Footer';
import user from './../assets/icons/user-circle.svg';
import { Link } from 'react-router-dom';
import userSearch from './../assets/icons/user-search.svg';
import listSearch from './../assets/icons/list-search.svg';
import edit from './../assets/icons/edit.svg';
import './Profile.css';


const dataUser = {
    name: 'John Doe',
    email: 'jonh@doe.com',
    account: 1,
    password: '********',
}
let typeAccount = '';
if (dataUser.account === 1) {
    typeAccount = 'Cliente';
} else if (dataUser.account === 2) {
    typeAccount = 'Administrador';
} else {
    typeAccount = 'Super-administrador';
}

let name = dataUser.name.split(' ');

class Profile extends Component {
    render() {
        return (
            <div>
                <NavComponent />
                <div className="profile__container">
                    <div className="profile__info">
                        <picture>
                            <img src={user} style={{ height: "150px" }} alt="" />
                        </picture>
                        <section>
                            <h4>Datos personales</h4>
                            <p><span>Nombre:</span> {name[0]}</p>
                            <p><span>Apellido:</span> {name[1]}</p>
                        </section>
                        <section>
                            <h4>Datos de la cuenta</h4>
                            <p><span>Email:</span> {dataUser.email}</p>
                            <p><span>Tipo de cuenta:</span> {typeAccount}</p>
                            <p><span>Contraseña:</span> {dataUser.password}</p>
                        </section>
                    </div>
                    <div className="profile__admin-section">
                        {
                            dataUser.account > 1
                                ? (
                                    <div className="profile__admin-inventory">
                                        <h4>Editar Inventario</h4>
                                        <Link to="/">
                                            <picture>
                                                <img src={edit} alt="" />
                                            </picture>
                                        </Link>
                                    </div>
                                ) : (null)
                        }
                        {
                            dataUser.account === 3
                                ? (
                                    <div className="profile__admin-edit-admin">
                                        <h4>Editar Admins</h4>
                                        <Link to="/">
                                            <picture>
                                                <img src={listSearch} alt="" />
                                            </picture>
                                        </Link>
                                    </div>
                                ) : (null)
                        }
                        {
                            dataUser.account > 1
                                ? (
                                    <div className="profile__list-users">
                                        <h4>Explorar usuarios</h4>
                                        <Link to="/">
                                            <picture>
                                                <img src={userSearch} alt="" />
                                            </picture>
                                        </Link>
                                    </div>
                                ) : (null)
                        }
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Profile;