import React, { useContext } from 'react';
import Logo from '../images/logo.png';
import CartWidget from './cart/CartWidget';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from '../context/UserContext';
import Button from './Button';
import { userSignOut } from '../services/Firebase';

const CartLink = styled(NavLink)`
  color: black;
  text-decoration: none;
`;

const NavBarContainer = styled.div`
  position: 'relative';
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

const AbsoluteButton = styled(Button)`
  position: absolute;
  top: 10px;
  right: 20px;
  height: 30px;
`;

const NavBar = () => {
  const navigate = useNavigate();
  const navItemClass = (navData: any) =>
    navData.isActive ? 'navbar-item active' : 'navbar-item';
  const { user, setUser } = useContext(UserContext);

  const signOut = () => {
    userSignOut();
    setUser(undefined)
    localStorage.removeItem('ecommerce-user');
    navigate("/signIn")
  };

  return (
    <>
      {user && (
        <AbsoluteButton onClick={signOut} width='80px' primary>
          Sign out
        </AbsoluteButton>
      )}
      <NavBarContainer>
        <NavLink to='/'>
          <img style={{ height: 100, cursor: 'pointer' }} src={Logo}></img>
        </NavLink>
        {user && (
          <>
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
            <div>
              <NavBarLink className={navItemClass} to='/addItem'>
                Add new item
              </NavBarLink>
            </div>
            <CartLink to='/cart'>
              <CartWidget />
            </CartLink>
          </>
        )}
      </NavBarContainer>
    </>
  );
};

export default NavBar;
