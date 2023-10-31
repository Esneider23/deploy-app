import React, { Component } from 'react';
import  facebook  from '../assets/icons/facebook.svg';
import  instagram  from '../assets/icons/instagram.svg';
import  twitter  from '../assets/icons/twitter.svg';
import logo from '../assets/img/motorshop_logo.png';
import "./Footer.css";


class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <section className="footer__redes">
                    <h3>Nuestras redes</h3>
                    <ul>
                        <li>
                            <a href="https://www.facebook.com/" target={'_blank'}>
                                <img src={facebook} alt="Facebook" />
                            </a>
                            <a href="https://www.instagram.com" target={'_blank'}>
                                <img src={instagram} alt="Instagram" />
                            </a>
                            <a href="https://www.twitter.com/" target={'_blank'}>
                                <img src={twitter} alt="Twitter" />
                            </a>
                        </li>
                    </ul>
                </section>

                <section className="footer__contacto">
                    <h3>Contacto</h3>
                    <ul>
                        <li>
                            motorshop@mshop.com
                        </li>
                        <li>
                            +57 341-234-5678
                        </li>
                        <li>
                            Bogotá, Colombia
                        </li>
                    </ul>
                </section>
                <img className="footer__logo" src={logo} alt="Logo_motorshop" />
            </footer>
        );
    }
}

export default Footer;