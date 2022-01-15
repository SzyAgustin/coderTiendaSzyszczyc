import React from 'react';
import Logo from '../images/logo.png';
import CartWidget from './cart/CartWidget';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const CartLink = styled(NavLink)`
  color: black;
  text-decoration: none;
`;

const NavBarContainer = styled.div`
  height: 100px;
  background-color: #bbb;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 0px 10px 0px rgba(0, 0, 0, 0.329);
  margin-bottom: 40px;
`;

const NavBarLink = styled(NavLink)`
  display: inline;
  margin: 0 10px;
  font-weight: 700;
  cursor: pointer;
  user-select: none;
  color: black;
  text-decoration: none;
  transition: 0.1s;

  &:hover {
    color: #555;
    transition: 0.2s;
  }
`;
const NavBar = () => {
  const navItemClass = (navData: any) =>
    navData.isActive ? 'navbar-item active' : 'navbar-item';

  return (
    <NavBarContainer>
      <NavLink to='/'>
        <img style={{ height: 100, cursor: 'pointer' }} src={Logo}></img>
      </NavLink>
      <div>
        <NavBarLink className={navItemClass} to='/category/vehiculo'>
          Vehiculos
        </NavBarLink>
        <NavBarLink className={navItemClass} to='/category/electronica'>
          Electronica
        </NavBarLink>
        <NavBarLink className={navItemClass} to='/category/libro'>
          Libros
        </NavBarLink>
      </div>
      <CartLink to='/cart'>
        <CartWidget />
      </CartLink>
    </NavBarContainer>
  );
};

export default NavBar;
