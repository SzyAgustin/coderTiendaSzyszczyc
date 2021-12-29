import React from 'react'
import './NavBar.css';
import Logo from '../images/logo.png';

const NavBar = () => {
    const gotoInicio = () => {
        console.log('Go to Inicio')
    }

    const gotoVehiculos = () => {
        console.log('Go to Vehiculos')
    }

    const gotoElectronica = () => {
        console.log('Go to Electronica')
    }

    const gotoLibros = () => {
        console.log('Go to Libros')
    }

    const gotoLogin = () => {
        console.log('Go to Login')
    }

    return (
        <div className='nav-bar'>
            <img className='logo' onClick={gotoInicio} src={Logo}></img>
            <ul>
                <li className='navbar-item' onClick={gotoVehiculos}>Vehiculos</li>
                <li className='navbar-item' onClick={gotoElectronica}>Electronica</li>
                <li className='navbar-item' onClick={gotoLibros}>Libros</li>
            </ul>
            <button onClick={gotoLogin} className='login-button'>Login</button>
        </div>
    )
}

export default NavBar
